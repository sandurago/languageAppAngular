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

export interface UserLoginPayload {
  username:string;
  password:string;
}

export interface UserPayload extends UserLoginPayload {
  name:string;
  email:string;
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
