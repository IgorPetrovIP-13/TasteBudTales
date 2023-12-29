import { toast } from "react-toastify";
import styles from "./SaveShareBlock.module.css";
import {
  TelegramShareButton,
  TwitterShareButton,
  TelegramIcon,
  TwitterIcon,
} from "react-share";
import { useAuth } from "../../hooks/useAuth";
import { useState, useEffect } from "react";
import save from "@/assets/icons/save.svg";
import saveClicked from "@/assets/icons/saveClicked.svg";
import share from "@/assets/icons/share.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToSaved, removeFromSaved } from "../../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { firestoreDb } from "../../firebase";

const SaveShareBlock = ({ id, isAuthor, tags }) => {
  const currentUrl = window.location.href;
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const user = useAuth();
  const dispatch = useDispatch();
  const savedList = useSelector((state) => state.user.saved);
  const navigate = useNavigate();

  useEffect(() => {
    if (savedList.includes(id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [savedList, dispatch]);

  function handleCopy() {
    try {
      window.navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied!");
    } catch (e) {
      console.error(e);
      toast.error("Error!");
    }
  }

  const handleSave = () => {
    setIsSaving(true);
    if (isSaved) {
      dispatch(removeFromSaved(id)).then(() => {
        setIsSaving(false);
      });
    } else {
      dispatch(addToSaved(id)).then(() => {
        setIsSaving(false);
      });
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteDoc(doc(firestoreDb, "recipes", id));
      navigate("/");
      toast.info("Recipe deleted!");
    } catch (e) {
      setIsDeleting(false);
      console.error(e);
      toast.error("Error!");
    }
  };

  return (
    <div className={styles.globalWrapper}>
      {user.isAuth && (
        <div className={styles.btnWrapper}>
          <h5 className={styles.optionH}>
            {isAuthor ? "Delete" : isSaved ? "Unsave" : "Save"}:
          </h5>
          {isAuthor ? (
            <button
              disabled={isDeleting}
              onClick={() => handleDelete()}
              className={styles.deleteButton}
            >
              {isDeleting ? "...Deleting" : "Delete"}
            </button>
          ) : (
            <button
              onClick={() => handleSave(id)}
              className={styles.saveBtn}
              disabled={isSaving}
              style={{ pointerEvents: isSaving ? "none" : "auto" }}
            >
              {isSaving ? (
                <div className={styles["lds-dual-ring"]}></div>
              ) : (
                <img src={!isSaved ? save : saveClicked} alt="save" />
              )}
            </button>
          )}
        </div>
      )}
      <div className={styles.btnWrapper}>
        <h5 className={styles.optionH}>Share:</h5>
        <TelegramShareButton title="Give this recipe a try!" url={currentUrl}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <TwitterShareButton
          hashtags={["TasteBudTales", "cooking", ...tags]}
          title="Give this recipe a try!"
          url={currentUrl}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <button onClick={() => handleCopy()} className={styles.shareBtn}>
          <img src={share} alt="share" />
        </button>
      </div>
    </div>
  );
};

export default SaveShareBlock;
