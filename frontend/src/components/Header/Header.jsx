import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useAuth } from "../../hooks/useAuth";
import cook from "@/assets/icons/cook.svg";
import search from "@/assets/icons/search.svg"

const Header = () => {

  const user = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logoLink}></Link>
        <div className={styles.rightContainer}>
          <Link to={"/search?query="} className={styles.search}><img src={search} alt="s" /></Link>
          {user.isAuth && user.nickname ? (
            <Link className={styles.profileLink} to={"/profile"}>
              <img src={cook} alt="cook" />
              {user.nickname}
            </Link>
          ) : (
            <Link className={styles.profileLink} to={"/login"}>
              <img src={cook} alt="cook" />
              Log in
            </Link>
          )}
        </div>
        <HamburgerMenu />
      </nav>
    </header>
  );
};

export default Header;
