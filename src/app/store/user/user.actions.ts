import { createAction, props } from "@ngrx/store";

export const saveUser = createAction(
  '[LoginPageComponent], Adds user info to the store',
  props<{
    nickname:string,
    name:string,
    password:string,
    login:boolean
  }>()
)

export const logout = createAction(
  '[NavbarComponent], Logs user out'
)
