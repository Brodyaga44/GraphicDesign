import type { ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./config/router/routes.tsx";

import "./styles/index.scss";

import useInterceptor from "@/app/module/hooks/useInterceptor.ts";
import AuthProvider from "@/app/module/providers/AuthProvider.tsx";

const App = (): ReactElement => {
  const router = createBrowserRouter(routes);
  useInterceptor();
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
