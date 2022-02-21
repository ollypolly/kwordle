export type GameID = string;

export type GamesObject = Record<GameID, GameAttributes>;

export type GameAttributes = {
  name: string;
  downloads: number;
  release_date: string;
  contains_3d_in_name: boolean;
  review_score: string;
  icon: string;
};

export const GuessMetrics: Record<string, string> = {
  name: "Game",
  release_date: "Release date",
  contains_3d_in_name: "3D in name",
  is_publishing: "Publishing",
  review_score: "iOS score",
  downloads: "Downloads",
};
