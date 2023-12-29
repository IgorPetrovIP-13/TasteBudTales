import {
  doc,
  getDoc,
  getDocs,
  limitToLast,
  query,
  collection,
  orderBy,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestoreDb } from "../../firebase";
import styles from "./UserPage.module.css";
import ClosedRecipeCard from "../../components/ClosedRecipeCard/ClosedRecipeCard";

const UserPage = () => {
  const { uid } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [latestUserRecipes, setLatestRecipes] = useState([]);

  useEffect(() => {
    const userRef = doc(firestoreDb, "users", uid);
    const recipesRef = query(
      collection(firestoreDb, "recipes"),
      orderBy("timestamp", "desc"),
      where("userUid", "==", uid),
      limitToLast(6)
    );
    async function getUserInfo() {
      const documentSnapshot = await getDoc(userRef);
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        setUserInfo(data);
      } else {
        setUserInfo(null);
      }
    }
    async function getLatestUserRecipes() {
      const snapshot = await getDocs(recipesRef);
      !snapshot.empty
        ? setLatestRecipes(
            snapshot.docs.map((doc) => ({
              recipeID: doc.id,
              data: doc.data(),
            }))
          )
        : setLatestRecipes([]);
    }
    getLatestUserRecipes();
    getUserInfo();
  }, []);

  if (userInfo) {
    return (
      <section>
        <div className={styles.userInfo}>
          <h1 className={styles.nickName}>{userInfo.nickname}</h1>
          <h2 className={styles.fullName}>{userInfo.fullName}</h2>
          {userInfo.description && (
            <p className={styles.description}>{userInfo.description}</p>
          )}
        </div>
        <h3 className={styles.latestRecipes}>Latest recipes</h3>
        <div className={styles.recipesGrid}>
          {latestUserRecipes.map((recipe) => (
            <ClosedRecipeCard
              recipeID={recipe.recipeID}
              key={recipe.recipeID}
              imgLink={recipe.data.imageLink}
              name={recipe.data.name}
              cookingTime={recipe.data.cookingTime}
              servingsNum={recipe.data.servingsNum}
              complexity={recipe.data.cookingComplexity}
              userID={recipe.data.userUid}
            />
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <h1>No user found</h1>
      </section>
    );
  }
};

export default UserPage;
