import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Loading from "@/shared/Loading/ui/Loading.tsx";

const Main = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default Main;
