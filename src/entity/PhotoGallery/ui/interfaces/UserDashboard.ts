import { IPhoto } from "@/entity/PhotoGallery/ui/interfaces/IPhoto.ts";

export interface UserDashboard<T> extends IPhoto {
  user_id: number;
  results: T;
  //почти, но не то :(
}
