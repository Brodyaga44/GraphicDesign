import { useEffect } from "react";

import { $api } from "@/shared/config/api/api.ts";

const useInterceptor = () => {
  useEffect(() => {
    const requestInterceptor = $api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      $api.interceptors.request.eject(requestInterceptor);
    };
  }, []);
};

export default useInterceptor;
