import { useState } from "react";
import styles from "./ConfirmDelete.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, firestoreDb } from "../../firebase";
import { toast } from "react-toastify";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ConfirmDelete = ({ closeFunc }) => {
  const [passwordValue, setIsPasswordValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate()
  const user = useAuth();

  const handleInput = (value) => {
    setErrorMessage(null);
    setIsPasswordValue(value);
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        passwordValue
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      await deleteDoc(doc(firestoreDb, "users", user.uid));
      setIsDeleting(false);
      navigate("/");
      await auth.currentUser.delete();
      toast.info("Account deleted");
    } catch (error) {
      console.error("Error deleting account:", error.message);
      switch (error.code) {
        case "auth/missing-password":
          setErrorMessage("Missing password");
          break;
        case "auth/invalid-credential":
          setErrorMessage("Invalid password");
          break;
        case "auth/too-many-requests":
          toast.error("Too many requests");
          closeFunc();
          break;
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={styles.modalWrapper}
      onClick={() => {
        isDeleting ? {} : closeFunc();
      }}
    >
      <div onClick={(e) => e.stopPropagation()} className={styles.wrapper}>
        <h2 style={{ paddingBottom: "1.5rem", textAlign: "center", textTransform: "uppercase"}}>
          Delete your account
        </h2>
        <button onClick={closeFunc} className={styles.close} disabled={isDeleting}>
          ×
        </button>
        <form
          className={styles.submitDeleteForm}
          action=""
          onSubmit={(e) => handleDeleteAccount(e)}
        >
          <div className={styles.inputWrapper}>
            <input
              value={passwordValue}
              onChange={(e) => handleInput(e.target.value)}
              type="password"
              placeholder="Enter your password"
              maxLength={16}
              className={styles.input}
            />
            {errorMessage && (
              <span className={styles.error}>{errorMessage}</span>
            )}
          </div>
          <button
            className={styles.confirm}
            disabled={isDeleting}
            type="submit"
          >
            {isDeleting ? "Deleting..." : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDelete;
