import { useAuth } from "../../hooks/useAuth";
import styles from "./Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import recipes from "@/assets/icons/recipes.svg";
import saved from "@/assets/icons/saved.svg";
import settings from "@/assets/icons/settings.svg";
import logout from "@/assets/icons/logout.svg";


const Profile = () => {
  const user = useAuth();
  const navigation = useNavigate();

  async function logOut() {
    try {
      await signOut(auth);
      toast.info("Signed out");
    } catch (e) {
      console.log(e);
    }
    navigation("/");
  }

  return (
    <section>
      <div className={styles.nameWrapper}>
        <h1 className={styles.nickname}>
          Hello, {!user.isAuth ? "STRANGER" : user.nickname}
        </h1>
      </div>
      {user.isAuth && (
        <ul className={styles.optionsList}>
          <li className={styles.card}>
            <Link className={styles.box} to={"myrecipes"}>
              <div className={styles.content}>
                <img src={recipes} />
                <h3>My recipes</h3>
                <p>Here you can view and manage your own recipes</p>
              </div>
            </Link>
          </li>
          <li className={styles.card}>
            <Link className={styles.box} to={"saved"}>
              <div className={styles.content}>
                <img src={saved} />
                <h3>Saved</h3>
                <p>Here you can view and manage your saved recipes</p>
              </div>
            </Link>
          </li>
          <li className={styles.card}>
            <Link className={styles.box} to="settings">
              <div className={styles.content}>
                <img src={settings} />
                <h3>Settings</h3>
                <p>
                  Update your bio, profile name or security settings. Adding or
                  modifying this information helps others to better recognize
                  your profile.
                </p>
              </div>
            </Link>
          </li>
          <li className={styles.card}>
            <button
              className={`${styles.box} ${styles.logOut}`}
              onClick={() => logOut()}
            >
              <div className={styles.content}>
                <img src={logout} />
                <h3>Log Out</h3>
                <p>
                  Your account data will be stored on the server, so you can log
                  in to your account using your email and password next time.
                </p>
              </div>
            </button>
          </li>
        </ul>
      )}
    </section>
  );
};

export default Profile;
