import { createReducer, on } from "@ngrx/store";
import { changeGradient } from "./colors.actions";

export interface Color {
  gradient:number;
}

export const colorState: Color = {
  gradient: 50
}

export const colorReducer = createReducer(
  // supply the color state
  colorState,

  on(changeGradient, (state) => ({

    ...state,
    gradient: Math.floor(Math.random() * 40 + 20)
  })
  )
)
