import type { Level, Board } from '../logic/types';
import { generateLevel } from '../logic/generator';

const CAPACITY = 4;

/**
 * Handcrafted levels (1-15): Easy to Medium
 */

// Level 1: Very Easy - 2 colors, lots of empty space
const level1Board: Board = [
  ['red', 'blue', 'red', 'blue'],
  ['blue', 'red', 'blue', 'red'],
  [],
  [],
];

// Level 2: Easy - 3 colors
const level2Board: Board = [
  ['red', 'blue', 'green', 'red'],
  ['blue', 'green', 'red', 'blue'],
  ['green', 'red', 'blue', 'green'],
  [],
  [],
];

// Level 3: Easy - 3 colors, mixed
const level3Board: Board = [
  ['red', 'red', 'blue', 'blue'],
  ['green', 'green', 'red', 'red'],
  ['blue', 'blue', 'green', 'green'],
  [],
];

// Level 4: Medium - 4 colors
const level4Board: Board = [
  ['red', 'blue', 'green', 'yellow'],
  ['yellow', 'red', 'blue', 'green'],
  ['green', 'yellow', 'red', 'blue'],
  ['blue', 'green', 'yellow', 'red'],
  [],
  [],
];

// Level 5: Medium - 4 colors, more complex
const level5Board: Board = [
  ['red', 'red', 'blue', 'blue'],
  ['green', 'green', 'yellow', 'yellow'],
  ['red', 'blue', 'green', 'yellow'],
  ['blue', 'yellow', 'green', 'red'],
  [],
];

// Level 6: Medium - 5 colors
const level6Board: Board = [
  ['red', 'blue', 'green', 'yellow'],
  ['yellow', 'purple', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'red'],
  ['blue', 'green', 'yellow', 'purple'],
  ['red', 'blue', 'green', 'purple'],
  [],
  [],
];

// Level 7: Medium - 5 colors, tricky
const level7Board: Board = [
  ['red', 'green', 'blue', 'yellow'],
  ['purple', 'red', 'green', 'blue'],
  ['yellow', 'purple', 'red', 'green'],
  ['blue', 'yellow', 'purple', 'red'],
  ['green', 'blue', 'yellow', 'purple'],
  [],
];

// Level 8: Hard - 6 colors
const level8Board: Board = [
  ['red', 'blue', 'green', 'yellow'],
  ['purple', 'orange', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'orange'],
  ['red', 'blue', 'green', 'yellow'],
  ['purple', 'orange', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'orange'],
  [],
  [],
];

// Level 9: Hard - 6 colors, solvable
const level9Board: Board = [
  ['red', 'orange', 'blue', 'green'],
  ['yellow', 'purple', 'red', 'orange'],
  ['blue', 'green', 'yellow', 'purple'],
  ['green', 'yellow', 'purple', 'red'],
  ['orange', 'blue', 'green', 'yellow'],
  ['purple', 'red', 'orange', 'blue'],
  [],
];

// Level 10: Hard - 7 colors
const level10Board: Board = [
  ['red', 'blue', 'green', 'yellow'],
  ['purple', 'orange', 'pink', 'red'],
  ['blue', 'green', 'yellow', 'purple'],
  ['orange', 'pink', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'orange'],
  ['pink', 'red', 'blue', 'green'],
  ['yellow', 'purple', 'orange', 'pink'],
  [],
];

// Level 11: Hard - 6 colors, two empty bottles
const level11Board: Board = [
  ['red', 'blue', 'green', 'yellow'],
  ['purple', 'orange', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'orange'],
  ['red', 'blue', 'green', 'yellow'],
  ['purple', 'orange', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'orange'],
  [],
  [],
];

// Level 12: Hard - 6 colors, two empty bottles
const level12Board: Board = [
  ['red', 'orange', 'blue', 'green'],
  ['yellow', 'purple', 'red', 'orange'],
  ['blue', 'green', 'yellow', 'purple'],
  ['red', 'orange', 'blue', 'green'],
  ['yellow', 'purple', 'red', 'orange'],
  ['blue', 'green', 'yellow', 'purple'],
  [],
  [],
];

// Level 13: Hard - 5 colors, minimal empty
const level13Board: Board = [
  ['red', 'blue', 'green', 'yellow'],
  ['purple', 'red', 'blue', 'green'],
  ['yellow', 'purple', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'red'],
  ['blue', 'green', 'yellow', 'purple'],
  [],
];

