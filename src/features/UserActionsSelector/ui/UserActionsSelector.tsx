import { useNavigate } from "react-router-dom";

import styles from "./useractionselector.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext.ts";
import { IUserActions } from "@/features/UserActionsSelector/ui/interface/IUserActions.ts";
import { LogedUserActionsList } from "@/features/UserActionsSelector/ui/interface/LogedUserActionsList.ts";
import { UserActionsList } from "@/features/UserActionsSelector/ui/interface/UserActionsList.ts";

const UserActionsSelector = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const clickHandle = (action: IUserActions) => {
    {
      console.log(action.id);
      console.log("action");
      navigate("/" + action.id);
    }
  };
  return (
    <>
      {user ? (
        <div className={styles.useractionselector__content}>
          {" "}
          {LogedUserActionsList.map((action) => (
            <div
              className={styles.useractionselector__wideaction}
              key={action.id}
              onClick={() => clickHandle(action)}
            >
              {action.title}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className={styles.useractionselector__content}>
            {" "}
            {UserActionsList.map((action) => (
              <div
                className={styles.useractionselector__action}
                key={action.id}
                onClick={() => clickHandle(action)}
              >
                {action.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserActionsSelector;
