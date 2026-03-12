# Adventure — Project Status

See `AGENTS.md` for architecture, build commands, and conventions.

## Rules
- Update this file with every commit.

## Branch Strategy
- `staging` — active development
- `main` — stable releases

## Product Philosophy: Player-First, AI-Optional

Adventure is a **player-driven** virtual tabletop. AI is a tool in the toolbox, not the headline.

**Core principle:** Any table configuration from 0 to N participants, where each seat is human, AI, or empty — and anyone can spectate.

| Config | Description |
|---|---|
| Solo + AI DM | One human player, AI runs the game |
| Solo + Human DM | Classic 1-on-1, zero AI involvement |
| Full party, Human DM | Traditional group play, AI completely off |
| Mixed party | Some humans, some AI players, human or AI DM |
| Full AI table | Watch AI play D&D — spectate the chaos (demo/novelty) |
| Spectator-only | Join to watch and chat, no character needed |
| Any hybrid | DM toggles AI fill per seat at any time, spectators welcome |

**Every seat is a choice, not a default:**
- DM seat: human or AI (toggled by campaign host)
- Player seats: human, AI-controlled, or empty (waiting for join)
- Spectator seats: watch everything, chat with the table, no game actions — human or AI
- Assistant tools (character builder, encounter balance, NPC generator): available if you want them, invisible if you don't
- Zero AI is a first-class experience — the app works fully without any AI features enabled
- Full AI is also first-class — watch a complete AI party run a campaign as a spectator

**Branding:** Never lead with "AI-powered." Never center AI as the subject. Lead with the experience: play D&D your way, with friends or solo, in your browser. AI is one option among equals — sitting right next to "your friends" and "solo" with no special treatment. The product works identically well with zero AI or full AI. Neither is the default. Neither is privileged.

**In one line:** "Every seat at the table is yours to fill however you want."

**The balance:** People who love AI should feel empowered to use it everywhere. People who dislike AI should never feel pressured, nudged, or like they're missing out. Both groups should look at the same landing page and think "this is for me." The way to achieve this: frame everything as *choice per seat*, not as an AI feature. AI is a fill option, not a headline.

**Accessibility idealism:** Virtual tabletops today are powerful but hard to use — even experienced players spend hours learning the UI before they can play a session. Adventure should lower that barrier dramatically. No plugins, no installs, no PDF imports — open a browser and you're at the table in minutes. This isn't a criticism of existing VTTs (Roll20, Fantasy Grounds, Foundry — those communities are wholesome and tight-knit). It's a belief that the bar can be lower without sacrificing depth. Frame as "making VTT more accessible" not "better than X."

## Current Focus

Round 45 (complete): Four features. (1) **Chat whisper/private messages** — full-stack whisper system. Lobby DO (`lobby.ts`): new `whisper` case with case-insensitive username lookup, sends to target player + echoes to sender. ChatPanel: parses `/whisper @player message` and `/w @player message` syntax. New `onWhisper` callback prop wired in both Game.tsx and Lobby.tsx. `ChatMessage` type extended with `'whisper'` type, `targetUsername`/`targetPlayerId` fields. useGameWebSocket handles incoming whisper messages. Pink-themed whisper rendering in ChatPanel (shows "To X" for sent, "From X" for received). (2) **Character JSON import** — complete round-trip import/export. `validateCharacterJSON()` in `export.ts` validates 8 required fields + types, fills 20+ optional field defaults. `importJSONFile()` opens native file picker, reads + parses + validates JSON. Home.tsx: "Import" button next to "+New" in characters section, assigns new ID on import to avoid conflicts. (3) **Session recap persistence** — localStorage-backed recap caching. NarrationPanel gains `roomId` prop, stores recap text in `adventure:recap:${roomId}`. On mount, loads cached recap and auto-shows if exists. On generate, persists new recap. Game.tsx passes `roomId={room}` to NarrationPanel. (4) **Dice history panel** — collapsible roll log between DiceRoller and ChatPanel. `showDiceHistory` state in Game.tsx. Shows last 20 rolls with value, die type, character/player name, timestamp. Color-coded: yellow for crits, red for fumbles. Compact design, max-h-36 scrollable. All 153 tests pass (104 player + 49 worker, 2 budget-skipped), zero TS errors.

Round 44 (complete): Four features. (1) **Interactive spell slot tracker** — spell slot pips in CharacterSheet are now clickable: click a filled pip to spend a slot, click an empty pip to restore one. Uses `updateCharacter` for direct `spellSlotsUsed` mutation. Added spell save DC and spell attack bonus display (e.g., "DC 15 +7 atk") calculated from casting stat per class + proficiency bonus. Concentration indicator ("C") badge on leveled spells in the spellbook. Per-level remaining/max counter below pips. (2) **Condition reference tooltips** — full 5e condition descriptions appear on hover for all condition badges. `CONDITION_TOOLTIPS` record with detailed rules text for all 10 condition types (poisoned, stunned, frightened, blessed, hexed, burning, prone, dodging, raging, inspired). Applied to both CharacterSheet (active conditions on player unit with duration and source) and InitiativeBar (condition badges on all units). CharacterSheet now displays active unit conditions as a dedicated badge row below concentration. All badges use `cursor-help` for discoverability. (3) **Configurable turn timer** — DM can toggle the combat turn timer on/off and set duration (15s-5m) from the DMSidebar encounter tab. Quick-select buttons for 30s/1m/2m/3m. Range slider with 15s steps. Timer state (`turnTimerEnabled`, `turnTimeSeconds`) lives in Game.tsx and passes through to InitiativeBar. When timer expires, automatically advances turn with `nextTurn()` + combat log entry. Timer display in InitiativeBar already existed (Round 40) — now fully configurable. (4) **Quick roll buttons** — ability scores, saving throws, and skills in CharacterSheet are now clickable to instantly roll d20+modifier. Ability score boxes: click to roll ability check. Saving throw rows: click to roll save (with proficiency). Skill rows: click to roll skill check (with proficiency). All rolls go through `addRoll` to appear in the dice log. Hover states show "d20" indicator and modifier. Subtle hover background transitions for discoverability. All 153 tests pass, zero TS errors.

Round 43 (complete): Four features. (1) **Chat typing indicator** — full-stack implementation. Server (`lobby.ts`): new `case 'typing'` relays to all other clients (exclude sender). Client: `Lobby.tsx` and `useGameWebSocket.ts` track `typingUsers` Map with 3s auto-expire timers per player. `ChatPanel.tsx` gains `onTyping` and `typingUsers` props. Input `onChange` sends typing messages throttled to max once per 2s. UI shows "X is typing...", "X and Y are typing...", or "X and N others are typing..." below the message list. Placeholder text updated to include `/roll, /me` hint. (2) **Hit dice tracker** — proper D&D 5e hit dice implementation. `Character` interface gets `hitDiceRemaining` field. `HIT_DIE_SIDES` constant maps class to die size (d6-d12). Short rest now actually spends 1 hit die (rolls the class die + CON mod, minimum 1 HP). Disabled when no hit dice remain. Long rest restores half hit dice (min 1). Level-up grants new hit dice. CharacterSheet displays a visual hit dice tracker: small die tiles showing d-size, blue when available, grey when spent. Short rest button shows actual die type (e.g., "d10 + CON"). Backward-compatible — old characters default to full hit dice. (3) **CharacterCreate.tsx decomposition** — `AppearanceStep` component (296 lines) extracted to `src/components/character/AppearanceStep.tsx`. Contains portrait preview, all 7 appearance pickers (skin/hair/eye color, hair style, scar, face markings, facial hair), and portrait source tabs (Default/AI Generate/Upload). `portraitMode` and `portraitStyle` state now lives in the component. Parent passes callbacks for portrait generation (now accepts style parameter), upload, and appearance changes. CharacterCreate.tsx: 1840→1521 lines (319 lines removed, **17.3% reduction**). `PORTRAIT_STYLES` constant and `PortraitStyle`/`PortraitMode` types moved to AppearanceStep and re-exported. (4) **Makefile CI targets** — `make typecheck` runs `npx tsc --noEmit`, `make ci` runs full pipeline: typecheck → lint → build → test. All 153 tests pass, zero TS errors. Bundle: main 395KB + Game 197KB + CharacterCreate 94KB + Lobby 30KB.

Round 42 (complete): Four features. (1) **Chat slash commands wired** — `/roll d20`, `/roll 2d6+3`, `/roll adv`, `/roll disadv`, `/roll 4d6kh3` now work in chat. `parseSlashRoll()` parser (implemented in Round 42 WIP) is now fully connected: `handleSlashRoll` callbacks added to both Game.tsx and Lobby.tsx, creating `type: 'roll'` chat messages with full notation display, individual rolls, kept dice, and totals. `/me` emote command also wired. `/roll` with no args defaults to d20. Invalid notation shows error in chat. Messages persisted to D1. Sound FX play on slash rolls (dice sound + crit/fumble). (2) **Chat message grouping + scroll-to-bottom** — consecutive messages from the same sender within 60s are visually grouped (no repeated avatar/name). Auto-scroll only when user is already at bottom. "X new messages" pill button appears when scrolled up with new messages arriving. (3) **Advantage/disadvantage toggle in DiceRoller** — new Normal/ADV/DISADV toggle bar above dice buttons. When ADV is active, clicking d20 rolls 2d20 and keeps highest. When DISADV, keeps lowest. d20 button gets a colored ring (green for ADV, red for DISADV) and a "2x" badge. Only affects d20 rolls (other dice unaffected). (4) **Campaign delete confirmation dialog** — clicking the delete button on a campaign now opens a modal confirmation dialog instead of immediately deleting. Shows campaign name, warns about irreversibility. Cancel/Delete buttons. Click outside to dismiss. Styled consistently with the keyboard shortcut help overlay. All 153 tests pass, zero TS errors. Bundle: main 395KB + Game 196KB + CharacterCreate 93KB + Lobby 29KB.

