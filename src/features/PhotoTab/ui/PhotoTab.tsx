import styles from "./phototab.module.scss";

import { PhotoMock } from "@/entity/PhotoGallery/ui/interfaces/PhotoMock.ts";
import Photo from "@/shared/assets/Photos/photo_2024-08-14_00-15-36.jpg";

const PhotoTab = () => {
  return (
    <div className={styles.photo__gallery}>
      <div className={styles.photo__items}>
        {PhotoMock.map((photo) => (
          <div key={photo.id} className={styles.photo__item}>
            <div className={styles.photo__container}>
              <img src={Photo} alt="" className={styles.photo__photo} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoTab;
