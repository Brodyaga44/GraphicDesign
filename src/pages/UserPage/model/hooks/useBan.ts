import { AxiosResponse } from "axios/index";

import { $api } from "@/shared/config/api/api.ts";
import { ILoginOutput } from "@/shared/config/api/ILoginOutput.ts";

export const useBan = async (user_id: number) => {
  $api.post(`/admin-api/block?id=${user_id}`);
};
