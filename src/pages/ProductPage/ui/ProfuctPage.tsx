import { useParams } from "react-router-dom";

import styles from "./productpage.module.scss";

import { Footer } from "@/widgets";
import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
import Header from "@/widgets/Header/ui/Header.tsx";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = productsMock.find((item) => item.id === Number(id));

  if (!product) {
    return <div>Товар не найден</div>;
  }

  return (
    <div>
      <Header />
      <main className={styles.product}>
        <div className={styles.product__container}>
          <img
            src={product.src}
            className={styles.product__image}
            alt={product.title}
          />
          <div className={styles.product__info}>
            <h1 className={styles.product__title}>{product.title}</h1>
            <div className={styles.product__description}>
              {/* Здесь можно добавить дополнительное описание */}
              Подробное описание графического рисунка {product.title}. Этот
              уникальный арт создан профессиональным художником с использованием
              современных цифровых инструментов.
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
