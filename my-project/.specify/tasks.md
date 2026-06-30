# Implementation Tasks: Chess Game MVP

**Input**: Approved specification and implementation plan for the Chess Game MVP

**Scope**: Minimal, runnable two-player chess web app using React, TypeScript, Vite, and chess.js. No AI, multiplayer, authentication, timers, themes, animations, sounds, or move history.

## Phase 1 – Project Setup

### Task T001 — Initialize the React, TypeScript, and Vite project
- **Objective**: Create a working frontend app shell so the project can be launched locally.
- **Files to create or modify**:
  - package.json
  - vite.config.ts
  - tsconfig.json
  - src/main.tsx
  - src/App.tsx
  - src/index.css
- **Detailed implementation steps**:
  1. Create the Vite React TypeScript project structure in the project root.
  2. Add the base app entry files and a minimal root component.
  3. Confirm the development server starts without errors.
- **Dependencies**: None
- **Definition of Done**:
  - The app starts in the browser.
  - The initial page renders a basic placeholder view.
- **Manual verification steps**:
  1. Run the dev server.
  2. Open the local app URL.
  3. Confirm the page loads and displays the initial app shell.

### Task T002 — Install dependencies, scaffold folders, and add static assets
- **Objective**: Add the chess engine and project structure needed for gameplay, and place the board and piece image assets.
- **Files to create or modify**:
  - package.json
  - src/components/
  - src/hooks/
  - src/types/
  - src/utils/
  - src/styles/
  - public/pieces/
  - public/board/
- **Detailed implementation steps**:
  1. Install React, TypeScript, Vite, and chess.js.
  2. Create the component, hook, type, utility, and style folders from the implementation plan.
  3. Add or place the board and piece PNG/JPG assets in the public asset folders.
  4. Add a simple asset mapping utility for piece image paths.
- **Dependencies**: T001
- **Definition of Done**:
  - The project has the planned folder structure.
  - chess.js is available in the app.
  - Board and piece assets are present and referenceable from the UI.
- **Manual verification steps**:
  1. Confirm the dependency install completes successfully.
  2. Check that the expected folders and asset files exist.
  3. Verify the app still starts after the structure is added.

## Phase 2 – Board UI

### Task T003 — Build the responsive board container and page layout
- **Objective**: Create the main board layout shell with a responsive container and minimal control area.
- **Files to create or modify**:
  - src/components/App.tsx
  - src/components/ChessBoard.tsx
  - src/styles/App.module.css
  - src/styles/ChessBoard.module.css
- **Detailed implementation steps**:
  1. Create the top-level layout with a board area and a simple status/control section.
  2. Make the board container responsive with a square aspect ratio.
  3. Add basic spacing and layout styles for desktop and mobile screens.
- **Dependencies**: T002
- **Definition of Done**:
  - The board area renders as a visible square container.
  - The layout is usable on narrow and wide screens.
- **Manual verification steps**:
  1. Load the app and confirm the board container appears.
  2. Resize the browser window and confirm the layout adjusts.

### Task T004 — Render the 64 board squares and board background
- **Objective**: Display the visual chessboard with alternating colored squares and a board background.
- **Files to create or modify**:
  - src/components/ChessBoard.tsx
  - src/components/Square.tsx
  - src/styles/Square.module.css
  - src/styles/ChessBoard.module.css
- **Detailed implementation steps**:
  1. Render an 8x8 grid of squares.
  2. Apply alternating light and dark square colors.
  3. Use the board background image or a simple board color fallback.
  4. Ensure each square has a stable visual structure for later piece placement.
- **Dependencies**: T003
- **Definition of Done**:
  - The board shows 64 squares in a correct 8x8 layout.
  - The background and square colors appear correctly.
- **Manual verification steps**:
  1. Confirm the board shows a full 8x8 grid.
  2. Check that light and dark squares alternate as expected.

## Phase 3 – Piece Rendering

### Task T005 — Load piece images and render pieces in the starting position
- **Objective**: Display the chess pieces using the static image assets and place them in the initial board state.
- **Files to create or modify**:
  - src/components/Piece.tsx
  - src/utils/pieceMap.ts
  - src/types/chess.ts
  - src/components/ChessBoard.tsx
