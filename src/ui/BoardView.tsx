import type { Board } from '../logic/types';
import { BottleView } from './BottleView';

interface BoardViewProps {
  board: Board;
  capacity: number;
  selectedBottle: number | null;
  onBottleClick: (index: number) => void;
  colorBlindMode: boolean;
  isAnimating?: boolean;
}

export function BoardView({
  board,
  capacity,
  selectedBottle,
  onBottleClick,
  colorBlindMode,
  isAnimating = false,
}: BoardViewProps) {
  return (
    <div className="board">
      {board.map((bottle, index) => (
        <BottleView
          key={index}
          bottle={bottle}
          index={index}
          isSelected={selectedBottle === index}
          onClick={() => onBottleClick(index)}
          capacity={capacity}
          colorBlindMode={colorBlindMode}
          isAnimating={isAnimating}
        />
      ))}
    </div>
  );
}
