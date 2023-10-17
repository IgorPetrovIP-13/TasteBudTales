import { useState } from "react";
import styles from "./HamburgerMenu.module.css";
import { Squash as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

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
                to={category.split(" ").join("")}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HamburgerMenu;
