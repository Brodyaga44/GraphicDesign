import styles from "./AuthorReviews.module.scss";

import { AuthorReview } from "@/entity";
import type { IAuthorWork } from "@/shared/config/interfaces/IAuthorWork";

const AuthorReviews = ({ works }: { works: IAuthorWork["works"] }) => {
  return (
    <section className={styles.reviews}>
      <h2 className={styles.sectionTitle}>Отзывы об авторе</h2>
      {works.map((work) => {
        return (
          <AuthorReview key={work.id} workId={work.id} title={work.titleName} />
        );
      })}
    </section>
  );
};

export default AuthorReviews;
