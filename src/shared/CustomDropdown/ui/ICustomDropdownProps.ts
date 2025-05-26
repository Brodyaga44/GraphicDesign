import { ReactNode } from "react";
import { DropdownProps, MenuProps } from "antd";

export default interface ICustomDropdownProps extends DropdownProps {
  className?: string;
  items?: MenuProps["items"];
  children?: ReactNode;
  onClick?: VoidFunction;
}
