import styles from "./RecipeConstructor.module.css";
import AddDishName from "../../components/AddDishName/AddDishName";
import AddImg from "../../components/AddImg/AddImg";
import AddIngredients from "../../components/AddIngredients/AddIngredients";
import AddDescription from "../../components/AddDescription/AddDescription";
import AddSteps from "../../components/AddSteps/AddSteps";
import SubmitConstructor from "../../components/SubmitConstructor/SubmitConstructor";
import AddCharacteristics from "../../components/AddСharacteristics/AddCharacteristics";

const RecipeConstructor = () => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.constructorMainHeader}>
        Creating your awesome recipe
      </h1>
      <form name="recipeConstructor" onSubmit={(e) => handleSubmit(e)}>
        <ul>
          <li className={styles.constructorElement}>
            <h2 className={styles.constructorSectionHeader}>Name</h2>
            <AddDishName />
          </li>
          <li className={styles.constructorElement}>
            <h2 className={styles.constructorSectionHeader}>Main image</h2>
            <AddImg />
          </li>
          <li className={styles.constructorElement}>
            <h2 className={styles.constructorSectionHeader}>Characteristics</h2>
            <AddCharacteristics />
          </li>
          <li className={styles.constructorElement}>
            <h2 className={styles.constructorSectionHeader}>
              Description (optional)
            </h2>
            <AddDescription />
          </li>
          <li className={styles.constructorElement}>
            <h2 className={styles.constructorSectionHeader}>Ingredients</h2>
            <AddIngredients />
          </li>
          <li className={styles.constructorElement}>
            <h2 className={styles.constructorSectionHeader}>Steps</h2>
            <AddSteps />
          </li>
        </ul>
        <SubmitConstructor />
      </form>
    </section>
  );
};

export default RecipeConstructor;
