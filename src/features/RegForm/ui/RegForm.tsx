import { Controller, useForm } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, message } from "antd";

import styles from "./regform.module.scss";

import { loginSchema } from "@/features/AddLoginForm/module/LoginSchema.ts";
import { CustomButton } from "@/shared";
import { $api } from "@/shared/config/api/api.ts"; // твой axios-инстанс
import { ILogin } from "@/shared/config/interfaces/AddLoginForm/ILogin.ts";

const RegForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILogin) => {
    try {
      await $api.post("/auth/register", {
        username: data.login,
        password: data.password,
        name: data.login,
        email: `${data.login}@example.com`, // временно, если нет email в форме
        about: "",
        skills: "",
        directions: [],
        role: "user",
      });

      message.success("Успешная регистрация!");
      reset();
    } catch (error) {
      console.error("Ошибка при регистрации", error);
      message.error("Ошибка при регистрации");
    }
  };

  return (
    <form className={styles.addReg} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="login"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              {...field}
              size="middle"
              maxLength={20}
              placeholder="Логин"
              autoComplete="username"
              className={styles.addReg__input}
            />
            <span className={styles.addReg__error}>{error?.message}</span>
          </>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input.Password
              {...field}
              size="middle"
              maxLength={20}
              placeholder="Пароль"
              autoComplete="new-password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className={styles.addReg__input}
            />
            <span className={styles.addReg__error}>{error?.message}</span>
          </>
        )}
      />

      <CustomButton type="submit" typeBtn="primary">
        Зарегистрироваться
      </CustomButton>
    </form>
  );
};

export default RegForm;
