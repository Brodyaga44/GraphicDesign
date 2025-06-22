import styles from "./AdminRequestModal.module.scss";

import { Modal } from "@/shared/ui";
import type { IUserRequest } from "@/widgets/AdminRequestsList/model/types/IUserRequest";

const AdminRequestModal = ({
  request,
  onClose,
  onApprove,
  onBan,
}: {
  request: IUserRequest;
  onClose: VoidFunction;
  onApprove: (request: IUserRequest) => void;
  onBan: (request: IUserRequest) => void;
}) => {
  return (
    <Modal onClose={onClose}>
      <h3>Детали заявки</h3>
      {request.photoUri && (
        <img
          src={`https://graphico.ru/s3/${request.photoUri}`}
          alt=""
          width={100}
          height={100}
        />
      )}
      <p>
        <b>Имя:</b> {request.name}
      </p>
      <p>
        <b>Тип:</b> {request.roles[0].name}
      </p>
      {request.about && (
        <p>
          <b>О себе:</b> {request.about}
        </p>
      )}
      {request.skills && (
        <p>
          <b>Навыки:</b> {request.skills}
        </p>
      )}
      {!!request.directions?.length && (
        <p>
          <b>Направления:</b> {request.directions.join(", ")}
        </p>
      )}
      {/* {request.works?.length > 0 && (
        <div>
          <b>Примеры работ:</b>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={10}
            slidesPerView={1}
            className={styles.worksSwiper}
          >
            {request.works.map((url, i) => (
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
      )} */}
      <div className={styles.modalButtons}>
        <button
          type="button"
          className={styles.acceptButton}
          onClick={() => onApprove(request)}
        >
          Принять
        </button>
        <button
          type="button"
          className={styles.rejectButton}
          onClick={() => onBan(request)}
        >
          Отклонить
        </button>
      </div>
    </Modal>
  );
};

export default AdminRequestModal;
