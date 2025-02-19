import { useNavigate } from "react-router-dom";

import styles from "./otheruser.module.scss";

import { RedirectLink } from "@/features/OtherUserHeader/ui/interfaces/RedirectLink.ts";
import ArrowBack from "@/shared/assets/Icons/ArrowBack.svg?react";
import Bell from "@/shared/assets/Icons/Bell.svg?react";
import Dots from "@/shared/assets/Icons/Dots.svg?react";
import Verified from "@/shared/assets/Icons/Verified.svg?react";
import { HeaderProps } from "@/shared/config/interfaces/Header/HeaderProps.ts";
const OtherUserHeader = ({ currUser }: HeaderProps) => {
  const navigate = useNavigate();
  const redirect = RedirectLink[0];
  const handleRedirect = () => {
    {
      console.log("redirected");
      navigate("/" + redirect.id);
    }
  };
  return (
    <div className={styles.oht__container}>
      <div className={styles.oht__leftPart} onClick={handleRedirect}>
        <ArrowBack />
      </div>
      <div className={styles.oht__nick}>
        <div className={styles.oht__nickContainer}>{currUser?.nick}</div>
        <div>
          <Verified />
        </div>
      </div>
      <div className={styles.oht__rightPart}>
        <div>
          <Bell />
        </div>
        <div>
          <Dots />
        </div>
      </div>
    </div>
  );
};

export default OtherUserHeader;
