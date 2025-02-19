import styles from "./homepage.module.scss";

import { ElementsSlider } from "@/features";
import About from "@/features/About/ui/About.tsx";
import hero from "@/shared/assets/Photos/hero.png";
import Header from "@/widgets/Header/ui/Header.tsx";

const HomePage = () => {
  return (
    <div>
      <Header />
      <main className={styles.home}>
        <section className={styles.home__hero}>
          <span className={styles.home__heroSlogan}>
            Graphico - Творим для Вас
          </span>
          <div className={styles.home__imgContainer}>
            <img src={hero} alt="" className={styles.home__img} />
          </div>
        </section>
        <div className={styles.home__title}>Популярные тематики</div>
        <div className={styles.home__slider}>
          <ElementsSlider />
        </div>
        <div className={styles.home__title}>Работа с нами</div>
        <About />
      </main>
    </div>
  );
};

export default HomePage;
