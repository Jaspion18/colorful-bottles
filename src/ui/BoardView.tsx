import type { Board } from '../logic/types';
import { BottleView } from './BottleView';

interface BoardViewProps {
  board: Board;
  selectedBottle: number | null;
  onBottleClick: (index: number) => void;
}

export function BoardView({ board, selectedBottle, onBottleClick }: BoardViewProps) {
  return (
    <div className="board">
      {board.bottles.map((bottle, index) => (
        <BottleView
          key={index}
          bottle={bottle}
          index={index}
          isSelected={selectedBottle === index}
          onClick={() => onBottleClick(index)}
        />
      ))}
    </div>
  );
}
