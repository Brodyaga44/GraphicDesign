import { lazy } from "react";

const UserPageDisplay = lazy(() => import("./UserPage"));
export { UserPageDisplay as UserPage };
