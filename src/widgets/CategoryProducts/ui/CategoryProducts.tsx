import { useNavigate } from "react-router-dom";

import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";

import styles from "./categoryproducts.module.scss";

import { IProducts } from "@/widgets/CategoryProducts/model/IProducts.ts";
interface Props {
  products: IProducts[];
}
const CategoryProducts = ({ products }: Props) => {
  const navigate = useNavigate();

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={styles.catProduct}>
      {products.map((product) => (
        <div key={product.id} className={styles.catProduct__container}>
          <img
            src={product.src}
            className={styles.catProduct__img}
            onClick={() => handleProductClick(product.id)}
          />
          <div className={styles.catProduct__about}>
            <section className={styles.catProduct__authorSection}>
              <img
                src={product.author_photo}
                className={styles.catProduct__authorPhoto}
              />
              <div>{product.author}</div>
              <Star />
              <div>{product.rating}</div>
            </section>

            <div
              className={styles.catProduct__desc}
              onClick={() => handleProductClick(product.id)}
            >
              {product.title}
            </div>
            <div className={styles.catProduct__priceBlock}>
              <span>От </span>
              {product.price}
              <span> ₽</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
