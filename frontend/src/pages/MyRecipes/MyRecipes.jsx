import { useState, useEffect, useMemo } from "react";
import { firestoreDb } from "../../firebase";
import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import styles from "./MyRecipes.module.css";
import ClosedRecipeCard from "../../components/ClosedRecipeCard/ClosedRecipeCard";
import Pagination from "../../components/Pagination/Pagination";
import { useAuth } from "../../hooks/useAuth";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const user = useAuth();
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return recipes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, recipes, itemsPerPage]);

  useEffect(() => {
    setItemsPerPage(6);
    if (currentPage > Math.ceil(recipes.length / 6)) {
      setCurrentPage(Math.ceil(recipes.length / 6) || 1);
    }
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    async function getRecipes() {
      const recipesRef = query(
        collection(firestoreDb, "recipes"),
        orderBy("timestamp", "desc"),
        where("userUid", "==", user.uid)
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
    }
    getRecipes();
  }, [user.isAuth]);

  return (
    <section>
      <h1 className={styles.mainHeader}>My recipes</h1>
      {recipes.length > 0 ? (
        <>
          <div className={styles.recipesGrid}>
            {currentPageData.map((recipe) => (
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
          <Pagination
            currentPage={currentPage}
            totalCount={recipes.length}
            pageSize={itemsPerPage}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo(0, 0);
            }}
          />
        </>
      ) : (
        <h2 style={{ marginTop: "0.5rem" }}>No recipes</h2>
      )}
    </section>
  );
};

export default MyRecipes;