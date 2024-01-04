import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import styles from "./Form.module.css";
import * as Yup from "yup";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { firestoreDb } from "../../firebase.js";
import { toast } from "react-toastify";

const ValidationSchema = Yup.object().shape({
  nickName: Yup.string()
    .required("Enter your nickname")
    .matches(/^[a-zA-Z0-9]+$/, "Nickname can only contain letters/numbers")
    .min(2, "Nickname must be at least 2 characters")
    .max(15, "Nickname can't exceed 15 characters"),
  fullName: Yup.string()
    .notRequired()
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Incorrect full name")
    .min(5, "Full name must be at least 5 characters")
    .max(40, "Full name can't exceed 40 characters"),
  email: Yup.string()
    .email("Incorrect email format")
    .required("Enter your email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be <= 16 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?!.*\s).{6,16}$/,
      "Incorrect password data"
    ),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

function RegForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values) {
    setIsSubmitting(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredentials.user;
      const userRef = doc(firestoreDb, "users", user?.uid);
      await setDoc(
        userRef,
        {
          nickname: values.nickName.trim(),
          fullName: values.fullName.trim(),
          description: "",
          saved: [],
        },
        {
          maxAttempts: 1,
          backoffMillis: 3000,
        }
      );
      navigate("/profile");
      toast.success(`Signed Up as ${values.nickName}`);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("Account alreary exists, log in");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email");
          break;
        default:
          console.error(error);
      }
    }finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.heading}>
        <h2>Create an account</h2>
        <Link to="/login">Log in</Link>
      </div>
      {errorMessage && (
        <p className={styles.headingError}>
          <img src="./src/assets/icons/error.svg" alt="error" />
          {errorMessage}
        </p>
      )}
      <Formik
        initialValues={{
          nickName: "",
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validationSchema={ValidationSchema}
      >
        <Form className={styles.mainForm}>
          <div className={styles.container}>
            <div className={styles.inputWrapper}>
              <Field
                id="nickNameForm"
                type="text"
                name="nickName"
                className={styles.input}
              />
              <label className={styles.inputLabel} htmlFor="nickNameForm">
                Nickname
              </label>
              <ErrorMessage
                name="nickName"
                component={"span"}
                className={styles.error}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Field
                id="fullNameForm"
                type="text"
                name="fullName"
                className={styles.input}
              />
              <label className={styles.inputLabel} htmlFor="fullNameForm">
                Full Name (optional)
              </label>
              <ErrorMessage
                name="fullName"
                component={"span"}
                className={styles.error}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Field
                id="emailForm"
                type="text"
                name="email"
                className={styles.input}
              />
              <label className={styles.inputLabel} htmlFor="emailForm">
                Email
              </label>
              <ErrorMessage
                name="email"
                component={"span"}
                className={styles.error}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Field
                id="passwordForm"
                type="password"
                name="password"
                className={styles.input}
              />
              <label className={styles.inputLabel} htmlFor="passwordForm">
                Password
              </label>
              <ErrorMessage
                name="password"
                component={"span"}
                className={styles.error}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Field
                id="confirmPasswordForm"
                type="password"
                name="confirmPassword"
                className={styles.input}
              />
              <label
                className={styles.inputLabel}
                htmlFor="confirmPasswordForm"
              >
                Confirm password
              </label>
              <ErrorMessage
                name="confirmPassword"
                component={"span"}
                className={styles.error}
              />
            </div>
          </div>
          <button
            data-testid="submit-button"
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating new account..." : "Create an account"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegForm;
