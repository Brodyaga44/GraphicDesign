import styles from "./userdescription.module.scss";

import Photo from "@/shared/assets/Photos/photo.png";
import { HeaderProps } from "@/shared/config/interfaces/Header/HeaderProps.ts";
const UserDescription = ({ currUser }: HeaderProps) => {
  return (
    <div className={styles.description}>
      <div className={styles.description__info}>
        <div className={styles.description__photoBorder}>
          <div className={styles.description__photoContainer}>
            <img src={Photo} alt="" className={styles.description__photo}></img>
          </div>
        </div>

        <div className={styles.description__activity}>
          <div className={styles.description__activityItem}>
            {currUser.posts}{" "}
            <span className={styles.description__activityTitle}>Posts</span>
          </div>
          <div className={styles.description__activityItem}>
            {currUser.followersCount}
            <span className={styles.description__activityTitle}>Followers</span>
          </div>
          <div className={styles.description__activityItem}>
            {currUser.followingCount}
            <span className={styles.description__activityTitle}>Following</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDescription;
