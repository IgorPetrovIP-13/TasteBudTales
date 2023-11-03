import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { get, ref, update, off } from "firebase/database";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import styles from "./Comments.module.css";
import TextareaAutosize from "react-textarea-autosize";
import { Rating } from "react-simple-star-rating";
import { getCurrentDate } from "../../utils/dateFormatting";
import { Link } from "react-router-dom";

const fillColorArray = ["#f17a45", "#f19745", "#f1a545", "#f1b345", "#f1d045"];

const LeaveCommentForm = ({ resetFunc, recipeRef, uid }) => {
  const user = useAuth();
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const tooltipArray = ["Terrible", "Bad", "Average", "Great", "Awesome"];

  function handleInput(value) {
    setCommentText(value);
  }

  function checkFields() {
    switch (true) {
      case !rating && uid !== user.uid:
        return "No rating";
      case !commentText && uid === user.uid:
        return "No comment text";
      default:
        return null;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fieldsCheck = checkFields();
    if (fieldsCheck) {
      toast.error(fieldsCheck);
    } else {
      try {
        const recipeSnapshot = await get(recipeRef);
        const recipeData = await recipeSnapshot.val();
        const commentsArr = recipeData.comments || [];
        commentsArr.unshift({
          nickname: user.nickname,
          uid: user.uid,
          rate: uid === user.uid ? 6 : rating,
          text: commentText,
          date: getCurrentDate(),
        });
        await update(recipeRef, { comments: commentsArr });
        toast.success("New comment added");
        resetFunc();
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div>
      <form className={styles.leaveCommentWrapper} action="">
        {user.uid !== uid ? (
          <Rating
            size={25}
            onClick={(rate) => setRating(rate)}
            showTooltip
            transition
            fillColorArray={fillColorArray}
            tooltipArray={tooltipArray}
            tooltipStyle={{
              marginLeft: "5px",
              color: "var(--white)",
              fontSize: "14px",
              padding: "5px 12px",
              pointerEvents: "none",
            }}
          />
        ) : (
          <h5>Author comment</h5>
        )}
        <div className={styles.textAreaWrapper}>
          <TextareaAutosize
            value={commentText}
            onChange={(event) => handleInput(event.target.value)}
            spellCheck={false}
            maxLength={250}
            placeholder="Enter commentary"
          />
          <span>{commentText.length}/250</span>
        </div>
        <button
          className={styles.submitButton}
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
          Leave comment
        </button>
      </form>
    </div>
  );
};

const Comments = ({ id, recipeUid }) => {
  const user = useAuth();
  const [comments, setComments] = useState([]);
  const [displayComments, setDisplayComments] = useState(comments);
  const [tabNum, setTabNum] = useState(1);
  const recipeRef = ref(db, "recipes/" + id);

  useEffect(() => {
    async function getComments() {
      try {
        const snapshot = await get(recipeRef);
        const res = await snapshot.val();
        if (res.comments !== undefined) {
          setComments(res.comments);
          setDisplayComments(res.comments);
        } else {
          setComments([]);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getComments();
  }, [tabNum, id]);

  function handleFilterChange(value) {
    const sortedComments = [...comments];
    switch (value) {
      case "high":
        sortedComments.sort((a, b) => b.rate - a.rate);
        break;
      case "low":
        sortedComments.sort((a, b) => {
          if (a.rate === 6 && b.rate !== 6) {
            return -1;
          } else if (a.rate !== 6 && b.rate === 6) {
            return 1;
          } else {
            return a.rate - b.rate;
          }
        });
        break;
      case "new":
        break;
      case "old":
        sortedComments.reverse();
        break;
      default:
        break;
    }
    setDisplayComments(sortedComments);
  }

  return (
    <div className={styles.commentsWrapper}>
      <ul className={styles.commentsTabs}>
        <li
          className={`${styles.tab} ${tabNum === 1 ? styles.active : ""}`}
          onClick={() => setTabNum(1)}
        >
          Comments
        </li>
        {user.isAuth && (
          <li
            className={`${styles.tab} ${tabNum === 2 ? styles.active : ""}`}
            onClick={() => setTabNum(2)}
          >
            Leave comment
          </li>
        )}
      </ul>
      <div className={styles.tabContent}>
        {tabNum === 1 &&
          (displayComments.length > 0 ? (
            <>
              <div className={styles.unitSelect}>
                <select
                  onChange={(e) => handleFilterChange(e.target.value)}
                  defaultValue="latest"
                  className={styles.innerSelect}
                >
                  <option value="new">New to old</option>
                  <option value="old">Old to new</option>
                  <option value="high">High rates to low</option>
                  <option value="low">Low rates to high</option>
                </select>
              </div>
              <div className={styles.allComments}>
                {displayComments.map((comment) => (
                  <div
                    className={`${styles.userComment} ${
                      comment.uid === recipeUid ? styles.byAuthor : ""
                    }`}
                  >
                    {comment.uid !== recipeUid && (
                      <Rating
                        initialValue={comment.rate}
                        size={19}
                        readonly
                        fillColorArray={fillColorArray}
                      />
                    )}
                    <h4 className={styles.commentNick}>
                      <Link
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "max-content",
                        }}
                        to={`/users/${comment.uid}`}
                      >
                        {comment.nickname}
                        {comment.uid === recipeUid && (
                          <img
                            style={{
                              width: "1.3rem",
                              height: "1.3em",
                              marginLeft: "0.2rem",
                            }}
                            src="../../src/assets/icons/cook.svg"
                            alt="(Author)"
                          />
                        )}
                      </Link>
                    </h4>
                    {comment.text && <p>{comment.text}</p>}
                    <time>{comment.date}</time>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2>No comments yet</h2>
          ))}
        {tabNum === 2 && user.isAuth && (
          <LeaveCommentForm
            resetFunc={() => setTabNum(1)}
            recipeRef={recipeRef}
            uid={recipeUid}
          />
        )}
      </div>
    </div>
  );
};

export default Comments;
