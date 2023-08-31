import { createAction, props } from "@ngrx/store";
import { VerbsList } from "src/app/interface/verbs";

// declaring the actions
export const congjuateThisVerb = createAction(
  '[Whatever] Add new verb',
  props<{ verb: string }>()
)

/**
 * Saves all verbs inside the store in allVerbs.
 */
export const setVerbs = createAction(
  '[VerbPracticeTemplateComponent] sets verbs',
  props<{ allVerbs: VerbsList }>()
)