Round 41 (complete): Four features. (1) **AoE confirm handler extraction** — the 67-line inline `onAoEConfirm` callback was moved from BattleMap JSX to a proper `handleAoEConfirm` useCallback in Game.tsx. Handles spell slot consumption, target finding via cell intersection, save DC calculation, damage/condition application, and combat log. Game.tsx: 1387→1396 lines (net +9 from new callback definition, offset by removed inline). (2) **Party health overview** — new `PartyHealthBar` component (102 lines) at `src/components/game/PartyHealthBar.tsx`. Compact horizontal strip showing all party members: tiny portrait, name/class/level, HP bar (color-coded), HP text (DEAD/DOWN/numbers), condition pips. Always visible during adventure below the initiative bar. Clicking a character selects their unit. Dead characters shown greyed out with strikethrough. (3) **Character sheet skills & proficiencies** — full D&D 5e 18-skill list with ability score associations. Class skill proficiencies (2-4 per class) shown with orange dot indicators. Collapsible section. When collapsed, shows Passive Perception (10 + WIS mod + proficiency if proficient). Skill bonus = ability mod + proficiency bonus if proficient. (4) **Structured combat log** — enhanced NarrationPanel combat log with `classifyCombatEntry()` function that categorizes entries into 8 types (crit/hit/miss/death/spell/condition/heal/other). Filter tabs (All/Attacks/Spells/Conditions/Deaths) for quick filtering. Spell entries now get distinct blue styling. Heal entries get green styling. Round separators on initiative/round entries. Max height increased to 48 (from 40). All 153 tests pass, zero TS errors.

Round 40 (complete): Four features. (1) **Sound FX volume slider** — master GainNode inserted between all audio and hardware output. `getVolume()`/`setVolume()` API with localStorage persistence (`adventure:volume`). Mute state also persisted (`adventure:muted`). Mute now zeroes gain instead of suspending AudioContext (fixes ambient timing issues). Volume slider UI: hover over mute button reveals a dropdown with range input (0-100%) + percentage label. Speaker icon changes: muted (X), low (<30%), normal (waves). Dragging slider to 0 auto-mutes, dragging above 0 auto-unmutes. (2) **Battle map touch support** — full mobile touch interaction on BattleMap canvas. Pinch zoom (two fingers → scale), single-finger swipe to pan, tap to select tokens, long-press (300ms) to start drag with movement range overlay. `touch-none` CSS prevents browser default gestures. Legend shows mobile-specific help text on small screens ("Pinch to zoom | Swipe to pan | Long-press to drag"). (3) **Initiative bar turn transition animations** — `animate-turn-enter` CSS animation (scale bounce 1→1.08→1.05 with golden glow pulse) on the active unit card when turn changes. `animate-turn-badge` animation (slide down + bounce) on the TURN badge. Auto-scroll: scrolls the initiative bar to center on the current turn unit via `scrollIntoView`. (4) **Ambient mood visual tinting** — each ambient mood (tavern/dungeon/forest/combat/mystery) maps to a subtle full-screen gradient overlay: tavern=warm amber, dungeon=deep slate/indigo, forest=emerald/green, combat=red, mystery=purple/indigo. Overlay uses `pointer-events-none` + z-0 with 1s opacity transition on mood change. Header and main content elevated to z-10. Game.tsx: 1336→1387 lines. All 153 tests pass, zero TS errors.

Round 39 (complete): Four features. (1) **useCampaignPersistence hook** (192 lines) extracted to `src/hooks/useCampaignPersistence.ts` — debounced auto-save, server load on mount with localStorage merge, campaign registration on first adventure start. Uses `getState` callback pattern and `onAutoSelectCharacter` ref bridge to avoid circular deps with handleSelectCharacter. (2) **Session recap AI** ("Previously on...") — new `/api/dm/recap` endpoint using Workers AI Llama 3.1 with dramatic narrator system prompt. NarrationPanel shows a collapsible "Previously on this adventure..." button (appears after 3+ DM history entries) that generates and displays an AI-written recap. Indigo-themed UI with loading state. (3) **Floating combat text** — new `FloatingCombatText` component (100 lines) + `useFloatingCombatText` hook with `animate-float-up` CSS animation. Damage numbers (red), healing (green), crits (amber, larger), misses (grey italic) float up and fade out during combat. Wired into CombatToolbar: quick attack hits/misses/crits, spell damage/healing, class abilities, rest actions. (4) **Combat CSS animations** — `animate-float-up` (float + fade), `animate-damage-shake` (hit feedback), `animate-heal-pulse` (healing glow) keyframe animations added to styles.css. Game.tsx: 1397→1336 lines. All 153 tests pass, zero TS errors.

Round 38 (complete): Two major improvements. (1) **useGameWebSocket hook extraction** (418 lines) — the entire WS message handler (~275 lines of switch/case + session state) moved to `src/hooks/useGameWebSocket.ts`. Manages wsPlayerId, isDM, isSpectating, dmPlayerId, wsConnected state internally. Uses `wsPlayerIdRef` for stable callback identity and `getStateForResponse` callback pattern for late-join state exchange. Game.tsx: 1610→1397 lines (213 net reduction including new features). (2) **Keyboard shortcut help overlay** — press `?` to toggle a styled modal showing all shortcuts. New shortcuts: M (mute), C (character sheet), Q (quests), L (combat log), D (DM sidebar), 1/2/3 (view switch). Input field detection prevents shortcuts while typing. `?` button added to header. All 153 tests pass, zero TS errors.

Round 37 (complete): ShopView extraction — `ShopView` component (107 lines) extracted to `src/components/game/ShopView.tsx`, containing merchant inventory display, category filter tabs, buy/sell interface. `shopCategory`/`setShopCategory` state moved into component. `SHOP_ITEMS`, `SHOP_CATEGORIES`, `RARITY_COLORS`, `RARITY_BG` imports removed from Game.tsx. Game.tsx reduced from 1697→1610 lines (87 lines removed). Total Game.tsx decomposition: 3274 (Round 34 start) → 1610 (Round 37 end) — **50.8% reduction, 1664 lines extracted across 8 targets**. All 153 tests pass, zero TS errors.

Round 36 (complete): Combat Toolbar extraction — the biggest decomposition target. `CombatToolbar` component (745 lines) extracted to `src/components/game/CombatToolbar.tsx`, containing all DM controls (encounter, NPC talk, scene name), combat actions (roll initiative, end turn, quick attack, cast spell, class ability, dodge, dash, disengage), end combat with loot/XP rewards, level up indicator, rest buttons, potion use, clear history, and status indicators. Game.tsx import cleanup removed 22 now-unused imports (combat helpers, sound FX, map utils, constants moved to extracted components). Game.tsx reduced from 2288→1697 lines (591 lines removed). All 153 tests pass, zero TS errors. Total decomposition: Game.tsx went from 3065 (Round 34 end) to 1697 (Round 36 end) — 45% reduction.

Round 35 (complete): Game.tsx decomposition round — three major extractions. (1) `useEnemyAI` hook (285 lines): enemy AI combat useEffect extracted to `src/hooks/useEnemyAI.ts`, consumes `useGame()` directly, takes callback props for parent-owned functions. (2) `DMSidebar` component (277 lines): DM tools sidebar extracted to `src/components/game/DMSidebar.tsx` with Encounter/NPC/Notes tabs + Ambiance selector, owns `dmSidebarTab` state internally. (3) `NarrationPanel` component (308 lines): character status bar, turn indicator, quest tracker, death saves, DM history scroll, combat log, and action input extracted to `src/components/game/NarrationPanel.tsx`. Also: `Quest` interface moved from inline in Game.tsx to `src/types/game.ts` for reuse. Game.tsx reduced from 3065→2288 lines (777 lines removed, 25% reduction). All 153 tests pass, zero TS errors.

Round 34 (complete): Game.tsx decomposition — wired LevelUpModal (161 lines) and CharacterPicker (76 lines) as extracted components, removed 209 lines of inline JSX from Game.tsx (3274→3065 lines), removed 4 useState hooks (levelUpTab, asiMode, asiStat1, asiStat2) that moved into LevelUpModal, cleaned unused applyASI/selectFeat from useGame destructuring. Keyboard shortcuts (Escape closes modals in priority order: level-up → DM sidebar → combat log → quests). Toast mobile repositioning (bottom-center on mobile, bottom-right on desktop). DoodlePad touch support (getTouchPos, onTouchStart/Move/End with preventDefault for scroll prevention, touch-none CSS). GitHub repo description + topics set. Round 33 (complete): Mobile responsive (Home, Lobby, CharacterCreate — stacking layouts, safe areas, tap targets), meta viewport fix (viewport-fit=cover, theme-color, apple-mobile-web-app), CharacterCreate step transition animations (fade-in-up on all 6 wizard steps), mobile CSS (safe-area-inset, text-size-adjust, tap-highlight removal). Round 32 (complete): Error boundary for lazy-loaded routes (catches chunk load failures + render errors with branded recovery UI), 404 page ("maybe it was a mimic all along"), Lobby visual polish (page-enter animation, glass morphism seat cards, staggered reveals, connection badge pill, gradient Start Game button, polished password gate, drawing indicator with pulse dot, settings panel slide-in), Game visual polish (crit-flash on CRITICAL combat log entries, hp-bar-shimmer on character + initiative HP bars), loading skeletons on Home.tsx dashboard (shimmer cards while campaigns fetch), new CSS classes (skeleton, seat-card, seat-ready pulse, connection-badge). Round 31 (complete): Fantasy animation system, hero gradient + shimmer, card hover effects, hono security patch, GameContext decomposition (1896→1082 lines), code splitting (703KB→split chunks), prefers-reduced-motion, error handling overhaul (18 bare catches → logError). Round 30 (complete): Lobby passwords, save indicator, auth gating, dashboard polish. Previous: Rounds 26-29 (D1, chat, OAuth, character wizard, battle map, spectator, animations).

