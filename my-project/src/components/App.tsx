import ChessBoard from './ChessBoard';
import GameStatus from './GameStatus';
import PromotionDialog from './PromotionDialog';
import ControlPanel from './ControlPanel';
import { useChessGame } from '../hooks/useChessGame';
import styles from '../styles/App.module.css';

function App() {
  const {
    board,
    resetGame,
    selectedSquare,
    legalMoves,
    handleSquareClick,
    handlePromotionSelect,
    promotionState,
    turn,
    isCheck,
    isCheckmate,
    isStalemate,
    isDraw,
  } = useChessGame();

  return (
    <main className={styles.appShell}>
      <section className={styles.pageCard}>
        <div className={styles.boardSection}>
          <header className={styles.header}>
            <p className={styles.eyebrow}>Board UI</p>
            <h1>Chess Game MVP</h1>
            <p className={styles.subtitle}>
              Select a friendly piece to reveal its legal moves.
            </p>
          </header>

          <ChessBoard
            board={board}
            selectedSquare={selectedSquare}
            legalMoves={legalMoves}
            onSquareSelect={handleSquareClick}
          />
        </div>

        <aside className={styles.sidebar}>
          <ControlPanel onRestart={resetGame} />

          <div className={styles.panel}>
            <h2>Board status</h2>
            <p>{turn === 'w' ? 'White to move' : 'Black to move'}</p>
            <p className={styles.muted}>Selection: {selectedSquare ?? 'None'}</p>
          </div>

          <GameStatus
            turn={turn}
            isCheck={isCheck}
            isCheckmate={isCheckmate}
            isStalemate={isStalemate}
            isDraw={isDraw}
          />
        </aside>
      </section>

      <PromotionDialog
        isOpen={promotionState.isOpen}
        color={promotionState.color}
        onSelect={handlePromotionSelect}
      />
    </main>
  );
}

export default App;
