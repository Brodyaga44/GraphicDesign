import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";

import styles from "./addLogin.module.scss";

import useAuthContext from "@/app/module/hooks/useAuthContext";
import { ILogUser } from "@/features/AddLoginForm/module/ILogUser";
import { loginSchema } from "@/features/AddLoginForm/module/LoginSchema";
import { ILogin } from "@/shared/config/interfaces/AddLoginForm/ILogin";

const AddLoginForm = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(async (data) => {
        const temp: ILogUser = {
          log: data.login,
          pass: data.password,
        };
        await login?.(temp);
        navigate("/");
      })}
    >
      <div className={styles.field}>
        <Controller
          name="login"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                size="middle"
                maxLength={20}
                placeholder="Логин"
                {...field}
                className={styles.input}
              />
              {error && <span className={styles.error}>{error.message}</span>}
            </>
          )}
        />
      </div>

      <div className={styles.field}>
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input.Password
                size="middle"
                maxLength={20}
                placeholder="Пароль"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                {...field}
                className={styles.input}
              />
              {error && <span className={styles.error}>{error.message}</span>}
            </>
          )}
        />
      </div>

      <button type="submit" className={styles.submit}>
        Вход
      </button>
    </form>
  );
};

export default AddLoginForm;
