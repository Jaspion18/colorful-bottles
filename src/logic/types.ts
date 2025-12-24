// Core types for the Water Sort Puzzle game

// ColorId is a string identifier for a color
export type ColorId = string;

// Bottle is an array of layer color IDs; last element is TOP
export type Bottle = ColorId[];

// Board is an array of bottles
export type Board = Bottle[];

// MoveRecord captures details of a single pour operation
export interface MoveRecord {
  s: number; // source bottle index
  t: number; // target bottle index
  moved: ColorId; // the color that was moved
  count: number; // how many layers were moved
}

// GameState for UI state management
export interface GameState {
  board: Board;
  capacity: number;
  selectedBottle: number | null;
  history: MoveRecord[];
  moves: number;
  isWon: boolean;
  currentLevel: number;
  unlockedLevels: number[];
}

// Settings for accessibility and preferences
export interface Settings {
  colorBlindMode: boolean;
  reducedMotion: boolean;
  soundEnabled: boolean;
}

// Level definition
export interface Level {
  id: number;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  board: Board;
  capacity: number;
}

// Level generator parameters
export interface LevelGeneratorParams {
  numColors: number;
  numBottles: number;
  capacity: number;
  emptyBottles: number;
  seed: number;
}
