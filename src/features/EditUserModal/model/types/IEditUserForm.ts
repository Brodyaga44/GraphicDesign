export interface IAvatar {
  uri: string;
  filename: string;
}

export interface IUser {
  id: number;
  username: string;
  name: string;
  about: string;
  skills: string;
  directions: string[];
}

export interface IEditUserForm {
  user: IUser;
  avatar: File | null;
}
