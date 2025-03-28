import styles from "./imagegrid.module.scss";

import { imageGridMock } from "@/widgets/ImageGrid/model/imageGridMock";

const ImageGrid = () => {
  return (
    <div className={styles.gridContainer}>
      {imageGridMock.map((image) => (
        <div key={image.id} className={styles.gridItem}>
          <img src={image.src} alt={image.title} className={styles.image} />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
