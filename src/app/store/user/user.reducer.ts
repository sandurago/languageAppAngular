import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/Interface/user";
import { saveUser, logout } from "./user.actions";

// Declatred and initalized the state for user with type User.
export const userState: User = {
  id: 0,
  nickname: '',
  name: '',
  password: '',
  created_at: '',
  last_login: '',
  login: false
}

export const userReducer = createReducer(
  // supply the user state
  userState,

  on(saveUser,
    (state, {id, nickname, name, password, created_at, last_login, login}) =>({
      ...state,
      id: id,
      nickname: nickname,
      name: name,
      password: password,
      create_at: created_at,
      last_login: last_login,
      login: login,
    })
  ),
  on(logout,
    (state) => ({
      ...state,
      id: 0,
      nickname: '',
      name: '',
      password: '',
      login: false
    })
    )
);
