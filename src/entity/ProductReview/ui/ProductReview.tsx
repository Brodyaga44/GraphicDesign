import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";

import styles from "./productreview.module.scss";

import type { ReviewProps } from "@/entity/ProductReview/model/ReviewProps.ts";

const ProductReview = ({ review }: ReviewProps) => (
  <div className={styles.reviewItem}>
    <div className={styles.reviewAvatar}>
      {review?.author?.photoUri ? (
        <img
          src={`https://graphico.ru/s3/${review?.author?.photoUri}`}
          alt={review?.author?.name}
        />
      ) : (
        <span>{review?.author?.name.charAt(0)}</span>
      )}
    </div>
    <div className={styles.reviewContent}>
      <div className={styles.reviewHeader}>
        <h4>{review?.author?.name}</h4>
        <div className={styles.reviewRating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`${styles.starIcon} ${
                i < review?.rate ? styles.filled : styles.empty
              }`}
            />
          ))}
        </div>
      </div>
      <p style={{ textAlign: "left" }}>{review.text}</p>
    </div>
  </div>
);

export default ProductReview;
