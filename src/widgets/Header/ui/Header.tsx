import { useNavigate } from "react-router-dom";

import styles from "./header.module.scss";

import useAuth from "@/app/module/hooks/useAuth.ts";
import useAuthContext from "@/app/module/hooks/useAuthContext.ts";
import { SearchInput, UserDropdown } from "@/features";
import Photo from "@/shared/assets/Icons/DefaultPhoto.svg?react";

const Header = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const scrollToAbout = () => {
    navigate("/");
    navigate("#about");
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };
  const onLog = () => {
    console.log("1");
    navigate("/login");
  };
  const onReg = () => {
    console.log("1");
    navigate("/reg");
  };
  const handleClick = () => {
    auth.logout();
    console.log("logout");
    navigate("/login");
  };
  const goToProfile = () => {
    navigate("/profile");
  };
  const { user } = useAuthContext();
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
            <UserDropdown
              items={<div onClick={handleClick}>Выйти</div>}
              profileButton={<div onClick={goToProfile}>Профиль</div>}
            >
              <div>
                <Photo />
              </div>
            </UserDropdown>
          ) : (
            <div className={styles.header__account}>
              <div className={styles.header__item} onClick={() => onReg()}>
                Регистрация
              </div>
              <div className={styles.header__log} onClick={() => onLog()}>
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
