import { createAction, props } from "@ngrx/store";

export const saveUser = createAction(
  '[LoginPageComponent], Adds user info to the store',
  props<{
    id:number,
    username:string,
    name:string,
    password:string,
    createdAt: string;
    lastLogin: string;
    login:boolean,
  }>()
)

export const logout = createAction(
  '[NavbarComponent], Logs user out'
)
