import { useCallback, useEffect, useState, type MouseEvent } from "react";
import {
  checkGameWin,
  initGame,
  revealAllMines,
  revealEmptyCells,
} from "../utils";
import type { TBoard, TLevel } from "../types";
import { DEFAULT_LEVEL, LEVELS } from "../constants";
import useTimer from "./useTimer";

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
    startNewGame();
  }, [level]);

  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWin, setisGameWin] = useState(false);
  const isGameEnded = isGameOver || isGameWin;

  const [totalFlags, setTotalFlags] = useState(0);
  const minesLeft = currentLevel.totalMines - totalFlags;

  const { timeDiff, isTimerRunning, startTimer, stopTimer, resetTimer } =
    useTimer();

  useEffect(() => {
    if (isGameEnded) {
      stopTimer();
    }
  }, [isGameEnded, stopTimer]);

  const openCell = (board: TBoard, row: number, col: number) => {
    if (!isTimerRunning) startTimer();

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
        revealEmptyCells(
          newGameBoard,
          currentLevel.rows,
          currentLevel.cols,
          row,
          col
        );
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

  const handleCellRightClick = (
    e: MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    e.preventDefault();

    if (isGameEnded || gameBoard[row][col].isOpened) return;

    if (!isTimerRunning) startTimer();

    let flagsDiff = 0;

    setGameBoard((prevGameBoard) => {
      const newGameBoard: TBoard = JSON.parse(JSON.stringify(gameBoard));
      const cell = prevGameBoard[row][col];

      if (cell.isFlagged) {
        newGameBoard[row][col].isFlagged = false;
        if (!flagsDiff) flagsDiff--;
      }

      if (!cell.isFlagged) {
        newGameBoard[row][col].isFlagged = true;
        if (!flagsDiff) flagsDiff++;
      }

      return newGameBoard;
    });

    setTotalFlags((prevTotalFlags) => prevTotalFlags + flagsDiff);
  };

  return {
    level,
    changeLevel,
    gameBoard,
    handleCellLeftClick,
    handleCellRightClick,
    isGameWin,
    isGameOver,
    isGameEnded,
    minesLeft,
    timeDiff
  };
};

export default useMinesweeperGame;
