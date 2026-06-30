export type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
export type PieceColor = 'w' | 'b';
export type PieceCode = `${PieceColor}${PieceType}`;

export type ChessPiece = {
  type: PieceType;
  color: PieceColor;
  square: string;
};

export type BoardSquare = ChessPiece | null;
