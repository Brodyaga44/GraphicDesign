import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./eslider.module.scss";

import { ServiceCard } from "@/entity";
import { themes } from "@/shared/constants/themes.ts";

const ElementsSlider = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showButtons, setShowButtons] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;

    const checkScrollable = () => {
      if (container) {
        setShowButtons(container.scrollWidth > container.clientWidth);
      }
    };

    checkScrollable();

    window.addEventListener("resize", checkScrollable);

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
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.container}>
      {showButtons && (
        <button
          className={styles.scrollButton__left}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          &lt;
        </button>
      )}
      <div className={styles.scrollableContainer} ref={containerRef}>
        {themes.map((service) => (
          <div
            key={service.name}
            className={styles.scrollableItem}
            onClick={() => navigate(`category/${service.alias}`)}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
      {showButtons && (
        <button
          className={styles.scrollButton__right}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          &gt;
        </button>
      )}
    </section>
  );
};

export default ElementsSlider;
