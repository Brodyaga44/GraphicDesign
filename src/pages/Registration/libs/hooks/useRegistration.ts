import { IUseRegistration } from "@/pages/Registration/model/interfaces/IUseRegistration.ts";
import { $api } from "@/shared/config/api/api.ts";

const useRegistration = () => {
  const regReq = async (data: IUseRegistration): Promise<void> => {
    await $api.post("/auth/register", {
      ...data,
    });
  };

  return {
    regReq,
  };
};

export default useRegistration;
