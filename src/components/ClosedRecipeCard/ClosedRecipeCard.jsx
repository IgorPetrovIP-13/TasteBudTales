import styles from "./ClosedRecipeCard.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { ref, update, get, onValue, off } from "firebase/database";
import { toast } from "react-toastify";

const ClosedRecipeCard = ({
  imgLink,
  name,
  cookingTime,
  servingsNum,
  complexity,
  recipeID,
  userID,
}) => {
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const user = useAuth();
  const userRef = ref(db, "users/" + user.uid);

  const handleImageLoad = () => {
    setIsImgLoading(false);
  };

  useEffect(() => {
    onValue(ref(db, "users/" + user.uid), (snapshot) => {
      if (snapshot.val().saved !== undefined) {
        if (snapshot.val().saved.includes(recipeID)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      }
      else {
        setIsSaved(false);
      }
    });
    return () => {
      off(userRef)
    }
  }, []);

  async function handleSave() {
    try {
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();
      const savedSet = new Set(userData.saved || []);
      isSaved ? savedSet.delete(recipeID) : savedSet.add(recipeID);
      await update(userRef, {
        saved: [...savedSet],
      });
      toast.success(isSaved ? "Recipe unsaved" : "Recipe saved");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className={styles.wrapper}>
      {user.isAuth &&
        (userID === user.uid ? (
          <button className={styles.editButton}>edit</button>
        ) : (
          <button onClick={() => handleSave()} className={styles.saveButton}>
            <img
              src={
                !isSaved
                  ? "./src/assets/icons/save.svg"
                  : "./src/assets/icons/saveClicked.svg"
              }
              alt="save"
            />
          </button>
        ))}
      <Link to={`/recipes/${recipeID}`} >
        <div className={styles.imgWrapper}>
          {isImgLoading && (
            <div className={styles.imgPreloader}>
              <div className={styles.ldsDualRing}></div>
            </div>
          )}
          <img onLoad={handleImageLoad} src={imgLink} alt="recipeImg" />
        </div>
        <h3 className={styles.recipeName}>{name}</h3>
        <div className={styles.characteristicsWrapper}>
          <div className={styles.characteristic}>
            <img src="./src/assets/icons/clock.svg" alt="clock" />
            <span>
              {cookingTime > 60
                ? Math.floor(cookingTime / 60) +
                  "h." +
                  " " +
                  (cookingTime % 60) +
                  "m."
                : cookingTime + "m."}
            </span>
          </div>
          <div className={styles.characteristic}>
            <img src="./src/assets/icons/portion.svg" alt="clock" />
            <span>{servingsNum}</span>
          </div>
          <div className={styles.characteristic}>
            <img src="./src/assets/icons/complexity.svg" alt="clock" />
            <span>{complexity}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClosedRecipeCard;
