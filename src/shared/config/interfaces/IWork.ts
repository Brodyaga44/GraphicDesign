import type { EStatus } from "../enums/EStatus";

export interface IWork {
  id: number;
  userId: number;
  titleName: string;
  about: string;
  images: {
    id: number;
    workId: number;
    fileName: string;
    uri: string;
  }[];
  status: EStatus;
  category: string;
  price: number;
  style: string;
  user: {
    id: number;
    username: string;
    email: string;
    about: string;
    skills: string;
    directions: string[];
    createdAt: string;
    roles: { name: string }[];
    photoFileName: string;
    photoUri: string;
    name: string;
    approved: boolean;
    blocked: boolean;
    orgOidRestriction: string | null;
  };
}
