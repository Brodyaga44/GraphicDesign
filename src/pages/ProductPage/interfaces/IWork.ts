import type { EStatus } from "@/shared/config/enums/EStatus";

export interface IWork {
  id: number;
  userId: number;
  titleName: string;
  about: string;
  images: {
    id: number;
    workId: number;
    filename: string;
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
    skills: string;
    directions: string[];
    createdAt: string;
    roles: { name: string }[];
    photoFieldName: string;
    photoUri: string | null;
    name: string;
    approved: boolean;
    blocked: false;
    orgOidRestriction: unknown;
  };
}
