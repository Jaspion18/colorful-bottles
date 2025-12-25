/**
 * Returns the solution steps for a board if solvable, otherwise null.
 * Each step is {s, t} (pour from s to t).
 */
export function getSolutionSteps(board: Board, capacity: number): Array<{s: number, t: number}> | null {
  const serialize = (b: Board) => JSON.stringify(b);
  const queue: { board: Board; steps: Array<{s: number, t: number}> }[] = [
    { board: cloneBoard(board), steps: [] }
  ];
  const visited = new Set<string>();
  visited.add(serialize(board));

  while (queue.length > 0) {
    const { board: current, steps } = queue.shift()!;
    if (isSolved(current, capacity)) return steps;

    const moves = getLegalMoves(current, capacity);
    for (const { s, t } of moves) {
      try {
        const { board: next } = pour(current, capacity, s, t);
        const key = serialize(next);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({ board: next, steps: [...steps, { s, t }] });
        }
      } catch {
        // Ignore invalid moves
      }
    }
  }
  return null;
}
/**
 * Checks if a board is solvable using BFS (returns true if a solution exists)
 */
export function isSolvable(board: Board, capacity: number): boolean {
  const serialize = (b: Board) => JSON.stringify(b);
  const queue: { board: Board; history: string[] }[] = [{ board: cloneBoard(board), history: [] }];
  const visited = new Set<string>();
  visited.add(serialize(board));

  while (queue.length > 0) {
    const { board: current } = queue.shift()!;
    if (isSolved(current, capacity)) return true;

    const moves = getLegalMoves(current, capacity);
    for (const { s, t } of moves) {
      try {
        const { board: next } = pour(current, capacity, s, t);
        const key = serialize(next);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({ board: next, history: [] });
        }
      } catch {
        // Ignore invalid moves
      }
    }
  }
  return false;
}

import type { ColorId, Bottle, Board, MoveRecord } from './types';

/**
 * Gets the top color of a bottle
 */
export function getTopColor(bottle: Bottle): ColorId | null {
  if (bottle.length === 0) return null;
  return bottle[bottle.length - 1];
}

/**
 * Counts consecutive colors from the top of a bottle
 */
export function countTopColors(bottle: Bottle): number {
  if (bottle.length === 0) return 0;
  
  const topColor = getTopColor(bottle);
  let count = 0;
  
  for (let i = bottle.length - 1; i >= 0; i--) {
    if (bottle[i] === topColor) {
      count++;
    } else {
      break;
    }
  }
  
  return count;
}

/**
 * Checks if a pour from source to target bottle is valid
 */
export function canPour(board: Board, capacity: number, s: number, t: number): boolean {
  // Can't pour to/from same bottle
  if (s === t) return false;
  
  // Check valid indices
  if (s < 0 || s >= board.length || t < 0 || t >= board.length) return false;
  
  const sourceBottle = board[s];
  const targetBottle = board[t];
  
  // Can't pour from empty bottle
  if (sourceBottle.length === 0) return false;
  
  // Can't pour into full bottle
  if (targetBottle.length >= capacity) return false;
  
  // Can pour into empty bottle
  if (targetBottle.length === 0) return true;
  
  // Can pour if top colors match
  const sourceTopColor = getTopColor(sourceBottle);
  const targetTopColor = getTopColor(targetBottle);
  
  return sourceTopColor === targetTopColor;
}

/**
 * Performs a pour operation and returns the updated board and move record
 */
export function pour(board: Board, capacity: number, s: number, t: number): { board: Board; move: MoveRecord } {
  if (!canPour(board, capacity, s, t)) {
    throw new Error('Invalid pour operation');
  }
  
  const sourceBottle = [...board[s]];
  const targetBottle = [...board[t]];
  
  const countToPour = Math.min(
    countTopColors(sourceBottle),
    capacity - targetBottle.length
  );
  
  const movedColor = getTopColor(sourceBottle)!;
  
  // Move colors from source to target
  for (let i = 0; i < countToPour; i++) {
    const color = sourceBottle.pop();
    if (color) {
      targetBottle.push(color);
    }
  }
  
  // Create new board with updated bottles
  const newBoard = board.map((bottle, index) => {
    if (index === s) return sourceBottle;
    if (index === t) return targetBottle;
    return [...bottle];
  });
  
  const move: MoveRecord = {
    s,
    t,
    moved: movedColor,
    count: countToPour,
  };
  
  return { board: newBoard, move };
}

/**
 * Undoes a move by reversing the pour operation
 */
export function undo(board: Board, move: MoveRecord): Board {
  const { s, t, count } = move;
  
  const sourceBottle = [...board[s]];
  const targetBottle = [...board[t]];
  
  // Move colors back from target to source
  for (let i = 0; i < count; i++) {
    const color = targetBottle.pop();
    if (color) {
      sourceBottle.push(color);
    }
  }
  
  // Create new board with updated bottles
  return board.map((bottle, index) => {
    if (index === s) return sourceBottle;
    if (index === t) return targetBottle;
    return [...bottle];
  });
}

/**
 * Checks if a bottle is complete (all same color and full, or empty)
 */
export function isBottleComplete(bottle: Bottle, capacity: number): boolean {
  if (bottle.length === 0) return true; // Empty bottles are "complete"
  if (bottle.length !== capacity) return false;
  
  const firstColor = bottle[0];
  return bottle.every(color => color === firstColor);
}

/**
 * Checks if the board is in a winning state
 */
export function isSolved(board: Board, capacity: number): boolean {
  return board.every(bottle => isBottleComplete(bottle, capacity));
}

/**
 * Gets all legal moves from the current board state
 */
export function getLegalMoves(board: Board, capacity: number): Array<{ s: number; t: number }> {
  const legalMoves: Array<{ s: number; t: number }> = [];
  
  for (let s = 0; s < board.length; s++) {
    for (let t = 0; t < board.length; t++) {
      if (canPour(board, capacity, s, t)) {
        legalMoves.push({ s, t });
      }
    }
  }
  
  return legalMoves;
}

/**
 * Counts the occurrences of each color across the entire board
 */
export function countColors(board: Board): Record<ColorId, number> {
  const counts: Record<ColorId, number> = {};
  
  for (const bottle of board) {
    for (const color of bottle) {
      counts[color] = (counts[color] || 0) + 1;
    }
  }
  
  return counts;
}

/**
 * Validates board invariants - throws if invalid
 */
export function validateInvariants(board: Board, capacity: number): void {
  // Check that no bottle exceeds capacity
  for (let i = 0; i < board.length; i++) {
    if (board[i].length > capacity) {
      throw new Error(`Bottle ${i} exceeds capacity: ${board[i].length} > ${capacity}`);
    }
  }
  
  // Check that each color appears in valid counts
  const colorCounts = countColors(board);
  
  // At minimum, verify no negative counts or invalid data
  for (const [color, count] of Object.entries(colorCounts)) {
    if (count <= 0) {
      throw new Error(`Invalid count for color ${color}: ${count}`);
    }
  }
}

/**
 * Creates a deep copy of a board
 */
export function cloneBoard(board: Board): Board {
  return board.map(bottle => [...bottle]);
}
