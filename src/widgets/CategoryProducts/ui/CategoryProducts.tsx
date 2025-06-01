import { useNavigate } from "react-router-dom";

import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";

import styles from "./categoryproducts.module.scss";

import { authors } from "@/pages/AccoutPage/model/authors.ts";
import { IProducts } from "@/widgets/CategoryProducts/model/IProducts";

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
      {products.map((product) => {
        const author = authors.find((a) => a.id === product.author_id);
        if (!author) return null;

        return (
          <div key={product.id} className={styles.catProduct__container}>
            <img
              src={product.src}
              className={styles.catProduct__img}
              onClick={() => handleProductClick(product.id)}
              alt={product.title}
            />
            <div className={styles.catProduct__about}>
              <section className={styles.catProduct__authorSection}>
                <img
                  src={author.photo}
                  className={styles.catProduct__authorPhoto}
                  alt={author.name}
                />
                <div>{author.name}</div>
                <Star />
                <div>{author.rating}</div>
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
        );
      })}
    </div>
  );
};

export default CategoryProducts;
