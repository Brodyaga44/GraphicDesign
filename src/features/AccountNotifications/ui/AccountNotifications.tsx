import styles from "./accountNotifications.module.scss";

import { NotificationsList } from "@/features/AccountNotifications/ui/interfaces/NotificationsList.ts";

const AccountNotifications = () => {
  return (
    <div className={styles.notifications}>
      <div className={styles.notifications__list}>
        {NotificationsList.map((notification) => (
          <div key={notification.id} className={styles.notifications__item}>
            {notification.content}{" "}
            <div className={styles.notifications__Close}>X</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountNotifications;
