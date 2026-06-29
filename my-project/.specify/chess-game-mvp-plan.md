# Implementation Plan: Chess Game MVP

**Branch**: `###-chess-game-mvp` | **Date**: 2026-06-28 | **Spec**: `/my-project/.specify/chess-game-mvp-spec.md`

**Input**: Feature specification from `/my-project/.specify/chess-game-mvp-spec.md`

## Summary

Build a minimal, playable two-player chess web application using React, TypeScript, Vite, and chess.js. The focus is on clean architecture, rule correctness, responsive board rendering, and simplicity: no extra libraries beyond the required chess engine and minimal input handling.

## Technical Context

**Language/Version**: TypeScript with React on Vite

**Primary Dependencies**: React, React DOM, chess.js

**Storage**: N/A (in-memory game state only)

**Testing**: Manual verification; lightweight functional tests if available

**Target Platform**: Browser web app (desktop and mobile)

**Project Type**: Frontend web app

**Performance Goals**: Fast render on modern browsers, responsive board load within a few hundred milliseconds, minimal UI update overhead

**Constraints**: Minimal dependencies, no server-side logic, no AI/online play, UI must remain functional and minimal

**Scale/Scope**: Single-page MVP for local two-player chess

## Constitution Check

- Minimal dependency use: only React, TypeScript, Vite, and chess.js
- Simple frontend-only architecture: yes
- Project remains runnable after each milestone: yes
- No unnecessary abstractions or extra libraries: yes

## Project Structure

```text
my-project/src/
├── components/
│   ├── App.tsx
│   ├── ChessBoard.tsx
│   ├── Square.tsx
│   ├── Piece.tsx
│   ├── PromotionDialog.tsx
│   ├── GameStatus.tsx
│   └── ControlPanel.tsx
├── hooks/
│   └── useChessGame.ts
├── types/
│   └── chess.ts
├── utils/
│   ├── chessHelpers.ts
│   └── pieceMap.ts
└── styles/
    ├── App.module.css
    ├── ChessBoard.module.css
    ├── Square.module.css
    ├── PromotionDialog.module.css
    ├── GameStatus.module.css
    └── ControlPanel.module.css

public/
└── pieces/
    ├── wP.png
    ├── wR.png
    ├── wN.png
    ├── wB.png
    ├── wQ.png
    ├── wK.png
    ├── bP.png
    ├── bR.png
    ├── bN.png
    ├── bB.png
    ├── bQ.png
    └── bK.png
```

**Structure Decision**: Use a single frontend project under `my-project/src`, with separate folders for components, hooks, types, utils, and styles. This keeps the app simple, maintainable, and aligned with MVP scope.

## Component Architecture

- `App`
  - Owns game state, chess.js instance, and main event handlers.
  - Loads `useChessGame` and passes derived state to UI components.
  - Renders `ChessBoard`, `GameStatus`, `ControlPanel`, and `PromotionDialog` as needed.

- `ChessBoard`
  - Renders the 8×8 board grid.
  - Receives board layout, selection, legal moves, and click handlers.
  - Uses square color and highlight state to show valid interactions.

- `Square`
  - Renders an individual board square.
  - Shows highlight states: selected, legal destination, or last move.
  - Contains a `Piece` when occupied.
  - Handles clicks/taps and calls back to `App`.

- `Piece`
  - Renders a piece image for a given piece code.
  - Keeps presentation logic small and reusable.

- `PromotionDialog`
  - Displays only when a pawn promotion choice is required.
  - Offers selectable promotion piece types.
  - Returns the chosen promotion piece to `App`.

- `GameStatus`
  - Displays current turn and game status messages.
  - Handles check, checkmate, stalemate, and draw notifications.

- `ControlPanel`
  - Contains the restart button and optional help text.
  - Keeps control actions isolated from board rendering.

## State Management

- The `chess.js` instance lives in `App` or inside `useChessGame` via `useRef`.
  - This keeps the authoritative game rules outside React render cycles.

- Board state is derived from `chess.js` and stored as a lightweight layout representation.
  - Example derived state: `board`, `selectedSquare`, `legalMoves`, `status`, `promotionRequest`.

- Selected pieces and legal moves are managed by:
  - storing `selectedSquare`
  - computing `legalMoves` from `chess.moves({ square, verbose: true })`
  - highlighting destination squares based on that list

