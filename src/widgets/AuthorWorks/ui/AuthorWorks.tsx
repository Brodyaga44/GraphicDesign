import { useNavigate } from "react-router";

import styles from "./AuthorWorks.module.scss";

import type { IAuthorWork } from "@/pages/AccoutPage/model/types/IAuthorWork";

const AuthorWorks = ({ works }: { works: IAuthorWork["works"] }) => {
  const navigate = useNavigate();

  return (
    <section className={styles.works}>
      <h2 className={styles.sectionTitle}>Работы автора</h2>
      <div className={styles.grid}>
        {works.map((work) => (
          <button
            type="button"
            key={work.id}
            className={styles.productCard}
            onClick={() => navigate(`/product/${work.id}`)}
          >
            <img
              src={`https://graphico.ru/s3/${work.images?.[0]?.uri}`}
              alt={work.images?.[0]?.filename}
            />
            <h3>{work.titleName}</h3>
            <p className={styles.price}>{work.price} ₽</p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default AuthorWorks;
