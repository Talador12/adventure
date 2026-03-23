# Adventure VTT

_A D&D 5e virtual tabletop that feels like Baldur's Gate 3 married Roll20 and they raised a child on Cloudflare._

**270+ features. 91 releases. Zero heavy dependencies. Pure vibes.**

---

## Who are you?

| You are... | You want to... | Start here |
|-----------|----------------|------------|
| **A Player** | Roll dice and hit things | `make play` — you're done |
| **A DM** | Run a campaign with AI tools | `make play`, then `make dm-guide` |
| **A Developer** | Understand or extend the code | `make dev`, then `make test` |
| **A Designer** | Tweak the look and feel | `make dev`, edit `src/styles.css` |
| **A Modder** | Add homebrew content | `make dev`, see `src/data/` |

---

## Play right now

```bash
git clone https://github.com/Talador12/adventure.git
cd adventure
make play
```

Open http://localhost:5173. Click "Play as Guest" or sign in with Discord/Google/GitHub. Create a campaign. Invite your party. Roll initiative.

---

## What makes this different

**No subscriptions. No electron. No 200MB downloads.** It's a web app that runs on Cloudflare Workers. Your browser is the client. A Durable Object is your game server. WebSockets sync everything in real-time.

**AI is optional, not required.** Three-tier architecture: local AI (Ollama, LM Studio) → cloud AI (Workers AI) → graceful offline fallback. Every feature works without AI — it just gets smarter with it.

**The juice is real.** Rainbow confetti on nat 20s. Kill streak announcements (RAMPAGE! LEGENDARY!). Floating damage numbers. Weather particles. Heartbeat pulse on death saves. This VTT has *personality*.

---

## Feature Highlights

### Combat
- D&D 5e with 13 damage types, conditions, death saves, concentration tracking
- Initiative with tiebreakers, drag-and-drop reorder, lock toggle
- Theater mode, combat replay with mini-map, turn timer
- Token auras (radius circles), attack indicators (animated lines)
- HP flytext (floating damage/heal numbers), kill streak tracker
- Mass heal/damage tool, quick combat auto-resolver
- Encounter XP budget (live progress bar during combat)

### Battle Map
- BSP procedural dungeon generator + 6 presets + community sharing
- Fog of war with Re-fog tool, shape tools (circle/rect), opacity slider
- Terrain/fog brush size (1x1, 3x3, 5x5), undo/redo
- Multi-floor with stairs, environmental lighting zones, hex toggle
- Weather particle effects (rain, snow, sandstorm, fog)
- Drag-drop image import, annotations, map pins

### Characters
- Full creation with 8 races, 12 classes, multiclass support
- D&D Beyond + Foundry VTT import (with inventory + spells)
- AI portrait generation (FLUX), custom spellbook, portrait gallery
- Spell slot recovery (Wizard Arcane Recovery, Warlock Pact Magic)
- Character backup (AES-256-GCM encrypted), player trading
- AI backstory continuation ("Continue Story" in journal)

### AI (optional)
- 3-tier: local → cloud → offline. Model-agnostic, vendor-free
- 6 DM personality presets, streaming narration (SSE)
- NPC memory (KV-persisted), AI encounter balancing
- AI trap generator, lore generation, encounter recap
- Campaign recap (summarize last N sessions for returning players)

### Multiplayer
- WebSocket via Durable Objects, voice chat (WebRTC)
- Roll sync policies (smooth/strict/auto), latency heatmap
- Per-player fog, spectator mode, hot-seat mode
- Lobby with drag-and-drop seat reorder, readiness check
- DM screen (BroadcastChannel sync), mobile companion app

### World Building
- Collaborative wiki (5 categories, markdown, inter-page links)
- Quest tracker with world map pins, campaign calendar
- Relationship graph (canvas nodes, AI suggestions)
- 4 campaign templates, session scheduling with countdown

### Polish
- 4 dice sound packs (Classic, Crystal, Wooden, Metal)
- Ambient sound mixer (layer multiple moods with volume sliders)
- Spell effect templates library (save/load custom AoE shapes)
- Keyboard shortcut overlay (press `?`), performance dashboard (`Ctrl+Shift+P`)
- Party loot split calculator, encounter template save/load/export/import
- PWA install prompt, Service Worker offline cache

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Cloudflare Workers (Hono router) |
| Realtime | Durable Objects (WebSocket) |
| Auth | Discord + Google + GitHub OAuth, jose JWT |
| AI | Workers AI (Llama, FLUX), any OpenAI-compatible local server |
| Storage | KV, R2, D1 |
| Build | Makefile, wrangler, vite |
| Tests | Vitest (155 tests), Playwright (14 E2E), GitHub Actions CI |

**Zero animation libraries.** All motion is CSS keyframes + canvas. Lean deps: React, clsx, tailwind-merge, lucide-react, react-router-dom.

---

## Dev Commands

```bash
make quickstart     # first time? interactive walkthrough
make play           # install + start (players and DMs)
make dev            # vite :5173 + wrangler :8787 (developers)
make test           # 155 tests (unit + worker)
make test-e2e       # 14 Playwright browser tests
make typecheck      # 0 TypeScript errors
make dm-guide       # DM quick reference
make help           # full command reference (persona-grouped)
```

---

## Project Structure

```
_worker.ts                  Hono router, 20+ API endpoints, unified AI dispatch
src/lobby.ts                Lobby Durable Object (WebSocket multiplayer)
src/pages/
  Game.tsx                  Main game (~2950 lines): combat, narration, all views
  Lobby.tsx                 Pre-game room: seats, chat, dice, doodle pad
  Home.tsx                  Landing: auth, campaigns, character management
src/components/combat/
  BattleMap.tsx             Battle map (~2700 lines): terrain, fog, lighting, theater
  CharacterSheet.tsx        Full character sheet with spellbook + journal
src/components/game/
  DMSidebar.tsx             DM tools: encounters, NPCs, loot, ambient, templates
  CritCelebration.tsx       Rainbow confetti on nat 20
  KillStreak.tsx            DOUBLE KILL → RAMPAGE → LEGENDARY!
src/hooks/
  useSoundFX.ts             21 Web Audio API functions + ambient mixer + dice packs
  useGameWebSocket.ts       Game-specific WebSocket message handler
src/lib/
  aiClient.ts               Unified AI: aiChat(), aiChatStream(), aiImage()
  backup.ts                 Character backup/restore (AES-256-GCM)
  combatRecorder.ts         Combat event recording for replay
  dungeonGen.ts             BSP procedural dungeon generator
src/data/
  spells.ts                 Spell list, slot tables, caster classification
  items.ts                  Shop items, 12 class starting equipment presets
  lootTables.ts             4-tier weighted random loot
  wildMagic.ts              50-entry d100 table
```

---

## License

MIT

---

*Roll for initiative.*
