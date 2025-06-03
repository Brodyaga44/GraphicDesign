import React, { useState } from "react";

import styles from "./RequestList.module.scss";

import {
  Application,
  applicationsData,
} from "@/pages/UserPage/model/applications.ts";
import ApplicationModal from "@/widgets/ApplicationModal/ui/ApplicationModal.tsx";

const RequestList: React.FC = () => {
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  return (
    <div className={styles.container}>
      <h2>Заявки</h2>
      <div className={styles.list}>
        {applicationsData.map((app) => (
          <div key={app.id} className={styles.card}>
            <img
              src={app.photo || "/images/default-avatar.png"}
              alt={app.name}
              className={styles.avatar}
            />
            <div className={styles.info}>
              <div className={styles.name}>{app.name}</div>
              <div className={styles.role}>
                {app.role === "artist" ? "Исполнитель" : "Пользователь"}
              </div>
              <button
                onClick={() => setSelectedApplication(app)}
                className={styles.detailsButton}
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedApplication && (
        <ApplicationModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
        />
      )}
    </div>
  );
};

export default RequestList;
