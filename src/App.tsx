import "./App.css";
import Board from "./components/Board";
import Header from "./components/Header";
import SelectLevel from "./components/SelectLevel";
import useMinesweeperGame from "./hooks/useMinesweeperGame";

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
    timeDiff
  } = useMinesweeperGame();

  return (
    <div className="game">
      <Header
        isGameWin={isGameWin}
        isGameOver={isGameOver}
        isGameEnded={isGameEnded}
        minesLeft={minesLeft}
        timeDiff={timeDiff}
      />
      <Board
        level={level}
        gameBoard={gameBoard}
        handleCellLeftClick={handleCellLeftClick}
        handleCellRightClick={handleCellRightClick}
      />
      <SelectLevel level={level} changeLevel={changeLevel} />
    </div>
  );
}

export default App;
