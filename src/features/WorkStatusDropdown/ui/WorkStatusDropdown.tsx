import { useState } from "react";

import { statuses } from "../config/selectValues";
import { useChangeStatus } from "../libs/hooks/useChangeStatus";

import type { EStatus } from "@/shared/config/enums/EStatus";

type Props = {
  workId: number;
  currentStatus: EStatus;
};

const WorkStatusDropdown = ({ workId, currentStatus }: Props) => {
  const [status, setStatus] = useState<EStatus>(currentStatus);
  const { changeStatus } = useChangeStatus();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as EStatus;
    setStatus(newStatus);
    changeStatus({ id: workId, status: newStatus });
  };

  return (
    <select
      value={status}
      onChange={handleChange}
      className="rounded border p-1 text-sm"
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  );
};

export default WorkStatusDropdown;
