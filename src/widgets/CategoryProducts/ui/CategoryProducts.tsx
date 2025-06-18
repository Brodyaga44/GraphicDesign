import { useNavigate } from "react-router-dom";

import Star from "../../../shared/assets/Icons/rating/star-filled.svg?react";

import styles from "./categoryproducts.module.scss";

import { authors } from "@/pages/AccoutPage/model/authors.ts";
import { ICategoryData } from "@/pages/CategoryPage/ui/interfaces/ICategoryItems.ts";

interface Props {
  products: ICategoryData[];
}

const CategoryProducts = ({ products }: Props) => {
  const navigate = useNavigate();
  console.log(products);
  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.catProduct}>
      {Array.isArray(products) ? (
        products.map((product) => {
          return (
            <div key={product.id} className={styles.catProduct__container}>
              <div className={styles.catProduct__imgWrapper}>
                {product.images?.[0] ? (
                  <img
                    src={product.images?.[0]}
                    className={styles.catProduct__img}
                    onClick={() => handleProductClick(product.id)}
                    alt={product.titleName}
                  />
                ) : (
                  <img
                    className={styles.catProduct__img}
                    onClick={() => handleProductClick(product.id)}
                    src="https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/202897971/original/ea6c8f2c1e498d2269b33bc222d2918d7a175fe2.png"
                  />
                )}
              </div>
              <div className={styles.catProduct__about}>
                <section className={styles.catProduct__authorSection}>
                  {product.user?.photoUri ? (
                    <img
                      src={product.user?.photoUri}
                      className={styles.catProduct__authorPhoto}
                      alt={product.user?.name}
                    />
                  ) : (
                    <img
                      className={styles.catProduct__authorPhoto}
                      src="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/9d6041b0e26e1e9c7e315b5ea8faca82-1631376227684/637fa57f-63db-493e-9802-e2c53c3b28b1.jpg"
                    />
                  )}
                  <div>{product.user?.name}</div>
                  <Star />
                  {/*<div>{author.rating}</div>*/}
                  <div>5</div> {/*TODO rating*/}
                </section>

                <div
                  className={styles.catProduct__desc}
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.titleName}
                </div>
                <div className={styles.catProduct__priceBlock}>
                  <span>От </span>
                  {product.price}
                  <span> ₽</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>Категория пуста</div>
      )}
    </div>
  );
};

export default CategoryProducts;
