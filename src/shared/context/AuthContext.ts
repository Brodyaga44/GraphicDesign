import { createContext } from "react";

import type { IAuth } from "@/shared/context/interfaces/IAuth.ts";

const AuthContext = createContext<IAuth>({
  user: null,
  setUser: () => {},
  // token: null,
});

export default AuthContext;
