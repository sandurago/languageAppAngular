import { Day } from "./days";

export interface User {
  id: number;
  username: string;
  name: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  login: boolean;
  loginDays: Array<Day>;
}