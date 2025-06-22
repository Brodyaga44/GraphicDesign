import { useMemo, useState } from "react";

import styles from "./WorksList.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext";
import { WorkCard } from "@/entity";
import { AddReviewModal } from "@/features";
import { useGetWorks } from "@/shared/libs/hooks/useGetWorks";

const WorksList = () => {
  const { user } = useAuthContext();

  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedWorkId, setSelectedWorkId] = useState<number | null>(null);

  // Открыть модалку отзыва
  const handleOpenModalReview = (workId: number) => {
    setSelectedWorkId(workId);
    setReviewModalOpen(true);
  };

  const handleLeaveReview = () => {
    setSelectedWorkId(null);
    setReviewModalOpen(false);
  };

  const isAuthor = user?.roles?.[0].name === "AUTHOR";
  const title = isAuthor ? "Ваши работы" : "Ваши заказы";
  const emptyWorksListTitle = isAuthor
    ? "У вас пока нет работ"
    : "У вас пока нет заказов";

  const { works } = useGetWorks();

  // TODO: Фильтровать заказы для пользователя
  const userWorks = useMemo(
    () => works?.filter((work) => work.userId === user?.id),
    [works],
  );

  return (
    <div>
      <h3 className={styles.user__subtitle}>{title}</h3>
      <div className={styles.user__orders}>
        {userWorks.length ? (
          userWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={handleOpenModalReview}
            />
          ))
        ) : (
          <div className={styles.user__empty}>{emptyWorksListTitle}</div>
        )}
      </div>

      {/* Модалка отзыва */}
      {isReviewModalOpen && selectedWorkId && (
        <AddReviewModal onClose={handleLeaveReview} workId={selectedWorkId} />
      )}
    </div>
  );
};

export default WorksList;
