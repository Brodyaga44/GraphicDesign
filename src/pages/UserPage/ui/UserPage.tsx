import { useState } from "react";
import { notification } from "antd";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./userpage.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import useAuthContext from "@/app/module/hooks/useAuthContext";
import WorkStatusDropdown from "@/features/WorkStatusDropdown/ui/WorkStatusDropdown";
import {
  applicationsData,
  IApplication,
} from "@/pages/UserPage/model/applications.ts";
import { products } from "@/pages/UserPage/model/products";
import { usersData } from "@/pages/UserPage/model/usersData";
import Photo from "@/shared/assets/Icons/DefaultPhoto.svg?react";
import { Footer } from "@/widgets";
import ArtistModal from "@/widgets/ArtistModal/ui/ArtistModal.tsx";
import Header from "@/widgets/Header/ui/Header";

// --- Добавим моки заявок для админа ---
const adminRequests = [
  {
    id: 1,
    username: "ivanov",
    name: "Иван Иванов",
    photo: null,
    type: "user",
    email: "ivanov@mail.ru",
    phone: "+7 900 123-45-67",
    about: "Хочу зарегистрироваться как пользователь.",
  },
  {
    id: 2,
    username: "petrova",
    name: "Мария Петрова",
    photo: null,
    type: "artist",
    email: "petrova@mail.ru",
    phone: "+7 912 345-67-89",
    about: "Хочу стать художником на платформе.",
  },
];

