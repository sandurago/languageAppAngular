import { createReducer, on } from "@ngrx/store";
import { congjuateThisVerb, setVerbs } from "./verbs.actions";
import { Verbs } from "src/app/Interface/verbs";
export interface VerbState {
  allVerbs: Array<Verbs>,
  verbName: string
}

export const initialState: VerbState = {
  allVerbs: [],
  verbName: ''
};

export const verbsReducer = createReducer(
  // Supply the initial state
  initialState,
  // on method is to react to specific actions
  on(congjuateThisVerb,
    (state, { verb }) => {
        return {
        ...state,
        verbName: verb
      }
    }
  ),
  on(setVerbs,
    (state, { allVerbs }) => ({
      ...state,
      allVerbs: allVerbs
    })
  )
)