// Level 14: Hard - 6 colors, solvable
const level14Board: Board = [
  ['red', 'green', 'yellow', 'orange'],
  ['blue', 'purple', 'red', 'green'],
  ['yellow', 'orange', 'blue', 'purple'],
  ['orange', 'red', 'green', 'yellow'],
  ['purple', 'blue', 'orange', 'red'],
  ['green', 'yellow', 'purple', 'blue'],
  [],
];

// Level 15: Hard - 7 colors, complex
const level15Board: Board = [
  ['red', 'blue', 'green', 'yellow'],
  ['purple', 'orange', 'pink', 'red'],
  ['blue', 'green', 'yellow', 'purple'],
  ['orange', 'pink', 'red', 'blue'],
  ['green', 'yellow', 'purple', 'orange'],
  ['pink', 'red', 'blue', 'green'],
  ['yellow', 'purple', 'orange', 'pink'],
  [],
];

/**
 * Generated levels (16-35): Using the level generator
 */
const generatedLevels: Level[] = [];

// Easy generated levels (16-20)
for (let i = 16; i <= 20; i++) {
  generatedLevels.push({
    id: i,
    name: `Level ${i}`,
    difficulty: 'easy',
    board: generateLevel({
      numColors: 3,
      numBottles: 5,
      capacity: CAPACITY,
      emptyBottles: 2,
      seed: 1000 + i,
    }),
    capacity: CAPACITY,
  });
}

// Medium generated levels (21-28)
for (let i = 21; i <= 28; i++) {
  generatedLevels.push({
    id: i,
    name: `Level ${i}`,
    difficulty: 'medium',
    board: generateLevel({
      numColors: 4 + Math.floor((i - 21) / 3),
      numBottles: 6 + Math.floor((i - 21) / 2),
      capacity: CAPACITY,
      emptyBottles: 2,
      seed: 2000 + i,
    }),
    capacity: CAPACITY,
  });
}

// Hard generated levels (29-35)
for (let i = 29; i <= 35; i++) {
  generatedLevels.push({
    id: i,
    name: `Level ${i}`,
    difficulty: 'hard',
    board: generateLevel({
      numColors: 6 + Math.floor((i - 29) / 3),
      numBottles: 8 + Math.floor((i - 29) / 2),
      capacity: CAPACITY,
      emptyBottles: 2,
      seed: 3000 + i,
    }),
    capacity: CAPACITY,
  });
}

/**
 * All levels combined
 */
export const predefinedLevels: Level[] = [
  { id: 1, name: 'Level 1', difficulty: 'easy', board: level1Board, capacity: CAPACITY },
  { id: 2, name: 'Level 2', difficulty: 'easy', board: level2Board, capacity: CAPACITY },
  { id: 3, name: 'Level 3', difficulty: 'easy', board: level3Board, capacity: CAPACITY },
  { id: 4, name: 'Level 4', difficulty: 'medium', board: level4Board, capacity: CAPACITY },
  { id: 5, name: 'Level 5', difficulty: 'medium', board: level5Board, capacity: CAPACITY },
  { id: 6, name: 'Level 6', difficulty: 'medium', board: level6Board, capacity: CAPACITY },
  { id: 7, name: 'Level 7', difficulty: 'medium', board: level7Board, capacity: CAPACITY },
  { id: 8, name: 'Level 8', difficulty: 'hard', board: level8Board, capacity: CAPACITY },
  { id: 9, name: 'Level 9', difficulty: 'hard', board: level9Board, capacity: CAPACITY },
  { id: 10, name: 'Level 10', difficulty: 'hard', board: level10Board, capacity: CAPACITY },
  { id: 11, name: 'Level 11', difficulty: 'hard', board: level11Board, capacity: CAPACITY },
  { id: 12, name: 'Level 12', difficulty: 'hard', board: level12Board, capacity: CAPACITY },
  { id: 13, name: 'Level 13', difficulty: 'hard', board: level13Board, capacity: CAPACITY },
  { id: 14, name: 'Level 14', difficulty: 'hard', board: level14Board, capacity: CAPACITY },
  { id: 15, name: 'Level 15', difficulty: 'hard', board: level15Board, capacity: CAPACITY },
];

export const levels: Level[] = [
  ...predefinedLevels,
  ...generatedLevels,
];

export const defaultLevel = levels[0];

/**
 * Get level by ID
 */
export function getLevelById(id: number): Level | undefined {
  return levels.find(level => level.id === id);
}

/**
 * Get next level
 */
export function getNextLevel(currentId: number): Level | undefined {
  return levels.find(level => level.id === currentId + 1);
}
