import type { GameState, Settings } from '../logic/types';

const GAME_STATE_KEY = 'water-sort-puzzle-state';
const SETTINGS_KEY = 'water-sort-puzzle-settings';
const UNLOCKED_LEVELS_KEY = 'water-sort-puzzle-unlocked';
const BEST_MOVES_KEY = 'water-sort-puzzle-best-moves';

/**
 * Save game state to localStorage
 */
export function saveGameState(state: GameState): void {
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
}

/**
 * Load game state from localStorage
 */
export function loadGameState(): GameState | null {
  try {
    const saved = localStorage.getItem(GAME_STATE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load game state:', error);
  }
  return null;
}

/**
 * Clear game state from localStorage
 */
export function clearGameState(): void {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear game state:', error);
  }
}

/**
 * Save settings to localStorage
 */
export function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

/**
 * Load settings from localStorage
 */
export function loadSettings(): Settings {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return {
    colorBlindMode: false,
    reducedMotion: false,
    soundEnabled: true,
  };
}

/**
 * Save unlocked levels to localStorage
 */
export function saveUnlockedLevels(levels: number[]): void {
  try {
    localStorage.setItem(UNLOCKED_LEVELS_KEY, JSON.stringify(levels));
  } catch (error) {
    console.error('Failed to save unlocked levels:', error);
  }
}

/**
 * Load unlocked levels from localStorage
 */
export function loadUnlockedLevels(): number[] {
  try {
    const saved = localStorage.getItem(UNLOCKED_LEVELS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load unlocked levels:', error);
  }
  return [1]; // Level 1 is always unlocked
}

/**
 * Unlock a level
 */
export function unlockLevel(levelId: number): void {
  const unlocked = loadUnlockedLevels();
  if (!unlocked.includes(levelId)) {
    unlocked.push(levelId);
    saveUnlockedLevels(unlocked);
  }
}

/**
 * Check if a level is unlocked
 */
export function isLevelUnlocked(levelId: number): boolean {
  const unlocked = loadUnlockedLevels();
  return unlocked.includes(levelId);
}

/**
 * Save best moves for a level
 */
export function saveBestMoves(levelId: number, moves: number): void {
  try {
    const saved = localStorage.getItem(BEST_MOVES_KEY);
    const bestMoves = saved ? JSON.parse(saved) : {};
    
    if (!bestMoves[levelId] || moves < bestMoves[levelId]) {
      bestMoves[levelId] = moves;
      localStorage.setItem(BEST_MOVES_KEY, JSON.stringify(bestMoves));
    }
  } catch (error) {
    console.error('Failed to save best moves:', error);
  }
}

/**
 * Load best moves for a level
 */
export function loadBestMoves(levelId: number): number | null {
  try {
    const saved = localStorage.getItem(BEST_MOVES_KEY);
    if (saved) {
      const bestMoves = JSON.parse(saved);
      return bestMoves[levelId] || null;
    }
  } catch (error) {
    console.error('Failed to load best moves:', error);
  }
  return null;
}

/**
 * Clear all data from localStorage
 */
export function clearAllData(): void {
  try {
    localStorage.removeItem(GAME_STATE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(UNLOCKED_LEVELS_KEY);
    localStorage.removeItem(BEST_MOVES_KEY);
  } catch (error) {
    console.error('Failed to clear all data:', error);
  }
}
