import type {
  IAvatar,
  IEditUserForm,
  IUser,
} from "../../model/types/IEditUserForm";

import { $api } from "@/shared/config/api/api";

export const useEditUser = () => {
  const editUser = async (data: IUser) => {
    await $api
      .put("/user/me/update", data)
      .then((res) => console.log("res", res));
  };

  const editUserAvatar = async (data: IAvatar) => {
    await $api
      .put("/user/me/update/avatar", data)
      .then((res) => console.log("res avatar", res));
  };

  const updateUser = (data: IEditUserForm) => {
    editUser(data.user);
    if (data.avatar) {
      editUserAvatar(data.avatar);
    }
  };

  return { updateUser };
};
