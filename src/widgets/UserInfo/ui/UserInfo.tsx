import styles from "./userinfo.module.scss";

import { UserDescription } from "@/entity";
import { Link } from "@/features";
import { HeaderProps } from "@/shared/config/interfaces/Header/HeaderProps.ts";

const UserInfo = ({ currUser }: HeaderProps) => {
  return (
    <div className={styles.uhi__content}>
      <UserDescription currUser={currUser} />
      <div className={styles.uhi__about}>
        <div className={styles.uhi__userName}>{currUser.name}</div>
        <div className={styles.uhi__userCat}>{currUser.category}</div>
        <div className={styles.uhi__userAbout}>{currUser.about}</div>
        <Link currUser={currUser} />
      </div>
    </div>
  );
};

export default UserInfo;
