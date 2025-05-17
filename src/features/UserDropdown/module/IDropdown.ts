import React from "react";

export interface IDropdown {
  children: React.ReactNode;
  items: React.ReactNode;
  profileButton?: React.ReactNode;
  // open: boolean;
  // setOpen: (e: boolean) => void;
}
