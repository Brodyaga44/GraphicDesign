import { RouteObject } from "react-router-dom";

import {
  // AccountPage,
  HomePage,
  LoginPage,
  NotFound,
  RegistrationPage,
  UserFollowingPage,
  UserPage,
} from "@/pages";
import Main from "@/pages/Main/ui/Main.tsx";
const routes: RouteObject[] = [
  {
    path: "",
    element: <Main />,
    children: [
      // { path: "", element: <AccountPage /> },
      { path: "", element: <HomePage /> },
      { path: "userpage", element: <UserPage /> },
      { path: "*", element: <NotFound /> },
      { path: "login", element: <LoginPage /> },
      { path: "reg", element: <RegistrationPage /> },
      { path: "following", element: <UserFollowingPage /> },
    ],
  },
];
export default routes;
