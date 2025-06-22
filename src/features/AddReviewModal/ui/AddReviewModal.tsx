import { Controller, useForm } from "react-hook-form";
import { notification } from "antd";

import { containsForbiddenWords } from "../libs/helpers/containsForbiddenWords";
import { useAddReview } from "../libs/hooks/useAddReview";
import type { IAddReviewForm } from "../model/types/IAddReviewForm";

import styles from "./AddReviewModal.module.scss";

import { Modal } from "@/shared/ui";

const AddReviewModal = ({
  onClose,
  workId,
}: {
  onClose: VoidFunction;
  workId: number;
}) => {
  const { addReview } = useAddReview();

  const methods = useForm<{ review: IAddReviewForm }>({
    defaultValues: {
      review: {
        text: "",
        workId,
      },
    },
  });

  // Отправка отзыва
  const handleSubmitReview = ({ review }: { review: IAddReviewForm }) => {
    console.log(review);
    if (review.text && review.rate > 0) {
      addReview(review);
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={methods.handleSubmit((data) => handleSubmitReview(data))}>
        <Controller
          control={methods.control}
          name="review"
          render={({ field }) => (
            <>
              <h3>Оставить отзыв</h3>
              <textarea
                value={field.value.text}
                onChange={(e) =>
                  field.onChange({
                    ...field.value,
                    text: e.target.value,
                  })
                }
                className={styles.modal__textarea}
                placeholder="Ваш отзыв"
              />
              <p>Рейтинг: </p>
              <select
                value={field.value.rate}
                onChange={(e) =>
                  field.onChange({ ...field.value, rate: e.target.value })
                }
              >
                <option value={0}>Выберите рейтинг</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {/* Проверка на запрещенные слова */}
              {containsForbiddenWords(field.value.text) && (
                <div className={styles.errorMessage}>
                  Ваша рецензия содержит неподобающие слова
                </div>
              )}
              <button
                type="submit"
                className={styles.modal__submit}
                disabled={
                  !field.value.text ||
                  !field.value.rate ||
                  containsForbiddenWords(field.value.text)
                }
              >
                Отправить
              </button>
            </>
          )}
        />
      </form>
    </Modal>
  );
};

export default AddReviewModal;
