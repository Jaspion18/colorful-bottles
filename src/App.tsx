import { useState, useEffect, useCallback } from 'react';
import type { GameState, Settings } from './logic/types';
import { canPour, pour, undo, isSolved, cloneBoard } from './logic/rules';
import { BoardView } from './ui/BoardView';
import { WinOverlay } from './ui/WinOverlay';
import { SettingsPanel } from './ui/SettingsPanel';
import { LevelSelect } from './ui/LevelSelect';
import { levels, getLevelById, getNextLevel } from './levels/levels';
import {
  saveGameState,
  loadGameState,
  clearGameState,
  saveSettings,
  loadSettings,
  loadUnlockedLevels,
  unlockLevel,
  isLevelUnlocked,
  saveBestMoves,
  loadBestMoves,
  saveUnlockedLevels,
} from './storage/storage';

// Sound generation utilities using Web Audio API
const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  return AudioContextClass ? new AudioContextClass() : null;
};
const audioContext = getAudioContext();

function playPourSound() {
  if (!audioContext) return;
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

function playWinSound() {
  if (!audioContext) return;
  
  const notes = [523.25, 587.33, 659.25, 783.99]; // C5, D5, E5, G5
  
  notes.forEach((freq, i) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + i * 0.15);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime + i * 0.15);
    gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + i * 0.15 + 0.05);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + i * 0.15 + 0.3);
    
    oscillator.start(audioContext.currentTime + i * 0.15);
    oscillator.stop(audioContext.currentTime + i * 0.15 + 0.3);
  });
}

