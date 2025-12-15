import GameStatus from "./GameStatus";

type HeaderProps = {
  isGameWin: boolean;
  isGameOver: boolean;
  isGameEnded: boolean;
  minesLeft: number;
};

const Header = ({
  isGameWin,
  isGameOver,
  isGameEnded,
  minesLeft
}: HeaderProps) => {
  return (
    <header>
      <div className="header-label">
        <GameStatus
          isGameWin={isGameWin}
          isGameOver={isGameOver}
          isGameEnded={isGameEnded}
          minesLeft={minesLeft}
        />
      </div>
    </header>
  );
};

export default Header;