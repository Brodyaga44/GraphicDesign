import { RouteObject } from "react-router-dom";

import {
  CategoryPage,
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
      { path: "category/graphic-design", element: <CategoryPage /> },
    ],
  },
];
export default routes;
