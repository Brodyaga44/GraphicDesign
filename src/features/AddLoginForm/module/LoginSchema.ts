import * as yup from "yup";
export const loginSchema = yup.object().shape({
  login: yup.string().required("Введите логин!"),
  password: yup
    .string()
    .min(8, "Минимальное количество символов 8")
    .max(32, "Допустимое количество символов 32")
    .required("Пароль обязателен"),
});
