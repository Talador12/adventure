# Adventure — Project Status

See `AGENTS.md` for architecture, build commands, and conventions.

## Rules
- Update this file with every commit.

## Branch Strategy
- `staging` — active development
- `main` — stable releases

## Current Focus

Round 12 shipped: turn flow improvements, magic items, epic loot tier. Context-aware End Turn button, turn indicator banner, expanded loot tables with epic tier. Next: multiplayer map sync, journal/notes, or character progression depth.

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
- 7 condition types: poisoned (-2 atk/saves), stunned (skip turn, -2 AC), frightened (-2 atk), blessed (+2 atk/saves), hexed (-2 saves), burning (1d6/turn), prone (-2 atk)
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
  - Barbarian: Rage (+2 atk blessed for 3 rounds, long rest)
  - Rogue: Sneak Attack (2d6 extra damage, short rest)
  - Paladin: Lay on Hands (heal level*5, long rest)
  - Ranger: Hunter's Mark (hex target 3 rounds, short rest)
  - Monk: Flurry of Blows (2d4 damage, short rest)
  - Cleric: Channel Divinity (heal level*d6, short rest)
  - Bard: Bardic Inspiration (blessed 3 rounds, short rest)
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
- Inventory/loot system: item types, equipment slots, loot tables, combat drops, CharacterSheet UI, potion use, AC recalc
- Shop system: curated merchant inventory, buy/sell with gold, shop tab in game view, category filters
- Spell system: 25 spells, spell slots (full/half caster tables), cast in combat, spellbook in CharacterSheet
- Combat depth: enemy stat blocks with abilities/conditions, smart AI targeting, weapon-based player attacks, CR-based rewards
- Combat actions + condition spells + quest tracker: Dodge/Dash actions, 4 condition spells, collapsible quest panel, long rest clears unit conditions
- Class abilities + saving throws: 12 unique class abilities, spell save DC system, half damage on save, per-class color theming
- Encounter variety + themes + combat log: 16 enemy templates, 12 encounter themes, togglable color-coded combat log panel
- Turn flow + magic items + epic loot: context-aware End Turn button, turn indicator banner, expanded loot tables, epic loot tier
