import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./categorypage.module.scss";

import { ProductFilters } from "@/features/ProfuctFilters/ui/ProductFilters.tsx";
import { CategoryProducts, Footer } from "@/widgets";
import { categories } from "@/widgets/CategoryProducts/model/categories.ts";
import { IProducts } from "@/widgets/CategoryProducts/model/IProducts.ts";
import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
import Header from "@/widgets/Header/ui/Header.tsx";

const CategoryPage = () => {
  const { categoryAlias } = useParams<{ categoryAlias: string }>();

  const [category, setCategory] = useState(categories[0]);
  const [allProducts, setAllProducts] = useState<IProducts[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    const foundCategory = categories.find((c) => c.alias === categoryAlias);

    if (foundCategory) {
      const newProducts = productsMock.filter(
        (p) => p.category_id === foundCategory.id,
      );
      setCategory(foundCategory);
      setAllProducts(newProducts);
      setFilteredProducts(newProducts);
    } else {
      setCategory({
        id: -1,
        alias: "",
        title: "Категория не найдена",
        faq: [],
      });
      setAllProducts([]);
      setFilteredProducts([]);
    }
  }, [categoryAlias]);

  return (
    <div>
      <Header />
      <main className={styles.cat}>
        <h1 className={styles.cat__title}>{category.title}</h1>

        <ProductFilters
          products={allProducts} // передаём полную копию для фильтрации
          onFilter={setFilteredProducts}
        />

        <CategoryProducts products={filteredProducts} />

        <h2 className={styles.cat__faqTitle}>
          {category.title}: Частые вопросы
        </h2>

        <section className={styles.cat__FAQ}>
          {category.faq.length ? (
            category.faq.map((faqItem, idx) => (
              <div key={idx} className={styles.cat__infoElement}>
                <h3 className={styles.cat__infoTitle}>{faqItem.title}</h3>
                <p className={styles.cat__infoText}>{faqItem.text}</p>
              </div>
            ))
          ) : (
            <p>Информация отсутствует.</p>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
