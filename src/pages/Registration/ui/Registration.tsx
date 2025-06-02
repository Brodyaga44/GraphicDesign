// Registration.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox, Input } from "antd";

import styles from "./registration.module.scss";

import { themes } from "@/shared/constants/themes.ts";

const Registration = () => {
  const [mode, setMode] = useState<"user" | "team">("user");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    login: "",
    password: "",
    name: "",
    about: "",
    skills: "",
    directions: [] as string[],
    works: [] as File[],
  });

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

  const onWorksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setForm((prev) => ({
      ...prev,
      works: [...prev.works, ...Array.from(e.target.files)],
    }));
  };

  const onClearWorks = () => {
    setForm((prev) => ({ ...prev, works: [] }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "user") {
      console.log("Регистрация пользователя", form);
    } else {
      console.log("Заявка в команду", form);
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
            className={`${styles.tabBtn} ${mode === "user" ? styles.active : ""}`}
            onClick={() => setMode("user")}
            type="button"
          >
            Стать пользователем
          </button>
          <button
            className={`${styles.tabBtn} ${mode === "team" ? styles.active : ""}`}
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
                maxLength={20}
                placeholder="Логин"
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Пароль
              <Input.Password
                size="middle"
                maxLength={20}
                placeholder="Пароль"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className={styles.input}
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

            {mode === "team" && (
              <>
                <label className={styles.label}>
                  Примеры работ (загрузить фото)
                  <input
                    className={styles.fileInput}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onWorksChange}
                  />
                </label>

                {form.works.length > 0 && (
                  <>
                    <div className={styles.preview}>
                      {form.works.map((file, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(file)}
                          alt={`preview-${i}`}
                          className={styles.previewImg}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className={styles.clearBtn}
                      onClick={onClearWorks}
                    >
                      Очистить
                    </button>
                  </>
                )}
              </>
            )}
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

          {/* Кнопка внутри формы для нормальной работы Enter */}
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
