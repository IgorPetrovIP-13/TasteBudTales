import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../../hooks/useAuth";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, firestoreDb } from "../../firebase";
import { toast } from "react-toastify";
import styles from "./ProfileSettings.module.css";
import ConfirmDelete from "../../components/ConfirmDelete/ConfirmDelete";

const ValidationSchema = Yup.object().shape({
  nickName: Yup.string()
    .notRequired()
    .matches(/^[a-zA-Z0-9]+$/, "Nickname can only contain letters/numbers")
    .min(2, "Nickname must be at least 2 characters")
    .max(15, "Nickname can't exceed 15 characters"),
  fullName: Yup.string()
    .notRequired()
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Incorrect full name")
    .min(5, "Full name must be at least 5 characters")
    .max(40, "Full name can't exceed 40 characters"),
  description: Yup.string()
    .notRequired()
    .min(5, "Description must be at least 5 characters")
    .max(150, "Description can't exceed 150 characters"),
});

function ProfileSettings() {
  const user = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  async function handleSubmit(values) {
    const userRef = doc(firestoreDb, "users", user.uid);
    setIsSubmitting(true);
    try {
      await updateDoc(userRef, {
        nickname: values.nickName.trim() || user.nickname,
        fullName: values.fullName.trim() || user.fullName,
        description: values.description.trim() || user.description,
      });
      toast.success("Profile updated");
      navigate("/profile");
    } catch (error) {
      toast.error("Error on update");
      console.error("Error updating document: ", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user.isAuth) {
    return <></>;
  }

  return (
    <section>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Update your profile data</h1>
        <Formik
          initialValues={{
            nickName: user.nickname,
            fullName: user.fullName,
            description: user.description,
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          validationSchema={ValidationSchema}
          validateOnBlur
        >
          <Form className={styles.form}>
            <div className={styles.container}>
              <div className={styles.inputWrapper}>
                <label className={styles.inputLabel} htmlFor="nickNameForm">
                  Nickname
                </label>
                <Field
                  placeholder={user.nickname}
                  id="nickNameForm"
                  type="text"
                  name="nickName"
                  className={styles.input}
                />
                <ErrorMessage
                  name="nickName"
                  component={"span"}
                  className={styles.error}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.inputLabel} htmlFor="fullNameForm">
                  Full Name
                </label>
                <Field
                  placeholder={user.fullName}
                  id="fullNameForm"
                  type="text"
                  name="fullName"
                  className={styles.input}
                />
                <ErrorMessage
                  name="fullName"
                  component={"span"}
                  className={styles.error}
                />
              </div>
              <div className={styles.inputWrapper}>
                <label className={styles.inputLabel} htmlFor="descriptionForm">
                  Description
                </label>
                <Field
                  placeholder={user.description}
                  as={TextareaAutosize}
                  id="descriptionForm"
                  name="description"
                  className={styles.inputTextArea}
                />
                <ErrorMessage
                  name="description"
                  component={"span"}
                  className={styles.error}
                />
              </div>
            </div>
            <div className={styles.buttonsWrapper}>
              <button type="submit" className={styles.submitButton}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsPasswordConfirm(true)}
                style={{ backgroundColor: "var(--light-red)" }}
                type="button"
                className={styles.submitButton}
              >
                {"Delete account"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
      {isPasswordConfirm && (
        <ConfirmDelete closeFunc={() => setIsPasswordConfirm(false)}/>
      )}
    </section>
  );
}

export default ProfileSettings;
