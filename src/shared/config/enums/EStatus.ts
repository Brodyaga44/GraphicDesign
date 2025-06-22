export type TRuStatuses = "Готов" | "В работе" | "Отменен";

export enum EStatus {
  DONE = "DONE",
  IN_WORK = "IN_WORK",
  CANCEL = "CANCEL",
}

export const ruStatusMap: Record<EStatus, TRuStatuses> = {
  [EStatus.DONE]: "Готов",
  [EStatus.IN_WORK]: "В работе",
  [EStatus.CANCEL]: "Отменен",
};