const UserPage = () => {
  const { user } = useAuthContext();
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddWorkModalOpen, setAddWorkModalOpen] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  // --- Новое состояние для модалки заявки администратора ---
  const [selectedRequest, setSelectedRequest] = useState<IApplication | null>(
    null,
  );

  const [editName, setEditName] = useState("");
  const [editAbout, setEditAbout] = useState("");
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState<string | null>(null);

  if (!user) return null;

  const currentUser = usersData.find(
    (u) => u.username.toLowerCase() === user.log.toLowerCase(),
  );

  if (!currentUser) return <div>Пользователь не найден</div>;

  const userWorks =
    currentUser.role === "artist" && currentUser.works_id
      ? currentUser.works_id.map((id) => products.find((p) => p.id === id))
      : [];

  const userOrders =
    currentUser.role !== "artist" &&
    currentUser.role !== "admin" &&
    currentUser.orders_id
      ? currentUser.orders_id.map((id) => products.find((p) => p.id === id))
      : [];

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

  // Изменение фото профиля (выбор файла)
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditPhoto(file);
      setEditPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Удалить выбранное фото
  const handleRemovePhoto = () => {
    setEditPhoto(null);
    setEditPhotoPreview(null);
  };

  // Открыть модалку редактирования профиля
  const handleEditOpen = () => {
    setEditName(currentUser.name || "");
    setEditAbout(currentUser.about || "");
    setEditPhoto(null);
    setEditPhotoPreview(currentUser.photo || null);
    setEditModalOpen(true);
  };

  // Сохранить изменения профиля
  const handleEditSubmit = () => {
    console.log({
      name: editName,
      about: editAbout,
      photo: editPhoto,
    });
    setEditModalOpen(false);

    notification.success({
      message: "Профиль обновлён",
      description: "Изменения успешно сохранены.",
      placement: "topRight",
    });
  };

  // Открыть модалку заявки админа
  const openRequestModal = (request: (typeof adminRequests)[0]) => {
    setSelectedRequest(request);
  };
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
            {currentUser.photo ? (
              <img
                src={currentUser.photo}
                alt={currentUser.name}
                className={styles.user__avatar}
              />
            ) : (
              <Photo className={styles.user__avatar} />
            )}

            <div className={styles.user__profileInfo}>
              <div className={styles.user__name}>{currentUser.name}</div>
              {currentUser.about && (
                <div className={styles.user__about}>{currentUser.about}</div>
              )}
              <div className={styles.btn__wrapper}>
                <button
                  className={styles.user__editButton}
                  onClick={handleEditOpen}
                >
                  Редактировать профиль
                </button>
                {currentUser.role === "artist" && (
                  <button
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
          {currentUser.role === "admin" && (
            <>
              <h3 className={styles.user__subtitle}>Заявки на регистрацию</h3>
              <div className={styles.adminRequestsList}>
                {applicationsData.length ? (
                  applicationsData.map((req) => (
                    <div key={req.id} className={styles.adminRequestItem}>
                      <div className={styles.adminRequestInfo}>
                        {req.photo ? (
                          <img
                            src={req.photo}
                            alt={req.name}
                            className={styles.adminRequestPhoto}
                          />
                        ) : (
                          <div className={styles.reviewAvatar}>
                            {req.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div>
                            <b>{req.name}</b> ({req.role})
                          </div>
                        </div>
                      </div>
                      <button
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
          {currentUser.role !== "admin" && (
            <div>
              <h3 className={styles.user__subtitle}>
                {currentUser.role === "artist" ? "Ваши работы" : "Ваши заказы"}
              </h3>

              <div className={styles.user__orders}>
                {(currentUser.role === "artist" ? userWorks : userOrders)
                  .length ? (
                  (currentUser.role === "artist" ? userWorks : userOrders).map(
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
                              {currentUser.role === "artist" ? (
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
                    {currentUser.role === "artist"
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
            <button className={styles.modal__close} onClick={closeRequestModal}>
              ✕
            </button>
            <h3>Детали заявки</h3>
            {/*{selectedRequest.photo ? (*/}
            {/*  <img*/}
            {/*    src={selectedRequest.photo}*/}
            {/*    alt={selectedRequest.name}*/}
            {/*    className={styles.modal__photoPreview}*/}
            {/*  />*/}
            {/*) : (*/}
            {/*  <Photo className={styles.modal__photoPreview} />*/}
            {/*)}*/}
            <p>
              <b>Имя:</b> {selectedRequest.name}
            </p>
            <p>
              <b>Тип:</b> {selectedRequest.role}
            </p>
            {selectedRequest.about && (
              <p>
                <b>О себе:</b> {selectedRequest.about}
              </p>
            )}
            {selectedRequest.skills && (
              <p>
                <b>Навыки:</b> {selectedRequest.skills}
              </p>
            )}
            {selectedRequest.directions?.length && (
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
                className={styles.acceptButton}
                onClick={() => {
                  notification.success({ message: "Пользователь добавлен" });
                  closeRequestModal();
                }}
              >
                Принять
              </button>
              <button
                className={styles.rejectButton}
                onClick={() => {
                  notification.error({ message: "Пользователь отклонен" });
                  closeRequestModal();
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
            <button
              className={styles.modal__submit}
              onClick={handleSubmitReview}
              disabled={!reviewText || rating === 0}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
      {/* Модалка редактирования профиля */}
      {isEditModalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button
              className={styles.modal__close}
              onClick={() => setEditModalOpen(false)}
              aria-label="Закрыть"
            >
              ✕
            </button>
            <h3>Редактировать профиль</h3>

            <div className={styles.modal__photoBlock}>
              {editPhotoPreview ? (
                <div className={styles.modal__photoWrapper}>
                  <img
                    src={editPhotoPreview}
                    alt="Превью фото"
                    className={styles.modal__photoPreview}
                  />
                  <button
                    className={styles.modal__removePhotoBtn}
                    onClick={handleRemovePhoto}
                    aria-label="Удалить фото"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className={styles.modal__photoPlaceholder}>
                  Фото отсутствует
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className={styles.modal__fileInput}
              />
            </div>

            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              placeholder="Имя"
              className={styles.modal__input}
            />
            <textarea
              value={editAbout}
              onChange={(e) => setEditAbout(e.target.value)}
              placeholder="О себе"
              className={styles.modal__textarea}
            />
            <button
              className={styles.modal__submit}
              onClick={handleEditSubmit}
              disabled={!editName.trim()}
            >
              Сохранить
            </button>
          </div>
        </div>
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
