import { notification } from "antd";

import type { IAddReviewForm } from "../../model/types/IAddReviewForm";

import { $api } from "@/shared/config/api/api";

export const useAddReview = () => {
  const addReview = (review: IAddReviewForm) => {
    $api.post("/report/add", review).then((res) => {
      if (res.data && res.data.text === review.text) {
        notification.success({
          message: "Спасибо за отзыв!",
          description: "Ваш отзыв успешно добавлен.",
          placement: "topRight",
        });
      }
    });
  };

  return { addReview };
};
