import React, { PropsWithChildren } from "react";

import useAuth from "@/app/module/hooks/useAuth.ts";
import AuthContext from "@/shared/context/AuthContext.ts";

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
