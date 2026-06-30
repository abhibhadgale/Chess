# Chess Game Constitution

## Core Principles

### I. MVP First
Implement only what is required for a complete playable chess game. Avoid over-engineering, unnecessary abstractions, or features that do not directly support core gameplay. Anything outside the baseline chess MVP is postponed.

### II. Simplicity
Prefer the simplest solution that satisfies the requirement. Keep components small, clear, and easy to understand. Avoid complex patterns unless a simpler alternative cannot meet the need.

### III. Use Proven Libraries
Use `chess.js` for chess rules, move generation, and validation. Do not implement chess rules from scratch. Reuse well-tested libraries for rules enforcement and core game behavior.

### IV. Incremental Development
Every task must leave the application in a runnable state. Build in small independent increments. After each completed step, verify the application still works.

### V. UI Philosophy
Prioritize usability and a polished single-player chess experience. The interface should be clear, responsive, and easy to use, with visual cues that support gameplay. Use styling and visual feedback that enhance play without introducing unnecessary complexity.

### VI. Code Quality
Follow TypeScript best practices. Keep files focused on a single responsibility. Remove unused code immediately and avoid duplicate logic. Prefer clarity over cleverness.

### VII. Testing
Verify each implemented feature manually before moving to the next task. Focus testing on gameplay correctness, not full coverage. Make sure core rules behave as expected.

### VIII. Performance
Optimize only when there is a measurable need. Avoid premature optimization and keep the implementation straightforward unless performance is clearly required.

### IX. Scope Control
The Version 0.1 scope includes:

#### User Interface & Visuals
- Board coordinates
- Toggle coordinates
- Responsive board
- Fullscreen mode
- Selected square highlight
- Last move highlight
- Legal move indicators
- Capture indicators
- Check highlight
- King-in-check animation
- Move destination highlight

#### Move History
- Scrollable move history
- Algebraic notation
- Move numbers
- Current move highlight
- Click-to-review moves
- Auto-scroll latest move

#### Navigation
- Undo
- Redo
- Restart
- New Game
- Restart confirmation
- Jump to first move
- Previous move
- Next move
- Jump to latest move

#### Gameplay Helpers
- Legal move visualization
- Selected piece highlighting
- Auto deselection
- Drag & Drop
- Click-to-move
- Promotion dialog
- Current turn indicator
- Check notification
- Checkmate banner
- Draw banner

#### Clock
- Optional timer
- 1, 3, 5, 10, 15 minute presets
- Unlimited mode
- Pause
- Resume
- Flag fall detection

#### Game Information
- Captured pieces
- Material count
- Game status
- Move counter
- Halfmove counter
- Fullmove counter

#### Settings
- Toggle coordinates
- Toggle legal moves
- Toggle move history
- Toggle captured pieces
- Timer settings
- Reset settings

#### Mobile Experience
- Touch-friendly controls
- Responsive layout
- Fullscreen support
- Improved promotion dialog

#### Statistics
- Total moves
- Game duration
- Pieces captured
- Winner
- Result

#### Local Storage
- Persist user settings
- Restore previous settings
- Optional resume unfinished game

The following are explicitly out of scope:
- AI opponent
- Online multiplayer
- User accounts
- Authentication
- Cloud synchronization
- Online analysis
- Chess engine analysis
- Puzzles
- Training mode
- Rating system
- Database backend

## Constraints
- The product goal is a polished local single-player chess experience delivered incrementally with clean, understandable code.
- The project must use `chess.js` for all chess rule handling and validation.
- Keep the architecture lightweight and avoid introducing infrastructure for out-of-scope features.

## Development Workflow
Always follow:
1. Specify → define the next feature or requirement.
2. Plan → decide the smallest runnable increment.
3. Tasks → break it into actionable steps.
4. Implementation → code, verify, and keep the app working.

Tasks should remain small enough to complete in 20–60 minutes and produce a working state before moving to the next task.

## Governance
This constitution supersedes other practices for the Chess Game Version 0.1. Any deviation from the principles must be explicitly documented and justified. Complexity must be justified by direct MVP value. All implementation decisions should be checked against this constitution.

**Version**: 0.1.0 | **Ratified**: 2026-06-28 | **Last Amended**: 2026-06-28
