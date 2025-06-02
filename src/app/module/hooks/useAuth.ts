import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ILogUser } from "@/features/AddLoginForm/module/ILogUser.ts";
import { LogUsers } from "@/features/AddLoginForm/module/LogUsers.ts";

const useAuth = () => {
  const [user, setUser] = useState<ILogUser | null>(null);
  const navigate = useNavigate();

  const login = (data: ILogUser) => {
    // Ищем пользователя из списка LogUsers
    const foundUser = LogUsers.find(
      (userTemp) => userTemp.log === data.log && userTemp.pass === data.pass,
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser)); // сохраняем с ролью
      navigate("/");
    } else {
      console.log("Ошибка: неверный логин или пароль");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
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
