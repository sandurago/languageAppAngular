import { createReducer, on } from "@ngrx/store";
import { showNotification } from "./notification.actions";
import { Notification } from "src/app/Interface/notificiation";


export const initialState: Notification = {
  message: '',
};

export const notificationReducer = createReducer(
  initialState,

  on(showNotification, (state: Notification, {message}): {message: string} => ({
    ...state,
    message: message,
  }))
);
