import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { ILogUser } from "@/features/AddLoginForm/module/ILogUser.ts";
import { $api } from "@/shared/config/api/api.ts";
import { ILoginOutput, IUserData } from "@/shared/config/api/ILoginOutput.ts";

const useAuth = () => {
  const [user, setUser] = useState<IUserData | null>(null);

  const login = async (data: ILogUser) => {
    const res: AxiosResponse<ILoginOutput> = await $api.post("/auth/auth", {
      payload: data.log,
      password: data.pass,
    });

    const userData: AxiosResponse<IUserData> = await $api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${res.data.token}`,
      },
    });

    if (res.data && userData.data) {
      setUser(userData.data);
      localStorage.setItem("user", JSON.stringify(userData.data));
      localStorage.setItem("role", userData.data.roles[0].name);
      localStorage.setItem("token", res.data.token);
    } else {
      console.log("Ошибка: неверный логин или пароль");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  return { user, logout, login };
};

export default useAuth;
