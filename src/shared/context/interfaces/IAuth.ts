import { ILogUser } from "@/features/AddLoginForm/module/ILogUser.ts";

export interface IAuth {
  user: ILogUser | null;
  login?: (data: ILogUser) => void;
  logout?: () => void;
}
