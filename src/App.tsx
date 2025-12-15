import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import SelectLevel from "./components/SelectLevel";
import useMinesweeperGame from "./hooks/useMinesweeperGame";
import ReactConfetti from "react-confetti";

function App() {
  const {
    level,
    changeLevel,
    gameBoard,
    handleCellLeftClick,
    handleCellRightClick,
    isGameOver,
    isGameWin,
    isGameEnded,
    minesLeft,
    timeDiff,
    startNewGame,
    restartGame
  } = useMinesweeperGame();

  return (
    <div className="game">
      <Header
        isGameWin={isGameWin}
        isGameOver={isGameOver}
        isGameEnded={isGameEnded}
        minesLeft={minesLeft}
        timeDiff={timeDiff}
        startNewGame={startNewGame}
        restartGame={restartGame}
      />
      <Board
        level={level}
        gameBoard={gameBoard}
        handleCellLeftClick={handleCellLeftClick}
        handleCellRightClick={handleCellRightClick}
      />
      <SelectLevel level={level} changeLevel={changeLevel} />
      {isGameWin && <ReactConfetti/>}
    </div>
  );
}

export default App;
