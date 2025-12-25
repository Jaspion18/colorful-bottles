import type { Board, Level, LevelGeneratorParams } from './types';

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
 * Generates a solvable level by creating a mixed configuration
 */
export function generateLevel(params: LevelGeneratorParams): Board {
  const { numColors, numBottles, capacity, emptyBottles, seed } = params;
  
  const random = new SeededRandom(seed);
  
  // Create an array with all color units
  const allColors: string[] = [];
  for (let i = 0; i < numColors; i++) {
    const color = `color${i}`;
    for (let j = 0; j < capacity; j++) {
      allColors.push(color);
    }
  }
  
  // Shuffle the colors
  const shuffledColors = random.shuffle(allColors);
  
  // Create bottles and distribute colors
  const board: Board = [];
  const coloredBottles = numBottles - emptyBottles;
  
  // Fill bottles with shuffled colors
  let colorIndex = 0;
  for (let i = 0; i < coloredBottles; i++) {
    const bottle: string[] = [];
    const bottleSize = Math.min(capacity, shuffledColors.length - colorIndex);
    for (let j = 0; j < bottleSize; j++) {
      bottle.push(shuffledColors[colorIndex++]);
    }
    board.push(bottle);
  }
  
  // Add empty bottles
  for (let i = 0; i < emptyBottles; i++) {
    board.push([]);
  }
  
  return board;
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
