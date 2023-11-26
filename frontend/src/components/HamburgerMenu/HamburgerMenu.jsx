import { useState } from "react";
import styles from "./HamburgerMenu.module.css";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const categories = [
  "soups",
  "salads",
  "side dishes",
  "main dishes",
  "appetizers",
  "bakery",
  "beverages",
];

const HamburgerMenu = () => {
  const [isOpened, setIsOpened] = useState(false);
  const user = useAuth();

  const toggleMenu = () => {
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div className={isOpened ? styles.burgerWrapperOpened : ""}>
        <Hamburger
          color="#f5f5f5"
          distance={"sm"}
          size={22}
          toggled={isOpened}
          toggle={toggleMenu}
        />
      </div>
      <div
        className={`${styles.menuWrapper} ${
          isOpened ? styles.menuWrapperOpened : ""
        }`}
      >
        <ul className={styles.categoriesUl}>
          {categories.map((category) => (
            <li key={category} className={styles.categoryLi}>
              <Link
                onClick={() => {
                  toggleMenu();
                }}
                to={category.split(" ").join("_")}
              >
                {category}
              </Link>
            </li>
          ))}
          {user.isAuth && (
            <li className={styles.categoryLi}>
              <Link
                onClick={() => {
                  toggleMenu();
                }}
                to={"/constructor"}
              >
                Create Recipe +
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;
