import type { Bottle } from '../logic/types';

interface BottleViewProps {
  bottle: Bottle;
  index: number;
  isSelected: boolean;
  onClick: () => void;
  capacity: number;
  colorBlindMode: boolean;
  isAnimating?: boolean;
}

// Color patterns for color-blind mode
const patterns: Record<string, string> = {
  red: '/',
  blue: '\\',
  green: 'x',
  yellow: '+',
  purple: 'o',
  orange: '-',
  pink: '|',
  color0: '/',
  color1: '\\',
  color2: 'x',
  color3: '+',
  color4: 'o',
  color5: '-',
  color6: '|',
  color7: '~',
  color8: '=',
};

// Color mapping for visual consistency
const colorMap: Record<string, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  purple: '#a855f7',
  orange: '#f97316',
  pink: '#ec4899',
  color0: '#ef4444',
  color1: '#3b82f6',
  color2: '#22c55e',
  color3: '#eab308',
  color4: '#a855f7',
  color5: '#f97316',
  color6: '#ec4899',
  color7: '#06b6d4',
  color8: '#84cc16',
};

export function BottleView({
  bottle,
  index,
  isSelected,
  onClick,
  capacity,
  colorBlindMode,
  isAnimating = false,
}: BottleViewProps) {
  const emptySlots = capacity - bottle.length;

  return (
    <button
      className={`bottle ${isSelected ? 'selected' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={onClick}
      aria-label={`Bottle ${index + 1}`}
      disabled={isAnimating}
    >
      <div className="bottle-container">
        {/* Empty slots at the top */}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} className="bottle-slot empty" />
        ))}
        {/* Filled slots from top to bottom (reversed for display) */}
        {[...bottle].reverse().map((color, i) => (
          <div
            key={`color-${i}`}
            className="bottle-slot filled"
            style={{
              backgroundColor: colorMap[color] || color,
            }}
          >
            {colorBlindMode && (
              <div className="color-pattern" data-pattern={patterns[color] || '?'}>
                {patterns[color] || '?'}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bottle-number">{index + 1}</div>
    </button>
  );
}
