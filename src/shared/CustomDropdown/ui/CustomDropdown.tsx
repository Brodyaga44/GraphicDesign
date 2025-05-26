import { Dropdown } from "antd";
import clsx from "clsx";

import styles from "./CustomDropdown.module.scss";

import ICustomDropdownProps from "@/shared/CustomDropdown/ui/ICustomDropdownProps.ts";

const CustomDropdown = (props: ICustomDropdownProps) => {
  const { className, items, children, onClick, ...otherProps } = props;

  const rootClasses = clsx(className, styles.customDropdown);

  return (
    <Dropdown menu={{ items }} className={rootClasses} {...otherProps}>
      <button onClick={onClick}>{children}</button>
    </Dropdown>
  );
};

export default CustomDropdown;
