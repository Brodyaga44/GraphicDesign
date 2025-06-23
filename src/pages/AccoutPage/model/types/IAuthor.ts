import type { EStatus } from "@/shared/config/enums/EStatus";

export interface IAuthor {
  username: string;
  directions: string[];
  createdAt: string;
  roles: { name: string }[];
  name: string;
  id: number;
  email: string;
  about: string;
  skills: string;
  isApproved: boolean;
  isBlocked: boolean;
  photoFileName: string;
  photoUri: string;
  approved: boolean;
  blocked: boolean;
  orgOidRestriction: string;
}
