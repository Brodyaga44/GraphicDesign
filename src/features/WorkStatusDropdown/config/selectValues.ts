import {
  EStatus,
  ruStatusMap,
  type TRuStatuses,
} from "@/shared/config/enums/EStatus";

export const statuses: { value: EStatus; label: TRuStatuses }[] = [
  {
    value: EStatus.DONE,
    label: ruStatusMap.DONE,
  },
  {
    value: EStatus.IN_WORK,
    label: ruStatusMap.IN_WORK,
  },
  {
    value: EStatus.CANCEL,
    label: ruStatusMap.CANCEL,
  },
];
