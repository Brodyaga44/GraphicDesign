import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";

import styles from "./productreview.module.scss";

import { ReviewProps } from "@/entity/ProductReview/model/ReviewProps.ts";
const ProductReview = ({ review }: ReviewProps) => {
  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewAvatar}>
        {review.reviewImg ? (
          <img src={review.reviewImg} alt={review.reviewName} />
        ) : (
          <span>{review.reviewName.charAt(0)}</span>
        )}
      </div>
      <div className={styles.reviewContent}>
        <div className={styles.reviewHeader}>
          <h4>{review.reviewName}</h4>
          <div className={styles.reviewRating}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`${styles.starIcon} ${
                  i < review.rating ? styles.filled : styles.empty
                }`}
              />
            ))}
          </div>
        </div>
        <p>{review.review}</p>
      </div>
    </div>
  );
};
export default ProductReview;
