import styles from "./userpage.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext.ts";
import { User } from "@/shared/config/interfaces/User/User.ts";
import { Footer, UserHeader } from "@/widgets";
import Header from "@/widgets/Header/ui/Header.tsx";

const UserPage = () => {
  const { user } = useAuthContext();

  console.log(user);
  return (
    <main>
      <Header />
      <div>Ваш профиль</div>
      <div>Ваше фото</div>
      <div>Ваш статус</div>
      <div>Ваши заказы</div>
      <div className={styles.user__content}>user</div>
      <Footer />
    </main>
  );
};

export default UserPage;
