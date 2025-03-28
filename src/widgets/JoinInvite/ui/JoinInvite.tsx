import { useNavigate } from "react-router-dom";

import styles from "./joininvite.module.scss";
const JoinInvite = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.join}>
      <div>
        С нами <span className={styles.join__specialText}>красиво</span>
      </div>
      <div className={styles.join__btn}>
        <div className={styles.join__text} onClick={() => navigate("/reg")}>
          Присоединиться
        </div>
      </div>
    </div>
  );
};

export default JoinInvite;
