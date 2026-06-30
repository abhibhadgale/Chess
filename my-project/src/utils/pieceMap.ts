export type ChessPieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
export type ChessPieceColor = 'w' | 'b';

const pieceNameMap: Record<ChessPieceType, string> = {
  p: 'pawn',
  r: 'rook',
  n: 'knight',
  b: 'bishop',
  q: 'queen',
  k: 'king',
};

const colorNameMap: Record<ChessPieceColor, string> = {
  w: 'white',
  b: 'black',
};

export function getPieceImagePath(color: ChessPieceColor, type: ChessPieceType): string {
  const pieceName = pieceNameMap[type];
  const colorName = colorNameMap[color];
  return `/pieces/${colorName}-${pieceName}.png`;
}

export function getPieceImagePathFromCode(pieceCode: string): string | undefined {
  if (!pieceCode || pieceCode.length !== 2) {
    return undefined;
  }

  const color = pieceCode[0] as ChessPieceColor;
  const type = pieceCode[1] as ChessPieceType;

  if (!(color in colorNameMap) || !(type in pieceNameMap)) {
    return undefined;
  }

  return getPieceImagePath(color, type);
}
