import type { Level, Board } from '../logic/types';

const CAPACITY = 4;

/**
 * Sample level 1 - Easy
 */
const level1: Board = {
  capacity: CAPACITY,
  bottles: [
    { colors: ['red', 'blue', 'green', 'red'], capacity: CAPACITY },
    { colors: ['blue', 'green', 'red', 'blue'], capacity: CAPACITY },
    { colors: ['green', 'red', 'blue', 'green'], capacity: CAPACITY },
    { colors: [], capacity: CAPACITY },
    { colors: [], capacity: CAPACITY },
  ],
};

/**
 * Sample level 2 - Medium
 */
const level2: Board = {
  capacity: CAPACITY,
  bottles: [
    { colors: ['red', 'red', 'blue', 'blue'], capacity: CAPACITY },
    { colors: ['green', 'green', 'yellow', 'yellow'], capacity: CAPACITY },
    { colors: ['red', 'blue', 'green', 'yellow'], capacity: CAPACITY },
    { colors: ['blue', 'yellow', 'green', 'red'], capacity: CAPACITY },
    { colors: [], capacity: CAPACITY },
  ],
};

/**
 * Sample level 3 - Hard
 */
const level3: Board = {
  capacity: CAPACITY,
  bottles: [
    { colors: ['red', 'blue', 'green', 'yellow'], capacity: CAPACITY },
    { colors: ['yellow', 'purple', 'red', 'blue'], capacity: CAPACITY },
    { colors: ['green', 'yellow', 'purple', 'red'], capacity: CAPACITY },
    { colors: ['blue', 'green', 'yellow', 'purple'], capacity: CAPACITY },
    { colors: ['red', 'blue', 'green', 'purple'], capacity: CAPACITY },
    { colors: [], capacity: CAPACITY },
    { colors: [], capacity: CAPACITY },
  ],
};

export const levels: Level[] = [
  { id: 1, name: 'Easy Start', board: level1 },
  { id: 2, name: 'Medium Mix', board: level2 },
  { id: 3, name: 'Hard Challenge', board: level3 },
];

export const defaultLevel = levels[0];
