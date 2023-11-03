import { useDispatch, useSelector } from "react-redux";
import styles from "./AddIngredients.module.css";
import { useRef } from "react";
import {
  addIngredient,
  removeIngredient,
  changeIngredientWeight,
  changeIngredientUnit,
  changeIngredientName,
} from "../../reducers/constructorReducer";
import plus from "@/assets/icons/plus.svg"
import cross from "@/assets/icons/cross.svg";

const units = ["g", "kg", "ml", "l", "-", "tsp", "tbsp", "cup"];

const AddIngredients = () => {
  const ingredientsList = useSelector(
    (state) => state.recipeConstructor.ingredients
  );
  const dispatch = useDispatch();
  const list = useRef(null);

  function handleWeightChange(value, index) {
    if (/^[0-9/.,\\-\s]*$/.test(value)) {
      dispatch(changeIngredientWeight({ weight: value, index: index }));
    }
  }

  function handleUnitChange(value, index) {
    dispatch(changeIngredientUnit({ unit: value, index: index }));
  }

  function handleNameChange(value, index) {
    dispatch(changeIngredientName({ name: value, index: index }));
  }

  function handleRemove(index) {
    dispatch(removeIngredient(index));
  }

  function addingIngredient() {
    dispatch(addIngredient());
  }

  return (
    <>
      <ul ref={list} className={styles.ingredientsUl}>
        {ingredientsList.map((ingredient, index) => (
          <li key={index} className={styles.ingredientLi}>
            <input
              className={styles.weightInput}
              onChange={(e) => handleWeightChange(e.target.value, index)}
              type="text"
              value={ingredient.weight}
              placeholder="Weight"
            />
            <div className={styles.unitSelect}>
              <select
                onChange={(e) => handleUnitChange(e.target.value, index)}
                defaultValue="g"
                className={styles.innerSelect}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <input
              className={styles.nameInput}
              onChange={(e) => handleNameChange(e.target.value, index)}
              type="text"
              value={ingredient.name}
              placeholder="Name"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className={styles.crossBtn}
            >
              <img
                className={styles.crossIcon}
                src={cross}
                alt="cross"
              />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={() => addingIngredient()}
        className={styles.addIngredientButton}
      >
        <img src={plus} alt="plus" />
        Add Ingredient
      </button>
    </>
  );
};

export default AddIngredients;
