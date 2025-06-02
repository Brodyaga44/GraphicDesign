import { useState } from "react";

type Status = "В работе" | "Готово" | "Отменен";

type Props = {
  workId: number;
  currentStatus: Status;
};

const statuses: Status[] = ["В работе", "Готово", "Отменен"];

const WorkStatusDropdown = ({ workId, currentStatus }: Props) => {
  const [status, setStatus] = useState(currentStatus);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    setStatus(newStatus);
    console.log(`Статус работы ${workId} изменён на ${newStatus}`);
    // Тут можно добавить отправку на сервер, обновление состояния и т.п.
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="rounded border p-1 text-sm"
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
};

export default WorkStatusDropdown;
