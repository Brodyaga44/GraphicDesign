import { Controller, useForm } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";

import styles from "./regform.module.scss";

import { loginSchema } from "@/features/AddLoginForm/module/LoginSchema.ts";
import { CustomButton } from "@/shared";
import { ILogin } from "@/shared/config/interfaces/AddLoginForm/ILogin.ts";
const RegForm = () => {
  const { control, handleSubmit } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });
  return (
    <form
      className={styles.addReg}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Controller
        name="login"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Input
              size="middle"
              maxLength={20}
              placeholder={"Логин"}
              {...field}
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
              size="middle"
              maxLength={20}
              placeholder={"Пароль"}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              {...field}
              className={styles.addReg__input}
            />
            <span className={styles.addReg__error}>{error?.message}</span>
          </>
        )}
      />
      <CustomButton type={"submit"} typeBtn="primary">
        Зарегистрироваться
      </CustomButton>
    </form>
  );
};

export default RegForm;
