import type { PropsWithChildren } from "react";

import styles from "./Modal.module.scss";

interface IModal extends PropsWithChildren {
  onClose: VoidFunction;
}

const Modal = ({ children, onClose }: IModal) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.modal__close} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
