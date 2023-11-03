import { useDispatch, useSelector } from "react-redux";
import styles from "./AddCharacteristics.module.css";
import {
  changeTime,
  changeServingsNum,
  changeComplexity,
  changeCategory,
} from "../../reducers/constructorReducer";
import clock from "@/assets/icons/clock.svg";
import serving from "@/assets/icons/portion.svg";
import complexitySvg from "@/assets/icons/complexity.svg";
import categorySvg from "@/assets/icons/category.svg";

const AddCharacteristics = () => {
  const time = useSelector((state) => state.recipeConstructor.cookingTime);
  const portions = useSelector((state) => state.recipeConstructor.servingsNum);
  const complexity = useSelector(
    (state) => state.recipeConstructor.cookingComplexity
  );
  const category = useSelector((state) => state.recipeConstructor.category);
  const dispatch = useDispatch();

  function handleTimeChange(value) {
    dispatch(changeTime(value));
  }

  function handlePortionsChange(value) {
    dispatch(changeServingsNum(value));
  }

  function handleComplexityChange(value) {
    dispatch(changeComplexity(value));
  }

  function handleCategoryChange(value) {
    dispatch(changeCategory(value));
  }

  return (
    <ul className={styles.wrapper}>
      <li className={styles.characteristic}>
        <img src={clock} alt="clock" />
        <h3>Time in min.</h3>
        <input
          value={time}
          type="number"
          onChange={(e) => handleTimeChange(e.target.value)}
        />
      </li>
      <li className={styles.characteristic}>
        <img src={serving} alt="portions" />
        <h3>Servings</h3>
        <input
          value={portions}
          type="number"
          onChange={(e) => handlePortionsChange(e.target.value)}
        />
      </li>
      <li className={styles.characteristic}>
        <img src={complexitySvg} alt="complexity" />
        <h3>Complexity</h3>
        <div className={styles.unitSelect}>
          <select
            onChange={(e) => handleComplexityChange(e.target.value)}
            className={styles.innerSelect}
            value={complexity}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
      </li>
      <li className={styles.characteristic}>
        <img src={categorySvg} alt="category" />
        <h3>Category</h3>
        <div className={styles.unitSelect}>
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            className={styles.innerSelect}
            value={category}
          >
            <option value="soups">soup</option>
            <option value="salads">salad</option>
            <option value="side_dishes">side dish</option>
            <option value="main_dishes">main dish</option>
            <option value="appetizers">appetizer</option>
            <option value="bakery">bakery</option>
            <option value="beverages">beverage</option>
          </select>
        </div>
      </li>
    </ul>
  );
};

export default AddCharacteristics;
