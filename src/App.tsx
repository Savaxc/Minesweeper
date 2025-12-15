import './App.css'
import Board from './components/Board'
import useMinesweeperGame from './hooks/useMinesweeperGame'

function App() {
  const {gameBoard, handleCellLeftClick} = useMinesweeperGame();

  return (
    <div className="game">
      <Board gameBoard={gameBoard} handleCellLeftClick={handleCellLeftClick} />
    </div>
  )
}

export default App
