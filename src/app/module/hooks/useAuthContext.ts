import { useContext } from "react";

import AuthContext from "@/shared/context/AuthContext.ts";

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
