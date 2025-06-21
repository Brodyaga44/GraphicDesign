import styles from "./EditUserSkills.module.scss";

const EditUserSkills = ({
  skills,
  onChange,
}: {
  skills: string[];
  onChange: (skills: string[]) => void;
}) => {
  console.log(skills);
  return (
    <div className={styles.skillsContainer}>
      {skills.map((skill) => (
        <span key={skill} className={styles.skillTag}>
          {skill}
          <button
            type="button"
            className={styles.removeSkillBtn}
            onClick={() => onChange(skills.filter((s) => s !== skill))}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        className={styles.skillsInput}
        placeholder="Направления (через пробел)"
        onKeyDown={(e) => {
          const input = e.currentTarget;
          if (e.key === " " && input.value.trim()) {
            e.preventDefault();
            if (!skills.includes(input.value.trim())) {
              onChange([...skills, input.value.trim()]);
            }
            input.value = "";
          } else if (
            e.key === "Backspace" &&
            !input.value &&
            skills.length > 0
          ) {
            onChange(skills.slice(0, -1));
          }
        }}
      />
    </div>
  );
};

export default EditUserSkills;
