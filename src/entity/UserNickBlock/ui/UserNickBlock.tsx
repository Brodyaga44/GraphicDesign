import styles from "./usernickblock.module.scss";

import { HeaderProps } from "@/shared/config/interfaces/Header/HeaderProps.ts";
const UserNickBlock = ({ currUser }: HeaderProps) => {
  return (
    <div className={styles.uht__container}>
      <div className={styles.uht__nickContainer}>{currUser?.nick}</div>
    </div>
  );
};

export default UserNickBlock;
