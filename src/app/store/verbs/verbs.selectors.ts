import { createSelector } from "@ngrx/store";
import { VerbsList } from "src/app/interface/verbs";
import { VerbState } from "./verbs.reducer";

//GETTERS
export const currentVerb = (state: VerbState) => state.verbName;
export const verbsList = (state: VerbState) => state.allVerbs;

export const findVerbToConjugate = createSelector(
  currentVerb,
  verbsList,
  (verbName: string, allVerbs: VerbsList) => {
    // return allVerbs.find((verb: string) => verb === verbName);
    return allVerbs[verbName];
  }
)

