import styles from "./servicecard.module.scss";

import { ServiceProps } from "@/entity/ServiceCard/model/ServiceProps.ts";
const ServiceCard = ({ service }: ServiceProps) => {
  return (
    <div className={styles.scard}>
      <div className={styles.scard__content}>
        <div className={styles.scard__title}> {service.title}</div>
        <div className={styles.scard__photo}>
          <img src={service.src} className={styles.scard__image} />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
