import { $api } from "@/shared/config/api/api.ts";

export const useBan = async (user_id: number) => {
  $api.post(`/admin-api/block?id=${user_id}`);
};
