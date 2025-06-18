import { ILogUser } from "@/features/AddLoginForm/module/ILogUser.ts";
import { IUserData } from "@/shared/config/api/ILoginOutput.ts";

export interface IAuth {
  user: IUserData | null;
  login?: (data: ILogUser) => void;
  logout?: () => void;
}
