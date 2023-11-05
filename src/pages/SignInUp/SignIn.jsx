import LogForm from "../../components/LoginRegistration/LogForm";
import styles from "./SignInUp.module.css";
import recipeKeeper from "@/assets/icons/recipe-keeper.svg";

const Login = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img
          style={{margin: "-1rem"}}
          className={styles.img}
          src={recipeKeeper}
          alt="chefSvg"
        />
        <p>Ready to post a new recipe ?</p>
      </div>
      <LogForm />
    </section>
  );
};

export default Login;
