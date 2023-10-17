import { useSelector, useDispatch } from "react-redux";
import styles from "./AddDescription.module.css";
import { changeCommentary } from "../../reducers/constructorReducer";
import TextareaAutosize from "react-textarea-autosize";

const AddDescription = () => {
  const commentary = useSelector((state) => state.recipeConstructor.commentary);
  const dispatch = useDispatch();

  function handleInput(input) {
    dispatch(changeCommentary(input));
  }

  return (
    <div className={styles.commentaryWrapper}>
      <TextareaAutosize
        value={commentary}
        onChange={(event) => handleInput(event.target.value)}
        className={styles.commentary}
        placeholder="Enter short description"
        spellCheck={false}
        maxLength={150}
      />
      <span className={styles.counter}>{commentary.length}/150</span>
    </div>
  );
};

export default AddDescription;
