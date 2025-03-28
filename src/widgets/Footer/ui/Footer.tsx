import styles from "./footer.module.scss";

import Inst from "@/shared/assets/Icons/instagram.svg?react";
import TT from "@/shared/assets/Icons/tiktok.svg?react";
import VK from "@/shared/assets/Icons/vk.svg?react";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer__left}>
        <span className={styles.footer__logo}>Graphico</span>
        <span className={styles.footer__copyright}>
          © Graphico International Ltd. 2025
        </span>
      </section>
      <section className={styles.footer__right}>
        <TT className={styles.footer__icon} />
        <Inst className={styles.footer__icon} />
        <VK className={styles.footer__icon} />
      </section>
    </footer>
  );
};

export default Footer;
