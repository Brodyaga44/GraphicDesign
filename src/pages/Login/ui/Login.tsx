import { useNavigate } from "react-router-dom";

import styles from "./login.module.scss";

import { AddLoginForm } from "@/features";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/reg");
  };

  const onLogo = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <span className={styles.logo} onClick={onLogo}>
        Graphico
      </span>

      <div className={styles.card}>
        <AddLoginForm />

        <button className={styles.button} onClick={handleClick}>
          Регистрация
        </button>
      </div>
    </div>
  );
};

export default Login;