### Illustrated portrait system
- **Status:** Done (Phase 1 — base images + wiring)
- **Phase 1 (complete):** 20 WebP portraits (8 races + 12 classes) cropped from reference image, upscaled to 256px wide via Lanczos, total 184KB. Wired into all 4 UI files with cascade fallback: `char.portrait || /portraits/classes/{class}.webp` with `onError` fallback to `/portraits/races/{race}.webp`, then SVG as last resort in CharacterCreate.
- **Phase 2 (future):** Illustrated overlay assets — transparent PNG layers for facial hair, hair styles, scars, face markings, eye/skin/hair color variations that match the art style. Canvas composite system to layer overlays on base portraits.
- **Assets:** `assets/portraits/races/` (8 files), `assets/portraits/classes/` (12 files, Druid sourced from tavern scene since it's missing from the class grid). Vite copies these to `public/` during build (publicDir: 'assets').
- **Modified files:** `CharacterCreate.tsx` (race/class card portraits + main preview), `Home.tsx` (character list thumbnails), `Game.tsx` (character select, narration header, toolbar), `CharacterSheet.tsx` (header portrait)

### Dice rolls in chat (offline + online)
- **Status:** Done
- Local (offline) dice rolls now appear in chat history even without WebSocket connection
- Format: `CharacterName [PlayerName]` — shows character name prominently, player name in brackets if different
- Crit hit: golden gradient background, glowing "CRITICAL HIT!" text, gold die badge
- Crit fail: red gradient background, glowing "CRITICAL FAIL!" text, red die badge
- Fun fallback names when player/character info missing: "The Dice Gremlin", "The Innkeeper's Cat", "Definitely Not a Mimic", etc.
- `DiceRoller` gained `onRollComplete` callback prop (`LocalRollResult`) — fires after local roll animation
- Both `Game.tsx` and `Lobby.tsx` wire the callback to inject `ChatMessage` with type `'roll'`
- `ChatMessage` interface extended with `sides`, `characterName` fields
- Sound FX (dice roll, crit, fumble) play for local rolls too
- **Reference image note:** `assets/characters.jpg` (1296x830) is a UI mockup with text labels baked into illustrations, requiring tight face-focused crops to avoid text overlap

### Multiplayer session sync + test framework (Round 19)

### Test framework
- **Status:** Done — all 153 tests passing (104 player + 49 worker), 2 budget-skipped

**Three test categories:**
1. **Player mode tests** (`tests/player/game-logic.test.ts`) — pure game logic, no AI, no network. 17 describe blocks, 99 tests. Covers spatial engine (mapUtils), AC calculation, hit dice, enemy generation, encounter themes, spell system (slots, class spells, damage), class abilities, feats/ASI, XP thresholds, conditions, loot, shop, extra attack, data integrity, opportunity attacks, condition system (CONDITION_EFFECTS, effectiveAC, rollD20WithProne, CLASS_ABILITIES condition types). **All 99 passing.**
2. **AI fallback tests** (`tests/ai/fallback.test.ts`) — AI binding `undefined` → all 9 AI endpoints return 503 with helpful message. Non-AI endpoints (campaign save/load) still work. **All 11 passing.**
3. **AI error tests** (`tests/ai/errors.test.ts`) — AI binding exists but throws/returns empty/garbage/hangs → endpoints return 500 with informative message. Mock AI objects: `throwingAI`, `emptyAI`, `garbageAI`, `hangingAI`. Budget-aware `describe.skipIf` for live AI tests. **All 11 passing, 2 skipped** (live AI tests behind `AI_TESTS=live` gate).
4. **Multiplayer campaign tests** (`tests/multiplayer/campaign.test.ts`) — 3-player Lobby DO WebSocket session lifecycle via Miniflare: join, chat, dice (server-authoritative), DM narrate, NPC dialogue, player actions, draw (exclude sender), disconnect/rejoin, edge cases (empty chat, dice clamping, unknown types, ping/pong, REST endpoint). Phase 8 tests: DM assignment, DM auth rejection, DM transfer, DM reassignment on disconnect, stable reconnect IDs, rate limiting. Seat model tests: default seats, auto-claim, ready toggle, character select, AI seat toggle, DM auth on seats, add/remove seats, seat revert on disconnect, DM type toggle, REST seats endpoint. Spectator tests: spectate-on-join, spectate/claim toggle, DM-cannot-spectate, REST spectators. **All 26 passing.**

**Infrastructure:**
- `vitest.config.ts` — plain vitest for player tests (no Workers runtime)
- `vitest.workers.config.ts` — `@cloudflare/vitest-pool-workers` for multiplayer + AI tests (Miniflare, `isolatedStorage: false` for DO WebSocket compat)
- `wrangler.test.toml` — test-only wrangler config (DO + KV bindings, no AI binding to avoid remote proxy login)
- vitest 3.2.4 (pool-workers requires `2.0.x - 3.2.x`, vitest 4 removed `test.poolOptions`)
- Budget-aware: `AI_TESTS` env var → `__TEST_AI_MODE__` define in vitest config. `describe.skipIf(AI_TESTS !== 'live')` guards live AI tests.
- Makefile targets: `make test` (all), `make test-player`, `make test-worker`, `make test-multiplayer`, `make test-ai`, `make test-ai-live`, `make test-watch`

### Multiplayer session sync — full game state over WebSocket
- **Status:** Done (Phases 1-8 complete)

#### What's already synced (working)
| Feature | Mechanism | Quality |
|---------|-----------|---------|
| Chat messages | `chat` → Lobby DO → all clients | Good — optimistic local + dedup |
| Dice rolls | `roll` → DO (server-authoritative RNG) → `roll_result` | Good — no client cheating |
| Player presence | `join`/`player_joined`/`player_left`/`welcome` | Good — username + avatar |
| DM narration text | `dm_narrate` broadcast | Good — all see same DM text |
| NPC dialogue text | `dm_npc` broadcast | Good — all see same NPC |
| Player actions text | `dm_action` broadcast | Good — action descriptions |
| Doodle pad strokes | `draw` → DO (exclude sender) → others | Partial — strokes sync but no replay on late-join, no per-player attribution |
| Canvas clear | `clear_canvas` → DO (exclude sender) → others | Good |
| Keepalive | `ping`/`pong` every 25s | Good |

#### What's NOT synced (the gap — all local-only today)

**Critical (game breaks in multiplayer without these):**
| Missing sync | Impact |
|---|---|
| Units array (HP, AC, conditions, initiative, isCurrentTurn, abilities) | Players see different board states |
| Combat state (inCombat, combatRound, turnIndex) | Player A in combat, Player B not |
| Encounter spawn (enemy units added) | Enemies only exist in spawner's state |
| Damage / healing results | HP changes invisible to other players |
| Turn advancement (nextTurn calls) | Initiative bar frozen for non-active player |
| Token positions (mapPositions) | Tokens at different locations per client |

**Important (multiplayer degraded without these):**
| Missing sync | Impact |
|---|---|
| Character data (HP, stats, level, conditions, death saves) | Can't see party member health |
| Terrain grid changes (DM painting) | Only DM sees map changes |
| Scene name | Different scene labels per client |
| Quest tracker | Quests per-client only |
| Combat log entries | Only action originator sees structured log |
| Spell slot / ability usage | Can't see caster resources |

**Nice to have:**
| Missing sync | Impact |
|---|---|
| Selected unit highlight | Can't see what others target |
| NPC conversation state (mode/name/role) | Others don't know NPC context |
| Active view tab | Cosmetic — sync views across party |

#### Architecture audit findings

**Lobby DO (`src/lobby.ts`, 253 lines):**
- In-memory only — sessions Map is sole state, no `this.state.storage` usage
- No DO hibernation API — uses `server.accept()` not `this.state.acceptWebSocket()`
- 10 message types handled (join, chat, roll, draw, clear_canvas, dm_narrate, dm_npc, dm_action, ping, default)
- Two broadcast patterns: `broadcast()` (all including sender) vs manual loop excluding sender (draw, clear_canvas)
- No auth — any player can send dm_narrate/dm_npc/dm_action
- No rate limiting, no input sanitization, no message size limits

**useWebSocket hook (`src/hooks/useWebSocket.ts`, 146 lines):**
- Exponential backoff: 1s → 2s → 4s → 8s → 10s cap, retries indefinitely
- Auto-sends `join` on open, `ping` every 25s
- Single `onMessage` callback model — no event emitter
- `send()` silently drops messages when socket not OPEN (no queue)
- Each reconnect gets a new UUID — brief "left then joined" for other players

**GameContext (`src/contexts/GameContext.tsx`, 1649 lines):**
- 11 useState hooks, 9 raw setters, 22 action functions, 1 ref
- Zero WebSocket integration — purely local React state + localStorage
- 43 context values exposed via useGame()
- Key combat functions: `damageUnit`, `healUnit`, `rollInitiative`, `nextTurn`, `removeUnit`, `applyCondition`, `removeCondition`, `tickConditions`, `castSpell`, `useClassAbility`
- `damageUnit` has randomness (concentration save d20 roll) — can't replay deterministically
- `rollInitiative` has randomness (d20 + dexMod per unit)
- `tickConditions` has randomness (1d6 burning damage)

**Game.tsx (2304 lines) — mutation call sites:**
- `damageUnit`: 4 sites (3 in enemy AI useEffect, 1 in Quick Attack onClick)
- `nextTurn`: 5 sites (4 in enemy AI useEffect, 1 in End Turn onClick)
- `setUnits`: 11 sites (campaign load, character sync, character select, enemy AI movement, encounter spawn, dash, end combat)
- `updateCharacter`: 11 sites (unconscious detection, death saves, enemy attacks on unconscious, combat gold)
- `applyCondition`: 2 sites (enemy ability hit, Dodge action)
- `tickConditions`: 2 sites (enemy AI turn start)
- `rollInitiative`: 1 site (Roll Initiative button)
- `castSpell`: 1 site (spell dropdown)
- `useClassAbility`: 1 site (class ability button)

**BattleMap.tsx — zero socket awareness:**
- Takes zero props — all state via `useGame()` context
- No `useImperativeHandle` — can't be driven by parent
- `setMapPositions`: 3 call sites (spawn useEffect, drag-drop handleMouseUp, regenerate)
- `setTerrain`: 4 call sites (initial dungeon gen, paint handler, door toggle, regenerate)
- Token drag-drop: handleMouseDown (701-762), handleMouseMove (764-777), handleMouseUp (779-847)
- Terrain painting: paintTerrain (665-698), continuous painting via mouseMove (769-772)

#### Implementation plan

**Design: Result-broadcasting with suppression flag**
- Each mutation computes its result and broadcasts the outcome (not the intent)
- A `isRemoteEventRef` flag prevents rebroadcast when applying received events
- The Lobby DO gets a single `game_event` passthrough relay (exclude sender, like `draw`)
- Two event granularity levels: `game_sync` (full combat state snapshot) for correctness, `token_move` (single position) for smooth drag UX

**Phase 1: Lobby DO expansion — DONE**
Added `game_event` relay (exclude sender), `state_request` relay, `state_response` targeted routing to `lobby.ts`. DO is a dumb pipe.

**Phase 2: GameContext return values — DONE**
7 functions return computed results via closure capture: `damageUnit`, `healUnit`, `removeUnit`, `applyCondition`, `removeCondition`, `rollInitiative`, `nextTurn`. `tickConditions` returns `{ messages, units }`.

**Phase 3: Game.tsx sync infrastructure — DONE**
`isRemoteEventRef`, `broadcastGameEvent`, `broadcastCombatSync`, `broadcastCombatSyncLatest` (ref-based delayed), `unitsRef`/`combatRoundRef`/`turnIndexRef`/`inCombatRef`, full `game_event` handler in `handleWsMessage`, `state_request`/`state_response` handlers, late-join `state_request` on `welcome`.

**Phase 4: Combat state sync — DONE**
All 4 enemy AI `nextTurn` calls, `rollInitiative`, player End Turn, Quick Attack, Cast Spell, Class Ability, Dodge, Dash, encounter spawn, End Combat — all wired with broadcast.

**Phase 5: Map state sync — DONE**
`BattleMapProps` with `onTokenMove`/`onTerrainChange` callbacks. Token drag-drop, terrain paint, regenerate wired. Enemy AI movement broadcasts `token_move`.

**Phase 6: Character + story sync — DONE**
`useEffect` watches `selectedCharacter` and broadcasts `character_update` (HP, AC, conditions, gold, level, class, name) on change with JSON dedup. Scene name input broadcasts `scene_sync`. All 5 quest mutation sites broadcast `quest_sync`.

**Phase 7: DoodlePad improvements — DONE**
- Lobby DO stores `strokeHistory` array (capped at 5000 strokes) with `playerId`/`username` attribution per stroke
- `welcome` message now includes `strokeHistory` — late joiners replay existing canvas art on connect
- `clear_canvas` resets `strokeHistory`
- `DoodlePadHandle.replayStrokes(strokes[])` batch-draws strokes without re-sending to server
- Lobby.tsx replays history on `welcome` (100ms delay for canvas mount)
- "X is drawing..." indicator: debounced 1s indicator when receiving remote draw strokes, positioned bottom-left of doodle pad

**Phase 7: DoodlePad improvements**
- Late-join canvas replay: store stroke history in Lobby DO memory, send to new joiners on `welcome`
- Per-player attribution: color-code brush by player or show player cursor
- Canvas state snapshot: on join, existing client sends current canvas as image data

**Phase 8: Session robustness — DONE**
- Stable reconnect IDs: `sessionStorage` persists `playerId` per room, sent in `join` message. Lobby DO detects returning players, reuses their ID, closes dead sockets, broadcasts `player_reconnected` instead of `player_joined`. No more "left then joined" flash on reconnect.
- DM authorization: first joiner becomes DM, tracked in Lobby DO (`dmPlayerId`). DM-only message types (`dm_narrate`, `dm_npc`, `dm_action`) rejected from non-DM players with error response. DM reassigned to oldest remaining player on disconnect. `dm_changed` broadcast keeps all clients in sync.
- DM transfer: `transfer_dm` message type — only current DM can invoke. Validates target exists, updates `dmPlayerId`, broadcasts `dm_changed` to all.
- Rate limiting: `game_event` messages capped at 10/second per client with sliding window. Excess events get error response.
- Message queue: `useWebSocket` buffers up to 100 messages when disconnected, flushes on reconnect after join handshake completes.
- DM role UI: `canUseDMTools` derived state (`isDM || !wsConnected`) gates DM-only controls in Game.tsx (encounter, NPC talk, scene name, Begin Adventure, narration input) and BattleMap.tsx (DM mode toggle, terrain painting, trap placement, map upload). DM/Player badge in toolbar. Non-DM players see read-only narration with chat hint. Lobby.tsx shows "Make DM" transfer button on non-DM players (visible to current DM only), DM badge in player list.
- `welcome` message includes `isDM`, `dmPlayerId`. Player list includes `isDM` per player.
- Remaining deferred: Lobby DO hibernation (migrate to `this.state.acceptWebSocket()` API for cost reduction)

### Previous: Ranged combat + line of sight
- **Status:** Done (Round 18)
- `mapUtils.ts`: `chebyshevDistance()`, `hasLineOfSight()` (Bresenham raycasting), `parseRangeFt()` (parses "60ft"->12 cells, "Touch"->1, "Self"->0)
- `Item` interface: `isRanged?: boolean` and `range?: number` (cells) — ranged weapons use DEX mod, melee uses STR
- `EnemyAbility` interface: `isRanged?: boolean` and `range?: number` — tagged on Breath Weapon, Mind Blast, Fire Breath, Hellfire Orb
- All weapon entries in loot tables (COMMON/UNCOMMON/RARE/EPIC) and shop tagged with `range` (melee=1) and `isRanged` (ranged weapons)
- New weapons: Shortbow (common loot+shop), Hand Crossbow (shop), Hand Crossbow +1 (uncommon loot), Longbow +2 (rare loot), Oathbow (epic loot)
- Player Quick Attack: ranged weapons check Chebyshev distance + LOS; melee keeps adjacency. Tooltips: "Out of range (Xft/Yft)", "No line of sight", "Too far — move adjacent". Button label: "Shoot (Longbow)" vs "Attack (Shortsword)"
- Enemy AI: ranged enemies check distance + LOS instead of adjacency. Smart movement — if already have LOS and in range, skip moving closer. At range without ranged abilities, still tries to close distance for melee. Ability selection filters melee abilities when not adjacent. Basic melee attack only fires when adjacent.
- Spell range enforcement: each spell in the dropdown checks `parseRangeFt(spell.range)` vs Chebyshev distance + LOS to target. Out-of-range or blocked spells show greyed with "(out of range)" or "(no line of sight)" hint. Self/heal spells unaffected. Spell range shown in dropdown description.

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

### Inventory & loot system
- **Status:** Done
- Item system: 7 types (weapon, armor, shield, potion, ring, scroll, misc), 4 rarities (common/uncommon/rare/epic) with level-scaled drop chances
- Equipment slots: weapon, armor, shield, ring — each with equip/unequip, auto AC recalculation
- Loot tables: 8 common, 6 uncommon, 5 rare items — rolled per enemy on combat end with level-scaled rarity chances
- Combat loot drops: items announced in DM narration on End Combat
- CharacterSheet.tsx: equipment slots with rarity-colored items + stats, collapsible inventory with equip/use/drop actions
- "Use Potion" quick button in game toolbar (appears when character has healing potions and is hurt)
- Potion stacking: identical potions stack by quantity, decrement on use
- AC recalculation: equipping/unequipping armor, shields, rings auto-updates character AC
- Consumable use: potions heal HP and revive from unconscious/stabilized, scrolls show use message

### Shop system
- **Status:** Done
- Curated shop inventory: 16 items across 4 categories (Weapons, Armor, Potions, Accessories)
- Buy items with gold (full price), sell items for half value
- Shop tab in game view (alongside Narration/Battle Map), only available out of combat
- Category filter tabs, gold display, buy/sell toast messages
- Sell section shows all inventory items with sell prices

### Spell system
- **Status:** Done
- Spell interface with school, level, damage, healing, range, duration, concentration, save stat
- 25 spells: 7 cantrips + 10 level 1 + 5 level 2 + 3 level 3 spells across all caster classes
- D&D 5e spell slot tables: full casters (Wizard/Sorcerer/Cleric/Druid/Bard/Warlock) and half casters (Paladin/Ranger)
- Spell slot tracking: consume on cast, restore on long rest, cantrips are free
- Cast Spell dropdown in combat toolbar with slot availability display
- Damage spells roll dice and apply to targeted enemy unit
- Healing spells restore HP and revive from unconscious/stabilized
- CharacterSheet spellbook: spell slot pips (filled/empty), cantrip list, leveled spell list with dim-when-exhausted
- Character creation includes spellSlotsUsed: {} initialization

### Combat depth overhaul
- **Status:** Done
- Unit type extended: attackBonus, damageDie, damageBonus, dexMod, abilities, abilityCooldowns, conditions, cr, xpValue
- 10 condition types: poisoned (-2 atk/saves), stunned (skip turn, -2 AC), frightened (-2 atk), blessed (+2 atk/saves), hexed (-2 saves), burning (1d6/turn), prone (melee adv/ranged disadv via rollD20WithProne), dodging (+2 AC), raging (+2 atk), inspired (+2 atk/saves)
- Condition system: applyCondition, removeCondition, tickConditions (duration tracking, burning damage, auto-expire messages)
- Enemy stat templates by difficulty: easy (goblins CR 0.25), medium (orcs CR 1), hard (ogres CR 2-3), deadly (dragons CR 4-5)
- 8 enemy abilities: Aggressive Charge, Paralyzing Touch, Crushing Blow, Frightening Roar, Life Drain, Breath Weapon, Multiattack, Mind Blast, Psychic Grasp
- Enemy AI rewrite: uses real stat block for attacks, 60% chance to use available abilities, cooldown tracking, condition-modified attack rolls, AoE damage, condition application on hit
- Smart targeting: 30% chance to focus lowest-HP player
- Stunned enemies skip their turn with message
- Player Quick Attack uses equipped weapon stats (damageDie, attackBonus, damageBonus) or 1d4 unarmed
- Player attack button label shows weapon name
- CR-based XP/gold rewards on End Combat (from unit.xpValue and unit.cr)
- Condition badges in InitiativeBar (colored, with remaining duration)
- End Combat clears all conditions
- Enemies get dexMod for initiative rolls (not just flat d20)
- HP scales with party level (15% per level above 1)
- generateEnemies() function for client-side encounter creation (AI narration optional)

### Combat actions + condition spells + quest tracker
- **Status:** Done
- 4 spells extended with condition application: Burning Hands (burning 2 rounds), Hex (hexed 3 rounds), Hold Person (stunned 2 rounds), Vicious Mockery (frightened 1 round)
- Spell interface extended: `appliesCondition?: ConditionType`, `conditionDuration?: number`
- `castSpell` applies conditions to targets when spell has `appliesCondition`, handles pure-condition spells (no damage)
- Dodge combat action: applies 'blessed' condition (source='Dodge') for 1 round (+2 AC), disabled when already dodging
- Dash combat action: logs disengage message to combat log
- Quest tracker: Quest interface (id/title/description/completed), localStorage persistence per room
- Collapsible quest panel in narration view with add form, complete/delete actions, active vs completed sections
- Active quest count badge on Quests header
- Long rest now clears all combat conditions on the player's unit (in addition to HP/spell slots)
- Condition functions (applyCondition, removeCondition, tickConditions) moved above castSpell to fix block-scoped variable ordering

### Class abilities + saving throws
- **Status:** Done
- ClassAbility interface: id, name, class, type (heal/buff/attack/utility), resetsOn (short/long), damage, healFormula, condition application
- 12 class abilities — one per class:
  - Fighter: Second Wind (heal 1d10+level, short rest)
  - Barbarian: Rage (+2 atk raging for 3 rounds, long rest)
  - Rogue: Sneak Attack (2d6 extra damage, short rest)
  - Paladin: Lay on Hands (heal level*5, long rest)
  - Ranger: Hunter's Mark (hex target 3 rounds, short rest)
  - Monk: Flurry of Blows (2d4 damage, short rest)
  - Cleric: Channel Divinity (heal level*d6, short rest)
  - Bard: Bardic Inspiration (inspired 3 rounds, short rest)
  - Druid: Wild Shape (heal 1d10+level, short rest)
  - Warlock: Eldritch Blast (2d10 force damage, short rest)
  - Wizard: Arcane Recovery (restore 1 spell slot, long rest)
  - Sorcerer: Metamagic Empower (3d8 force damage, long rest)
- `useClassAbility` in GameContext: handles all 4 ability types, marks used, refunds on invalid target
- `classAbilityUsed: boolean` on Character — tracks cooldown per rest
- `restCharacter` resets class ability based on `resetsOn` (short rest resets short-rest abilities, long rest resets all)
- Class ability button in combat toolbar with per-class color theming
- CharacterSheet: class ability section showing name, description, Ready/Used status, rest type
- Saving throws for condition spells: spell DC = 8 + proficiency + casting stat mod, target rolls d20 + save mod
  - On save: damage halved, conditions not applied (with descriptive message)
  - On fail: full damage + condition applied as before
  - Casting stat mapped per class (INT for Wizard, CHA for Sorcerer/Bard/Warlock/Paladin, WIS for Cleric/Druid/Ranger)

### Encounter variety + themes + combat log
- **Status:** Done
- Enemy templates expanded from 8 to 16: added Stirge/Crawling Claw/Twig Blight, Cultist/Tribal Warrior/Thug (easy), Fire Beetle/Giant Spider/Vine Blight, Specter/Wight/Animated Armor (medium), Hell Hound/Phase Spider/Displacer Beast, Ettin/Flesh Golem/Gelatinous Cube (hard), Shambling Mound/Elemental/Chimera, Death Knight/Oni/Night Hag (deadly)
- New abilities across templates: Pack Tactics, Venomous Bite, Necrotic Touch, Fire Breath, Phase Shift, Double Strike, Stunning Slam, Engulf, Lightning Absorption, Hellfire Orb, Soul Rend, Dark Command
- 12 encounter themes with setting + twist: ravine fog, collapsed watchtower, moonlit dead forest, flooded crypt, merchant caravan, stone bridge, burning village, bioluminescent cave, defiled shrine, wrecked ship, forgotten arena, frozen lake
- `randomEncounterTheme()` used in encounter generation — theme passed to AI narration context, used as fallback flavor text when AI unavailable
- Combat log panel: togglable during combat, color-coded entries (hits/orange, misses/grey, deaths/red, conditions/purple), entry count badge, max-h-40 scrollable
- `showCombatLog` state for toggle

### Turn flow + magic items + epic loot
- **Status:** Done
- "Next Turn" button replaced with context-aware "End Turn" (green, prominent when player's turn) / "Next Turn" (grey when enemy turn)
- End Turn logs turn-end message to combat log
- Turn indicator banner in narration panel: current unit name, active conditions with duration, round number, animated pulse dot, color-coded (green=player, red=enemy)
- Loot tables expanded: 3 new common items (Quarterstaff, Light Crossbow, Antidote), 3 new uncommon (Flaming Dagger, Breastplate, Cloak of Elvenkind), 3 new rare (Frostbrand Rapier, Adamantine Shield, Headband of Intellect)
- New EPIC_LOOT tier: 5 items (Potion of Supreme Healing, Vorpal Greatsword, Plate Armor of Etherealness, Ring of Spell Storing, Staff of Power)
- `rollLoot` updated with epic tier chance (scales with level, ~0% at lv1, ~1% at lv5)

### Character progression + combat polish
- **Status:** Done
- Ability Score Improvement (ASI) at D&D 5e standard levels (4, 8, 12, 16, 19)
  - Choose +2 to one stat or +1 to two stats (max 20 cap enforced)
  - CON increases retroactively adjust HP (level * delta)
- 8 feats as alternative to ASI: Tough (+2 HP/level), Alert (+5 init), Great Weapon Master (+3 dmg), War Caster (+2 spell atk), Lucky (+1 saves), Durable (+1 CON +1 HP/lv), Observant (+1 WIS), Resilient (+1 CON +1 saves)
  - `Feat` interface with stat bonuses, HP/level, AC, initiative, attack, damage, saving throw bonuses
  - `feats: string[]` and `asiChoicesMade: number` on Character
  - `hasPendingASI()` check compares ASI levels reached vs choices made
- Level-up choice modal: tabbed ASI vs Feat selection, stat preview, auto-opens after combat level-up
  - Persistent "Level Up!" pulse button in toolbar when choices are pending
- Extra Attack for martial classes (Fighter/Barbarian/Paladin/Ranger/Monk) at level 5+
  - Quick Attack rolls 2 attacks with independent hit/miss, feat bonuses applied
  - Attack button shows "x2" badge
- Turn enforcement: combat actions (Attack, Cast Spell, Class Ability, Dodge, Dash) disabled when not player's turn
  - Buttons greyed out with "Wait for your turn" tooltip
- Sound FX wiring: `playMagicSpell()` on spell cast, `playLevelUp()` fanfare on level-up, `playHealing()` on heal/rest, `playLootDrop()` jingle on loot drops
  - 3 new synthesized sounds: level-up fanfare (C major rising), healing shimmer (warm rising), loot jingle (metallic)

### Concentration tracking + feat integration
- **Status:** Done
- Spell concentration enforcement: casting a new concentration spell drops existing concentration
  - Conditions applied by the dropped spell are removed from all units
  - `concentratingOn` field on Unit tracks active concentration spell name
- Concentration saves on damage: DC = max(10, floor(damage/2))
  - CON save (d20 + CON mod), War Caster feat adds +2 to concentration saves
  - Failure: drops concentration, removes sourced conditions
  - Success: maintains concentration with log message
  - Messages collected via ref and drained into combat log after attacks
- Feat bonuses wired into game mechanics:
  - Alert feat: +5 initiative bonus in rollInitiative
  - Tough feat: +2 HP per level on future level-ups in grantXP
  - War Caster feat: +2 to concentration saves in damageUnit
  - All feat bonuses (attack, damage, initiative, saves, HP) integrated
- CharacterSheet enhancements:
  - Feats section with description and color-coded bonus badges
  - "Ability Score Improvement available!" indicator when ASI pending
  - Concentration indicator panel showing active concentration spell
  - Units now exposed from useGame for unit-level data in CharacterSheet

### Terrain mechanics + movement rules
- **Status:** Done
- `speed` (cells, default 6 = 30ft) and `movementUsed` fields on Unit interface
  - Monk gets bonus speed at higher levels (scaled from D&D 5e Unarmored Movement)
  - Speed initialized in `rollInitiative`, `movementUsed` reset on `nextTurn`
- Terrain cost map: floor/door/pit = 1 cell, water/difficult = 2 cells, wall/void = impassable
- BFS pathfinding: `computeReachableCells()` Dijkstra-style BFS computes all reachable cells within remaining movement budget
- Movement range overlay: green-tinted cells with subtle borders shown during drag in combat
- Movement enforcement: dropping a token outside reachable range snaps it back; within range deducts cost
- Pit damage: landing on a pit cell deals 1d6 damage via `damageUnit`
- Door toggle: clicking a door cell (with no token on it) opens the door (converts to floor); DM tool can re-place doors
- Movement indicator in map legend: shows current unit's remaining movement in feet during combat
- Token positions remain local to BattleMap.tsx; speed/movementUsed live on Unit in GameContext (reset per turn)
- Out of combat: free movement (no range restriction), only wall/void blocking preserved

### Dash mechanics + condition visuals + hidden traps
- **Status:** Done
- Dash action: doubles remaining movement for the turn (grants extra speed cells as negative movementUsed)
  - Button shows disabled after use, tooltip explains mechanic
  - Movement indicator in map legend shows lightning bolt icon when dashed
- Token condition indicator pips: colored dots rendered above tokens on the battle map
  - 10 condition colors matching CONDITION_EFFECTS (poisoned=green, stunned=yellow, burning=orange, dodging=sky, raging=red, inspired=indigo, etc.)
  - Pips auto-layout horizontally with dark background for readability
- Hidden trap system: 4 trap types (Spike, Fire, Poison, Alarm)
  - `Trap` interface: id, col, row, type, detected, triggered
  - DM places traps via new trap tools (only visible in DM mode)
  - Traps render as colored diamonds with "!" on the map
  - Traps invisible to players unless detected
  - Trigger on token landing: roll damage + apply condition (fire=burning 2 rounds, poison=poisoned 3 rounds)
  - `rollTrapDamage()` parses "XdY" formulas for trap damage
  - Erase DM tool removes traps at the cell
  - Dungeon regeneration clears all traps
- Search for Traps button: d20 Perception check vs DC 13
  - Reveals hidden traps within 3-cell Manhattan distance of selected unit
  - Results shown in trap message bar (found X traps / area seems safe / found nothing)
  - Requires a unit to be selected
- Trap message bar: red-themed notification above map legend, shows latest trigger/search result, clearable

### Spatial combat engine
- **Status:** Done
- Created `src/lib/mapUtils.ts` — shared spatial types and pure functions:
  - `TerrainType`, `TokenPosition`, `TERRAIN_COST`, `DEFAULT_COLS/ROWS` exports
  - `computeReachableCells()` — BFS pathfinding with terrain costs (moved from BattleMap)
  - `findBestMoveToward()` — finds the reachable cell closest to a target (Chebyshev distance)
  - `isAdjacent()` — Chebyshev distance <= 1 check for melee range
- Lifted `terrain` (TerrainType[][]) and `mapPositions` (TokenPosition[]) from BattleMap local state to GameContext
  - Both accessible from Game.tsx, BattleMap, and any future component
  - BattleMap generates initial dungeon on mount via useEffect (terrain starts as void in context)
  - BattleMap reads/writes terrain and positions through context setters
- Enemy AI map movement:
  - During enemy turns, AI finds the targeted player's position
  - Uses `findBestMoveToward()` to pathfind toward target within movement budget
  - Updates both position (on map) and movementUsed (on unit) in context
  - Movement narrated in DM messages ("Goblin moves 15ft toward Aric.")
- Melee adjacency enforcement:
  - Enemies: if not adjacent after moving, skip attack and end turn ("can't reach target — ends turn")
  - Players: Quick Attack button disabled with "Too far — move adjacent to attack" tooltip
  - Graceful fallback: if positions don't exist (e.g. before map renders), adjacency defaults to true
- Architecture: BattleMap still owns rendering, drag/drop, fog, DM tools, traps; GameContext now owns terrain grid and token positions

## Backlog / Roadmap

### Round 26: D1 Database + Persistent Users + Chat Persistence (PARTIAL — Phase 1 done)
**Goal:** Move from ephemeral/KV-only storage to a relational D1 database for structured data. Enable persistent user identity across auth providers, campaign party management, and chat history that survives page refreshes.

**Phase 1 — DONE (this commit):**
- D1 bindings in `wrangler.toml` (dev/staging/prod) + `wrangler.test.toml`
- `D1Database` interface + `DB` binding in Env (`_worker.ts`)
- `ensureUser()` — lazy-upserts Discord user into D1 `users` + `auth_providers` tables on every authenticated request. Falls back to `provider:id` format if D1 unavailable.
- `getJwtPayload()` — extracts full JWT payload (user + provider) from cookie
- `GET /api/chat/:roomId` — load recent chat messages from D1 (supports `limit` + `before` pagination)
- `POST /api/chat/:roomId` — save a chat message to D1
- `GET /api/party/:roomId` — list party members with user details (JOIN query)
- `POST /api/party/:roomId/join` — join/update party membership (upsert)
- `DELETE /api/party/:roomId/leave` — leave a campaign party
- `GET /api/user/me` — full user profile from D1 with linked auth providers
- `src/lib/chatApi.ts` — frontend helper: `loadChatHistory()` + `persistChatMessage()` (fire-and-forget)
- Lobby.tsx: loads chat history from D1 on mount, persists outgoing chat messages
- Game.tsx: loads chat history from D1 on mount, persists outgoing chat messages
- Makefile targets: `d1-dev`, `d1-staging`, `d1-prod`, `d1-migrate-dev`, `d1-migrate-staging`, `d1-migrate-prod`

**Phase 2 — DONE (this commit):**
- Persist dice rolls to D1: roller persists their own roll on `roll_result` (avoids duplicates), local/offline rolls persisted via `handleRollComplete`
- Persist DM narration to D1: `callDmNarrate` persists after successful AI response
- Persist NPC dialogue to D1: `callNpcDialogue` persists with NPC name/role metadata
- Persist player actions to D1: `handlePlayerAction` persists at send site
- Auto-join party on WebSocket `welcome` (fire-and-forget POST to `/api/party/:roomId/join` with role)
- Google OAuth: `GET /api/auth/google` redirect + `GET /api/auth/google/callback` token exchange. JWT includes `provider: 'google'`, normalized user object. `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` in secrets. `ensureUser()` handles Google avatar (full URL in `picture` field).
- Google sign-in button on Home.tsx (inline Google "G" SVG alongside Discord button)
- GameContext + Home.tsx avatar handling updated for Google users (`user.picture` || Discord CDN URL)
- Home.tsx: party member avatars on campaign cards (stacked avatar row, up to 5 + overflow count)
- Makefile: `secrets-google` target for Google OAuth secrets

**Phase 3 — NOT YET STARTED:**
- Migrate campaign list from KV to D1 `campaigns` table
- Persist join/leave/system messages to D1 (currently transient)
- Campaign settings panel (rename, description)
- Link account: connect Google + Discord to same D1 user

**D1 schema:**
- `users` — persistent identity (UUID, display name, avatar). One row per human, linked to one or more auth providers.
- `auth_providers` — links Discord/Google/future providers to a user. Primary key: (provider, provider_user_id).
- `campaigns` — campaign metadata (name, owner, settings). Replaces the KV-based campaign list.
- `party_members` — who's in each campaign, which character they're playing, their role (DM/player).
- `chat_messages` — persistent chat per campaign. Real-time via WebSocket, persisted to D1 on send, loaded on page mount.

**Storage strategy:**
| Data | Storage | Reason |
|------|---------|--------|
| Users, campaigns, party, chat | D1 (SQL) | Relational queries, joins, indexes |
| Characters (full JSON blobs) | KV | Large unstructured blobs, no joins needed |
| Portraits (encrypted binary) | KV | Binary data, simple key lookup |
| Map images (PNG/JPG/WebP) | R2 | Large binary, CDN-cacheable |
| Campaign game state (units, terrain, combat) | KV | Large JSON snapshots, no relational queries |
| Doodle pad strokes | DO memory + D1 archival | Real-time in DO, archived to D1 on session end |

### Round 27: Landing Page + Lobby + Seat Model + Campaign Management Polish
**Goal:** Rebrand as player-first, implement the 0-to-N seat model in the lobby, and flesh out campaign management.

**Landing page (DONE — updated Round 28):**
- [x] Hero section with tagline ("Your table. Your rules."), player-first messaging
- [x] Hero copy updated: "AI DM, players, and tools available when you want them, invisible when you don't" — not just "tools"
- [x] Hero mentions spectators: "or just watch the chaos unfold as a spectator"
- [x] Feature highlights: 6 cards (Any Party Size, Full 5e Combat, Tactical Maps, Live Dice, Every Seat Your Call, Spectate)
- [x] Inline quick actions (Join, New Campaign, Create Character)
- [x] Campaign dashboard cards: grid layout, DM name, player count, party avatars, Lobby/Play split buttons
- [x] Character dashboard cards: portrait, HP bar, AC/gold/items, stat modifier row (STR/DEX/CON/INT/WIS/CHA), Edit button
- [x] Campaigns always show Lobby link (navigates to /lobby/:id — creates lobby session on connect if none exists)
- [x] Empty states with calls-to-action for both campaigns and characters
- [x] Removed "AI-powered" branding from all surfaces
- [x] Auth buttons (Discord + Google) in header — already done
- [ ] "How it works" section (create campaign, invite friends, play) — deferred

**Seat model (DONE):**
- [x] `Seat` interface: `{ id, type: human|ai|empty, playerId?, username?, avatar?, characterId?, characterName?, ready }`
- [x] Default 4 player seats (all empty), DM seat separate (human or AI)
- [x] Auto-claim: humans claim first empty seat on join, seat reverts on disconnect
- [x] `ready` toggle per seat, `select_character` per seat
- [x] `set_seat_type` — DM toggles empty ↔ AI (can't change occupied human seats)
- [x] `add_seat` / `remove_seat` — DM adds/removes seats (max 8, min 1)
- [x] `set_dm_type` — DM toggles DM role between human and AI
- [x] AI seats auto-ready, human seats must manually ready
- [x] `seats_updated` broadcast on any seat change
- [x] `welcome` includes `seats`, `dmSeatType`, `seatId` for the joining player
- [x] All seat operations DM-auth gated (except `set_dm_type` which allows any player to claim human DM when current DM is AI)
- [x] 11 new tests: default seats, auto-claim, ready toggle, character select, AI toggle, DM auth, add/remove, disconnect revert, DM type toggle, kick player, REST endpoint

**Lobby UI (DONE):**
- [x] Seat roster replaces flat player list — card per seat with type badge, avatar, character, ready state
- [x] DM controls: "+ AI" / "Remove" buttons on empty/AI seats, "→ AI/Human" toggle for DM seat
- [x] Ready toggle button on your own seat
- [x] Character select dropdown from your characters list
- [x] "Start Game" gated: enabled when all occupied seats are ready, or DM can override
- [x] "All Ready" indicator in header
- [x] "Make DM" transfer button on human seats (DM only)
- [x] "+ Seat" / "- Seat" buttons for DM

**Campaign settings (DONE):**
- [x] `PATCH /api/campaigns/:roomId` — rename + description update
- [x] Campaign name editable inline in lobby header (click to edit, DM only)
- [x] Collapsible "Settings" panel with name, description, invite link + copy
- [x] Campaign name loaded from server on lobby mount

**Kick player (DONE):**
- [x] `kick_player` message type in lobby.ts — DM-auth gated
- [x] Vacates player's seat, sends `kicked` message, closes their WebSocket
- [x] `player_kicked` broadcast to remaining players
- [x] Kicked player gets redirected to Home with toast notification
- [x] Kick button on human seats (DM only, can't kick yourself)

**Seat-to-game bridge (DONE):**
- [x] "Start Game" stores seat's characterId in sessionStorage
- [x] Game.tsx reads `adventure:seatCharId:{room}` on mount, auto-selects character
- [x] Falls back to campaign-saved characterId if no seat assignment

**Campaign management (remaining — deferred to Round 29/30):**
- [ ] Campaign archive (soft delete, can restore)
- [ ] Public/private visibility toggle (Round 29)
- [ ] Campaign browser API (Round 29)

### Round 28: Character + Game Board + DM Tools Polish
**Goal:** Enhance the character creation experience, improve the battle map, and give DMs better tools.

**Character creation:**
- [x] Step-by-step wizard flow (Identity → Appearance → Background → Personality → Stats → Review)
- [x] Preview sidebar showing character portrait, stats, background as you build
- [x] AI Build shortcut (fills all fields, jumps to Review)
- [x] Edit mode jumps directly to Review (all fields pre-filled)
- [ ] AI-generated backstory hooks based on party composition
- [ ] Import characters from D&D Beyond / Foundry VTT JSON

**Game board:**
- [x] Minimap with click-to-pan (4px/cell, terrain + token dots + viewport rect, toggle button)
- [x] AoE spell templates in BattleMap (circle/cone/line/cube, hover preview, click confirm, ESC cancel)
- [x] Initiative tracker with turn timer countdown (60s default, green→yellow→red, pulse at 10s)
- [x] **AoE wired into Game.tsx** — `activeAoE`/`pendingAoESpell` state, spell click enters targeting mode + switches to map view, `onAoEConfirm` applies multi-target damage with per-unit saves, AoE badge on spell list, targeting banner with cancel
- [x] Animated token movement — easeInOutQuad interpolation between grid cells, requestAnimationFrame loop during animation, `animateMoveRef` callback for Game.tsx to trigger enemy AI animations, remote `token_move` events also animate
- [x] Hover tooltips on initiative bar (HP, AC, abilities with cooldowns, conditions with durations, speed, CR, concentration)
- [ ] Fog of war per-player (each player sees only from their token — currently global fog)

**DM tools:**
- [x] DM sidebar panel (collapsible w-72, left side) with 3 tabs: Encounter, NPC, Notes
- [x] Encounter tab: difficulty selector (4 levels), spawn button, active unit list with HP, scene name
- [x] Encounter difficulty calculator: D&D 5e DMG p.82 XP thresholds per party level, live XP budget display, current encounter rating
- [x] NPC tab: NPC Talk mode toggle, name/role inputs, dialogue history
- [x] Quick NPC generator: random race + name (from names.ts) + role + personality + quirk, auto-fills NPC name/role, adds character note to dialogue history
- [x] Notes tab: auto-saved textarea (localStorage per room), character counter
- [x] Music/ambiance system — 5 procedural mood presets (tavern, dungeon, forest, combat, mystery) via Web Audio API oscillators + filtered noise. Fade in/out, LFO modulation, auto-switch to combat on encounter spawn. DM sidebar selector (always visible at bottom)

### Round 29: Lobby Hub + Role-Based Flows + Campaign Discovery
**Goal:** Restructure the home page and lobby into a role-aware hub. DMs create campaigns, players find games, spectators browse. Public/private lobbies. Everything accessible from within a live lobby session.

**Home page role-based entry points:**
*Groundwork done: Home.tsx already has New Campaign + Create Character buttons, campaign dashboard cards with Lobby/Play, character cards with stat overview. Round 29 adds the discovery/browse layer and explicit role entry points.*
- **"New Campaign" (DM button)** — create campaign, name it, set public/private, configure seats (human/AI/empty), pick or create a character, land in lobby as DM
- **"Create Character" (Player button)** — character creation flow, then optionally find a campaign to join
- **"Find a Campaign" (Player section)** — browse public lobbies looking for a game to join as a player. Filter by open seats, party size, campaign name. Private lobbies listed with lock icon, require password to join
- **"Find a Party" (DM section)** — DM has a campaign, looking for players to fill seats. Post your campaign as public or share invite link for private. See who's looking for games
- **"Spectate" (Spectator section)** — browse active public lobbies to watch. Join as spectator (see everything, chat, no game actions). No account required for spectating (stretch goal)

**Public vs Private lobbies:**
- DM sets visibility on campaign creation (default: private)
- **Public**: listed in campaign browser, anyone can join an open seat
- **Private**: listed in browser with lock icon, requires password to join. Password is a simple string set by the DM (e.g. "keith123") — not security theater, just a basic gate to keep randoms out
- Campaign browser shows: campaign name, DM name, player count, open seats, public/private badge
- Private lobby invite link still works (bypasses password for direct invites)
- DM can toggle public/private at any time from lobby settings

**Lobby as a persistent hub (while connected to a session):**
- Create new characters or edit existing ones (without leaving the lobby)
- View/preview the game board and campaign state
- Browse for more players — DM can post "looking for players" from within lobby
- Configure AI fills — set any empty seat to AI (DM/player/spectator) from the seat roster
- Character sheet viewer — inspect party members' characters
- All of this happens in-lobby, no page navigation, no WebSocket disconnect

**Spectator mode:**
- New role type: `spectator` (alongside DM and player)
- Spectators can see everything (map, chat, initiative, rolls) but can't take game actions
- Spectators can chat (distinguished in chat with spectator badge)
- AI spectator seat — an AI that watches the game and comments in chat (color commentary, reactions, rules clarifications). Fun novelty, fully optional
- Spectator count shown in lobby header
- Works with any campaign config including full-AI campaigns (watch AI play D&D)

**Data model changes:**
- `campaigns` table/KV: add `visibility: 'public' | 'private'`, `password?: string`, `status: 'lobby' | 'active' | 'finished'`
- `seats`: add `spectator` type alongside `human | ai | empty`
- New API: `GET /api/campaigns/browse` — list public campaigns with open seats
- New API: `POST /api/campaigns/:roomId/join` — join with optional password
- Lobby DO: handle spectator joins (no seat claim, read-only game events, chat allowed)

**Philosophy note:** "AI DM, players, and tools available when you want them, invisible when you don't."

### Round 30: Full Persistence + Local Cache
**Goal:** Everything persists. Browser cache for instant loads, server for cross-device sync.

**Browser cache strategy:**
- [ ] Service Worker for offline-first static assets
- [ ] IndexedDB for local cache of characters, campaign state, chat
- [ ] Optimistic UI: show cached data immediately, sync in background
- [ ] Cache invalidation via ETags or Last-Modified headers

**Server persistence coverage:**
| Feature | Currently | Target | Status |
|---------|-----------|--------|--------|
| Chat messages | D1 + WebSocket (load on mount) | Done | DONE |
| Dice roll history | D1 (persisted on roll) | Done | DONE |
| DM narration | D1 (persisted after AI response) | Done | DONE |
| NPC dialogue | D1 (persisted with NPC metadata) | Done | DONE |
| Player actions | D1 (persisted at send) | Done | DONE |
| Doodle pad strokes | DO memory (lost on eviction) | D1 archival + R2 snapshots | TODO |
| Combat state | KV auto-save (2s debounce) | KV auto-save + D1 audit log | PARTIAL |
| Character sheets | KV per user | KV + IndexedDB local cache | TODO |
| Portraits | KV (encrypted) | KV + browser cache (Cache API) | TODO |
| Map images | R2 (24h cache header) | R2 + browser Cache API | PARTIAL |
| Campaign metadata | KV list + D1 schema exists | Migrate KV → D1 | TODO |
| User preferences | localStorage | D1 + localStorage (sync) | TODO |

### Round 31: Visual Polish + Codebase Health (IN PROGRESS)
**Goal:** Make the app feel premium — slick animations, fantasy color palette, smooth transitions. Simultaneously decompose bloated files and optimize the bundle.

**Visual polish (IN PROGRESS):**
- [x] Fantasy CSS animation system: 10 keyframes (fadeInUp, cardReveal, shimmer, gentleFloat, glowPulse, gradientShift, slideIn, popIn, emberRise, borderGlow)
- [x] Utility classes: `.animate-fade-in-up`, `.animate-card-reveal`, `.stagger-children`, `.text-shimmer`, `.card-glow`, `.hero-gradient`, `.btn-glow`, `.animate-float`, `.feature-card`, `.game-card`, `.hp-bar-shimmer`, `.stat-badge`, `.input-glow`, `.crit-flash`, `.page-enter`
- [x] Fantasy color palette tokens: ember, gold, mystic, arcane, dragon, forest
- [x] Polished scrollbar (gradient thumb, thinner)
- [ ] Hero section: animated gradient background, shimmer on tagline
- [ ] Feature cards: `.feature-card` class, staggered entrance, subtle hover glow
- [ ] Campaign/character cards: `.game-card` class, staggered entrance, hover lift
- [ ] CTA buttons: `.btn-glow` pulse on primary actions
- [ ] Page entrance animation on Home, Lobby, Game
- [ ] Lobby UI: card hover effects, seat card animations
- [ ] Game UI: crit flash on dice rolls, HP bar shimmer, smoother transitions

**Codebase decomposition (IN PROGRESS):**
- [x] `src/types/game.ts` — all shared interfaces and type definitions (~300 lines extracted)
- [x] `src/data/enemies.ts` — enemy templates, encounter themes, generateEnemies (~100 lines)
- [x] `src/data/items.ts` — loot tables, shop items, rollLoot (~100 lines)
- [x] `src/data/spells.ts` — spell list, spell slots, class abilities, feats (~120 lines)
- [x] Wire up imports: GameContext.tsx re-exports from new files (backward compat)
- [x] Verify 0 TS errors + all 153 tests pass after rewiring
- [x] `src/components/game/LevelUpModal.tsx` — ASI/feat modal (161 lines, uses useGame internally)
- [x] `src/components/game/CharacterPicker.tsx` — character select screen (76 lines)
- [x] `src/hooks/useEnemyAI.ts` — enemy AI combat hook (285 lines, consumes useGame)
- [x] `src/components/game/DMSidebar.tsx` — DM tools sidebar (277 lines, owns dmSidebarTab state)
- [x] `src/components/game/NarrationPanel.tsx` — narration view (308 lines, character status + quest tracker + DM history + combat log + action input)
- [x] `src/types/game.ts` — Quest interface moved from inline Game.tsx definition
- [x] `src/components/game/CombatToolbar.tsx` — combat actions + DM controls toolbar (745 lines, 22 unused imports cleaned from Game.tsx)
- [ ] WS Message Handler (~308 lines → useGameWebSocket custom hook)
- [ ] Campaign Persistence (~128 lines → useCampaignPersistence custom hook)
- [ ] Shop View (~94 lines)

**Bundle optimization:**
- [x] Hono security patch: 4.12.5 → 4.12.7 (Dependabot CVE fix)
- [ ] Lazy load routes: `React.lazy()` for Game, CharacterCreate, Lobby (heavy pages)
- [ ] Manual chunks: split vendor (react, react-dom) from app code
- [ ] Target: 703KB → under 400KB initial load

**Error handling improvements (from code review):**
- [ ] Add `console.error` to all bare `catch {}` blocks in _worker.ts
- [ ] Standardize error response shape: `{ error: string }` everywhere
- [ ] Add AbortController timeout to client-side AI fetch calls

### Round 32: Mobile + Accessibility (PLANNED)
**Goal:** Touch-friendly on phones/tablets, accessible to all players.

- [ ] Mobile-responsive lobby (collapsible panels, touch-friendly seat cards)
- [ ] Mobile-responsive game (swipeable views: narration/map/chat/sheet)
- [ ] Touch-friendly battle map (pinch zoom, tap to select, long-press to move)
- [ ] Accessibility "Low-FX" mode (reduced motion, high contrast, screen reader hints)
- [ ] `prefers-reduced-motion` media query: disable all animations automatically
- [ ] Keyboard navigation for combat actions
- [ ] ARIA labels on interactive elements

### Round 33: Cloudflare Access/IDP + Campaign Invites (PLANNED)
**Goal:** Corporate/team login, campaign sharing via Discord DM.

- [ ] Cloudflare Access login (waiting on external setup)
- [ ] Campaign invite links via Discord DM (bot or webhook)
- [ ] Lobby chat reactions (emoji reactions on messages)
- [ ] Campaign archive (soft delete, can restore)

### Future rounds

**Infrastructure:**
- Lobby DO hibernation — `this.state.acceptWebSocket()` for cost reduction
- Undo/redo for DM actions (command pattern, rewindable state stack)
- Rate limiting + abuse protection on public lobbies
- Service Worker for offline-first static assets
- IndexedDB local cache for characters, campaign state, chat

**Gameplay depth:**
- Multiclass support (second class on level-up, shared spell slots)
- Reaction system expansion (Shield, Counterspell, Hellish Rebuke on enemy turn)
- Inventory trading between players (drag to portrait)
- Dice macros / saved roll shortcuts
- Initiative reroll / manual editing (DM drag-reorder)
- Weather/lighting effects on battle map (rain, fog, darkness, torch light)
- Random encounter tables (per biome/dungeon level, auto-roll between rests)
- Downtime activities (crafting, research, carousing)
- Familiar/companion tokens (separate initiative, player-controlled)

**Content & Import/Export:**
- Import from D&D Beyond / Foundry VTT / Roll20 JSON
- Export to Pathfinder 2e, Forbidden Lands, Savage Worlds
- VTT map import (Foundry, Roll20 map files → BattleMap background)
- Homebrew content editor (custom races, classes, spells, items, monsters)
- Pre-built adventure modules (starter dungeons, one-shots)
- Monster manual browser (CR, type, environment filters)

**Visual & Audio:**
- Particle effects for spells (fire, ice, lightning, healing shimmer)
- Map layers (background, terrain, tokens, effects — separate composited layers)
- Sound FX expansion — remaining spell effects, death saves, conditions
- Portrait gallery — save/browse AI portraits, remix styles, share with party
- Dynamic lighting (token light sources, darkvision, dim light zones)

**Social & Community:**
- AI session recap ("last time on..." from combat log + chat)
- Campaign timeline / session log (auto-generated, browseable)
- Journal/notes — shared campaign notes, session summaries, DM-only notes
- Discord integration for voice/chat (Activity SDK or webhook)
- Drop-in/drop-out guest characters (no account, temporary token)
- Campaign templates (share setup for others to clone)

**AI enhancements:**
- AI player turn logic (AI seats actually play — move, attack, cast)
- AI DM encounter pacing (dynamic difficulty mid-combat)
- AI rules lawyer (passive — flags rule violations in chat)
- AI session prep (DM goals → generated maps + encounters + NPCs)
- AI voice narration (TTS with distinct NPC voices)
- Dynamic difficulty auto-scaling

## Known Technical Debt

- `damageUnit` has randomness in concentration saves (d20 roll) — RESOLVED: we broadcast the resolved result (full unit state via `game_sync`) rather than replaying the action.
- `rollInitiative` has randomness (d20 per unit) — RESOLVED: broadcasts sorted result array.
- `tickConditions` has randomness (1d6 burning damage) — RESOLVED: broadcasts result state.
- BattleMap takes zero props — RESOLVED: added `BattleMapProps` with `onTokenMove`/`onTerrainChange` callbacks.
- React `setUnits` is async (batched) — RESOLVED: closure capture + ref-based delayed broadcasts.
- `useWebSocket` assigns new UUID on every reconnect — RESOLVED: stable `playerId` persisted to `sessionStorage`, sent in `join` message, Lobby DO reuses it on reconnect.
- No auth on DM-only actions — RESOLVED: Lobby DO tracks DM (`dmPlayerId`), rejects `dm_narrate`/`dm_npc`/`dm_action` from non-DM players. DM transfer via `transfer_dm` message.
- `send()` silently drops messages when socket not OPEN — RESOLVED: message queue (cap 100) flushed on reconnect.
- Lobby DO uses no persistent storage — all state lost on eviction/hibernation. Strokes, player list, etc. are ephemeral. (Deferred — DO hibernation migration)

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
- Inventory/loot system: item types, equipment slots, loot tables, combat drops, CharacterSheet UI, potion use, AC recalc
- Shop system: curated merchant inventory, buy/sell with gold, shop tab in game view, category filters
- Spell system: 25 spells, spell slots (full/half caster tables), cast in combat, spellbook in CharacterSheet
- Combat depth: enemy stat blocks with abilities/conditions, smart AI targeting, weapon-based player attacks, CR-based rewards
- Combat actions + condition spells + quest tracker: Dodge/Dash actions, 4 condition spells, collapsible quest panel, long rest clears unit conditions
- Class abilities + saving throws: 12 unique class abilities, spell save DC system, half damage on save, per-class color theming
- Encounter variety + themes + combat log: 16 enemy templates, 12 encounter themes, togglable color-coded combat log panel
- Turn flow + magic items + epic loot: context-aware End Turn button, turn indicator banner, expanded loot tables, epic loot tier
- Character progression + combat polish: ASI/feats at levels 4/8/12/16/19, Extra Attack for martial classes, turn enforcement, sound FX wiring
- Concentration tracking + feat integration: spell concentration D&D 5e rules, feat bonuses in combat, CharacterSheet feats display
- Terrain mechanics + movement rules: BFS pathfinding, terrain costs, movement range overlay, pit damage, door toggle, Monk speed bonus
- Dash mechanics + condition visuals + hidden traps: real Dash doubles movement, condition pips on tokens, 4 trap types, DM trap tools, Perception search
- Spatial combat engine: map state lifted to context, enemy AI pathfinding + movement, melee adjacency enforcement for players and enemies
- Ranged combat + line of sight: Bresenham LOS raycasting, weapon/ability/spell range enforcement, DEX for ranged weapons, smart ranged enemy AI, new ranged weapons (Shortbow, Hand Crossbow, Longbow +2, Oathbow)
- Test framework: vitest 3.2.4 + @cloudflare/vitest-pool-workers, dual config (plain + workers pool), 4 test files across 3 categories (player/multiplayer/AI), 97 tests passing + 2 budget-skipped, Makefile targets, budget-aware AI_TESTS env var
- Illustrated portraits (Phase 1): 20 WebP character portraits (8 races + 12 classes) cropped from reference art, wired into all portrait locations (CharacterCreate, Home, Game, CharacterSheet) with cascade fallback
- Dice rolls in chat: local rolls appear in chat history even offline, CharacterName[PlayerName] format, crit/fumble gradient styling with glow effects, fun default names
- Dead code cleanup: removed `buildMiniPortraitDataUrl` from portrait.ts, empty door-closing stub from BattleMap.tsx, unused `originalDestGetter` from useSoundFX.ts
- AI timeout hardening: backend `aiRunWithTimeout` wrapper (25s text / 45s image) for all 10 `c.env.AI.run()` calls in _worker.ts; frontend `fetchWithTimeout` wired into all 10 AI fetch calls in CharacterCreate.tsx (7 calls) and Game.tsx (3 calls, 35s text / 45s encounter)
- Multiplayer session sync (Phases 1-7): Result-broadcasting with suppression flag architecture. Lobby DO relays `game_event`/`state_request`/`state_response`. GameContext functions return computed results via closure capture. Game.tsx sync infrastructure: `broadcastGameEvent`, `broadcastCombatSync`, ref-based delayed broadcasts. 10 event types: `game_sync`, `encounter_spawn`, `token_move`, `terrain_update`, `map_positions`, `character_update`, `scene_sync`, `quest_sync`, `state_request`, `state_response`. Late-join recovery via state request/response. All combat actions, enemy AI, map interactions, character stats, scenes, and quests now sync across players. DoodlePad late-join replay (stroke history in DO memory, capped 5000), "X is drawing..." attribution indicator.
- Opportunity Attacks + Disengage: D&D 5e reaction system — `reactionUsed` and `disengaged` fields on Unit, reset each turn. `findOpportunityAttackers()` pure function in mapUtils.ts checks adjacency transitions, reaction availability, stun immunity, disengage bypass. Enemy OA on player movement (BattleMap handleMouseUp), player OA on enemy movement (Game.tsx enemy AI useEffect). Disengage combat action button (violet themed). 8 new OA tests (105 total). Synced via broadcastCombatSyncLatest.
- Map image persistence (R2): DM can upload battle map background images (PNG/JPG/WebP/GIF, max 10MB) via DM Mode toolbar. Images stored in Cloudflare R2 (`MAP_IMAGES` binding, `adventure-maps-{env}` buckets). API: `POST /api/map/upload` (base64 data URL → R2), `GET /api/map/:id` (stream from R2, 24h cache), `DELETE /api/map/:id`. BattleMap draws uploaded image as canvas background layer — floor/void cells become transparent when image present, special terrain (walls, water, etc.) still renders on top. Fog of war, tokens, traps all layer correctly. `mapImageUrl` state in GameContext, persisted in campaign save/load. Multiplayer sync via `map_image` game event + `state_response` late-join recovery. Upload/Clear buttons in DM tools (emerald themed). Makefile targets: `r2-dev`, `r2-staging`, `r2-prod` for bucket creation.
- Condition system overhaul: Split overloaded `blessed` condition into distinct types — `dodging` (Dodge action +2 AC), `raging` (Barbarian Rage +2 atk), `inspired` (Bardic Inspiration +2 atk/saves). `blessed` reserved for Bless spell only. Wired `effectiveAC()` into all 5 attack roll sites (enemy basic melee, enemy abilities, player quick attack, player OA, enemy OA in BattleMap). Implemented D&D 5e prone advantage/disadvantage via `rollD20WithProne()` helper (melee vs prone = advantage, ranged vs prone = disadvantage, prone attacker = disadvantage, adv+disadv cancel per 5e rules). Combat log shows [adv]/[disadv] tags. CONDITION_COLORS in BattleMap updated for new types. Combat log highlighting includes all 10 condition types. 22 new condition tests (127 total).
- Phase 8 session robustness + DM role UI: Stable reconnect IDs (sessionStorage + Lobby DO reuse), DM authorization (first joiner = DM, server-enforced DM-only messages, reassignment on disconnect), DM transfer (`transfer_dm` message type), rate limiting (10 game_events/sec per client), message queue (100-cap offline buffer), DM role UI gating (`canUseDMTools` = `isDM || !wsConnected` — gates encounter, NPC talk, scene name, narration input, Begin Adventure in Game.tsx; DM mode toggle, terrain paint, traps, map upload in BattleMap.tsx; "Make DM" transfer button in Lobby.tsx). DM/Player badge in toolbar. 6 new Phase 8 tests (133 total).
- D1 Database Phase 1: D1 bindings in wrangler.toml (all envs) + wrangler.test.toml. `D1Database` interface + `DB` binding in Env. `ensureUser()` lazy-upserts Discord users into D1 `users`/`auth_providers` tables (graceful fallback if D1 unavailable). `getJwtPayload()` helper. Chat persistence: `GET/POST /api/chat/:roomId` (D1). Party management: `GET/POST/DELETE /api/party/:roomId` with JOIN queries. `GET /api/user/me` full user profile with auth providers. Frontend `chatApi.ts` helper (loadChatHistory + persistChatMessage). Lobby.tsx + Game.tsx load chat history on mount, persist outgoing messages. Makefile: d1-dev/staging/prod + d1-migrate-dev/staging/prod targets. Migration SQL: `users`, `auth_providers`, `campaigns`, `party_members`, `chat_messages` tables with indexes.
- D1 Database Phase 2: Full chat persistence — dice rolls, DM narration, NPC dialogue, player actions all persisted to D1 (roller/sender persists to avoid duplicates). Auto-join party on WebSocket welcome (fire-and-forget). Google OAuth: standard browser redirect flow (`/api/auth/google` + callback), normalized user object in JWT, `ensureUser()` handles Google avatar URLs. Google "G" button on Home.tsx alongside Discord. GameContext + Home.tsx avatar handling updated for multi-provider (Google `picture` URL vs Discord CDN hash). Party member avatars on campaign cards (stacked row, 5 max + overflow). Makefile: `secrets-google` target.
