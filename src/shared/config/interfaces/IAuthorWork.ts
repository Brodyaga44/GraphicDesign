import type { IWork } from "./IWork";

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
  works: IWork[];
}
