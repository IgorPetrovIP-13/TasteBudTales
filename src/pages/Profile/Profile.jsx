import { useAuth } from "../../hooks/useAuth";
import styles from "./Profile.module.css";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

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
        <h1 className={styles.nickname}>{user.nickname}</h1>
        {user.fullName && (
          <h2 className={styles.fullName}>({user.fullName})</h2>
        )}
      </div>
      <ul className={styles.optionsList}>
        <li className={styles.option}>
          <button onClick={() => logOut()}>
            <img src="./src/assets/icons/logout.svg" alt="" />
            Log out
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
