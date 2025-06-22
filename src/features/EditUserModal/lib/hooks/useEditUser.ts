import type { IEditUserForm, IUser } from "../../model/types/IEditUserForm";

import useAuthContext from "@/app/module/hooks/useAuthContext";
import { $api } from "@/shared/config/api/api";

export const useEditUser = () => {
  const { user, setUser } = useAuthContext();
  const editUser = async (data: IUser) => {
    await $api.put("/user/me/update", data).then((res) => {
      setUser({ ...res.data, photoUri: user?.photoUri });
      console.log("edit", user);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...res.data,
          photoUri: user?.photoUri,
        }),
      );
      // localStorage.setItem("role", res.data.roles[0].name);
      // localStorage.setItem("token", res.data.token);
    });
  };

  const editUserAvatar = async (formData: File) => {
    await $api.put("/user/me/update/avatar", formData).then((res) => {
      setUser((prev) => ({ ...prev, photoUri: res.data.uri }));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          photoUri: res.data.uri,
        }),
      );
    });
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
