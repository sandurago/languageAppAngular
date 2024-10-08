import { User } from "src/app/Interface/user";

export const id = (state: User) => state.id;
export const username = (state: User) => state.username;
export const name = (state: User) => state.name;
export const email = (state: User) => state.email;
export const password = (state: User) => state.password;
export const login = (state: User) => state.login;
export const createdAt = (state: User) => state.createdAt;
export const lastLogin = (state: User) => state.lastLogin;
export const loginDays = (state: User) => state.loginDays;
export const previousTasks = (state: User) => state.previousTasks;
