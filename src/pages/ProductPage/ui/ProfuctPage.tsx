import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";

import styles from "./productpage.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductReview } from "@/entity";
import { reviews } from "@/features/ReviewContent/model/reviews.ts";
import { authors } from "@/pages/AccoutPage/model/authors.ts";
import { productDetails } from "@/pages/ProductPage/model/productDetails.ts";
import { Footer } from "@/widgets";
import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
import Header from "@/widgets/Header/ui/Header.tsx";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const product = productsMock.find((item) => item.id === Number(id));
  const detail = productDetails.find((item) => item.id === Number(id));
  const productReviews = reviews.filter(
    (item) => item.product_id === Number(id),
  );
  const navigate = useNavigate();
  const author = authors.find((a) => a.id === product?.author_id);
  const handlePayment = () => {
    if (!product) {
      alert(
        "Платежная система временно недоступна или некорректные данные товара",
      );
      return;
    }
    // @ts-ignore
    const widget = new cp.CloudPayments();

    widget.pay(
      "charge", // 'auth' или 'charge' — для списания сразу используем 'charge'
      {
        publicId: "test_api_00000000000000000000001", // тут замени на свой publicId из личного кабинета CloudPayments
        description: `Оплата товара: ${product.title}`,
        amount: product.price,
        currency: "RUB",
        invoiceId: `order_${Date.now()}`, // уникальный номер заказа
        skin: "mini",
        autoClose: 3, // автозакрытие виджета после успешной оплаты через 3 секунды
        payer: {
          phone: "+71234567890", // можно заменить на номер пользователя
          firstName: "Иван",
          lastName: "Иванов",
        },
      },
      {
        onSuccess: () => {
          notification.success({
            message: "Спасибо за покупку!",
            description: `Ваш заказ ${product.title} успешно оплачен.`,
            placement: "topRight",
          });
        },
        onFail: () => {
          alert("Отмена заказа");
        },
      },
    );
  };

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
            <h2>О графическом рисунке "{product.title}"</h2>
            <p>
              Этот очаровательный мультяшный рисунок животного создан в
              уникальном стиле, сочетающем яркие цвета и плавные линии. Художник
              уделил особое внимание проработке деталей и эмоциональной
              выразительности персонажа.
            </p>
            <p>Рисунок идеально подходит для:</p>
            <ul>
              <li>Оформления детских комнат и игровых пространств</li>
              <li>Создания уникальных принтов на одежде и аксессуарах</li>
              <li>Иллюстраций для книг и обучающих материалов</li>
              <li>Дизайна упаковки продуктов для детей</li>
            </ul>
            <p>
              Технические характеристики: векторный формат (доступны AI, EPS,
              SVG), разрешение 300 dpi для растровых версий, легко
              масштабируется без потери качества.
            </p>
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
