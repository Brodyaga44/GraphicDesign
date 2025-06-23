import { useParams } from "react-router-dom";

import TGSvg from "../../../shared/assets/Icons/tg.svg?react";
import { useGetAuthorById } from "../libs/hooks/useGetAuthorById";
import { useGetWorksByAuthorId } from "../libs/hooks/useGetWorksByAuthorId";

import styles from "./accountpage.module.scss";

import { AuthorReviews, AuthorWorks, Footer } from "@/widgets";
import Header from "@/widgets/Header/ui/Header.tsx";

const AuthorPage = () => {
  const { id } = useParams<{ id: string }>();
  const { author } = useGetAuthorById(id);
  const { works } = useGetWorksByAuthorId(id);

  if (!author) return <div className={styles.notFound}>Автор не найден</div>;
  console.log("works", works);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.header}>
          <img
            src={`https://graphico.ru/s3/${author.photoUri}`}
            className={styles.photo}
            alt={author.name}
          />
          <div className={styles.headerInfo}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{author.name}</h1>
              <button
                type="button"
                className={styles.contactButton}
                title="Связаться с автором"
              >
                <TGSvg />
                Связаться
              </button>
            </div>
            <p className={styles.rating}>
              Рейтинг: <span className={styles.ratingValue}>5 ★</span>
            </p>
            <p className={styles.status}>{author.about}</p>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>Об авторе</h2>
          <p className={styles.about}>{author.about}</p>
          <p className={styles.responseTime}>
            <strong>Среднее время ответа:</strong> 3 часа
          </p>
          <p className={styles.skills}>
            <strong>Навыки:</strong> {author.skills}
          </p>
        </section>

        {/* блок с преимуществами автора */}
        {/* {author.advantages && author.advantages.length > 0 && (
          <section className={styles.advantagesSection}>
            <h2 className={styles.sectionTitle}>Преимущества автора</h2>
            <ul className={styles.advantagesList}>
              {author.advantages.map((advantage, index) => (
                <li key={index} className={styles.advantageItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {advantage}
                </li>
              ))}
            </ul>
          </section>
        )} */}
        <AuthorWorks works={works} />
        <AuthorReviews works={works} />
      </div>
      <Footer />
    </>
  );
};

export default AuthorPage;
