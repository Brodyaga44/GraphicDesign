import { Controller, useForm } from "react-hook-form";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";

import styles from "./addLogin.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext.ts";
import { ILogUser } from "@/features/AddLoginForm/module/ILogUser.ts";
import { loginSchema } from "@/features/AddLoginForm/module/LoginSchema.ts";
import { CustomButton } from "@/shared";
import { ILogin } from "@/shared/config/interfaces/AddLoginForm/ILogin.ts";
const AddLoginForm = () => {
  const { login } = useAuthContext();
  const { control, handleSubmit } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form
      className={styles.addLogin}
      onSubmit={handleSubmit((data) => {
        console.log(data);
        const temp: ILogUser = {
          log: data.login,
          pass: data.password,
        };
        login?.(temp);
      })}
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
              className={styles.addLogin__input}
            />
            <span className={styles.addLogin__error}>{error?.message}</span>
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
              className={styles.addLogin__input}
            />
            <span className={styles.addLogin__error}>{error?.message}</span>
          </>
        )}
      />
      <CustomButton type={"submit"} typeBtn="primary">
        Вход
      </CustomButton>
    </form>
  );
};

export default AddLoginForm;
