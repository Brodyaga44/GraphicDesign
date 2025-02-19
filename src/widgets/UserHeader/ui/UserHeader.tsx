import styles from "./userheader.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext.ts";
import { UserHub, UserNickBlock } from "@/entity";
import { Badge, OtherUserHeader } from "@/features";
import { IUserHeaderProps } from "@/widgets/UserHeader/interfaces/IUserHeaderProps.ts";

const UserHeader = ({ currUser, open, setOpen }: IUserHeaderProps) => {
  const { user } = useAuthContext();
  return (
    <header className={styles.uheader}>
      {user ? (
        <div className={styles.uheader__loged}>
          <div className={styles.uheader__leftPart}>
            <UserNickBlock currUser={currUser} />
            <Badge open={open} setOpen={setOpen} />
          </div>
          <UserHub />
        </div>
      ) : (
        <OtherUserHeader currUser={currUser} /> // другой вид верхней части, надо еще раз подумать над названием
      )}
    </header>
  );
};

export default UserHeader;
