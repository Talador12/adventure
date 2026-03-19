# Adventure — D&D 5e Virtual Tabletop

## Rules
- Update `claude.md` with every commit.
- Keep this file (`AGENTS.md`) stable — architecture and conventions only.
- **Always keep the local dev server running** (`make dev`) so the user can view the app at `http://localhost:5173` and give live feedback as you iterate. If the dev server isn't running, start it before making changes. After code changes, Vite hot-reloads automatically — no restart needed unless you change `_worker.ts` or `wrangler.toml`.

## Quick Reference

```bash
make fresh   # full reset + install + build + dev
make start   # quick: kill + build + dev
make dev     # vite :5173 + wrangler :8787
make build   # build frontend + worker
make lint    # prettier check
make deploy  # deploy to staging (production gated by PRODUCTION_RELEASE)
make help    # show all commands
```

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4 (no extra UI frameworks)
- **Backend**: Cloudflare Workers (Hono router), Durable Objects (WebSocket multiplayer)
- **Auth**: Discord OAuth via jose JWT
- **Realtime**: WebSocket via Durable Objects (Lobby DO)
- **AI**: Workers AI (Llama, FLUX) for portraits, character generation, backstory
- **Build**: Makefile, wrangler, vite
- **Runtime deps**: clsx, tailwind-merge, lucide-react, fontawesome, react-router-dom

## Architecture

| File | Purpose |
|------|---------|
| `_worker.ts` | Worker entry — Hono router for /api/*, WebSocket upgrade, static assets, DO proxy |
| `src/lobby.ts` | Lobby Durable Object — WebSocket: chat, dice, player management |
| `src/main.tsx` | React entry — BrowserRouter, ToastProvider, GameProvider |
| `src/contexts/GameContext.tsx` | Shared state: players, units, dice rolls, characters |
| `src/hooks/useWebSocket.ts` | Reconnecting WebSocket with exponential backoff |
| `src/pages/Home.tsx` | Landing, Discord OAuth, campaign create/join |
| `src/pages/Lobby.tsx` | Player list, chat, dice, doodle pad, invite link |
| `src/pages/Game.tsx` | Combat, battle map, dice, chat, character sheets |
| `src/pages/CharacterCreate.tsx` | Tavern-themed character creation with AI features |
| `src/components/chat/ChatPanel.tsx` | Real-time chat with roll announcements |
| `src/components/dice/DiceRoller.tsx` | Animated SVG dice, crit/fumble FX, remote sync |
| `src/components/dice/DiceShapes.tsx` | SVG outlines for d4/d6/d8/d10/d12/d20 |
| `src/components/combat/InitiativeBar.tsx` | Turn tracker with HP bars, unit selection |
| `src/components/lobby/DoodlePad.tsx` | Canvas drawing with colors, brushes, eraser |
| `src/components/ui/` | button, card, toast (all custom, no framework deps) |
| `src/lib/portrait.ts` | SVG portrait system — composable race/class/appearance |
| `src/lib/names.ts` | Fantasy name generator (syllable tables per race) |
| `src/lib/palettes.ts` | Skin/hair/eye color palettes per race |
| `src/lib/export.ts` | Character export — JSON, Markdown, Foundry VTT, Fantasy Grounds, HTML, D&D Beyond |
| `src/lib/mapUtils.ts` | Shared spatial types + pure functions: terrain, pathfinding, LOS, range parsing |
| `wrangler.toml` | Worker/DO/Pages config |

## Design Principles

- Keep it lean. React is the only framework. Everything else is custom or stdlib.
- Prefer CSS (Tailwind) over JS animation libraries.
- No unnecessary dependencies. If it can be done in 50 lines, don't npm install it.
- Dice rolls go through WebSocket — server is source of truth for roll values.
- AI features use Workers AI (no external API keys for core functionality).
- Ship fast, iterate, make it feel good.

## WebSocket Protocol (Lobby DO)

Client sends:
- `{ type: "join", username, avatar? }` — join room
- `{ type: "chat", message }` — chat message
- `{ type: "roll", die, sides, unitId?, unitName? }` — request dice roll
- `{ type: "dm_narrate", narration }` — broadcast DM narration to all players
- `{ type: "dm_npc", npcName, dialogue }` — broadcast NPC dialogue to all players
- `{ type: "dm_action", characterName, action }` — broadcast player action to all players
- `{ type: "ping" }` — keepalive

Server broadcasts:
- `{ type: "welcome", playerId, players, timestamp }` — to joining player only
- `{ type: "player_joined", username, playerId, players, timestamp }`
- `{ type: "player_left", username, playerId, players, timestamp }`
- `{ type: "chat", playerId, username, message, timestamp }`
- `{ type: "roll_result", playerId, username, die, sides, value, isCritical, isFumble, unitId?, unitName?, timestamp }`
- `{ type: "dm_narrate", playerId, username, narration, timestamp }` — DM narration
- `{ type: "dm_npc", playerId, username, npcName, dialogue, timestamp }` — NPC dialogue
- `{ type: "dm_action", playerId, username, characterName, action, timestamp }` — player action

## API Endpoints (Worker)

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/portrait/generate` | AI portrait via FLUX (accepts style + appearance) |
| POST | `/api/portrait/describe` | Image analysis via Llama 3.2 Vision |
| POST | `/api/portrait/upload` | Encrypted portrait storage (AES-256-GCM in KV) |
| GET | `/api/portrait/:id` | Decrypt and serve portrait |
| POST | `/api/character/generate` | Full AI character builder |
| POST | `/api/character/suggest-personality` | AI personality group (traits/ideals/bonds/flaws) |
| POST | `/api/backstory/generate` | AI backstory generation |
| POST | `/api/name/translate` | Fantasy name translation |
| GET | `/api/characters` | Load user's characters from KV (requires auth) |
| PUT | `/api/characters` | Save user's characters to KV (full replace) |
| DELETE | `/api/characters/:charId` | Delete a single character from KV |
| POST | `/api/dm/narrate` | AI DM narration (full party context, scene, history) |
| POST | `/api/dm/encounter` | AI encounter generator (enemy stats + description) |
| POST | `/api/dm/npc` | AI NPC dialogue (named NPC, role, conversational memory) |
| GET | `/api/campaign/:roomId` | Load campaign game state from KV |
| PUT | `/api/campaign/:roomId` | Save campaign game state to KV |
| GET | `/api/campaigns` | List user's saved campaigns |
| POST | `/api/campaigns` | Register a campaign for the user |
| DELETE | `/api/campaigns/:roomId` | Delete a campaign and its state |

## Secrets

- `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET`: `.dev.vars` (local) + wrangler secrets (deployed)
- `JWT_SECRET`: env var, falls back to dev default locally
- Run `make secrets-development` to set up local dev secrets
- NEVER commit secrets to `wrangler.toml` or source code

## AI Working Context

Two files per repo:
- **`AGENTS.md`** (this file) — how to work on this project. Stable, changes slowly.
- **`claude.md`** — what we're working on. Status, roadmap, what's next. Update every commit.
