// ApplicationModal.tsx

import React from "react";

import styles from "./ApplicationModal.module.scss";

import { Application } from "@/pages/UserPage/model/applications.ts";

interface Props {
  application: Application;
  onClose: () => void;
}

const ApplicationModal: React.FC<Props> = ({ application, onClose }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>
          ✕
        </button>
        <h3>Детали заявки</h3>
        <div className={styles.content}>
          <p>
            <strong>Логин:</strong> {application.login}
          </p>
          <p>
            <strong>Имя:</strong> {application.name}
          </p>
          <p>
            <strong>О себе:</strong> {application.about}
          </p>
          <p>
            <strong>Роль:</strong>{" "}
            {application.role === "artist" ? "Исполнитель" : "Пользователь"}
          </p>
          {application.role === "artist" && (
            <>
              <p>
                <strong>Навыки:</strong> {application.skills}
              </p>
              <p>
                <strong>Направления:</strong>{" "}
                {application.directions?.join(", ")}
              </p>
              <div className={styles.works}>
                <strong>Примеры работ:</strong>
                <div className={styles.worksGallery}>
                  {application.works?.map((work, index) => (
                    <img
                      key={index}
                      src={work}
                      alt={`Работа ${index + 1}`}
                      className={styles.workImage}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
