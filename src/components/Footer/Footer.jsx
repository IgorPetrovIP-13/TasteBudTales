import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h5>Get in touch</h5>
      <div className={styles.iconsWrapper}>
        <a target="_blank" href="https://github.com/IgorPetrovIP-13"><img src="../../src/assets/icons/github.svg" alt="github" /></a>
        <a target="_blank" href="https://t.me/pidodinero"><img src="../../src/assets/icons/telegram.svg" alt="telegram" /></a>
      </div>
      <p className={styles.rules}>
        The website is not protected by any copyright. You are free to do
        whatever you want with the materials from it, no one cares.
        <br />
        P.S. I wouldn't recommend leaving important data here, as I'm not very
        skilled in cybersecurity.
      </p>
      <p className={styles.author}>© Igor Petrov 2023</p>
    </footer>
  );
};

export default Footer;
