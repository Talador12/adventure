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
- **Build**: Makefile, wrangler, vite
- **Deps to keep lean**: clsx, tailwind-merge, lucide-react, fontawesome, react-router-dom

## Architecture

- `_worker.ts` - Worker entry (Hono router for /api/\*, static asset serving, DO proxy)
- `src/lobby.ts` - Lobby Durable Object (WebSocket: chat, dice rolls, player management)
- `src/main.tsx` - React entry (BrowserRouter, ToastProvider)
- `src/pages/` - Home (landing, auth), Lobby (pre-game room, dice), Game (combat, board)
- `src/components/` - ui/ (button, card, toast), dice/ (DiceRoller), combat/ (InitiativeBar)
- `wrangler.toml` - Worker/DO/Pages config
- Secrets live in `.dev.vars` (gitignored), never in wrangler.toml or source

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
- DiceRoller: d4-d20 with animated rolls, nat20/nat1 celebration, roll history
- InitiativeBar: combat turn tracker with HP bars, color-coded health
- Toast system: custom lightweight notifications (no framework dep)
- Lobby DO: WebSocket-ready with chat/roll/player join-leave
- Worker: Hono API routes for auth, DO proxy, SPA fallback
- CI/CD: Cloudflare Pages handles deploy (GitHub Actions removed)

## Design Principles

- Keep it lean. React is the only framework. Everything else is custom or stdlib.
- Prefer CSS (Tailwind) over JS animation libraries. Use `<style>` tags for component-local keyframes.
- No unnecessary dependencies. If it can be done in 50 lines of code, don't npm install it.
- This is a fun project. Ship fast, iterate, make it feel good.

## TODO (from README)

- WebSocket lobby with voice/text chat for multiplayer
- AI prompts to Workers AI for narration, NPC dialogue, map generation
- Discord integration for voice/chat
- Character creation and management
- DM tools: god mode, narration, difficulty control
- Map system: procedural generation, fog of war, tokens
- Sound FX via howler.js
- Better discord profile display (banners, metadata)
