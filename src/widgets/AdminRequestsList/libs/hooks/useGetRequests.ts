import { useEffect, useState } from "react";
import type { AxiosResponse } from "axios";

import type { IUserRequest } from "../../model/types/IUserRequest";

import { $api } from "@/shared/config/api/api.ts";

export const useGetRequests = () => {
  const [requests, setRequests] = useState<IUserRequest[]>([]);

  const getApplications = async () => {
    const res: AxiosResponse<IUserRequest[]> =
      await $api.get("/public/user/list");
    setRequests(res?.data);
  };

  useEffect(() => {
    getApplications();
  }, []);

  return { requests, getApplications, setRequests };
};
