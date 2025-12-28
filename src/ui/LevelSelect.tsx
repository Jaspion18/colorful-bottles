import { useState } from 'react';
import type { Level } from '../logic/types';

interface LevelSelectProps {
  levels: Level[];
  currentLevel: number;
  unlockedLevels: number[];
  onLevelSelect: (levelId: number) => void;
  onClose: () => void;
  hasCompletedPredefined: boolean;
}

export function LevelSelect({
  levels,
  currentLevel,
  unlockedLevels,
  onLevelSelect,
  onClose,
  hasCompletedPredefined,
}: LevelSelectProps) {
  const [activeTab, setActiveTab] = useState<'predefined' | 'generated'>('predefined');

  // Filter levels based on whether user has completed all predefined levels
  const predefinedLevels = levels.filter(l => l.id <= 15);
  const generatedLevels = levels.filter(l => l.id > 15);
  
  // If user hasn't completed all predefined levels, only show predefined
  const displayLevels = !hasCompletedPredefined 
    ? predefinedLevels 
    : activeTab === 'predefined' 
      ? predefinedLevels 
      : generatedLevels;

  const groupedLevels = {
    easy: displayLevels.filter(l => l.difficulty === 'easy'),
    medium: displayLevels.filter(l => l.difficulty === 'medium'),
    hard: displayLevels.filter(l => l.difficulty === 'hard'),
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="level-select-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="level-select-title">Select Level</h2>
        
        {hasCompletedPredefined && (
          <div className="level-tabs">
            <button
              className={`level-tab ${activeTab === 'predefined' ? 'active' : ''}`}
              onClick={() => setActiveTab('predefined')}
            >
              Pre-defined
            </button>
            <button
              className={`level-tab ${activeTab === 'generated' ? 'active' : ''}`}
              onClick={() => setActiveTab('generated')}
            >
              Generated
            </button>
          </div>
        )}
        
        <div className="level-select-content">
          {Object.entries(groupedLevels).map(([difficulty, levelList]) => (
            levelList.length > 0 && (
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
            )
          ))}
        </div>

        <button className="level-select-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
