# Adventure

_An immersive AI-enhanced virtual tabletop built on Cloudflare for fantasy campaigns._
_Think Baldur's Gate 3 but never-ending — AI DM, human or AI players, full RP._

---

## Quick Start

```bash
make fresh   # install deps, build, start dev servers
# or
make start   # quick: kill + build + dev
```

Frontend: http://localhost:5173 | Backend: http://localhost:8787

## What's Built

### Authentication

- Discord OAuth with JWT session cookies
- Profile dropdown with avatar, theme toggle, sign out

### Multiplayer (WebSocket)

- Lobby Durable Object: real-time player sessions, chat, dice broadcasts
- `useWebSocket` hook: auto-reconnect with exponential backoff
- Live player list with join/leave notifications
- All dice rolls broadcast to every connected client with full animation

### Dice System

- SVG dice shapes for each die type (d4 tetrahedron, d6 cube, d8 octahedron, d10 pentagonal, d12 dodecahedron, d20 icosahedron)
- Animated roll: shape tumbles while numbers cycle, then settles on result
- Critical Hit (max roll): golden glow burst + star burst + "CRITICAL HIT!" text
- Critical Fail (rolled 1): red crack effect + screen shake + "CRITICAL FAIL!"
- Remote roll sync: when any player rolls, all clients see the full animation
- Roll history with crit/fail badges, player name, and associated unit

### Combat

- Initiative bar: turn tracker with HP bars, color-coded health (green/yellow/red)
- Player/AI controller labels on each unit
- Click a unit to associate dice rolls with it (DICE badge)

### Lobby

- Live chat with styled message bubbles, roll announcements, system messages
- Dice rolling that syncs across all connected players
- Doodle pad: canvas drawing tool with color picker, brush sizes, eraser, clear
- Invite link with copy-to-clipboard

### Game Board

- Full-height layout: initiative bar → game board → dice + chat sidebar
- WebSocket connection status indicator
- Session roll counter

### UI

- Toast notification system (success/error/warning/info)
- Dark/light mode toggle (Tailwind v4 `@custom-variant`)
- Cloudflare orange (#F38020) accent throughout

---

## Roadmap

### Character Creation (In Progress)

| Feature | Status |
| ------- | ------ |
| Core character creation page (race, class, stats, appearance, background, alignment) | Done |
| SVG portrait system — composable race+class+appearance vector art | Done |
| 4d6-drop-lowest stat rolling with animation + stat swap | Done |
| AI portrait generation (Workers AI / FLUX) | Done |
| Portrait upload with AES-256-GCM encryption at rest | Done |
| Name generator (syllable tables per race) + AI translation | Done |
| Tavern-style backdrop for character creation page | In Progress |
| Race selection cards with inline SVG portraits | In Progress |
| Class selection cards with inline SVG portraits | In Progress |
| Warm card styling + gold/orange selection highlights | In Progress |
| Wire Discord profile data into WebSocket sessions | Planned |
| Character management (edit, delete, level up from Home page) | Planned |

### AI Dungeon Master (Planned)

| Feature | Status |
| ------- | ------ |
| Workers AI narration + NPC dialogue | Planned |
| Encounter generation | Planned |
| DM tools: god mode, roll override, visibility toggles | Planned |

### Map System (Planned)

| Feature | Status |
| ------- | ------ |
| Procedural map generation | Planned |
| Fog of war | Planned |
| Draggable tokens + grid | Planned |

### Audio (Planned)

| Feature | Status |
| ------- | ------ |
| Sound FX (howler.js): mood music, spell effects, combat sounds | Planned |

### Multiplayer Enhancements (Planned)

| Feature | Status |
| ------- | ------ |
| Shared doodle pad over WebSocket | Planned |
| Discord integration for voice/chat | Planned |

### Backlog

- Persistent campaigns via KV/R2 (save/load game state)
- Character sheets with live updates and autosave
- Drop-in/drop-out guest characters
- Roleplay dashboard with notes and voice-style prompts
- Particle effects for spells and combat
- Dynamic difficulty: real-time control over encounter challenge
- Modular engine for homebrew rules and third-party mods
- Accessibility-friendly "Low-FX" mode
- Better Discord profile display (banners, metadata)

---

## Tech Stack

| Layer    | Technology                                 |
| -------- | ------------------------------------------ |
| Frontend | React 19, Vite, Tailwind CSS v4            |
| Backend  | Cloudflare Workers (Hono), Durable Objects |
| Auth     | Discord OAuth, jose JWT                    |
| Realtime | WebSocket via Durable Objects              |
| Build    | Makefile, wrangler, vite                   |
| Hosting  | Cloudflare Pages                           |

**Lean deps policy:** React is the only framework. clsx, tailwind-merge, lucide-react, fontawesome, react-router-dom. No animation libraries — all CSS keyframes + canvas.

---

## Project Structure

```
_worker.ts              Worker entry (Hono router, Discord OAuth, DO proxy)
src/
  lobby.ts              Lobby Durable Object (WebSocket multiplayer)
  main.tsx              React entry (BrowserRouter, providers)
  contexts/
    GameContext.tsx      Shared state: players, units, dice rolls
  hooks/
    useWebSocket.ts     Reconnecting WebSocket hook
  pages/
    Home.tsx            Landing page, auth, campaign create/join
    Lobby.tsx           Pre-game room: players, chat, dice, doodle
    Game.tsx            Combat: initiative, board, dice sidebar, chat
  components/
    chat/ChatPanel.tsx  Real-time chat with roll announcements
    combat/InitiativeBar.tsx  Turn tracker with HP bars
    dice/DiceRoller.tsx Animated dice with remote roll support
    dice/DiceShapes.tsx SVG shapes for each die type
    lobby/DoodlePad.tsx Canvas drawing tool
    ui/                 button, card, toast
  lib/utils.ts          cn() helper (clsx + tailwind-merge)
```

---

## Dev Commands

```bash
make fresh       # full reset: upgrade, install, format, build, dev
make start       # quick: kill + build + dev
make dev         # vite :5173 + wrangler :8787
make build       # build frontend + worker
make format      # prettier
make commit M='msg'  # format, build, commit, push
make deploy-prod     # deploy to production
make help        # show all commands
```

---

## License

(c) 2025 Keith Adler. All Rights Reserved.
