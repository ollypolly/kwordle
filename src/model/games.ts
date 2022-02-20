export type GameID = string;

export type GamesObject = Record<GameID, GameAttributes>;

export type GameAttributes = {
  name: string;
  file_size: number;
  release_date: number;
  contains_3d_in_name: boolean;
  is_publishing: boolean;
  review_score: number;
};
