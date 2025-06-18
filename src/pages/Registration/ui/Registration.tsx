import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox, Input } from "antd";

import styles from "./registration.module.scss";

import useRegistration from "@/pages/Registration/libs/hooks/useRegistration.ts";
import { themes } from "@/shared/constants/themes.ts";

const Registration = () => {
  const [mode, setMode] = useState<"user" | "team">("user");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    about: "",
    skills: "",
    directions: [] as string[],
  });

  const { regReq } = useRegistration();

  const onLogo = () => {
    navigate("/");
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onDirectionsChange = (checkedValues: string[]) => {
    setForm((prev) => ({ ...prev, directions: checkedValues }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      role: mode === "user" ? "USER" : "AUTHOR",
    };

    try {
      await regReq(payload);
      navigate("/login");
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.logo} onClick={onLogo}>
        Graphico
      </span>

      <div
        className={`${styles.card} ${mode === "team" ? styles.cardWide : ""}`}
      >
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${
              mode === "user" ? styles.active : ""
            }`}
            onClick={() => setMode("user")}
            type="button"
          >
            Стать пользователем
          </button>
          <button
            className={`${styles.tabBtn} ${
              mode === "team" ? styles.active : ""
            }`}
            onClick={() => setMode("team")}
            type="button"
          >
            Стать частью команды
          </button>
        </div>

        <form onSubmit={onSubmit} className={styles.formWrapper}>
          <div className={styles.mainForm}>
            <label className={styles.label}>
              Логин
              <Input
                size="middle"
                name="username"
                maxLength={20}
                placeholder="Логин"
                className={styles.input}
                value={form.username}
                onChange={onChange}
              />
            </label>

            <label className={styles.label}>
              Пароль
              <Input.Password
                size="middle"
                name="password"
                maxLength={20}
                placeholder="Пароль"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className={styles.input}
                value={form.password}
                onChange={onChange}
              />
            </label>

            <label className={styles.label}>
              Email
              <Input
                size="middle"
                name="email"
                type="email"
                maxLength={40}
                placeholder="Email"
                className={styles.input}
                value={form.email}
                onChange={onChange}
              />
            </label>

            <label className={styles.label}>
              Имя
              <input
                className={styles.input}
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                required
                placeholder="Ваше имя"
              />
            </label>

            <label className={styles.label}>
              О себе
              <textarea
                className={styles.textarea}
                name="about"
                value={form.about}
                onChange={onChange}
                rows={4}
                placeholder="Расскажите о себе"
              />
            </label>
          </div>

          {mode === "team" && (
            <aside className={styles.sideForm}>
              <label className={styles.label}>
                Навыки
                <input
                  className={styles.input}
                  type="text"
                  name="skills"
                  value={form.skills}
                  onChange={onChange}
                  placeholder="Опишите свои навыки"
                />
              </label>

              <div className={styles.directionsBlock}>
                <span className={styles.label}>Рабочее направление</span>
                <Checkbox.Group
                  options={themes.map(({ name, alias }) => ({
                    label: name,
                    value: alias,
                  }))}
                  value={form.directions}
                  onChange={onDirectionsChange}
                  className={styles.checkboxGroup}
                />
              </div>
            </aside>
          )}

          <div className={styles.buttonsWrapper}>
            <button className={styles.submitBtn} type="submit">
              {mode === "user" ? "Зарегистрироваться" : "Подать заявку"}
            </button>
          </div>
        </form>

        <Link to="/login" className={styles.backLink}>
          У меня уже есть аккаунт
        </Link>
      </div>
    </div>
  );
};

export default Registration;
