import { createContext } from "react";

import { IAuth } from "@/shared/context/interfaces/IAuth.ts";

const AuthContext = createContext<IAuth>({
  user: null,
  // token: null,
});

export default AuthContext;
