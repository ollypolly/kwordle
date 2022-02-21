export type Guess = {
  name: string;
  created_on: number;
} & Differences;

export type Differences = {
  downloads: NumberGuess;
  release_date: NumberGuess;
  contains_3d_in_name: boolean;
  alphabetical: NumberGuess;
  review_score: NumberGuess;
};

export enum NumberGuess {
  HIGHER = "higher",
  LOWER = "lower",
  EQUAL = "equal",
}
