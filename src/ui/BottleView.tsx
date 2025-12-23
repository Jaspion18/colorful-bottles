import type { Bottle } from '../logic/types';

interface BottleViewProps {
  bottle: Bottle;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export function BottleView({ bottle, index, isSelected, onClick }: BottleViewProps) {
  const { colors, capacity } = bottle;
  const emptySlots = capacity - colors.length;
  
  return (
    <button
      className={`bottle ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      aria-label={`Bottle ${index + 1}`}
    >
      <div className="bottle-container">
        {/* Empty slots at the top */}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} className="bottle-slot empty" />
        ))}
        {/* Filled slots from top to bottom (reversed for display) */}
        {[...colors].reverse().map((color, i) => (
          <div
            key={`color-${i}`}
            className="bottle-slot filled"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </button>
  );
}
