import styles from '../styles/GameStatus.module.css';

type GameStatusProps = {
  turn: 'w' | 'b';
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
};

function GameStatus({ turn, isCheck, isCheckmate, isStalemate, isDraw }: GameStatusProps) {
  let message = `Current turn: ${turn === 'w' ? 'White' : 'Black'}`;

  if (isCheckmate) {
    message = `${turn === 'w' ? 'Black' : 'White'} wins by checkmate.`;
  } else if (isStalemate) {
    message = 'Stalemate — the game is a draw.';
  } else if (isDraw) {
    message = 'Draw.';
  } else if (isCheck) {
    message = `${turn === 'w' ? 'White' : 'Black'} is in check.`;
  }

  return (
    <div className={styles.statusCard}>
      <h2>Game status</h2>
      <p className={styles.message}>{message}</p>
      <p className={styles.meta}>
        {isCheckmate ? 'No further moves are allowed.' : isStalemate || isDraw ? 'The game has ended.' : 'Make a move to continue.'}
      </p>
    </div>
  );
}

export default GameStatus;
