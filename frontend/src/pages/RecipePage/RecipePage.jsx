import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RecipePage.module.css";
import { useAuth } from "../../hooks/useAuth";
import Comments from "../../components/Comments/Comments";
import { Link } from "react-router-dom";
import SaveShareBlock from "../../components/SaveShareBlock/SaveShareBlock";
import ingredientsSvg from "@/assets/icons/ingredients.svg";
import cookingStepsSvg from "@/assets/icons/cookingSteps.svg";
import { firestoreDb } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import clock from "@/assets/icons/clock.svg";
import serving from "@/assets/icons/portion.svg";
import complexitySvg from "@/assets/icons/complexity.svg";
import { useBreakpoint } from "../../hooks/useBreakpoint";

const RecipePage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const user = useAuth();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    async function getData() {
      const documentRef = doc(firestoreDb, "recipes", id);
      const documentSnapshot = await getDoc(documentRef);
      if (documentSnapshot.exists()) {
        const data = documentSnapshot.data();
        setInfo(data);
      } else {
        setInfo(null);
      }
    }
    getData();
  }, []);

  return (
    <section>
      {info ? (
        <div className={styles.recipeWrapper}>
          <div style={{ paddingTop: 0 }} className={styles.recipeSection}>
            <h1 style={{ marginBottom: "0" }} className={styles.sectionHeader}>
              {info.name}
            </h1>
            <h2 className={styles.byUserHeader}>
              by <Link to={`/users/${info.userUid}`}>{info.nickname}</Link>
            </h2>
            <div className={styles.imgWrapper}>
              <img src={info.imageLink} alt="recipeImg" />
            </div>
            <div className={styles.characteristics}>
              <span>
                <img src={clock} alt="" />
                {info.cookingTime > 60
                  ? Math.floor(info.cookingTime / 60) +
                    "h." +
                    " " +
                    (info.cookingTime % 60) +
                    "m."
                  : info.cookingTime + "m."}{" "}
                {breakpoint !== "small" && "to cook"}
              </span>
              <span>
                <img src={serving} alt="" />
                {info.servingsNum} {breakpoint !== "small" && "servings"}
              </span>
              <span>
                <img src={complexitySvg} alt="" />
                {info.cookingComplexity} {breakpoint !== "small" && "to cook"}
              </span>
            </div>
          </div>
          <hr className={styles.sectionHr} />
          {info.description && (
            <div className={styles.recipeSection}>
              <p className={styles.description}>{info.description}</p>
            </div>
          )}
          <hr className={styles.sectionHr} />
          <div className={styles.recipeSection}>
            <h2 className={styles.sectionHeader}>
              <img src={ingredientsSvg} alt="" />
              Ingredients
            </h2>
            <div className={styles.ingredientsWrapper}>
              {info.ingredients.map((ingredient, index) => (
                <div className={styles.checkboxWrapper} key={index}>
                  <input id={ingredient.name + index} type="checkbox" />
                  <label htmlFor={ingredient.name + index}>
                    {ingredient.weight +
                      " " +
                      (ingredient.unit !== "-" ? ingredient.unit : "") +
                      " " +
                      ingredient.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <hr className={styles.sectionHr} />
          <div className={styles.recipeSection}>
            <h2 className={styles.sectionHeader}>
              <img src={cookingStepsSvg} alt="" />
              Cooking steps
            </h2>
            <div className={styles.stepsContainer}>
              {info.steps.map((step, index) => (
                <div key={index} className={styles.cookingStep}>
                  <h3 className={styles.stepHeader}>Step {index + 1}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              ))}
            </div>
            <SaveShareBlock
              id={id}
              isAuthor={info.userUid === user.uid}
              tags={[info.category]}
            />
          </div>
          <Comments id={id} recipeUid={info.userUid} />
        </div>
      ) : (
        <h1>No recipe found</h1>
      )}
    </section>
  );
};

export default RecipePage;
