import Bell from "../../../shared/assets/Icons/Bell.svg?react";

import styles from "./badge.module.scss";

import { NotificationsList } from "@/features/AccountNotifications/ui/interfaces/NotificationsList";

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

  const notificationsCount =
    NotificationsList.length > 10 ? "10+" : NotificationsList.length;

  return (
    <div className={styles.badge} onClick={showDrawer}>
      <div className={styles.badge__bellWrapper}>
        <Bell />
        {NotificationsList.length > 0 && (
          <span className={styles.badge__count}>{notificationsCount}</span>
        )}
      </div>
    </div>
  );
};

export default Badge;
