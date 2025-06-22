import { useState } from "react";
import { notification } from "antd";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./userpage.module.scss";

import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import useAuthContext from "@/app/module/hooks/useAuthContext";
import { EditUserModal } from "@/features";
import WorkStatusDropdown from "@/features/WorkStatusDropdown/ui/WorkStatusDropdown";
import { useApprove } from "@/pages/UserPage/model/hooks/useApprove.ts";
import { useBan } from "@/pages/UserPage/model/hooks/useBan.ts";
import { useGetApplications } from "@/pages/UserPage/model/hooks/useGetApplications.ts";
import Photo from "@/shared/assets/Icons/DefaultPhoto.svg?react";
import type { ILoginOutput } from "@/shared/config/api/ILoginOutput.ts";
import { Footer } from "@/widgets";
import ArtistModal from "@/widgets/ArtistModal/ui/ArtistModal.tsx";
import Header from "@/widgets/Header/ui/Header";

const userWorks = [
  { id: 1, image: "image", title: "product", status: "in work" },
];
const userOrders = userWorks;

const UserPage = () => {
  const { user } = useAuthContext();
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddWorkModalOpen, setAddWorkModalOpen] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // --- Новое состояние для модалки заявки администратора ---
  const [selectedRequest, setSelectedRequest] = useState<ILoginOutput | null>(
    null,
  );

  // Функция проверки на запрещенные слова
  const containsForbiddenWords = (text: string): boolean => {
    const forbiddenWords = ["fiverr", "freelancer"]; // можно добавить другие слова
    const lowerText = text.toLowerCase();
    return forbiddenWords.some((word) => lowerText.includes(word));
  };

  if (!user) return null;

  const userRole = localStorage.getItem("role");
  const { applications, setApplications } = useGetApplications();
  // const [approvedUser, setApprovedUser] = useState<ILoginOutput | null>(null);

  if (!user) return <div>Пользователь не найден</div>;

  // const userWorks =
  //   userRole === "AUTHOR" && user.works_id
  //     ? user.works_id.map((id) => products.find((p) => p.id === id))
  //     : [];

  // const userOrders =
  //   userRole !== "AUTHOR" && userRole !== "ADMIN" && user.orders_id
  //     ? user.orders_id.map((id) => products.find((p) => p.id === id))
  //     : [];

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

  // Открыть модалку заявки админа
  // const openRequestModal = (request: (typeof adminRequests)[0]) => {
  //   setSelectedRequest(request);
  // };

  // Закрыть модалку заявки
  const closeRequestModal = () => {
    setSelectedRequest(null);
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
                src={`${user.photoUri}`}
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
          {userRole === "ADMIN" && (
            <>
              <h3 className={styles.user__subtitle}>Заявки на регистрацию</h3>
              <div className={styles.adminRequestsList}>
                {applications.length ? (
                  applications
                    .filter((item) => !item.blocked && !item.approved)
                    .map((req) => (
                      <div key={req.id} className={styles.adminRequestItem}>
                        <div className={styles.adminRequestInfo}>
                          {req.photoUri ? (
                            <img
                              src={`https://graphico.ru/s3/${req.photoUri}`}
                              alt={req.username}
                              className={styles.adminRequestPhoto}
                            />
                          ) : (
                            <div className={styles.reviewAvatar}>
                              {req.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div>
                              <b>{req.name}</b> ({req.roles[0]?.name})
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className={styles.adminRequestButton}
                          onClick={() => setSelectedRequest(req)}
                        >
                          Подробнее
                        </button>
                      </div>
                    ))
                ) : (
                  <div>Заявок нет</div>
                )}
              </div>
            </>
          )}

          {/* Показывать "Ваши работы" или "Ваши заказы", только если роль не админ */}
          {userRole !== "ADMIN" && (
            <div>
              <h3 className={styles.user__subtitle}>
                {userRole === "AUTHOR" ? "Ваши работы" : "Ваши заказы"}
              </h3>

              <div className={styles.user__orders}>
                {(userRole === "AUTHOR" ? userWorks : userOrders).length ? (
                  (userRole === "AUTHOR" ? userWorks : userOrders).map(
                    (item) =>
                      item ? (
                        <div key={item.id} className={styles.user__order}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className={styles.user__orderImage}
                          />
                          <div className={styles.user__orderInfo}>
                            <div className={styles.user__orderTitle}>
                              {item.title}
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
      {/* Модалка заявки администратора */}
      {selectedRequest && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.modal__close}
              onClick={closeRequestModal}
            >
              ✕
            </button>
            <h3>Детали заявки</h3>
            <p>
              <b>Имя:</b> {selectedRequest.username}
            </p>
            <p>
              <b>Тип:</b> {selectedRequest.roles[0].name}
            </p>
            {selectedRequest.about && (
              <p>
                <b>О себе:</b> {selectedRequest.approved ? "yes" : "no"}
              </p>
            )}
            {selectedRequest.skills && (
              <p>
                <b>Навыки:</b> {selectedRequest.id}
              </p>
            )}
            {!!selectedRequest.directions?.length && (
              <p>
                <b>Направления:</b> {selectedRequest.directions.join(", ")}
              </p>
            )}
            {selectedRequest.works?.length > 0 && (
              <div>
                <b>Примеры работ:</b>
                <Swiper
                  modules={[Navigation]}
                  navigation
                  spaceBetween={10}
                  slidesPerView={1}
                  className={styles.worksSwiper}
                >
                  {selectedRequest.works.map((url, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={url}
                        alt={`Работа ${i + 1}`}
                        className={styles.worksImage}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            <div className={styles.modalButtons}>
              <button
                type="button"
                className={styles.acceptButton}
                onClick={async () => {
                  await useApprove(selectedRequest.id);
                  notification.success({ message: "Пользователь добавлен" });
                  closeRequestModal();
                  setApplications((prev) =>
                    prev.filter((item) => item.id !== selectedRequest.id),
                  );
                }}
              >
                Принять
              </button>
              <button
                type="button"
                className={styles.rejectButton}
                onClick={async () => {
                  await useBan(selectedRequest.id);
                  notification.error({ message: "Пользователь отклонен" });
                  closeRequestModal();
                  setApplications((prev) =>
                    prev.filter((item) => item.id !== selectedRequest.id),
                  );
                }}
              >
                Отклонить
              </button>
            </div>
          </div>
        </div>
      )}

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
