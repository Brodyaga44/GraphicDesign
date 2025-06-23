import { useNavigate } from "react-router";

import styles from "./AuthorReview.module.scss";

import ProductReview from "@/entity/ProductReview/ui/ProductReview";
import { useGetReviews } from "@/pages/ProductPage/lib/hooks/useGetReviews";

const AuthorReview = ({
  workId,
  title,
}: {
  workId: string | number;
  title: string;
}) => {
  const { reviews } = useGetReviews(workId);

  const navigate = useNavigate();

  return (
    !!reviews.length && (
      <button
        type="button"
        key={workId}
        className={styles.reviewGroup}
        onClick={() => navigate(`/product/${workId}`)}
      >
        <h3 className={styles.reviewProduct}>{title}</h3>
        {reviews.map((review) => (
          <ProductReview key={review.id} review={review} />
        ))}
      </button>
    )
  );
};

export default AuthorReview;
