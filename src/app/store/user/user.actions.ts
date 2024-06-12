import { createAction, props } from "@ngrx/store";

export const saveUser = createAction(
  '[LoginPageComponent], Adds user info to the store',
  props<{
    id:number,
    nickname:string,
    name:string,
    password:string,
    created_at: string;
    last_login: string;
    login:boolean,
  }>()
)

export const logout = createAction(
  '[NavbarComponent], Logs user out'
)
