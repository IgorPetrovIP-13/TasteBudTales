import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../reducers/constructorReducer";
import styles from "./AddDishName.module.css";

const AddDishName = () => {
  const name = useSelector((state) => state.recipeConstructor.name);
  const dispatch = useDispatch();

  function handleInput(value) {
    dispatch(changeName(value));
  }
  return (
    <input
      className={styles.input}
      placeholder="Dish Name..."
      onChange={(e) => handleInput(e.target.value)}
      value={name}
      type="text"
      maxLength={50}
    />
  );
};

export default AddDishName;
