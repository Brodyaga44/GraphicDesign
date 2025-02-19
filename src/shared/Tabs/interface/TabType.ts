import { ReactElement, ReactNode } from "react";

export type TabType = {
  title: ReactNode;
  key: number;
  content: ReactElement;
};
