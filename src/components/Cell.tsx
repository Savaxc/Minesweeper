import clsx from "clsx";
import { CELL_NUMBERS_COLORS } from "../constants";
import mineIcon from "/icons/bomb.svg";
import flagIcon from "/icons/red-flag.png";
import type { GameCell, TLevel } from "../types";

type CellProps = {
  cell: GameCell; 
  rowIndex: number;
  cellIndex: number;
  handleCellLeftClick: (row: number, col: number) => void;
  level: TLevel;
}

const Cell = ({ cell, rowIndex, cellIndex, handleCellLeftClick, level }: CellProps) => {
  return (
    <div
      className={clsx(
        "cell",
        typeof cell.value === "number" && CELL_NUMBERS_COLORS[cell.value],
        cell.value === "mine" && cell.highlight,
        level !== "easy" && "small"
      )}
      onClick={() => handleCellLeftClick(rowIndex, cellIndex)}
    >
      {typeof cell.value === "number" && <>{cell.value || ""}</>}
      {cell.value === "mine" && <img src={mineIcon} />}
      {!cell.isOpened && (
        <div className="overlay">
          <img
            src={flagIcon}
            className={clsx("flag", cell.isFlagged && "visible")}
          />
        </div>
      )}
    </div>
  );
};

export default Cell;
