import type { Board, Level, LevelGeneratorParams } from './types';
import { canPour, pour, cloneBoard } from './rules';

/**
 * Simple seeded random number generator (LCG algorithm)
 */
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return this.seed;
  }

  nextInt(min: number, max: number): number {
    return min + (this.next() % (max - min + 1));
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}

/**
 * Generates a solvable level from a solved state by scrambling it
 */
export function generateLevel(params: LevelGeneratorParams): Board {
  const { numColors, numBottles, capacity, emptyBottles, seed } = params;
  
  const random = new SeededRandom(seed);
  
  // Start with a solved state
  const board: Board = [];
  
  // Create full bottles with single colors
  for (let i = 0; i < numColors; i++) {
    const bottle: string[] = [];
    const color = `color${i}`;
    for (let j = 0; j < capacity; j++) {
      bottle.push(color);
    }
    board.push(bottle);
  }
  
  // Add empty bottles
  for (let i = 0; i < emptyBottles; i++) {
    board.push([]);
  }
  
  // Add partially filled bottles if needed
  while (board.length < numBottles) {
    board.push([]);
  }
  
  // Now scramble by making random legal pours
  let currentBoard = cloneBoard(board);
  const minMoves = 20 + numColors * 5; // More colors = more scrambling
  
  for (let i = 0; i < minMoves; i++) {
    // Find all legal moves
    const legalMoves: Array<{ s: number; t: number }> = [];
    
    for (let s = 0; s < currentBoard.length; s++) {
      for (let t = 0; t < currentBoard.length; t++) {
        if (canPour(currentBoard, capacity, s, t)) {
          // Avoid trivial moves (pouring into empty bottles when already sorted)
          if (currentBoard[t].length > 0 || currentBoard[s].length < capacity) {
            legalMoves.push({ s, t });
          }
        }
      }
    }
    
    if (legalMoves.length === 0) break;
    
    // Pick a random legal move
    const moveIndex = random.nextInt(0, legalMoves.length - 1);
    const move = legalMoves[moveIndex];
    
    try {
      const result = pour(currentBoard, capacity, move.s, move.t);
      currentBoard = result.board;
    } catch (e) {
      // Skip invalid moves
    }
  }
  
  return currentBoard;
}

/**
 * Creates a simple level manually (for testing or specific designs)
 */
export function createLevel(id: number, name: string, difficulty: 'easy' | 'medium' | 'hard', board: Board, capacity: number): Level {
  return {
    id,
    name,
    difficulty,
    board,
    capacity,
  };
}
