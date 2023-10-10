import { createReducer, on } from "@ngrx/store";
import { congjuateThisVerb, setVerbs } from "./verbs.actions";
import { Verbs } from "src/app/interface/verbs";

//reducers is what handles modifying the state in response to the actions being dispatched

//STATE
// state is an object with properties and by having an interface we define what are these properties
export interface VerbState {
  allVerbs: Array<Verbs>,
  verbName: string
}

// here we define an initial state (what the interface refers to)
export const initialState: VerbState = {
  allVerbs: [],
  verbName: ''
};

//SETTERS
// after defined state we create reducer
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

