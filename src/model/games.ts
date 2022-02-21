export type GameID = string;

export type GamesObject = Record<GameID, GameAttributes>;

export type GameAttributes = {
  name: string;
  file_size: string;
  release_date: string;
  contains_3d_in_name: boolean;
  is_publishing: boolean;
  review_score: number;
};

export const GuessMetrics: Record<string, string> = {
  file_size: "File size",
  release_date: "Released",
  contains_3d_in_name: "3D",
  is_publishing: "Publishing",
  review_score: "iOS Score",
};
