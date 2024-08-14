import { Day } from "./days";

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  lastLogin: string;
  login: boolean;
  loginDays: Array<Day>;
  previousTasks: Array<LastTasks>;
}

export interface MostPracticedVerbs {
  name: string;
  value: number;
}

export interface LastTasks {
  createdAt: string;
  name: string;
  score: number;
}
