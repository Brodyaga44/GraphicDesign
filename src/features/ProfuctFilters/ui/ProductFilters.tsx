import { useState } from "react";
import { InputNumber } from "antd";

import styles from "./ProductFilters.module.scss";

import { IProductFilters } from "@/features/ProfuctFilters/ui/interfaces/IProductFilters.ts";
import { dropdownItems } from "@/pages/CategoryPage/ui/interfaces/dropdownItems.ts";
import { CustomDropdown } from "@/shared";

export const ProductFilters = ({
  products,
  onFilter,
  getCategory,
}: IProductFilters) => {
  const [filters, setFilters] = useState({
    style: null as string | null,
    priceMin: null as number | null,
    priceMax: null as number | null,
    ratingOrder: null as "asc" | "desc" | null,
  });

  const [tempPrice, setTempPrice] = useState({
    min: null as number | null,
    max: null as number | null,
  });

  const applyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    const filtered = [...products].filter((product) => {
      if (newFilters.style && product.style !== newFilters.style) return false;
      if (newFilters.priceMin !== null && product.price < newFilters.priceMin)
        return false;
      if (newFilters.priceMax !== null && product.price > newFilters.priceMax)
        return false;
      return true;
    });

    if (newFilters.ratingOrder) {
      filtered.sort((a, b) =>
        newFilters.ratingOrder === "asc"
          ? a.rating - b.rating
          : b.rating - a.rating,
      );
    }

    onFilter(filtered);
  };

  const applyPriceFilter = () => {
    applyFilters({
      ...filters,
      priceMin: tempPrice.min,
      priceMax: tempPrice.max,
    });
  };

  const resetFilter = (type: "style" | "price" | "rating") => {
    if (type === "style") {
      applyFilters({ ...filters, style: null });
    } else if (type === "price") {
      setTempPrice({ min: null, max: null });
      applyFilters({ ...filters, priceMin: null, priceMax: null });
    } else if (type === "rating") {
      applyFilters({ ...filters, ratingOrder: null });
    }
    getCategory();
  };

  const resetAllFilters = () => {
    setTempPrice({ min: null, max: null });
    applyFilters({
      style: null,
      priceMin: null,
      priceMax: null,
      ratingOrder: null,
    });
    getCategory();
  };

  const styleMenuItems = [
    { key: "all", label: "Все стили" },
    ...dropdownItems.map((item) => ({ key: item.key, label: item.title })),
  ];

  const ratingMenuItems = [
    { key: "desc", label: "По убыванию" },
    { key: "asc", label: "По возрастанию" },
  ];

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.filterButtons}>
        <CustomDropdown
          menu={{
            items: styleMenuItems.map((item) => ({
              key: item.key,
              label: (
                <div
                  className={`${styles.filterOption} ${filters.style === item.label ? styles.selected : ""}`}
                  onClick={() =>
                    applyFilters({
                      ...filters,
                      style: item.key === "all" ? null : item.label,
                    })
                  }
                >
                  {item.label}
                </div>
              ),
            })),
            className: styles.dropdownMenu,
          }}
          trigger={["click"]}
        >
          <button className={styles.filterButton}>
            Стиль: {filters.style || "Все"}
          </button>
        </CustomDropdown>

        <CustomDropdown
          menu={{
            items: [
              {
                key: "price-content",
                label: (
                  <div
                    className={styles.dropdownContent}
                    onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри
                  >
                    <div className={styles.filterSection}>
                      <div className={styles.priceRange}>
                        <InputNumber
                          value={tempPrice.min}
                          onChange={(value) =>
                            setTempPrice((prev) => ({ ...prev, min: value }))
                          }
                          placeholder="От"
                          min={0}
                          className={styles.priceInput}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          }
                        />
                        <span className={styles.rangeSeparator}>—</span>
                        <InputNumber
                          value={tempPrice.max}
                          onChange={(value) =>
                            setTempPrice((prev) => ({ ...prev, max: value }))
                          }
                          placeholder="До"
                          min={0}
                          className={styles.priceInput}
                          formatter={(value) =>
                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                          }
                        />
                      </div>
                    </div>
                    <div className={styles.dropdownActions}>
                      <button
                        onClick={() => {
                          setTempPrice({ min: null, max: null });
                          resetFilter("price");
                        }}
                        className={styles.resetButton}
                      >
                        Сбросить
                      </button>
                      <button
                        onClick={applyPriceFilter}
                        className={styles.applyButton}
                      >
                        Применить
                      </button>
                    </div>
                  </div>
                ),
              },
            ],
            className: styles.dropdownMenu,
          }}
          trigger={["click"]}
        >
          <button className={styles.filterButton}>
            Цена:{" "}
            {filters.priceMin || filters.priceMax
              ? `${filters.priceMin || 0} - ${filters.priceMax || "∞"} ₽`
              : "Любая"}
          </button>
        </CustomDropdown>

        <CustomDropdown
          menu={{
            items: ratingMenuItems.map((item) => ({
              key: item.key,
              label: (
                <div
                  className={`${styles.filterOption} ${filters.ratingOrder === item.key ? styles.selected : ""}`}
                  onClick={() =>
                    applyFilters({
                      ...filters,
                      ratingOrder: item.key as "asc" | "desc",
                    })
                  }
                >
                  {item.label}
                </div>
              ),
            })),
            className: styles.dropdownMenu,
          }}
          trigger={["click"]}
        >
          <button className={styles.filterButton}>
            Рейтинг:{" "}
            {filters.ratingOrder
              ? filters.ratingOrder === "asc"
                ? "По возрастанию"
                : "По убыванию"
              : "Не сортировать"}
          </button>
        </CustomDropdown>

        {(filters.style ||
          filters.priceMin !== null ||
          filters.priceMax !== null ||
          filters.ratingOrder) && (
          <button onClick={resetAllFilters} className={styles.resetAllButton}>
            Сбросить все
          </button>
        )}
      </div>
    </div>
  );
};
