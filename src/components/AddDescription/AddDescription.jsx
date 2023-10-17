import { useSelector, useDispatch } from "react-redux";
import styles from "./AddDescription.module.css";
import { changeCommentary } from "../../reducers/constructorReducer";
import { useEffect, useRef } from "react";

const AddDescription = () => {
  const commentary = useSelector((state) => state.recipeConstructor.commentary);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  function handleInput(input) {
    dispatch(changeCommentary(input));
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [commentary]);

  return (
    <div className={styles.commentaryWrapper}>
      <textarea
        ref={textareaRef}
        value={commentary}
        rows={1}
        maxLength={150}
        onChange={(event) => handleInput(event.target.value)}
        className={styles.commentary}
        placeholder="Enter short description"
        spellCheck={false}
      />
      <span className={styles.counter}>{commentary.length}/150</span>
    </div>
  );
};

export default AddDescription;
