import { useNavigate } from "react-router-dom";
import styles from "./NoPage.module.css";
import pan from "@/assets/icons/pan.svg";

const NoPage = () => {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.heading}>
        4
        <img
          className={styles.panImg}
          src={pan}
          alt="pan"
        />
        4
      </h1>
      <p className={styles.description}>
        Sorry, the page you are looking for doesn't exist.
      </p>
      <button className={styles.goBack} onClick={goBack}>go back</button>
    </section>
  );
};

export default NoPage;
