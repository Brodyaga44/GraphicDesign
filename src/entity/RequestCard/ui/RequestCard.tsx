import styles from "./RequestCard.module.scss";

import type { IUserRequest } from "@/widgets/AdminRequestsList/model/types/IUserRequest";

const RequestCard = ({
  request,
  onClick,
}: {
  request: IUserRequest;
  onClick: (request: IUserRequest) => void;
}) => {
  return (
    <div className={styles.adminRequestItem}>
      <div className={styles.adminRequestInfo}>
        {request.photoUri ? (
          <img
            src={`https://graphico.ru/s3/${request.photoUri}`}
            alt={request.username}
            className={styles.adminRequestPhoto}
          />
        ) : (
          <div className={styles.reviewAvatar}>
            {request.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <div>
            <b>{request.name}</b> ({request.roles[0]?.name})
          </div>
        </div>
      </div>
      <button
        type="button"
        className={styles.adminRequestButton}
        onClick={() => onClick(request)}
      >
        Подробнее
      </button>
    </div>
  );
};

export default RequestCard;
