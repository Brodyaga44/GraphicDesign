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
import ProductPage from "@/pages/ProductPage/ui/ProfuctPage.tsx";
const routes: RouteObject[] = [
  {
    path: "",
    element: <Main />,
    children: [
      // { path: "", element: <AccountPage /> },
      { path: "", element: <HomePage /> },
      { path: "profile", element: <UserPage /> },
      { path: "*", element: <NotFound /> },
      { path: "login", element: <LoginPage /> },
      { path: "reg", element: <RegistrationPage /> },
      { path: "following", element: <UserFollowingPage /> },
      { path: "category/graphic-design", element: <CategoryPage /> },
      { path: "/product/:id", element: <ProductPage /> },
    ],
  },
];
export default routes;
