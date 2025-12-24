import type { Settings } from '../logic/types';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  onClose: () => void;
}

export function SettingsPanel({ settings, onSettingsChange, onClose }: SettingsPanelProps) {
  const handleToggle = (key: keyof Settings) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="settings-title">Settings</h2>
        <div className="settings-list">
          <label className="setting-item">
            <span className="setting-label">
              <span className="setting-icon">🎨</span>
              Color-Blind Mode
            </span>
            <input
              type="checkbox"
              className="setting-toggle"
              checked={settings.colorBlindMode}
              onChange={() => handleToggle('colorBlindMode')}
            />
          </label>
          <p className="setting-description">
            Shows patterns and labels on colors for better accessibility
          </p>

          <label className="setting-item">
            <span className="setting-label">
              <span className="setting-icon">🎬</span>
              Reduced Motion
            </span>
            <input
              type="checkbox"
              className="setting-toggle"
              checked={settings.reducedMotion}
              onChange={() => handleToggle('reducedMotion')}
            />
          </label>
          <p className="setting-description">
            Disables animations for a more static experience
          </p>

          <label className="setting-item">
            <span className="setting-label">
              <span className="setting-icon">🔊</span>
              Sound Effects
            </span>
            <input
              type="checkbox"
              className="setting-toggle"
              checked={settings.soundEnabled}
              onChange={() => handleToggle('soundEnabled')}
            />
          </label>
          <p className="setting-description">
            Enable or disable sound effects
          </p>
        </div>
        <button className="settings-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
