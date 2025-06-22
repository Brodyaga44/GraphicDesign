import { useMemo, useState } from "react";
import { notification } from "antd";

import styles from "./userpage.module.scss";

import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import useAuthContext from "@/app/module/hooks/useAuthContext";
import { EditUserModal } from "@/features";
import WorkStatusDropdown from "@/features/WorkStatusDropdown/ui/WorkStatusDropdown";
import Photo from "@/shared/assets/Icons/DefaultPhoto.svg?react";
import { useGetWorks } from "@/shared/libs/hooks/useGetWorks";
import { AdminRequestsList, Footer } from "@/widgets";
import ArtistModal from "@/widgets/ArtistModal/ui/ArtistModal.tsx";
import Header from "@/widgets/Header/ui/Header";

const UserPage = () => {
  const { user } = useAuthContext();
  const { works } = useGetWorks();
  // TODO: Фильтровать заказы для пользователя
  const userWorks = useMemo(
    () => works?.filter((work) => work.userId === user?.id),
    [works],
  );

  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddWorkModalOpen, setAddWorkModalOpen] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // Функция проверки на запрещенные слова
  const containsForbiddenWords = (text: string): boolean => {
    const forbiddenWords = ["fiverr", "freelancer"]; // можно добавить другие слова
    const lowerText = text.toLowerCase();
    return forbiddenWords.some((word) => lowerText.includes(word));
  };

  if (!user) return <div>Пользователь не найден</div>;

  const userRole = localStorage.getItem("role");

  // Открыть модалку отзыва
  const handleLeaveReview = (workId: number) => {
    setSelectedWorkId(workId);
    setReviewModalOpen(true);
    setReviewText("");
    setRating(0);
  };

  // Отправка отзыва
  const handleSubmitReview = () => {
    if (reviewText && rating > 0) {
      console.log({
        workId: selectedWorkId,
        review: reviewText,
        rating,
      });
      setReviewModalOpen(false);
      setReviewText("");
      setRating(0);

      notification.success({
        message: "Спасибо за отзыв!",
        description: "Ваш отзыв успешно добавлен.",
        placement: "topRight",
      });
    }
  };

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.user__container}>
          <h2 className={styles.user__title}>Профиль</h2>
          <div className={styles.user__profile}>
            {user.photoUri ? (
              <img
                src={`https://graphico.ru/s3/${user.photoUri}`}
                alt={user.name}
                className={styles.user__avatar}
              />
            ) : (
              <Photo className={styles.user__avatar} />
            )}
            <div className={styles.user__profileInfo}>
              <div className={styles.user__name}>{user.name}</div>
              <div className={styles.user__description}>
                <p className={styles.user__description_text}>{user.about}</p>
              </div>
              {!!user.skills?.length && (
                <div className={styles.skillsContainer}>
                  {user.skills.split(",").map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className={styles.btn__wrapper}>
                <button
                  type="button"
                  className={styles.user__editButton}
                  onClick={() => setEditModalOpen(true)}
                >
                  Редактировать профиль
                </button>
                {userRole === "AUTHOR" && (
                  <button
                    type="button"
                    className={styles.user__editButton}
                    onClick={() => setAddWorkModalOpen(true)}
                  >
                    Добавить работу
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* --- Вставляем новый блок для админа --- */}
          {userRole === "ADMIN" && <AdminRequestsList />}

          {/* Показывать "Ваши работы" или "Ваши заказы", только если роль не админ */}
          {userRole !== "ADMIN" && (
            <div>
              <h3 className={styles.user__subtitle}>
                {userRole === "AUTHOR" ? "Ваши работы" : "Ваши заказы"}
              </h3>

              <div className={styles.user__orders}>
                {((userRole === "AUTHOR" ? userWorks : userWorks) ?? [])
                  .length ? (
                  ((userRole === "AUTHOR" ? userWorks : userWorks) ?? []).map(
                    (item) =>
                      item ? (
                        <div key={item.id} className={styles.user__order}>
                          <img
                            src={`https://graphico.ru/s3/${item.images?.[0]?.uri}`}
                            alt={item.titleName}
                            className={styles.user__orderImage}
                          />
                          <div className={styles.user__orderInfo}>
                            <div className={styles.user__orderTitle}>
                              {item.titleName}
                            </div>
                            <div className={styles.user__orderStatus}>
                              Статус:{" "}
                              {userRole === "AUTHOR" ? (
                                <WorkStatusDropdown
                                  workId={item.id}
                                  currentStatus={item.status}
                                />
                              ) : (
                                item.status
                              )}
                            </div>
                            {item.status === "Готов" && (
                              <button
                                type="button"
                                className={styles.user__reviewButton}
                                onClick={() => handleLeaveReview(item.id)}
                              >
                                Оставить отзыв
                              </button>
                            )}
                          </div>
                        </div>
                      ) : null,
                  )
                ) : (
                  <div className={styles.user__empty}>
                    {userRole === "AUTHOR"
                      ? "У вас пока нет работ"
                      : "У вас пока нет заказов"}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Модалка отзыва */}
      {isReviewModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.modal__close}
              onClick={() => setReviewModalOpen(false)}
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h3>Оставить отзыв</h3>
            <textarea
              className={styles.modal__textarea}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Ваш отзыв"
            />
            <div>
              <label>Рейтинг: </label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={0}>Выберите рейтинг</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Проверка на запрещенные слова */}
            {containsForbiddenWords(reviewText) && (
              <div className={styles.errorMessage}>
                Ваша рецензия содержит неподобающие слова
              </div>
            )}

            <button
              type="button"
              className={styles.modal__submit}
              onClick={handleSubmitReview}
              disabled={
                !reviewText ||
                rating === 0 ||
                containsForbiddenWords(reviewText)
              }
            >
              Отправить
            </button>
          </div>
        </div>
      )}
      {/* Модалка редактирования профиля */}
      {isEditModalOpen && (
        <EditUserModal onClose={() => setEditModalOpen(false)} />
      )}
      {/* Модалка добавления работы */}
      {isAddWorkModalOpen && (
        <ArtistModal
          onClose={() => setAddWorkModalOpen(false)}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default UserPage;
