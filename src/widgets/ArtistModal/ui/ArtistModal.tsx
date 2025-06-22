import { Controller, useForm } from "react-hook-form";

import { useCreateWork } from "../libs/hooks/useCreateWork";
import type { ICreateWork } from "../model/types/ICreateWork";

import styles from "./ArtistModal.module.scss";

import { themes } from "@/shared/constants/themes.ts";

type Props = {
  onClose: VoidFunction;
};

export const ArtistModal = ({ onClose }: Props) => {
  const methods = useForm<{ work: ICreateWork; images: File[] }>({
    defaultValues: {
      images: [],
    },
  });

  const { createWork } = useCreateWork(onClose);

  const handleSubmit = (data: { work: ICreateWork; images: File[] }) => {
    createWork(data);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalWindow}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Закрыть"
        >
          ✕
        </button>
        <h2 className={styles.title}>Добавить работу</h2>
        <form
          onSubmit={methods.handleSubmit((data) => handleSubmit(data))}
          className={styles.form}
        >
          <Controller
            control={methods.control}
            name="work.title"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Название"
                className={styles.input}
                required
              />
            )}
          />
          <Controller
            control={methods.control}
            name="work.category"
            rules={{ required: true }}
            render={({ field }) => (
              <select {...field} className={styles.select}>
                <option value="">Выберите тему</option>
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.alias}>
                    {theme.name}
                  </option>
                ))}
              </select>
            )}
          />
          <Controller
            control={methods.control}
            name="work.style"
            render={({ field }) => (
              <input {...field} placeholder="Стиль" className={styles.input} />
            )}
          />
          <Controller
            control={methods.control}
            name="work.price"
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="Цена"
                type="number"
                className={styles.input}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="work.about"
            render={({ field }) => (
              <input
                {...field}
                placeholder="Описание работы"
                className={styles.input}
              />
            )}
          />
          <Controller
            control={methods.control}
            name={"images"}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => field.onChange(e.target.files)}
                className={styles.fileInput}
              />
            )}
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
