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

## TODO

### Next Up

- Character creation and management
- Wire Discord profile data (avatars, display names) into WebSocket sessions
- AI DM via Workers AI: narration, NPC dialogue, encounter generation
- Map system: procedural generation, fog of war, tokens, grid
- DM tools: god mode, roll override, visibility toggles, event injection
- Sound FX (howler.js): mood music, spell effects, combat sounds
- Shared doodle pad over WebSocket (broadcast strokes to all players)
- Discord integration for voice/chat

### Backlog

- Persistent campaigns via KV/R2 (save/load game state)
- Character sheets with live updates and autosave
- Drop-in/drop-out guest characters
- Roleplay dashboard with notes and voice-style prompts
- Particle effects for spells and combat
- Dynamic difficulty control
- Modular engine for homebrew rules and mods
- Accessibility "Low-FX" mode
- Better Discord profile display (banners, metadata)
