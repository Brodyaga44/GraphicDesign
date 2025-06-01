export interface IAuthors {
  id: number;
  name: string;
  status: string;
  about: string;
  photo: string;
  rating: number;
  works_id: number[];
  skills: string[];
  response_time: string;
  contact?: string;
  advantages?: string[];
}
