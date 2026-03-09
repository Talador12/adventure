# Adventure — Project Status

See `AGENTS.md` for architecture, build commands, and conventions.

## Rules
- Update this file with every commit.

## Branch Strategy
- `staging` — active development
- `main` — stable releases

## Current Focus

Character creation complete. Next: character persistence, multiplayer identity, and AI DM.

## Working Items

### Character management (save/load)
- **Status:** Todo
- Save characters to KV/R2, character list page, selection screen
- Required before characters can persist across sessions

### Wire Discord profile data into WebSocket
- **Status:** Todo
- Use Discord avatars and display names in lobby/game
- Currently WebSocket sessions don't carry Discord identity

### AI DM via Workers AI
- **Status:** Todo
- Narration, NPC dialogue, encounter generation
- Feed character appearance descriptions into DM context
- Use Llama for text generation

### Map system improvements
- **Status:** Backlog
- Procedural generation, better fog of war
- DM tools: god mode, roll override, visibility toggles

### Persistent campaigns
- **Status:** Backlog
- Save/load game state via KV/R2
- Character sheets with live updates and autosave

## Backlog

- Export formats: Pathfinder 2e, Forbidden Lands, Savage Worlds
- Portrait gallery — save/browse generated portraits, remix styles
- Sound FX — mood music, spell effects, combat sounds
- Shared doodle pad over WebSocket (broadcast strokes)
- Discord integration for voice/chat
- Particle effects for spells and combat
- Dynamic difficulty control
- Modular engine for homebrew rules and mods
- Accessibility "Low-FX" mode
- Drop-in/drop-out guest characters

## Completed

- Full character creation: 8 races, 12 classes, BG3-style appearance, stat rolling, export
- SVG portrait system with AI generation (FLUX) and upload (Llama 3.2 Vision)
- AI character builder, personality generator, backstory generator
- Dice system with SVG shapes, animation, crit/fumble FX, server-authoritative sync
- Lobby with WebSocket multiplayer (chat, dice, draw, player management)
- Game page with initiative bar, battle map, fog of war
- Discord OAuth, campaign create/join, theme toggle
- Character export: Adventure JSON, Markdown, Foundry VTT, Fantasy Grounds, HTML, D&D Beyond
- Removed `.claude/` scratchpad, updated to two-file AI Working Context
