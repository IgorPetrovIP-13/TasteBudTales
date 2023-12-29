import { useEffect } from "react";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import { useState } from "react";
import ClosedRecipeCard from "../../components/ClosedRecipeCard/ClosedRecipeCard";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const HomePage = () => {
  const recipesRef = collection(firestoreDb, "recipes");
  const [newRecipes, setNewRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [isMoreNewRecipes, setIsMoreNewRecipes] = useState(false);
  const [isMorePopularRecipes, setisMorePopularRecipes] = useState(false);
  const breakPoint = useBreakpoint();

  async function getNewRecipes() {
    const q = query(recipesRef, orderBy("timestamp", "desc"), limit(6));
    try {
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({
          recipeID: doc.id,
          data: doc.data(),
        }));
      } else {
        return [];
      }
    } catch (e) {
      console.error(snapshot);
    }
  }

  async function getPopularRecipes() {
    const q = query(
      recipesRef,
      orderBy("userCommentsLength", "desc"),
      limit(6)
    );
    try {
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => ({
          recipeID: doc.id,
          data: doc.data(),
        }));
      } else {
        return [];
      }
    } catch (e) {
      console.error(snapshot);
    }
  }

  useEffect(() => {
    getNewRecipes().then((data) => {
      setNewRecipes(data);
    });
    getPopularRecipes().then((data) => {
      setPopularRecipes(data);
    });
  }, []);

  return (
    <section className={styles.homePage}>
      <div className={styles.intro}>
        <div className={styles.introInnerDiv}>
          <h1>
            Welcome to <br /> Taste Bud Tales!
          </h1>
          <p>
            A place where flavor meets creativity! Share your passion for
            cooking by contributing your finest recipes.
          </p>
        </div>
      </div>
      <div>
        <h2 className={styles.sectionHeader}>
          <hr />
          Most recent
          <hr />
        </h2>
        <div className={styles.recipesSection}>
          {newRecipes.slice(0, breakPoint === "small" ? 4 : 3).map((recipe) => (
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
          {isMoreNewRecipes &&
            newRecipes
              .slice(breakPoint === "small" ? 4 : 3, 6)
              .map((recipe) => (
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
        {!isMoreNewRecipes && (
          <button
            type="button"
            className={styles.viewMoreButton}
            onClick={() => {
              setIsMoreNewRecipes(true);
            }}
          >
            View more
          </button>
        )}
      </div>
      <div>
        <h2 className={styles.sectionHeader}>
          <hr />
          Most Popular
          <hr />
        </h2>
        <div className={styles.recipesSection}>
          {popularRecipes.slice(0, breakPoint === "small" ? 4 : 3).map((recipe) => (
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
          {isMorePopularRecipes &&
            popularRecipes
              .slice(breakPoint === "small" ? 4 : 3, 6)
              .map((recipe) => (
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
        {!isMorePopularRecipes && (
          <button
            type="button"
            className={styles.viewMoreButton}
            onClick={() => setisMorePopularRecipes(true)}
          >
            View more
          </button>
        )}
      </div>
      <div>
        <h2 className={styles.sectionHeader}>
          <hr />
          What to cook today?
          <hr />
        </h2>
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
              <Link to={"/main_dishes"}>Main dishes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default HomePage;
