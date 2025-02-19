import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ILogUser } from "@/features/AddLoginForm/module/ILogUser.ts";
import { LogUsers } from "@/features/AddLoginForm/module/LogUsers.ts";

const useAuth = () => {
  const [user, setUser] = useState<ILogUser | null>(null);
  const navigate = useNavigate();
  const login = (data: ILogUser) => {
    if (
      LogUsers.some(
        (userTemp) => userTemp.log === data.log && userTemp.pass === data.pass,
      )
    ) {
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      // window.location.href = `http://localhost:5173/`;
      navigate("/");
    } else {
      console.log("ошибка");
    }
    console.log("V");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      const userLsTemp = localStorage.getItem("user");
      if (userLsTemp) {
        setUser(JSON.parse(userLsTemp));
      }
    }
  }, []);

  return { user, logout, login };
};

export default useAuth;
