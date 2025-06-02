import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./header.module.scss";

import useAuth from "@/app/module/hooks/useAuth.ts";
import useAuthContext from "@/app/module/hooks/useAuthContext.ts";
import { Badge, SearchInput, UserDropdown } from "@/features";
import { usersData } from "@/pages/UserPage/model/usersData.ts";
import Photo from "@/shared/assets/Icons/DefaultPhoto.svg?react";
import { NotificationsDrawer } from "@/widgets";

const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [open, setOpen] = useState(false);

  const scrollToAbout = () => {
    navigate("/");
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      aboutSection?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const onLog = () => {
    navigate("/login");
  };

  const onReg = () => {
    navigate("/reg");
  };

  const handleClick = () => {
    auth.logout();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const { user } = useAuthContext();

  // Ищем пользователя по user.log (username) в нижнем регистре
  const currentUser = user
    ? usersData.find((u) => u.username.toLowerCase() === user.log.toLowerCase())
    : null;

  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__leftPart}>
          <div className={styles.header__logo} onClick={() => navigate("/")}>
            Graphico
          </div>
          <SearchInput />
        </div>
        <div className={styles.header__itemsContainer}>
          <div className={styles.header__item} onClick={scrollToAbout}>
            О Нас
          </div>

          {user ? (
            <div className={styles.headerUserBlock}>
              <Badge open={open} setOpen={setOpen} />
              <UserDropdown
                items={<div onClick={handleClick}>Выйти</div>}
                profileButton={<div onClick={goToProfile}>Профиль</div>}
              >
                <div>
                  {currentUser && currentUser.photo ? (
                    <img
                      src={currentUser.photo}
                      alt={currentUser.name || "user photo"}
                      className={styles.userPhoto}
                      style={{ width: 32, height: 32, borderRadius: "50%" }}
                    />
                  ) : (
                    <Photo />
                  )}
                </div>
              </UserDropdown>
              <NotificationsDrawer open={open} setOpen={setOpen} />
            </div>
          ) : (
            <div className={styles.header__account}>
              <div className={styles.header__item} onClick={onReg}>
                Регистрация
              </div>
              <div className={styles.header__log} onClick={onLog}>
                Вход
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
