import { notification } from "antd";
import type { AxiosResponse } from "axios";

import type {
  IChangeStatus,
  IChangeStatusResponse,
} from "../../model/types/IChangeStatus";

import { $api } from "@/shared/config/api/api";

export const useChangeStatus = () => {
  const changeStatus = async (data: IChangeStatus) => {
    const res: AxiosResponse<IChangeStatusResponse> = await $api.put(
      "/work/change-state",
      data,
    );
    if (res.data && res.data.status === data.status) {
      notification.success({ message: "Статус успешно изменен" });
    } else {
      notification.error({ message: "Ошибка изменения статуса" });
    }
  };

  return { changeStatus };
};
