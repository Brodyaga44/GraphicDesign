import { getSHA256Hash } from "@/pages/Registration/libs/hooks/useRegistration.ts";
import { IUseRegistration } from "@/pages/Registration/model/interfaces/IUseRegistration.ts";
import { $api } from "@/shared/config/api/api.ts";

const useLogin = () => {
  const LogReq = async (data: any): Promise<any> => {
    const hashServer = await getSHA256Hash(data.password);
    console.log(data.password);
    const response = await $api.get("/users", {
      params: {
        login: data.login,
        password: hashServer,
      },
    });

    const users = response.data;
    if (users.length > 0) {
      return users[0]; // Авторизация успешна
    } else {
      throw new Error("Неверный логин или пароль");
    }
  };

  return {
    LogReq,
  };
};

export default useLogin;
