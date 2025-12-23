import { useState, useEffect } from 'react';
import type { GameState, Board } from './logic/types';
import { canPour, pour, isWinning, cloneBoard } from './logic/rules';
import { BoardView } from './ui/BoardView';
import { levels, defaultLevel } from './levels/levels';
import { saveGameState, loadGameState, clearGameState } from './storage/storage';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = loadGameState();
    if (saved) {
      return saved;
    }
    return {
      board: cloneBoard(defaultLevel.board),
      selectedBottle: null,
      history: [],
      moves: 0,
      isWon: false,
    };
  });

  const [currentLevelId, setCurrentLevelId] = useState(1);

  // Save game state whenever it changes
  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Check for win condition
  useEffect(() => {
    if (isWinning(gameState.board) && !gameState.isWon) {
      setGameState(prev => ({ ...prev, isWon: true }));
    }
  }, [gameState.board, gameState.isWon]);

  const handleBottleClick = (index: number) => {
    if (gameState.isWon) return;

    if (gameState.selectedBottle === null) {
      // Select the bottle
      if (gameState.board.bottles[index].colors.length > 0) {
        setGameState(prev => ({ ...prev, selectedBottle: index }));
      }
    } else if (gameState.selectedBottle === index) {
      // Deselect the bottle
      setGameState(prev => ({ ...prev, selectedBottle: null }));
    } else {
      // Try to pour
      const sourceBottle = gameState.board.bottles[gameState.selectedBottle];
      const targetBottle = gameState.board.bottles[index];

      if (canPour(sourceBottle, targetBottle)) {
        const result = pour(sourceBottle, targetBottle);
        if (result) {
          const newBottles = [...gameState.board.bottles];
          newBottles[gameState.selectedBottle] = result.source;
          newBottles[index] = result.target;

          const newBoard: Board = {
            ...gameState.board,
            bottles: newBottles,
          };

          setGameState(prev => ({
            ...prev,
            board: newBoard,
            selectedBottle: null,
            history: [...prev.history, prev.board],
            moves: prev.moves + 1,
          }));
        }
      } else {
        // Invalid pour, just deselect
        setGameState(prev => ({ ...prev, selectedBottle: null }));
      }
    }
  };

  const handleUndo = () => {
    if (gameState.history.length > 0) {
      const previousBoard = gameState.history[gameState.history.length - 1];
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
  };

  const handleRestart = () => {
    const level = levels.find(l => l.id === currentLevelId) || defaultLevel;
    setGameState({
      board: cloneBoard(level.board),
      selectedBottle: null,
      history: [],
      moves: 0,
      isWon: false,
    });
  };

  const handleLevelChange = (levelId: number) => {
    const level = levels.find(l => l.id === levelId) || defaultLevel;
    setCurrentLevelId(levelId);
    setGameState({
      board: cloneBoard(level.board),
      selectedBottle: null,
      history: [],
      moves: 0,
      isWon: false,
    });
    clearGameState();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Water Sort Puzzle</h1>
        <div className="level-selector">
          {levels.map(level => (
            <button
              key={level.id}
              className={`level-button ${currentLevelId === level.id ? 'active' : ''}`}
              onClick={() => handleLevelChange(level.id)}
            >
              {level.name}
            </button>
          ))}
        </div>
      </header>

      <main className="main">
        <div className="stats">
          <span>Moves: {gameState.moves}</span>
          {gameState.isWon && <span className="win-message">🎉 You Win! 🎉</span>}
        </div>

        <BoardView
          board={gameState.board}
          selectedBottle={gameState.selectedBottle}
          onBottleClick={handleBottleClick}
        />

        <div className="controls">
          <button
            className="control-button"
            onClick={handleUndo}
            disabled={gameState.history.length === 0}
          >
            Undo
          </button>
          <button className="control-button" onClick={handleRestart}>
            Restart
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
