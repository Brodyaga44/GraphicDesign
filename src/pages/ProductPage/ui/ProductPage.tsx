import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useGetProductById } from "../lib/hooks/useGetProductById";
import { useGetReviews } from "../lib/hooks/useGetReviews";
import { usePayment } from "../lib/hooks/usePayment";

import styles from "./productpage.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductReview } from "@/entity";
import { Footer } from "@/widgets";
import Header from "@/widgets/Header/ui/Header.tsx";

const ProductPage = () => {
  const { handlePayment } = usePayment();
  const { id } = useParams<{ id: string }>();
  const { product, loading } = useGetProductById(id);
  const { reviews } = useGetReviews(id);
  console.log("product", product);

  const navigate = useNavigate();

  if (loading) {
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
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className={styles.pageWrapper}>
          <div className={styles.errorContainer}>
            <h2>Товар не найден</h2>
            <p>
              К сожалению, запрашиваемый товар не существует или был удален.
            </p>
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
                {product.images.map((image) => (
                  <SwiperSlide
                    key={image.id}
                    className={styles.product__swiperSlide}
                  >
                    <img
                      className={styles.product__image}
                      src={`https://graphico.ru/s3/${image.uri}`}
                      alt={image.fileName}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className={styles.infoSidebar}>
              <div
                className={styles.authorBlock}
                onClick={() => navigate(`/author/${product.userId}`)}
              >
                <div className={styles.authorPhotoWrapper}>
                  <img
                    src={`https://graphico.ru/s3/${product?.user?.photoUri}`}
                    className={styles.authorPhoto}
                    alt={product?.user?.name}
                  />
                </div>
                {/* <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{product?.user.name}</h4>
                  <div className={styles.rating}>
                    {product?.user?.rating} <Star className={styles.starIcon} />
                  </div>
                </div> */}
              </div>

              {/* <ul className={styles.advantagesList}>
                {author.advantages?.map((adv, index) => (
                  <li key={index} className={styles.advantageItem}>
                    <span className={styles.advantageIcon}>✓</span>
                    {adv}
                  </li>
                ))}
              </ul> */}

              <button
                type="button"
                className={styles.orderButton}
                onClick={() => handlePayment(product)}
              >
                Заказать
              </button>
            </div>
          </div>
          {/* <div className={styles.descriptionBlock}>
            <h2>Описание работы</h2>
            {detail.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div> */}
          *
          {!!reviews.length && (
            <div className={styles.reviewsSection}>
              <h2 className={styles.reviewsTitle}>Отзывы</h2>
              {reviews.map((review) => (
                <ProductReview key={review.id} review={review} />
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
