import { getPieceImagePathFromCode } from '../utils/pieceMap';

type PieceProps = {
  pieceCode: string;
};

function Piece({ pieceCode }: PieceProps) {
  const imagePath = getPieceImagePathFromCode(pieceCode);

  if (!imagePath) {
    return null;
  }

  return (
    <img
      src={imagePath}
      alt={pieceCode}
      className="pieceImage"
      draggable={false}
    />
  );
}

export default Piece;
