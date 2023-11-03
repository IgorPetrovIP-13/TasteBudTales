import styles from "./SubmitConstructor.module.css";
import { getCurrentDate } from "../../utils/dateFormatting";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, set } from "firebase/database";
import { areAllFieldsFilled } from "../../utils/checkObjects";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearConstructor } from "../../reducers/constructorReducer";

const SubmitConstructor = () => {
  const newRecipe = useSelector((state) => state.recipeConstructor);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();

  function checkRecipe() {
    switch (true) {
      case !newRecipe.name:
        return "No dish name";
      case newRecipe.name.length <= 3:
        return "Dish name length must be at least 3";
      case !newRecipe.image:
        return "No dish image";
      case !newRecipe.cookingTime:
        return "No cooking time";
      case Number(newRecipe.cookingTime) < 1:
        return "Cooking time must be >1";
      case Number(newRecipe.cookingTime) > 10000:
        return "Cooking time must be <10000";
      case !newRecipe.servingsNum:
        return "No servings number";
      case Number(newRecipe.servingsNum) < 1:
        return "Recipe must be for at least one serving";
      case Number(newRecipe.servingsNum) > 100:
        return "Recipe must be for <100 servings";
      case newRecipe.ingredients.length <= 1:
        return "Recipe must contain at least 2 ingredients";
      case !areAllFieldsFilled(newRecipe.ingredients):
        return "Some ingredients are invalid";
      case newRecipe.steps.length < 1:
        return "Recipe must contain at least 1 step";
      case !areAllFieldsFilled(newRecipe.steps):
        return "Some steps are invalid";
      default:
        return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const checkRecipeResult = checkRecipe();
    if (checkRecipeResult) {
      toast.error(checkRecipeResult);
    } else {
      setIsLoading(true);
      const currentDate = getCurrentDate();
      const uniqueKey = user.uid + Date.now();
      const imageRef = storageRef(
        storage,
        `recipeImages/${uniqueKey}/mainImg.${
          newRecipe.image.type.split("/")[1]
        }`
      );
      const recipesRef = dbRef(db, "recipes/" + uniqueKey);
      try {
        await uploadBytes(imageRef, newRecipe.image);
        const imageLink = await getDownloadURL(imageRef);
        await set(recipesRef, {
          name: newRecipe.name.trim(),
          imageLink: imageLink,
          cookingTime: newRecipe.cookingTime,
          servingsNum: newRecipe.servingsNum,
          cookingComplexity: newRecipe.cookingComplexity,
          category: newRecipe.category,
          description: newRecipe.commentary.trim(),
          ingredients: newRecipe.ingredients,
          steps: newRecipe.steps,
          updateDate: currentDate,
          userUid: user.uid,
          nickname: user.nickname
        });
        dispatch(clearConstructor());
        toast.success("New recipe created");
        navigate(`/recipes/${uniqueKey}`);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return (
    <button
      onClick={(e) => handleSubmit(e)}
      type="submit"
      className={styles.submit}
      disabled={isLoading}
    >
      {isLoading ? "Creating..." : "Submit recipe"}
    </button>
  );
};

export default SubmitConstructor;
