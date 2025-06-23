import styles from "./Loader.module.scss";

import { Footer, Header } from "@/widgets";

const Loader = () => {
  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <div className={styles.loaderContainer}>
          <div className={styles.loader}>
            <div className={styles.loaderSpinner} />
            <p className={styles.loaderText}>Загружаем товар...</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export { Loader };
