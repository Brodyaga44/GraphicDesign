import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import { $api } from "@/shared/config/api/api.ts";
import { IUserData } from "@/shared/config/api/ILoginOutput.ts";

export const useGetApplications = () => {
  const [applications, setApplications] = useState<IUserData[]>([]);

  const getApplications = async () => {
    const res: AxiosResponse<IUserData[]> = await $api.get("/public/user/list");
    setApplications(res?.data);
  };

  useEffect(() => {
    getApplications();
  }, []);
  return { applications, getApplications, setApplications };
};
