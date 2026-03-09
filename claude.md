# Adventure - AI-Enhanced Virtual Tabletop

## Working Directory

`/Users/kadler/Documents/repos/github/adventure`

## Repo

- GitHub: https://github.com/Talador12/adventure (public, open source)
- Branch: `staging` is active development, `main` is stable
- Owner: Keith Adler (Talador12)

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4 (no extra UI frameworks)
- **Backend**: Cloudflare Workers (Hono router), Durable Objects (WebSocket multiplayer)
- **Auth**: Discord OAuth via jose JWT
- **Realtime**: WebSocket via Durable Objects (Lobby DO)
- **Build**: Makefile, wrangler, vite
- **Deps to keep lean**: clsx, tailwind-merge, lucide-react, fontawesome, react-router-dom

## Architecture

- `_worker.ts` - Worker entry (Hono router for /api/\*, /api/ws WebSocket upgrade, static asset serving, DO proxy)
- `src/lobby.ts` - Lobby Durable Object (WebSocket: chat, dice rolls with full metadata, player management, join/leave events)
- `src/main.tsx` - React entry (BrowserRouter, ToastProvider, GameProvider)
- `src/contexts/GameContext.tsx` - Shared state: players (human/AI), units, dice rolls, unit selection for roll association
- `src/hooks/useWebSocket.ts` - Reconnecting WebSocket hook with exponential backoff, typed message dispatch
- `src/pages/` - Home (landing, auth), Lobby (players, chat, dice, doodle), Game (combat, board, dice, chat)
- `src/components/chat/ChatPanel.tsx` - Real-time chat with roll announcements, system messages, styled bubbles
- `src/components/dice/DiceRoller.tsx` - Animated dice with SVG shapes, crit/fumble effects, remote roll support via imperative handle
- `src/components/dice/DiceShapes.tsx` - SVG outlines for d4/d6/d8/d10/d12/d20
- `src/components/combat/InitiativeBar.tsx` - Turn tracker with HP bars, player/AI labels, unit selection
- `src/components/lobby/DoodlePad.tsx` - Canvas drawing tool with colors, brush sizes, eraser
- `src/components/ui/` - button, card, toast (all custom, no framework deps)
- `src/lib/portrait.ts` - SVG portrait system (composable race/class/appearance portraits)
- `src/lib/names.ts` - Fantasy name generator (syllable tables per race)
- `src/lib/palettes.ts` - Skin/hair/eye color palettes per race
- `src/lib/export.ts` - Character export (JSON, Markdown, Foundry VTT, Fantasy Grounds, HTML, D&D Beyond)
- `wrangler.toml` - Worker/DO/Pages config
- Secrets live in `.dev.vars` (gitignored), never in wrangler.toml or source

## WebSocket Protocol (Lobby DO)

Client sends:

- `{ type: "join", username, avatar? }` — join room, get welcome + player list
- `{ type: "chat", message }` — send chat message
- `{ type: "roll", die, sides, unitId?, unitName? }` — request dice roll (server generates result)
- `{ type: "ping" }` — keepalive

Server broadcasts:

- `{ type: "welcome", playerId, players, timestamp }` — sent to joining player only
- `{ type: "player_joined", username, playerId, players, timestamp }` — broadcast to all
- `{ type: "player_left", username, playerId, players, timestamp }` — broadcast to all
- `{ type: "chat", playerId, username, message, timestamp }` — broadcast to all
- `{ type: "roll_result", playerId, username, die, sides, value, isCritical, isFumble, unitId?, unitName?, timestamp }` — broadcast to all

## Remote Dice Roll Flow

1. Player clicks die → sends `roll` to WebSocket (or generates locally if offline)
2. Server generates result, broadcasts `roll_result` to ALL clients
3. Every client receives `roll_result` → calls `diceRef.playRemoteRoll()` imperative API
4. DiceRoller plays the full tumble animation then lands on the server's value
5. Queued rolls play back-to-back with 400ms gap between animations

## Dev Commands

```
make fresh   # full reset + install + build + dev
make start   # quick: kill + build + dev
make dev     # vite :5173 + wrangler :8787
make build   # build frontend + worker
make commit M='msg'  # format, build, commit, push
make help    # show all commands
```

## Secrets

- DISCORD_CLIENT_ID / DISCORD_CLIENT_SECRET: `.dev.vars` (local) + wrangler secrets (deployed)
- JWT_SECRET: env var, falls back to dev default locally
- Run `make secrets-development` to set up local secrets
- NEVER commit secrets to wrangler.toml or source code

## Current Status

