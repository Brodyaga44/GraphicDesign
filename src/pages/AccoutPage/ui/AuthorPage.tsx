import { useNavigate, useParams } from "react-router-dom";

import TGSvg from "../../../shared/assets/Icons/tg.svg?react";

import styles from "./accountpage.module.scss";

import { ProductReview } from "@/entity";
import { reviews } from "@/features/ReviewContent/model/reviews.ts";
import { authors } from "@/pages/AccoutPage/model/authors.ts";
import { Footer } from "@/widgets";
import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
import Header from "@/widgets/Header/ui/Header.tsx";

const AuthorPage = () => {
  const { id } = useParams<{ id: string }>();
  const author = authors.find((a) => a.id === Number(id));

  const navigate = useNavigate();

  if (!author) return <div className={styles.notFound}>Автор не найден</div>;

  const products = productsMock.filter((p) => author.works_id.includes(p.id));

  const handleContactClick = () => {
    window.open(`https://t.me/${author.contact}`);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <section className={styles.header}>
          <img src={author.photo} className={styles.photo} alt={author.name} />
          <div className={styles.headerInfo}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{author.name}</h1>
              <button
                className={styles.contactButton}
                onClick={handleContactClick}
                title="Связаться с автором"
              >
                <TGSvg />
                Связаться
              </button>
            </div>
            <p className={styles.rating}>
              Рейтинг:{" "}
              <span className={styles.ratingValue}>{author.rating} ★</span>
            </p>
            <p className={styles.status}>{author.status}</p>
          </div>
        </section>

        <section className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>Об авторе</h2>
          <p className={styles.about}>{author.about}</p>
          <p className={styles.responseTime}>
            <strong>Среднее время ответа:</strong> {author.response_time}
          </p>
          <p className={styles.skills}>
            <strong>Навыки:</strong> {author.skills.join(", ")}
          </p>
        </section>

        {/* блок с преимуществами автора */}
        {author.advantages && author.advantages.length > 0 && (
          <section className={styles.advantagesSection}>
            <h2 className={styles.sectionTitle}>Преимущества автора</h2>
            <ul className={styles.advantagesList}>
              {author.advantages.map((advantage, index) => (
                <li key={index} className={styles.advantageItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {advantage}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.works}>
          <h2 className={styles.sectionTitle}>Работы автора</h2>
          <div className={styles.grid}>
            {products.map((product) => (
              <div
                key={product.id}
                className={styles.productCard}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img src={product.src} alt={product.title} />
                <h3>{product.title}</h3>
                <p className={styles.price}>{product.price} ₽</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.reviews}>
          <h2 className={styles.sectionTitle}>Отзывы об авторе</h2>
          {products.map((product) => {
            const productReviews = reviews.filter(
              (r) => r.product_id === product.id,
            );
            if (productReviews.length === 0) return null;
            return (
              <div key={product.id} className={styles.reviewGroup}>
                <h3
                  className={styles.reviewProduct}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.title}
                </h3>
                {productReviews.map((review) => (
                  <ProductReview key={review.reviewName} review={review} />
                ))}
              </div>
            );
          })}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AuthorPage;
