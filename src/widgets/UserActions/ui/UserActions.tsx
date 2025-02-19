import styles from "./useractions.module.scss";

import { UserActionsSelector } from "@/features";
import AddUserIcon from "@/shared/assets/Icons/addUser.svg?react";

const UserActions = () => {
  return (
    <div className={styles.userA__container}>
      <UserActionsSelector />
      <div className={styles.userA__addUser}>
        <AddUserIcon />
      </div>
    </div>
  );
};

export default UserActions;
