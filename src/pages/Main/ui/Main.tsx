import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import AuthProvider from "@/app/module/providers/AuthProvider.tsx";
import Loading from "@/shared/Loading/ui/Loading.tsx";

const Main = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </AuthProvider>
  );
};

export default Main;
