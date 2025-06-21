export interface IAvatar {
  uri: string;
  filename: string;
}

export interface IUser {
  name: string;
  about: string;
  skills: string;
  directions: string[];
}

export interface IEditUserForm {
  user: IUser;
  avatar: IAvatar | null;
}
