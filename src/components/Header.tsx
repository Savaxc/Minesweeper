import GameStatus from "./GameStatus";
import TimerDisplay from "./TimerDisplay";

type HeaderProps = {
  isGameWin: boolean;
  isGameOver: boolean;
  isGameEnded: boolean;
  minesLeft: number;
  timeDiff: string;
};

const Header = ({
  isGameWin,
  isGameOver,
  isGameEnded,
  minesLeft,
  timeDiff,
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
      <div className="header-label">
        <TimerDisplay timeDiff={timeDiff} />
      </div>{" "}
    </header>
  );
};

export default Header;