- **Detailed implementation steps**:
  1. Create a small piece component that renders the correct image for a piece code.
  2. Add a utility that maps chess.js piece codes to image paths.
  3. Derive the initial board layout from chess.js and render the starting pieces.
- **Dependencies**: T004
- **Definition of Done**:
  - All 32 pieces appear on the board in the standard starting positions.
  - Each piece uses a PNG/JPG asset.
- **Manual verification steps**:
  1. Open the app and confirm the initial setup matches a standard chess starting board.
  2. Ensure each piece displays an image and not a placeholder.

### Task T006 — Synchronize the UI with chess.js board state
- **Objective**: Ensure the board UI reflects the current game state from chess.js rather than a hardcoded snapshot.
- **Files to create or modify**:
  - src/hooks/useChessGame.ts
  - src/components/App.tsx
  - src/components/ChessBoard.tsx
- **Detailed implementation steps**:
  1. Create a small hook or state container that keeps a chess.js instance in memory.
  2. Derive the current board layout from the game instance.
  3. Re-render the board whenever the game state changes.
- **Dependencies**: T005
- **Definition of Done**:
  - The app renders from the live chess.js board state.
  - The initial board is driven by the game engine rather than static markup.
- **Manual verification steps**:
  1. Confirm the board still shows the initial setup after reload.
  2. Check that the rendered state can be updated from the game logic in later tasks.

## Phase 4 – Core Gameplay

### Task T007 — Implement piece selection and legal move highlighting
- **Objective**: Allow players to select a friendly piece and see which squares are legal destinations.
- **Files to create or modify**:
  - src/components/Square.tsx
  - src/components/ChessBoard.tsx
  - src/hooks/useChessGame.ts
  - src/styles/Square.module.css
- **Detailed implementation steps**:
  1. Add click/tap handling to each square.
  2. When a friendly piece is selected, compute legal moves using chess.js.
  3. Highlight legal destination squares visually.
  4. Allow selecting a different friendly piece to replace the current selection.
- **Dependencies**: T006
- **Definition of Done**:
  - Selecting a piece shows its legal moves.
  - Clicking an empty or enemy square that is not legal does not change the board.
- **Manual verification steps**:
  1. Click a white pawn and confirm the legal forward squares are highlighted.
  2. Click a knight and confirm its legal moves appear.
  3. Click an illegal destination and confirm nothing changes.

### Task T008 — Execute valid moves, reject invalid moves, and switch turns
- **Objective**: Make the board respond to legal moves, keep illegal moves unchanged, and update turn order.
- **Files to create or modify**:
  - src/hooks/useChessGame.ts
  - src/components/App.tsx
  - src/components/ChessBoard.tsx
- **Detailed implementation steps**:
  1. On a legal destination click, call chess.js to apply the move.
  2. Reject moves that are not legal and leave the board unchanged.
  3. Update the board state after a successful move.
  4. Switch the active turn automatically through chess.js.
  5. Handle captures by removing the captured piece from the board.
- **Dependencies**: T007
- **Definition of Done**:
  - Legal moves update the board correctly.
  - Illegal moves are ignored.
  - Turn changes after each valid move.
- **Manual verification steps**:
  1. Make a simple pawn move and confirm the piece changes squares.
  2. Attempt an illegal move and verify the board stays the same.
  3. Confirm the turn indicator changes from white to black after a valid move.

## Phase 5 – Special Chess Rules

### Task T009 — Implement castling and en passant
- **Objective**: Support the special move rules that players expect in a complete chess game.
- **Files to create or modify**:
  - src/hooks/useChessGame.ts
  - src/components/ChessBoard.tsx
- **Detailed implementation steps**:
  1. Use chess.js to validate castling moves and apply them when the player selects the correct destination.
  2. Ensure the rook moves with the king when castling is executed.
  3. Support en passant by validating the move through chess.js and removing the captured pawn correctly.
- **Dependencies**: T008
- **Definition of Done**:
  - Castling works for a legal king-side or queen-side castle.
  - En passant works when the position allows it.
- **Manual verification steps**:
  1. Create a legal castling position and verify the king and rook move correctly.
  2. Set up an en passant position and verify the capture is executed correctly.

