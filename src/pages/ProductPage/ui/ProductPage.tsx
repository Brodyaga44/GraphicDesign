import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";
import { useGetProductById } from "../lib/hooks/useGetProductById";
import { usePayment } from "../lib/hooks/usePayment";

import styles from "./productpage.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductReview } from "@/entity";
import { reviews } from "@/features/ReviewContent/model/reviews.ts";
import { authors } from "@/pages/AccoutPage/model/authors.ts";
import { productDetails } from "@/pages/ProductPage/model/productDetails.ts";
import { Footer } from "@/widgets";
import Header from "@/widgets/Header/ui/Header.tsx";

const ProductPage = () => {
  const { handlePayment } = usePayment();
  const { id } = useParams<{ id: string }>();
  const { product } = useGetProductById(id);

  // const product = productsMock.find((item) => item.id === Number(id));
  const detail = productDetails.find((item) => item.id === Number(id));
  const productReviews = reviews.filter(
    (item) => item.product_id === Number(id),
  );
  const navigate = useNavigate();
  const author = authors.find((a) => a.id === product?.author_id);

  if (!product || !detail || !author) {
    return <div>Товар не найден</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <main className={styles.product}>
          <div className={styles.productMain}>
            <div className={styles.swiperContainer}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className={styles.product__swiper}
              >
                {detail.works.map((work, index) => (
                  <SwiperSlide
                    key={index}
                    className={styles.product__swiperSlide}
                  >
                    <img
                      className={styles.product__image}
                      src={work.imageUrl}
                      alt={work.altText || `Work ${index}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className={styles.infoSidebar}>
              <div
                className={styles.authorBlock}
                onClick={() => navigate(`/author/${author.id}`)}
              >
                <div className={styles.authorPhotoWrapper}>
                  <img
                    src={author.photo}
                    className={styles.authorPhoto}
                    alt={author.name}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{author.name}</h4>
                  <div className={styles.rating}>
                    {author.rating} <Star className={styles.starIcon} />
                  </div>
                </div>
              </div>

              <ul className={styles.advantagesList}>
                {author.advantages?.map((adv, index) => (
                  <li key={index} className={styles.advantageItem}>
                    <span className={styles.advantageIcon}>✓</span>
                    {adv}
                  </li>
                ))}
              </ul>

              <button className={styles.orderButton} onClick={handlePayment}>
                Заказать
              </button>
            </div>
          </div>

          <div className={styles.descriptionBlock}>
            <h2>Описание работы</h2>
            {detail.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {productReviews.length > 0 && (
            <div className={styles.reviewsSection}>
              <h2 className={styles.reviewsTitle}>Отзывы</h2>
              {productReviews.map((review) => (
                <ProductReview key={review.reviewName} review={review} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
