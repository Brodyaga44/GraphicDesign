import styles from "./WorkCard.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext";
import WorkStatusDropdown from "@/features/WorkStatusDropdown/ui/WorkStatusDropdown";
import type { IWork } from "@/pages/ProductPage/interfaces/IWork";

const WorkCard = ({
  work,
  onClick,
}: {
  work: IWork;
  onClick: (workId: number) => void;
}) => {
  const { user } = useAuthContext();
  const isAuthor = user?.roles?.[0].name === "AUTHOR";

  return (
    <div className={styles.user__order}>
      <img
        src={`https://graphico.ru/s3/${work.images?.[0]?.uri}`}
        alt={work.titleName}
        className={styles.user__orderImage}
      />
      <div className={styles.user__orderInfo}>
        <div className={styles.user__orderTitle}>{work.titleName}</div>
        <div className={styles.user__orderStatus}>
          Статус:{" "}
          {isAuthor ? (
            <WorkStatusDropdown workId={work.id} currentStatus={work.status} />
          ) : (
            work.status
          )}
        </div>
        {work.status === "DONE" && work.userId !== user?.id && (
          <button
            type="button"
            className={styles.user__reviewButton}
            onClick={() => onClick(work.id)}
          >
            Оставить отзыв
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkCard;
