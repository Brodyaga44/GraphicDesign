import { IUser } from "@/shared/config/interfaces/User/IUser.ts";
export type IUserHeaderProps = {
  currUser: IUser;
  open: boolean;
  setOpen: (e: boolean) => void;
};
