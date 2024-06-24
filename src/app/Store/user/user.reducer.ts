import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/Interface/user";
import { saveUser, logout } from "./user.actions";

export const userState: User = {
  id: 0,
  username: '',
  name: '',
  password: '',
  createdAt: '',
  lastLogin: '',
  login: false,
  loginDays: [],
}

export const userReducer = createReducer(
  // supply the user state
  userState,

  on(saveUser,
    (state, {id, username, name, password, createdAt, lastLogin, login, loginDays}) =>({
      ...state,
      id: id,
      username: username,
      name: name,
      password: password,
      createdAt: createdAt,
      lastLogin: lastLogin,
      login: login,
      loginDays: loginDays,
    })
  ),
  on(logout,
    (state) => ({
      ...state,
      id: 0,
      username: '',
      name: '',
      password: '',
      login: false,
      createdAt: '',
      lastLogin: '',
      loginDays: [],
    })
    )
);
