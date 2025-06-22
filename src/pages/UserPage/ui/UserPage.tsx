import { useState } from "react";

import styles from "./userpage.module.scss";

import "swiper/css/pagination";
import "swiper/css";
import "swiper/css/navigation";
import useAuthContext from "@/app/module/hooks/useAuthContext";
import { EditUserModal } from "@/features";
import Photo from "@/shared/assets/Icons/DefaultPhoto.svg?react";
import { AdminRequestsList, Footer, WorksList } from "@/widgets";
import ArtistModal from "@/widgets/ArtistModal/ui/ArtistModal.tsx";
import Header from "@/widgets/Header/ui/Header";

const UserPage = () => {
  const { user } = useAuthContext();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddWorkModalOpen, setAddWorkModalOpen] = useState(false);

  if (!user) return <div>Пользователь не найден</div>;

  const userRole = localStorage.getItem("role");

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.user__container}>
          <h2 className={styles.user__title}>Профиль</h2>
          <div className={styles.user__profile}>
            {user.photoUri ? (
              <img
                src={`https://graphico.ru/s3/${user.photoUri}`}
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
          {userRole === "ADMIN" && <AdminRequestsList />}

          {/* Показывать "Ваши работы" или "Ваши заказы", только если роль не админ */}
          {userRole !== "ADMIN" && <WorksList />}
        </div>
      </main>
      <Footer />
      {/* Модалка редактирования профиля */}
      {isEditModalOpen && (
        <EditUserModal onClose={() => setEditModalOpen(false)} />
      )}
      {/* Модалка добавления работы */}
      {isAddWorkModalOpen && (
        <ArtistModal onClose={() => setAddWorkModalOpen(false)} />
      )}
    </div>
  );
};

export default UserPage;
