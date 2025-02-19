import { NotificationsList } from "@/features/AccountNotifications/ui/interfaces/NotificationsList.ts";

const AccountNotifications = () => {
  return (
    <div>
      {NotificationsList.map((notification) => (
        <div key={notification.id}>{notification.content}</div>
      ))}
    </div>
  );
};

export default AccountNotifications;
