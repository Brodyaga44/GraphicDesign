import type { IAvatar } from "../EditUserModal/model/types/IEditUserForm";

import styles from "./EditUserAvatar.module.scss";

const EditUserAvatar = ({
  avatarData,
  onChange,
}: {
  avatarData: IAvatar | null;
  onChange: (data: IAvatar | null) => void;
}) => {
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          uri: reader.result as string,
          filename: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.photoBlock}>
      {avatarData ? (
        <div className={styles.photoWrapper}>
          <img
            src={avatarData.uri}
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