function App() {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>(loadUnlockedLevels);
  const [showSettings, setShowSettings] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [invalidMove, setInvalidMove] = useState(false);
  const [pouringFrom, setPouringFrom] = useState<number | null>(null);
  const [pouringTo, setPouringTo] = useState<number | null>(null);

  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGameState();
    if (saved && saved.board && saved.capacity) {
      return saved;
    }
    
    // Initialize with level 1
    const level = levels[0];
    return {
      board: cloneBoard(level.board),
      capacity: level.capacity,
      selectedBottle: null,
      history: [],
      moves: 0,
      isWon: false,
      currentLevel: 1,
      unlockedLevels: [1],
    };
  });

  // Save game state whenever it changes
  useEffect(() => {
    if (!gameState.isWon) {
      saveGameState(gameState);
    }
  }, [gameState]);

  // Save settings whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  // Save unlocked levels
  useEffect(() => {
    saveUnlockedLevels(unlockedLevels);
  }, [unlockedLevels]);

  // Check for win condition
  useEffect(() => {
    if (!gameState.isWon && isSolved(gameState.board, gameState.capacity)) {
      setGameState(prev => ({ ...prev, isWon: true }));
      
      // Play win sound
      if (settings.soundEnabled) {
        playWinSound();
      }
      
      // Unlock next level
      const nextLevel = getNextLevel(gameState.currentLevel);
      if (nextLevel && !unlockedLevels.includes(nextLevel.id)) {
        setUnlockedLevels(prev => [...prev, nextLevel.id]);
        unlockLevel(nextLevel.id);
      }
      
      // Save best moves
      saveBestMoves(gameState.currentLevel, gameState.moves);
    }
  }, [gameState.board, gameState.capacity, gameState.isWon, gameState.currentLevel, gameState.moves, unlockedLevels, settings.soundEnabled]);

  const handleBottleClick = useCallback((index: number) => {
    if (gameState.isWon || isAnimating) return;

    if (gameState.selectedBottle === null) {
      // Select the bottle if it has colors
      if (gameState.board[index].length > 0) {
        setGameState(prev => ({ ...prev, selectedBottle: index }));
      }
    } else if (gameState.selectedBottle === index) {
      // Deselect the bottle
      setGameState(prev => ({ ...prev, selectedBottle: null }));
    } else {
      // Try to pour
      if (canPour(gameState.board, gameState.capacity, gameState.selectedBottle, index)) {
        const animationDuration = settings.reducedMotion ? 0 : 600;
        
        if (!settings.reducedMotion) {
          setIsAnimating(true);
          setPouringFrom(gameState.selectedBottle);
          setPouringTo(index);
        }

        // Play pour sound
        if (settings.soundEnabled) {
          playPourSound();
        }

        setTimeout(() => {
          try {
            const result = pour(gameState.board, gameState.capacity, gameState.selectedBottle!, index);
            
            setGameState(prev => ({
              ...prev,
              board: result.board,
              selectedBottle: null,
              history: [...prev.history, result.move],
              moves: prev.moves + 1,
            }));
          } catch (error) {
            console.error('Pour error:', error);
          } finally {
            setIsAnimating(false);
            setPouringFrom(null);
            setPouringTo(null);
          }
        }, animationDuration);
      } else {
        // Invalid pour - show feedback
        setInvalidMove(true);
        setTimeout(() => setInvalidMove(false), 300);
        setGameState(prev => ({ ...prev, selectedBottle: null }));
      }
    }
  }, [gameState, isAnimating, settings.reducedMotion, settings.soundEnabled]);

  const handleUndo = useCallback(() => {
    if (gameState.history.length > 0 && !isAnimating) {
      const lastMove = gameState.history[gameState.history.length - 1];
      const previousBoard = undo(gameState.board, lastMove);
      const newHistory = gameState.history.slice(0, -1);

      setGameState(prev => ({
        ...prev,
        board: previousBoard,
        selectedBottle: null,
        history: newHistory,
        moves: Math.max(0, prev.moves - 1),
        isWon: false,
      }));
    }
  }, [gameState.history, gameState.board, isAnimating]);

  const loadLevel = useCallback((levelId: number) => {
    const level = getLevelById(levelId);
    if (!level) return;

    setGameState({
      board: cloneBoard(level.board),
      capacity: level.capacity,
      selectedBottle: null,
      history: [],
      moves: 0,
      isWon: false,
      currentLevel: levelId,
      unlockedLevels: unlockedLevels,
    });
    clearGameState();
  }, [unlockedLevels]);

  const handleRestart = useCallback(() => {
    loadLevel(gameState.currentLevel);
  }, [gameState.currentLevel, loadLevel]);

  const handleNextLevel = useCallback(() => {
    const nextLevel = getNextLevel(gameState.currentLevel);
    if (nextLevel && isLevelUnlocked(nextLevel.id)) {
      loadLevel(nextLevel.id);
    }
  }, [gameState.currentLevel, loadLevel]);

  const handleLevelSelect = useCallback((levelId: number) => {
    if (isLevelUnlocked(levelId)) {
      loadLevel(levelId);
      setShowLevelSelect(false);
    }
  }, [loadLevel]);

  const currentLevel = getLevelById(gameState.currentLevel);
  const nextLevel = getNextLevel(gameState.currentLevel);
  const bestMoves = loadBestMoves(gameState.currentLevel);

  return (
    <div className={`app ${invalidMove ? 'shake' : ''}`}>
      <header className="header">
        <div className="header-top">
          <h1 className="game-title">Water Sort Puzzle</h1>
          <button
            className="settings-button"
            onClick={() => setShowSettings(true)}
            aria-label="Settings"
          >
            ⚙️
          </button>
        </div>
        <div className="header-info">
          <div className="level-info">
            <span className="level-label">Level {gameState.currentLevel}</span>
            {currentLevel && (
              <span className="difficulty-badge" data-difficulty={currentLevel.difficulty}>
                {currentLevel.difficulty}
              </span>
            )}
          </div>
          <div className="moves-counter">
            <span>Moves: {gameState.moves}</span>
            {bestMoves && !gameState.isWon && (
              <span className="best-moves">Best: {bestMoves}</span>
            )}
          </div>
        </div>
      </header>

      <main className="main">
        <BoardView
          board={gameState.board}
          capacity={gameState.capacity}
          selectedBottle={gameState.selectedBottle}
          onBottleClick={handleBottleClick}
          colorBlindMode={settings.colorBlindMode}
          isAnimating={isAnimating}
          pouringFrom={pouringFrom}
          pouringTo={pouringTo}
        />

        <div className="controls">
          <button
            className="control-button"
            onClick={handleUndo}
            disabled={gameState.history.length === 0 || isAnimating}
          >
            ↶ Undo
          </button>
          <button
            className="control-button"
            onClick={handleRestart}
            disabled={isAnimating}
          >
            ↻ Restart
          </button>
          <button
            className="control-button"
            onClick={() => setShowLevelSelect(true)}
            disabled={isAnimating}
          >
            📋 Levels
          </button>
        </div>
      </main>

      {gameState.isWon && (
        <WinOverlay
          moves={gameState.moves}
          bestMoves={bestMoves}
          onNextLevel={handleNextLevel}
          onReplay={handleRestart}
          onLevelSelect={() => setShowLevelSelect(true)}
          hasNextLevel={!!nextLevel}
        />
      )}

      {showSettings && (
        <SettingsPanel
          settings={settings}
          onSettingsChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showLevelSelect && (
        <LevelSelect
          levels={levels}
          currentLevel={gameState.currentLevel}
          unlockedLevels={unlockedLevels}
          onLevelSelect={handleLevelSelect}
          onClose={() => setShowLevelSelect(false)}
          hasCompletedPredefined={unlockedLevels.includes(16)}
        />
      )}
    </div>
  );
}

export default App;