- Home page: Discord OAuth, campaign create/join, theme toggle, profile dropdown
- React Router: /, /lobby/:roomId, /game/:roomId
- Lobby page: live player list, chat, synced dice rolling, doodle pad, invite link, connection status
- Game page: initiative bar, dice roller, chat — all WebSocket-connected
- DiceRoller: SVG shapes per die type, animated rolls, crit/fumble FX, remote roll sync, roll history with attribution
- InitiativeBar: turn tracker with HP bars, player/AI labels, unit selection for dice association
- ChatPanel: styled messages, roll announcements with crit/fumble, system join/leave messages
- DoodlePad: canvas drawing with colors, brushes, eraser
- Lobby DO: WebSocket multiplayer with chat, dice, player management
- Worker: Hono API routes for auth, /api/ws for WebSocket, DO proxy, SPA fallback
- Toast system: custom lightweight notifications
- CI/CD: Cloudflare Pages handles deploy

## Design Principles

- Keep it lean. React is the only framework. Everything else is custom or stdlib.
- Prefer CSS (Tailwind) over JS animation libraries. Use injected `<style>` for component-local keyframes.
- No unnecessary dependencies. If it can be done in 50 lines of code, don't npm install it.
- Dice rolls go through WebSocket so all players see animations. Server is the source of truth for roll values.
- This is a fun project. Ship fast, iterate, make it feel good.

## Completed: AI Character Generation System

Full AI-powered character building pipeline via Workers AI:

### AI Build Character (top-of-page banner)
- "Roll Character" button with optional campaign context textarea
- `POST /api/character/generate` — returns name, race, class, background, alignment, statPriority, personalityTraits, ideals, bonds, flaws, backstory, appearance suggestions, concept pitch
- Anti-cliche prompt engineering: demands unexpected but viable builds, named NPCs, subverted class expectations
- After generation: sets all form fields, triggers stat rolling, smart-allocates stats by AI priority order via `useEffect` watching `pendingStatPriority`

### AI Personality Generation
- "Roll with AI" button on Personality & Backstory section header
- `POST /api/character/suggest-personality` — generates traits + ideals + bonds + flaws as coherent group
- Uses existing character data (race, class, background, alignment, stats) for context

### AI Backstory Generation
- "Generate with AI" / "Rewrite with AI" button on Backstory header
- `POST /api/backstory/generate` — anti-cliche prompt with named NPCs, inciting incidents, sensory details, unresolved mysteries

## Completed: Character Export System

### Export Module (`src/lib/export.ts`)
- Zero deps, all string templates + Blob downloads
- Formats: JSON (native), Markdown (download + clipboard), Foundry VTT (dnd5e actor JSON), Fantasy Grounds (5e XML), Printable HTML (new tab with print button), D&D Beyond (formatted text to clipboard)
- Format registry (`EXPORT_FORMATS`) with availability flags
- Pathfinder 2e, Forbidden Lands, Savage Worlds marked as "coming soon"
- `runExport(formatId, char)` dispatcher

### Export Modal (in CharacterCreate.tsx)
- Triggered via "Export Character Sheet" button below "Create Character"
- Modal with format list, method badges (Download/Clipboard/Preview), descriptions
- Builds preview Character from form state (works before creating)
- Status feedback with auto-dismiss on success

## Completed: Personality & Backstory Section

- Personality traits (3 rows), Ideals/Bonds/Flaws (3-column, `min-h-[80px]`, `resize-y`, `text-sm`)
- Backstory (8 rows, `min-h-[160px]`, `resize-y`)
- Pulled out of alignment column into own full-width section
- "Starting Alignment" label with subtext about alignment shifting through play

## Completed: Makefile Rewrite

- `PRODUCTION_RELEASE := false` gate on deploy commands
- Port variables, new commands: `login`, `whoami`, `open`, `logs`, `status`
- `deploy` defaults to staging, `release` is gated production

## Completed Work: Character Creation UI Redesign

### Reference
`assets/characters.jpg` — tavern-backdrop card grid with illustrated portraits per race/class.

### What Was Built
Full tavern-themed character creation page (CharacterCreate.tsx, 1466 lines):
- **Tavern backdrop** — warm `#2a1f14`->`#14100a` gradient, wood grain overlay
- **Race cards (8)** — inline SVG portraits, stat bonuses, `#F38020` selection glow
- **Class cards (12)** — inline SVG portraits, hit die display
- **Appearance system** — BG3-style live preview: skin/hair/eye palettes per race, 6 hair styles, scars, face markings, facial hair
- **Name generator** — syllable-table per race + `/api/name/translate` for fantasy names
- **Portrait system** — unified tabbed UI (Default SVG / AI Generate / Upload), 8 art styles, AI image description for uploads
- **Stat rolling** — 4d6-drop-lowest with animation, race bonuses, stat swap
- **Background + starting alignment** — 13 backgrounds, 9-grid alignment (labeled as starting, can shift), personality textareas (expand on focus)
- **Character preview** — summary card with computed HP/AC/gold

