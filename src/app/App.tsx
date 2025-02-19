import { ReactElement } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./config/router/routes.tsx";

import "./styles/index.scss";

const App = (): ReactElement => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
