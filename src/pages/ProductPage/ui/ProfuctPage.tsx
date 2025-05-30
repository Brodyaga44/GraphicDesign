import { useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./productpage.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { productDetails } from "@/pages/ProductPage/model/productDetails.ts";
import { Footer } from "@/widgets";
import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
import Header from "@/widgets/Header/ui/Header.tsx";
import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsMock.find((item) => item.id === Number(id));
  const detail = productDetails.find((item) => item.id === Number(id));

  if (!product || !detail) {
    return <div>Товар не найден</div>;
  }

  return (
    <>
      <Header />

      <div className={styles.pageWrapper}>
        <main className={styles.product}>
          <div className={styles.productMain}>
            {/* Блок свайпера */}
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

            {/* Блок информации (автор, преимущества) */}
            <div className={styles.infoSidebar}>
              <div className={styles.authorBlock}>
                <div className={styles.authorPhotoWrapper}>
                  <img
                    src={product.author_photo}
                    className={styles.authorPhoto}
                    alt={product.author}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{product.author}</h4>
                  <div className={styles.rating}>
                    {product.rating} <Star className={styles.starIcon} />
                  </div>
                </div>
              </div>

              <div className={styles.productHeader}>
                <h1 className={styles.productTitle}>{product.title}</h1>
                <div className={styles.productPrice}>{product.price} ₽</div>
              </div>

              <ul className={styles.advantagesList}>
                <li className={styles.advantageItem}>
                  <span className={styles.advantageIcon}>✓</span>
                  Быстрое выполнение заказа (1-3 дня)
                </li>
                <li className={styles.advantageItem}>
                  <span className={styles.advantageIcon}>✓</span>
                  Гарантия качества работы
                </li>
                <li className={styles.advantageItem}>
                  <span className={styles.advantageIcon}>✓</span>
                  Бесплатные правки в течение недели
                </li>
                <li className={styles.advantageItem}>
                  <span className={styles.advantageIcon}>✓</span>
                  Поддержка после выполнения работы
                </li>
              </ul>

              <button className={styles.orderButton}>Заказать</button>
            </div>
          </div>
          {/* Блок подробного описания */}
          {/*//TODO: эту темку вынести надо*/}
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
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
