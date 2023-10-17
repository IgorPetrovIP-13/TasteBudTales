import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {

  const user = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logoLink}></Link>
        <div className={styles.rightContainer}>
          <SearchBar />
          {user.isAuth ? (
            <Link className={styles.profileLink} to={"/profile"}>
              <img src="./src/assets/icons/cook.svg" alt="cook" />
              {user.nickname}
            </Link>
          ) : (
            <Link className={styles.profileLink} to={"/login"}>
              <img src="./src/assets/icons/cook.svg" alt="cook" />
              Login
            </Link>
          )}
        </div>
        <HamburgerMenu />
      </nav>
    </header>
  );
};

export default Header;