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
import { ref, onValue, off } from "firebase/database";
import { db } from "../../firebase";
import save from "@/assets/icons/save.svg";
import saveClicked from "@/assets/icons/saveClicked.svg";
import share from "@/assets/icons/share.svg";
import { handleSave } from "../../utils/firebaseUtils";

const SaveShareBlock = ({ id, isAuthor, tags }) => {
  const currentUrl = window.location.href;
  const [isSaved, setIsSaved] = useState(false);
  const user = useAuth();
  const userRef = ref(db, "users/" + user.uid);

  useEffect(() => {
    onValue(ref(db, "users/" + user.uid), (snapshot) => {
      if (snapshot.val().saved !== undefined) {
        if (snapshot.val().saved.includes(id)) {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } else {
        setIsSaved(false);
      }
    });
    return () => {
      off(userRef);
    };
  }, []);

  function handleCopy() {
    try {
      window.navigator.clipboard.writeText(currentUrl);
      toast.success("Link copied!");
    } catch (e) {
      console.error(e);
      toast.error("Error!");
    }
  }

  return (
    <div className={styles.globalWrapper}>
      {user.isAuth && (
        <div className={styles.btnWrapper}>
          <h5 className={styles.optionH}>
            {isAuthor ? "Edit" : isSaved ? "Unsave" : "Save"}:
          </h5>
          {isAuthor ? (
            <button className={styles.editBtn}>Edit</button>
          ) : (
            <button onClick={() => handleSave(isSaved, id, setIsSaved, user.uid)} className={styles.saveBtn}>
              <img
                src={
                  !isSaved
                    ? save
                    : saveClicked
                }
                alt="save"
              />
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
