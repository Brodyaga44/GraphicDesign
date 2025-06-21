import { Controller, useForm } from "react-hook-form";
import { notification } from "antd";
import clsx from "clsx";

import { useEditUser } from "../lib/hooks/useEditUser";
import type { IEditUserForm } from "../model/types/IEditUserForm";

import styles from "./EditUserModal.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext";
import { EditUserAvatar } from "@/features/EditUserAvatar";
import { EditUserSkills } from "@/features/EditUserSkills";
import { Modal } from "@/shared/ui";

const EditUserModal = ({ onClose }: { onClose: VoidFunction }) => {
  const { user } = useAuthContext();

  const { updateUser } = useEditUser();

  console.log(user);
  const methods = useForm<IEditUserForm>({
    defaultValues: {
      user: {
        id: user?.id,
        username: user?.username,
        name: user?.name,
        about: user?.about,
        skills: user?.skills,
        directions: user?.directions,
      },
      avatar: null,
    },
  });

  const handleEditSubmit = (data: IEditUserForm) => {
    const res = updateUser(data);
    console.log(res);
    onClose();

    notification.success({
      message: "Профиль обновлён",
      description: "Изменения успешно сохранены.",
      placement: "topRight",
    });
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={methods.handleSubmit(handleEditSubmit)}>
        <h3>Редактировать профиль</h3>
        <Controller
          control={methods.control}
          name={"avatar"}
          render={({ field }) => (
            <EditUserAvatar
              avatarData={field.value}
              onChange={field.onChange}
            />
          )}
        />
        <Controller
          control={methods.control}
          name={"user.username"}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <input
              {...field}
              type="text"
              placeholder="Логин"
              className={clsx(styles.modal__input, {
                [styles.modal__input__error]: fieldState.error,
              })}
            />
          )}
        />
        <Controller
          control={methods.control}
          name={"user.name"}
          rules={{ required: true }}
          render={({ field, fieldState }) => (
            <input
              {...field}
              type="text"
              placeholder="Имя"
              className={clsx(styles.modal__input, {
                [styles.modal__input__error]: fieldState.error,
              })}
            />
          )}
        />
        <Controller
          control={methods.control}
          name={"user.about"}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="О себе"
              className={styles.modal__textarea}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="user.skills"
          render={({ field }) => (
            <EditUserSkills
              skills={
                field.value.split(",")?.[0].length ? field.value.split(",") : []
              }
              onChange={(skills) => {
                field.onChange(skills.join(","));
              }}
            />
          )}
        />
        <button type="submit" className={styles.modal__submit}>
          Сохранить
        </button>
      </form>
    </Modal>
  );
};

export default EditUserModal;
