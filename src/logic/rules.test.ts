import { describe, it, expect } from 'vitest';
import {
  getTopColor,
  countTopColors,
  canPour,
  pour,
  undo,
  isBottleComplete,
  isSolved,
  getLegalMoves,
  countColors,
  validateInvariants,
  cloneBoard,
} from './rules';
import type { Bottle, Board } from './types';

describe('Water Sort Puzzle Logic', () => {
  const CAPACITY = 4;

  describe('getTopColor', () => {
    it('should return null for empty bottle', () => {
      const bottle: Bottle = [];
      expect(getTopColor(bottle)).toBeNull();
    });

    it('should return the top color', () => {
      const bottle: Bottle = ['red', 'blue', 'green'];
      expect(getTopColor(bottle)).toBe('green');
    });
  });

  describe('countTopColors', () => {
    it('should return 0 for empty bottle', () => {
      const bottle: Bottle = [];
      expect(countTopColors(bottle)).toBe(0);
    });

    it('should count consecutive colors from top', () => {
      const bottle: Bottle = ['red', 'blue', 'blue', 'blue'];
      expect(countTopColors(bottle)).toBe(3);
    });

    it('should count all colors if all same', () => {
      const bottle: Bottle = ['red', 'red', 'red', 'red'];
      expect(countTopColors(bottle)).toBe(4);
    });
  });

  describe('canPour', () => {
    it('should return false when source is empty', () => {
      const board: Board = [[], []];
      expect(canPour(board, CAPACITY, 0, 1)).toBe(false);
    });

    it('should return false when target is full', () => {
      const board: Board = [['red'], ['blue', 'blue', 'blue', 'blue']];
      expect(canPour(board, CAPACITY, 0, 1)).toBe(false);
    });

    it('should return true when pouring into empty bottle', () => {
      const board: Board = [['red'], []];
      expect(canPour(board, CAPACITY, 0, 1)).toBe(true);
    });

    it('should return true when top colors match', () => {
      const board: Board = [['red', 'blue'], ['red', 'blue']];
      expect(canPour(board, CAPACITY, 0, 1)).toBe(true);
    });

    it('should return false when top colors do not match', () => {
      const board: Board = [['red', 'blue'], ['red', 'green']];
      expect(canPour(board, CAPACITY, 0, 1)).toBe(false);
    });

    it('should return false when source equals target', () => {
      const board: Board = [['red'], ['blue']];
      expect(canPour(board, CAPACITY, 0, 0)).toBe(false);
    });
  });

  describe('pour', () => {
    it('should throw error for invalid pour', () => {
      const board: Board = [['red'], ['blue']];
      expect(() => pour(board, CAPACITY, 0, 1)).toThrow('Invalid pour operation');
    });

    it('should pour single color to empty bottle', () => {
      const board: Board = [['red', 'blue'], []];
      const result = pour(board, CAPACITY, 0, 1);
      
      expect(result.board[0]).toEqual(['red']);
      expect(result.board[1]).toEqual(['blue']);
      expect(result.move).toEqual({ s: 0, t: 1, moved: 'blue', count: 1 });
    });

    it('should pour multiple matching colors', () => {
      const board: Board = [['red', 'blue', 'blue'], ['blue']];
      const result = pour(board, CAPACITY, 0, 1);
      
      expect(result.board[0]).toEqual(['red']);
      expect(result.board[1]).toEqual(['blue', 'blue', 'blue']);
      expect(result.move.count).toBe(2);
    });

    it('should respect target capacity when pouring block', () => {
      const board: Board = [['blue', 'blue', 'blue'], ['blue', 'blue']];
      const result = pour(board, CAPACITY, 0, 1);
      
      expect(result.board[0]).toEqual(['blue']);
      expect(result.board[1]).toEqual(['blue', 'blue', 'blue', 'blue']);
      expect(result.move.count).toBe(2);
    });

    it('should not modify original board', () => {
      const board: Board = [['red', 'blue'], []];
      const originalBoard = cloneBoard(board);
      pour(board, CAPACITY, 0, 1);
      
      expect(board).toEqual(originalBoard);
    });
  });

  describe('undo', () => {
    it('should restore exact board state after pour', () => {
      const board: Board = [['red', 'blue', 'blue'], ['blue']];
      const originalBoard = cloneBoard(board);
      
      const { board: newBoard, move } = pour(board, CAPACITY, 0, 1);
      const restoredBoard = undo(newBoard, move);
      
      expect(restoredBoard).toEqual(originalBoard);
    });

    it('should correctly undo multi-layer pour', () => {
      const board: Board = [['red', 'green', 'green', 'green'], ['green']];
      const originalBoard = cloneBoard(board);
      
      const { board: newBoard, move } = pour(board, CAPACITY, 0, 1);
      const restoredBoard = undo(newBoard, move);
      
      expect(restoredBoard).toEqual(originalBoard);
    });
  });

  describe('isBottleComplete', () => {
    it('should return true for empty bottle', () => {
      const bottle: Bottle = [];
      expect(isBottleComplete(bottle, CAPACITY)).toBe(true);
    });

    it('should return false for incomplete bottle', () => {
      const bottle: Bottle = ['red', 'red', 'red'];
      expect(isBottleComplete(bottle, CAPACITY)).toBe(false);
    });

    it('should return false for full bottle with mixed colors', () => {
      const bottle: Bottle = ['red', 'blue', 'red', 'red'];
      expect(isBottleComplete(bottle, CAPACITY)).toBe(false);
    });

    it('should return true for full bottle with same color', () => {
      const bottle: Bottle = ['red', 'red', 'red', 'red'];
      expect(isBottleComplete(bottle, CAPACITY)).toBe(true);
    });
  });

  describe('isSolved', () => {
    it('should return true when all bottles are complete', () => {
      const board: Board = [
        ['red', 'red', 'red', 'red'],
        ['blue', 'blue', 'blue', 'blue'],
        [],
      ];
      expect(isSolved(board, CAPACITY)).toBe(true);
    });

    it('should return false when bottles are incomplete', () => {
      const board: Board = [
        ['red', 'blue', 'red', 'red'],
        ['blue', 'blue', 'blue'],
        [],
      ];
      expect(isSolved(board, CAPACITY)).toBe(false);
    });
  });

  describe('getLegalMoves', () => {
    it('should return empty array when no moves available', () => {
      const board: Board = [
        ['red', 'red', 'red', 'red'],
        ['blue', 'blue', 'blue', 'blue'],
      ];
      expect(getLegalMoves(board, CAPACITY)).toEqual([]);
    });

    it('should find moves to empty bottles', () => {
      const board: Board = [['red'], []];
      const moves = getLegalMoves(board, CAPACITY);
      expect(moves).toContainEqual({ s: 0, t: 1 });
    });

    it('should find moves to matching color bottles', () => {
      const board: Board = [['red', 'blue'], ['blue']];
      const moves = getLegalMoves(board, CAPACITY);
      expect(moves).toContainEqual({ s: 0, t: 1 });
    });
  });

  describe('countColors', () => {
    it('should count all colors on board', () => {
      const board: Board = [
        ['red', 'blue', 'red'],
        ['blue', 'green'],
        ['green', 'red'],
      ];
      const counts = countColors(board);
      expect(counts).toEqual({
        red: 3,
        blue: 2,
        green: 2,
      });
    });

    it('should return empty object for empty board', () => {
      const board: Board = [[], []];
      const counts = countColors(board);
      expect(counts).toEqual({});
    });
  });

  describe('validateInvariants', () => {
    it('should not throw for valid board', () => {
      const board: Board = [
        ['red', 'blue'],
        ['green'],
        [],
      ];
      expect(() => validateInvariants(board, CAPACITY)).not.toThrow();
    });

    it('should throw when bottle exceeds capacity', () => {
      const board: Board = [
        ['red', 'blue', 'green', 'yellow', 'purple'],
        [],
      ];
      expect(() => validateInvariants(board, CAPACITY)).toThrow('exceeds capacity');
    });
  });

  describe('color count preservation', () => {
    it('should preserve color counts after pour', () => {
      const board: Board = [['red', 'blue'], []];
      const countsBefore = countColors(board);
      
      const { board: newBoard } = pour(board, CAPACITY, 0, 1);
      const countsAfter = countColors(newBoard);
      
      expect(countsAfter).toEqual(countsBefore);
    });

    it('should preserve color counts after undo', () => {
      const board: Board = [['red', 'blue', 'blue'], ['blue']];
      const countsBefore = countColors(board);
      
      const { board: newBoard, move } = pour(board, CAPACITY, 0, 1);
      const restoredBoard = undo(newBoard, move);
      const countsAfter = countColors(restoredBoard);
      
      expect(countsAfter).toEqual(countsBefore);
    });
  });

  describe('cloneBoard', () => {
    it('should create a deep copy of the board', () => {
      const board: Board = [
        ['red', 'blue'],
        ['green'],
      ];
      
      const cloned = cloneBoard(board);
      
      // Modify the cloned board
      cloned[0].push('yellow');
      
      // Original should remain unchanged
      expect(board[0]).toEqual(['red', 'blue']);
      expect(cloned[0]).toEqual(['red', 'blue', 'yellow']);
    });
  });
});
