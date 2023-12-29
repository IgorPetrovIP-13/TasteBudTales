import { ErrorMessage, Field, Form, Formik } from "formik";
import styles from "./Form.module.css";
import * as Yup from "yup";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Incorrect email format")
    .required("Enter your email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
});

function LogForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values) {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Logged in");
      navigate("/profile");
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          setErrorMessage("Invalid login or password");
          break;
        case "auth/invalid-credential":
          setErrorMessage("Invalid login or password");
        default:
          console.error(error.code);
      }
    }finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.heading}>
        <h2>Log in</h2>
        <Link to="/signup">Sign up</Link>
      </div>
      {errorMessage && (
        <p className={styles.headingError}>
          <img src="./src/assets/icons/error.svg" alt="error" />
          {errorMessage}
        </p>
      )}
      <Formik
        initialValues={{
          email: "",
          password: "",
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
                id="emailForm"
                type="text"
                name="email"
                className={styles.input}
              />
              <label className={styles.inputLabel} htmlFor="surnameForm">
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
          </div>
          <button
            data-testid="submit-button"
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LogForm;
