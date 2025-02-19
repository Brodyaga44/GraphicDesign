import styles from "./userhub.module.scss";

import Accordion from "@/shared/assets/Icons/Accordion.svg?react";
import Bookmark from "@/shared/assets/Icons/bookmark.svg?react";

const UserHub = () => {
  return (
    <div className={styles.hub__icons}>
      <div>
        <Bookmark />
      </div>
      <div>
        <Accordion />
      </div>
    </div>
  );
};

export default UserHub;
