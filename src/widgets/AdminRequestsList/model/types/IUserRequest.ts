export interface IUserRequest {
  id: number;
  username: string;
  email: string;
  about: string;
  skills: string;
  directions: string[];
  createdAt: string;
  roles: { name: string }[];
  photoFieldName: string;
  photoUri: string | null;
  name: string;
  approved: boolean;
  blocked: boolean;
  orgOidRestriction: string | null;
}
