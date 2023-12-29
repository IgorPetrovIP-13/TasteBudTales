import { useState, useEffect } from "react";
import { firestoreDb } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import styles from "./SavedRecipes.module.css";
import ClosedRecipeCard from "../../components/ClosedRecipeCard/ClosedRecipeCard";
import { useAuth } from "../../hooks/useAuth";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const user = useAuth();

  useEffect(() => {
    async function getRecipes() {
      try {
        const recipesRef = query(
          collection(firestoreDb, "recipes"),
          where("__name__", "in", user.saved)
        );
        const snapshot = await getDocs(recipesRef);
        !snapshot.empty
          ? setRecipes(
              snapshot.docs.map((doc) => ({
                recipeID: doc.id,
                data: doc.data(),
              }))
            )
          : setRecipes([]);
      } catch (e) {
        setRecipes([]);
      }
    }
    user.isAuth && getRecipes();
  }, [user.isAuth, user.saved]);

  return (
    <section>
      <h1 className={styles.mainHeader}>Saved</h1>
      {recipes.length > 0 ? (
        <>
          <div className={styles.recipesGrid}>
            {recipes.map((recipe) => (
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
        </>
      ) : (
        <h2 style={{ marginTop: "0.5rem" }}>No recipes</h2>
      )}
    </section>
  );
};

export default SavedRecipes;
