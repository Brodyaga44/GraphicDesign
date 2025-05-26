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

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsMock.find((item) => item.id === Number(id));
  const detail = productDetails.find((item) => item.id === Number(id));

  if (!product || !detail) {
    return <div>Товар не найден</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.product}>
        <div className={styles.product__container}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className={styles.product__swiper}
          >
            {detail.works.map((work, index) => (
              <SwiperSlide key={index}>
                <img
                  className={styles.product__image}
                  src={work.imageUrl}
                  alt={work.altText || `Work ${index}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.product__info}>
            <h1 className={styles.product__title}>{product.title}</h1>
            <div className={styles.product__description}>
              Подробное описание графического рисунка <b>{product.title}</b>.
              Этот уникальный арт создан профессиональным художником с
              использованием современных цифровых инструментов.
            </div>
            <button className={styles.product__button}>Заказать</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
