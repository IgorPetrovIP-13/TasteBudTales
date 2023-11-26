import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { query, ref, equalTo, orderByChild, get } from "firebase/database";
import styles from "./RecipesByCategory.module.css";
import ClosedRecipeCard from "../../components/ClosedRecipeCard/ClosedRecipeCard";
import PreloaderPage from "../PreloaderPage/PreloaderPage";
import Pagination from "../../components/Pagination/Pagination";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const RecipesByCategory = () => {
  const [recipes, setRecipes] = useState([]);
  const breakpoint = useBreakpoint();
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return recipes.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, recipes, itemsPerPage]);

  useEffect(() => {
    if (breakpoint === "small") {
      setItemsPerPage(3);
      if (currentPage > Math.ceil(recipes.length / 3)) {
        setCurrentPage(Math.ceil(recipes.length / 3) || 1);
      }
    } else {
      setItemsPerPage(6);
      if (currentPage > Math.ceil(recipes.length / 6)) {
        setCurrentPage(Math.ceil(recipes.length / 6) || 1);
      }
    }
  }, [breakpoint]);

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    async function getRecipes() {
      const recipesRef = query(
        ref(db, "recipes"),
        orderByChild("category"),
        equalTo(category)
      );
      const snapshot = await get(recipesRef);
      const data = await snapshot.val();
      data
        ? setRecipes(
            Object.keys(data).map((key) => ({
              recipeID: key,
              ...data[key],
            }))
          )
        : setRecipes([]);
      setIsLoading(false);
    }
    getRecipes();
  }, [category]);


  const templateColumns = () => {
    if (breakpoint === "small") {
      return { gridTemplateColumns: "1fr" };
    } else if (breakpoint === "medium") {
      return { gridTemplateColumns: "1fr 1fr" };
    } else {
      return { gridTemplateColumns: "1fr 1fr 1fr" };
    }
  };

  if (isLoading) {
    return <PreloaderPage />;
  }

  return (
    <section>
      <h1 className={styles.mainHeader}>{category.split("_").join(" ")}</h1>
      {recipes.length > 0 ? (
        <>
          <div style={templateColumns()} className={styles.recipesGrid}>
            {currentPageData.map((recipe) => (
              <ClosedRecipeCard
                recipeID={recipe.recipeID}
                key={recipe.imageLink}
                imgLink={recipe.imageLink}
                name={recipe.name}
                cookingTime={recipe.cookingTime}
                servingsNum={recipe.servingsNum}
                complexity={recipe.cookingComplexity}
                userID={recipe.userUid}
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
        <h2 style={{marginTop: "0.5rem"}}>No recipes</h2>
      )}
    </section>
  );
};

export default RecipesByCategory;
