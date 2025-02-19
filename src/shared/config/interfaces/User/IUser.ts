export interface IUser {
  id: number;
  nick: string;
  notification: number;
  posts: number;
  followersCount: number; //budet enum
  followingCount: number;
  name: string;
  category: string; // i eto enum budet
  about: string;
  links: string[];
}
