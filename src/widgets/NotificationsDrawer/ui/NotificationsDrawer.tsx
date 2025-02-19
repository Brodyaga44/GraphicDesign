import { Drawer } from "antd";

import styles from "./notificationsdrawer.module.scss";

import AccountNotifications from "@/features/AccountNotifications/ui/AccountNotifications.tsx";
import Arrow from "@/shared/assets/Icons/ArrowBack.svg?react";

const NotificationsDrawer = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
}) => {
  // const showDrawer = () => {
  //   setOpen(true);
  // };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.drawer}>
      <Drawer
        title="Your Notifications"
        closeIcon={<Arrow style={{ height: 24 }} />}
        placement="left"
        closable={true}
        onClose={onClose}
        open={open}
      >
        <AccountNotifications />
      </Drawer>
    </div>
  );
};

export default NotificationsDrawer;
