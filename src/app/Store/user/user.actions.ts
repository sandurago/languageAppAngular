import { createAction, props } from "@ngrx/store";
import { User } from "src/app/Interface/user";

export const saveUser = createAction(
  '[LoginPageComponent], Adds user info to the store',
  props<User>()
)

export const logout = createAction(
  '[NavbarComponent], Logs user out'
)
