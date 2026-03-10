# Adventure — Project Status

See `AGENTS.md` for architecture, build commands, and conventions.

## Rules
- Update this file with every commit.

## Branch Strategy
- `staging` — active development
- `main` — stable releases

## Current Focus

Map system overhaul shipped (procedural dungeons, vision fog, terrain tools). Next: inventory/loot system or multiplayer map sync.

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
- **Status:** Done
- Procedural dungeon generation: room-and-corridor algorithm (5-9 rooms, L-shaped corridors, auto-doors, hazard scattering)
- 7 terrain types: floor, wall, water, difficult (rubble), door, pit, void — each with distinct visual rendering
- Vision-based fog of war: Bresenham raycasting from player tokens (6-cell / 30ft radius), walls block line of sight
- Explored cells stay dimly visible after players move away (memory of what was seen)
- DM mode toggle: see through fog, view entire map
- Terrain painting tools: select, wall, floor, water, rubble, door, pit, erase — click or drag to paint
- Generate button: create new random dungeon (resets explored fog + repositions tokens)
- Smart token spawning: players spawn on floor tiles on left side, enemies on right
- Tokens can't be placed on walls (snap-back on drop)
- Zoom (scroll wheel, +/- buttons) and pan (alt+drag) with reset button
- Expanded grid: 24x18 (120x90ft) from 20x14
- Terrain legend in footer

### Persistent campaigns
- **Status:** Done
- `CAMPAIGNS` KV namespace in dev/staging/production
- API: `GET/PUT /api/campaign/:roomId` (game state), `GET/POST /api/campaigns` (user's campaign list), `DELETE /api/campaigns/:roomId`
- Campaign state: dmHistory, sceneName, selectedCharacterId, combatLog, timestamps
- Game.tsx: auto-saves to server (debounced 2s), loads on mount (server > localStorage merge)
- Registers campaigns on first adventure start, auto-selects character on resume
- Home page: "Your Campaigns" card with Play/Lobby/Delete buttons, sorted by creation date
- localStorage still used for instant persistence, server for cross-device sync

### Reactive character state + death saving throws
- **Status:** Done
- `selectedCharacter` in Game.tsx was a stale local copy — replaced with `selectedCharacterId` + derived lookup from GameContext's `characters` array
- All combat damage, XP, gold, rest, level-up changes now reflect immediately in UI
- Player unit stats (HP/maxHp/AC) synced with character via useEffect
- Character HP bar in narration panel header: portrait, name, level, HP bar (color-coded), XP, gold, condition badge
- Death saving throws: full D&D 5e implementation (nat 20 = regain 1 HP, nat 1 = 2 failures, 3 successes = stabilize, 3 failures = death)
- Death save UI: prominent panel with success/failure pips, Roll Death Save button
- Enemy attacks on unconscious characters: auto-crit = 2 death save failures
- Stabilized + dead condition notices in narration panel

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
- Zero TypeScript errors: fixed all 8 pre-existing type errors in _worker.ts and GameContext.tsx
- Discord avatars in chat: ChatPanel renders avatars next to messages, Lobby DO broadcasts avatars
- DM history persistence: localStorage-backed per room, narration + scene survive page refresh
- Persistent campaigns: CAMPAIGNS KV, server-synced game state, "Your Campaigns" on Home page
- Combat rewards: XP + gold on combat end, level-up notification, DM aftermath narration
- Rest system: Short Rest (hit die + CON heal) and Long Rest (full HP restore) toolbar buttons
- Clear narration history button with confirm dialog, HP/gold status in toolbar
- Removed `.claude/` scratchpad, updated to two-file AI Working Context
- Reactive character state: selectedCharacter derived from GameContext, not stale local copy
- Character HP bar in narration panel header with color-coded health, XP, gold, condition
- Death saving throws: D&D 5e rules (nat 20/1, 3 successes/failures, enemy crits on unconscious)
- Map system overhaul: procedural dungeons, vision-based fog, terrain painting, zoom/pan, DM mode
