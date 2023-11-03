import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import { query, ref, equalTo, orderByKey, get } from "firebase/database";
import styles from "./RecipePage.module.css";
import { useAuth } from "../../hooks/useAuth";
import Comments from "../../components/Comments/Comments";
import { Link } from "react-router-dom";
import SaveShareBlock from "../../components/SaveShareBlock/SaveShareBlock";

const RecipePage = () => {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const user = useAuth();

  useEffect(() => {
    async function getData() {
      const recipesRef = query(ref(db, "recipes"), orderByKey(), equalTo(id));
      const snapshot = await get(recipesRef);
      const data = await snapshot.val();
      if (data) {
        setInfo(data[Object.keys(data)[0]]);
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
              <img src="../../src/assets/icons/ingredients.svg" alt="" />
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
              <img src="../../src/assets/icons/cookingSteps.svg" alt="" />
              Cooking steps
            </h2>
            <div className={styles.stepsContainer}>
              {info.steps.map((step, index) => (
                <div className={styles.cookingStep}>
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
