import { notification } from "antd";
import type { AxiosResponse } from "axios";

import type { ICreatedWork, ICreateWork } from "../../model/types/ICreateWork";

import { $api } from "@/shared/config/api/api";

export const useCreateWork = (closeModal: VoidFunction) => {
  const createWork = (data: { work: ICreateWork; images: File[] }) =>
    $api
      .post("/work/create", data.work)
      .then((res: AxiosResponse<ICreatedWork>) => {
        console.log("createdWork", res.data);
        if (data.images.length && res.data && res.data.id) {
          const formData = new FormData();

          // Добавляем все изображения в FormData
          for (const file of data.images) {
            formData.append("images", file, file.name);
          }

          // Отправляем FormData с изображениями
          return $api.post(`/work/images?id=${res.data.id}`, formData);
        }
        if (res.data?.id) {
          notification.success({ message: "Работа создана" });
          closeModal();
        } else {
          notification.error({ message: "Ошибка создания работы" });
        }
      });

  return { createWork };
};
