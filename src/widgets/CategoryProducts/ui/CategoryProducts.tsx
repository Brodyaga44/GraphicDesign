import { useNavigate } from "react-router-dom";

import styles from "./categoryproducts.module.scss";

import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
const CategoryProducts = () => {
  const navigate = useNavigate();

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={styles.catProduct}>
      {productsMock.map((product) => (
        <div
          key={product.id}
          className={styles.catProduct__container}
          onClick={() => handleProductClick(product.id)}
        >
          <img src={product.src} className={styles.catProduct__img} />
          <div className={styles.catProduct__desc}> {product.title}</div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProducts;
