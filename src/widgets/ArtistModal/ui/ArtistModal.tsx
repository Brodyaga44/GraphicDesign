import { useState } from "react";

import styles from "./ArtistModal.module.scss";

import { themes } from "@/shared/constants/themes.ts";

type Props = {
  onClose: () => void;
};

export const ArtistModal = ({ onClose }: Props) => {
  const [form, setForm] = useState({
    title: "",
    theme: "",
    style: "",
    price: "",
    images: [] as File[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setForm({ ...form, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", form);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWindow}>
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Закрыть"
        >
          ✕
        </button>
        <h2 className={styles.title}>Добавить работу</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название"
            className={styles.input}
            required
          />

          <select
            name="theme"
            value={form.theme}
            onChange={handleChange}
            className={styles.select}
            required
          >
            <option value="">Выберите тему</option>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>

          <input
            name="style"
            value={form.style}
            onChange={handleChange}
            placeholder="Стиль"
            className={styles.input}
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Цена"
            type="number"
            className={styles.input}
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className={styles.fileInput}
          />

          <button type="submit" className={styles.button}>
            Добавить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtistModal;