- Game status updates by querying `chess.js` after moves:
  - `turn`, `in_check`, `in_checkmate`, `in_stalemate`, `in_draw`
  - Status text is derived and passed to `GameStatus`

- React state is sufficient because:
  - the app is small and local
  - the `chess.js` instance provides the rule engine
  - React props can carry state to the UI without Redux
  - adding global state libraries would add unnecessary complexity

## Asset Management

- Store piece PNG assets in `public/pieces/`.
- Use a consistent naming pattern: `wP.png`, `wR.png`, `wN.png`, `wB.png`, `wQ.png`, `wK.png`, `bP.png`, ..., `bK.png`.
- Map chess piece codes to public asset URLs in a small utility.
- Prefer CSS Modules or plain CSS for styling.
- Avoid runtime asset imports if plain static URL references are sufficient.

## Game Flow

- Application startup
  - Initialize `chess.js` with `new Chess()`.
  - Derive the initial board state and turn.

- Board rendering
  - Render 8 ranks from 8 to 1.
  - Each square displays the correct piece image when occupied.
  - Keep the board square with responsive CSS.

- Piece selection
  - Click/tap a square with the current player’s piece.
  - Compute legal moves and set selection state.

- Legal move highlighting
  - Highlight squares from `legalMoves`.
  - Do not allow illegal destinations to perform a move.

- Move execution
  - On legal destination click, call `chess.move({ from, to, promotion })`.
  - If promotion is required, open `PromotionDialog` before finalizing.
  - Update board and status after the move.

- Turn switching
  - Allow `chess.js` to handle turn swaps.
  - Refresh the displayed turn from derived state.

- Special moves
  - Let `chess.js` enforce castling, en passant, and promotion.
  - For promotion, pause the move until the player chooses a piece.

- End-game detection
  - After each move, derive end-state from `chess.js`.
  - Display checkmate, stalemate, or draw messages.
  - Disable further move actions once the game ends.

- Restart game
  - Reset `chess.js` with `game.reset()`.
  - Clear selection, highlights, and promotion prompts.
  - Restore initial board and turn state.

## Error Handling

- Invalid moves
  - Reject non-legal moves by checking against `legalMoves`.
  - Keep the board unchanged.

- Invalid drag/drop actions
  - Prefer click/tap input for MVP.
  - If drag/drop is added later, ignore invalid drops and revert the piece.

- Promotion selection
  - Keep the promotion dialog open until a choice is made.
  - Do not finalize the move until selection occurs.

- Unexpected library errors
  - Wrap key `chess.js` calls in `try/catch`.
  - Log unexpected errors and show a minimal recovery message.
  - Allow restart to reset the game safely.

## Responsiveness

- Use a responsive board container such as `width: min(100%, 640px)` and `aspect-ratio: 1 / 1`.
- Render squares with `grid-template-columns: repeat(8, 1fr)` and `aspect-ratio: 1 / 1`.
- Stack status and controls above/below the board on narrow screens.
- Keep tap targets large enough for mobile interaction.

## Performance

- Keep rendering efficient by storing only minimal UI state.
- Avoid unnecessary rerenders by passing precise props.
- Use `React.memo` for `Square` only if profiling shows benefit.
- Keep move validation inside `chess.js` instead of custom logic.
- Compute legal moves only when a piece is selected.

## Testing Strategy

- Use manual verification after each milestone.
- Validate key gameplay flows:
  - starting position
  - legal move highlighting
  - turn switching
  - check/checkmate/stalemate
  - castling, en passant, promotion
  - restart behavior
- Keep a simple regression checklist tied to the user stories.
- Optionally add lightweight unit tests for derived board state and status mapping if the toolchain already supports it.

## Development Milestones

1. Bootstrap Vite + React + TypeScript project and install `chess.js`.
2. Render the 8×8 board and piece starting positions.
3. Add selection and legal move highlighting.
4. Execute moves and switch turns correctly.
5. Display game status and handle end-game conditions.
6. Implement pawn promotion flow and validate castling/en passant.
7. Add restart control and clear transient state.
8. Finish responsiveness, verify mobile layout, and ensure the app remains functional after each milestone.
