// Core types for the Water Sort Puzzle game
export type Color = string;

export interface Bottle {
  colors: Color[]; // Array of colors from bottom to top
  capacity: number;
}

export interface Board {
  bottles: Bottle[];
  capacity: number;
}

export interface GameState {
  board: Board;
  selectedBottle: number | null;
  history: Board[];
  moves: number;
  isWon: boolean;
}

export interface Level {
  id: number;
  name: string;
  board: Board;
}
