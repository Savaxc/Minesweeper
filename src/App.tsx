import "./App.css";
import Board from "./components/Board";
import SelectLevel from "./components/SelectLevel";
import useMinesweeperGame from "./hooks/useMinesweeperGame";

function App() {
  const {
    level,
    changeLevel,
    gameBoard,
    handleCellLeftClick,
    handleCellRightClick,
  } = useMinesweeperGame();

  return (
    <div className="game">
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
