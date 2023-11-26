import styles from "./PreloaderPage.module.css";

const PreloaderPage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.imgPreloader}>
        <div className={styles.ldsDualRing}></div>
      </div>
      <h1 className={styles.loaderH}>Loading page</h1>
    </section>
  );
};

export default PreloaderPage;
