# Chess Game MVP Constitution

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
Prioritize functionality over visual polish. Use static PNG/JPG assets for board and pieces. Avoid animations, advanced graphics, and unnecessary styling. The interface should be minimal, responsive, and easy to use.

### VI. Code Quality
Follow TypeScript best practices. Keep files focused on a single responsibility. Remove unused code immediately and avoid duplicate logic. Prefer clarity over cleverness.

### VII. Testing
Verify each implemented feature manually before moving to the next task. Focus testing on gameplay correctness, not full coverage. Make sure core rules behave as expected.

### VIII. Performance
Optimize only when there is a measurable need. Avoid premature optimization and keep the implementation straightforward unless performance is clearly required.

### IX. Scope Control
The initial version must include:
- Chess board
- Piece rendering
- Legal move validation
- Turn management
- Check and checkmate detection
- Stalemate detection
- Castling
- En passant
- Pawn promotion
- Restart game

The following are explicitly out of scope unless requested later:
- AI opponent
- Multiplayer
- User authentication
- Online play
- Move history
- Timers
- Sound effects
- Themes
- Animations
- Game persistence
- Analytics

## Constraints
- The product goal is a fully playable chess MVP delivered quickly with clean, understandable code.
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
This constitution supersedes other practices for the Chess Game MVP. Any deviation from the principles must be explicitly documented and justified. Complexity must be justified by direct MVP value. All implementation decisions should be checked against this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-06-28 | **Last Amended**: 2026-06-28
