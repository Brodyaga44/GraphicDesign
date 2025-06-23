import { useState } from "react";

import { useGetOrders } from "../libs/hooks/useGetOrders";

import styles from "./WorksList.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext";
import { WorkCard } from "@/entity";
import { AddReviewModal } from "@/features";
import { useGetWorksByAuthorId } from "@/shared/libs/hooks/useGetWorksByAuthorId";

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

  const { works } = useGetWorksByAuthorId(String(user?.id));
  const { orders } = useGetOrders();

  const items = isAuthor ? works : orders;

  return (
    <div>
      <h3 className={styles.user__subtitle}>{title}</h3>
      <div className={styles.user__orders}>
        {items.length ? (
          items.map((item) => (
            <WorkCard
              key={item.id}
              work={item}
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
