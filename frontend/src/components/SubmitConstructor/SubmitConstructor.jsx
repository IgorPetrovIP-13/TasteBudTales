import styles from "./SubmitConstructor.module.css";
import { getCurrentDate } from "../../utils/dateFormatting";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { storage } from "../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { areAllFieldsFilled } from "../../utils/checkObjects";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearConstructor } from "../../reducers/constructorReducer";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestoreDb } from "../../firebase";

const SubmitConstructor = () => {
  const newRecipe = useSelector((state) => state.recipeConstructor);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();

  const cleanName = newRecipe.name.replace(/\s+/g, " ").trim();
  const cleanIngredients = newRecipe.ingredients.map((ingredient) => {
    return {
      weight: ingredient.weight.replace(/\s+/g, " ").trim(),
      unit: ingredient.unit,
      name: ingredient.name.replace(/\s+/g, " ").trim()
    };
  });
  const cleanSteps = newRecipe.steps.map((step) => {
    return {
      text: step.text.replace(/\s+/g, " ").trim()
    }
  });

  function checkRecipe() {
    switch (true) {
      case !cleanName:
        return "No dish name";
      case cleanName.length <= 3:
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
      case cleanIngredients.length <= 1:
        return "Recipe must contain at least 2 ingredients";
      case !areAllFieldsFilled(cleanIngredients):
        return "Some ingredients are invalid";
      case cleanSteps.length < 1:
        return "Recipe must contain at least 1 step";
      case !areAllFieldsFilled(cleanSteps):
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
      const recipesRef = doc(firestoreDb, "recipes", uniqueKey);
      try {
        await uploadBytes(imageRef, newRecipe.image);
        const imageLink = await getDownloadURL(imageRef);
        await setDoc(
          recipesRef,
          {
            name: cleanName,
            imageLink: imageLink,
            cookingTime: newRecipe.cookingTime,
            servingsNum: newRecipe.servingsNum,
            cookingComplexity: newRecipe.cookingComplexity,
            category: newRecipe.category,
            description: newRecipe.commentary.trim(),
            ingredients: cleanIngredients,
            steps: cleanSteps,
            updateDate: currentDate,
            userUid: user.uid,
            nickname: user.nickname,
            timestamp: serverTimestamp(),
            userCommentsLength: 0,
            comments: [],
          },
          {
            maxAttempts: 1,
            backoffMillis: 3000,
          }
        );
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
