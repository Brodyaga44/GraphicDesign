import type { EStatus } from "@/shared/config/enums/EStatus";

export interface ICreateWork {
  title: string;
  about: string;
  category: string;
  price: number;
  style: string;
}

export interface ICreatedWork {
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
    fileName: string;
  }[];
}
