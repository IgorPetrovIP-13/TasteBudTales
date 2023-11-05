import styles from "./ClosedRecipeCard.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import saveSvg from "@/assets/icons/save.svg";
import saveClicked from "@/assets/icons/saveClicked.svg";
import clock from "@/assets/icons/clock.svg";
import serving from "@/assets/icons/portion.svg";
import complexitySvg from "@/assets/icons/complexity.svg";
import { checkIsSaved, handleSave } from "../../utils/firebaseUtils";

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

  const handleImageLoad = () => {
    setIsImgLoading(false);
  };

  useEffect(() => {
    checkIsSaved(recipeID, setIsSaved, user.uid);
  }, []);

  return (
    <div className={styles.wrapper}>
      {user.isAuth &&
        (userID === user.uid ? (
          <button className={styles.editButton}>edit</button>
        ) : (
          <button
            onClick={() => handleSave(isSaved, recipeID, setIsSaved, user.uid)}
            className={styles.saveButton}
          >
            <img src={!isSaved ? saveSvg : saveClicked} alt="save" />
          </button>
        ))}
      <Link to={`/recipes/${recipeID}`}>
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
            <img src={clock} alt="clock" />
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
            <img src={serving} alt="serving" />
            <span>{servingsNum}</span>
          </div>
          <div className={styles.characteristic}>
            <img src={complexitySvg} alt="complexity" />
            <span>{complexity}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ClosedRecipeCard;
