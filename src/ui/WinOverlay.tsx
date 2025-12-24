interface WinOverlayProps {
  moves: number;
  bestMoves: number | null;
  onNextLevel: () => void;
  onReplay: () => void;
  onLevelSelect: () => void;
  hasNextLevel: boolean;
}

export function WinOverlay({
  moves,
  bestMoves,
  onNextLevel,
  onReplay,
  onLevelSelect,
  hasNextLevel,
}: WinOverlayProps) {
  const isNewBest = !bestMoves || moves < bestMoves;

  return (
    <div className="overlay">
      <div className="win-modal">
        <h2 className="win-title">🎉 Level Complete! 🎉</h2>
        <div className="win-stats">
          <p className="win-stat">
            Moves: <strong>{moves}</strong>
          </p>
          {bestMoves && !isNewBest && (
            <p className="win-stat">
              Best: <strong>{bestMoves}</strong>
            </p>
          )}
          {isNewBest && bestMoves && (
            <p className="win-stat new-best">
              🌟 New Best: <strong>{moves}</strong> (was {bestMoves})
            </p>
          )}
          {isNewBest && !bestMoves && (
            <p className="win-stat new-best">
              🌟 First Completion: <strong>{moves}</strong> moves
            </p>
          )}
        </div>
        <div className="win-buttons">
          {hasNextLevel && (
            <button className="win-button primary" onClick={onNextLevel}>
              Next Level
            </button>
          )}
          <button className="win-button" onClick={onReplay}>
            Replay
          </button>
          <button className="win-button" onClick={onLevelSelect}>
            Level Select
          </button>
        </div>
      </div>
    </div>
  );
}
