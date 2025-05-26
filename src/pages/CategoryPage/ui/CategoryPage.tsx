import { useState } from "react";

import styles from "./categorypage.module.scss";

import { ProductFilters } from "@/features/ProfuctFilters/ui/ProductFilters.tsx";
import { CategoryProducts, Footer } from "@/widgets";
import { productsMock } from "@/widgets/CategoryProducts/model/productsMock.ts";
import Header from "@/widgets/Header/ui/Header.tsx";

const CategoryPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(productsMock);

  return (
    <div>
      <Header />
      <main className={styles.cat}>
        <div className={styles.cat__title}>Графические рисунки</div>

        <ProductFilters
          products={productsMock}
          onFilter={setFilteredProducts}
        />
        <CategoryProducts products={filteredProducts} />
        <div className={styles.cat__FAQ}>
          Графические рисунки: Частые вопросы
        </div>
        <div className={styles.cat__info}>
          <div className={styles.cat__infoElement}>
            <div className={styles.cat__infoTitle}>
              Что такое Графические рисунки?
            </div>
            <div className={styles.cat__infoText}>
              Графические рисунки — это яркие, уникальные рисунки, часто с
              элементами юмора. В отличие от других видов цифрового дизайна, где
              используются инструменты для создания форм и эффектов, иллюстрации
              обычно рисуются от руки. Если вы хотите придать своему дизайну
              индивидуальность и игривость, иллюстрации подойдут лучше, чем
              фотографии или стандартная графика.
            </div>
          </div>
          <div className={styles.cat__infoElement}>
            <div className={styles.cat__infoTitle}>
              Что делает иллюстрацию удачной?
            </div>
            <div className={styles.cat__infoText}>
              Хорошая иллюстрация запоминается, радует глаз и рассказывает
              историю. Поскольку восприятие искусства субъективно, у каждого
              свое мнение о том, что делает иллюстрацию "удачной". Главное,
              чтобы она соответствовала вашим целям и передавала нужную
              визуальную идею.
            </div>
          </div>
          <div className={styles.cat__infoElement}>
            <div className={styles.cat__infoTitle}>
              Как подготовиться к заказу рисунка?
            </div>
            <div className={styles.cat__infoText}>
              Перед обращением к дизайнеру продумайте стиль изображения и его
              содержание. Посмотрите примеры работ на Graphico или других
              платформах — отметьте, что вам нравится, а что нет.
            </div>
          </div>
          <div className={styles.cat__infoElement}>
            <div className={styles.cat__infoTitle}>
              Как выбрать подходящего художника?
            </div>
            <div className={styles.cat__infoText}>
              Сначала отберите кандидатов по навыкам и загрузке, затем изучите
              их опыт, портфолио и предыдущие работы. Выбирайте того, чей стиль
              вам ближе всего.
            </div>
          </div>
          <div className={styles.cat__infoElement}>
            <div className={styles.cat__infoTitle}>
              Зачем бизнесу заказывать индивидуальные иллюстрации?
            </div>
            <div className={styles.cat__infoText}>
              Стоковые фото и шаблонные изображения не передают уникальность
              вашего бренда. Кастомные иллюстрации помогают выделиться,
              добавляют характер и укрепляют имидж компании.
            </div>
          </div>
          <div className={styles.cat__infoElement}>
            <div className={styles.cat__infoTitle}>
              Сколько стоят иллюстрации?
            </div>
            <div className={styles.cat__infoText}>
              Стоимость зависит от сложности: полноцветные иллюстрации с
              детализированным фоном обойдутся дороже, чем черно-белые эскизы.
              Цена также варьируется в зависимости от объема работы, количества
              форматов и техники исполнения.
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
