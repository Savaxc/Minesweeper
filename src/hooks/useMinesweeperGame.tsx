import { useCallback, useEffect, useState } from "react";
import {
  checkGameWin,
  initGame,
  revealAllMines,
  revealEmptyCells,
} from "../utils";
import type { TBoard, TLevel } from "../types";
import { DEFAULT_LEVEL, LEVELS } from "../constants";

const useMinesweeperGame = () => {
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const currentLevel = LEVELS[level];

  const changeLevel = useCallback((selectedLevel: TLevel) => {
    setLevel(selectedLevel);
  }, []);
  
  const [gameBoard, setGameBoard] = useState(
    initGame(
      LEVELS[DEFAULT_LEVEL].rows,
      LEVELS[DEFAULT_LEVEL].cols,
      LEVELS[DEFAULT_LEVEL].totalMines
    )
  );

  const resetBoard = useCallback(() => {
    setIsGameOver(false);
    setisGameWin(false);

    setGameBoard(
      initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines)
    );
  }, [currentLevel]);

  const startNewGame = useCallback(() => {
    resetBoard();
  }, [resetBoard]);

  useEffect(() => {
    startNewGame()
  }, [level]);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWin, setisGameWin] = useState(false);
  const isGameEnded = isGameOver || isGameWin;

  const openCell = (board: TBoard, row: number, col: number) => {
    const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));
    const cell = newGameBoard[row][col];
    // console.log("cell", cell);
    const isMineCell = cell.value === "mine";
    const isNumberCell = typeof cell.value === "number" && cell.value > 0;
    const isEmptyCell = typeof cell.value === "number" && cell.value === 0;

    if (isMineCell) {
      setIsGameOver(true);
      cell.highlight = "red";
      revealAllMines(newGameBoard);
    }

    if (!isMineCell) {
      cell.isOpened = true;
      if (isNumberCell) {
        console.log("number cell");
      }

      if (isEmptyCell) {
        revealEmptyCells(newGameBoard, currentLevel.rows, currentLevel.cols, row, col);
        console.log("empty cell");
      }

      if (checkGameWin(newGameBoard, currentLevel.totalMines)) {
        setisGameWin(true);
        revealAllMines(newGameBoard, true);
      }
    }

    return newGameBoard;
  };

  const handleCellLeftClick = (row: number, col: number) => {
    if (
      isGameEnded ||
      gameBoard[row][col].isOpened ||
      gameBoard[row][col].isFlagged
    ) {
      return null;
    }

    // console.log("left click", row, col);
    const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));

    const boardAfterOpeningCell = openCell(newGameBoard, row, col);

    if (boardAfterOpeningCell) {
      setGameBoard(boardAfterOpeningCell);
    }
  };

  return { level, changeLevel, gameBoard, handleCellLeftClick };
};

export default useMinesweeperGame;
