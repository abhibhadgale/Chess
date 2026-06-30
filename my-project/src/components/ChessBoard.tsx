import Square from './Square';
import type { BoardLayout, SquareName } from '../hooks/useChessGame';
import styles from '../styles/ChessBoard.module.css';

const boardSquares = Array.from({ length: 64 }, (_, index) => index);

type ChessBoardProps = {
  board: BoardLayout;
  selectedSquare: SquareName | null;
  legalMoves: SquareName[];
  onSquareSelect: (squareName: SquareName) => void;
};

function ChessBoard({ board, selectedSquare, legalMoves, onSquareSelect }: ChessBoardProps) {
  return (
    <div className={styles.boardFrame}>
      <div className={styles.boardSurface} aria-label="Chess board" role="img">
        <div className={styles.boardGrid}>
          {boardSquares.map((index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            const isLight = (row + col) % 2 === 0;
            const square = board[row][col];
            const squareName = `${String.fromCharCode(97 + col)}${8 - row}`;

            return (
              <Square
                key={squareName}
                isLight={isLight}
                pieceCode={square?.type ? `${square.color}${square.type}` : undefined}
                squareName={squareName}
                isSelected={selectedSquare === squareName}
                isLegalMove={legalMoves.includes(squareName)}
                onSelect={() => onSquareSelect(squareName)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ChessBoard;
