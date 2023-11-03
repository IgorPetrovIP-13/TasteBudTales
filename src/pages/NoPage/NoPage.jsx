import { useNavigate } from "react-router-dom";
import styles from "./NoPage.module.css";

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
          src="../../src/assets/icons/pan.svg"
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
