import { useState } from "react";
import { initGame, revealAllMines, revealEmptyCells } from "../utils";
import type { TBoard } from "../types";

const useMinesweeperGame = () => {
  const [gameBoard, setGameBoard] = useState(initGame(9, 9, 10));
  const [isGameOver, setIsGameOver] = useState(false);

  const openCell = (board: TBoard, row: number, col: number) => {
    const newGameBoard: TBoard =JSON.parse(JSON.stringify(gameBoard));
    const cell = newGameBoard[row][col];
    // console.log("cell", cell);
    const isMineCell = cell.value === 'mine';
    const isNumberCell = typeof cell.value === 'number' && cell.value > 0;
    const isEmptyCell = typeof cell.value === 'number' && cell.value === 0;

    if(isMineCell){
      setIsGameOver(true);
      cell.highlight = 'red';
      revealAllMines(newGameBoard);
    }

    if(!isMineCell) {
      cell.isOpened = true;
      if(isNumberCell) {
        console.log('number cell')
      }

      if(isEmptyCell){
        revealEmptyCells(newGameBoard, 9, 9, row, col);
        console.log('empty cell');
      }
    }

    return newGameBoard;
  };

  const handleCellLeftClick = (row: number, col: number) => {
    // console.log("left click", row, col);
    const newGameBoard: TBoard =JSON.parse(JSON.stringify(gameBoard));

    const boardAfterOpeningCell = openCell(newGameBoard, row, col);

    if (boardAfterOpeningCell) {
      setGameBoard(boardAfterOpeningCell)
    }
  };
  
  return { gameBoard, handleCellLeftClick };
}
 
export default useMinesweeperGame;