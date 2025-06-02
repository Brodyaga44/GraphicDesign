export interface ILogUser {
  log: string;
  pass: string;
  role?: "admin" | "user" | "artist";
}
