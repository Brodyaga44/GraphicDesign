import styles from "./footer.module.scss";

import { Profile } from "@/features";
import Add from "@/shared/assets/Icons/Add.svg?react";
import Explore from "@/shared/assets/Icons/Explore.svg?react";
import Home from "@/shared/assets/Icons/Home.svg?react";
import Inbox from "@/shared/assets/Icons/inbox.svg?react";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div>
          <Home className={styles.footer__item} />
        </div>
        <div>
          <Explore className={styles.footer__item} />
        </div>
        <div>
          <Add className={styles.footer__item} />
        </div>
        <div>
          <Inbox className={styles.footer__item} />
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
