import styles from "./ClosedRecipeCard.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import saveSvg from "@/assets/icons/save.svg";
import saveClicked from "@/assets/icons/saveClicked.svg";
import clock from "@/assets/icons/clock.svg";
import serving from "@/assets/icons/portion.svg";
import complexitySvg from "@/assets/icons/complexity.svg";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeFromSaved } from "../../reducers/userReducer";

const ClosedRecipeCard = ({
  imgLink,
  name,
  cookingTime,
  servingsNum,
  complexity,
  recipeID,
  userID,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const savedList = useSelector((state) => state.user.saved);
  const user = useAuth();

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    if (isSaved) {
      dispatch(removeFromSaved(recipeID)).then(() => {
        setIsSaving(false);
      });
    } else {
      dispatch(addToSaved(recipeID)).then(() => {
        setIsSaving(false);
      });
    }
  };

  useEffect(() => {
    if (savedList.includes(recipeID)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [savedList, dispatch]);

  return (
    <div className={styles.wrapper}>
      <SkeletonTheme
        baseColor="var(--dark-grey-secondary)"
        highlightColor="var(--grey)"
      >
        {user.isAuth &&
          !isLoading &&
          (userID === user.uid ? null : (
            <button
              onClick={() => handleSave()}
              className={styles.saveButton}
              disabled={isSaving}
              style={{ pointerEvents: isSaving ? "none" : "auto" }}
            >
              {isSaving ? (
                <div className={styles["lds-dual-ring"]}></div>
              ) : (
                <img src={!isSaved ? saveSvg : saveClicked} alt="save" />
              )}
            </button>
          ))}
        <Link
          style={isLoading ? { pointerEvents: "none", marginTop: "-3px" } : {}}
          to={`/recipes/${recipeID}`}
        >
          <div className={styles.imgWrapper}>
            {isLoading && (
              <Skeleton
                className={styles.imgSkeleton}
                containerClassName={styles.imgSkeletonContainer}
                borderRadius={0}
              />
            )}
            <img onLoad={handleImageLoad} src={imgLink} alt="recipeImg" />
          </div>
          {isLoading ? (
            <Skeleton className={styles.nameSkeleton} />
          ) : (
            <h3 className={styles.recipeName}>{name}</h3>
          )}
          {isLoading ? (
            <div className={styles.characteristicsSkeletonWrapper}>
              <Skeleton
                className={styles.characteristicSkeleton}
                containerClassName={styles.characteristicSkeletonContainer}
              />
              <Skeleton
                className={styles.characteristicSkeleton}
                containerClassName={styles.characteristicSkeletonContainer}
              />
              <Skeleton
                className={styles.characteristicSkeleton}
                containerClassName={styles.characteristicSkeletonContainer}
              />
            </div>
          ) : (
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
          )}
        </Link>
      </SkeletonTheme>
    </div>
  );
};

export default ClosedRecipeCard;
