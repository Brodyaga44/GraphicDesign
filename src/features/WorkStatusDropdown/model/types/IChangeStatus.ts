import type { EStatus } from "@/shared/config/enums/EStatus";

export interface IChangeStatus {
  id: number;
  status: EStatus;
}

export interface IChangeStatusResponse {
  id: number;
  userId: number;
  titleName: string;
  about: string;
  status: EStatus;
  category: string;
  price: number;
  style: string;
  images: {
    id: number;
    workId: number;
    filename: string;
  }[];
}
