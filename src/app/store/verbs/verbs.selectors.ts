import { createSelector } from "@ngrx/store";
import { Verbs } from "src/app/Interface/verbs";
import { VerbState } from "./verbs.reducer";

//GETTERS
export const currentVerb = (state: VerbState) => state.verbName;
export const verbsList = (state: VerbState) => state.allVerbs;

export const findVerbToConjugate = createSelector(
  currentVerb,
  verbsList,
  (verbName: string, allVerbs: Array<Verbs>) => {
    //return allVerbs.find((verb: string) => verb === verbName);
    return allVerbs.find((verb) => verb.name === verbName);
  }
)

