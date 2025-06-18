import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./categorypage.module.scss";

import { ProductFilters } from "@/features/ProfuctFilters/ui/ProductFilters.tsx";
import { useGetCategory } from "@/pages/CategoryPage/model/hooks/useGetCategory.ts";
import { ICategoryData } from "@/pages/CategoryPage/ui/interfaces/ICategoryItems.ts";
import { CategoryProducts, Footer } from "@/widgets";
import { categories } from "@/widgets/CategoryProducts/model/categories.ts";
import { IProducts } from "@/widgets/CategoryProducts/model/IProducts.ts";
import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
import Header from "@/widgets/Header/ui/Header.tsx";

const CategoryPage = () => {
  const { categoryAlias } = useParams<{ categoryAlias: string }>();

  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    const foundCategory = categories.find((c) => c.alias === categoryAlias);

    if (foundCategory) {
      const newProducts = Array.isArray(currCategoryItems)
        ? currCategoryItems.filter((p) => p.category === foundCategory.alias)
        : [];
      setCategory(foundCategory);
    } else {
      setCategory({
        id: -1,
        alias: "",
        title: "Категория не найдена",
        faq: [],
      });
    }
  }, [categoryAlias]);

  const { currCategoryItems, setCurrCategoryItems, getCategory } =
    useGetCategory(categoryAlias!);

  return (
    <div>
      <Header />
      <main className={styles.cat}>
        <h1 className={styles.cat__title}>{category.title}</h1>

        <ProductFilters
          products={currCategoryItems} // передаём полную копию для фильтрации
          onFilter={setCurrCategoryItems}
          getCategory={getCategory}
        />

        <CategoryProducts products={currCategoryItems} />

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
