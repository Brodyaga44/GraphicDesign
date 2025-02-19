import styles from "./userpage.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext.ts";
import { User } from "@/shared/config/interfaces/User/User.ts";
import { Footer, UserHeader } from "@/widgets";

const UserPage = () => {
  const { user } = useAuthContext();

  console.log(user);
  return (
    <main>
      <UserHeader currUser={User} />
      <h6> Тестовая страница</h6>
      <div className={styles.user__content}>user</div>
      <Footer />
    </main>
  );
};

export default UserPage;
