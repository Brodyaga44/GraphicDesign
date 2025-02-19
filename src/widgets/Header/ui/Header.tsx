import { useNavigate } from "react-router-dom";

import styles from "./header.module.scss";

const Header = () => {
  const navigate = useNavigate();
  const onLog = () => {
    console.log("1");
    navigate("/login");
  };
  const onReg = () => {
    console.log("1");
    navigate("/reg");
  };
  return (
    <header className={styles.header}>
      <div className={styles.header__content}>
        <div className={styles.header__logo}>Graphico</div>
        <div className={styles.header__itemsContainer}>
          <div className={styles.header__item}>О Нас</div>
          <div className={styles.header__item} onClick={() => onReg()}>
            Регистрация
          </div>
          <div className={styles.header__log} onClick={() => onLog()}>
            Вход
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
