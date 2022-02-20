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
  release_date: "Release date",
  contains_3d_in_name: "3D in name",
  is_publishing: "Publishing",
  review_score: "Review score",
};
