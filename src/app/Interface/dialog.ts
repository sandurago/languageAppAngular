import { Verbs } from "./verbs";

export interface UserAnswers {
  [key: string]: string;
}

export interface DialogData {
  person:string,
  conjugation:string
}

export interface SummaryDialogData {
  answers: UserAnswers;
  userScoreSummary: any;
  verbObject: Verbs;
}
