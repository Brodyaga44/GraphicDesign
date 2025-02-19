import styles from "./link.module.scss";

import Pin from "@/shared/assets/Icons/pin.svg?react";
import { HeaderProps } from "@/shared/config/interfaces/Header/HeaderProps.ts";
const Link = ({ currUser }: HeaderProps) => {
  const handleClick = (url: string) => {
    window.location.href = `https://${url}`;
    console.log("1");
  };
  return (
    <div className={styles.link__container}>
      {currUser.links.map((data) => (
        <div
          key={data}
          className={styles.link__item}
          onClick={() => handleClick(data)}
        >
          <Pin />
          {data}
        </div>
      ))}
    </div>
  );
};

export default Link;
