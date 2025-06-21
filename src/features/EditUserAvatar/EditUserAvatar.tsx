import { useEffect, useState } from "react";

import styles from "./EditUserAvatar.module.scss";

const EditUserAvatar = ({
  avatarData,
  onChange,
}: {
  avatarData: File | null;
  onChange: (data: File | null) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  // useEffect(() => {
  //   if (avatarData) {
  //     const objectUrl = URL.createObjectURL(avatarData);
  //     setPreview(objectUrl);

  //     return () => URL.revokeObjectURL(objectUrl);
  //   }
  //   setPreview(null);
  // }, [avatarData]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file, file.name);
      console.log(file);
      onChange(formData);
    }
  };

  return (
    <div className={styles.photoBlock}>
      {preview ? (
        <div className={styles.photoWrapper}>
          <img
            src={preview}
            alt="Превью фото"
            className={styles.photoPreview}
          />
          <button
            type="button"
            className={styles.removePhotoBtn}
            onClick={() => onChange(null)}
            aria-label="Удалить фото"
          >
            &times;
          </button>
        </div>
      ) : (
        <div className={styles.photoPlaceholder}>Фото отсутствует</div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className={styles.fileInput}
      />
    </div>
  );
};

export default EditUserAvatar;
