import { useAuth } from "../../hooks/useAuth";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { ref, orderByChild, query, equalTo, onValue } from "firebase/database";
import { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const user = useAuth();
  const navigation = useNavigate();

  function getSaved() {
    const myRecipesRef = query(
      ref(db, "recipes"),
      orderByChild("userUid"),
      equalTo(user.uid)
    );
    onValue(myRecipesRef, (snapshot) => {
      console.log(snapshot.val())
    }, {
      onlyOnce: true
    });
  }

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
          <button onClick={() => setAreSavedOpened(true)}>
            <img src="./src/assets/icons/saved.svg" alt="saved" />
            saved
          </button>
        </li>
        <li className={styles.option}>
          <button onClick={() => getSaved()}>
            <img src="./src/assets/icons/recipes.svg" alt="recipes" />
            my recipes
          </button>
        </li>
        <li className={styles.option}>
          <button onClick={() => {}}>
            <img src="./src/assets/icons/settings.svg" alt="gear" />
            settings
          </button>
        </li>
        <li className={styles.option}>
          <button onClick={() => logOut()}>
            <img src="./src/assets/icons/logout.svg" alt="door" />
            Log out
          </button>
        </li>
        <li className={`${styles.option} ${styles.deleteOption}`}>
          <button onClick={() => logOut()}>
            <img src="./src/assets/icons/deleteuser.svg" alt="delete" />
            Delete acc
          </button>
        </li>
      </ul>
    </section>
  );
};

export default Profile;