### Task T010 — Implement pawn promotion with a selection dialog
- **Objective**: Allow a pawn that reaches the last rank to promote to a valid piece type.
- **Files to create or modify**:
  - src/components/PromotionDialog.tsx
  - src/styles/PromotionDialog.module.css
  - src/hooks/useChessGame.ts
  - src/components/App.tsx
- **Detailed implementation steps**:
  1. Detect when a move results in a promotion requirement.
  2. Open a simple promotion dialog with the available promotion options.
  3. Apply the selected promotion through chess.js once the player chooses a piece.
  4. Keep the move pending until the selection is made.
- **Dependencies**: T009
- **Definition of Done**:
  - A pawn reaching the last rank triggers a promotion prompt.
  - The selected promotion piece is applied correctly.
- **Manual verification steps**:
  1. Move a pawn to the last rank and confirm the dialog appears.
  2. Choose a promotion piece and verify it is rendered on the board.

## Phase 6 – Game State

### Task T011 — Display game status for turn, check, checkmate, stalemate, and draw
- **Objective**: Show players the current game state clearly after each move.
- **Files to create or modify**:
  - src/components/GameStatus.tsx
  - src/styles/GameStatus.module.css
  - src/hooks/useChessGame.ts
  - src/components/App.tsx
- **Detailed implementation steps**:
  1. Derive status values from chess.js for turn, check, checkmate, stalemate, and draw.
  2. Display a simple status message in the UI.
  3. Disable further moves when the game is over.
- **Dependencies**: T010
- **Definition of Done**:
  - The UI shows the current turn and endgame state correctly.
  - Checkmate, stalemate, and draw are surfaced in the interface.
- **Manual verification steps**:
  1. Put the board in check and confirm the status updates.
  2. Reach checkmate or stalemate and confirm the correct message appears.

## Phase 7 – Controls

### Task T012 — Add a restart button and reset the board state
- **Objective**: Let players reset the current game and start a new match quickly.
- **Files to create or modify**:
  - src/components/ControlPanel.tsx
  - src/styles/ControlPanel.module.css
  - src/hooks/useChessGame.ts
  - src/components/App.tsx
- **Detailed implementation steps**:
  1. Add a restart button to the UI.
  2. Reset the chess.js instance and clear temporary UI state like selection and promotion prompts.
  3. Restore the initial board and turn state.
- **Dependencies**: T011
- **Definition of Done**:
  - Clicking restart restores the starting board and turn.
  - Any selection or promotion dialog state is cleared.
- **Manual verification steps**:
  1. Make a move, click restart, and confirm the board returns to the initial position.
  2. Verify any open promotion dialog closes after the reset.

## Phase 8 – Polish

### Task T013 — Improve responsiveness and clean up the implementation
- **Objective**: Make the app feel polished and maintainable without adding scope beyond the MVP.
- **Files to create or modify**:
  - src/styles/*
  - src/components/*
  - src/hooks/useChessGame.ts
- **Detailed implementation steps**:
  1. Refine spacing, sizing, and tap targets for mobile screens.
  2. Simplify repeated logic and remove any temporary placeholders.
  3. Keep the component structure clear and focused on the MVP.
- **Dependencies**: T012
- **Definition of Done**:
  - The UI remains responsive and easy to use.
  - The code structure is clearer and easier to maintain.
- **Manual verification steps**:
  1. Test the app on a narrow viewport and confirm controls remain usable.
  2. Review the app for obvious layout or usability issues.

### Task T014 — Final manual validation and bug fixing
- **Objective**: Verify the full MVP end to end and resolve any remaining issues before delivery.
- **Files to create or modify**:
  - Any files touched by discovered issues
- **Detailed implementation steps**:
  1. Exercise the main gameplay flows manually: opening position, moves, captures, castling, en passant, promotion, checkmate, stalemate, and restart.
  2. Fix any discovered issues that block core functionality.
  3. Confirm the app remains runnable after each fix.
- **Dependencies**: T013
- **Definition of Done**:
  - The app is playable from start to finish without blocking issues.
  - Core MVP behaviors work correctly in the browser.
- **Manual verification steps**:
  1. Play a complete local game from start to finish.
  2. Confirm legal and illegal moves behave correctly.
  3. Confirm restart and endgame states behavior