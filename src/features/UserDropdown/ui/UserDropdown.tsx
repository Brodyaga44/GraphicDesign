import styles from "./userdropdown.module.scss";

import useOutsideClick from "@/app/module/hooks/useOutsideClick.ts";
import { IDropdown } from "@/features/UserDropdown/module/IDropdown.ts";

const UserDropdown = ({ children, items, profileButton }: IDropdown) => {
  const { ref, open, setOpen } = useOutsideClick(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.dropdown} onClick={handleOpen} ref={ref}>
      {children}
      {open && (
        <div className={styles.dropdown__content}>
          {profileButton && (
            <div className={styles.dropdown__profile}>{profileButton}</div>
          )}
          <div className={styles.dropdown__item}>{items}</div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
