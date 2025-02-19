import styles from "./badge.module.scss";

import { NotificationsList } from "@/features/AccountNotifications/ui/interfaces/NotificationsList.ts";
import Arrow from "@/shared/assets/Icons/arrow.svg?react";

const Badge = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
}) => {
  const showDrawer = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.badge}>
      <div className={styles.badge__notifyContainer} onClick={showDrawer}>
        {NotificationsList.length > 10 ? (
          <span>10+</span>
        ) : (
          <span>{NotificationsList.length}</span>
        )}
      </div>
      <div className={styles.badge__arrow}>
        <Arrow />
      </div>
    </div>
  );
};

export default Badge;
