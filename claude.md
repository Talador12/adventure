# Adventure — Project Status

See `AGENTS.md` for architecture, build commands, and conventions.

## Rules
- Update this file with every commit.

## Branch Strategy
- `staging` — active development
- `main` — stable releases

## What's Built

### Core Platform
- Home page with Discord OAuth, campaign create/join, theme toggle
- Lobby with live player list, chat, synced dice rolling, doodle pad, invite link
- Game page with initiative bar, dice roller, chat, battle map (grid/tokens/fog-of-war)
- Character sheets, AI enemy turns, encounter difficulty, combat end conditions
- WebSocket multiplayer via Durable Objects (chat, dice, draw, player management)
- Toast notification system

### Dice System
- SVG shapes per die type (d4/d6/d8/d10/d12/d20)
- Animated rolls with tumble physics, crit/fumble visual effects
- Server-authoritative: server generates roll value, all clients animate to it
- Remote roll sync via imperative `playRemoteRoll()` API
- Roll queuing with 400ms gap between animations

### Character Creation (`/create`)
- Tavern-themed UI with warm gradients and wood grain overlay
- 8 races with inline SVG portraits and stat bonuses
- 12 classes with inline SVG portraits and hit die display
- BG3-style appearance: skin/hair/eye palettes per race, hair styles, scars, markings, facial hair
- Name generator (syllable tables per race) + AI fantasy name translation
- 4d6-drop-lowest stat rolling with animation, race bonuses, click-to-swap
- 13 backgrounds with skill/feature info, 9-grid alignment selector
- Personality traits, ideals, bonds, flaws, backstory (all resize-y textareas)
- Character preview with computed HP/AC/gold

### Portrait System (tabbed UI under Appearance)
- **Default**: Live SVG from race/class/appearance — zero server dependency
- **AI Generate**: 8 art styles (Classic Fantasy, Watercolor, Anime, Gothic, Storybook, Cel-Shaded, Realistic, Painterly) via Workers AI FLUX-1-schnell
- **Upload**: File upload with optional AI analysis (Llama 3.2 Vision) for appearance description

### AI Features (Workers AI)
- **AI Build Character**: one-click full character generation with anti-cliche prompts, smart stat allocation by AI priority order
- **AI Personality**: generates coherent trait/ideal/bond/flaw groups from character context
- **AI Backstory**: generates backstories with named NPCs, inciting incidents, sensory details, unresolved mysteries
- **AI Portrait Description**: Llama 3.2 Vision analyzes uploaded images for physical descriptions

### Character Export
- Formats: Adventure JSON, Markdown (download + clipboard), Foundry VTT (dnd5e actor JSON), Fantasy Grounds (5e XML), Printable HTML (new tab), D&D Beyond (clipboard text)
- Export modal with format picker, method badges, status feedback
- Can export from character creation form before saving
- Coming soon: Pathfinder 2e, Forbidden Lands, Savage Worlds (need system conversion)

### SVG Portrait System (`src/lib/portrait.ts`)
- `buildRacePortraitSvg()` — composable 128x100 SVG: background + particles + face + hair + scars + markings + facial hair + outfit
- 8 race face SVGs with unique features, 12 class outfit/weapon SVGs
- Color customization via regex replacement, overlay generators for each feature
- Extracted from CharacterCreate.tsx alongside `names.ts` and `palettes.ts`

### Makefile
- `PRODUCTION_RELEASE := false` gate on deploy/release commands
- Port variables, commands: `login`, `whoami`, `open`, `logs`, `status`, `deploy`, `release`
- `deploy` targets staging, `release` is gated production

## What's Next

### Near Term
- Character management — save/load characters, character list, selection screen
- Wire Discord profile data (avatars, display names) into WebSocket sessions
- AI DM via Workers AI — narration, NPC dialogue, encounter generation
- Feed AI appearance descriptions into game context for DM narration

### Medium Term
- Map system improvements — procedural generation, better fog of war
- DM tools — god mode, roll override, visibility toggles, event injection
- Persistent campaigns via KV/R2 (save/load game state)
- Character sheets with live updates and autosave

### Backlog
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
