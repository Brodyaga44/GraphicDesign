import { lazy } from "react";

const LoginPageDisplay = lazy(() => import("./Login"));
export { LoginPageDisplay as LoginPage };
