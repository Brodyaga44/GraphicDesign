import { useState } from "react";
import { notification } from "antd";

import { useBan } from "../libs/hooks/useBan";
import { useGetRequests } from "../libs/hooks/useGetRequests";
import type { IUserRequest } from "../model/types/IUserRequest";

import styles from "./AdminRequestsList.module.scss";

import { RequestCard } from "@/entity";
import { AdminRequestModal } from "@/features";
import { useApprove } from "@/shared/libs/hooks/useApprove";

const AdminRequestsList = () => {
  const { requests, setRequests } = useGetRequests();

  // --- Новое состояние для модалки заявки администратора ---
  const [selectedRequest, setSelectedRequest] = useState<IUserRequest | null>(
    null,
  );

  // Закрыть модалку заявки
  const closeRequestModal = () => {
    setSelectedRequest(null);
  };

  const onApprove = async (request: IUserRequest) => {
    await useApprove(request.id)
      .then((_) => {
        notification.success({ message: "Пользователь добавлен" });
        closeRequestModal();
        setRequests((prev) => prev.filter((item) => item.id !== request.id));
      })
      .catch((_) => notification.error({ message: "Произошла ошибка" }));
  };

  const onBan = async (request: IUserRequest) => {
    await useBan(request.id)
      .then((_) => {
        notification.error({ message: "Пользователь отклонен" });
        closeRequestModal();
        setRequests((prev) => prev.filter((item) => item.id !== request.id));
      })
      .catch((_) => notification.error({ message: "Произошла ошибка" }));
  };

  return (
    <div>
      <h3 className={styles.user__subtitle}>Заявки на регистрацию</h3>
      <div className={styles.adminRequestsList}>
        {requests.length ? (
          requests
            .filter((item) => !item.blocked && !item.approved)
            .map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onClick={setSelectedRequest}
              />
            ))
        ) : (
          <div>Заявок нет</div>
        )}
      </div>

      {/* Модалка заявки администратора */}
      {selectedRequest && (
        <AdminRequestModal
          onApprove={onApprove}
          onBan={onBan}
          onClose={closeRequestModal}
          request={selectedRequest}
        />
      )}
    </div>
  );
};

export default AdminRequestsList;
