export type Guess = {
  name: string;
  created_on: number;
} & Differences;

export type Differences = {
  file_size: NumberGuess;
  release_date: NumberGuess;
  contains_3d_in_name: boolean;
  is_publishing: boolean;
  review_score: NumberGuess;
};

export enum NumberGuess {
  HIGHER = "higher",
  LOWER = "lower",
  EQUAL = "equal",
}
