import { useDispatch, useSelector } from "react-redux";
import styles from "./AddSteps.module.css";
import {
  addStep,
  removeStep,
  changeStepText,
} from "../../reducers/constructorReducer";
import TextareaAutosize from "react-textarea-autosize";

const AddSteps = () => {
  const steps = useSelector((state) => state.recipeConstructor.steps);
  const dispatch = useDispatch();

  function handleInput(index, value) {
    dispatch(changeStepText({index: index, text: value}))
  }

  function handleDelete(index) {
    dispatch(removeStep(index));
  }

  return (
    <>
      <ul>
        {steps.map((step, index) => (
          <li key={index} className={styles.stepContainer}>
            <h3 className={styles.stepHeader}>Step {index + 1}</h3>
            <div className={styles.stepTextWrapper}>
              <TextareaAutosize
                value={step.text}
                onChange={(event) => handleInput(index, event.target.value)}
                className={styles.stepText}
                placeholder="Enter step text"
                spellCheck={false}
                maxLength={500}
              />
              <span className={styles.counter}>{step.text.length}/500</span>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className={styles.removeBtn}
            >
              Delete step
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => dispatch(addStep())}
        className={styles.addStepButton}
      >
        <img src="./src/assets/icons/plus.svg" alt="plus" />
        Add Step
      </button>
    </>
  );
};

export default AddSteps;
