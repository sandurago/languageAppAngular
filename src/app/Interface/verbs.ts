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
  id: number;
  name: string;
  translation: string;
  conjugation: {
    [string: string]: string;
  };
  example: string;
}

export interface VerbsList {
  [verbName: string]: Verbs
}
