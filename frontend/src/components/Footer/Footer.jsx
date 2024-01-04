import styles from "./Footer.module.css";
import github from "@/assets/icons/github.svg"
import telegram from "@/assets/icons/telegram.svg"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h5>Get in touch</h5>
      <div className={styles.iconsWrapper}>
        <a target="_blank" href="https://github.com/IgorPetrovIP-13"><img src={github} alt="github" /></a>
        <a target="_blank" href="https://t.me/pidodinero"><img src={telegram} alt="telegram" /></a>
      </div>
      <p className={styles.rules}>
        The website is not protected by any copyright. You are free to do
        whatever you want with the materials from it, no one cares.
      </p>
      <p className={styles.author}>© Igor Petrov 2023</p>
    </footer>
  );
};

export default Footer;
