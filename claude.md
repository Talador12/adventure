# Adventure — Project Status

See `AGENTS.md` for architecture, build commands, and conventions.

## Rules
- Update this file with every commit.

## Branch Strategy
- `staging` — active development
- `main` — stable releases

## Current Focus

AI DM shipped — enriched narration, NPC dialogue, multiplayer broadcast. Next: map system improvements or persistent campaigns.

## Working Items

### Character management (save/load)
- **Status:** Done
- Edit mode at `/characters/:id/edit` — pre-fills all fields, updates in place
- KV-backed server persistence with localStorage fallback
- API: `GET /api/characters`, `PUT /api/characters`, `DELETE /api/characters/:charId`
- Server sync: loads from server on mount (merges), saves on every change (fire-and-forget)
- Edit button + clickable name on Home page character cards
- KV namespaces: `CHARACTERS` binding in dev/staging/production (IDs need `wrangler kv namespace create`)

### Wire Discord profile data into WebSocket
- **Status:** Done
- GameContext fetches `/api/auth/me` on mount, populates `currentPlayer` with Discord id, display name, avatar URL
- WebSocket join message now sends `avatar` alongside `username`
- Lobby player list renders Discord avatars (falls back to initial-circle for unauthenticated)
- Follow-up: add avatars to chat messages (ChatMessage interface + ChatPanel rendering)

### WebSocket dev connectivity
- **Status:** Done
- Root cause: Vite proxy missing `ws: true` + useWebSocket hardcoded port 8787 in dev
- Fix: Added `ws: true` to Vite proxy config, changed useWebSocket to use same-origin (page host/port)
- WebSocket now routes through Vite proxy in dev, eliminating cross-port issues
- Requires `make dev` (starts both Vite + Wrangler) for WebSocket features

### AI DM via Workers AI
- **Status:** Done
- `/api/dm/narrate` — enriched with full party context (backstory, personality, bonds, flaws, alignment, condition, appearance)
- `/api/dm/npc` — NPC dialogue endpoint: named NPCs with role, personality, conversational memory
- System prompts demand specificity: named NPCs, sensory details, subverted expectations, character-reactive narration
- DM narration broadcasts via WebSocket (`dm_narrate`, `dm_npc`, `dm_action` message types in Lobby DO)
- All players see the same DM text in multiplayer — no more client-only narration
- NPC Talk mode in Game.tsx: purple-themed UI, name/role inputs, dialogue history tracking
- ChatPanel: NPC messages render purple-themed (vs amber for DM), shows NPC name as label
- Narration panel: NPC dialogue styled distinctly from DM narration and combat log
- Game.tsx `apiBase()` fixed to use Vite proxy (same-origin) instead of hardcoded port 8787
- Scene name field in toolbar feeds location context into AI prompts

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
- Character edit mode (`/characters/:id/edit`) with KV persistence and server sync
- Discord identity wired into WebSocket: avatars + display names in lobby player list
- WebSocket dev connectivity: Vite proxy `ws: true` + same-origin connection (no more hardcoded port 8787)
- AI DM: enriched narration with full party context, NPC dialogue system, multiplayer broadcast via WebSocket
- Removed `.claude/` scratchpad, updated to two-file AI Working Context
