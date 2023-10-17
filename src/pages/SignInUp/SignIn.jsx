import LogForm from "../../components/LoginRegistration/LogForm";
import styles from "./SignInUp.module.css";

const Login = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img
          style={{margin: "-1rem"}}
          className={styles.img}
          src="./src/assets/icons/recipe-keeper.svg"
          alt="chefSvg"
        />
        <p>Ready to post a new recipe ?</p>
      </div>
      <LogForm />
    </section>
  );
};

export default Login;
