import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

import styles from "./custombutton.module.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  typeBtn?: "primary" | "secondary";
}
const CustomButton = ({
  children,
  typeBtn = "primary",
  ...props
}: IButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.btn,
        styles[`btn__${typeBtn}Type`],
        props?.className,
      )}
    >
      {children}
    </button>
  );
};

export default CustomButton;
