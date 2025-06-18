// import { useEffect } from "react";
// import { AxiosResponse } from "axios";
//
// import { $api } from "@/shared/config/api/api.ts";
// import { ILoginOutput } from "@/shared/config/api/ILoginOutput.ts";
//
// export const useApprove = async (
//   user_id: number,
//   setApprovedUser: (user: ILoginOutput) => void,
// ) => {
//   const res: AxiosResponse<ILoginOutput> = await $api.post(
//     `/admin-api/access?id=${user_id}`,
//   );
//   const updatedUser = { ...res.data, approved: true };
//   setApprovedUser(updatedUser);
// };

import { $api } from "@/shared/config/api/api.ts";

export const useApprove = async (user_id: number) => {
  await $api.post(`/admin-api/access?id=${user_id}`);
};
