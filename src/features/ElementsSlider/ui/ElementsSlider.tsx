import { useEffect, useRef, useState } from "react";

import styles from "./eslider.module.scss";

import { ServiceCard } from "@/entity";
import { servicesMock } from "@/features/ElementsSlider/model/servicesMock.ts";

const ElementsSlider = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    const checkScrollable = () => {
      if (container) {
        setShowButtons(container.scrollWidth > container.clientWidth);
      }
    };

    checkScrollable(); // Проверяем при монтировании компонента

    window.addEventListener("resize", checkScrollable); // Проверяем при изменении размера окна

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (container) container.scrollLeft += e.deltaY;
    };

    if (container) {
      container.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("resize", checkScrollable); // Убираем слушатель при размонтировании
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" }); // Прокрутка влево на 300px
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" }); // Прокрутка вправо на 300px
    }
  };

  return (
    <section className={styles.container}>
      {showButtons && (
        <button className={styles.scrollButton__left} onClick={scrollLeft}>
          &lt; {/* Стрелка влево */}
        </button>
      )}
      <div className={styles.scrollableContainer} ref={containerRef}>
        {servicesMock.map((service) => (
          <div key={service.id} className={styles.scrollableItem}>
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
      {showButtons && (
        <button className={styles.scrollButton__right} onClick={scrollRight}>
          &gt; {/* Стрелка вправо */}
        </button>
      )}
    </section>
  );
};

export default ElementsSlider;
