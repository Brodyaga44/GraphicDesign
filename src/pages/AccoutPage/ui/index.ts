import { lazy } from "react";

const AccountPageDisplay = lazy(() => import("./AuthorPage.tsx"));
export { AccountPageDisplay as AccountPage };
