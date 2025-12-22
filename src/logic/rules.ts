import type { Bottle, Board } from './types';

/**
 * Gets the top color of a bottle
 */
export function getTopColor(bottle: Bottle): string | null {
  if (bottle.colors.length === 0) return null;
  return bottle.colors[bottle.colors.length - 1];
}

/**
 * Counts consecutive colors from the top of a bottle
 */
export function countTopColors(bottle: Bottle): number {
  if (bottle.colors.length === 0) return 0;
  
  const topColor = getTopColor(bottle);
  let count = 0;
  
  for (let i = bottle.colors.length - 1; i >= 0; i--) {
    if (bottle.colors[i] === topColor) {
      count++;
    } else {
      break;
    }
  }
  
  return count;
}

/**
 * Checks if a pour from sourceBottle to targetBottle is valid
 */
export function canPour(sourceBottle: Bottle, targetBottle: Bottle): boolean {
  // Can't pour from empty bottle
  if (sourceBottle.colors.length === 0) return false;
  
  // Can't pour into full bottle
  if (targetBottle.colors.length >= targetBottle.capacity) return false;
  
  // Can pour into empty bottle
  if (targetBottle.colors.length === 0) return true;
  
  // Can pour if top colors match
  const sourceTopColor = getTopColor(sourceBottle);
  const targetTopColor = getTopColor(targetBottle);
  
  return sourceTopColor === targetTopColor;
}

/**
 * Performs a pour operation and returns the updated bottles
 */
export function pour(
  sourceBottle: Bottle,
  targetBottle: Bottle
): { source: Bottle; target: Bottle } | null {
  if (!canPour(sourceBottle, targetBottle)) {
    return null;
  }
  
  const sourceColors = [...sourceBottle.colors];
  const targetColors = [...targetBottle.colors];
  
  const countToPour = Math.min(
    countTopColors(sourceBottle),
    targetBottle.capacity - targetBottle.colors.length
  );
  
  // Move colors from source to target
  for (let i = 0; i < countToPour; i++) {
    const color = sourceColors.pop();
    if (color) {
      targetColors.push(color);
    }
  }
  
  return {
    source: { ...sourceBottle, colors: sourceColors },
    target: { ...targetBottle, colors: targetColors },
  };
}

/**
 * Checks if a bottle is complete (all same color and full)
 */
export function isBottleComplete(bottle: Bottle): boolean {
  if (bottle.colors.length === 0) return true; // Empty bottles are "complete"
  if (bottle.colors.length !== bottle.capacity) return false;
  
  const firstColor = bottle.colors[0];
  return bottle.colors.every(color => color === firstColor);
}

/**
 * Checks if the board is in a winning state
 */
export function isWinning(board: Board): boolean {
  return board.bottles.every(bottle => isBottleComplete(bottle));
}

/**
 * Creates a deep copy of a board
 */
export function cloneBoard(board: Board): Board {
  return {
    ...board,
    bottles: board.bottles.map(bottle => ({
      ...bottle,
      colors: [...bottle.colors],
    })),
  };
}
