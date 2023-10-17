import styles from "./RecipeConstructor.module.css";
import AddImg from "../../components/AddImg/AddImg";
import AddIngredients from "../../components/AddIngredients/AddIngredients";
import AddDescription from "../../components/AddDescription/AddDescription";
import AddSteps from "../../components/AddSteps/AddSteps";

const RecipeConstructor = () => {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.constructorMainHeader}>
        Creating your awesome recipe
      </h1>
      <ul>
        <li className={styles.constructorElement}>
          <h2 className={styles.constructorSectionHeader}>Add dish image</h2>
          <AddImg />
        </li>
        <li className={styles.constructorElement}>
          <h2 className={styles.constructorSectionHeader}>Add description (optional)</h2>
          <AddDescription />
        </li>
        <li className={styles.constructorElement}>
          <h2 className={styles.constructorSectionHeader}>Add ingredients</h2>
          <AddIngredients />
        </li>
        <li className={styles.constructorElement}>
          <h2 className={styles.constructorSectionHeader}>Add steps</h2>
          <AddSteps />
        </li>
      </ul>
      <button type="submit" className={styles.submit}>Add new recipe</button>
    </section>
  );
};

export default RecipeConstructor;
