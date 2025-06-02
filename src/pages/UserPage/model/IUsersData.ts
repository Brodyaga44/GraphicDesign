export interface IUsersData {
  id: number;
  username: string;
  name: string;
  role: string;
  photo?: string;
  about?: string;
  orders_id?: number[];
  works_id?: number[];
}
