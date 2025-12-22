import type { Level, Board } from '../logic/types';

const CAPACITY = 4;

/**
 * Sample level 1 - Easy
 */
const level1: Board = {
  capacity: CAPACITY,
  bottles: [
    { colors: ['red', 'red', 'red', 'red'], capacity: CAPACITY },
    { colors: ['blue', 'blue', 'blue', 'blue'], capacity: CAPACITY },
    { colors: ['green', 'green', 'green', 'green'], capacity: CAPACITY },
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
    { colors: ['yellow', 'red', 'blue', 'green'], capacity: CAPACITY },
    { colors: ['green', 'yellow', 'red', 'blue'], capacity: CAPACITY },
    { colors: ['blue', 'green', 'yellow', 'red'], capacity: CAPACITY },
    { colors: ['red', 'blue', 'green', 'yellow'], capacity: CAPACITY },
    { colors: ['yellow', 'green', 'blue', 'red'], capacity: CAPACITY },
    { colors: ['red', 'yellow', 'green', 'blue'], capacity: CAPACITY },
    { colors: [], capacity: CAPACITY },
    { colors: [], capacity: CAPACITY },
  ],
};

/**
 * Sample level 3 - Hard
 */
const level3: Board = {
  capacity: CAPACITY,
  bottles: [
    { colors: ['purple', 'orange', 'pink', 'cyan'], capacity: CAPACITY },
    { colors: ['cyan', 'purple', 'orange', 'pink'], capacity: CAPACITY },
    { colors: ['pink', 'cyan', 'purple', 'orange'], capacity: CAPACITY },
    { colors: ['orange', 'pink', 'cyan', 'purple'], capacity: CAPACITY },
    { colors: ['purple', 'orange', 'pink', 'cyan'], capacity: CAPACITY },
    { colors: ['cyan', 'purple', 'orange', 'pink'], capacity: CAPACITY },
    { colors: ['pink', 'cyan', 'purple', 'orange'], capacity: CAPACITY },
    { colors: ['orange', 'pink', 'cyan', 'purple'], capacity: CAPACITY },
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
