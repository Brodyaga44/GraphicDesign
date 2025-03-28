import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./searchinput.module.scss";

const themes = [
  { name: "3д Модели", alias: "3d-models" },
  { name: "Графические рисунки", alias: "graphic-design" },
  { name: "Логотипы", alias: "logos" },
  { name: "Дизайн сайта", alias: "web-design" },
  { name: "Дизайн интерьера", alias: "interior-design" },
  { name: "Анимации", alias: "animations" },
  { name: "Дизайн печатной продукции", alias: "print-design" },
];

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof themes>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  useEffect(() => {
    const results = themes.filter((theme) =>
      theme.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleItemClick = (alias: string) => {
    navigate(`/category/${alias}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleInputClick = () => {
    setIsOpen(true);
    if (searchTerm === "") {
      setSearchResults(themes);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Поиск интересующей темы"
        value={searchTerm}
        onChange={handleChange}
        onClick={handleInputClick}
        onBlur={handleBlur}
        className={styles.search__input}
      />
      {isOpen && searchResults.length > 0 && (
        <ul className={styles.search__list}>
          {searchResults.map((item) => (
            <li
              key={item.alias}
              onClick={() => handleItemClick(item.alias)}
              className={styles.search__item}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
