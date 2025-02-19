import { Link, useNavigate } from "react-router-dom";

import styles from "./registration.module.scss";

import { RegForm } from "@/features";
import { CustomButton } from "@/shared";

const Registration = () => {
  const navigate = useNavigate();
  const onLogo = () => {
    navigate("/");
  };
  return (
    <div className={styles.reg}>
      <span className={styles.reg__logo} onClick={() => onLogo()}>
        Graphico
      </span>
      <div className={styles.reg__content}>
        <RegForm />
        <Link to="/login" className={styles.reg__back}>
          <CustomButton typeBtn={"secondary"}>Вход</CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default Registration;
