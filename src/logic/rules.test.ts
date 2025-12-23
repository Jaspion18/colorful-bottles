import { describe, it, expect } from 'vitest';
import {
  getTopColor,
  countTopColors,
  canPour,
  pour,
  isBottleComplete,
  isWinning,
  cloneBoard,
} from './rules';
import type { Bottle, Board } from './types';

describe('rules', () => {
  describe('getTopColor', () => {
    it('should return null for empty bottle', () => {
      const bottle: Bottle = { colors: [], capacity: 4 };
      expect(getTopColor(bottle)).toBeNull();
    });

    it('should return the top color', () => {
      const bottle: Bottle = { colors: ['red', 'blue', 'green'], capacity: 4 };
      expect(getTopColor(bottle)).toBe('green');
    });
  });

  describe('countTopColors', () => {
    it('should return 0 for empty bottle', () => {
      const bottle: Bottle = { colors: [], capacity: 4 };
      expect(countTopColors(bottle)).toBe(0);
    });

    it('should count consecutive colors from top', () => {
      const bottle: Bottle = { colors: ['red', 'blue', 'blue', 'blue'], capacity: 4 };
      expect(countTopColors(bottle)).toBe(3);
    });

    it('should count all colors if all same', () => {
      const bottle: Bottle = { colors: ['red', 'red', 'red', 'red'], capacity: 4 };
      expect(countTopColors(bottle)).toBe(4);
    });
  });

  describe('canPour', () => {
    it('should return false when source is empty', () => {
      const source: Bottle = { colors: [], capacity: 4 };
      const target: Bottle = { colors: [], capacity: 4 };
      expect(canPour(source, target)).toBe(false);
    });

    it('should return false when target is full', () => {
      const source: Bottle = { colors: ['red'], capacity: 4 };
      const target: Bottle = { colors: ['blue', 'blue', 'blue', 'blue'], capacity: 4 };
      expect(canPour(source, target)).toBe(false);
    });

    it('should return true when target is empty', () => {
      const source: Bottle = { colors: ['red'], capacity: 4 };
      const target: Bottle = { colors: [], capacity: 4 };
      expect(canPour(source, target)).toBe(true);
    });

    it('should return true when top colors match', () => {
      const source: Bottle = { colors: ['red', 'blue'], capacity: 4 };
      const target: Bottle = { colors: ['red', 'blue'], capacity: 4 };
      expect(canPour(source, target)).toBe(true);
    });

    it('should return false when top colors do not match', () => {
      const source: Bottle = { colors: ['red', 'blue'], capacity: 4 };
      const target: Bottle = { colors: ['red', 'green'], capacity: 4 };
      expect(canPour(source, target)).toBe(false);
    });
  });

  describe('pour', () => {
    it('should return null for invalid pour', () => {
      const source: Bottle = { colors: ['red'], capacity: 4 };
      const target: Bottle = { colors: ['blue'], capacity: 4 };
      expect(pour(source, target)).toBeNull();
    });

    it('should pour single color to empty bottle', () => {
      const source: Bottle = { colors: ['red', 'blue'], capacity: 4 };
      const target: Bottle = { colors: [], capacity: 4 };
      const result = pour(source, target);
      
      expect(result).not.toBeNull();
      expect(result!.source.colors).toEqual(['red']);
      expect(result!.target.colors).toEqual(['blue']);
    });

    it('should pour multiple matching colors', () => {
      const source: Bottle = { colors: ['red', 'blue', 'blue'], capacity: 4 };
      const target: Bottle = { colors: ['blue'], capacity: 4 };
      const result = pour(source, target);
      
      expect(result).not.toBeNull();
      expect(result!.source.colors).toEqual(['red']);
      expect(result!.target.colors).toEqual(['blue', 'blue', 'blue']);
    });

    it('should respect target capacity', () => {
      const source: Bottle = { colors: ['blue', 'blue', 'blue'], capacity: 4 };
      const target: Bottle = { colors: ['blue', 'blue'], capacity: 4 };
      const result = pour(source, target);
      
      expect(result).not.toBeNull();
      expect(result!.source.colors).toEqual(['blue']);
      expect(result!.target.colors).toEqual(['blue', 'blue', 'blue', 'blue']);
    });
  });

  describe('isBottleComplete', () => {
    it('should return true for empty bottle', () => {
      const bottle: Bottle = { colors: [], capacity: 4 };
      expect(isBottleComplete(bottle)).toBe(true);
    });

    it('should return false for incomplete bottle', () => {
      const bottle: Bottle = { colors: ['red', 'red', 'red'], capacity: 4 };
      expect(isBottleComplete(bottle)).toBe(false);
    });

    it('should return false for full bottle with mixed colors', () => {
      const bottle: Bottle = { colors: ['red', 'blue', 'red', 'red'], capacity: 4 };
      expect(isBottleComplete(bottle)).toBe(false);
    });

    it('should return true for full bottle with same color', () => {
      const bottle: Bottle = { colors: ['red', 'red', 'red', 'red'], capacity: 4 };
      expect(isBottleComplete(bottle)).toBe(true);
    });
  });

  describe('isWinning', () => {
    it('should return true when all bottles are complete', () => {
      const board: Board = {
        capacity: 4,
        bottles: [
          { colors: ['red', 'red', 'red', 'red'], capacity: 4 },
          { colors: ['blue', 'blue', 'blue', 'blue'], capacity: 4 },
          { colors: [], capacity: 4 },
        ],
      };
      expect(isWinning(board)).toBe(true);
    });

    it('should return false when bottles are incomplete', () => {
      const board: Board = {
        capacity: 4,
        bottles: [
          { colors: ['red', 'blue', 'red', 'red'], capacity: 4 },
          { colors: ['blue', 'blue', 'blue'], capacity: 4 },
          { colors: [], capacity: 4 },
        ],
      };
      expect(isWinning(board)).toBe(false);
    });
  });

  describe('cloneBoard', () => {
    it('should create a deep copy of the board', () => {
      const board: Board = {
        capacity: 4,
        bottles: [
          { colors: ['red', 'blue'], capacity: 4 },
          { colors: ['green'], capacity: 4 },
        ],
      };
      
      const cloned = cloneBoard(board);
      
      // Modify the cloned board
      cloned.bottles[0].colors.push('yellow');
      
      // Original should remain unchanged
      expect(board.bottles[0].colors).toEqual(['red', 'blue']);
      expect(cloned.bottles[0].colors).toEqual(['red', 'blue', 'yellow']);
    });
  });
});
