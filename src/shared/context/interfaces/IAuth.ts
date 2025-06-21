import type { ILogUser } from "@/features/AddLoginForm/module/ILogUser.ts";
import type { IUserData } from "@/shared/config/api/ILoginOutput.ts";

export interface IAuth {
  user: IUserData | null;
  setUser: (data: IUserData | null) => void;
  login?: (data: ILogUser) => void;
  logout?: () => void;
}
