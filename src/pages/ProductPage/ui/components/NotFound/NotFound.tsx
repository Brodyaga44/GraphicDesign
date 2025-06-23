import { useNavigate } from "react-router";

import styles from "./NotFound.module.scss";

import { Footer, Header } from "@/widgets";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <div className={styles.errorContainer}>
          <h2>Товар не найден</h2>
          <p>К сожалению, запрашиваемый товар не существует или был удален.</p>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
          >
            Вернуться назад
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { NotFound };
