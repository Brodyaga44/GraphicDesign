import { LoadingOutlined } from "@ant-design/icons";
import styles from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <LoadingOutlined /> Loading in progress...
    </div>
  );
};

export default Loading;
