import type { EStatus } from "@/shared/config/enums/EStatus";

export interface IUser {
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
}

export interface IAuthorWork {
  user: IUser;
  works: {
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
    user: IUser;
  }[];
}
