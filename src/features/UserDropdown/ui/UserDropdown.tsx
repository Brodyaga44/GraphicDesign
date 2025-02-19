import styles from "./userdropdown.module.scss";

import useOutsideClick from "@/app/module/hooks/useOutsideClick.ts";
import { IDropdown } from "@/features/UserDropdown/module/IDropdown.ts";

const UserDropdown = ({ children, items }: IDropdown) => {
  // const [] = useState<boolean>(false);
  const { ref, open, setOpen } = useOutsideClick(false);
  const handleOpen = () => {
    setOpen(true);
    console.log("DD open", open);
  };

  return (
    <div className={styles.dropdown} onClick={handleOpen} ref={ref}>
      {children}
      {open && (
        <div className={styles.dropdown__content}>
          <div className={styles.dropdown__item}>{items}</div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
