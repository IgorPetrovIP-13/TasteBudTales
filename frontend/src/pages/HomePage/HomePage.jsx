import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import coke from "@/assets/icons/coke.svg";
import soup from "@/assets/icons/soup.svg";
import bread from "@/assets/icons/bread.svg";

const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <div></div>
      <div></div>
      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${styles.li1}`}>
            <Link to={"/soups"}>Soups</Link>
          </li>
          <li className={`${styles.navItem} ${styles.li2}`}>
            <Link to={"/appetizers"}>Appetizers</Link>
          </li>
          <li className={`${styles.navItem} ${styles.li3}`}>
            <Link to={"/bakery"}>Bakery</Link>
          </li>
          <li className={`${styles.navItem} ${styles.li4}`}>
            <Link to={"/beverages"}>Beverages</Link>
          </li>
          <li className={`${styles.navItem} ${styles.li5}`}>
            <Link to={"/salads"}>Salads</Link>
          </li>
          <li className={`${styles.navItem} ${styles.li6}`}>
            <Link to={"/side_dishes"}>Side dishes</Link>
          </li>
          <li className={`${styles.navItem} ${styles.li7}`}>
            <Link to={"/main_dishes"}>
              Main dishes
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default HomePage;