### SVG Portrait System (`src/lib/portrait.ts`)
- `buildRacePortraitSvg()` — composable 128x100 SVG: background + particles + face + hair + scars + markings + facial hair + outfit
- `buildMiniPortraitDataUrl()` — convenience wrapper returning base64 data URL
- `buildRaceDefs()` — 8 races with unique face SVGs, skin/hair/eye palettes
- `buildClassDefs()` — 12 classes with unique outfit + weapon SVGs
- `buildHairSvg/ScarSvg/FaceMarkingSvg/FacialHairSvg` — overlay generators
- Color customization via regex replacement on hardcoded face SVG strings
- Palette data in `src/lib/palettes.ts` (SKIN_PALETTES, HAIR_PALETTES, EYE_PALETTES)
- Name generator in `src/lib/names.ts` (randomFantasyName, syllable tables by race)

## Completed: Portrait System Redesign

Single consolidated portrait section under Appearance with three tabbed modes:

### Default Portrait (SVG)
- Live-updating SVG from `buildRacePortraitSvg()` reflecting race, class, and all appearance selections
- Zero server dependency — renders entirely client-side
- Used as fallback when AI/upload aren't available

### AI Generate
- 8 art styles (no copyrighted names): Classic Fantasy, Watercolor, Anime Fantasy, Dark Gothic, Storybook, Cel-Shaded, Realistic, Painterly
- Style IDs map to detailed prompts in `ART_STYLE_PROMPTS` (`_worker.ts`)
- Prompt includes: race traits, class attire, stats-derived physique, appearance details (hair style, scars, markings, facial hair), and selected art style
- Workers AI FLUX-1-schnell for image generation

### Upload Image
- User uploads PNG/JPEG/WebP (max 1.5MB)
- AES-256-GCM encrypted at rest in KV
- AI inference via `/api/portrait/describe` — Llama 3.2 Vision analyzes the uploaded image and returns a 2-3 sentence physical description
- Falls back to Llama 3.1 text-only if vision model unavailable
- Description displayed in UI; non-blocking (image works without AI)

### API Endpoints (Worker — `_worker.ts`)
- `POST /api/portrait/generate` — accepts `style` (art style ID) and `appearance` (hair/scars/markings/facial hair), Workers AI FLUX-1-schnell
- `POST /api/portrait/describe` — accepts `image` (data URL), `race`, `class`; returns `{ description }` using Llama 3.2 Vision
- `POST /api/portrait/upload` — AES-256-GCM encrypted KV storage
- `GET /api/portrait/:id` — decrypt and serve
- `POST /api/character/generate` — full AI character builder (name, race, class, background, alignment, stats priority, personality, backstory, appearance)
- `POST /api/character/suggest-personality` — AI personality group generation (traits, ideals, bonds, flaws)
- `POST /api/backstory/generate` — AI backstory with anti-cliche prompt engineering
- `POST /api/name/translate` — fantasy name translation via Workers AI

## Completed: Lobby Invite Link Fix

- [x] Show full invite URL (removed `truncate max-w-[200px]`)
- [x] Clipboard emoji at end of link text instead of separate "Copy" button
- [x] Entire link section is one clickable `<button>` that copies to clipboard
- [x] Hover effects on link text + emoji scale

## Completed: Module Extraction Refactor

- [x] Commit all uncommitted work on staging (e44982c)
- [x] Extract portrait system from CharacterCreate.tsx into `src/lib/portrait.ts` (~350 lines)
- [x] Extract name generator into `src/lib/names.ts` (~30 lines)
- [x] Extract palette data into `src/lib/palettes.ts` (~35 lines)
- CharacterCreate.tsx reduced from 1466 to ~1050 lines

## TODO

### Next Up

- Wrangler auth (`make login`) — AI features need Workers AI bindings to work locally
- Character management (save/load characters, character list, character selection)
- Export formats: Pathfinder 2e, Forbidden Lands, Savage Worlds (system conversion needed)
- Wire Discord profile data (avatars, display names) into WebSocket sessions
- AI DM via Workers AI: narration, NPC dialogue, encounter generation
- Feed AI appearance description into game context for DM narration
- Map system: procedural generation, fog of war, tokens, grid
- DM tools: god mode, roll override, visibility toggles, event injection

### Backlog

- Persistent campaigns via KV/R2 (save/load game state)
- Character sheets with live updates and autosave
- Drop-in/drop-out guest characters
- Portrait gallery: save/browse generated portraits, remix styles, compare versions
- Sound FX: mood music, spell effects, combat sounds
- Shared doodle pad over WebSocket (broadcast strokes to all players)
- Discord integration for voice/chat
- Roleplay dashboard with notes and voice-style prompts
- Particle effects for spells and combat
- Dynamic difficulty control
- Modular engine for homebrew rules and mods
- Accessibility "Low-FX" mode
- Better Discord profile display (banners, metadata)
