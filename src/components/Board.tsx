import type { TBoard, TLevel } from "../types";
import Cell from "./Cell";

type Props = {
  gameBoard: TBoard;
  handleCellLeftClick: (row: number, col: number) => void;
  handleCellRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, row: number, col: number) => void;
  level: TLevel;
};

const Board = (props: Props) => {
  const { level, gameBoard, handleCellLeftClick, handleCellRightClick } = props;

  return (
    <div className="board">
      {gameBoard.map((row, rowIndex) => (
        <div className="row">
          {row.map((cell, cellIndex) => (
            <Cell
              cell={cell}
              rowIndex={rowIndex}
              cellIndex={cellIndex}
              handleCellLeftClick={handleCellLeftClick}
              handleCellRightClick={handleCellRightClick}
              level = {level}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
