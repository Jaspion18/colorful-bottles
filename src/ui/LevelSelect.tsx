import type { Level } from '../logic/types';

interface LevelSelectProps {
  levels: Level[];
  currentLevel: number;
  unlockedLevels: number[];
  onLevelSelect: (levelId: number) => void;
  onClose: () => void;
}

export function LevelSelect({
  levels,
  currentLevel,
  unlockedLevels,
  onLevelSelect,
  onClose,
}: LevelSelectProps) {
  const groupedLevels = {
    easy: levels.filter(l => l.difficulty === 'easy'),
    medium: levels.filter(l => l.difficulty === 'medium'),
    hard: levels.filter(l => l.difficulty === 'hard'),
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="level-select-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="level-select-title">Select Level</h2>
        
        <div className="level-select-content">
          {Object.entries(groupedLevels).map(([difficulty, levelList]) => (
            <div key={difficulty} className="level-difficulty-group">
              <h3 className="difficulty-title">
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </h3>
              <div className="level-grid">
                {levelList.map((level) => {
                  const isUnlocked = unlockedLevels.includes(level.id);
                  const isCurrent = level.id === currentLevel;

                  return (
                    <button
                      key={level.id}
                      className={`level-button ${isCurrent ? 'current' : ''} ${
                        !isUnlocked ? 'locked' : ''
                      }`}
                      onClick={() => isUnlocked && onLevelSelect(level.id)}
                      disabled={!isUnlocked}
                    >
                      {isUnlocked ? level.id : '🔒'}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <button className="level-select-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
