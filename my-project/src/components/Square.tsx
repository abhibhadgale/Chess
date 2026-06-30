import Piece from './Piece';
import styles from '../styles/Square.module.css';

type SquareProps = {
  isLight: boolean;
  pieceCode?: string;
  squareName: string;
  isSelected: boolean;
  isLegalMove: boolean;
  onSelect: () => void;
};

function Square({ isLight, pieceCode, squareName, isSelected, isLegalMove, onSelect }: SquareProps) {
  const squareClasses = [
    styles.square,
    isLight ? styles.light : styles.dark,
    isSelected ? styles.selected : '',
    isLegalMove ? styles.legal : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={squareClasses} aria-label={`Square ${squareName}`} onClick={onSelect}>
      {pieceCode ? <Piece pieceCode={pieceCode} /> : null}
    </button>
  );
}

export default Square;
