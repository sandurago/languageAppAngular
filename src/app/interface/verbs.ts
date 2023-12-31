export interface VerbsCong {
  je?: string;
  "j’"?: string;
  tu: string;
  "il/elle": string;
  nous: string;
  vous: string;
  "ils/elles": string;
}

export interface Verbs {
  conjugation: {
    [string: string]: string;
  };
  translation: string;
  example: string;
  name: string;
  id: number;
}

export interface VerbsList {
  [verbName: string]: Verbs
}
