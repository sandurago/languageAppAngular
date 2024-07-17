import {createAction, props} from "@ngrx/store";

export const showNotification = createAction(
  '[Summary Dialog], shows notification',
  props<{ message: string }>()
);
