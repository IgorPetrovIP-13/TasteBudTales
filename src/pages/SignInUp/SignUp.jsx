import RegForm from "../../components/LoginRegistration/RegForm";
import styles from "./SignInUp.module.css";
import chef from "@/assets/icons/chef.svg";

const Register = () => {
  return (
    <section className={styles.wrapper}>
      <div style={{ marginRight: "4rem" }} className={styles.imgWrapper}>
        <img
          className={styles.img}
          src={chef}
          alt="chefSvg"
        />
        <p>Become a new chef !</p>
      </div>
      <RegForm />
    </section>
  );
};

export default Register;
