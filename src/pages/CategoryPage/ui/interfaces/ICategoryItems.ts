import { IUserData } from "@/shared/config/api/ILoginOutput.ts";

export interface ICategoryData {
  id: number;
  userId: number;
  titleName: string;
  about: string;
  images: string[];
  status: string;
  category: string;
  price: number;
  style: string;
  user: IUserData;
}
