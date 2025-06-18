export enum Roles {
  USER = "USER",
  ADMIN = "ADMIN",
  AUTHOR = "AUTHOR",
}
export interface IRoles {
  name: Roles;
}
export interface ILoginOutput {
  id: number;
  username: string;
  email: string;
  about: string;
  skills: string;
  directions: string[];
  createdAt: string;
  token: string;
  roles: IRoles[];
  approved: boolean;
  blocked: boolean;
}

export interface IUserData extends ILoginOutput {
  photoFileName: string;
  photoUri: string;
  name: string;
  approved: boolean;
  blocked: boolean;
  orgOidRestriction: string;
}
