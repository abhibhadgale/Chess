import { useCallback, useRef, useState } from 'react';
import { Chess, type Piece, type Square } from 'chess.js';

export type PromotionPiece = 'q' | 'r' | 'n' | 'b';

export type BoardLayout = Array<Array<Piece | null>>;
export type SquareName = string;

function getBoardLayout(game: Chess): BoardLayout {
  return game.board();
}

function getLegalMoves(game: Chess, squareName: SquareName | null): SquareName[] {
  if (!squareName) {
    return [];
  }

  return game.moves({ square: squareName as Square, verbose: true }).map((move) => move.to);
}

function buildMoveOptions(game: Chess, from: SquareName, to: SquareName) {
  const move = game
    .moves({ verbose: true })
    .find((candidate) => candidate.from === from && candidate.to === to);

  if (!move) {
    return { from: from as Square, to: to as Square };
  }

  return {
    from: from as Square,
    to: to as Square,
    ...(move.promotion ? { promotion: move.promotion as PromotionPiece } : {}),
  };
}

function isPromotionMove(game: Chess, from: SquareName, to: SquareName) {
  return game
    .moves({ square: from as Square, verbose: true })
    .some((candidate) => candidate.to === to && Boolean(candidate.promotion));
}

export function useChessGame() {
  const gameRef = useRef(new Chess());
  const [board, setBoard] = useState<BoardLayout>(() => getBoardLayout(gameRef.current));
  const [selectedSquare, setSelectedSquare] = useState<SquareName | null>(null);
  const [legalMoves, setLegalMoves] = useState<SquareName[]>([]);
  const [turn, setTurn] = useState<'w' | 'b'>(() => gameRef.current.turn());
  const [isCheck, setIsCheck] = useState(() => gameRef.current.inCheck());
  const [isCheckmate, setIsCheckmate] = useState(() => gameRef.current.isCheckmate());
  const [isStalemate, setIsStalemate] = useState(() => gameRef.current.isStalemate());
  const [isDraw, setIsDraw] = useState(() => gameRef.current.isDraw());
  const [promotionState, setPromotionState] = useState<{
    isOpen: boolean;
    color: 'w' | 'b' | null;
    pendingMove: { from: SquareName; to: SquareName } | null;
  }>({ isOpen: false, color: null, pendingMove: null });

  const syncBoard = useCallback(() => {
    const game = gameRef.current;
    setBoard(getBoardLayout(game));
    setTurn(game.turn());
    setIsCheck(game.inCheck());
    setIsCheckmate(game.isCheckmate());
    setIsStalemate(game.isStalemate());
    setIsDraw(game.isDraw());
  }, []);

  const resetGame = useCallback(() => {
    gameRef.current.reset();
    setSelectedSquare(null);
    setLegalMoves([]);
    setPromotionState({ isOpen: false, color: null, pendingMove: null });
    syncBoard();
  }, [syncBoard]);

  const selectSquare = useCallback(
    (squareName: SquareName) => {
      const game = gameRef.current;

      if (game.isGameOver()) {
        return;
      }

      const piece = game.get(squareName as Square);
      const currentTurn = game.turn();

      if (selectedSquare === squareName) {
        setSelectedSquare(null);
        setLegalMoves([]);
        return;
      }

      if (piece?.color === currentTurn) {
        setSelectedSquare(squareName);
        setLegalMoves(getLegalMoves(game, squareName));
        return;
      }

      if (selectedSquare) {
        return;
      }

      setSelectedSquare(null);
      setLegalMoves([]);
    },
    [selectedSquare],
  );

  const handlePromotionSelect = useCallback((promotion: PromotionPiece) => {
    const game = gameRef.current;
    const pendingMove = promotionState.pendingMove;

    if (!pendingMove) {
      return;
    }

    try {
      const move = game.move({
        from: pendingMove.from as Square,
        to: pendingMove.to as Square,
        promotion,
      });

      if (move) {
        setPromotionState({ isOpen: false, color: null, pendingMove: null });
        setSelectedSquare(null);
        setLegalMoves([]);
        syncBoard();
      }
    } catch (err) {
      setPromotionState({ isOpen: false, color: null, pendingMove: null });
    }
  }, [promotionState.pendingMove, syncBoard]);

  const handleSquareClick = useCallback(
    (squareName: SquareName) => {
      const game = gameRef.current;

      if (game.isGameOver() || promotionState.isOpen) {
        return;
      }

      // If a piece is already selected and the clicked square is a legal destination, attempt the move
      if (selectedSquare && legalMoves.includes(squareName)) {
        if (isPromotionMove(game, selectedSquare, squareName)) {
          setPromotionState({
            isOpen: true,
            color: game.turn(),
            pendingMove: { from: selectedSquare, to: squareName },
          });
          setSelectedSquare(null);
          setLegalMoves([]);
          return;
        }

        try {
          const moveOptions = buildMoveOptions(game, selectedSquare, squareName);
          const preMove = game.move(moveOptions);

          if (preMove) {
            setSelectedSquare(null);
            setLegalMoves([]);
            syncBoard();
          }
          // If move is null, it was rejected — leave board unchanged
        } catch (err) {
          // Unexpected error from chess.js — ignore and keep board unchanged
          // Could log in future iterations
        }

        return;
      }

      // Otherwise fall back to selection behavior
      selectSquare(squareName);
    },
    [legalMoves, promotionState.isOpen, selectedSquare, selectSquare, syncBoard],
  );

  return {
    game: gameRef.current,
    board,
    selectedSquare,
    legalMoves,
    turn,
    isCheck,
    isCheckmate,
    isStalemate,
    isDraw,
    promotionState,
    syncBoard,
    resetGame,
    selectSquare,
    handleSquareClick,
    handlePromotionSelect,
  };
}
