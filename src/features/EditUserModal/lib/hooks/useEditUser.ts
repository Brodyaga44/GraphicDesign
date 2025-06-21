import type { IEditUserForm, IUser } from "../../model/types/IEditUserForm";

import useAuthContext from "@/app/module/hooks/useAuthContext";
import { $api } from "@/shared/config/api/api";

export const useEditUser = () => {
  const { setUser } = useAuthContext();
  const editUser = async (data: IUser) => {
    await $api.put("/user/me/update", data).then((res) => {
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      // localStorage.setItem("role", res.data.roles[0].name);
      // localStorage.setItem("token", res.data.token);
    });
  };

  const editUserAvatar = async (formData) => {
    console.log("Файл внутри FormData:", formData.get("file"));
    await $api
      .put("/user/me/update/avatar", formData)
      .then((res) => console.log("res avatar", res));
  };

  const updateUser = (data: IEditUserForm) => {
    editUser(data.user);
    console.log(data);
    if (data.avatar) {
      editUserAvatar(data.avatar);
    }
  };

  return { updateUser };
};
