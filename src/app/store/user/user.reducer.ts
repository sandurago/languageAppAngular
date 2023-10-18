import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/interface/user";
import { saveUser } from "./user.actions";

// Declatred and initalized the state for user with type User.
export const userState: User = {
  nickname: '',
  name: '',
  password: '',
  login: false
}

export const userReducer = createReducer(
  // supply the user state
  userState,

  on(saveUser,
    (state, {nickname, name, password, login}) =>({
      ...state,
      nickname: nickname,
      name: name,
      password: password,
      login: login
    })
  )
);
