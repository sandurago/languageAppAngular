import { createReducer, on } from "@ngrx/store";
import { congjuateThisVerb, setVerbs } from "./verbs.actions";
import { Verbs } from "src/app/Interface/verbs";
export interface VerbState {
  allVerbs: Array<Verbs>,
  verbName: string,
  id: number | undefined,
}

export const initialState: VerbState = {
  allVerbs: [],
  verbName: '',
  id: undefined,
};

export const verbsReducer = createReducer(
  // Supply the initial state
  initialState,
  // on method is to react to specific actions
  on(congjuateThisVerb,
    (state, { verb }) => {
      const currVerb = state.allVerbs.find((verbObj) => verbObj.name === verb);
      const id = currVerb?.id;
        return {
        ...state,
        verbName: verb,
        id: id,
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

