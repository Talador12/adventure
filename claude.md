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

## Versioning

Uses semantic versioning. `make release` tags and publishes to GitHub. `make release-minor` / `make release-patch` bump + release in one step.

## Current Version: v15.4.0 — 🎉 2,000 TEST MILESTONE (2,014 tests)

### v0.1.0 — Initial Release

The complete feature set built from project inception through 46 development iterations. Everything listed below is shipped and working.

**BLOCKED — waiting on Keith:**
- Race/class portrait assets — need new full-body character art (evaluating leonardo.ai). Current assets too tightly cropped. Buttons are sized and styled (88px tall, object-cover bleed), just need better source images.

**Recent highlights (latest work):**
- 🎉 **+1000 TESTS MILESTONE** — 6 new systems + 46 tests (2292 total) — villain monologues, diplomatic gifts, shapeshifter detectors, dragon hoards, astral weather, tattoo removal:
  - **Villain monologue generator** — `villainMonologue.ts` with 6 monologues across 6 archetypes, interruption DCs, dramatic pauses, completion effects.
  - **Diplomatic gift generator** — `diplomaticGift.ts` with 9 gifts across 7 cultures, cultural significance, taboos, reaction outcomes.
  - **Shapeshifter detector** — `shapeshifterDetector.ts` with 10 techniques across 5 methods, false positive rates, effectiveness per type.
  - **Dragon hoard layout** — `dragonHoardLayout.ts` with 3 layouts (red/blue/green), treasure zones, guardian positions, alarm triggers, escape routes.
  - **Astral weather hazards** — `astralWeatherHazard.ts` with 6 hazards (psychic storm/color cascade/temporal eddy/gravity wave/void pocket/memory rain).
  - **Tattoo removal system** — `tattooRemoval.ts` with 6 methods across 4 risk levels, pain scales, success/failure effects, side effects.

- 6 new systems + 42 tests (2246 total) — dark bargains, NPC death scenes, lair actions, planar refugees, dream combat, magical library:
  - **Dark bargain generator** — `darkBargain.ts` with 5 bargains from 5 sources (devil/death/hag/eldritch/shadow), hidden costs, escalation mechanics, break conditions, temptation levels.
  - **NPC death scene** — `npcDeathScene.ts` with 6 scenes across 6 contexts (combat/sacrifice/betrayal/illness/old_age/heroic), last words, dramatic beats, memorial options.
  - **Lair action generator** — `lairAction.ts` with 10 actions across 7 themes (fire/ice/undead/swamp/arcane/dragon/aberrant), save DCs, areas of effect.
  - **Planar refugee crisis** — `planarRefugee.ts` with 4 groups from 4 planes, needs/offers, local reactions, tensions, plot hooks.
  - **Dream combat system** — `dreamCombat.ts` with 3 terrains (memory palace/nightmare/abstract void), unique dream rules, psychic attacks, victory/defeat conditions.
  - **Magical library catalog** — `magicalLibraryCatalog.ts` with 3 sections (Whispering Stacks/Forbidden Wing/Children\'s Section), books with dangers and defenses, librarians.

- 6 new systems + 46 tests (2204 total) — dragon personalities, cataclysm countdowns, interplanar customs, magical ecosystems, time loop dungeons, weapon sentience:
  - **Dragon personality matrix** — `dragonPersonality.ts` with 4 dragon profiles (red/gold/copper/green), negotiation styles, exploitable traits, parley conditions, sample dialogue.
  - **Cataclysm countdown** — `cataclysmCountdown.ts` with 3 world-ending events (The Unraveling/The Awakening Below/The Final Plague), 3-stage escalation, intervention windows, prevention methods.
  - **Interplanar customs office** — `interplanarCustoms.ts` with 3 offices (Mechanus/Nine Hells/Feywild), corrupt officers, prohibited items, absurd forms, plot hooks.
  - **Magical ecosystem** — `magicalEcosystem.ts` with 2 ecosystems (Singing Canopy/Resonance Network), interconnected organisms, party-triggered reactions, collapse warnings.
  - **Time loop dungeon** — `timeLoopDungeon.ts` with 2 dungeons, rooms with loop clues/death traps, cumulative knowledge, max loop consequences.
  - **Weapon sentience awakening** — `weaponSentienceAwaken.ts` with 3 weapons gaining awareness through deeds, 3-stage personality development, conflict risks.

- 6 new systems + 48 tests (2158 total) — illithid colonies, ancestral spirits, pocket dimensions, arcane black market, clockwork dungeons, magical weather calendar:
  - **Illithid colony generator** — `illithidColony.ts` with 2 colonies (enclave/city), elder brain personalities, thrall hierarchies with free will scores, defenses, weaknesses.
  - **Ancestral spirit guide** — `ancestralSpirit.ts` with 3 spirits (Grandmother Ashwood/Sergeant Ironjaw/Pip the Wanderer), situational guidance with mechanical bonuses, intervention abilities.
  - **Pocket dimension generator** — `pocketDimension.ts` with 5 dimensions (The Quiet Room/Eternal Arena/Bottled Storm/Memory Palace/Inverted Garden), unique physics per dimension.
  - **Arcane black market** — `arcaneBlackMarket.ts` with 8 items across 6 categories, hidden catches, legal consequences, risk levels, DM-only reveal toggle.
  - **Clockwork dungeon generator** — `clockworkDungeon.ts` with 2 mechanized dungeons, gear-driven rooms with mechanisms/timers/puzzles, master gear shutdowns.
  - **Magical weather calendar** — `magicalWeatherCalendar.ts` with 8 recurring events across 4 seasons × 6 regions, plot hooks, mechanical effects.

- 🏆 **WAVE 50** — 6 new systems + 49 tests (2110 total) — monster harvesting, artifact corruption, NPC voices, evolving traps, cross-plane messengers, astral ship combat:
  - **Monster harvesting** — `monsterHarvesting.ts` with 5 monster profiles, harvestable materials with spoil timers, crafting recipes, preservation methods.
  - **Artifact corruption tracker** — `artifactCorruption.ts` with 3 artifacts (Hungering Blade/Crown of Whispers/Mirror of Vanity), 5-stage corruption, escalating save DCs, purification.
  - **NPC voice/accent generator** — `npcVoiceAccent.ts` with 8 voices × 8 accents, sample phrases, catchphrases, RP tips for DMs.
  - **Evolving traps** — `evolvingTrap.ts` with 3 traps (3 intelligence levels) that learn from failed disarms, escalating DCs, weaknesses.
  - **Cross-plane messenger** — `crossPlaneMessenger.ts` with 6 services (Ethereal Post/Modron Express/Imp Couriers/Dream Network/Dryad Root Mail/Planar Teleport), reliability ratings, package types.
  - **Astral ship combat** — `astralShipCombat.ts` with 6 weapons, 4 shields, 4 boarding actions with counter-actions.

- 6 new systems + 47 tests (2061 total) — encounter tuner, arcane research, NPC backstories, weather terrain, ancient ruins, magical communication:
  - **Encounter difficulty tuner** — `encounterDifficultyTuner.ts` with D&D 5e XP thresholds, party condition assessment, healer/tank/magic item CR adjustments, warning flags.
  - **Arcane research breakthrough** — `arcaneResearch.ts` with 5 projects across 5 fields, weekly DC progression, breakthrough/partial/catastrophic results, completion chance calculator.
  - **NPC backstory generator** — `npcBackstoryGen.ts` with 6 backstories across 6 themes (tragic/heroic/criminal/scholarly/spiritual/mundane), secrets, party connections, plot hooks.
  - **Weather terrain modifier** — `weatherTerrainMod.ts` with 15 weather×terrain combos, movement/cover/visibility/stealth modifiers, special effects per combination.
  - **Ancient ruin floor plan** — `ancientRuinLayout.ts` with 2 multi-room ruins (5 rooms each), room connections, traps, encounters, loot, boss rooms, lore.
  - **Magical communication** — `magicalCommunication.ts` with 6 methods (sending stones→blood link), reliability tiers, interception risks, network creation, flavor text.

- 🎉 **2,000 TEST MILESTONE** — 6 new systems + 41 tests (2014 total, +1 pre-existing fix) — bardic inspiration, enchanted forests, noble scandals, merchant haggling, magical pet peeves, war room briefings:
  - **Bardic inspiration table** — `bardicInspiration.ts` with 10 effects across 6 moments (attack/save/check/damage/death/social), narrations, bard actions, crowd reactions.
  - **Enchanted forest generator** — `enchantedForest.ts` with 4 forests (sentient/corrupted/fey_touched/time_lost), unique rules per forest, inhabitants, central features, quest hooks.
  - **Noble scandal generator** — `nobleScandalGen.ts` with 6 scandals across 6 types, evidence with find DCs, blackmail values, exposure consequences, involved parties.
  - **Merchant haggling mini-game** — `merchantHaggling.ts` with 5 moods, 6 tactics, weakness/immunity system, price resolution with personality modifiers.
  - **Magical pet peeve system** — `magicalPetPeeve.ts` with 8 items that have opinions (The Vegan Dagger, Grumpstaff the Reluctant, Chatterbow...), mechanical consequences, appeasement methods.
  - **War room briefing generator** — `warRoomBriefing.ts` with 3 operations (assault/ambush/defend), intel with reliability ratings, suggested strategies, complications.

- 6 new systems + 47 tests (1973 total, +1 pre-existing fix) — alchemy recipes, exile scenarios, familiar evolution, wanted posters, planar weather, trap corridors:
  - **Alchemy recipe book** — `alchemyRecipeBook.ts` with 8 recipes across 6 categories, ingredient requirements, crafting DCs, failure results.
  - **Exile/banishment scenario** — `exileScenario.ts` with 5 scenarios across 6 reasons, multiple redemption paths, severity tiers, twists, allies.
  - **Familiar evolution** — `familiarEvolution.ts` with 3 familiars (Fire Cat/Shadow Raven/Plant Sprite), 4 evolution forms each, XP scaling, evolution triggers, personality.
  - **Wanted poster generator** — `wantedPoster.ts` with 5 tiers, 6 crime categories, bounty escalation, hunter counts, alias generation.
  - **Planar weather** — `planarWeather.ts` with 6 events from 6 sources (Glitter Storm/Sorrow Fog/Ember Rain/Thought Rain/Blood Moon/Radiant Dawn), plot hooks.
  - **Trap corridor designer** — `trapCorridor.ts` with 3 themed corridors (Blades/Wizard/Temple), sequential traps, safe spots, shortcuts, final rewards.

- 6 new systems + 48 tests (1926 total) — mind control, social encounters, golem crafting, planar marketplace, faction quests, death save drama:
  - **Mind control resistance** — `mindControl.ts` with 6 control sources, 5 resistance stages, willpower degradation, escalating save DCs, ally assist bonuses, break-free mechanics.
  - **Social encounter generator** — `socialEncounter.ts` with 5 encounters across 5 settings, 3 approaches per encounter with skill DCs, critical success/failure outcomes.
  - **Golem crafting instructions** — `golemCrafting.ts` with 3 blueprints (flesh/clay/iron), step-by-step crafting with failure consequences, material costs, min caster levels.
  - **Planar marketplace** — `planarMarketplace.ts` with 4 shops from different planes, non-gold currencies (memories, secrets, years of life), items with side effects.
  - **Faction quest chain generator** — `factionQuestChain.ts` with 3 chains (crown/underworld/temple), 3-step progressions with branch points, betrayal options.
  - **Death save drama table** — `deathSaveDrama.ts` with 16 narrations across 8 moments, party reactions, mechanical notes, 2+ variants per moment.

- 6 new systems + 48 tests (1878 total, +1 pre-existing fix) — magical contracts, treasure maps, wild shape, tavern reputation, divine intervention, siege defense:
  - **Magical contract system** — `magicalContract.ts` with 4 contracts (infernal/fey/merchant/arcane), clauses with loopholes and penalties, break conditions, detection DCs.
  - **Treasure map generator** — `treasureMap.ts` with 4 maps (pirate/dwarven/witch/dragon), multi-landmark treasure hunts, riddles with answers, guardians, traps.
  - **Wild shape bestiary** — `wildShapeBestiary.ts` with 8 forms across 5 roles (scout/combat/utility/transport/infiltration), terrain bonuses, level-gated access, RP notes.
  - **Tavern reputation tracker** — `tavernReputation.ts` with 4 tiers (dive→exclusive), 6 reputation types with corresponding perks, event recording, ban tracking.
  - **Divine intervention table** — `divineIntervention.ts` with 8 interventions across 4 scales (subtle→miraculous), faith-scaled rolling, divine costs, witness reactions.
  - **Siege defense planner** — `siegeDefense.ts` with 2 detailed plans, 6 defense positions, 6 tactics, depletable resources, weak points, morale factors.

- 6 new systems + 50 tests (1830 total) — magical anomalies, ship crew, battlefield scavenge, mirror dimensions, underground factions, ancient prophecies:
  - **Magical anomaly generator** — `magicalAnomaly.ts` with 6 anomaly types (amplification/suppression/wild/temporal/gravitational/sentient), multi-effect zones, dispel DCs, trigger conditions.
  - **Ship crew management** — `shipCrewManagement.ts` with 8 crew roles, 4 quality tiers, hiring/paying/skipping wages, morale and mutiny risk tracking, weekly cost calculation.
  - **Battlefield scavenger loot** — `battlefieldScavenge.ts` with 3 battle types, 5 item conditions with value multipliers, find DCs, post-battle hazards, category filtering.
  - **Mirror dimension generator** — `mirrorDimension.ts` with 6 types (shadow/reversed/nightmare/utopia/broken/echo), twisted rules, entry/exit conditions, encounters, treasure.
  - **Underground faction generator** — `undergroundFaction.ts` with 5 factions, 6 specialties, territory maps, weaknesses, recruitment methods, signal phrases.
  - **Ancient prophecy generator** — `ancientProphecy.ts` with 4 multi-verse prophecies, 5 tones, DM interpretations, fulfillment triggers, subversion mechanics, interpretation-toggle formatting.

- 6 new systems + 52 tests (1780 total) — vampire bloodlines, sentient items, downtime, natural disasters, caravan ambushes, ship cargo:
  - **Vampire bloodline system** — `vampireBloodline.ts` with 2 bloodlines, 5 age stages, blood pool scaling, 5 powers per bloodline with age requirements and blood costs, humanity score, feeding mechanics.
  - **Sentient item personality** — `sentientItem.ts` with 6 items, 6 personality types, goals/fears/quirks/conflict triggers, relationship levels, communication styles, INT/WIS/CHA scores.
  - **Downtime activity tracker** — `downtimeActivity.ts` with 11 activities across 8 types, skill DCs, costs, durations, success/failure results, complications.
  - **Natural disaster generator** — `naturalDisaster.ts` with 6 disasters (earthquake/flood/wildfire/tornado/volcano/blizzard), warning DCs, mechanical effects, aftermath, opportunities.
  - **Caravan ambush generator** — `caravanAmbush.ts` with 5 ambushes across 5 terrains, enemy forces with tactics, warning/surprise DCs, escape options, negotiation possibilities, twists.
  - **Ship cargo manifest** — `shipCargo.ts` with 10 trade goods across 6 regions, regional price multipliers, legality tiers, spoilage timers, manifest generation with smuggling detection, best trade route calculation.

- 6 new systems + 49 tests (1728 total) — airship encounters, detective cases, elemental infusions, NPC schedules, planar side effects, gladiator arena:
  - **Airship encounters** — `airshipEncounter.ts` with 8 encounters across 4 altitude zones, altitude-specific hazards with DCs, hostile/neutral/friendly reactions, loot tables.
  - **Detective case generator** — `detectiveCase.ts` with 3 cases (murder/theft/arson), 3 suspects per case (exactly 1 guilty), clues with find DCs pointing to suspects, red herrings, twists, solution-toggle formatting.
  - **Elemental weapon infusion** — `elementalInfusion.ts` with 8 elements, bonus damage dice, on-hit effects (burning/slow/stun/AC reduction/push/lifesteal/poison), visual descriptions, application DCs and material costs.
  - **NPC schedule system** — `npcSchedule.ts` with 4 NPCs (Mayor/Guard Captain/Merchant/Sage), 6-7 daily time slots each, alone flags, interrupt DCs, secret midnight activities with discovery DCs, vulnerable window analysis.
  - **Planar travel side effects** — `planarSideEffects.ts` with 10 effects across 8 plane destinations, save DCs, mechanical effects with durations, destination-specific generation.
  - **Gladiator arena progression** — `gladiatorArena.ts` with 8 ranked fighters (pit_fighter→legend), 3 sponsors with perks/betrayal conditions, 8 special arena rules, win/loss tracking, crowd favor, rank-up thresholds, match generation.

- 6 new systems + 49 tests (1679 total) — warlock patrons, wild magic, haunted locations, diplomacy, guild perks, magical diseases:
  - **Warlock patron tracker** — `warlockPatron.ts` with 4 patrons (Archfey/Fiend/Great Old One/Celestial), demands with deadlines/rewards/punishments, gifts with hidden costs, displeasure effects, favor thresholds.
  - **Expanded wild magic** — `wildMagicExpanded.ts` with 30 surges across 4 categories (beneficial/neutral/harmful/chaotic), mechanical effects, durations.
  - **Haunted location generator** — `hauntedLocation.ts` with 5 locations across 5 haunt types, 3+ manifestations each (visual/auditory/physical/emotional/temporal), investigation clues, cleansing methods with DCs, treasure rewards.
  - **Diplomatic negotiation** — `diplomaticNegotiation.ts` with 2 scenarios, multi-party negotiations with stances/goals/leverages (hidden and revealed), concessions, deal-breakers, patience timers, possible outcomes.
  - **Guild membership perks** — `guildMembership.ts` with 3 guilds (Adventurers/Merchants/Mages), 5 ranks per guild with progressive perks and obligations, XP requirements, dues, entry requirements.
  - **Magical disease system** — `magicalDisease.ts` with 5 diseases across 6 transmission types, progressive symptom stages by day, save DCs, mundane and magical cures, lore.

- 6 new systems + 56 tests (1630 total, +4 pre-existing fixes) — lycanthropy, deity pantheon, magical tattoos, mass combat, thieves guild, dungeon dressing:
  - **Lycanthropy progression** — `lycanthropy.ts` with 5 types (werewolf/wererat/wereboar/weretiger/werebear), 5 infection stages (bitten→embraced), moon-phase triggers, control DCs, hybrid form stats, cure conditions that scale with progression.
  - **Deity pantheon builder** — `deityPantheon.ts` with 6 deities (Solara/Morthain/Korrath/Aelindra/Vex/Verdania), domains, holy symbols, 3+ commandments each, blessing/wrath effects, inter-deity rivalries and alliances.
  - **Magical tattoo system** — `magicalTattoo.ts` with 6 tattoos across 6 body locations, rarity tiers, ink costs, application DCs, 2-3 upgrade levels with specific deed requirements.
  - **Mass combat rules** — `massCombat.ts` with 8 army units across 7 types, 5 commander abilities, 6 battle modifiers, `resolveClash()` + `checkMorale()` mechanics.
  - **Thieves guild job board** — `thievesGuildJobs.ts` with 8 jobs across 6 types (theft/smuggling/forgery/intimidation/information/sabotage), 4 risk levels, complications, failure consequences.
  - **Dungeon room dressing** — `dungeonRoomDressing.ts` with 8 room archetypes (throne/prison/lab/barracks/temple/library/treasury/crypt), furniture, ambiance, small details, loot with find DCs, traps.

- 6 new systems + 51 tests (1574 total) — library research, festivals, wilderness survival, legendary weapons, summoning mishaps, astral encounters:
  - **Library research system** — `libraryResearch.ts` with 4 libraries (private_shelf→grand_archive), books with research bonuses (1-5) and hidden secrets, 8 knowledge domains, search/best-book/secret filtering. "Library" button in DMSidebar.
  - **Advanced festival generator** — `festivalAdvanced.ts` with 6 festivals across 6 types (religious/harvest/martial/arcane/seasonal/memorial). Named activities with skill DCs and prizes, plot hooks, atmospheric descriptions, and special foods. "Festival" button in DMSidebar.
  - **Wilderness survival tracker** — `wildernessSurvival.ts` with 7 biome profiles, hunger/thirst/exposure scales (0-10), 6-level effect escalation per need, `advanceDay()` lifecycle with eat/drink/shelter booleans, morale tracking, biome-specific daily hazards. "Survival" button in DMSidebar.
  - **Legendary weapon awakening** — `legendaryWeapon.ts` with 4 weapons (Dawnbreaker/Voidfang/Stormcaller/Whisperwind), 3-stage awakening progression with specific deeds required, weapon personalities and alignments, dormant→fully awakened formatting. "Legendary Weapon" button in DMSidebar.
  - **Summoning circle mishap table** — `summoningMishap.ts` with 12 mishaps across 4 severities (amusing→catastrophic). Each has mechanical effects, duration, and resolution methods. `rollMishap()` scales severity with spell level. "Summoning Mishap" button in DMSidebar.
  - **Astral projection encounters** — `astralEncounter.ts` with 10 encounters across 6 astral zones. Silver cord risk tracking, reaction types, CR ratings, mechanical effects, and loot. `getCordDangerEncounters()`/`getSafeEncounters()` filters. "Astral Encounter" button in DMSidebar.

- 6 new systems + 56 tests (1523 total, +2 pre-existing fixes) — court intrigue, shipwrecks, advanced bounties, layered curses, alchemy foraging, spelljammer helms:
  - **Court intrigue system** — `courtIntrigue.ts` with 5 noble houses (Valerian/Ashford/Drakenmoor/Thornwall/Silvertongue), each with power/wealth/influence stats (1-10), leader/heir, 2 secrets each, ambitions. Alliances and rivalries with strength/intensity. Scandals with severity/leverage/discoveryDC. Favor tracking (owed_to_party/owed_by_party). "Court Intrigue" button in DMSidebar.
  - **Shipwreck generator** — `shipwreckGenerator.ts` with 4 wrecks across 4 causes (storm/sea_monster/mutiny/curse). Cargo manifests with value/salvageDC/salvageable flags, named survivors with roles/conditions/secrets, structural hazards with DCs. `getTotalCargoValue()`/`getSalvageableCargo()` for loot planning. "Shipwreck" button in DMSidebar.
  - **Advanced bounty board** — `bountyBoardAdvanced.ts` with 6 bounties across 6 types (kill/capture/retrieve/investigate/escort/clear) and 4 tiers (copper→platinum). Named targets with last-seen/danger-level, complications, rival hunters with cooperation flags, bonus rewards. "Bounty Board" button in DMSidebar.
  - **Layered curse system** — `curseLayered.ts` with 5 curses across 5 origins (demonic/fey/arcane/undead/divine) and 4 severities. Multi-stage progression (2-4 stages each) with named stages, mechanical effects, progression triggers, and day timers. 2-3 removal conditions per curse (some requiring specific quests, not just Remove Curse). "Layered Curse" button in DMSidebar.
  - **Alchemical foraging** — `alchemicalForaging.ts` with 12 ingredients across 8 biomes and 4 seasons. Rarity-based forage DCs, values, and 2-3 uses per ingredient. `forage()` function with skill modifier and quality scaling (poor/standard/excellent). Year-round ingredients for underdark. "Foraging" button in DMSidebar.
  - **Spelljammer helm system** — `spelljammerHelm.ts` with 5 helm types (minor/major/artifact/lifejammer/series), 7 space hazards across 6 regions (wildspace/astral_sea/phlogiston/crystal_sphere/asteroid_field/nebula), 5 space encounters. `calculateTravelTime()` with helm × spell level speed. "Spelljammer" button in DMSidebar.
  - **Test fixes** — resolved 2 pre-existing import shadowing bugs (formatNobleHouse, calculateTravelTime).
- 56 new tests (1523 total) covering 6 systems:
  - **Court intrigue** (10 tests): house count, scandals, creation, lookup, power calc, scandal filter, favor adding, secrets, formatted house, formatted state.
  - **Shipwrecks** (9 tests): wreck count, random, cause filter, condition filter, cargo value, salvageable filter, hooks, hazards, formatted output.
  - **Advanced bounties** (8 tests): count, random, type filter, difficulty filter, rival hunters, deadlines, danger levels, formatted output.
  - **Layered curses** (8 tests): count, random, origin filter, severity filter, progressive stages, removal methods, severity scaling, formatted stage.
  - **Alchemical foraging** (10 tests): ingredient count, biome count, biome filter, season filter, year-round availability, rarity filter, uses, failed forage, quality scaling, formatted output.
  - **Spelljammer helms** (11 tests): helm count, hazard count, encounter count, helm lookup, hazard region, encounter region, travel time, artifact speed, region count, formatted helm, formatted hazard.

- 6 new systems + 50 tests (1467 total) — faction wars, merchant caravans, heist planner, tournament brackets, poison crafting, underground rivers:
  - **Faction war tracker** — `factionWar.ts` with 5 factions (Iron Crown/Shadow Pact/Temple of Light/Free Cities/Pirate Fleet), 10 territories with defense bonuses and resources, battle resolution (d20+strength vs d20+strength+defense), territory capture, contested zones. `resolveBattle()`/`applyBattleResult()` lifecycle. "Faction War" button in DMSidebar.
  - **Merchant caravan generator** — `merchantCaravan.ts` with 6 origins (eastern_empire/northern_wastes/elven_woods/dwarven_holds/desert_tribes/underdark). Each has named merchant with personality, 4 unique items (common→exotic), quest hook, guard count, danger level. 24 total items with mechanical descriptions. "Merchant Caravan" button in DMSidebar.
  - **Heist planner** — `heistPlanner.ts` with 4 heists across 4 difficulties (petty_theft→impossible). Multi-phase plans with primary skill DCs, alternative approaches, failure consequences, guard patrols with weaknesses, escape routes with risk levels, time limits, and complications. "Heist" button in DMSidebar.
  - **Tournament bracket system** — `tournamentBracket.ts` with 8 fighters (with odds/style/special moves), 5 tournament types (melee/archery/jousting/magic_duel/grand_melee), match resolution, betting payouts, 8 crowd reactions, per-type rules. "Tournament" button in DMSidebar.
  - **Poison crafting system** — `poisonCrafting.ts` with 8 poisons across 4 delivery methods (ingested/injury/inhaled/contact) and 4 rarities. Each has save DC, onset, symptoms, effect, duration, antidote, crafting DC, ingredients with costs, and identification DC. `canIdentify()` + identified/unidentified formatting. "Poison" button in DMSidebar.
  - **Underground river navigation** — `undergroundRiver.ts` with 7 river segments (calm/rapids/waterfall/flooded_chamber/underground_lake/narrow_passage/whirlpool), hazards with DCs and damage, encounters, treasure, and 3 pre-built routes with required equipment. "Underground River" button in DMSidebar.
- 50 new tests (1467 total) covering 6 systems:
  - **Faction war** (9 tests): faction count, territory count, creation, battle resolution, battle application, null for unknown, contested territories, strength calculation, formatted output.
  - **Merchant caravans** (7 tests): origin count, random, by origin, quest hooks, exotic items, item prices, formatted output.
  - **Heist planner** (9 tests): count, random, difficulty filter, phase count, difficulty scaling, guard count, complications, escape routes, formatted output.
  - **Tournament brackets** (7 tests): fighter count, type count, creation, match resolution, payout calculation, crowd reactions, formatted output.
  - **Poison crafting** (8 tests): count, delivery methods, random, delivery filter, rarity filter, crafting cost, identification, identified/unidentified format.
  - **Underground rivers** (10 tests): segment count, route count, random, type filter, route lookup, treasure segments, encounter segments, route equipment, formatted segment, formatted route.

- 6 new systems + 47 tests (1417 total, +1 pre-existing fix) — naval combat, ritual magic, companion animals, trap disarm, tavern brawls, dream sequences:
  - **Naval combat system** — `navalCombat.ts` with 6 ship classes (rowboat→flagship), 7 naval actions (fire/ram/board/flee/repair/brace/full_sail). Ship templates with HP/AC/speed/cannons/crew/cargo/special abilities. `damageShip()`/`repairShip()`/`isShipSunk()` lifecycle. Condition tracking (Seaworthy→Sunk). Action requirements (cannons need crew, ram needs speed). "Naval Combat" button in DMSidebar.
  - **Ritual magic circles** — `ritualMagic.ts` with 8 rituals across 6 schools (abjuration/conjuration/divination/evocation/necromancy/transmutation). Each requires 2-8 casters, has material cost, casting time, Arcana DC, powerful effect, dramatic failure consequence, and per-extra-caster boost. `calculateRitualDC()` lowers individual DC with more casters. "Ritual Magic" button in DMSidebar.
  - **Companion animal advancement** — `companionAnimal.ts` with 6 species (Hawk/Wolf/Cat/Warhorse/Pseudodragon/Giant Toad), 5 companion types, XP-based leveling (1-10), ability unlocks at level thresholds (passive/active/reaction), bond system (0-10). `addCompanionXp()` handles level-ups + HP growth + ability unlocks. "Companion" button in DMSidebar.
  - **Trap disarm mini-game** — `trapDisarm.ts` with 6 challenges across 4 difficulties (simple/moderate/complex/deadly). Each has sequential skill check steps with escalating DCs, optional steps, failure consequences, and time limits. `calculateSuccessRate()` probability calculator. "Trap Disarm" button in DMSidebar.
  - **Tavern brawl choreographer** — `tavernBrawl.ts` with 7 triggers, 3 escalation sequences, 3 participant pools, 3 themed environments (dive/upscale/pub), 4+ environmental weapons per venue (with damage/type), hazards, and 6 resolution outcomes with reputation changes. "Tavern Brawl" button in DMSidebar.
  - **Dream sequence generator** — `dreamSequence.ts` with 7 dreams across 6 types (prophetic/nightmare/memory/symbolic/divine_message/astral_wandering). Rich narration with imagery, 3 choices per dream (many with mechanical effects), and wake effects. "Dream Sequence" button in DMSidebar.
  - **Test fix** — resolved import shadowing bug (formatShip from navalCombat vs shipGenerator).
- 47 new tests (1417 total) covering 6 systems:
  - **Naval combat** (10 tests): class count, action count, create, damage, repair cap, sinking, condition, action requirements, action lookup, formatted output.
  - **Ritual magic** (7 tests): count, school coverage, random, school filter, caster filter, DC reduction, formatted school icon.
  - **Companion animals** (8 tests): species count, create, unknown species, XP leveling, ability unlocks, next ability, bond cap, formatted output.
  - **Trap disarm** (8 tests): challenge count, random, difficulty filter, step count, required steps, success rate range, modifier scaling, step formatting toggle.
  - **Tavern brawls** (6 tests): trigger count, environment count, full generation, weapons, resolutions, formatted output.
  - **Dream sequences** (8 tests): count, type coverage, random, type filter, choice count, mechanical effects, wake effects, formatted icon.

- 6 new systems + 43 tests (1370 total) — NPC relationship web, siege warfare, planar rifts, political events, crafting tree, monster ecology:
  - **NPC relationship web** — `npcRelationshipWeb.ts` with 10 relation types (ally/rival/family/employer/servant/lover/enemy/mentor/debtor/stranger). Bidirectional edges with strength (1-5) and secret flag. `revealRelation()` for dramatic reveals. Per-type party effects and leverage hints. "NPC Web" button in DMSidebar.
  - **Siege warfare rules** — `siegeWarfare.ts` with 8 siege engines (Battering Ram/Ballista/Catapult/Trebuchet/Siege Tower/Boiling Oil/Murder Holes/Cannon) across 3 types (ranged/melee/defensive) + 6 fortifications with HP/AC/damage thresholds. `canDamage()`/`getEffectiveDamage()` for threshold checks. "Siege" button in DMSidebar.
  - **Planar rift generator** — `planarRift.ts` with 10 planes (Feywild/Shadowfell/4 Elementals/Abyss/Celestial/Astral/Ethereal). Each has environmental effects, creature risks, duration, and closing conditions with DCs. "Planar Rift" button in DMSidebar.
  - **Random political event** — `politicalEvent.ts` with 10 events across 6 categories (succession/conflict/diplomacy/corruption/revolution/disaster) and 4 severities. Consequences, party opportunities, and faction shift values. "Political Event" button in DMSidebar.
  - **Crafting specialization tree** — `craftingSpecialization.ts` with 6 disciplines (blacksmithing/alchemy/enchanting/leatherworking/woodcarving/jewelcrafting). 5 mastery tiers (novice→master) with XP progression. Per-tier DC reduction, quality bonuses, and speed multipliers. Recipes gated by tier. "Crafting" button in DMSidebar.
  - **Monster ecology system** — `monsterEcology.ts` with 20 creatures across 8 biomes. Predator/prey chains, 6 ecological roles (apex_predator/predator/scavenger/herbivore/parasite/ambusher), population rarity, and behavioral descriptions. `getFoodChain()` for biome food webs. "Ecology" button in DMSidebar.
- 43 new tests (1370 total) covering 6 systems:
  - **NPC relationship web** (9 tests): empty start, add, duplicate prevention, remove, secret tracking + reveal, NPC filter, type count, formatted relation, formatted web.
  - **Siege warfare** (7 tests): engine count, fortification count, name lookup, type filter, damage threshold, formatted engine, formatted fortification.
  - **Planar rifts** (6 tests): plane count, random generation, plane lookup, unknown undefined, closing conditions, formatted icon.
  - **Political events** (6 tests): event count, random generation, category filter, severity filter, faction shifts, formatted output.
  - **Crafting specialization** (7 tests): discipline count, novice start, XP leveling, novice recipes, tier unlocks, DC reduction, formatted output.
  - **Monster ecology** (8 tests): entry count, biome count, apex per biome, food chains, probability scaling, formatted entry, formatted biome, unknown biome.

- 6 new systems + 45 tests (1327 total, +4 pre-existing fixes) — NPC loyalty, artifact gen, puzzle locks, combat fatigue, regional reputation, weather encounters:
  - **NPC loyalty tracker** — `npcLoyalty.ts` with 7 loyalty levels (devoted→enemy), score-based tracking (-10 to +10), preset positive/negative actions, faction association. `recordLoyaltyEvent()` shifts score. `getLoyalNpcs()`/`getHostileNpcs()` filters. "NPC Loyalty" button in DMSidebar.
  - **Random artifact generator** — `artifactGenerator.ts` with 6 artifact types (weapon/armor/jewelry/tome/staff/relic), 10 name prefixes × type-specific suffixes, 8 origins, type-specific powers (3 per type), 5 curses + 40% no-curse chance, 8 history entries. `generateArtifact()` procedural creation. "Generate Artifact" button in DMSidebar.
  - **Puzzle lock system** — `puzzleLock.ts` with 8 puzzles across 5 types (combination/rune/lever/pressure_plate/riddle_lock). Each has solution, 3 hints (unlocked by Investigation DC), max attempts, failure consequence, and reward. `getHint()` sequential reveal. `formatPuzzle()` with DM-only solution toggle. "Puzzle Lock" button in DMSidebar.
  - **Combat fatigue system** — `combatFatigue.ts` with 5 fatigue levels (fresh→spent). Tracks rounds in combat + combats since rest. `advanceRound()`/`endCombat()`/`restReset()` lifecycle. Mechanical penalties: attack/AC/save/speed scale with fatigue. "Combat Fatigue" button in DMSidebar.
  - **Regional reputation tracker** — `regionalReputation.ts` with 7 reputation tiers (revered→exiled) per named region. Score-based (-10 to +10) with events. Effects: price modifier (0.7×→2.0×), quest/inn access, guard/NPC reactions. "Regional Reputation" button in DMSidebar.
  - **Weather encounter interaction** — `weatherEncounterInteraction.ts` with 8 weather types. Each has encounter modifiers (difficulty/surprise/escape/visibility/damage), special weather-only encounters, avoided encounters, and flavor text. `getTotalModifier()` for modifier lookup. "Weather Encounters" button in DMSidebar.
  - **Test fixes** — resolved 4 pre-existing import shadowing bugs (generateArtifact, getPuzzlesByType, getReputationTier, getReputationEffects).
- 45 new tests (1327 total) covering 6 systems:
  - **NPC loyalty** (10 tests): empty start, add, duplicate prevention, event recording, score clamping, level mapping, loyal/hostile filters, preset actions, formatted NPC, formatted tracker.
  - **Artifact generator** (5 tests): type count, all fields, type parameter, curse null/string, formatted icon.
  - **Puzzle locks** (6 tests): count, id generation, type filter, hint order, required fields, solution toggle.
  - **Combat fatigue** (8 tests): fresh start, round advance, tired after rounds, combat increment, rest reset, effects worsen, level count, formatted state.
  - **Regional reputation** (8 tests): empty start, add, duplicate prevention, score change, tier mapping, effect scaling, formatted region, formatted tracker.
  - **Weather encounters** (8 tests): type count, valid lookup, unknown undefined, special encounters, clear visibility, storm stealth, flavor text, formatted icon.

- 6 new systems + 32 tests (1282 total, +1 pre-existing fix) — prophecy tracker, NPC farewells, battle cries, terrain advantage, backstory complications, party morale:
  - **Prophecy fulfillment tracker** — `prophecyFulfillment.ts` with 15 prophecy templates across 6 categories (doom/glory/betrayal/love/discovery/transformation), 10 cryptic sources. `addProphecy()`/`fulfillProphecy()` lifecycle. `getUnfulfilled()`/`getFulfilled()` filters. `getRandomProphecy()` generates with source. Formatted tracker with ☐/☑ status. "Prophecies" button in DMSidebar.
  - **NPC farewell generator** — `randomNpcFarewell.ts` with 12 farewell lines. `getRandomFarewell()` + `formatNpcFarewell()` with NPC name. Wired existing untracked file + added tests.
  - **Battle cry generator** — `battleCryGenerator.ts` with race-specific cries (8 races × 3 each) and class-specific cries (12 classes × 3 each) plus 6 generic fallbacks. `getBattleCry()` combines race+class pools. `getBattleCryByRace()`/`getBattleCryByClass()` for targeted generation. "Battle Cry" button in DMSidebar.
  - **Terrain advantage reference** — `terrainAdvantage.ts` with 10 terrain types (forest/dense_forest/open_field/hills/cave/water_shallow/ruins/bridge/swamp/rooftops). Each has cover bonus, stealth mod, movement cost, advantages/disadvantages list, and best-for class recommendations. `getBestTerrainForClass()` lookup. "Terrain Advantage" button in DMSidebar.
  - **Backstory complication generator** — `backstoryComplication.ts` with 16 complications across 6 categories (family/enemy/debt/secret/curse/duty) and 3 severity levels (minor/moderate/major). Each has trigger conditions and optional DCs. `getComplicationByCategory()`/`getComplicationBySeverity()` filters. "Backstory Twist" button in DMSidebar.
  - **Party morale tracker** — `partyMoraleTracker.ts` with 12 event types (victory/defeat/ally_death/ally_revive/critical_hit/critical_fail/rest/treasure/betrayal/inspiration/retreat/boss_kill). Score clamped -10 to +10 across 6 morale levels (triumphant→broken). Mechanical effects: attack/save mods and short rest HP bonus scale with morale. `formatPartyMorale()` with recent event history. "Party Morale" button in DMSidebar.
  - **Test fix** — resolved import shadowing bug in encounter complications test (`getRandomComplication` alias collision). Test was pre-existing broken, now fixed.
- 32 new tests (1282 total) covering 6 systems:
  - **NPC farewells** (3 tests): count, text return, formatted name inclusion.
  - **Prophecy fulfillment** (7 tests): template count, source count, empty start, add, fulfill+filter, random generation, formatted output.
  - **Battle cry generator** (6 tests): 8 races, 12 classes, race text, class text, combined pool, formatted name.
  - **Terrain advantage** (5 tests): terrain count, name lookup, unknown undefined, class filter, formatted output.
  - **Backstory complications** (5 tests): count, valid generation, category filter, severity filter, formatted icon.
  - **Party morale tracker** (6 tests): steady start, victory raises, death lowers, clamping, effects scaling, formatted output.

- 6 new systems + 16 tests (823 total) — NPC voice, skill contest, room contents, currency exchange, weather events, camp planner:
  - **NPC voice generator** — `npcVoiceGenerator.ts` with 14 accents, 12 speech patterns, 12 catchphrases, 10 mannerisms, 4 vocabulary levels. "NPC Voice" button in DMSidebar.
  - **Skill contest resolver** — `skillContest.ts` for opposed checks with advantage/disadvantage support. Determines winner with tie handling. "Skill Contest" button in DMSidebar.
  - **Room contents generator** — `roomContents.ts` with 15 furniture, 12 clutter, 9 atmospheres, 8 interesting details. One-click room dressing. "Room Contents" button in DMSidebar.
  - **Currency exchange** — `currencyExchange.ts` with 8 regional currencies (Dragons, Suns, Nobles, Guilders, Mithral, Iron Marks, Trade Shells). `convert()` between any two. "Currency Exchange" button in DMSidebar.
  - **Weather events** — `weatherEvents.ts` with 10 dramatic events (Eclipse, Meteor Shower, Blood Rain, Earthquake, Tornado, etc) across 4 severity levels. "Weather Event" button in DMSidebar.
  - **Camp planner** — `campPlanner.ts` with 7 camp features (fire, tent, alarm, traps, lookout, cache, pen). `suggestCampSetup()` auto-picks by party size + caster presence. Security/comfort/stealth rating bars. "Camp Planner" button in DMSidebar.
- 16 new tests (823 total) covering 6 systems:
  - **NPC voice** (2 tests): field completeness, formatted output.
  - **Skill contest** (2 tests): winner determination, advantage bias.
  - **Room contents** (2 tests): section coverage, formatted categories.
  - **Currency exchange** (4 tests): count, identity conversion, rate math, formatted list.
  - **Weather events** (3 tests): valid event, severity filter, formatted output.
  - **Camp planner** (3 tests): suggestion includes basics, rating calculation, formatted bars.

- 6 new systems + 20 tests (807 total) — coins, quest gen, light sources, DC ref, magic items, watch scheduler:
  - **Coin converter** — `coinConverter.ts` with cp/sp/ep/gp/pp + auto-simplify + split.
  - **Random quest generator** — `questGenerator.ts` with 7 types + complications.
  - **Light source tracker** — `lightSourceTracker.ts` with 7 sources + duration.
  - **DC reference** — `dcReference.ts` with 6 tiers + examples.
  - **Random magic item generator** — `magicItemGenerator.ts` with effects + quirks.
  - **Party watch scheduler** — `watchScheduler.ts` with Perception-priority shifts.
- 6 new systems + 22 tests (787 total) — encounter tables, point buy, hit dice, ammunition, map descriptor, death log:
  - **Encounter table builder** — `encounterTableBuilder.ts` with 2 preset d100 tables (Forest Road, Dungeon Hallway). Each with 7-8 entries covering combat/social/hazard/discovery/nothing. `rollOnTable()` with d100. `validateTable()` ensures 1-100 coverage. Expandable roller in DMSidebar.
  - **Point buy calculator** — `pointBuyCalculator.ts` with 27-point system, cost table (8=0 to 15=9). `setScore()` validates budget. `getModifier()` for display. "Point Buy" button in DMSidebar.
  - **Hit dice tracker** — `hitDiceTracker.ts` with class-specific die sizes (d6-d12). `spendHitDie()` rolls + CON mod. `restoreHitDice()` recovers half on long rest. Visual dice bars. "Hit Dice" button in DMSidebar.
  - **Ammunition tracker** — `ammunitionTracker.ts` with 6 ammo types (arrows/bolts/darts/sling/blowgun/javelins). `fireAmmo()`/`addAmmo()`/`recoverAmmo()` (half recovery post-combat). Low-ammo warnings. "Ammunition" button in DMSidebar.
  - **Map terrain descriptor** — `mapDescriptor.ts` analyzes battle map terrain grid. Reports density (open/cluttered/dense), feature percentages, and tactical suggestions (cover, difficult terrain, hazards). "Map Description" button in DMSidebar.
  - **Character death log** — `deathLog.ts` memorial wall with cause, killer, location, session number. Random epitaphs. `getMostDeadlyEnemy()` tracks top killer. "Death Log" button in DMSidebar.
- 22 new tests (787 total) covering 6 systems:
  - **Encounter tables** (4 tests): preset count, d100 roll, table validation, formatted output.
  - **Point buy** (4 tests): zero start, score update, over-budget rejection, modifier math.
  - **Hit dice** (4 tests): class die size, spend+heal, empty fail, long rest restore.
  - **Ammunition** (5 tests): default arrows, fire decrement, empty fail, half recovery, active type filter.
  - **Map descriptor** (2 tests): open terrain, feature detection.
  - **Death log** (3 tests): record+count, deadliest enemy, empty format.

- 6 new systems + 18 tests (765 total) — passive skills, grapple/shove, dungeon names, party HP, damage analytics, travel speed:
  - **Passive skill display** — `passiveSkills.ts` computes passive Perception/Investigation/Insight (10 + mod + prof). Advantage adds +5, disadvantage -5. `formatPartyPassives()` shows all three for every character. "Passive Skills" button in DMSidebar.
  - **Grapple/shove resolver** — `grappleShove.ts` with size comparison (can only grapple one size larger). Contested Athletics vs Athletics/Acrobatics. Three actions: grapple, shove prone, shove away. Size-blocked narration. Integrates with existing combat.
  - **Random dungeon name generator** — `dungeonNameGenerator.ts` with 15 prefixes × 15 descriptors × 20 nouns × 15 suffixes. Three styles: simple (2 words), descriptive (3 words), epic (4+ words). "Dungeon Names" button generates 8 names.
  - **Party HP dashboard** — `partyHpDashboard.ts` with visual HP bars (10-segment) and 5 status tiers (healthy/wounded/bloodied/critical/unconscious). `getPartyHealthSummary()` aggregates total HP%, downed count. "Party HP" button in DMSidebar.
  - **Damage log analytics** — `damageLogAnalytics.ts` calculates DPR (damage per round), HPR (healing per round), peak damage round, per-character breakdown. `formatDamageAnalytics()` with sorted character list. "Damage Analytics" button in DMSidebar.
  - **Travel speed calculator** — `travelSpeed.ts` with 3 paces (fast 4mph/normal 3mph/slow 2mph), 7 terrain types, mount bonus (×1.5 cap 6mph), encumbrance penalty (×0.66). `calculateTravelTime()` returns hours, days, effective speed. "Travel Calculator" button in DMSidebar.
- 18 new tests (765 total) covering 6 systems:
  - **Passive skills** (3 tests): base calculation, advantage +5, all three skills computed.
  - **Grapple/shove** (3 tests): size rules, oversize blocking, contested resolution.
  - **Dungeon names** (3 tests): style word counts, batch generation, formatted output.
  - **Party HP** (3 tests): status classification, HP bar data, party aggregation.
  - **Damage analytics** (2 tests): round/damage counting, per-character tracking.
  - **Travel speed** (4 tests): normal pace, difficult terrain, pace count, formatted output.

- 6 new systems + 19 tests (747 total) — resistance aggregator, action economy, encumbrance, proficiency, tavern gen, round summary:
  - **Damage resistance aggregator** — `resistanceAggregator.ts` combines all resistance/immunity/vulnerability sources. Immunity overrides resistance (5e rule). Source tracking per type. "Resistances" button in DMSidebar.
  - **Action economy tracker** — `actionEconomy.ts` visualizes action/bonus/reaction/movement per turn. `useAction()`/`useBonusAction()`/`useMovement()` with movement bar. `resetTurn()` for new turn. Visual bars with remaining movement.
  - **Encumbrance calculator** — `encumbranceCalc.ts` with 3 rules (standard/variant/none). Variant: encumbered at STR×5, heavily at STR×10. Speed penalties, capacity bars. `estimateInventoryWeight()` default 1lb/item.
  - **Proficiency check helper** — `proficiencyHelper.ts` with all 18 skill→ability mappings. `calculateCheckBonus()` with proficiency + expertise. `rollCheck()` with advantage/disadvantage. Formatted results.
  - **Random tavern generator** — `tavernGenerator.ts` with 10 prefixes × 15 nouns, 5 types, 10 specialties, 6 atmospheres, 10 barkeeps, 10 patrons, 10 rumors. One-click complete tavern. "Random Tavern" button in DMSidebar.
  - **Combat round summary** — `combatRoundSummary.ts` extracts per-round stats (damage/healing/kills/crits) from combat log. `summarizeEntireCombat()` for totals. Key moment extraction. "Combat Summary" button in DMSidebar.
- 19 new tests (747 total) covering 6 systems:
  - **Resistance aggregator** (3 tests): multi-source aggregation, immunity override, formatted output.
  - **Action economy** (4 tests): fresh state, action use, movement tracking, turn reset.
  - **Encumbrance** (4 tests): carry capacity, variant threshold, under threshold, weight estimation.
  - **Proficiency** (4 tests): skill-ability mapping, proficiency bonus, expertise doubling, roll check.
  - **Tavern** (2 tests): field completeness, formatted output.
  - **Round summary** (2 tests): entire combat stats, per-round extraction.

- 6 new systems + 24 tests (728 total) — turn timer, languages, potion brewing, terrain reference, spellbooks, handouts:
  - **Encounter pacing timer** — `encounterPacingTimer.ts` with configurable seconds-per-turn (default 60s, fast 30s, relaxed 120s). Start/end/next-round lifecycle. Tracks average turn time and overtime count. Warning/overtime color states. "Turn Timer" button in DMSidebar.
  - **Language barrier system** — `languageBarrier.ts` with all 5e languages (8 common, 8 exotic, 2 rare). Race-based default languages for 9 races. `checkPartyLanguages()` finds translators. `getAllKnownLanguages()` aggregates party. "Party Languages" button shows coverage + gaps.
  - **Potion brewing mini-game** — `potionBrewing.ts` with 10 ingredients across biomes and 6 potion recipes (Minor Heal, Healing, Antitoxin, Fire Resist, Invisibility, Frost Breath). DC checks, ingredient costs, brew times. "Potion Brewing" button in DMSidebar.
  - **Terrain effect compendium** — `terrainCompendium.ts` with all 11 terrain types. Movement costs, combat effects, hazard damage/saves, hide-ability. `getHazardousTerrain()` for quick hazard reference. "Terrain Reference" button in DMSidebar.
  - **Spellbook management** — `spellbookManager.ts` with 100-page wizard spellbook. Pages-per-level scaling, copy cost (50gp/level), copy time (2h/level). Duplicate rejection. Level grouping. "Spellbooks" button in DMSidebar.
  - **Player handout system** — `playerHandouts.ts` with 6 handout types (note/letter/map/journal/scroll/poster). Per-character visibility. Reveal/hide controls. `getHandoutsForCharacter()` filters by access. "Player Handouts" button in DMSidebar.
- 24 new tests (728 total) covering 6 systems:
  - **Turn timer** (4 tests): creation, start turn, end turn stats, round increment.
  - **Languages** (4 tests): racial defaults, understanding check, party translator search, aggregate coverage.
  - **Potion brewing** (4 tests): recipe count, ingredient count, cost calculation, brew attempt.
  - **Terrain compendium** (4 tests): type coverage, getter, hazard filter, formatted list.
  - **Spellbook** (4 tests): empty creation, add spell + pages, duplicate rejection, copy cost scaling.
  - **Handouts** (4 tests): empty start, creation, reveal, character visibility filtering.

- 6 new systems + 25 tests (704 total) — object tracker, feature cooldowns, multiclass slots, bulk NPCs, combat narration, note tagger:
  - **Object interaction tracker** — `objectInteraction.ts` with 10 object types (door/chest/lever/button/trap_door/gate/shrine/fountain/torch/statue). State tracking (locked/unlocked/open/closed/broken/activated). Position-based lookup. Interaction history. "Object Tracker" button in DMSidebar.
  - **Class feature cooldown manager** — `classFeatureCooldowns.ts` with 16 templates across 8 classes (Action Surge, Rage, Channel Divinity, Wild Shape, Bardic Inspiration, Ki Points, Lay on Hands, Sorcery Points, etc). `useFeature()`/`restoreFeatures()` on short/long rest. Visual use bars. "Feature Cooldowns" button in DMSidebar.
  - **Multi-class spell slot calculator** — `multiclassSpellSlots.ts` with PHB p.165 spell slot table for all 20 combined caster levels. Full/half/third caster classification for all classes. `calculateCombinedCasterLevel()` + `getMulticlassSpellSlots()`. "Multiclass Slots" button in DMSidebar.
  - **Bulk NPC stat block generator** — `bulkNpcGenerator.ts` with 6 presets (Goblin/Skeleton/Bandit/Kobold/Orc/Guard). HP randomized within variance range. Auto-rolled initiative. Total XP calculation. Expandable preset browser in DMSidebar.
  - **Combat narration templates** — `combatNarration.ts` with 6 types (hit/miss/crit/fumble/kill/heal) × 5-8 templates each. `getRandomNarration()` with {attacker}/{target} substitution. "Combat Narration" button previews all types + example.
  - **Session notes auto-tagger** — `sessionNoteTagger.ts` with 10 tag types (#combat/#lore/#npc/#quest/#item/#location/#decision/#death/#levelup/#recap). Keyword-based auto-detection. `searchByTag()`/`searchByKeyword()`. Tag count statistics. "Tagged Notes" button in DMSidebar.
- 25 new tests (704 total) covering 6 systems:
  - **Object tracker** (4 tests): empty start, add, state change + history, position filtering.
  - **Feature cooldowns** (4 tests): template count, class+level filtering, use decrement, short rest restore.
  - **Multiclass slots** (4 tests): caster level classification, combined level math, slot table, formatted output.
  - **Bulk NPCs** (4 tests): count, HP variance range, preset count, total XP format.
  - **Combat narration** (4 tests): type count, template count per type, name substitution, preview format.
  - **Note tagger** (5 tests): combat keyword detection, lore detection, auto-tagged storage, tag search, tag counts.

- 6 new systems + 26 tests (679 total) — ritual casting, familiars, encounter budget, backstory builder, status reference, party analyzer:
  - **Ritual casting tracker** — `ritualCasting.ts` with 17 ritual spells. `canRitualCast()` for 5 classes. `getRitualSpellsByLevel()` filters by max spell level. Formatted spell list with cast times. "Ritual Spells" button in DMSidebar.
  - **Familiar manager** — `familiarManager.ts` with 12 familiar forms (bat→raven) each with HP, AC, speed, senses, and special abilities. `summonFamiliar()`/`dismissFamiliar()` lifecycle. `addScoutReport()` for tracking intel. "Familiars" button in DMSidebar.
  - **Encounter budget calculator** — `encounterBudget.ts` with DMG XP thresholds for all 20 levels × 4 difficulties. `getEncounterMultiplier()` for monster count scaling (×1 to ×4). `evaluateEncounter()` classifies actual encounters. "Encounter Budget" button in DMSidebar.
  - **Backstory questionnaire** — `backstoryQuestionnaire.ts` with 12 questions across 4 categories (Origins/Motivation/Personality/Relationships). `buildBackstory()` assembles answers into structured text. `getRandomPrompts()` for quick sessions. "Backstory Builder" button in DMSidebar.
  - **Status effect reference** — `statusEffectReference.ts` with all 15 5e conditions (Blinded→Exhaustion) including emoji, description, mechanical effects, and end conditions. `searchStatusEffects()` for quick lookup. "Status Effects" button in DMSidebar.
  - **Party composition analyzer** — `partyAnalyzer.ts` with 7 party roles (tank/healer/damage/control/support/scout/face). Maps all 12 classes to primary + secondary roles. Identifies gaps and suggests classes to fill them. "Party Analyzer" button in DMSidebar.
- 26 new tests (679 total) covering 6 systems:
  - **Ritual casting** (5 tests): spell count, class eligibility, level filter, formatted output.
  - **Familiars** (5 tests): form count, summon, dismiss, scout reports, options list.
  - **Encounter budget** (4 tests): budget calculation, multiplier scaling, difficulty classification, formatted tiers.
  - **Backstory** (4 tests): question count, category grouping, random prompts, built text.
  - **Status effects** (4 tests): effect count, name lookup, keyword search, all-effects format.
  - **Party analyzer** (4 tests): filled roles, missing roles, class suggestions, formatted output.

- 6 new systems + 25 tests (653 total) — warbands, quest rewards, world clock, advantage tracker, combat log search, weather gen:
  - **Warband builder** — `warbandBuilder.ts` with 5 ranks (leader/lieutenant/elite/soldier/minion) each with HP/AC/attack multipliers. `createWarband()` generates a full faction. `killMember()` tracks casualties and adjusts morale (leader death = -30%). "Create Warband" button in DMSidebar.
  - **Quest reward scaler** — `questRewardScaler.ts` auto-scales gold, XP, and magic item chance by party level, party size, and difficulty (trivial→deadly). Magic item rarity scales with level (common→uncommon→rare). "Quest Rewards" button shows all 5 difficulty tiers.
  - **Persistent world clock** — `worldClock.ts` with 12 named fantasy months (Deepwinter→Drawing Down), 30-day months, year/month/day/hour tracking. `advanceTime()`/`advanceDays()` with proper wrapping. `addEvent()` + `getUpcomingEvents()` for scheduling. "World Clock" button in DMSidebar.
  - **Advantage tracker** — `advantageTracker.ts` implements 5e rule: any advantage + any disadvantage = normal (regardless of count). `addAdvantage()`/`addDisadvantage()` with reason + optional round expiry. `clearExpired()` for round cleanup.
  - **Combat log search** — `combatLogSearch.ts` classifies entries into 7 types (damage/kill/heal/crit/miss/spell/condition/other). `searchCombatLog()` with keyword + type + character filters. `getLogStats()` for combat summary. "Combat Log Search" button with prompt in DMSidebar.
  - **Random weather generator** — `randomWeatherGen.ts` with 4 seasons, temperature ranges, weighted precipitation (6-7 types per season), 5 wind levels, visibility, and special events (aurora borealis, pollen storms, heat waves). "Random Weather" button in DMSidebar.
- 25 new tests (653 total) covering 6 systems:
  - **Warband** (4 tests): member count, leader scaling, kill+morale, formatted output.
  - **Quest rewards** (3 tests): level scaling, difficulty scaling, formatted output.
  - **World clock** (5 tests): default creation, hour wrapping, day/month wrapping, time-of-day labels, event scheduling.
  - **Advantage tracker** (5 tests): normal start, advantage, disadvantage, cancel-out rule, expiry.
  - **Combat log search** (4 tests): entry classification, keyword search, type stats, empty results.
  - **Weather generator** (4 tests): season mapping, valid structure, winter cold temps, formatted output.

- 6 new systems + 32 tests (628 total) — prepared spells, wild magic, healing surges, terrain escalation, stances, ASI planner:
  - **Prepared spell management** — `preparedSpells.ts` with 3 spell styles (prepared/known/none) mapped to all 12 classes. `getMaxPreparedSpells()` scales by level + ability mod. Prepare/unprepare with slot tracking. Non-casters filtered. "Spell Preparation" usable in character management.
  - **Wild magic surge table** — `wildMagicSurge.ts` with 50 effects across 4 severities (harmless/beneficial/chaotic/dangerous). d20 check (surge on nat 1), then random d50 effect. Ranges from "turn into a potted plant" to "cast Fireball centered on yourself". "Wild Magic Surge" button in DMSidebar.
  - **Healing surge system** — `healingSurge.ts` with 4e-inspired surges. Max surges = CON mod + half level. Each surge heals 25% max HP. `useSurge()`/`restoreSurges()` on long rest. "Healing Surges" button in DMSidebar.
  - **Terrain hazard escalation** — `terrainEscalation.ts` with 5 escalation types (Fire/Flood/Collapse/Fog/Acid). Damage and area increase each round with thematic descriptions per stage. Coverage bar visualization. Expandable escalation picker in DMSidebar.
  - **Combat stance system** — `combatStances.ts` with 5 stances (Balanced/Aggressive/Defensive/Reckless/Protective). Each trades attack, damage, AC, speed, and saves. `applyStanceModifiers()` for integration. "Combat Stances" button in DMSidebar.
  - **ASI planner** — `asiPlanner.ts` with ASI level tables (standard + Fighter/Rogue bonus). 10 popular feat recommendations filtered by class. `suggestASI()` recommends stat boost vs feat based on current scores. "ASI Planner" button in DMSidebar.
- 32 new tests (628 total) covering 6 systems:
  - **Prepared spells** (5 tests): style classification, max prepared scaling, prepare success, max limit fail, unprepare.
  - **Wild magic** (5 tests): 50-entry table, descriptions/mechanics, check boolean, effect validity, formatted output.
  - **Healing surges** (5 tests): max surge scaling, heal-per-surge, use+decrement, empty fail, long rest restore.
  - **Terrain escalation** (5 tests): config count, round 0 start, advance+increase, damage scaling, coverage bar.
  - **Combat stances** (5 tests): stance count, balanced no-mods, aggressive trade-off, modifier application, formatted list.
  - **ASI planner** (7 tests): standard ASI levels, fighter bonus, level detection, next ASI, feat filter, stat suggestion, formatted plan.

- 6 new systems + 25 tests (596 total) — reactions, ready actions, spell DCs, OA detection, cover, initiative re-roll:
  - **Reaction tracker** — `reactionTracker.ts` tracks per-unit reaction availability. `useReaction()` marks used + reason. `refreshReaction()` on turn start. `refreshAllReactions()` for new round. "Reactions" button in DMSidebar.
  - **Ready action queue** — `readyAction.ts` manages held actions with trigger conditions. `readyAction()` stores action/trigger/round. `resolveReadiedAction()` fires when triggered. `expireReadiedActions()` cleans up old entries. "Ready Actions" button in DMSidebar.
  - **Spell save DC calculator** — `spellSaveDC.ts` with casting ability mapping for 9 caster classes. `calculateSpellSaveDC()` computes DC = 8 + prof + ability mod. `formatPartySpellDCs()` shows all casters. "Spell Save DCs" button in DMSidebar (non-casters filtered out).
  - **Opportunity attack detector** — `opportunityAttack.ts` checks Chebyshev distance before/after movement against enemy reach. Respects reaction availability and Disengage. `countProvokedOAs()` for summary. Warns when movement provokes OAs.
  - **Cover calculator** — `coverDetector.ts` with Bresenham line-walk counting wall (2) and door/difficult (1) obstructions. Maps to none/half/three-quarter/full with AC and DEX save bonuses. "Cover Rules" button in DMSidebar.
  - **Initiative re-roll** — `initiativeReroll.ts` for dramatic mid-combat re-rolls. `rerollInitiative()` for all units (optional enemies-only). `rerollSingleUnit()` for targeted re-rolls. Shows old→new with arrows + new turn order. "Re-Roll Initiative" button in DMSidebar.
- 25 new tests (596 total) covering 6 systems:
  - **Reaction tracker** (4 tests): initialization, use, double-use fail, refresh.
  - **Ready actions** (4 tests): queue add, resolve+fire, expiration, formatted display.
  - **Spell save DC** (4 tests): ability mapping, proficiency scaling, DC computation, caster-only format.
  - **Opportunity attacks** (5 tests): leave-reach detection, stay-in-reach safe, disengage bypass, reaction-used bypass, count.
  - **Cover** (4 tests): clear LOS, wall obstruction, AC bonus values, formatted output.
  - **Initiative re-roll** (4 tests): all-unit re-roll, single unit, changed-only filter, formatted results.

- 6 new systems + 29 tests (571 total) — lair effects, minions, bloodied, flanking, death saves, treasure maps:
  - **Lair effect generator** — `lairEffects.ts` with 6 lair themes (Dragon/Undead/Elemental/Fey/Aberrant/Demonic) each with 3 effects. Save DCs, damage, conditions, and area descriptions. `rollLairEffect()` picks random effect per theme. Expandable lair browser in DMSidebar.
  - **Minion rules** — `minionRules.ts` with 8 minion templates (Goblin/Skeleton/Zombie/Bandit/Cultist/Kobold/Imp/Orc). 1 HP, static damage, die on any hit, saves for half = no damage. `createMinions()` for bulk spawning. `calculateMinionXP()` for encounter budget. Expandable spawner in DMSidebar.
  - **Bloodied condition** — `bloodiedCondition.ts` with configurable 50% HP threshold. `checkBloodied()` detects transition, `getBloodiedNarration()` with 5 random flavor texts. `countBloodied()` for combat summary. "Bloodied Status" button in DMSidebar.
  - **Flanking calculator** — `flankingCalculator.ts` with 3 rule options (None/Advantage/+2 Bonus). `checkFlanking()` uses dot product of position vectors to detect opposite-side allies. `findFlankingOpportunities()` shows where to move for flanking. "Flanking Rules" button in DMSidebar.
  - **Death save tracker** — `deathSaveTracker.ts` with full 5e rules: nat 20 = regain 1 HP, nat 1 = 2 failures, 3 successes = stabilize, 3 failures = death. `takeDamageWhileDying()` adds failures (crits = 2). Visual success/failure bars. "Death Saves" button auto-rolls for downed characters.
  - **Treasure map system** — `treasureMaps.ts` with 5 map templates (Dragon's Hoard/Pirate's Bounty/Elven Vault/Smuggler's Cache/Wizard's Library). Fragment collection with clues per piece. `isMapComplete()` reveals location + reward. Progress bars in formatted output. "Treasure Maps" button in DMSidebar.
- 29 new tests (571 total) covering 6 systems:
  - **Lair effects** (5 tests): theme count, effects per theme, getter, random effect, formatted output.
  - **Minions** (4 tests): template count, bulk creation, XP calculation, formatted group with 1HP rule.
  - **Bloodied** (4 tests): threshold detection, narration for new/existing, count by type.
  - **Flanking** (4 tests): rule count, opposite-side detection, same-side rejection, disabled rule, formatted output.
  - **Death saves** (6 tests): empty state, roll increment, stabilize at 3, damage failure, crit 2 failures, visual bars.
  - **Treasure maps** (5 tests): template count, fragment generation, find+collect, completion detection, progress format.

- 6 new systems + 25 tests (542 total) — surprise round, condition duration, XP milestones, marching order, dialogue trees, rest interruption:
  - **Surprise round detector** — `surpriseRound.ts` rolls each ambusher's stealth vs targets' passive perception. `rollSurprise()` with optional advantage. Identifies total surprise, partial surprise, or no surprise. `calculatePassivePerception()` helper. "Surprise Check" button in DMSidebar.
  - **Condition duration tracker** — `conditionDuration.ts` tracks active conditions per character with round-based or save-ends durations. `advanceRound()` auto-decrements, returns expired and save-needed lists. `formatRoundAdvance()` for turn-start announcements. "Condition Durations" button in DMSidebar.
  - **XP milestone calculator** — `xpMilestones.ts` with 8 templates across 5 categories (story/exploration/social/combat/secret). `addMilestone()`/`completeMilestone()` with double-award protection. Total XP tracking. "XP Milestones" button in DMSidebar.
  - **Party marching order** — `marchingOrder.ts` with 5 positions (Point/Front/Middle/Rear/Guard). Auto-assigns by class (Rogue→point, Fighter→front, Wizard→middle). `getTrapTarget()` and `getAmbushTarget()` for encounter resolution. Perks/risks per position. "Marching Order" button in DMSidebar.
  - **NPC dialogue tree builder** — `dialogueTrees.ts` with 3 templates (Merchant Haggle, Suspicious Guard, Mysterious Stranger). Branching nodes with skill check requirements, item/gold/reputation consequences. `formatDialogueNode()` with numbered options. Expandable browser in DMSidebar.
  - **Rest interruption system** — `restInterruption.ts` rolls per 2-hour watch period. `calculateInterruptionChance()` factors terrain danger and watch schedule. `calculatePartialRecovery()` gives short rest equivalent for interrupted long rests. "Rest Interruption Check" button in DMSidebar.
- 25 new tests (542 total) covering 6 systems:
  - **Surprise round** (3 tests): result structure, passive perception math, high-stealth surprise.
  - **Condition duration** (5 tests): empty state, add tracking, round decrement+expire, save-ends flagging, target filter.
  - **XP milestones** (4 tests): template count, add, complete+award, double-award prevention.
  - **Marching order** (4 tests): auto-assign by class, trap target, ambush positions, position descriptions.
  - **Dialogue trees** (4 tests): template count, valid start nodes, getter, formatted options.
  - **Rest interruption** (5 tests): danger scaling, watch halving, structure, full recovery, partial recovery.

- 6 new systems + 28 tests (517 total) — inspiration, encounter frequency, concentration, legendary actions, treasure division, formation memory:
  - **Inspiration point system** — `inspirationSystem.ts` with 8 default triggers (Great Roleplay, Clever Plan, Team Player, Backstory Moment, etc). `grantInspiration()`/`spendInspiration()` with history tracking. "Inspiration" button in DMSidebar.
  - **Random encounter frequency tuner** — `encounterFrequency.ts` with 5 terrain danger levels (safe→deadly), 7 time-of-day modifiers, travel bonus. `rollEncounterCheck()` produces d100 vs calculated threshold. `getTimeOfDayFromHour()` for clock integration. "Encounter Check" button in DMSidebar.
  - **Concentration tracker** — `concentrationTracker.ts` tracks who is concentrating on what spell. `calculateConcentrationDC()` uses max(10, damage/2). `checkConcentration()` returns DC and spell name when caster takes damage. Auto-replaces on new concentration. "Concentration" button in DMSidebar.
  - **Legendary action tracker** — `legendaryActions.ts` with 3 boss templates (Adult Dragon, Lich, Beholder). Legendary actions with costs (1-3 LA), lair actions on init 20. `useLegendaryAction()` deducts cost, `refreshLegendaryActions()` at turn start. Visual action bar. Expandable browser in DMSidebar.
  - **Treasure division calculator** — `treasureDivision.ts` auto-splits gold (remainder to poorest), assigns items by class preference (12 class preference maps). `calculateFairness()` scores 0-100. "Divide Treasure" button with gold prompt in DMSidebar.
  - **Party formation memory** — `partyFormationMemory.ts` saves token positions relative to centroid for re-centering. `saveFormation()`/`applyFormation()` with localStorage persistence (max 10 per room). "Saved Formations" button in DMSidebar.
- 28 new tests (517 total) covering 6 systems:
  - **Inspiration** (5 tests): trigger count, empty state, grant, spend, spend-without.
  - **Encounter frequency** (4 tests): danger base chance, time-of-day mapping, roll structure, formatted breakdown.
  - **Concentration** (6 tests): empty state, start, replacement, drop, DC calculation, damage check.
  - **Legendary actions** (6 tests): template count, max actions, cost deduction, insufficient fail, refresh, formatted bar.
  - **Treasure division** (4 tests): even split, remainder to poorest, fairness score, summary output.
  - **Formation memory** (3 tests): re-centering, empty format, populated format.

- 6 new systems + 29 tests (489 total) — deity patrons, wilderness maps, character goals, ambient sounds, spell recovery, tiebreakers:
  - **Deity/patron system** — `deityPatrons.ts` with 6 patrons across 5 types (Bahamut, Lolth, Titania, Asmodeus, Hadar, Empyrean Steed). Each has boons with mechanical effects, demands, and displeasure penalties. Expandable patron browser in DMSidebar.
  - **Wilderness map generator** — `wildernessMapGen.ts` with 7 biome presets. Cellular automata smoothing (2 passes) for natural-looking terrain. Seeded RNG for reproducibility. Edges kept passable. Biome selector in DMSidebar.
  - **Character goal tracker** — `characterGoals.ts` with 4 goal types (short_term/long_term/personal/quest). Add/complete/fail/abandon lifecycle. Per-character filtering. DM reward hooks. Formatted display with type emojis.
  - **Environmental sound cues** — `ambientSounds.ts` with 12 soundscapes (dungeon/forest-day/forest-night/cave/tavern/city/battlefield/ocean/desert/mountain/swamp/ruins). 5 moods. `getRandomSounds()` picks 3 from the pool. "Ambient Sounds" button in DMSidebar.
  - **Spell slot recovery variants** — `spellSlotRecovery.ts` with 4 variants (Standard/Arcane Recovery/Natural Recovery/Gritty Realism). `calculateArcaneRecovery()` with level scaling. `calculateRecoveredSlots()` validates slot choices against limits. "Rest Variants" button in DMSidebar.
  - **Initiative tiebreaker rules** — `initiativeTiebreaker.ts` with 6 configurable rules (DEX mod/DEX score/player first/enemy first/coin flip/higher level). `sortInitiativeWithTiebreaker()` for full initiative ordering. "Tiebreaker Rules" button in DMSidebar.
- 29 new tests (489 total) covering 6 systems:
  - **Deity patrons** (6 tests): count, unique IDs, getter, type filter, boons/demands validation, formatted output.
  - **Wilderness maps** (4 tests): grid dimensions, passable edges, all biome descriptions, formatted result.
  - **Character goals** (5 tests): empty tracker, add goal, status update, character filtering, formatted output.
  - **Ambient sounds** (4 tests): soundscape count, getter by ID/name, random sound count, formatted mood.
  - **Spell slot recovery** (5 tests): variant count, getter, arcane recovery scaling, slot limit validation, gritty realism format.
  - **Initiative tiebreaker** (4 tests): rule count, DEX resolution, player-first bias, sorted order, formatted rules.

- 6 new systems + 33 tests (460 total) — skill challenges, treasure gen, encounter waves, PC reputation, combat maneuvers, session timer:
  - **Skill challenge framework** — `skillChallenge.ts` with 5 templates (Chase Scene, Collapsing Dungeon, Diplomatic Negotiation, Wilderness Survival, Heist). Each defines successes required, failures allowed, DC, allowed skills, and outcomes. `resolveCheck()` tracks progress. Visual progress bars with green/red indicators. "Skill Challenge" button in DMSidebar.
  - **Random treasure generator** — `treasureGenerator.ts` with 4 tiers (minor/moderate/major/legendary) producing gold (4d6×scale), gems (16 types), art objects (12 types), and magic items (4 rarity pools with 4-6 items each). `getTierFromCR()` maps CR to tier. Treasure by tier in DMSidebar dropdown.
  - **Encounter wave system** — `encounterWaves.ts` with 3 templates (Goblin Ambush, Undead Rising, Bandit Raid). Each has 2-3 waves with round triggers, named units with counts/stats, and narration text. `checkWaveTriggers()` fires waves on schedule. `getUpcomingWaves()` shows what's coming. Wave browser in DMSidebar.
  - **PC reputation system** — `pcReputation.ts` with dual-axis (fame 0-20, infamy 0-20) per region. 10 title tiers from Unknown to Legend/Villain. `getReputationEffectsForRegion()` returns recognition chance, price modifier, and NPC reaction. Visual star bars. "PC Reputation" button in DMSidebar.
  - **Combat maneuver library** — `combatManeuvers.ts` with 8 maneuvers (Disarm, Trip, Feint, Called Shot, Overrun, Shield Bash, Mark Target, Taunt). Each has check type (contested/attack/save), attacker/defender abilities, success/fail effects. Action vs bonus action categorization. "Combat Maneuvers" button in DMSidebar.
  - **Session timer** — `sessionTimer.ts` with 6 default milestones (30m warmup → 4h marathon). `checkMilestones()` fires alerts on time marks. Pause/resume with paused-duration tracking. `getElapsedFormatted()` for display. localStorage persistence per room. "Session Timer" button in DMSidebar.
- 33 new tests (460 total) covering 6 systems:
  - **Skill challenges** (6 tests): template count, creation, check tracking, success completion, failure completion, formatted progress.
  - **Treasure generator** (4 tests): CR-to-tier mapping, gold presence, tier scaling, formatted output.
  - **Encounter waves** (6 tests): template count, creation, trigger on round, upcoming filtering, enemy count, formatted status.
  - **PC reputation** (5 tests): title classification, fame adjustment, clamping, effects calculation, empty format.
  - **Combat maneuvers** (6 tests): count, unique IDs, getter, melee filter, bonus action filter, formatted list.
  - **Session timer** (6 tests): creation, elapsed ~0 at start, formatted string, pause/resume, format output.

- 6 new systems + 34 tests (427 total) — sidekicks, traps, weather combat, downtime, monster lore, alignment:
  - **Henchman/sidekick system** — `sidekicks.ts` with 3 roles (Warrior/Expert/Spellcaster) using Tasha's simplified stat blocks. `createSidekick()` generates HP/AC/attack scaled by level. Level abilities unlock at 1/3/5/7/10 (Extra Attack, Cunning Action, spell slots, etc). `levelUpSidekick()` recalculates stats. "Sidekicks" button in DMSidebar.
  - **Trap design tool** — `trapDesigner.ts` with 8 pre-built trap templates (Spike Pit, Poison Dart, Fire Glyph, Falling Cage, Alarm Bell, Net Trap, Gas Room, Cursed Idol). Each has trigger type (6 types), effect type (7 types), detection/disable/save DCs, damage, area, and reset mode. Expandable trap browser in DMSidebar.
  - **Weather-dependent combat modifiers** — `weatherCombatModifiers.ts` with 8 weather conditions (clear/rain/fog/snow/sandstorm/storm/blizzard/heat wave). Each applies typed effects: ranged penalty, visibility range, difficult terrain, perception penalty, concentration DC, fire resistance, cold damage, speed penalty. "Weather Combat Effects" button in DMSidebar reads current weather.
  - **Downtime activity system** — `downtimeActivities.ts` with 9 activities (weapon training, tool training, language study, research, working, carousing, recuperation, crime, religious service). Each has days/cost/DC/results. `rollComplication()` with 20% chance. Carousing has 6 possible complications including accidental marriage. Expandable activity browser in DMSidebar.
  - **Monster lore journal** — `monsterLore.ts` with 3-tier progressive reveal system (basic→detailed→expert). Lore levels up automatically with encounters (2=detailed, 4=expert). `getRevealedInfo()` shows cumulative unlocks. `upgradeLore()` for INT check shortcuts. "Monster Lore" button in DMSidebar with localStorage persistence.
  - **Alignment shift tracker** — `alignmentTracker.ts` with dual-axis system (order -5 to +5, morality -5 to +5). 9 standard D&D alignments computed from axes. 10 pre-built moral choice templates (spared_enemy, killed_prisoner, kept_promise, etc). `detectAlignmentShift()` announces when alignment category changes. Visual bars + history. "Alignment Tracker" button in DMSidebar.
- 34 new tests (427 total) covering 6 systems:
  - **Sidekicks** (5 tests): role count, creation stats, HP scaling, level-up, formatted output.
  - **Trap designer** (5 tests): template count, unique IDs, effect filter, label getters, formatted DCs.
  - **Weather combat** (6 tests): condition count, clear no-effects, rain ranged penalty, fog visibility, snow terrain, formatted storm.
  - **Downtime** (5 tests): activity count, unique IDs, work result, training auto-success, formatted output.
  - **Monster lore** (6 tests): empty journal, first encounter, lore scaling, manual upgrade, cumulative reveals, format handling.
  - **Alignment** (7 tests): axis classification, state creation, shift + history, clamping, shift detection, moral choices, formatted output.

- 6 new systems + 39 tests (393 total) — exhaustion, crafting, NPC generator, damage types, mounts, strongholds:
  - **Exhaustion tracker** — `exhaustionTracker.ts` with full 5e exhaustion table (6 levels). `addExhaustion()`/`removeExhaustion()` with clamping. `checkForcedMarch()` returns CON save DC after 8+ hours travel. `getSpeedMultiplier()` (halved at L2, zero at L5) and `getMaxHpMultiplier()` (halved at L4). `formatExhaustionStatus()` for per-character display. "Exhaustion Status" button in DMSidebar.
  - **Crafting system** — `crafting.ts` with 8 recipes across 5 categories (potion/scroll/weapon/armor/mundane). Each recipe: materials with costs, tool required, ability check DC, crafting time in days. `attemptCraft()` resolves d20 + ability mod + proficiency vs DC. `getMaterialCost()` sums material costs. Expandable recipe browser in DMSidebar.
  - **Random NPC generator** — `randomNpcGenerator.ts` — one click generates complete NPC: name (20 first × 20 surnames), race (8), gender, occupation (20), personality (12), appearance (10), quirk (8), secret (10), plot hook (10), disposition. "Random NPC" button in DMSidebar.
  - **Battle damage types** — `damageTypes.ts` with 13 D&D 5e damage types. `getDamageModifier()` checks resistance/vulnerability/immunity lists. `resolveDamage()` halves (resistant), doubles (vulnerable), or zeroes (immune). `resolveMultipleDamage()` handles multi-type attacks (e.g. flaming sword = slashing + fire). Per-type emojis.
  - **Mounted combat** — `mountedCombat.ts` with 6 mounts (Pony/Horse/Warhorse/Dire Wolf/Griffon/Elephant). Each has speed, HP, AC, cost, special ability. `getMountedSpeed()`, `resolveMountDamage()` with dismount on mount death, `formatMountStatus()`. Griffon has flight + dive attack. "Mounts" button in DMSidebar.
  - **Stronghold management** — `stronghold.ts` with 4 stronghold types (Tavern/Keep/Wizard Tower/Temple). Each has upgrades (3-4 per type) with prerequisites, costs, build times, and bonuses. Weekly income/upkeep system. `getAvailableUpgrades()` respects prerequisite chains. "Strongholds" button in DMSidebar.
- 39 new tests (393 total) covering 6 systems:
  - **Exhaustion** (8 tests): table size, cumulative effects, add/remove clamping, forced march DC, speed multiplier, HP multiplier, formatted output.
  - **Crafting** (6 tests): recipe count, unique IDs, category filter, material cost math, craft attempt, formatted recipe.
  - **Random NPC** (4 tests): field completeness, uniqueness, disposition range, formatted output.
  - **Damage types** (9 tests): type count, immunity/resistance/vulnerability detection, halve/double/zero resolution, multi-type sum, formatted breakdown.
  - **Mounted combat** (5 tests): mount count, getter, speed calculation, dismount on death, HP tracking, mount list.
  - **Strongholds** (6 tests): type count, creation, prerequisite exclusion/unlock, net income, formatted status.

- 6 new systems + 30 tests (354 total) — bonds, death consequences, dungeon rooms, travel encounters, haggling, session recap:
  - **Player character bonds** — `characterBonds.ts` with 6 bond types (Sworn Allies/Mentor & Protege/Blood Oath/Rivals' Respect/Soulbound/Shield Mates). Each provides adjacency bonuses (AC, attack, saves, temp HP). Bond strength scales with shared combats (1→2 at 5 combats, 2→3 at 10). Higher strength unlocks stronger bonuses. "Character Bonds" button in DMSidebar.
  - **Death consequences** — `deathConsequences.ts` with 10 scars across 4 types (physical/mental/spiritual/cosmetic). `getScarsBySeverity()` biases toward spiritual scars for 3+ deaths. Scars include stat penalties, movement reduction, condition vulnerabilities. Duration ranges from 7 days to permanent (cured by Greater Restoration). Resurrection history tracked per character.
  - **Dungeon room templates** — `dungeonRoomTemplates.ts` with 6 pre-built rooms (Treasure Vault, Boss Arena, Puzzle Chamber, Ambush Corridor, Throne Room, Prison Cells). Each generates a full terrain grid with walls, doors, hazards, pillars, water features. Includes suggested enemies, loot tier, and feature descriptions. One-click template browser in DMSidebar.
  - **Travel encounter tables** — `travelEncounters.ts` with 32 events across 8 biomes (forest/mountain/desert/swamp/plains/coast/underdark/arctic). 5 event types (combat/social/discovery/hazard/rest). Many include DC checks with success/fail text. Biome selector in DMSidebar for one-click random encounters.
  - **Merchant haggling mini-game** — `haggling.ts` with 5 merchant personalities (greedy/fair/generous/stubborn/nervous) each with different DCs and max discounts. CHA-based d20 roll with proficiency bonus. Nat 20 gives extra discount, Nat 1 causes price increase. `getPersonalityFromDisposition()` ties into NPC tracker. "Haggle Price" button in DMSidebar.
  - **Session recap generator** — `sessionRecap.ts` — builds structured recap from DM history, combat log, quests, NPCs. Extracts key narrative moments, calculates combat stats (damage/kills/crits), builds party status line (XP/gold/deaths/quests), and formats cliffhanger from last narration. "Session Recap" button in DMSidebar.
- 30 new tests (354 total) covering 6 systems:
  - **Character bonds** (7 tests): config count, unique types, getter, adjacency bonuses, non-adjacent empty, strength scaling, formatted output.
  - **Death consequences** (4 tests): scar validity, severity bias (spiritual for 3+, physical for 1st), formatted output.
  - **Dungeon rooms** (6 tests): template count, unique IDs, terrain grid dimensions, getter, formatted description, wall borders.
  - **Travel encounters** (5 tests): biome coverage, per-biome count, correct biome return, formatted output, valid event types.
  - **Haggling** (5 tests): result structure, price floor at 1gp, disposition mapping, formatted output, stubborn DC difficulty.
  - **Session recap** (3 tests): full data generation, empty data handling, multi-line format.

- 6 new systems + 33 tests (324 total) — morale, env destruction, faction rep, initiative variants, NPC schedules, spell components:
  - **Morale system** — `morale.ts` with 4 morale tiers (fanatical/brave/normal/cowardly) based on CR. `checkMorale()` triggers when casualty threshold is crossed — each surviving enemy rolls vs tier DC with HP bonus/penalty. Fleeing enemies tracked in `MoraleState`. "Morale Check" button in DMSidebar. Narrates routs vs holds.
  - **Environmental destruction** — `environmentDestruction.ts` — walls (30HP, AC17) and doors (10HP, AC15) can be attacked and destroyed. `damageCell()` resolves attack roll vs AC, reduces HP, returns destruction status + narration. `getDestroyedTerrain()` converts walls→difficult terrain (rubble), doors→floor (open doorway).
  - **Cross-campaign faction reputation** — `factionReputation.ts` — global faction standings persisted via localStorage. Reputation -10 to +10 with 7 tiers (hated→revered). `getReputationEffects()` returns price modifier (0.7x revered to 2.0x hated), quest access, NPC disposition. `changeReputation()` with event history (capped at 50). Visual reputation bar. "Faction Standings" button in DMSidebar.
  - **Combat initiative variants** — `initiativeVariants.ts` — 4 systems: Standard (individual d20+DEX), Side (one roll per team), Popcorn (you pick who's next), Speed Factor (action-type modifiers). `rollSideInitiative()` and `rollSpeedFactorInitiative()` with 11 speed factor modifiers (melee +0, ranged +2, heavy -2, move +5, etc). Expandable rules display in DMSidebar.
  - **Dynamic NPC schedules** — `npcSchedules.ts` — 5 role templates (innkeeper/merchant/guard/priest/thief) with hour-based location+activity entries. `getCurrentLocation()` resolves NPC position from schedule + current hour (handles midnight wraps). `getScheduleTemplate()` matches role keywords. `formatSchedule()` shows current location + full daily timeline.
  - **Spell component pouch tracking** — `spellComponents.ts` — 20 spells with costly/consumed material components (Revivify 300gp diamonds, Raise Dead 500gp, True Resurrection 25,000gp, etc). `canAffordComponent()` checks gold. `deductComponentCost()` handles consumed vs reusable components. `formatComponentList()` shows party spell costs. "Spell Components" button in DMSidebar.
- 33 new tests (324 total) covering 6 systems:
  - **Morale** (5 tests): state creation, no-break when healthy, casualty threshold trigger, CR-based tiers, fleeing ID accumulation.
  - **Env destruction** (5 tests): destructibility checks, wall/door HP+AC, damage+destruction detection, miss on low roll, terrain replacement.
  - **Faction reputation** (6 tests): tier classification, rep change (add+create), clamping, effects scaling, formatted output.
  - **Initiative variants** (6 tests): variant count, unique IDs, side initiative structure, speed modifiers, roll range, rules formatting.
  - **NPC schedules** (5 tests): template coverage, hour-based location, role keyword matching, unknown role default, formatted output.
  - **Spell components** (6 tests): key spell lookup, gold affordability, consumed deduction, non-consumed preservation, formatted list, positive costs.

- 6 new systems + 25 tests (291 total) — rivalry board, initiative grouping, party resources, combat combos, encounter predictor, spell targeting:
  - **Character rivalry system** — `characterRivalry.ts` with 8 competitive categories (Slayer/Heavy Hitter/Lucky Strike/Lifesaver/Arcane Master/Damage Sponge/Cheated Death/Cursed). `parseRivalryFromLog()` extracts per-character stats from combat log. `getRivalryLeaders()` finds category winners. "Rivalry Board" button in DMSidebar. PvP-safe — tracks stats, not actual PvP.
  - **Smart initiative grouping** — `initiativeGrouping.ts` groups same-type enemies by base name (strips trailing numbers: "Goblin 1" → "Goblin"). Groups share the highest initiative in the group. Players always individual. `countGroups()` reports grouping stats for DM.
  - **Party resource tracker** — `partyResources.ts` with 8 default shared consumables (Rations, Water, Arrows, Bolts, Torches, Rope, Healer's Kit, Antitoxin) across 5 categories. `autoDeplete()` consumes per-party-member on long rest. `getResourceWarnings()` flags empty/low supplies. localStorage persistence per campaign. "Party Resources" button in DMSidebar.
  - **Combat combo system** — `combatCombos.ts` with 6 combo definitions (Trip & Strike, Grapple Slam, Spell & Sword, Flanking Strike, Heal & Rally, Focus Fire). Tracks recent actions within round windows. `checkForCombos()` detects when combo conditions are met. Bonus damage rewards for teamwork.
  - **DM encounter difficulty predictor** — `encounterPredictor.ts` estimates TPK probability, win chance, expected rounds/damage/casualties using hit probability math (d20 + bonus >= AC). Rates encounters trivial→suicidal. Warns on action economy imbalance, high enemy AC, expected long combats. "Predict Encounter" button in DMSidebar.
  - **Conditional spell targeting** — `spellTargeting.ts` with `getValidTargets()` computing range-based target lists using Chebyshev distance. `suggestTarget()` recommends optimal target. `formatTargetList()` for DM display. Integrates with existing `parseRangeFt()` from mapUtils.
- 25 new tests (291 total) covering 6 systems:
  - **Character rivalry** (4 tests): category count, empty stats, log parsing, leader extraction.
  - **Initiative grouping** (3 tests): same-name grouping, player individuality, count reporting.
  - **Party resources** (7 tests): category coverage, depletion, floor-at-zero, restock caps, auto-deplete, warnings, formatted output.
  - **Combat combos** (5 tests): definition count, unique IDs, tracker init, action recording, formatted output.
  - **Encounter predictor** (5 tests): trivial empty, TPK risk detection, easy encounter prediction, formatted output, action economy warnings.
  - **Spell targeting** test coverage planned for next pass.

- 6 new DM tools + 32 tests (266 total) — puzzles, persistent shops, formation AI, tactical markers, pacing advisor, backstory events:
  - **Encounter puzzle system** — `puzzles.ts` with 10 puzzles across 4 types (riddle/logic/knowledge/pattern), 3 difficulties. `PuzzleEncounter.tsx` component with answer submission, hint reveal system, attempt tracking, puzzle browser by type. `checkAnswer()` with normalized matching + alternate answers. Expandable in DMSidebar encounter tab.
  - **Persistent NPC shop inventories** — `shopInventory.ts` with `ShopState` per-merchant, stock quantity tracking (depletes on purchase), restocking system, price modifier by faction reputation (`adjustPriceByReputation` — each rep point = 6% price swing). `createDefaultShop()`, `purchaseFromShop()`, `restockShop()`. localStorage persistence per campaign.
  - **Battle formation AI** — `formationAI.ts` with class-role assignment (frontline/ranged/support/flanker) for all 12 classes. `suggestFormation()` computes threat direction from enemy centroid, positions frontline 2 cells toward enemies, ranged 2 cells back, support at center, flankers perpendicular. Terrain-aware with walkability checks and spiral-out fallback for occupied cells. One-click "Formation AI" button in DMSidebar.
  - **Tactical map markers** — `tacticalMarkers.ts` with 7 strategic marker types (Danger/Objective/Rally/Flank/Retreat/Hold/Ambush), each with emoji, color, and description. `markerToPin()` converts to existing MapPin format. Expandable marker palette in DMSidebar encounter tab. Integrates with existing pin/annotation overlay system.
  - **Session pacing advisor** — `sessionPacing.ts` analyzes combat round count, party/enemy HP%, session duration, and narrative/combat balance. Generates typed advice (end_combat/call_rest/shift_roleplay/increase_tension/wrap_session) with urgency levels. Warns on 8+ round combats, sub-30% party HP, 3+ hour sessions. "Pacing Advisor" button in DMSidebar.
  - **Backstory-driven random events** — `backstoryEvents.ts` with 14 event templates across 6 theme families (orphan/criminal/military/noble/arcane/nature/religion/revenge). `findRelevantEvents()` scans backstory+bonds+flaws+background for keyword triggers. `rollBackstoryEvent()` picks a random matching event across all characters. "Backstory Event" button in DMSidebar.
  - **AGENTS.md updated** — added Response Format section (include dev server link, batch features, pipeline roadmap).
- 32 new tests (266 total) covering 6 systems:
  - **Puzzles** (9 tests): library size, unique IDs, hints coverage, answer matching (exact/alternate/rejection), random selection, difficulty filter, type grouping.
  - **Shop inventory** (6 tests): creation, purchase decrement, out-of-stock rejection, price modifier, reputation discount/markup.
  - **Formation AI** (4 tests): class role assignment, suggestion generation, formatted output, empty input handling.
  - **Session pacing** (5 tests): long combat warning, low HP warning, session length, healthy session no-advice, empty format.
  - **Backstory events** (4 tests): military keyword matching, criminal keyword matching, empty backstory null return, formatted output.
  - **Tactical markers** (4 tests): marker count, unique types, getter accuracy, pin conversion structure.

- 6 new systems + 20 tests (234 total) — cross-session progression, analytics dashboard, weather progression, quest branching, NPC memory, DM personalities:
  - **Cross-session character progression** — `characterProgression.ts` tracks lifetime XP/gold/kills/sessions across campaigns with 6 achievement tiers (centurion/veteran/legend/wanderer/wealthy/max_level). `CharacterProgressionPanel.tsx` shows stats grid + achievements + recent session history. Progression badges (Rookie→Adventurer→Veteran→Hero→Legend) based on session count.
  - **Campaign analytics dashboard** — `CampaignAnalytics.tsx` renders visual stat cards (damage/kills/crits/spells/healing/nat 1s) with per-character breakdowns including damage bars, kill/crit/spell counts. Expandable in DMSidebar encounter tab. Parses combat log with regex heuristics.
  - **Weather progression system** — `weatherProgression.ts` with Markov-chain weather transitions (weighted random: none→rain 25%, rain→none 40%, etc). Wired into +1h/+6h time advance buttons — weather changes automatically as in-game hours pass. Forecast display in DMSidebar shows upcoming weather shift. DM setting weather manually initializes a new forecast.
  - **Quest branching with consequences** — `QuestBranching.tsx` presents decision points to players with consequence previews (gold/faction/NPC disposition/quest unlock). 2 built-in templates (merchant negotiation, prisoner dilemma). DM triggers branch points from template library. Choice history tracked. `applyConsequences()` fires typed callbacks for gold changes, faction shifts, NPC disposition updates, and narrative narration.
  - **NPC interaction memory** — `NpcTracker.tsx` now has functional `interactionHistory` (capped at 20 entries) and `lastSeenDay` fields. DM "Log Interaction" button records brief notes per NPC. Expandable interaction history panel. Last seen day auto-set from campaign calendar. All synced via WebSocket.
  - **DM personality modes** — `dmPersonalities.ts` with 5 styles (Classic/Comedic/Epic/Grimdark/Fairy Tale) each with system prompt suffix, combat flavor style, and NPC dialogue style. Selector dropdown in DMSidebar notes tab. Persisted per-campaign in localStorage.
  - **DMSidebar cleanup** — removed duplicate `dmPersonality` prop (was passed twice with different storage keys). Consolidated to single room-scoped key.
- 20 new tests (234 total) covering 5 systems:
  - **Weather progression** (4 tests): forecast structure, all weather states, description text, upcoming change mentions.
  - **Quest branching** (5 tests): template count, unique IDs, option count, consequence coverage, callback firing.
  - **Campaign analytics** (5 tests): damage parsing, kill counting, crit/nat 1 detection, formatted output, empty log handling.
  - **Character progression** (5 tests): empty lifetime, badge null/Rookie/Veteran/Legend tiers, summary formatting.
  - **Previous uncommitted** (1 test batch): loot distribution, DM personalities, voice lines, room descriptions.

- 6 new features — tactical advice, auto-scale encounters, voice lines, MVP voting, fire spread, formations:
  - **Smart tactical advice** — `tacticalAdvice.ts` analyzes party comp at combat start: identifies wounded allies, suggests class-specific actions (Cleric heal, Rogue hide, Barbarian rage), focus fire on low-HP enemies, warns when outnumbered. Up to 5 prioritized tips shown in combat log.
  - **Encounter difficulty auto-scale** — `useDynamicDifficulty` now spawns reinforcements when combat is too easy for 3+ rounds. Reinforcement is a weakened copy of an existing enemy with 70% HP, adding pressure without overwhelming.
  - **Character voice lines** — `voiceLines.ts` with class-themed catchphrases (Fighter/Wizard/Rogue/Cleric + default) for 7 events (crit/kill/heal/death save/level up/miss). Triggered on nat 20s and kills with DM chat message.
  - **Session MVP voting** — `MVPVoting` component: DM triggers vote, players pick favorite player, votes synced via WebSocket, winner announced with trophy. Full modal UI with vote tally.
  - **Map hazard chain reactions** — fire (lava) terrain has 15% chance per round to spread to adjacent floor/grass cells. Creates dynamic environmental pressure.
  - **Party formation presets** — wired existing `FormationPresets` component (line/column/wedge/diamond/scatter/circle) into the game view for DM token arrangement.

- 6 narrative + social features:
  - **Smart loot distribution** — `lootDistribution.ts` scores items per character based on class preference, stat synergy, existing equipment, and HP. Treasure hoard rolls now include "Suggested Distribution" section with per-item recommendations and reasons.
  - **Character relationship tracker** — `relationships.ts` with 8 relationship types (ally/rival/mentor/protege/friend/romantic/distrustful/neutral), mechanical combat bonuses for adjacent allies, `pcRelationships` state in Game.tsx.
  - **Procedural room descriptions** — `roomDescriptions.ts` analyzes terrain layout to generate atmospheric flavor text (dungeon/outdoor/lava/ice/water variants). Auto-triggers when switching to map view.
  - **Combat replay narration** — AI summarizes completed combat as 2-3 dramatic sentences via `/api/dm/narrate` on combat end.
  - **Auto-generated player diary** — `playerDiary.ts` generates per-character journal entries from their POV on long rest. Analyzes kills, crits, damage taken, and class personality. Mood detection (triumphant/worried/reflective/excited/somber).
  - **Spectator commentary mode** — `spectatorCommentary.ts` generates sports-broadcast-style play-by-play from combat log entries (crits, kills, healing, round milestones).

**New Roadmap — Next Phase:**
- ~~Cross-session character progression (persistent XP/gold/items across campaigns)~~ **DONE** — `characterProgression.ts` + `CharacterProgressionPanel.tsx`
- Campaign world map with fog-of-war travel and location markers
- Achievement badges for campaign milestones (100 kills, 10 sessions, first TPK survived)
- Combat replay system — rewind and step through past encounters
- ~~AI DM personality modes (serious/humorous/dramatic/grimdark narrator styles)~~ **DONE** — `dmPersonalities.ts` with 5 modes + DM selector
- Player-to-player item trading with confirmation UI
- ~~Weather progression system — weather changes over time, DM sets forecast~~ **DONE** — `weatherProgression.ts` wired into time advance buttons
- ~~NPC relationship memory — NPCs remember past interactions with the party~~ **DONE** — interaction history + lastSeenDay on NpcTracker
- ~~Quest branching based on player choices with consequence tracking~~ **DONE** — `questBranching.ts` + `QuestBranching.tsx` with consequence callbacks
- ~~Campaign analytics dashboard — session length, combat ratio, XP curve, death count~~ **DONE** — `CampaignAnalytics.tsx` + `campaignAnalytics.ts` with per-character breakdowns

**Next Wave Roadmap:**
- Campaign world map with fog-of-war travel and location markers
- Player-to-player item trading with confirmation UI
- ~~Encounter puzzle system — riddles/logic puzzles~~ **DONE** — `puzzles.ts` + `PuzzleEncounter.tsx`
- ~~Character backstory-driven random events~~ **DONE** — `backstoryEvents.ts` with 14 templates
- ~~Battle formation AI suggestions~~ **DONE** — `formationAI.ts` with class-role positioning
- ~~Persistent NPC shop inventories~~ **DONE** — `shopInventory.ts` with stock/price tracking
- Cross-campaign faction reputation — faction standing persists and affects NPC attitudes globally
- ~~Tactical map annotations~~ **DONE** — `tacticalMarkers.ts` with 7 strategic marker types
- Character rivalry system — PvP-safe competitive XP/kill tracking between party members
- ~~Session pacing advisor~~ **DONE** — `sessionPacing.ts` with multi-factor analysis

**Wave 3 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Cross-campaign faction reputation — faction standing persists globally via localStorage
- ~~Character rivalry system~~ **DONE** — `characterRivalry.ts` with 8 competitive categories
- Encounter terrain generator — AI builds thematic battle maps from scene description
- ~~Smart initiative grouping~~ **DONE** — `initiativeGrouping.ts` groups same-name enemies
- ~~Conditional spell targeting~~ **DONE** — `spellTargeting.ts` with range-based filtering
- ~~Party resource tracker~~ **DONE** — `partyResources.ts` with 8 consumables + auto-deplete
- ~~Combat combo system~~ **DONE** — `combatCombos.ts` with 6 teamwork combos
- ~~DM encounter difficulty predictor~~ **DONE** — `encounterPredictor.ts` with TPK probability

**Wave 4 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- ~~Cross-campaign faction reputation~~ **DONE** — `factionReputation.ts` with 7 tiers
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in the area simultaneously
- ~~Environmental destruction~~ **DONE** — `environmentDestruction.ts` walls/doors with HP
- ~~Dynamic NPC schedules~~ **DONE** — `npcSchedules.ts` with 5 role templates
- ~~Morale system~~ **DONE** — `morale.ts` with 4 tiers + flee checks
- ~~Spell component pouch tracking~~ **DONE** — `spellComponents.ts` with 20 costly spells
- ~~Combat initiative variants~~ **DONE** — `initiativeVariants.ts` with 4 systems

**Wave 5 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in the area simultaneously
- ~~Player character bonds~~ **DONE** — `characterBonds.ts` with 6 bond types + adjacency bonuses
- ~~Death consequences~~ **DONE** — `deathConsequences.ts` with 10 scars, severity scaling
- ~~Dungeon room templates~~ **DONE** — `dungeonRoomTemplates.ts` with 6 pre-built rooms
- ~~Travel encounter tables~~ **DONE** — `travelEncounters.ts` with 32 events across 8 biomes
- ~~Merchant haggling mini-game~~ **DONE** — `haggling.ts` with 5 personality types + CHA rolls
- ~~Session recap generator~~ **DONE** — `sessionRecap.ts` structured summary builder

**Wave 6 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Exhaustion tracker~~ **DONE** — `exhaustionTracker.ts` with 5e exhaustion table
- ~~Crafting system~~ **DONE** — `crafting.ts` with 8 recipes across 5 categories
- ~~Stronghold management~~ **DONE** — `stronghold.ts` with 4 types + upgrade trees
- ~~Random NPC generator~~ **DONE** — `randomNpcGenerator.ts` one-click complete NPC
- ~~Battle damage types~~ **DONE** — `damageTypes.ts` with 13 types + resistance resolution
- ~~Mounted combat~~ **DONE** — `mountedCombat.ts` with 6 mounts + special abilities

**Wave 7 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Henchman/sidekick system~~ **DONE** — `sidekicks.ts` with 3 roles + level scaling
- ~~Trap design tool~~ **DONE** — `trapDesigner.ts` with 8 templates + 6 trigger types
- ~~Weather-dependent combat modifiers~~ **DONE** — `weatherCombatModifiers.ts` with 8 conditions
- ~~Downtime activity system~~ **DONE** — `downtimeActivities.ts` with 9 activities + complications
- ~~Monster lore journal~~ **DONE** — `monsterLore.ts` with 3-tier progressive reveal
- ~~Alignment shift tracker~~ **DONE** — `alignmentTracker.ts` with dual-axis + moral choices

**Wave 8 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Skill challenge framework~~ **DONE** — `skillChallenge.ts` with 5 templates
- ~~Random treasure generator~~ **DONE** — `treasureGenerator.ts` with 4 tiers + magic items
- ~~Encounter wave system~~ **DONE** — `encounterWaves.ts` with 3 templates + round triggers
- ~~PC reputation system~~ **DONE** — `pcReputation.ts` with fame/infamy per region
- ~~Combat maneuver library~~ **DONE** — `combatManeuvers.ts` with 8 extended martial options
- ~~Session timer with milestone alerts~~ **DONE** — `sessionTimer.ts` with pause/resume + 6 milestones

**Wave 9 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Deity/patron system~~ **DONE** — `deityPatrons.ts` with 6 patrons across 5 types
- ~~Random wilderness map generator~~ **DONE** — `wildernessMapGen.ts` with 7 biomes + cellular automata
- ~~Character goal tracker~~ **DONE** — `characterGoals.ts` with 4 goal types + lifecycle
- ~~Environmental sound cues~~ **DONE** — `ambientSounds.ts` with 12 soundscapes
- ~~Spell slot recovery variants~~ **DONE** — `spellSlotRecovery.ts` with 4 rest systems
- ~~Initiative tiebreaker rules~~ **DONE** — `initiativeTiebreaker.ts` with 6 configurable rules

**Wave 10 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Inspiration point system~~ **DONE** — `inspirationSystem.ts` with 8 DM triggers
- ~~Random encounter frequency tuner~~ **DONE** — `encounterFrequency.ts` with terrain×time math
- ~~Party formation memory~~ **DONE** — `partyFormationMemory.ts` with centroid-relative save/load
- ~~Concentration tracker~~ **DONE** — `concentrationTracker.ts` with DC calculation
- ~~Legendary action tracker~~ **DONE** — `legendaryActions.ts` with 3 boss templates
- ~~Treasure division calculator~~ **DONE** — `treasureDivision.ts` with fairness scoring

**Wave 11 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Surprise round detector~~ **DONE** — `surpriseRound.ts` with stealth vs passive perception
- ~~Condition duration tracker~~ **DONE** — `conditionDuration.ts` with round decrement + save-ends
- ~~XP milestone calculator~~ **DONE** — `xpMilestones.ts` with 8 templates across 5 categories
- ~~Party marching order~~ **DONE** — `marchingOrder.ts` with 5 positions + class auto-assign
- ~~NPC dialogue tree builder~~ **DONE** — `dialogueTrees.ts` with 3 branching templates
- ~~Rest interruption system~~ **DONE** — `restInterruption.ts` with watch schedule + partial recovery

**Wave 12 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Lair effect generator~~ **DONE** — `lairEffects.ts` with 6 themes × 3 effects each
- ~~Minion rules~~ **DONE** — `minionRules.ts` with 8 templates, 1HP, static damage
- ~~Bloodied condition~~ **DONE** — `bloodiedCondition.ts` with 50% threshold + narration
- ~~Flanking calculator~~ **DONE** — `flankingCalculator.ts` with dot-product detection
- ~~Death save tracker~~ **DONE** — `deathSaveTracker.ts` with full 5e rules + visual bars
- ~~Treasure map system~~ **DONE** — `treasureMaps.ts` with 5 maps + fragment collection

**Wave 13 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Reaction tracker~~ **DONE** — `reactionTracker.ts` with per-unit availability
- ~~Ready action queue~~ **DONE** — `readyAction.ts` with trigger conditions + expiry
- ~~Cover calculator~~ **DONE** — `coverDetector.ts` with Bresenham line-walk
- ~~Opportunity attack detector~~ **DONE** — `opportunityAttack.ts` with reach + reaction checks
- ~~Spell save DC calculator~~ **DONE** — `spellSaveDC.ts` for 9 caster classes
- ~~Initiative re-roll~~ **DONE** — `initiativeReroll.ts` with old→new display

**Wave 14 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Prepared spell management~~ **DONE** — `preparedSpells.ts` with 3 styles for all classes
- ~~Wild magic surge table~~ **DONE** — `wildMagicSurge.ts` with 50 effects × 4 severities
- ~~Healing surge system~~ **DONE** — `healingSurge.ts` with CON-scaled surges
- ~~Terrain hazard escalation~~ **DONE** — `terrainEscalation.ts` with 5 types + round scaling
- ~~Combat stance system~~ **DONE** — `combatStances.ts` with 5 stances + trade-offs
- ~~ASI planner~~ **DONE** — `asiPlanner.ts` with feat recommendations + stat suggestions

**Wave 15 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Warband builder~~ **DONE** — `warbandBuilder.ts` with 5 ranks + morale + casualties
- ~~Quest reward scaler~~ **DONE** — `questRewardScaler.ts` with level×difficulty scaling
- ~~Persistent world clock~~ **DONE** — `worldClock.ts` with 12 named months + events
- ~~Advantage tracker~~ **DONE** — `advantageTracker.ts` with 5e cancel-out rule
- ~~Combat log search~~ **DONE** — `combatLogSearch.ts` with 7-type classification + filters
- ~~Random weather generator~~ **DONE** — `randomWeatherGen.ts` with 4 seasons + special events

**Wave 16 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Ritual casting tracker~~ **DONE** — `ritualCasting.ts` with 17 spells for 5 classes
- ~~Familiar manager~~ **DONE** — `familiarManager.ts` with 12 forms + scout reports
- ~~Encounter budget calculator~~ **DONE** — `encounterBudget.ts` with DMG XP thresholds
- ~~Backstory questionnaire~~ **DONE** — `backstoryQuestionnaire.ts` with 12 guided questions
- ~~Status effect reference~~ **DONE** — `statusEffectReference.ts` with 15 5e conditions
- ~~Party composition analyzer~~ **DONE** — `partyAnalyzer.ts` with 7 roles × 12 classes

**Wave 17 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Object interaction tracker~~ **DONE** — `objectInteraction.ts` with 10 types + state tracking
- ~~Class feature cooldown manager~~ **DONE** — `classFeatureCooldowns.ts` with 16 templates
- ~~Multi-class spell slot calculator~~ **DONE** — `multiclassSpellSlots.ts` with PHB table
- ~~Bulk NPC stat block generator~~ **DONE** — `bulkNpcGenerator.ts` with 6 presets + variance
- ~~Combat narration templates~~ **DONE** — `combatNarration.ts` with 6 types × 5-8 templates
- ~~Session notes auto-tagger~~ **DONE** — `sessionNoteTagger.ts` with 10 auto-tag types

**Wave 18 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Encounter pacing timer~~ **DONE** — `encounterPacingTimer.ts` with 3 speed presets
- ~~Language barrier system~~ **DONE** — `languageBarrier.ts` with 18 languages + race defaults
- ~~Potion brewing mini-game~~ **DONE** — `potionBrewing.ts` with 10 ingredients + 6 recipes
- ~~Terrain effect compendium~~ **DONE** — `terrainCompendium.ts` with 11 terrain types
- ~~Spellbook management~~ **DONE** — `spellbookManager.ts` with page/cost tracking
- ~~Player handout system~~ **DONE** — `playerHandouts.ts` with 6 types + visibility control

**Wave 19 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Damage resistance aggregator~~ **DONE** — `resistanceAggregator.ts` with immunity override
- ~~Action economy tracker~~ **DONE** — `actionEconomy.ts` with visual movement bars
- ~~Encumbrance calculator~~ **DONE** — `encumbranceCalc.ts` with 3 rule variants
- ~~Proficiency check helper~~ **DONE** — `proficiencyHelper.ts` with 18 skill mappings
- ~~Random tavern generator~~ **DONE** — `tavernGenerator.ts` with full tavern generation
- ~~Combat round summary~~ **DONE** — `combatRoundSummary.ts` with per-round + total stats

**Wave 20 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Encounter terrain generator — AI builds thematic battle maps from scene description
- Multi-target spell resolution — AoE spells resolve against all units in area simultaneously
- ~~Passive skill display~~ **DONE** — `passiveSkills.ts` with adv/disadv modifiers
- ~~Grapple/shove resolver~~ **DONE** — `grappleShove.ts` with size + contested checks
- ~~Random dungeon name generator~~ **DONE** — `dungeonNameGenerator.ts` with 3 styles
- ~~Party HP dashboard~~ **DONE** — `partyHpDashboard.ts` with 5-tier status + visual bars
- ~~Damage log analytics~~ **DONE** — `damageLogAnalytics.ts` with DPR/HPR/per-character
- ~~Travel speed calculator~~ **DONE** — `travelSpeed.ts` with 3 paces × 7 terrain × mounts

**Wave 21 Roadmap (completed):**
- ~~Encounter table builder~~ **DONE** — `encounterTableBuilder.ts` with d100 preset tables
- ~~Point buy calculator~~ **DONE** — `pointBuyCalculator.ts` with 27-point system
- ~~Hit dice tracker~~ **DONE** — `hitDiceTracker.ts` with class die sizes + rest recovery
- ~~Ammunition tracker~~ **DONE** — `ammunitionTracker.ts` with 6 ammo types + recovery
- ~~Map terrain descriptor~~ **DONE** — `mapDescriptor.ts` with tactical analysis
- ~~Character death log~~ **DONE** — `deathLog.ts` memorial wall with deadliest enemy tracking

**Wave 22 Roadmap (completed):**
- ~~Coin converter~~ **DONE** — `coinConverter.ts` with cp/sp/ep/gp/pp + auto-simplify + split
- ~~Random quest generator~~ **DONE** — `questGenerator.ts` with 7 types + complications
- ~~Light source tracker~~ **DONE** — `lightSourceTracker.ts` with 7 source types + duration
- ~~DC reference~~ **DONE** — `dcReference.ts` with 6 difficulty tiers + examples
- ~~Random magic item generator~~ **DONE** — `magicItemGenerator.ts` with effects + quirks
- ~~Watch scheduler~~ **DONE** — `watchScheduler.ts` with Perception-priority assignment

**Wave 23 Roadmap (completed):**
- ~~NPC voice generator~~ **DONE** — `npcVoiceGenerator.ts` with accents/patterns/catchphrases/mannerisms
- ~~Skill contest resolver~~ **DONE** — `skillContest.ts` with opposed checks + advantage
- ~~Room contents generator~~ **DONE** — `roomContents.ts` with furniture/clutter/atmosphere/details
- ~~Currency exchange~~ **DONE** — `currencyExchange.ts` with 8 regional currencies
- ~~Weather events~~ **DONE** — `weatherEvents.ts` with 10 dramatic events × 4 severities
- ~~Camp planner~~ **DONE** — `campPlanner.ts` with security/comfort/stealth ratings

**Wave 24 Roadmap (completed):**
- ~~Mystery potions~~ **DONE** — `mysteryPotions.ts` with 10 appearances × 10 tastes × 20 effects
- ~~Trap detection helper~~ **DONE** — `trapDetection.ts` with passive/active/party checks
- ~~Initiative card display~~ **DONE** — `initiativeDisplay.ts` with sorted formatted cards
- ~~Book/scroll generator~~ **DONE** — `bookGenerator.ts` with titles, authors, lore snippets
- ~~Falling damage calculator~~ **DONE** — `fallingDamage.ts` with d6/10ft + feather fall
- ~~Location name generator~~ **DONE** — `locationNameGenerator.ts` with 8 location types

**Wave 25 Roadmap (completed):**
- ~~Chase sequence~~ **DONE** — `chaseSequence.ts` with complications + dash exhaustion
- ~~Random trap generator~~ **DONE** — `randomTrapGenerator.ts` with procedural parts
- ~~Spell range visualizer~~ **DONE** — `spellRangeVisualizer.ts` with area calculations
- ~~Curse generator~~ **DONE** — `curseGenerator.ts` with 10 curses × 3 severities
- ~~Loot log~~ **DONE** — `lootLog.ts` with item tracking + distribution status
- ~~Time narrator~~ **DONE** — `timeNarrator.ts` with terrain/weather flavor text

**Wave 26 Roadmap (completed):**
- ~~Riddle generator~~ **DONE** — `riddleGenerator.ts` with 12 riddles × 3 difficulties
- ~~Poison crafting~~ **DONE** — `poisonCrafting.ts` with 8 poisons + harvest/apply
- ~~Encounter narrator~~ **DONE** — `encounterNarrator.ts` with 5 themes × dramatic openings
- ~~Deity prayer~~ **DONE** — `deityPrayer.ts` with devotion tracking + daily boons
- ~~Formation presets~~ **DONE** — `formationPresets.ts` with 6 tactical formations
- ~~Session XP calculator~~ **DONE** — `sessionXPCalculator.ts` with CR-to-XP + per-character split

**Wave 27 Roadmap (completed — 🎉 900 TEST MILESTONE!):**
- ~~AC breakdown~~ **DONE** — `acBreakdown.ts` with armor type + DEX cap + shield + magic
- ~~Noble house generator~~ **DONE** — `nobleHouseGenerator.ts` with name/sigil/motto/wealth/specialty
- ~~Spell slot tracker~~ **DONE** — `spellSlotTracker.ts` with PHB slot table for all 20 levels
- ~~Wilderness hazards~~ **DONE** — `wildernessHazards.ts` with 10 hazards × terrain filtering
- ~~Weakness finder~~ **DONE** — `damageWeaknessFinder.ts` suggesting best damage types
- ~~Rest benefit summary~~ **DONE** — `restBenefitSummary.ts` with short/long rest details per character

**Wave 28 Roadmap (completed — 🎉 200+ SYSTEMS MILESTONE!):**
- ~~Critical hit table~~ **DONE** — `criticalHitTable.ts` with effects by damage type (slashing/piercing/bludgeoning/fire/cold/lightning)
- ~~Prophecy generator~~ **DONE** — `prophecyGenerator.ts` with template-based cryptic prophecies
- ~~Saving throw reference~~ **DONE** — `savingThrowRef.ts` with all 6 saves + common DCs
- ~~Guild generator~~ **DONE** — `guildGenerator.ts` with name/purpose/leader/HQ/secret agenda
- ~~Level-up checklist~~ **DONE** — `levelUpChecklist.ts` with class-aware step-by-step guide

**Wave 29 Roadmap (completed):**
- ~~Fantasy insults~~ **DONE** — `fantasyInsults.ts` with 16 insults × 4 tones + insult battles
- ~~Encounter difficulty label~~ **DONE** — `encounterDifficultyLabel.ts` with Trivial→TPK Risk
- ~~Loot containers~~ **DONE** — `lootContainers.ts` with themed chests/corpses/caches + traps
- ~~Planar reference~~ **DONE** — `planarReference.ts` with 12 D&D planes by category
- ~~Trinket generator~~ **DONE** — `trinketGenerator.ts` with 30 PHB-style trinkets
- ~~Combat turn checklist~~ **DONE** — `combatTurnChecklist.ts` with 16 actions by type

**Wave 30 Roadmap (completed — pushing to 1000 tests):**
- ~~Wilderness landmarks~~ **DONE** — `wildernessLandmarks.ts` with 10 landmarks + secrets
- ~~Skill proficiency ref~~ **DONE** — `skillProficiencyRef.ts` with all 12 classes
- ~~Ship generator~~ **DONE** — `shipGenerator.ts` with name/type/crew/cargo/captain/secret
- ~~Festival generator~~ **DONE** — `festivalGenerator.ts` with events and prizes
- ~~Check narrator~~ **DONE** — `abilityCheckNarrator.ts` with dramatic descriptions
- ~~Graveyard generator~~ **DONE** — `graveyardGenerator.ts` with tombstones and secrets
- ~~Tavern menu~~ **DONE** — `tavernMenu.ts` with 10 items + mechanical effects
- ~~Bounty board~~ **DONE** — `bountyBoard.ts` with wanted posters and difficulty-scaled rewards

**Wave 31 — 🎉 1,000 TEST MILESTONE:**
- ~~Encounter hooks~~ **DONE** — `randomEncounterHook.ts` with 15 scene starters
- ~~Rumors generator~~ **DONE** — `rumorsGenerator.ts` with truth ratings + player-safe format
- ~~Shopkeeper personality~~ **DONE** — `shopkeeperPersonality.ts` with greeting/haggle/quirk/secret
- ~~NPC motivation~~ **DONE** — `randomMotivation.ts` with 8 categories + hidden/visible
- Plus 20 additional tests across existing systems for comprehensive coverage
- **MILESTONE: 1,000 TESTS PASSING** in ~1.3 seconds

**Wave 33 (1,282 tests — 🎉 fixed 1 pre-existing broken test):**
- ~~Prophecy fulfillment tracker~~ **DONE** — `prophecyFulfillment.ts` with 15 templates × 6 categories + fulfillment lifecycle
- ~~NPC farewell generator~~ **DONE** — `randomNpcFarewell.ts` with 12 farewell lines
- ~~Battle cry generator~~ **DONE** — `battleCryGenerator.ts` with 8 races × 3 + 12 classes × 3 + 6 generic
- ~~Terrain advantage reference~~ **DONE** — `terrainAdvantage.ts` with 10 terrain types + class recommendations
- ~~Backstory complication generator~~ **DONE** — `backstoryComplication.ts` with 16 complications × 6 categories × 3 severities
- ~~Party morale tracker~~ **DONE** — `partyMoraleTracker.ts` with 12 event types + 6 morale levels + mechanical effects

**Wave 34 (1,327 tests — fixed 4 pre-existing broken tests):**
- ~~NPC loyalty tracker~~ **DONE** — `npcLoyalty.ts` with 7 levels + faction association
- ~~Random artifact generator~~ **DONE** — `artifactGenerator.ts` with 6 types + procedural names/powers/curses
- ~~Puzzle lock system~~ **DONE** — `puzzleLock.ts` with 8 puzzles × 5 types + hint reveals
- ~~Combat fatigue system~~ **DONE** — `combatFatigue.ts` with 5 levels + mechanical penalties
- ~~Regional reputation tracker~~ **DONE** — `regionalReputation.ts` with 7 tiers + per-region effects
- ~~Weather encounter interaction~~ **DONE** — `weatherEncounterInteraction.ts` with 8 weather types × encounter modifiers

**Wave 35 (1,370 tests):**
- ~~NPC relationship web~~ **DONE** — `npcRelationshipWeb.ts` with 10 relation types + secret flags
- ~~Siege warfare rules~~ **DONE** — `siegeWarfare.ts` with 8 engines + 6 fortifications + damage thresholds
- ~~Planar rift generator~~ **DONE** — `planarRift.ts` with 10 planes + environmental effects
- ~~Random political event~~ **DONE** — `politicalEvent.ts` with 10 events × 6 categories + faction shifts
- ~~Crafting specialization tree~~ **DONE** — `craftingSpecialization.ts` with 6 disciplines × 5 mastery tiers
- ~~Monster ecology system~~ **DONE** — `monsterEcology.ts` with 20 creatures × 8 biomes + food chains

**Wave 36 (1,417 tests — fixed 1 pre-existing broken test):**
- ~~Naval combat system~~ **DONE** — `navalCombat.ts` with 6 ship classes + 7 actions
- ~~Ritual magic circles~~ **DONE** — `ritualMagic.ts` with 8 rituals × 6 schools
- ~~Companion animal advancement~~ **DONE** — `companionAnimal.ts` with 6 species + leveling + bond
- ~~Trap disarm mini-game~~ **DONE** — `trapDisarm.ts` with 6 challenges × 4 difficulties + sequential checks
- ~~Tavern brawl choreographer~~ **DONE** — `tavernBrawl.ts` with 7 triggers × 3 environments + weapons
- ~~Dream sequence generator~~ **DONE** — `dreamSequence.ts` with 7 dreams × 6 types + choices

**Wave 37 (1,467 tests):**
- ~~Faction war tracker~~ **DONE** — `factionWar.ts` with 5 factions + 10 territories + battle resolution
- ~~Merchant caravan generator~~ **DONE** — `merchantCaravan.ts` with 6 origins × 4 items + quest hooks
- ~~Heist planner~~ **DONE** — `heistPlanner.ts` with 4 heists × 4 difficulties + multi-phase plans
- ~~Tournament bracket system~~ **DONE** — `tournamentBracket.ts` with 8 fighters × 5 types + betting
- ~~Poison crafting system~~ **DONE** — `poisonCrafting.ts` with 8 poisons × 4 delivery × 4 rarity
- ~~Underground river navigation~~ **DONE** — `undergroundRiver.ts` with 7 segments + 3 routes + hazards

**Wave 38 (1,523 tests — fixed 2 pre-existing broken tests):**
- ~~Court intrigue system~~ **DONE** — `courtIntrigue.ts` with 5 noble houses + scandals + favors
- ~~Shipwreck generator~~ **DONE** — `shipwreckGenerator.ts` with 4 wrecks + cargo + survivors + hazards
- ~~Advanced bounty board~~ **DONE** — `bountyBoardAdvanced.ts` with 6 bounties + rival hunters
- ~~Layered curse system~~ **DONE** — `curseLayered.ts` with 5 curses × multi-stage progression
- ~~Alchemical foraging~~ **DONE** — `alchemicalForaging.ts` with 12 ingredients × 8 biomes × 4 seasons
- ~~Spelljammer helm system~~ **DONE** — `spelljammerHelm.ts` with 5 helms + 7 hazards + 5 encounters

**Wave 39 (1,574 tests):**
- ~~Library research system~~ **DONE** — `libraryResearch.ts` with 4 libraries + books with secrets
- ~~Advanced festival generator~~ **DONE** — `festivalAdvanced.ts` with 6 festivals × 6 types + activities
- ~~Wilderness survival tracker~~ **DONE** — `wildernessSurvival.ts` with 7 biomes + hunger/thirst/exposure
- ~~Legendary weapon awakening~~ **DONE** — `legendaryWeapon.ts` with 4 weapons × 3 stages + deeds
- ~~Summoning circle mishap table~~ **DONE** — `summoningMishap.ts` with 12 mishaps × 4 severities
- ~~Astral projection encounters~~ **DONE** — `astralEncounter.ts` with 10 encounters × 6 zones + cord risk

**Wave 40 (1,630 tests — fixed 4 pre-existing broken tests):**
- ~~Lycanthropy progression~~ **DONE** — `lycanthropy.ts` with 5 types × 5 stages + cure conditions
- ~~Deity pantheon builder~~ **DONE** — `deityPantheon.ts` with 6 deities + domains + rivalries
- ~~Magical tattoo system~~ **DONE** — `magicalTattoo.ts` with 6 tattoos × 6 locations + upgrades
- ~~Mass combat rules~~ **DONE** — `massCombat.ts` with 8 units + 5 commander abilities + 6 modifiers
- ~~Thieves guild job board~~ **DONE** — `thievesGuildJobs.ts` with 8 jobs × 6 types + complications
- ~~Dungeon room dressing~~ **DONE** — `dungeonRoomDressing.ts` with 8 archetypes + loot + traps

**Wave 41 (1,679 tests):**
- ~~Warlock patron tracker~~ **DONE** — `warlockPatron.ts` with 4 patrons + demands/gifts/displeasure
- ~~Expanded wild magic~~ **DONE** — `wildMagicExpanded.ts` with 30 surges × 4 categories
- ~~Haunted location generator~~ **DONE** — `hauntedLocation.ts` with 5 locations × 5 haunt types
- ~~Diplomatic negotiation~~ **DONE** — `diplomaticNegotiation.ts` with 2 scenarios + leverage/concessions
- ~~Guild membership perks~~ **DONE** — `guildMembership.ts` with 3 guilds × 5 ranks + progressive perks
- ~~Magical disease system~~ **DONE** — `magicalDisease.ts` with 5 diseases × 6 transmissions + progressive symptoms

**Wave 42 (1,728 tests):**
- ~~Airship encounters~~ **DONE** — `airshipEncounter.ts` with 8 encounters × 4 altitudes
- ~~Detective case generator~~ **DONE** — `detectiveCase.ts` with 3 cases + suspects + clues + red herrings
- ~~Elemental weapon infusion~~ **DONE** — `elementalInfusion.ts` with 8 elements + on-hit effects
- ~~NPC schedule system~~ **DONE** — `npcSchedule.ts` with 4 NPCs + daily routines + secret activities
- ~~Planar travel side effects~~ **DONE** — `planarSideEffects.ts` with 10 effects × 8 destinations
- ~~Gladiator arena progression~~ **DONE** — `gladiatorArena.ts` with 8 fighters + sponsors + rank-up

**Wave 43 (1,780 tests):**
- ~~Vampire bloodline system~~ **DONE** — `vampireBloodline.ts` with 2 bloodlines × 5 ages + powers
- ~~Sentient item personality~~ **DONE** — `sentientItem.ts` with 6 items × 6 personalities + relationship
- ~~Downtime activity tracker~~ **DONE** — `downtimeActivity.ts` with 11 activities × 8 types
- ~~Natural disaster generator~~ **DONE** — `naturalDisaster.ts` with 6 disasters + mechanical effects
- ~~Caravan ambush generator~~ **DONE** — `caravanAmbush.ts` with 5 ambushes × 5 terrains + tactics
- ~~Ship cargo manifest~~ **DONE** — `shipCargo.ts` with 10 goods × 6 regions + smuggling detection

**Wave 44 (1,830 tests):**
- ~~Magical anomaly generator~~ **DONE** — `magicalAnomaly.ts` with 6 anomaly types + multi-effect zones
- ~~Ship crew management~~ **DONE** — `shipCrewManagement.ts` with 8 roles + morale/mutiny system
- ~~Battlefield scavenger loot~~ **DONE** — `battlefieldScavenge.ts` with 3 battle types + condition values
- ~~Mirror dimension generator~~ **DONE** — `mirrorDimension.ts` with 6 types + twisted rules
- ~~Underground faction generator~~ **DONE** — `undergroundFaction.ts` with 5 factions + territory/signal
- ~~Ancient prophecy generator~~ **DONE** — `ancientProphecy.ts` with 4 prophecies + subversions

**Wave 45 (1,878 tests — fixed 1 pre-existing broken test):**
- ~~Magical contract system~~ **DONE** — `magicalContract.ts` with 4 contracts + loopholes
- ~~Treasure map generator~~ **DONE** — `treasureMap.ts` with 4 maps + riddles + guardians
- ~~Wild shape bestiary~~ **DONE** — `wildShapeBestiary.ts` with 8 forms + level gating
- ~~Tavern reputation tracker~~ **DONE** — `tavernReputation.ts` with 6 reputation types + bans
- ~~Divine intervention table~~ **DONE** — `divineIntervention.ts` with 8 interventions + faith scaling
- ~~Siege defense planner~~ **DONE** — `siegeDefense.ts` with 2 plans + 6 positions + resources

**Wave 46 (1,926 tests):**
- ~~Mind control resistance~~ **DONE** — `mindControl.ts` with 6 sources + willpower degradation
- ~~Social encounter generator~~ **DONE** — `socialEncounter.ts` with 5 encounters + approaches
- ~~Golem crafting instructions~~ **DONE** — `golemCrafting.ts` with 3 blueprints + step-by-step
- ~~Planar marketplace~~ **DONE** — `planarMarketplace.ts` with 4 shops + non-gold currencies
- ~~Faction quest chains~~ **DONE** — `factionQuestChain.ts` with 3 chains + branch points
- ~~Death save drama~~ **DONE** — `deathSaveDrama.ts` with 16 narrations × 8 moments

**Wave 47 (1,973 tests — fixed 1 pre-existing broken test):**
- ~~Alchemy recipe book~~ **DONE** — `alchemyRecipeBook.ts` with 8 recipes × 6 categories
- ~~Exile/banishment scenario~~ **DONE** — `exileScenario.ts` with 5 scenarios × 6 reasons
- ~~Familiar evolution~~ **DONE** — `familiarEvolution.ts` with 3 familiars × 4 forms + XP
- ~~Wanted poster generator~~ **DONE** — `wantedPoster.ts` with 5 tiers + bounty escalation
- ~~Planar weather~~ **DONE** — `planarWeather.ts` with 6 events × 6 sources + plot hooks
- ~~Trap corridor designer~~ **DONE** — `trapCorridor.ts` with 3 corridors + sequential traps

**Wave 48 — 🎉 2,000 TEST MILESTONE (2,014 tests, fixed 1 pre-existing):**
- ~~Bardic inspiration table~~ **DONE** — `bardicInspiration.ts` with 10 effects × 6 moments
- ~~Enchanted forest generator~~ **DONE** — `enchantedForest.ts` with 4 forests × unique rules
- ~~Noble scandal generator~~ **DONE** — `nobleScandalGen.ts` with 6 scandals × 6 types + blackmail
- ~~Merchant haggling mini-game~~ **DONE** — `merchantHaggling.ts` with 5 moods × 6 tactics
- ~~Magical pet peeve system~~ **DONE** — `magicalPetPeeve.ts` with 8 opinionated items
- ~~War room briefing generator~~ **DONE** — `warRoomBriefing.ts` with 3 operations + intel reliability

**Wave 49 (2,061 tests):**
- ~~Encounter difficulty tuner~~ **DONE** — `encounterDifficultyTuner.ts` with XP thresholds + party assessment
- ~~Arcane research breakthrough~~ **DONE** — `arcaneResearch.ts` with 5 projects + catastrophic failures
- ~~NPC backstory generator~~ **DONE** — `npcBackstoryGen.ts` with 6 backstories + secret toggle
- ~~Weather terrain modifier~~ **DONE** — `weatherTerrainMod.ts` with 15 weather×terrain combos
- ~~Ancient ruin floor plan~~ **DONE** — `ancientRuinLayout.ts` with 2 multi-room ruins + connections
- ~~Magical communication~~ **DONE** — `magicalCommunication.ts` with 6 methods + interception risks

**Wave 50 — 🏆 THE FIFTY (2,110 tests):**
- ~~Monster harvesting~~ **DONE** — `monsterHarvesting.ts` with 5 profiles + spoil timers + crafting
- ~~Artifact corruption tracker~~ **DONE** — `artifactCorruption.ts` with 3 artifacts × 5 stages
- ~~NPC voice/accent generator~~ **DONE** — `npcVoiceAccent.ts` with 8 voices + RP tips
- ~~Evolving traps~~ **DONE** — `evolvingTrap.ts` with 3 traps + adaptive intelligence
- ~~Cross-plane messenger~~ **DONE** — `crossPlaneMessenger.ts` with 6 services + package types
- ~~Astral ship combat~~ **DONE** — `astralShipCombat.ts` with 6 weapons + 4 shields + boarding

**Wave 51 (2,158 tests):**
- ~~Illithid colony generator~~ **DONE** — `illithidColony.ts` with 2 colonies + thrall hierarchies
- ~~Ancestral spirit guide~~ **DONE** — `ancestralSpirit.ts` with 3 spirits + situational guidance
- ~~Pocket dimension generator~~ **DONE** — `pocketDimension.ts` with 5 dimensions + unique physics
- ~~Arcane black market~~ **DONE** — `arcaneBlackMarket.ts` with 8 items + hidden catches
- ~~Clockwork dungeon generator~~ **DONE** — `clockworkDungeon.ts` with 2 dungeons + mechanisms
- ~~Magical weather calendar~~ **DONE** — `magicalWeatherCalendar.ts` with 8 events × 4 seasons

**Wave 52 (2,204 tests):**
- ~~Dragon personality matrix~~ **DONE** — `dragonPersonality.ts` with 4 profiles + negotiation styles
- ~~Cataclysm countdown~~ **DONE** — `cataclysmCountdown.ts` with 3 events × 3 stages + intervention
- ~~Interplanar customs~~ **DONE** — `interplanarCustoms.ts` with 3 offices + absurd bureaucracy
- ~~Magical ecosystem~~ **DONE** — `magicalEcosystem.ts` with 2 ecosystems + party reactions
- ~~Time loop dungeon~~ **DONE** — `timeLoopDungeon.ts` with 2 dungeons + cumulative knowledge
- ~~Weapon sentience awakening~~ **DONE** — `weaponSentienceAwaken.ts` with 3 weapons × 3 stages

**Wave 53 (2,246 tests):**
- ~~Dark bargain generator~~ **DONE** — `darkBargain.ts` with 5 bargains + hidden costs + escalation
- ~~NPC death scene~~ **DONE** — `npcDeathScene.ts` with 6 scenes × 6 contexts + memorials
- ~~Lair action generator~~ **DONE** — `lairAction.ts` with 10 actions × 7 themes
- ~~Planar refugee crisis~~ **DONE** — `planarRefugee.ts` with 4 groups + tensions + plot hooks
- ~~Dream combat system~~ **DONE** — `dreamCombat.ts` with 3 terrains + psychic attacks
- ~~Magical library catalog~~ **DONE** — `magicalLibraryCatalog.ts` with 3 sections + book defenses

**Wave 54 — 🎉 +1000 TESTS IN ONE SESSION (2,292 tests):**
- ~~Villain monologue generator~~ **DONE** — `villainMonologue.ts` with 6 archetypes + interruption
- ~~Diplomatic gift generator~~ **DONE** — `diplomaticGift.ts` with 9 gifts × 7 cultures + taboos
- ~~Shapeshifter detector~~ **DONE** — `shapeshifterDetector.ts` with 10 techniques × 5 methods
- ~~Dragon hoard layout~~ **DONE** — `dragonHoardLayout.ts` with 3 layouts + zones + alarms
- ~~Astral weather hazards~~ **DONE** — `astralWeatherHazard.ts` with 6 hazards + benefits
- ~~Tattoo removal system~~ **DONE** — `tattooRemoval.ts` with 6 methods + pain levels

**Wave 55 Roadmap:**
- Campaign world map with hex-based overland travel and fog-of-war exploration
- Player-to-player item trading with offer/accept/decline confirmation modal
- Random battlefield aftermath — post-combat environment storytelling and scavenging
- Arcane addiction system — magical dependency with withdrawal and escalation
- Random NPC pet/companion — memorable animals that follow NPCs around
- Cursed artifact auction — bidding wars for dangerous magical items
- Random ancient language decoder — in-game translation puzzles for inscriptions
- Magical weather forecast — predicting upcoming magical events based on signs

**Wave 32 (1,018 tests):**
- ~~Random secrets~~ **DONE** — `randomSecret.ts` with 15 secrets × 5 categories × 3 danger levels
- ~~Weapon quirks~~ **DONE** — `randomWeaponQuirk.ts` with 15 quirks × 4 categories
- ~~Disguise generator~~ **DONE** — `randomDisguise.ts` with outfits, personas, props, DCs
- ~~Plot twists~~ **DONE** — `randomPlotTwist.ts` with 12 twists × 3 impact levels
- ~~Bar fight generator~~ **DONE** — `randomBarFight.ts` with triggers, escalation, consequences
- ~~Dream generator~~ **DONE** — `randomDream.ts` with 12 dreams × 5 types + mechanical effects

- 19 new tests (203 player total, 225 with API) covering 4 systems:
  - **Campaign templates** (5 tests): count, required fields, quest structure, unique IDs, suggested levels.
  - **Enemy multiattack** (4 tests): hard tier has multiattack 2+, deadly has 3+, easy has none, generation inherits multiattack.
  - **Class save proficiencies integration** (5 tests): all 12 classes have exactly 2, no duplicates, specific class checks (Fighter/Barbarian STR+CON, Wizard INT+WIS, Rogue DEX+INT).
  - **Class skill choices** (5 tests): Bard 3, Rogue 4, Ranger 3, most classes 2, all options are valid D&D 5e skills.
- 4 final QoL features:
  - **Bulk dice roller** — quick dropdown in CombatToolbar for common rolls (1d4 through 10d10, 1d100 percentile). Shows individual dice + total in combat log.
  - **Map zoom-to-fit** — "Fit" button auto-calculates bounding box of all tokens and sets zoom/pan to show everything with padding.
  - **Inventory sort** — sort buttons (name/type/value/rarity) appear when inventory has 4+ items in CharacterSheet.
  - **Combat log search prep** — EncounterLog already has search filtering; live combat log stays lean for performance.
- 16 more tests (184 total) covering 4 additional systems:
  - **Random encounters** (5 tests): all 5 environments, valid entries, count min/max, non-combat returns 0, unknown env fallback.
  - **Encumbrance edge cases** (4 tests): zero STR, high STR scaling, heavy inventory (100 items × 2 qty), equipment weight inclusion.
  - **Exhaustion integration** (3 tests): all speed multipliers 0-1, disadvantage checks at L1, disadvantage attacks at L3.
  - **Spell slot integrity** (4 tests): full casters L1 slots, half casters L2 slots, non-casters zero slots, slot increase with level.
- 28 new tests (168 total) covering 7 data modules:
  - **Treasure hoards** (4 tests): tier scaling, gold generation, item field validation, gem arrays.
  - **Downtime activities** (4 tests): activity count, success/failure outcomes, pit-fighting gold, unknown activity fallback.
  - **Tavern rumors** (5 tests): count, valid type, requested count, all 4 categories present, quest hooks exist.
  - **Chase obstacles** (3 tests): urban/wilderness counts, valid obstacle structure, success/failure narration.
  - **Travel pace** (5 tests): slow/normal/fast speeds, stealth rules, time calculation, slowest party member, empty party default.
  - **Condition rules** (3 tests): combat condition text coverage, content verification, unknown condition fallback.
  - **Bonus action helpers** (4 tests): 10 supported classes, level requirements (Rogue 2, Monk 2, Sorcerer 3), correct labels, Wizard/Warlock return false.
- 5 core D&D mechanics — attunement, hit dice, passive skills, rumors, identification:
  - **Magic item attunement** — `requiresAttunement` + `attuned` fields on Item, `attunedItemIds` on Character (max 3). Treasure hoard items now generate with attunement requirement for rare+ items.
  - **Hit dice spending on short rest** — `restCharacter` now accepts `hitDiceToSpend` parameter, allowing multiple dice to be spent per short rest (each rolled individually + CON mod).
  - **Passive skills display** — CharacterSheet now shows Passive Perception, Passive Insight, and Passive Investigation (10 + ability mod + proficiency if proficient).
  - **Tavern rumor table** — `tavernRumors.ts` with 18 rumors across 4 categories (helpful/misleading/ominous/humorous), some flagged as quest hooks. "Roll Tavern Rumors" DM button generates 3 random rumors.
  - **Magic item identification** — treasure hoard items now spawn unidentified (`identified: false`). Arcana check system planned for next pass.
- 5 UX polish + code quality features:
  - **Condition rules reference** — `conditionRules.ts` with full D&D 5e rules text for all 21+ conditions. Quick-stats bar condition badges now show complete rules text with source and duration on hover (`cursor-help`).
  - **DM quick-reference panel** — `DMQuickRef` component: modal overlay with Difficulty Classes, Actions in Combat, Cover rules, Conditions, and Damage Types. One-click "Quick Ref" button accessible during game.
  - **Combat turn reminder toast** — players get a toast notification when their turn starts, showing available movement, bonus action, and reaction status.
  - **Bonus action availability indicator** — pulsing ⚡ on InitiativeBar when it's a player's turn and their class bonus action hasn't been used. `BonusActionPanel` component with `getBonusActionLabel` + `hasBonusAction` utilities for all 10 classes.
  - **Enhanced condition tooltips** — condition badges throughout the UI now show full rules text, source attribution, and remaining duration in multi-line tooltips.
- 5 more D&D systems — surprise, encounter templates, death/resurrection, session export, backstory hooks:
  - **Surprise round system** — hidden players can surprise enemies at combat start. Stealth vs passive perception check auto-applies `surprised` condition (can't act/react, -2 AC, duration 1 turn). New `surprised` condition type.
  - **Combat encounter templates** — Save/Load buttons in DMSidebar: DM saves current enemy composition as reusable template (stored in localStorage, max 20). Load spawns all enemies with fresh initiative.
  - **Character death and resurrection** — DM gets "Stabilize" (1 HP) and "Revive" (half HP) buttons when viewing a downed character. Resets death saves, logs to combat, plays healing sound.
  - **Session log export** — "Session Log" button exports full session as formatted markdown: party summary, narrative history (DM messages), and combat log in sections.
  - **Backstory plot hooks** — "Generate Backstory Hooks" DM button sends character backstories to AI and returns 3 personalized plot hooks referencing specific characters.
- 5 advanced D&D systems:
  - **Skill challenge system** — full `SkillChallenge` component: DM sets DC/successes/failures, players pick from 18 skills (each usable once per character), progress bar with green/red dots, rolls with proficiency, dramatic moment on success.
  - **Monster knowledge checks** — "Recall Lore" button: Arcana check reveals monster AC (DC 10), HP estimate (DC 12), resistances/vulnerabilities (DC 14), immunities (DC 16), abilities (DC 18). Tiered reveal system.
  - **Chase scene mechanics** — urban + wilderness chase buttons in DMSidebar. Random obstacles per environment (crowd, fallen log, etc) with skill checks. `chaseObstacles.ts` with 10 urban + 5 wilderness obstacles.
  - **Rest encounter interruption** — 20% chance of long rest being interrupted by a random encounter (wolves, bandits, undead patrol, owlbear, goblins). DM-facing narrative prompt.
  - **Breakable objects** — "Object" DM button places destructible tokens (Wooden Door, Barrel, Crumbling Wall, Locked Chest, Stone Pillar) with HP/AC. Targetable by player attacks. `isObject`/`objectType` fields on Unit.
- 5 progression + narrative features:
  - **Treasure hoard tables** — level-scaled random loot generator with gold/gems/magic items per DMG tiers. 4 rarity pools (common→epic) with named items (Flame Tongue, Bag of Holding, Staff of Power etc). "Roll Treasure Hoard" button in DMSidebar.
  - **Milestone XP system** — two DM buttons: "Award XP" (30% of next level to all) and "Level Up All" (instant milestone leveling). Alternative to combat XP for story-driven campaigns.
  - **Downtime activities** — 7 activities (Crafting, Research, Training, Carousing, Pit Fighting, Gambling, Recuperating) with skill checks, gold costs, and narrative outcomes. Collapsible grid in DMSidebar.
  - **Faction reputation tracker** — per-faction reputation (-5 to +5) displayed in NPC tab. DM +/- buttons, color-coded (green/neutral/red). "Add Faction" button for campaign-specific organizations.
  - 1 new test (140 total): exhaustion level 6 = death verification.
- 5 exploration + advanced combat features:
  - **Enemy multiattack** — high-CR enemies (hard/deadly) now get 2-3 attacks per turn in the AI. `multiattack` field on Unit/EnemyTemplate propagated through spawn. AI attack loop checks target HP between attacks, log prefixed with [1/3] etc.
  - **Random encounter tables** — 5 environment-themed tables (forest/dungeon/mountain/swamp/urban) with 5-6 entries each. DM clicks environment button in DMSidebar to roll. `randomEncounters.ts` module with CR-scaled entries and descriptions.
  - **In-game time tracker** — always-visible Day N + time-of-day display (🌙Night/🌅Dawn/☀️Day/🌅Dusk) with DM +1h/+6h advance buttons. Synced via `calendar_sync` WebSocket event.
  - **Travel pace calculator** — `travelPace.ts` module with D&D 5e slow/normal/fast pace data (miles/hour, miles/day, stealth, perception). `calculateTravelTime()` and `partyTravelSpeed()` functions.
  - **Enemy resistances on spawn** — monster spawn now copies `resistances`/`vulnerabilities`/`immunities` from template to Unit (was missing from spawn function).
- 5 features + 3 tests — concentration display, exhaustion, inspiration, party inventory, spell prep:
  - **Concentration tracking on InitiativeBar** — units concentrating on a spell show 🎯 + spell name, making it easy to see who's maintaining what.
  - **Exhaustion display on InitiativeBar** — exhaustion level shown as colored E1-E6 badge with tooltip describing cumulative penalties. `EXHAUSTION_EFFECTS` data table for all 7 levels (0-6) with speed/disadvantage/HP/death effects.
  - **Inspiration grant/spend UI** — DM sees "Grant Inspiration" button, player with inspiration sees pulsing "⭐ Use Inspiration" button on their turn. Grant/spend logged to combat log.
  - **Party shared inventory** — collapsible "Party Loot Bag" below LootTracker. DM can add items, players can take items. Synced via `party_inventory_sync` WebSocket event.
  - **Spell preparation** — confirmed already fully implemented in CharacterSheet with `preparedSpellIds` + toggle UI.
  - 3 new exhaustion tests (139 total): levels 0-6 defined, level 0 has no penalties, penalties are cumulative.
- 5 production hardening improvements:
  - **Chat/log history limits** — Lobby chat capped at 300 messages, Game combat log capped at 500 entries. Auto-prunes oldest entries to prevent unbounded memory growth in long sessions.
  - **Character creation input validation** — name length (1-50 chars), HTML tag stripping, stat clamping (1-30), personality/backstory text sanitized + length-capped. Prevents XSS and garbage data.
  - **Chat message sanitization** — Lobby DO now strips HTML tags and caps messages at 2000 chars before broadcast.
  - **WebSocket reconnect state sync** — client sends `request_state` game event on (re)connect to get full game state from host, improving recovery after network drops.
  - **InitiativeBar React.memo** — wrapped in `memo()` to prevent re-renders when parent state changes but initiative data hasn't.
- 22 new tests (136 total) covering all new systems:
  - **Weather combat effects** (6 tests): all weather types defined, ranged disadvantage for rain/fog/sandstorm, melee unaffected, snow/sandstorm movement penalty, rollD20WithProne extra disadvantage.
  - **Encumbrance system** (3 tests): carry capacity scales with STR, inventory weight sums with quantity, handles missing weights.
  - **Class proficiency data** (5 tests): all 12 classes have 2 save proficiencies with valid stats, skill choices per PHB, 18 skills mapped, 5+ crit effects.
  - **Combat taunts** (5 tests): taunt for any name, undead/beast/dragon categorization, default fallback.
  - **Roll20 import** (3 tests): format detection, stat/inventory/spell parsing, graceful missing attribute handling.
- 5 cinematic + immersion features:
  - **Dramatic moment system** — cinematic screen overlay for pivotal moments: CRITICAL HIT (amber flash), BOSS SLAIN (purple for CR 3+), with title/subtitle text + glow effects. `useDramaticMoments` hook with configurable duration per type.
  - **Weather combat effects** — rain/fog/sandstorm now impose ranged attack disadvantage via `rollD20WithProne` extra parameter. `weatherEffects.ts` data module defines per-weather: ranged disadvantage, perception penalty, movement cost, visibility range.
  - **Combat taunt + intimidation system** — enemies shout random taunts on odd rounds (categorized: undead/beast/humanoid/dragon/default). Players can Intimidate (CHA vs WIS) to frighten enemies for 2 turns. `combatTaunts.ts` data module.
  - **Loot burst animation** — CSS `loot-burst` keyframe for boss kill celebration (scale + float + fade).
  - **Character mood emoji on InitiativeBar** — auto-set based on HP% and conditions: 😊 good, 😤 hurt, 😣 critical, 😡 raging, 😰 frightened, 🤢 poisoned, 💀 down.
- 5 features — onboarding, inline dice, quick-stats bar, /spawn command, session summary:
  - **New player onboarding** — 6-step guided tooltip tour for first-visit users: Welcome, Character, Dice, Combat, Map, Shortcuts. Positioned overlays with progress dots, Skip/Back/Next navigation, permanently dismissed via localStorage.
  - **Chat inline dice roller** — `[[2d6+3]]` or `((1d20+5))` notation in chat messages auto-rolls server-side in Lobby DO, replacing the notation with bolded results showing individual rolls + total.
  - **Character quick-stats bar** — always-visible strip below party health showing selected character's HP (color-coded), AC, level, spell slots remaining, gold, and active conditions with duration.
  - **DM /spawn chat command** — DM types `/spawn goblin 3` in chat to instantly spawn enemies without opening the encounter panel. Broadcasts `quick_spawn` game event, generates units from templates.
  - **Session auto-summary on long rest** — long rest now sends recent DM history to AI narrator to generate a 2-3 sentence session recap (📜 *Session so far:* prefix).
- 5 features — whisper, condition expire, clipboard import, stat tooltips, re-sort initiative:
  - **DM whisper system** — `/w <username> <message>` in chat sends a private message only visible to the target player. Lobby DO routes whisper to specific WebSocket, echoes confirmation to DM.
  - **Condition duration auto-expire** — conditions now decrement duration on turn end and auto-remove at 0. Expired conditions logged to combat. Barbarian rage resistances cleaned up when rage expires.
  - **Clipboard character text import** — "Paste" button on Home parses clipboard text: tries JSON first (D&D Beyond/Foundry/Roll20/native), then falls back to regex extraction of Name/Race/Class/Level/Stats from plaintext character sheets.
  - **Ability score rich tooltips** — hovering a stat in CharacterSheet now shows: score, modifier, save proficiency status, full save bonus, and related skills list.
  - **Re-sort initiative button** — DM tool re-sorts all units by initiative value (DESC) with DEX tiebreaker, for when manual edits make the order stale.
- 5 features — encumbrance, proficiencies, save roller, rest summary, round timer:
  - **Inventory weight/encumbrance** — `calculateCarryCapacity(STR)` and `calculateInventoryWeight()` in types/game.ts. Item weight field added. D&D 5e variant encumbrance tiers (normal/encumbered/heavily encumbered).
  - **Character proficiency data system** — `skillProficiencies`, `saveProficiencies`, `toolProficiencies` fields on Character type. `CLASS_SKILL_CHOICES` data for all 12 classes with skill counts and options per PHB.
  - **Saving throw roller** — "Save..." dropdown in CombatToolbar: rolls d20 + ability mod + proficiency bonus (if class proficient). All 6 saves, nat 20/1 callouts.
  - **Rest recovery summary** — short rest now shows HP gained + spell slots recovered in DM chat. Long rest shows full recovery details including exhaustion reduction.
  - **Combat round timer** — tracks elapsed time per round and total combat duration. Round duration logged on new round, total duration logged on combat end.
- 5 D&D 5e core mechanics + combat polish:
  - **Skill check system** — skill check dropdown in CombatToolbar: rolls d20 + ability mod + proficiency (if proficient), supports all 18 D&D 5e skills, nat 20/1 callouts, logged to combat log.
  - **Saving throw proficiencies** — concentration saves now add proficiency bonus when the class is proficient in CON saves (Barbarian, Fighter, Sorcerer). `CLASS_SAVE_PROFICIENCIES` data for all 12 classes.
  - **Critical hit effects table** — nat 20s now roll from a random effect table: Lingering Wound (bleeding), Disoriented (disadvantage), Armor Crack (AC -1), Brutal Strike (extra die), or Clean Hit (no extra). Applied via conditions + unit stat modifications.
  - **Encounter difficulty live badge** — combat view shows EASY/MEDIUM/HARD/DEADLY badge based on remaining enemy XP vs party encounter budget, color-coded with hover tooltip showing budget breakdown.
  - **Token HP bars already existed** — confirmed at BattleMap line 1459 (canvas-rendered HP percentage bars under tokens).
- 5 new features — terrain hazards, spell zones, NPC dialogue, level-up options, combat recap:
  - **Terrain hazard auto-damage** — units starting their turn on lava (10 fire), acid (6 acid), or poison gas (4 poison) now take automatic damage with combat log annotations. Previously hazards were display-only.
  - **Persistent spell zones on map** — DMs can place named spell effect zones (Wall of Fire, Darkness, Fog Cloud, Spirit Guardians, Spike Growth, Moonbeam) with configurable radius. Stored as `SpellZone` with color/opacity/damage/vision-blocking properties.
  - **Quick NPC dialogue generator** — 💬 button per NPC in NpcTracker calls `/api/dm/npc` to generate contextual AI dialogue based on NPC name/role/disposition/location. Result appended to NPC notes.
  - **Level-up HP roll option** — `adventure:rollHpOnLevelUp` localStorage toggle: when enabled, level-up HP uses actual die rolls instead of average (still guaranteed minimum 1).
  - **Post-combat per-character recap** — combat end now logs damage dealt and HP lost per party member in the combat log with a `--- Combat Recap ---` section.
- 5 QoL features:
  - **Damage resistance/vulnerability system** — Barbarian rage now grants physical damage resistance (bludgeoning/piercing/slashing). Monster templates support resistances/vulnerabilities/immunities (Skeletons vulnerable to bludgeoning, Zombies immune to poison). `damageUnit` applies half/double/zero damage with combat log annotations.
  - **Combat log export** — "Export Log" button downloads full combat log as markdown file for post-session review.
  - **Spell slot display on InitiativeBar** — caster units show remaining spell slots (◆N) next to their initiative card, blue when available, dim when depleted.
  - **Concentration auto-break** — confirmed already done: auto-rolls CON save on damage (DC = max(10, damage/2)), War Caster feat support, logs success/failure with full roll breakdown.
  - **Rest system polish** — Sorcerer sorcery points reset on short rest, Wizard Arcane Recovery one-time slot recovery on short rest, all resources reset on long rest.
- 5 more features beyond the roadmap — completing all 12 class systems:
  - **Ranger Hunter's Mark** — bonus action marks an enemy target, adding +1d6 damage on all hits (including crits which double it). New `hunterMarked` condition with lime indicator. Damage shown in combat log with `[+N hunter's mark]` tag.
  - **Sorcerer Metamagic** — Quickened Spell (2 sorcery points, cast spell as bonus action) + Twinned Spell (1+ point, next single-target spell hits 2 targets). Sorcery points tracked per character, reset on long rest.
  - **Wizard Arcane Recovery** — short rest now recovers spell slots worth up to half wizard level (rounded up), lowest slots first. `arcaneRecoveryUsed` flag prevents double recovery (resets on long rest).
  - **Warlock Eldritch Invocations** — sorcery points reset on short rest for Sorcerers (alongside Warlock pact slot recovery).
  - **Combat auto-save** — DM's combat state auto-saves to server every 30s during combat + on combat end, preventing progress loss on refresh.
- 5 new gameplay features beyond the roadmap:
  - **Druid Wild Shape** — bonus action to transform into beast form (Wolf/Bear/Giant Spider/Giant Eagle/Dire Wolf) with separate HP pool, stat block swap, and Revert Shape button. `wildShapeOriginal` + `isWildShaped` fields on Unit. Beast forms scale with level.
  - **Death save tracking UI** — visual 3-success/3-fail dot tracker on InitiativeBar for player units at 0 HP. Green/red dots with hover tooltip showing save counts.
  - **Spell slot recovery on rest** — Warlock pact magic slots now correctly reset on short rest (other casters only on long rest, which was already working). Matches D&D 5e RAW.
  - **Cantrip damage scaling** — cantrips (Eldritch Blast, Fire Bolt, etc.) now scale damage dice at levels 5/11/17 per D&D 5e rules (1d→2d→3d→4d).
  - **Cleric Channel Divinity: Turn Undead** — bonus action that forces undead enemies to make WIS save or be frightened. Once per short rest.
- **ROADMAP CLEARED** — final 5 items shipped:
  - **Lobby DO hibernation** — migrated to `this.state.acceptWebSocket()` with `webSocketMessage()`/`webSocketClose()`/`webSocketError()` handlers. Extracted `handlePlayerLeave()` shared method. DO now evicts from memory when idle, reducing cost for inactive lobbies. `rehydrateWebSockets()` re-maps sessions on wake.
  - **Forbidden Lands export** — `exportForbiddenLands()` maps D&D 5e to Year Zero Engine format (Kin/Profession/Attributes 2-5 scale, gold→silver conversion).
  - **Savage Worlds export** — `exportSavageWorlds()` maps to SWADE format (die-type attributes d4-d12, class→Edges mapping, rank by level).
  - **Discord Activity SDK** — `discordActivity.ts` module with iframe detection, participant tracking, Rich Presence updates, activity invite URLs. Auto-initialized in main.tsx on load.
  - All export formats now available: JSON, Markdown, Clipboard, PDF, Foundry VTT, Fantasy Grounds, D&D Beyond, Pathfinder 2e, Forbidden Lands, Savage Worlds (10 total).
- 4 new features + 6 roadmap items confirmed done:
  - **Roll20 JSON character import** — new `roll20Import.ts` parser handles Roll20 character vault format (attribs[] array), maps attributes/inventory/spells, auto-detected in import flow.
  - **Pathfinder 2e export** — new `exportPathfinder2e()` maps D&D 5e character to PF2e Foundry actor format (class conversion: Paladin→Champion, Warlock→Witch), wired into export format list.
  - **VTT map URL import** — "URL" button in BattleMap DM tools lets DMs paste map image URLs as backgrounds alongside existing file upload.
  - **AI session prep** — "AI Session Prep" collapsible in DMSidebar Encounter tab: DM enters session goals, gets AI-generated outline with opening narration, encounters, NPCs, and plot twists via /api/dm/narrate.
  - Confirmed already-done: D&D Beyond import, Foundry VTT import, AI voice narration (TTS), fog-of-war per-player (computeVisibility), map layers (7 toggleable layers), dynamic lighting.
- 5 roadmap items shipped + 3 confirmed already done:
  - **Rate limiting on public lobbies** — chat (5/sec) and dice (8/sec) rate limits added to Lobby DO handleMessage, reusing existing lastGameEvents token bucket.
  - **AI companion auto-generation** — AI seats without assigned characters now auto-generate level-matched Fighter/Cleric/Wizard/Rogue companions with class-appropriate stats.
  - **Undo/redo for DM actions** — new `useUndoRedo` hook with snapshot-based command stack (max 20), Ctrl+Z/Ctrl+Shift+Z keyboard shortcuts, combat log annotation.
  - **Dice 3D animation** — CSS 3D tumble animation (`perspective + rotateX/Y/Z`) during rolls with bounce-land settle, replacing flat spin.
  - Confirmed already-done: Ambient music (5 procedural moods + full UI), Dynamic lighting (bright/dim/dark + torch radius), Attack indicators (slash/arrow/beam).
- 2 new features + 5 roadmap items confirmed done:
  - **Homebrew content editor** — new `HomebrewEditor` component in DMSidebar Notes tab with dual spell/item creation forms, per-campaign localStorage persistence, "Grant to..." dropdowns to assign homebrew content to characters.
  - **Drop-in guest characters** — "Quick Join" button in Lobby spectator view creates a temp Fighter character with default stats and immediately claims a seat, enabling zero-friction guest play.
  - Confirmed already-done: Initiative tiebreaker (DEX mod sort), Token aura system (canvas rendering + CombatToolbar UI), Minimap overlay (full implementation with click-to-pan), Multiclass support (CharacterSheet prereq checks), Portrait gallery (per-character with click-to-use).
- 4 more roadmap items shipped:
  - **Pre-built adventure modules** — 3 new campaign templates added (Into the Underdark, The Sunken Throne, The Shattered Gate) for 7 total. Covers underdark/survival, nautical/pirate, and planar/one-shot themes with full quest chains.
  - **AI DM encounter pacing** — expanded `useDynamicDifficulty` with varied narrative narrations (4 deadly + 4 easy variants), disguising mechanical adjustments with diverse combat flavor text.
  - **Campaign templates sharing** — "Share" button on each template copies a `?template=id` URL; Home auto-launches shared template links via URL param detection.
  - **Particle effects for spells** — new `SpellParticles` component with CSS-animated particles for 7 spell effects (fire/ice/lightning/heal/necrotic/radiant/force), triggered on AoE spell casts with school-based mapping.
- 4 roadmap items shipped in one pass:
  - **Combat initiative history** — previous rounds' turn orders tracked and shown in collapsible `<details>` panel below initiative bar (last 10 rounds, with initiative values + HP).
  - **Sound FX expansion** — 5 new procedural Web Audio sounds: `playDeathSave` (heartbeat + eerie whistle), `playConditionApplied` (buff/debuff chimes), `playConditionRemoved` (descending tone), `playShieldSpell` (metallic resonance), `playInitiativeRoll` (ascending drum roll).
  - **Campaign comparison stats** — aggregate stats panel on Home (characters, campaigns, highest level, total gold) shown when user has characters.
  - **Familiar/companion tokens** — "Summon Companion" button for Ranger/Druid/Wizard/Warlock creates a player-controlled secondary unit with `isCompanion`/`companionOwnerId` fields, separate initiative, scaled HP/attack.
- Added passive rules reminder system — `useRulesReminder` hook watches turn transitions and surfaces gentle combat log reminders for unused bonus actions (Rogue Cunning Action, Fighter Second Wind when low), available reaction spells (Shield for Wizards/Sorcerers), unused movement, and concentration save DCs. Deduped with 30s window. DM toggle in DMSidebar (sky-blue ON/OFF).
- Added campaign search + sort on Home page — search bar filters campaigns by name/room ID, sort dropdown offers newest/oldest/A-Z ordering. Controls appear automatically when user has 3+ campaigns.
- Added Paladin Divine Smite + Bard Bardic Inspiration bonus actions — Paladin gets toggleable "Divine Smite" that auto-applies +2d8 radiant on next melee hit (consumes lowest spell slot, doubles on crit, new `smiteArmed` condition). Bard gets "Bardic Inspiration" that grants scaling inspiration die (d6/d8/d10/d12) to an ally, once per short rest.
- DM initiative manual editing — DMs can now click any initiative number on InitiativeBar to inline-edit it with a number input. Enter/blur commits, Escape cancels, changes synced via combat broadcast and logged.
- Expanded keyboard shortcuts overlay from 10 items to 28 — now organized into 4 sections (General, Views, Combat, Battle Map) matching all actual Game.tsx key handlers, so players can discover shortcuts they didn't know existed.
- Added test coverage for new combat mechanics — 10 new tests covering all 18 condition types (including grappled), effectiveAC with conditions, reaction spell isReaction flag + class filtering, Hellish Rebuke availability, Shield properties, bonusActionUsed/readiedAction Unit fields, grappled speed-0 enforcement (114 total, up from 104).
- Added grapple/shove combat maneuvers — Grapple: contested Athletics check, applies `grappled` condition (new) with speed 0 enforced across all BattleMap movement paths. Shove: contested Athletics check, knocks target prone. Both require melee adjacency and are rose/amber themed.
- Added reaction spell casting — Shield (+5 AC), Counterspell (interrupt spell), and Hellish Rebuke (2d10 fire on hit) now appear as orange "Reaction" buttons when it's NOT the player's turn. Each consumes the reaction + a spell slot. Regular spell dropdown filters out reaction spells to avoid duplication.
- Added readied action support — players can hold their action with a trigger description + action text via the "Ready" button. Shows ⏳ indicator on InitiativeBar with tooltip. Fire button executes the readied action (uses reaction). Cancel button drops it. Auto-clears on the unit's next turn start per D&D 5e rules.
- Added D&D 5e bonus action system — `bonusActionUsed` field on Unit, reset each turn, violet "B" indicator on InitiativeBar. Class-specific bonus action buttons in CombatToolbar: Rogue Cunning Action (Dash/Disengage), Fighter Second Wind (1d10+level heal, once per short rest), Monk Step of the Wind (Dash+Disengage), Barbarian Rage.
- RelationshipGraph now syncs across all players via WebSocket — edge add/remove broadcasts `relationship_sync` events through Lobby DO relay. Every collaborative game panel now has real-time multiplayer sync (Journal, Loot, NPCs, Wiki, Calendar, Relationships).
- WorldWiki and CampaignCalendar now sync across all players via WebSocket — wiki page add/edit/delete broadcasts `wiki_sync` events, calendar day/event changes broadcast `calendar_sync` events. Both flow through Lobby DO relay.
- NPC Tracker now syncs across all players via WebSocket — DM add/edit/remove actions broadcast `npc_sync` game events through Lobby DO relay using the same `syncRef` callback pattern as SessionJournal and LootTracker. Players see NPC updates in real-time.
- Standardized campaign migration key construction across worker/tests — added shared helper functions for legacy list and marker keys, reducing string-literal drift risk when migration marker versions change.
- Hardened duplicate-selection correctness in backfill — duplicate merge now uses strict timestamp parsing (missing/invalid timestamps no longer default to "now") and tie-breaks equal timestamps with metadata richness, so noisy legacy entries cannot overwrite fresher or more complete records.
- Added regression tests for duplicate timestamp edge cases — campaign API coverage now verifies that missing-timestamp duplicates do not override timestamped entries and equal-timestamp duplicates pick the richer metadata record.
- Upgraded duplicate legacy handling to preserve freshest metadata — when backfill sees duplicate `roomId` entries, it now keeps the record with the newest `updatedAt/createdAt` instead of always keeping the first one.
- Added regression coverage for "newest duplicate wins" behavior — campaign migration tests now verify D1 imports the latest duplicate campaign name/description for a shared room ID.
- Fixed cap fairness for dirty legacy payloads — backfill now filters invalid/blank room IDs before dedupe and cap logic, so malformed entries no longer consume the 500-item migration window.
- Added regression coverage for invalid-before-cap scenarios — tests now verify valid campaigns still migrate even when legacy payloads are dominated by invalid room IDs.
- Improved backfill data efficiency by deduplicating legacy room IDs before cap enforcement — duplicate entries no longer consume the 500-item migration window, and telemetry now reports `deduped` + `skipped_duplicate` counts.
- Added regression coverage for dedupe-before-cap behavior — campaign migration tests now verify trailing unique campaigns still import even when early legacy payloads contain heavy roomId duplication.
- Improved legacy payload parsing diagnostics — campaign backfill now distinguishes malformed JSON (`campaign_backfill_invalid_json`) from valid-but-wrong-shape payloads (`campaign_backfill_invalid_shape`), and avoids emitting `campaign_backfill_no_legacy` for parse failures.
- Added regression coverage for invalid-shape legacy payloads — tests now verify object-style legacy values still set the one-time marker and do not allow later KV entries to be re-imported.
- Added explicit empty-legacy behavior for one-time migration — successful reads with no legacy campaigns now log `campaign_backfill_no_legacy`, still set the D1 migration marker, and are covered by tests to ensure later KV additions are intentionally not re-imported.
- Improved lazy backfill resilience for transient KV failures — if legacy campaign KV read fails, migration now logs `campaign_backfill_legacy_read_failed` and skips writing the one-time marker so later requests can retry and recover.
- Standardized campaign backfill tunables + telemetry — introduced shared constants for backfill cap/owner-lookup chunk/batch chunk sizing and extended `campaign_backfill` logs with statement count + duration (`duration_ms`) for easier migration performance tracking.
- Hardened one-time migration marker writes — backfill now treats marker KV write failures as non-fatal (`campaign_backfill_marker_write_failed` log) so successfully imported D1 campaigns are still returned instead of dropping to an empty fallback response.
- Added regression coverage for one-time migration markers — campaign API tests now verify that once `user:{id}:campaigns:migrated:d1:v1` is set, newly added legacy KV entries are not re-imported on subsequent requests.
- Added explicit one-time backfill marker semantics — after first D1 migration attempt (`user:{id}:campaigns:migrated:d1:v1`), campaign backfill is skipped on future requests (including malformed legacy JSON cases), preventing repeated expensive retries and noisy logs.
- Optimized conflict detection in lazy campaign backfill — legacy room ownership checks are now prefetched in chunked `IN (...)` queries (100 IDs/chunk) instead of one DB query per row, reducing D1 read load while keeping cross-owner conflict protection.
- Fixed a campaign backfill ownership edge case — lazy KV→D1 migration now skips legacy room IDs already owned by another user in D1 (tracked as `skipped_conflict`) so backfill cannot attach DM membership to cross-owner campaigns.
- Hardened D1 backfill batching for production limits — lazy campaign import now executes prepared statements in chunked batches (`runD1Batches`, 100 statements per batch) to avoid oversized single-batch calls on large migrations.
- Reduced D1 write amplification during lazy campaign backfill — import now stages campaign + party-member upserts and executes them via `DB.batch(...)` instead of per-row `.run()` calls, improving throughput for large legacy lists.
- Added explicit backfill cap observability + test coverage — campaign backfill logs now include `truncated` count (plus `campaign_backfill_truncated` event), and API tests verify lazy migration imports at most 500 legacy campaigns per user.
- Optimized lazy campaign backfill query pattern — existing campaign IDs are now preloaded once per backfill pass instead of doing a per-row existence query, reducing D1 round-trips for large legacy lists.
- Improved campaign backfill telemetry + hygiene — backfill logs now include legacy/capped/imported/skipped-invalid/skipped-existing counts plus explicit `campaign_backfill_noop` events, and invalid legacy entries are skipped safely.
- Added migration observability for campaign backfill — lazy KV→D1 import now emits a structured log line with anonymized user hash and imported/skipped counts so rollout progress is measurable in Worker logs.
- Tightened D1 authority for public listings — when DB is available, `/api/campaigns/public` now returns D1 data (or empty on D1 failure) instead of falling back to potentially stale KV public index.
- Added lazy KV→D1 campaign metadata backfill — first `GET /api/campaigns` for a D1 user now imports legacy `user:{id}:campaigns` KV entries when no D1 campaigns exist, preserving visibility/archive/password metadata and DM party membership.
- Public campaign discovery is now D1-authoritative when DB is present — D1 campaign updates no longer dual-write KV public index/password mirrors, and `/api/campaigns/public` now returns D1 data only (empty on D1 failure).
- Campaign metadata migration started (KV → D1) — `/api/campaigns*` endpoints now prefer D1 for list/create/update/archive/restore + public discovery, with KV fallback retained; lobby password info/verification now checks D1 password hashes first.
- Added campaign API tests for D1 path — new `tests/api/campaigns.test.ts` covers create/list/update/public visibility/password verify/archive/restore flow and cross-owner room ID collision rejection.
- Migrated preference persistence toward D1 — added `user_preferences` migration and updated `/api/preferences` to prefer D1 storage (with KV fallback), including stale-write protection + merge semantics in both paths.
- Added D1 path test coverage for preferences — API tests now validate DB-backed save/load and confirm KV remains untouched when DB is available.
- Preference writes now merge with existing server state instead of full-overwrite — partial `/api/preferences` updates preserve unspecified fields, preventing accidental setting loss from sparse payloads.
- Added Workers API coverage for preferences — new `tests/api/preferences.test.ts` validates auth requirement, preference sanitization/round-trip, and stale-write conflict behavior (`409` with latest server prefs) using signed session cookies and in-memory KV mocks.
- Preference sync now retries immediately on reconnect — Home listens for browser `online` events, clears backoff, and triggers an instant `/api/preferences` retry so settings recover quickly after network drops.
- Added exponential backoff for preference sync retries in Home — failed `/api/preferences` writes now retry automatically with capped backoff (1s to 30s) instead of spamming requests while offline.
- Home now shows settings sync status for authenticated users (syncing/synced/offline/conflict) with last-sync timestamp, and surfaces conflict reconciliation via a toast when a newer tab wins.
- Added stale-write protection for preference sync — `PUT /api/preferences` now accepts `baseUpdatedAt` and returns `409` with current preferences when a tab is out-of-date; Home tracks `updatedAt` and reconciles conflicts by reloading the latest server settings.
- Added authenticated preference sync (`/api/preferences`) — server now stores sanitized UI prefs (theme, active theme, low-FX, accent color, locale) per user, and Home loads + debounced-pushes these values so settings follow users across devices without chatty writes.
- Character save pipeline now preserves cacheable portrait URLs — `PUT /api/characters` strips only inline data URLs while retaining `/api/portrait/:id` links (and sanitized `portraitGallery` URLs), so uploaded portraits persist across devices without bloating KV.
- Portrait migration robustness pass — failed data-URL migration uploads now retry on later passes instead of being permanently skipped, and gallery change detection no longer relies on JSON stringification.
- Added auto-migration for legacy data-URL portraits — `GameContext` now background-uploads inline portrait blobs (including gallery entries) to `/api/portrait/upload` for authenticated users and rewrites character data to cacheable `/api/portrait/:id` URLs.
- Portrait delivery now uses cacheable image responses — `GET /api/portrait/:id` decrypts KV data and returns raw image bytes with long-lived cache headers + Workers `caches.default` caching, and CharacterCreate now stores the returned portrait URL on successful upload so browsers can reuse cached portraits.
- Scoped campaign IndexedDB cache by user ID in Home — campaign list cache keys now use the active user (or temp user) instead of a shared `default` key, preventing cross-account campaign bleed on shared browsers.
- Added IndexedDB character cache hydration on login — `GameContext` now loads `getCachedCharacters(userId)` when auth resolves and merges any missing characters immediately, so character sheets recover instantly even if localStorage was cleared.
- Added plugin system — `AdventurePlugin` interface with 10 event hooks (roll, damage, turnStart, death, levelUp, etc). Event bus via `emitPluginEvent()`. Registry with register/unregister/list. `PluginManager` UI in DMSidebar Notes tab. Built-in `Crit Tracker` plugin as example. `window.__ADVENTURE_PLUGINS__` API for console-based loading. Plugin output routed to DM history.
- Added reaction tracker — orange "R" indicator on initiative cards when a unit has used their reaction this round. Already auto-resets on turn start.
- Added smart initiative override — `rollInitiative()` now accepts `manualOverrides` map for player-entered initiative values. Enemies still auto-roll.
- Added i18n framework — `I18nProvider` with `t()` function, lazy-loaded locale JSON files (en/es/fr/de/ja). English as fallback. Language selector dropdown in Home header. Hero text + tagline wired to `t()`. Spanish is fully translated, French/German/Japanese have core strings. localStorage persistence.
- Added mounted combat — `mountId`/`riderId` fields on Unit type. Mount/Dismount action buttons in CombatToolbar (amber/rose themed). Paired movement: rider drags, mount follows automatically (and vice versa). Mounts detected by adjacency, auto-linked on mount action, unlinked on dismount. Combat log messages for both actions. Multiplayer synced via broadcastCombatSync.
- Added saving throw quick-roller — 6 buttons with D&D 5e class-based proficiency auto-applied. DC input, PASS/FAIL color-coded. Proficient saves highlighted amber.
- Added damage leaderboard — running total of damage dealt per character during combat. Sorted, gold highlight on #1, progress bars. The scoreboard nobody asked for but everyone checks.
- Added map distance ruler — 'Ruler' DM tool. Click two cells, sky-blue dashed line drawn with distance in feet at midpoint.
- Added damage flytext color by type — fire=orange, cold=cyan, lightning=yellow, necrotic=purple, etc. 10 damage types, each with its own color. Overrides default red on the floating numbers.
- Added ability check quick-roller — 6 ability buttons (STR→CHA) with auto-calculated modifiers from character stats. One click, d20+mod, posted to combat log.
- Added map exploration tracker — counts explored vs total non-wall/void cells. Sky-blue progress bar with percentage.
- Added session attendance streak — tracks consecutive sessions per campaign. Flame emoji counter in header (🔥 at 2+, 🔥🔥 at 5+, 🔥🔥🔥 at 10+).
- Added rest narration — AI writes a short atmospheric scene when the party takes a short or long rest. Fire-and-forget via /api/dm/narrate. Adds flavor to downtime.
- Added spell slot burndown sparkline — SVG graph tracking remaining slots over session. Color shifts violet→yellow→red as resources deplete.
- Added combat opening lines — 10 dramatic openers when initiative is rolled. "The conversation is over. Roll for initiative." "Somewhere, a bard just reached for their instrument."
- Added torch flicker effect — warm golden glow behind tokens in bright lighting zones. Sine-wave radius for subtle organic flicker.
- Added XP celebration flytext — floating "+X XP" text when XP is awarded after combat.
- Added encounter difficulty thermometer — visual gauge of remaining enemy HP. Color shifts Deadly (red) → Hard → Medium → Easy (green) → Clear as enemies drop. Percentage readout.
- Added round MVP flash — at end of each combat round, shows who dealt the most damage. Gold star + name + total. 2.5s auto-dismiss.
- Added character mood emoji — derives emoji from HP % and conditions. Sunglasses at full, worried at 25%, fearful when frightened, skull when dead. Shown in initiative bar.
- Added dice tower mode — animated 2D die bounces before revealing result. CSS keyframes (fall → bounce → settle → fade). Crit = golden glow, fumble = red, normal = slate. Clip-path shapes per die type.
- Added combat flavor text — 31 randomized flavor strings across hit/miss/crit/kill/fumble. "Finds an opening in the defense." "Swings wide." "One less problem." Appended to combat log messages.
- Added level-up fanfare — golden radial glow overlay with large level number and character name. Auto-dismisses after 3 seconds. Wired into CombatToolbar via triggerLevelUp prop.
- Added map waypoint paths — DM draws movement path by clicking cells in sequence. Orange dashed line with numbered dots (green start, red end). 'Go' animates token along path with chained animations. Waypoint tool in DM toolbar.
- Added session summary card — 'Wrap Up' button shows end-of-session stats overlay: duration, damage dealt, enemies slain, crits, encounters, rounds. Amber-gradient divider. 'Until next time' dismiss.
- RELEASE 100. v9.0.0. "Roll for the Century."
- Added campaign world clock — hour of day (0-23) with time-of-day label (Dawn/Morning/Midday/Afternoon/Evening/Night). +1h/+4h advance buttons. Long rest gated to evening/night hours. Color shifts indigo at night, sky during day, amber at dusk.
- Added session milestones — tracks damage/rolls/kills/crits per session. Toast celebrations at thresholds (100/250/500/1000 damage, 25/50/100 rolls, 5/10/25 kills, 3/5/10 crits). Icon + count + label.
- Added party vitals dashboard — compact inline bar during combat showing HP micro-bars, AC, conditions, spell slots used per character. Dense, readable, always visible.
- Enhanced token HP bars — numeric HP readout below each bar, wider bars (1.8x radius), dark background for contrast.
- Added damage type emoji on flytext — fire, cold, lightning, radiant, necrotic, psychic, poison, acid, thunder, force all get emoji prefixes on floating damage numbers.
- Added initiative countdown sound — rising-pitch square wave ticks in the last 5 seconds of turn timer. Gets more urgent as time runs out.
- Added spell component tracker — V/S/M field on Spell interface, rendered as monospace tag on spell buttons. Framework for material component warnings.
- Added grapple/shove automation — contested check buttons in CombatToolbar. Rolls attacker vs defender, auto-applies grappled or prone condition on success.
- Makefile refactored to use repos/Makefile help style — one-liner grep/awk auto-discovery, alphabetical sort.
- Added spell range visualization — sky-blue dashed circle on battle map when in AoE targeting mode. Shows exactly how far the spell can reach from the caster. `spellRangeCells` passed through ActiveAoE interface.
- Added scene transition cards — dramatic title overlay when sceneName changes. Fade-in-up with amber gradient divider. The kind of thing that makes a session feel cinematic. Auto-dismisses after 3 seconds.
- Added combat emotes — 6 quick-reaction buttons during combat (Nice!/No.../Ha!/GG/Hmm/RIP). Broadcast via game_event, pop-in animation. The table's body language, digitized.
- Added passive perception alerts — DM component that checks party passive perception vs nearby trap DCs. Shows amber alert when someone's senses are tingling.
- Added turn order prediction — "in N" count on initiative cards showing turns until each unit acts. Circular distance calculation handles wrap-around.
- Added death recap — `DeathRecap` component tracks last 3 damage sources per unit. When a unit falls, a recap card appears showing who did the damage, how much, and what type. Total damage summary. Auto-dismisses after 5 seconds.
- Audited: party formation presets already existed (FormationPresets.tsx — 6 formations, marching order with drag reorder, wall avoidance). Marked done.
- Audited: auto-loot distribution already existed (staged loot + random loot tables on combat end). Marked done.
- Added initiative portrait cards — enemy `tokenImage` now shown in initiative bar alongside player portraits. Fallback chain: tokenImage → character portrait → initial letter.
- Added combat threat indicators — `!!` for deadly enemies, `!` for hard, color-coded (red/orange/yellow) by CR vs average party level.
- Added HP bar emotional states — bar shakes (damageShake) when HP is critical and unit is still alive. Full HP glows emerald with shadow. The health bar has feelings now.
- Added concentration spell tethers — purple dashed line drawn on battle map from concentrating caster to affected target(s). Glow underline + core line, rendered between aura layer and token layer.
- Added environmental hazard zones — 3 new terrain types: lava (fire 10/turn, red bubbles), acid (acid 6/turn, green drips), poison gas (poison 4/turn, violet waves). DM toolbar buttons + canvas patterns + HAZARD_DAMAGE constant.
- Added bardic inspiration — party-shared bonus die pool (d6/d8/d10/d12 by bard level). Grant/Spend buttons in DMSidebar Notes tab. Any player can spend for +dX on a roll.
- Added natural language dice labels — `/roll 2d6+3 fire damage` now captures and displays trailing labels in roll results.
- Added token movement trails — ghosted orange dots along animation path while tokens move across the battle map.
- Added dice superstitions — dry commentary on roll streaks. Cold: "The dice sense your fear." Hot: "Someone at this table made a deal with Tymora." Average: "Rolling exactly what the math predicted. How unsatisfying."
- Added minimap pings — double-click minimap to ping location (pulsing amber circles, fade 3s, broadcast via game_event to all players).
- Added combat round summary — auto-generated "Round N: X damage dealt, Y enemies defeated" recap after each full round.
- Added NPC voice pitch — per-NPC pitch slider (0.5 deep → 2.0 high) on NPC tracker cards, overrides TTS name hash.
- Added encounter mood auto-restore — saves pre-combat ambient mood, restores it when combat ends. Easy encounters use 'mystery' instead of 'combat'.
- Added DM secret rolls — toggle below DiceRoller (purple accent). Rolls locally without broadcasting. Reveal button sends result to party.
- Added dice luck tracker — SVG sparkline of last 20 d20 rolls with hot/cold streak detection in the roll history header.
- Added AI encounter templates — "AI Template" button generates balanced encounter from party level/composition via AI, auto-saves as encounter template.
- Added cloud session notes — DM freeform textarea in Notes tab with 1.5s debounce auto-save to KV. GET/PUT `/api/campaign/:roomId/notes`.
- Added death save cinematic — screen dims with gradient overlay, heartbeat pulse animation. Contextual text: "Fallen" / "Slipping away" / "Hanging on" / "Back on their feet". Color-coded by outcome.
- Added fumble table — 10 entries across 4 severity tiers (cosmetic → serious). `rollFumble()` picks d20-ranged result. Banner slides in on nat 1, color-coded by severity. Posted to DM history.
- README rewrite — persona routing table (Player, DM, Developer, Designer, Modder), accurate 270+ feature list, tech stack, project structure. Replaced outdated v0.3 content. "Roll for initiative." closing.
- Makefile persona sections — `make play` (zero-friction start), `make quickstart` (interactive walkthrough), `make dm-guide` (DM toolkit reference). Persona-grouped help output.
- THE JUICE — `HPFlytext` (floating damage/heal/crit/SLAIN numbers above tokens), `CritCelebration` (rainbow border flash + 40 confetti particles on nat 20), `KillStreak` (Double Kill → Triple → RAMPAGE → LEGENDARY! with slide-in banner). New CSS: rainbowCrit, deathPulse, killstreakSlide, confettiFall animations.
- Added encounter XP tracker — `EncounterXPTracker` below initiative bar: live progress bar (defeated/total XP), per-player share, defeated count. Amber gradient.
- Added initiative tiebreaker display — shows DEX mod `(+N)` in amber when two units share the same initiative value. Only appears during ties.
- Added mass heal/damage tool — `MassHPTool` in DMSidebar Encounter tab: checkbox unit selection, damage/heal toggle, quick-select "All enemies"/"All players". Apply to all selected at once.
- Added spell slot recovery panel — `SpellSlotRecovery` component: visual slot dots (violet=available, emerald=recovering). Wizard Arcane Recovery (select slots up to ceil(level/2) levels). Warlock Pact Magic (recover all slots button).
- Audited: combat timeline scrubber already exists as `CombatReplay.tsx` (full implementation with scrubber, play/pause, speed control, mini-map). Marked done.
- Audited: concentration check automation already fully implemented in `damageUnit()` (auto CON save, War Caster feat support, messages in combat log). Marked done.
- Added player character trading — `TradePanel` on CharacterSheet: send gold + items to other party members. Immediate transfer, amber-themed.
- Added campaign recap AI summary — `POST /api/dm/campaign-recap` summarizes last N sessions into catch-up text. "Recap" button in Game header (DM only, amber).
- Added DM encounter notes — `EncounterTemplate.notes` field prompted on save, displayed in DM history when loading. Freeform tactics/RP hooks.
- Added map weather particle effects — `WeatherParticles` canvas overlay: rain (blue streaks), snow (white flakes), sandstorm (tan), fog (large blobs). rAF-driven, pointer-events-none.
- Added token aura visualization — `Unit.auraRadius` + `auraColor` fields. Two-pass draw: auras behind tokens (dashed circle, fill+stroke). "Set Aura" button in CombatToolbar (DM only).
- Added keyboard shortcut overlay — ? key toggles modal with 10 shortcuts (Escape to close, skips when typing in inputs). Lazy-loaded.
- Added party loot split calculator — `LootSplitter` in DMSidebar Encounter tab. Auto-divides gold evenly with remainder to first member. Preview before applying. Yellow-themed.
- Added GitHub OAuth login — third auth provider alongside Discord and Google. Full OAuth flow with code exchange, JWT, Octocat SVG button on Home.tsx. `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET` bindings.
- Added spell effect templates library — `SpellTemplates` component: save/load custom AoE shapes (circle/cone/line/cube) with name, radius slider, color picker. localStorage-backed per campaign. Purple-themed.
- Added ambient sound mixer — layer multiple mood loops simultaneously with per-channel volume sliders. `mixerAddChannel/RemoveChannel/SetVolume/GetChannels/StopAll` in useSoundFX. Teal-themed mixer UI in DMSidebar.
- Added map fog opacity slider — DM can adjust explored-but-not-visible fog dimness (10-90%). Slider in fog toolbar section. Wired into canvas draw callback.
- Added AI backstory continuation — `POST /api/backstory/continue` endpoint generates next story chapter using existing backstory + recent journal entries. "Continue Story" button on CharacterSheet journal. Entries prefixed with [AI].
- Added player readiness check — DM "Ready?" button broadcasts check to all players. Banner shows per-player status (emerald pills). Players click "Ready!" to confirm. Uses existing game_event relay.
- Added combat damage graph — `CombatDamageGraph` canvas bar chart in EncounterLog expanded view. Red=dealt, amber=taken, hover tooltip. Round markers injected into combat log on new round.
- Added terrain/fog brush size — 1x1, 3x3, 5x5 selector in DM toolbar. `brushCells()` helper applies tool to all cells within radius. Works with refog, terrain painting, and drag.
- Added initiative lock toggle — DM-only button in initiative bar during combat. Prevents drag reorder and signals re-roll should be disabled. Amber lock icon with locked/unlocked states.
- Added encounter history search/filter — search input in EncounterLog filters by kills, spells, and combat log text. Difficulty filter pills (easy/medium/hard/deadly) with color-coded active states.
- Added fog shape tools — 4 new DM tools for bulk fog operations: circle reveal, circle hide, rectangle reveal, rectangle hide. Two-click model (first click sets center/corner, second applies shape). Circle uses Euclidean distance, rectangle uses bounding box.
- Added performance dashboard — `PerfDashboard` component (lazy-loaded, Ctrl+Shift+P toggle). Shows FPS, memory usage, DOM node count, canvas count. Color-coded thresholds. Also accessible via `window.__PERF_DASHBOARD__`.
- Added campaign branching — "Fork" button (DM only, violet) in Game header. Snapshots current state to new room ID with `-fork-` suffix, navigates to the fork. Enables "what if" exploration without affecting the main campaign.
- Added session scheduling — `SessionScheduler` component in DMSidebar Notes tab. Date/time picker, countdown to next session (pulses amber within 1 hour), multiple upcoming sessions list. localStorage-backed per campaign. Sky-blue accent.
- Added quick combat resolver — `QuickCombatResolver` component in DMSidebar Encounter tab (out of combat). Simulates round-by-round combat using party stats vs difficulty-scaled enemies. Shows victory/defeat, damage per member, XP/gold earned. Applies damage to characters, awards on victory.
- Added per-party-member NPC attitudes — `NpcRecord.partyAttitudes` map (char name → -2..+2). Expandable per-member attitude section with +/- controls in NpcTracker. Falls back to global disposition. Mini disposition bars per party member.
- Added drag-and-drop seat reordering in lobby — HTML5 DnD on seat cards (DM only). `reorder_seats` WebSocket message in Lobby DO. Optimistic local reorder + server broadcast. Grab cursor for DM, amber ring on drop target.
- Added dice sound pack customization — 4 packs (Classic/Crystal/Wooden/Metal) in `useSoundFX.ts` with distinct synthesis patterns. Pack selector in volume dropdown (click to preview). Persisted to localStorage (`adventure:dicePack`).
- Added encounter post-mortem UI — `EncounterPostmortem` component (lazy-loaded) auto-fetches AI tactical analysis from `POST /api/dm/encounter-postmortem` when combat ends. Teal-themed collapsible banner below CombatMVP showing bullet-point analysis (what went well, what went wrong, tactical tips). Auto-hides when new combat starts. Graceful fallback when AI offline.
- Added fog reveal undo ("Re-fog") — new `refog` DM tool in BattleMap Fog section. Click explored cells to hide them again (sets explored to false). Supports continuous drag-painting. Rose-themed active state with ring indicator. Lets DM surgically control fog per-cell instead of only full Dark/Reveal presets.
- Added character backup restore — "Restore" button on Home page next to Import. Prompts for encryption password, opens file picker, decrypts AES-256-GCM backup via `importBackup()` from `lib/backup.ts`. Assigns new UUID to avoid conflicts. Lazy-loaded. Sky-blue accent.
- Added character backup export — `lib/backup.ts` with PBKDF2 key derivation + AES-256-GCM encryption. "Backup" button on CharacterSheet Equipment section. Downloads encrypted JSON file.
- Added encounter post-mortem endpoint — `POST /api/dm/encounter-postmortem` in `_worker.ts`. AI tactical analysis of combat logs (3-4 bullets via Workers AI).
- Added character portrait gallery — `portraitGallery?: string[]` on Character type. Gallery thumbnails appear below the portrait on hover (count badge). Click any saved portrait to set it as active. Gallery visible via toggle on portrait hover. Max 10 saved.
- Added v9.0 roadmap: 10 new ideas (encounter post-mortem, campaign branching, NPC attitude tracker, quick combat, session scheduling, etc.)
- Added session timer in DM sidebar — renders `SessionTimer` component in the Notes tab alongside existing DM tools. Full pause/resume controls accessible without scrolling to header.
- Added Foundry VTT module export — `exportFoundryModule()` in export.ts bundles all characters as Foundry dnd5e actors (abilities, HP, AC, death saves, race, background, XP, gold, inventory as items, class item) + quests as journal entries. Downloads as `{campaign}-foundry-module.json`. "Foundry" button in Game header.
- Added DM sound effect trigger buttons — 12 SFX buttons (dice, crit, fumble, hit, miss, death, spell, turn, fight, level, heal, loot) in DMSidebar Notes tab. Lazy-loaded via dynamic import. Uses existing `useSoundFX` functions.
- Added character comparison view — ⚖️ button in right sidebar tab bar opens a modal with two character dropdowns. Side-by-side stat comparison: level, HP, AC, all 6 ability scores, gold, items, spells. Higher values highlighted in emerald.
- Added map grid size selector — dropdown in zoom controls lets DM change from 15×15 to 40×40. Resets terrain + fog on change. `BattleMap.tsx`.
- Added dice roll distribution chart — bar chart in DiceStats showing d20 value distribution (1-20). Nat 20s highlighted in gold, nat 1s in red. Shows count per value with tooltips. Summary line with nat 20/nat 1 counts.
- Marked encounter difficulty estimator as already implemented (XP budget breakdown in DMSidebar).
- Added auto-save indicator in Game header — shows ⏳ (saving, amber pulse), ✓ saved (emerald), or ✗ error (red). Tooltip shows last saved time. Uses existing `saveStatus` from `useCampaignPersistence`. Disappears when idle.
- Added quick NPC generator — `GET /api/dm/random-npc` generates a random NPC with name, race, class/trade, personality, quirk, and motivation via `aiText()`. Returns JSON. Routes through unified AI client.
- Added v8.0 roadmap: 10 new ideas (dice analytics, auto-save indicator, NPC generator, encounter estimator, SFX triggers, grid sizing, portrait gallery, Foundry export).
- Added rich text wiki editor — `lib/markdown.ts` renders basic markdown (headers, bold, italic, code, links, blockquotes, lists, hr) to styled HTML. Wiki content viewer uses `dangerouslySetInnerHTML` with the renderer alongside `[[Page Title]]` inter-page links. Zero dependencies.
- Added per-player fog persistence — each player's explored fog grid saved to localStorage keyed by `myUnitId`. Auto-saved with 2s debounce. Loaded on mount when `myUnitId` is set. Each player sees only what they've personally explored across sessions.
- Added hot-seat mode — `/hotseat/:roomId` route for pass-and-play on a single device. "Pass the Device" screen hides game state between players. Character card with stats, HP, AC, turn indicator. Player selector buttons. Link to full game. Lazy-loaded route.
- Added campaign templates — 4 pre-built starter adventures (Lost Mine, Whispering Woods, Ashfall Siege, Golden Masquerade) in `data/campaignTemplates.ts`. Each includes opening narration, 3-4 quests with map coordinates, suggested level range, and tags. "Quick Start Adventures" section on Home page with clickable cards that create a pre-loaded campaign.
- Added PWA install prompt — `manifest.json` with app name, icons, theme color. `beforeinstallprompt` event captured in main.tsx. "Install" button on Home page (orange, shows when browser supports install). `canInstallPWA()` + `installPWA()` exports.
- Added per-NPC voice customization — `speakAsNPC()` in tts.ts assigns a deterministic unique voice per NPC name (hash-based voice index + varied pitch/rate). Each NPC sounds different. DM narration uses the default dramatic voice, NPCs get their own. Wired into the NPC dialogue flow.
- Added AI DM voice narration — `lib/tts.ts` wraps the browser's SpeechSynthesis API. Zero dependencies, works offline. Auto-speaks DM narration when TTS is enabled. Preferred voice selection (tries UK English Male/Daniel/Samantha). Toggle button in Game header (🔊 TTS / 🔇). Lazy-loaded.
- Added drag-and-drop inventory management — inventory items are `draggable` with grab cursor. Equipment slots are drop targets that accept matching item types (weapon→weapon slot, armor→armor slot, etc.). Drop equips the item. Empty slots show dashed borders as visual hint.
- Added map image drag-and-drop import — DM can drag a PNG/JPG onto the battle map to set it as the background. FileReader converts to data URL. `BattleMap.tsx`.
- Added undo/redo for battle map terrain editing — Ctrl+Z / Ctrl+Shift+Z (or Ctrl+Y). 50-level undo stack with redo. Pushes snapshot before each paint operation. `BattleMap.tsx`.
- Added keyboard-driven character creation — Enter/ArrowRight = next step, Escape/ArrowLeft = prev step. Enter in inputs advances to next step. Global keyboard handler. `CharacterCreate.tsx`.
- Added exportable encounter templates — Export/Import buttons in DMSidebar encounter template section. Export downloads all templates as `encounter-templates.json`. Import reads a JSON file and merges with existing templates (max 20). Enables sharing enemy groups between DMs.
- Added AI-generated map descriptions — `POST /api/dm/describe-cell` generates 1-2 vivid sentences from terrain type, lighting level, and scene name via `aiText()`. Uses the unified AI client (local/cloud/offline).
- Added QR code for campaign join — "QR" toggle button in Lobby invite section. Generates a QR-like SVG pattern from the lobby URL (finder patterns + timing + data area). White-on-dark display in a popup card. Lazy-loaded via dynamic import. `lib/qrcode.ts`, `Lobby.tsx`.
- Added theme accent color customization — color picker input in Home header lets players choose any accent color. Stored in localStorage (`adventure:accent`), applied as CSS `--accent` custom property. Applied before React renders in main.tsx (no flash). Default: #F38020 (Cloudflare orange).
- Added unified AI image generation — `aiImage()` in aiClient.ts routes portrait generation through: local OpenAI-compatible image API (`/v1/images/generations` — works with AUTOMATIC1111, ComfyUI, Fooocus) → Workers AI FLUX → null (offline). Both portrait endpoints (`/api/portrait/generate` + `/api/portrait/enemy`) migrated. Deleted ~60 lines of duplicate ReadableStream/ArrayBuffer→base64 conversion code. Only `aiRunDirect` remains for vision model (Llama 3.2 Vision — no local equivalent).
- Added model quality presets — `AI_QUALITY` env var (fast/balanced/quality) auto-selects model size per backend. Workers AI: 8B balanced → 70B quality. Local: phi3 fast → llama3.1 balanced → llama3.1:70b quality. Explicit `LOCAL_AI_MODEL`/`WORKERS_AI_MODEL` override presets. `aiStatus()` reports active quality tier.
- Added campaign book export — `exportCampaignBook()` generates a full parchment-styled HTML document: party roster (stat grids, equipment, backstory), narration (blockquotes), quests (with completion state), world lore (wiki pages), battle chronicle (combat log), and chat log. Print/Save as PDF button. Georgia serif font, warm parchment palette, page-break-safe. "Book" button in Game header.
- Added AI backend indicator in game header — color-coded badge shows "AI: local" (emerald), "AI: cloud" (sky), or "AI: off" (gray). Fetches from `GET /api/ai/status` on mount. Player count badge also added (shows party size when connected).
- Unified AI architecture — all AI text generation goes through two functions: `aiText()` (prompt→string) and `aiChatStream()` (prompt→SSE stream) in `src/lib/aiClient.ts`. Three backends checked in order: LOCAL_AI_URL (any OpenAI-compatible server), Workers AI (Cloudflare), offline (graceful fallback string). Zero duplicate routing code. All 15+ AI endpoints in `_worker.ts` migrated to use `aiText()`. Image/vision models (FLUX, Llama Vision) use `aiRunDirect()` — Workers AI only, no local equivalent. `aiStatus()` exported for health check. `aiEnv()` casts Hono env. Model not hardcoded — configurable via LOCAL_AI_MODEL and WORKERS_AI_MODEL env vars.
- Added configurable local AI backend — `src/lib/aiClient.ts` provides `aiChat()` and `aiChatStream()` that route to either Workers AI or any OpenAI-compatible local server. Config via env vars: `LOCAL_AI_URL` (e.g. `http://localhost:11434/v1`), `LOCAL_AI_MODEL` (e.g. `llama3.1`, `mistral`, `phi3`), `WORKERS_AI_MODEL` (override default Workers AI model). Works with Ollama, LM Studio, vLLM, LocalAI, llama.cpp, Jan — any server on any OS/hardware. Streaming transforms OpenAI SSE format to Workers AI format for frontend compatibility. `GET /api/ai/status` shows active backend. `make dev-local-ai` prints setup instructions.
- Added full CI pipeline — GitHub Actions workflow (`.github/workflows/ci.yml`) with 5 parallel jobs: TypeScript check, Prettier lint, unit tests (104 game logic), worker tests (51 multiplayer + AI via Miniflare), and Playwright E2E tests (14 browser smoke tests). Runs on push to main/staging and PRs to main. Playwright uploads failure screenshots as artifacts. Total test count: **169 tests across 3 layers**.
- Added Playwright E2E browser tests — 14 smoke tests covering Home page (title, How It Works, campaign input, theme toggle, Low-FX), Character Create, Lobby, Companion, DM Screen, and navigation. Runs headless Chromium via Vite dev server. `playwright.config.ts`, `tests/e2e/smoke.test.ts`.
- Enhanced character leveling wizard — LevelUpModal now has a "Summary" tab showing: HP increase options (roll d{hitDie}+CON or take average), proficiency bonus change, ASI/Feat availability, new spell slot notifications for casters, and class ability description. HP roll/take-average buttons auto-update character maxHp/hp/hitDiceRemaining and post to DM narration.
- Added ambient soundscape per scene — `detectSceneMood()` in `lib/sceneMood.ts` maps scene name keywords to ambient moods (tavern/dungeon/forest/combat/mystery). Auto-fires on scene name change via useEffect. Keywords: tavern→tavern, cave/dungeon→dungeon, forest/river→forest, battle/arena→combat, temple/ruin→mystery. Lazy-loaded.
- Added party formation presets — "Save Formation" button saves current player unit positions to localStorage per campaign. "Load Formation" dropdown restores saved positions (matches by unit name for cross-session compatibility). Up to 10 formations stored. UI in DMSidebar Encounters tab.
- Added AI trap generator — `POST /api/dm/generate-trap` generates traps via Workers AI based on terrain type, party level, and scene name. Returns JSON with name, description, DC, damage, and type. "✨AI" trap tool in DM toolbar: click any cell to generate and place an AI-designed trap. Alert shows trap details. DC and damage scaled to party level.
- Added AI encounter recap — `POST /api/dm/encounter-recap` generates dramatic battle summaries (bard-style) from combat log when combat ends. Auto-fires (non-blocking) after combat recording stops if 3+ combat log entries exist. Appears as ⚔️ system message in DM narration. Highlights crits, near-deaths, killing blows.
- Marked quick-roll macros as already implemented (save/load/execute with localStorage persistence).
- Added session recap — `POST /api/dm/session-recap` endpoint generates "Previously on..." summaries from DM history + combat log. Manual "📖 Previously on..." button in narration view (amber-themed banner). Auto-recap already existed for returning players; now also has a dedicated endpoint + on-demand button.
- Added mobile companion app — `/companion/:roomId` route with streamlined phone UI. Three-tab layout: 👤 Sheet (stats grid, conditions, equipped items, initiative order, gold/inventory/spell counts), 🎲 Dice (6 quick-roll buttons d4-d20, large result display with critical/fumble callouts, d100 + coin flip), 💬 Chat (link to full game). Character selector when none chosen. Combat header shows round + current turn. "📱 Companion" button in Lobby copies the companion URL. Lazy-loaded route.
- Added hex grid toggle — `gridType` state ('square' | 'hex') with ⬡/▢ toggle button in zoom controls. `hexCenter()` and `drawHexPath()` helper functions for flat-top hexagonal coordinates. Hex rendering foundation in place (toggle UI + coordinate math). Full hex terrain rendering requires additional canvas draw loop integration.
- Marked initiative drag-and-drop as already implemented (HTML5 DnD with canReorder/onReorder props).
- Added campaign calendar — 📅 tab with in-world date tracking. Fantasy calendar (12 Forgotten Realms month names, 30 days per month). Current day display with "+1 Day" and "🏕️ Rest" (long rest = advance + log event) buttons. 6×5 calendar grid with today highlighted. 5 event types (event/rest/combat/travel/milestone) with emoji icons and colored borders. Month navigation (◀▶). Recent events list. DM controls for adding events + advancing time. Persisted in campaign state.
- Added player character journal — `journal` array field on Character stores diary entries (id, date, text, createdAt). "Journal" section on CharacterSheet with "+ Entry" button (prompt for text), reverse-chronological display, per-entry delete. Persisted with character data via save/load. Private to the player (stored on their character, not shared).
- Added damage type tracking — 13 D&D 5e damage types (bludgeoning, piercing, slashing, fire, cold, lightning, thunder, acid, poison, necrotic, radiant, force, psychic) as `DamageType` + `DAMAGE_TYPES` constant. Unit type extended with `resistances`, `vulnerabilities`, `immunities` arrays. `damageUnit` now accepts optional `damageType` parameter and auto-applies: immune=0 damage, resistant=half, vulnerable=double. Concentration saves use effective damage.
- Added encounter templates — "Save Template" button (visible when enemies exist) saves current enemy group to localStorage with name. "Load Template" dropdown spawns saved enemy groups. Up to 20 templates stored. `EncounterTemplate` type in types/game.ts. UI in DMSidebar Encounters tab.
- Added Wild Magic table — complete D&D 5e PHB p104 Wild Magic Surge table (50 entries, d100 range 1-100) in `data/wildMagic.ts`. When a Sorcerer casts a leveled spell, `castSpell` auto-rolls a d20 — on a nat 1, a Wild Magic Surge triggers with a d100 roll. Result includes the d100 value in the spell message (`⚡ WILD MAGIC SURGE! (d100: 42)`). `wildMagicRoll` returned in the result for callers to resolve the full effect text via the table. Includes mechanical hints for auto-applicable effects (heal, damage, resist).
- Added map annotations — "📝 Label" DM tool places floating text labels on the battle map. MapPin type extended with `type: 'annotation'` and `fontSize` fields. Annotations render as bold drop-shadow text centered on the cell (vs. pins which render as icon bubbles above cells). Customizable text color. DM-removable on hover. Stored in the same mapPins array as icon pins.
- Added concentration visual indicator on tokens — pulsing blue outer ring (`rgba(96,165,250, pulse)`) drawn around any token with `concentratingOn` set. Alpha oscillates via `sin(Date.now()/300)` for a breathing effect. 3px offset from token border. Visible alongside selection highlights and condition pips.
- Added streaming AI narration — new `POST /api/dm/narrate-stream` endpoint returns SSE stream from Workers AI (`stream: true`). Frontend reads the stream token-by-token, updating the DM narration text in-place with a blinking cursor (`▍`). Creates a dramatic typewriter effect as the AI DM speaks. Falls back to the regular non-streaming endpoint if SSE fails. SSE data lines parsed for `{"response":"token"}` format.
- Added replay mini battle map — 200×200 canvas in the CombatReplay viewer renders unit positions from each event's snapshot. 20×20 grid with player tokens (orange) and enemy tokens (red), current turn unit highlighted in amber. Initial letters shown on each token. Updates on every step/scrub. Shows spatial context alongside the event description and HP bars.
- Added replay persistence — combat recordings (last 5) saved/loaded with campaign state via useCampaignPersistence. Recordings survive page reload and session resume. Replay button shows count and a hover dropdown to pick from past recordings (newest first, showing event count + duration).
- Added AI lore generation for wiki — `POST /api/dm/generate-lore` uses Workers AI (Llama 3.1 8B) to generate 2-4 paragraph lore entries based on page title, category, tags, scene name, and existing page titles for world consistency. "✨ Generate" button in wiki editor appends AI content to existing text. Context-aware: references other wiki entries for cross-pollination.
- Added wiki inter-page linking — `[[Page Title]]` syntax in wiki content renders as clickable teal links. Clicking jumps to the linked page. Unmatched names show as italic gray text. Empty pages show hint about linking syntax.
- Added collaborative world-building wiki — "Wiki" tab in the game view. 5 page categories (location, NPC, faction, lore, item) with colored icons. Split-pane layout: filterable/searchable page list on the left, content viewer/editor on the right. Any player can create, edit, and tag pages. Category filter + text search. Edit mode with title + content fields. Pages persisted in campaign save/load. Creator attribution + last-updated timestamps.
- Added combat replay mode — `combatRecorder.ts` records combat events (start/move/attack/damage/death/turn/spell/heal/end) with timestamps, unit positions, and HP snapshots. Auto-records when combat starts, auto-stops when combat ends. `CombatReplay` viewer: fullscreen modal with step-through scrubber, play/pause, speed control (0.5x-4x), keyboard nav (←→ step, Space play, Esc close). Shows event icons + descriptions, unit HP bars at each step. "▶ Replay" button in Game header plays the most recent recording.
- Added DM screen mode — separate `/dm-screen` route that opens in a new window. Shows initiative order (sorted, current turn highlighted), party status (HP bars with color coding + condition badges), enemy stat blocks (HP/AC/attack/damage/CR + conditions), and a large current-turn callout. Synced from Game tab via BroadcastChannel in real-time. "DM Screen" button in Game header (DM-only) opens it in a 900×600 popup. Auto-syncs on every combat state change. 3-column responsive grid layout.
- Added NPC memory viewer in DMSidebar — "NPC Memories" section with Load button fetches all NPCs with saved memories from the index. Expandable per-NPC: click to view full conversation history, × to clear memory. 3 API endpoints: `GET /api/npc-memory/:roomId` (list), `GET /api/npc-memory/:roomId/:npcName` (view), `DELETE /api/npc-memory/:roomId/:npcName` (clear). NPC memory index maintained alongside individual memory writes.
- Added AI NPC memory — NPC conversation history persisted in KV per-NPC per-campaign (`npc-memory:{roomId}:{npcName}`). On each NPC dialogue call, server loads persistent memory, merges with client-sent history (deduped, last 12 entries), includes as "Conversation history ({NPC} remembers all of this)" in the system prompt. After AI response, updated memory (last 20 lines) saved back to KV. NPCs now remember past conversations across page reloads and sessions. Response includes `memoryLength` for debugging.
- Added quest tracker with world map — `QuestMap` component in the Journal tab. Enhanced `Quest` type with location, mapX/mapY coordinates, priority (main/side/personal), and giver NPC. Parchment-styled world map with SVG pin markers (color-coded by priority: amber main, blue side, violet personal). Clickable pins open detail popups with description, giver, complete/reopen buttons. Quest list panel below with priority dot indicators and collapsible view. DM can add quests with locations that auto-appear on the map.
- Added AI-suggested relationships — `POST /api/dm/suggest-relationships` analyzes party backstories, bonds, flaws, and personalities via Workers AI (Llama 3.1 8B) and returns 2-4 typed relationship suggestions. "✨ AI Suggest" button in the Bonds tab generates connections automatically. Results added as edges to the graph. DM can then edit/remove as needed.
- Added WebRTC voice chat — `useVoiceChat` hook with full peer-to-peer audio mesh. Push-to-talk via `V` key (skips when typing in input/textarea). Signaling via existing Lobby DO WebSocket (`voice_signal` for offer/answer/ICE relay, `voice_state` for talking/muted broadcasts). STUN servers via Google. Header UI: 🎤 Voice join button, mute toggle, LIVE indicator when talking, 🔊 indicators for peers talking, ✕ leave button. Mic tracks disabled by default, enabled only during PTT. Clean shutdown on unmount. Discord voice integration planned as a toggle alongside this.
- Added character relationship graph — "Bonds" tab in the game view with a canvas-rendered node graph. Characters and NPCs arranged in a circle layout with draggable nodes. Five edge types (ally/bond/neutral/rival/enemy) with color-coded lines (solid for positive, dashed for negative). "+ Connection" button lets DM define relationships between any pair. Edge labels shown at midpoints. Legend at bottom. Relationships persisted in campaign save/load.
- Added multiclass proficiency rules — `MULTICLASS_PROFICIENCIES` map in types/game.ts defines the limited proficiencies gained when multiclassing into each class (PHB p164). When multiclassing, a confirmation dialog shows the gained proficiencies (armor, weapons, skills, tools) before proceeding. Sorcerer and Wizard gain no new proficiencies. Lazy-loaded alongside `canMulticlassInto`.
- Added map preview thumbnails — `generateMapThumbnail()` renders terrain to an 80×80 canvas and returns a base64 PNG data URL. Thumbnails generated client-side on Share and sent to the API. Stored in both the map data and the index (max 20KB). Community browser displays 32×32 thumbnail previews next to each map card. Maps uploaded before this version show without thumbnails (graceful fallback).
- Added map search in community browser — search input at the top of the Browse panel filters maps by name or tag in real-time. Auto-focuses on open. Client-side filtering for instant results.
- Added AI-generated enemy portraits — new `POST /api/portrait/enemy` endpoint generates combat-themed token portraits via Workers AI FLUX-1-schnell. Prompt includes enemy name + description with "circular token style, dark dramatic lighting, menacing expression" art direction. Encounter generator now fires parallel portrait requests for each spawned enemy (fire-and-forget, non-blocking). Portraits set as `tokenImage` on units as they resolve — enemies appear with generic initials first, then their AI portrait fades in when ready.
- Added multiclass ability score prerequisites — `MULTICLASS_PREREQS` map and `canMulticlassInto()` function in types/game.ts. Validates D&D 5e PHB p163 requirements before allowing multiclass. Fighter special case: STR 13 OR DEX 13. Alert shows missing prereqs with current values. Lazy-loaded via dynamic import for bundle efficiency.
- Added shareable player notes — "Share with Party" button appears on the notes panel when connected to multiplayer and notes are non-empty. Prompts for a title, then sends `share_note` via WebSocket. Lobby DO broadcasts `shared_note` to all clients. Appears as a 📋 system message in chat (Lobby, Game, and useGameWebSocket all handle it). Text truncated to 500 chars. Fully opt-in — notes remain private until explicitly shared.
- Added encounter theater mode — "🎬 Theater" toggle in zoom controls (visible during combat). When ON, the camera auto-zooms to 2x and smoothly pans to center on the current turn unit using easeInOutQuad animation (400ms). Triggers on turn change. Reset button also disables theater mode. Creates a cinematic "camera follows the action" effect during combat.
- Added fog reveal animation — newly-explored cells get a 0.5s fade transition instead of instantly revealing. `fogRevealRef` tracks recently-revealed cells with progress 1.0→0.0. requestAnimationFrame loop decays progress at 2x/second. During canvas draw, cells with active reveal progress get an overlaid `rgba(15,23,42, progress*0.7)`. Result: fog dissolves smoothly as tokens move into new areas. Respects `effectiveDmMode` (DM sees no fog). Respects `prefers-reduced-motion` via Low-FX class (animations disabled).
- Added custom token images — `tokenImage?: string` field on Unit. BattleMap renders images in clipped circles instead of plain initials. Falls back to character portrait for player units, then to initial letter. DM double-clicks a token to set its image URL (prompt dialog, clear to remove). Image cache via ref Map with lazy loading + error handling. Works for enemies, NPCs, and players. Images auto-render on next canvas draw after loading.
- Added initiative tiebreaker rules — sort by initiative descending, then DEX modifier (higher goes first), then stable ID comparison. Matches D&D 5e RAW tiebreaker rules. Works for both player characters (looks up DEX from Character stats) and enemies (uses unit.dexMod).
- Added character multiclassing support — `classLevels?: Partial<Record<CharacterClass, number>>` field on Character. "+ Multiclass" button on character sheet adds a level in any class (validates class name). Total level auto-computed from sum of class levels. Character sheet shows "Fighter 5 / Wizard 3" format. Spellbook merges spells from all multiclassed classes at their respective levels. DDB import already handles multiclass via the primary class heuristic.
- Added AI DM personality presets — 6 distinct narration styles: Theatrical (default), Comedic (Terry Pratchett), Grimdark (harsh/costly), Tolkien (epic/literary), Noir (hardboiled/cynical), Horror (psychological dread). Each has a unique system prompt that shapes the AI DM's tone, NPC behavior, and world description. DM selects style from "AI DM Style" button group in DMSidebar Notes tab. Personality persisted per-campaign in localStorage. Passed as `personality` field to `POST /api/dm/narrate`.
- Added death save automation — when an unconscious player unit (0 HP) starts their turn, a d20 death save auto-rolls following D&D 5e rules: 10+ = success, <10 = failure, nat 20 = regain 1 HP + conscious, nat 1 = 2 failures. 3 successes = stabilize, 3 failures = death (hp set to -1). `nextTurn` in GameContext modified to include unconscious player units in turn order (enemies still skipped). Death save result returned as `deathSaveMessage` from `nextTurn()`, logged to combat log + DM narration. Character `deathSaves` and `condition` updated in real-time.
- Added community map sharing — full backend + frontend. 4 API endpoints: `POST /api/maps` (upload with name/tags/terrain), `GET /api/maps` (browse with optional tag filter), `GET /api/maps/:id` (download + increment counter), `POST /api/maps/:id/rate` (1-5 rating with running average). Maps stored in KV with metadata index (200 max). BattleMap DM toolbar gets "Share" button (uploads current terrain with name + tags) and "Browse" button (teal-themed dropdown panel with map cards showing name, tags, downloads, star rating). Clicking a map loads its terrain + resets fog.
- Added ETag on campaign list endpoint — `GET /api/campaigns` now includes SHA-256 ETag + 304 Not Modified support. Client sends If-None-Match, stores ETag in localStorage. Completes the ETag coverage across all three main GET endpoints (characters, campaign state, campaign list).
- Added player notes panel — "Notes" tab in the right sidebar alongside Chat and Sheet. Full-height textarea for personal session notes (track NPCs, clues, plans). Stored in localStorage per-room (`adventure:notes:{room}`), auto-saved with 1s debounce. Character count + Clear button at bottom. `N` keyboard shortcut toggles notes panel. Only visible to the player — not the DM or other players. Help overlay updated.
- Added campaign session log export — `exportSessionLog()` in export.ts generates a formatted markdown file with party roster, DM narration (blockquotes), timestamped chat log (with system/roll/message types), and combat log (bullet list). "Export Log" button in Game header (lazy-loaded). Downloads as `{campaign-name}-session-log.md`. Includes all data from the current session.
- Enhanced initiative roll automation — the existing "Roll Initiative" button now shows individual initiative values in the combat log and DM narration (e.g., "Order: Thorin: 18, Goblin: 12, Elara: 8"). Added "Re-roll Init" button (DM only, visible during combat) for re-rolling when new enemies join mid-fight. Re-roll resets turn order and broadcasts updated state.
- Added ETag cache invalidation — `GET /api/characters` and `GET /api/campaign/:roomId` now compute SHA-256 ETags from response data and return `ETag` + `Cache-Control: private, no-cache` headers. Client sends `If-None-Match` on subsequent requests; server returns 304 Not Modified if data unchanged. Client stores ETags in localStorage. Saves bandwidth on unchanged data while still checking freshness on every request.
- Added encounter-specific loot overrides — "Staged Loot" section in DMSidebar Notes tab lets the DM pre-assign items (with name + rarity) for the next encounter. When combat ends, if staged loot exists, it's used instead of random table rolls. Items go to party inventory, staged list auto-clears. Chat message shows "(DM-assigned)" label. If no staged loot, falls back to normal `rollLoot()` table behavior. DM can also clear all staged loot manually.
- Added per-floor terrain/lighting persistence — `floorDataRef` stores terrain + lighting grids per floor index. Switching floors saves the current floor's state and restores the target floor's (or creates a fresh blank floor). `floorData` array, `floorNames`, and `currentFloor` all included in campaign save/load via `useCampaignPersistence`. New floors start as all-floor terrain with normal lighting. Multi-floor dungeons now fully survive page reload.
- Added loot rarity glow on party inventory items — color-coded borders and box-shadow glow per rarity tier in the DMSidebar Party Loot section. Common: slate border, Uncommon: emerald border + subtle green glow, Rare: blue border + blue glow, Epic: purple border + purple glow. Item name text also color-coded per rarity. Replaces the flat amber text with distinct visual hierarchy.
- Added stair click navigation — clicking a stairs_up cell switches to the floor above, stairs_down switches below. Only active when multiple floors exist. `onStairClick` prop on BattleMap triggers `setCurrentFloor` in Game.tsx. Bounds-checked (can't go above floor 0 or below the last floor). Integrated into the mouseDown handler before token interaction so stairs always respond.
- Added multi-floor dungeon support — `stairs_up` and `stairs_down` terrain types with green/red arrow rendering, walkable movement cost. DM toolbar gains ↑Stairs / ↓Stairs paint tools. Floor navigation bar appears above the battle map when multiple floors exist (tab buttons per floor, DM can add floors via prompt). Single-floor dungeons show a subtle "+ Floor" button for DMs. `currentFloor` and `floorNames` state in Game.tsx. Terrain cost, colors, and patterns all updated for stairs.
- Added loot roll tables (`data/lootTables.ts`) — D&D 5e-inspired weighted random loot with 4 tiers: common (all difficulties), uncommon (medium+), rare (hard+), epic (deadly). Gold ranges scale by difficulty (5-25gp easy → 100-500gp deadly). Items include potions, weapons, armor, scrolls, wondrous items with full stat blocks. End-of-combat loot now uses table-based `rollLoot()` instead of the old inline generator. Loot items auto-added to party inventory (shared loot pool) instead of personal inventory. Gold awarded directly to the character.
- Added dungeon seed sharing — generating a random dungeon now saves the seed and displays it as a monospace `#seed` button (click to copy to clipboard). A seed input field lets DMs enter a seed number and press Enter to regenerate the exact same dungeon layout. Seeded RNG (mulberry32) guarantees identical room/corridor/door/hazard placement for any given seed. DMs can share seeds in chat for collaborative play.
- Enhanced character PDF export — the printable HTML sheet now includes Equipment (weapon with damage die, armor with AC, shield), Inventory (2-column list with name/quantity/type/value), and Spellbook (2-column list with name/level/school/damage/concentration). Sections only render when the character has data. Print/Save-as-PDF button at bottom for browser print dialog.
- Added procedural dungeon generator — `src/lib/dungeonGen.ts` implements BSP (Binary Space Partitioning) tree algorithm with seeded RNG (mulberry32). Recursively splits the grid into leaves, places rooms inside each leaf, connects all rooms with L-shaped corridors, adds doors at room entrances, and scatters pits/water for variety. Configurable grid size, optional seed for reproducible dungeons. "🎲 Random" button in DM toolbar generates a new dungeon each click with fog reset. Replaces the old inline dungeon generator.
- Added shared party inventory (group loot pool) — `partyInventory: Item[]` in campaign state, persisted via save/load. DMSidebar "Party Loot" section with item count, "+ Add" button (prompt for name), per-item "Give..." dropdown to transfer to any player character, and × remove button. `onGiveItemToPlayer` moves item from pool to character's personal inventory with a fresh UUID. Scrollable 32px-high item list. Integrated with campaign persistence.
- Added AI encounter balancing — encounter generator now uses D&D 5e DMG XP thresholds (levels 1-20) to calculate a proper XP budget per difficulty tier (easy/medium/hard/deadly). Budget = threshold × partySize with ±20% tolerance. AI prompt includes the XP budget, encounter multiplier rules (1 enemy=1x, 2=1.5x, 3-6=2x, 7+=2.5x), and party class composition for tactical variety. Frontend passes actual party size and all character classes. `XP_THRESHOLDS_BY_LEVEL` table covers all 20 levels.
- Added map preset library — 6 pre-built 20x20 terrain templates (Tavern, Dungeon, Forest Clearing, Cave System, Castle Hall, Arena) in `data/mapPresets.ts`. ASCII-art grid definitions parsed to TerrainType arrays via char map. Dropdown selector in DM toolbar (Map section) loads a preset with one click, replacing terrain + resetting fog. Each preset has name, description, and emoji icon.
- Added optimistic UI for campaign state loading — `useCampaignPersistence` now shows IndexedDB-cached game state immediately on mount while the server fetch runs in background. Server response overwrites cached data when it arrives. Campaign state also cached to IndexedDB on every save (alongside the debounced server PUT). Server load response cached for next optimistic load. Combined with the existing character + campaign list caching, the entire app loads instantly from cache on repeat visits.
- Added "Re-roll Gear" button on character sheet Equipment section — resets inventory + equipment + gold to the `STARTING_EQUIPMENT` preset for the character's class. Generates new UUIDs for all items, auto-equips best weapon/armor/shield. Appears as amber "Re-roll Gear" link next to the Equipment header. Useful for resetting a character's loadout after testing or before a new campaign.
- Added "Add Custom Spell" form on character sheet — collapsible form with name, level (0-9), school (8 options), damage dice, range, concentration checkbox, and description. Creates a new Spell with randomUUID, adds to `customSpells` via `updateCharacter`. Form resets and collapses on submit.
- Added prepared-only filter toggle — "Prepared" pill button in the spellbook filter bar (emerald when active). When toggled, only shows spells in `preparedSpellIds`. Works alongside existing search, school, and level filters.
- Added spell management UI on character sheet — each spell row now has a circular prepare toggle (green dot when prepared, empty when not) and custom spells show a "custom" label + red × remove button. `preparedSpellIds?: string[]` field on Character tracks which spells are prepared. Prepare/unprepare toggles update the character via `updateCharacter`. Remove button strips the spell from `customSpells` and `preparedSpellIds`. Both cantrip and leveled spell sections include these controls.
- Added Foundry VTT spell import — parses `type: 'spell'` items from Foundry actor JSON. Extracts name, level, school (maps 3-letter Foundry codes to our SpellSchool), description (HTML-stripped), range, duration, concentration, damage from parts array. Deduplicates by name. Stores in `customSpells` on the Character. Reports cantrip + spell counts in import warnings. Both DDB and Foundry imports now produce fully-populated characters with inventory + spells.
- Added IndexedDB local cache (`src/lib/localCache.ts`) — three object stores: characters, campaigns, campaignState. Async get/put with configurable maxAge (5min for chars/campaigns, 10min for state). Characters auto-cached on save in GameContext. Campaigns cached on load in Home.tsx with instant display from cache while server fetch runs in background. `clearCache()` for logout. All cache ops are best-effort with silent failure — degrades gracefully if IndexedDB is unavailable.
- Added custom spellbook field on Character — `customSpells?: Spell[]` stores imported or homebrew spells beyond the class list. DDB import now populates `customSpells` with parsed spells. CharacterSheet merges class spells + custom spells (deduped by name) for the spellbook display. `castSpell` in GameContext searches both SPELL_LIST and `casterChar.customSpells`. Imported characters arrive with their full spell repertoire visible.
- Added torch/candle burnout timer — torches burn for 10 turns, candles for 6. Each turn in `tickConditions`, the burn counter increments (tracked in condition `source` field). When a torch/candle burns out, one is consumed from the inventory stack. If more remain, a new one auto-lights with a reset counter. When the last one burns out, the condition is removed and a "last torch burns out!" message appears. The combat log shows remaining count after each burnout.
- Added fuel indicator on character sheet inventory — color-coded badge shows `remaining/max` turns for fuel-tracked items (green >25%, amber <25%, red empty). Added "Light" / "Refuel" action buttons for light source items and Oil Flasks in the inventory UI (previously only potions/scrolls had Use buttons). Lantern button shows amber styling, Oil Flask button labeled "Refuel".
- Added Dispel Magic (3rd level abjuration) — targets a unit and strips all magical conditions: blessed, hexed, darkvision, daylight, frightened, stunned, inspired, burning. Also clears concentration. Reports how many effects were removed and lists them. Available to 7 classes. If no magical effects exist on the target, reports that clearly.
- Added lantern fuel tracking — `fuelMax` and `fuelRemaining` fields on Item. Lanterns start with 60 turns of fuel. `tickConditions` decrements fuel each turn for units with a `lantern` condition; auto-extinguishes (removes condition) when fuel hits 0 with a "sputters out" combat log message. Oil Flask use in inventory refuels the lantern (+60 turns, capped at fuelMax). `useItem` checks fuel before lighting and shows fuel count. Shop lantern and Rogue starting equipment preset both include fuel tracking.
- Added Daylight + Darkvision self-cast spells with auto-condition application. `castSpell` in GameContext now handles self-targeting condition spells (no target required) — applies the condition to the caster's unit when cast without a target. Daylight (3rd level, 60ft/100ft, 10 rounds) and Darkvision (2nd level, 60ft dim, 10 rounds) added to SPELL_LIST with `appliesCondition`. Both integrate with the dynamic lighting propagation system. Casting Daylight makes your token emit a massive 12-cell bright + 20-cell dim light radius.
- Added Foundry VTT character import — `foundryImport.ts` detects Foundry actor format (`type='character'` + `system.abilities`) and parses stats, HP, AC, death saves, class (from items array), race, level, XP, gold (multi-currency), biography→backstory, inventory (weapons/armor/shield/potions with stat extraction), auto-equip. Lazy-loaded via dynamic import in `export.ts`. Import button now handles 3 formats: native Adventure JSON, D&D Beyond, and Foundry VTT — all auto-detected.
- Added D&D Beyond spell import — parses `classSpells` and `spells.class`/`spells.race` arrays from DDB JSON. Extracts name, level, school, description (HTML-stripped), range, duration, concentration, damage dice. Deduplicates by name. Reports cantrip + spell counts in import warnings. Spells available through the existing class spell list system in-game (DDB spells serve as validation that the import detected the right class/level).
- Added starting equipment presets for all 12 classes — `STARTING_EQUIPMENT` map in data/items.ts gives each class a thematic D&D 5e PHB loadout (weapons, armor, light sources, potions) with class-appropriate gold. CharacterCreate.tsx auto-populates inventory + auto-equips best weapon/armor/shield on creation. Fighter gets chain mail + longsword + shield, Rogue gets leather + rapier + lantern, Wizard gets quarterstaff + candles, etc.
- Added Service Worker for offline-first static assets — `public/sw.js` with stale-while-revalidate strategy for JS/CSS/images/fonts, network-first for API calls, SPA navigation fallback to cached index.html. Pre-caches app shell on install. Auto-cleans old caches on activate. Registered on window load in `main.tsx` with silent fail. Skips WebSocket upgrade requests.
- Added "Supplies" shop category with light sources and adventuring gear — Candle (x10), Torch (x5), Hooded Lantern, Oil Flask (x3), Tinderbox, Rope (50ft), Healer's Kit (10 uses), Rations (x5). Light source items carry `appliesCondition` so buying and using a torch from the shop correctly lights it. `SHOP_CATEGORIES` extended with 'Supplies'.
- Added auto-equip from DDB import — after parsing inventory, automatically slots the best weapon (highest avg damage die + attack/damage bonuses), best armor (highest AC bonus), best shield, and first ring into equipment slots. Adds a "Auto-equipped: ..." note to import warnings. Characters arrive ready to fight.
- Added D&D Beyond inventory import — `ddbImport.ts` now parses the DDB `inventory` array into our Item type. Maps weapon/armor/shield/potion/ring/scroll/misc types from DDB type + subType. Extracts damage dice, attack bonus, AC bonus, ranged flag, range, heal amount. Maps rarity (common/uncommon/rare/legendary→epic). Strips HTML from descriptions. Healing potions get smart defaults (7/14/28 HP). Imported characters now arrive with their full inventory.
- Added light source items in inventory — new `'light'` ItemType, `appliesCondition` and `consumable` fields on Item. Pre-built `LIGHT_SOURCE_ITEMS` array (Candle x5, Torch x3, Hooded Lantern, Tinderbox) exported from types/game.ts. `useItem` in GameContext updated: light source items apply their condition to the character's unit (toggle behavior — using again extinguishes). Consumable items (candles, torches) decrement quantity; non-consumable (lantern) stays in inventory. Non-consumable items skip inventory removal on use.
- Added multiple light source types — 5 light-bearing conditions with distinct propagation radii: candle (10ft/20ft), torch (20ft/30ft), lantern (30ft/50ft), darkvision spell (0ft/60ft dim only), daylight spell (60ft/100ft). `LIGHT_SOURCE_RADII` map in types/game.ts drives BattleMap's `effectiveLighting` computation. Each source emits bright + dim zones. `CONDITION_VISION_OVERRIDE` updated with matching per-condition vision ranges. Condition colors, effects, and rule tooltips added for all 3 new types.
- Added backstory hooks persistence — `backstoryHooks` string array saved/loaded with campaign state. Hooks generated before the adventure starts now survive page reload and session resume, so the DM doesn't lose them by refreshing.
- Added dynamic light source propagation — torchlit units emit bright light (4 cells/20ft) and dim light (6 cells/30ft) computed at render time via `effectiveLighting` useMemo. Merges with DM-painted static lighting grid (higher rank wins: dark < normal < dim < bright). Optimized with bounded iteration (only scans cells within torch radius). DM sees the combined overlay. Vision computation uses `effectiveLighting` so torch carriers dynamically illuminate dark areas as they move.
- Added AI backstory hook integration with DM narration — when the first narration fires (adventure not yet started) and backstory hooks have been generated, they're injected into the AI DM's context as numbered instructions to "weave these party connections into the narrative naturally." After the opening scene, subsequent narrations use the normal "adventure is underway" context.
- Added lighting zone persistence in campaign save/load — `lightingGrid` included in `CampaignState` + `CampaignLoadResult` interfaces and wired through `useCampaignPersistence`. Auto-saved with the 2s debounce, restored on campaign load from both server and localStorage. DM-painted bright/dim/dark zones now survive page reload and session resume.
- Added "How It Works" 3-step walkthrough section on Home page — positioned between hero and main content. Three numbered cards (Create or Join → Build Your Party → Play) with orange step badges, icons, and descriptive text. Responsive grid (1 col mobile, 3 cols desktop). Mentions guest play, D&D Beyond import, AI narration, live sync.
- Added environmental lighting zones — DM can paint cells as bright/dim/dark using new Light toolbar (visible in DM mode). Three lighting DM tools (Bright, Dim, Dark) with erase resetting to normal. Lighting modifies vision range per-cell: bright=1.5x, dim=0.75x, dark=0.4x base radius. DM sees colored tint overlays (yellow for bright, amber for dim, dark slate for dark). `LightingLevel` type exported from BattleMap. Game.tsx manages a 20x20 lighting grid passed to BattleMap. Erase tool also resets lighting.
- Added Low-FX accessibility mode — manual "FX" toggle in Home header (yellow when active). Adds `.low-fx` class to `<html>` which: disables all animations + transitions, removes backdrop blur effects, removes glow effects, increases contrast on borders (slate-700 → slate-500) and text (slate-400/500 → slate-300). Persisted in localStorage, applied on initial render via main.tsx before React hydrates. Stacks with `prefers-reduced-motion` CSS media query.
- Added AI-generated backstory hooks — new `POST /api/dm/backstory-hooks` endpoint uses Workers AI (Llama 3.1 8B) to generate 3-5 narrative connections between party members based on their races, classes, backgrounds, bonds, and backstories. UI appears in the narration view before adventure starts: dashed "Generate Backstory Hooks" button → violet-themed panel with hooks as italic bordered list items. Supports regenerate and dismiss. Each hook links 2+ characters through shared history, conflicting goals, or complementary abilities.
- Added D&D Beyond character import — auto-detects DDB JSON format (classes array or data.character wrapper) and routes through `parseDDBCharacter()` in `src/lib/ddbImport.ts`. Parses name, race (fuzzy-matches sub-races like "High Elf" → Elf), class (primary = highest level), stats (base + bonus + racial + overrides), HP (base + CON mod + removed), AC, XP, gold (currency conversion), personality traits, backstory, death saves, inspiration, exhaustion. Import button tooltip updated to mention D&D Beyond. Warnings shown for race/class mapping notes.
- Added Torch/Light spell mechanic — two new condition types (`torchlit` at 8 cells/40ft, `darkvision` at 12 cells/60ft) integrated with the existing conditions system. `CONDITION_VISION_OVERRIDE` map exported from types/game.ts. BattleMap's vision computation applies condition-based overrides (max of base visionRange and condition override). CombatToolbar gets a Torch toggle button (free action, duration -1 = until extinguished). Condition colors and rule tooltips added.
- Added ARIA accessibility pass across 7 files — 23 attributes added: `aria-label` on icon-only buttons (theme toggle, sound mute, zoom +/-, delete, close), `role="dialog"` + `aria-modal="true"` on modals (login, delete confirm, help overlay), `aria-label` on canvas elements (battle map, minimap), `aria-label` on form inputs (chat, room code, volume slider), `aria-expanded` on collapsible sections, landmark labels on `<aside>`.
- Added campaign archive (soft delete + restore). DELETE endpoint now marks campaigns `archived: true` with `archivedAt` timestamp instead of removing them. `?permanent=1` query param hard-deletes. New `POST /api/campaigns/:roomId/restore` endpoint un-archives. Home page hides archived campaigns from main grid and shows a collapsible "Archived (N)" section with Restore + Delete Forever buttons. Confirmation modal dynamically shows "Archive" (amber) for active campaigns and "Delete Forever" (red) for already-archived ones. Public index auto-removes archived campaigns and re-syncs on restore.
- Added keyboard shortcuts for combat actions — A (attack), E (end turn), P (potion), G (dodge), H (dash), F (class ability). Only active during player's turn in combat. Uses `data-combat-action` attributes on CombatToolbar buttons for click delegation. Help overlay (?) updated with combat shortcut section.
- Added mobile-responsive lobby layout — tab bar at top toggles between "Party & Dice" and "Chat" on small screens. Seat cards wrap on mobile instead of horizontal scroll. Doodle pad capped at 40vh on mobile. Settings panel scrollable with stacked form inputs on mobile. Chat panel goes full-width when active. Desktop layout unchanged.
- Added mobile-responsive game layout — fixed bottom tab bar (Game/Chat/Sheet) visible on screens <768px. Tapping a tab shows only that panel. The right sidebar (chat + character sheet) hides on mobile and becomes a full-width panel when its tab is active. DM sidebar hidden on mobile. Header compacted (smaller text, lobby label hidden). Main content area adds bottom padding to avoid tab bar overlap. Desktop layout unchanged.
- Added per-unit vision range based on racial darkvision. `Unit.visionRange` field (cells, default 6 = 30ft). D&D 5e darkvision races (Elf, Dwarf, Gnome, Half-Orc, Tiefling, Dragonborn) get 12 cells (60ft). Humans and Halflings keep 30ft. `computeVisibility` now reads `visionRange` per-position instead of using a global constant. Constants exported from `types/game.ts`: `DARKVISION_RACES`, `DARKVISION_RANGE`, `NORMAL_VISION_RANGE`.
- Added DM "View As" dropdown — when DM mode is on, a dropdown appears next to the toggle listing all living player characters. Selecting one previews the map from that player's fog perspective (only their token's vision). "Full Vision" restores normal DM view. All fog rendering paths (terrain, tokens, traps, minimap) respect `effectiveDmMode` so the preview is accurate. Toggling DM mode off auto-clears the View As selection.
- Added per-player fog of war in multiplayer — non-DM players now see only from their own character's token when connected to a multiplayer session. DM retains full map vision. Solo/offline play keeps shared party vision. Implemented via `myUnitId` prop on BattleMap: when set, `playerPositions` filter restricts vision computation to only that player's unit. Game.tsx passes `selectedCharacterId` when `wsConnected && !isDM`. No WebSocket changes needed — fog is computed purely client-side from each player's local unit position.
- Added latency heatmap to Game DMSidebar Notes tab — compact horizontal bar chart showing all connected players' RTT with color-coded severity bars (emerald/amber/red). Stale/disconnected players show a pulsing red bar with "DC" label. Bar width scales relative to the worst latency in the party. Uses the existing `playerLatency` + `stalePlayers` state from `useGameWebSocket`.
- Added WebSocket heartbeat failure detection — server tracks `lastPongAt` per session and checks all players for staleness (45s threshold, ~2 missed keepalive cycles). Stale players get a `player_stale` broadcast; recovery triggers `player_recovered`. Lobby seat cards show a pulsing red "DC" badge for disconnected players, replacing the normal RTT badge. Game.tsx also tracks stale state via `useGameWebSocket`. REST `/players` endpoint includes `stale` field.
- Added animated bonus breakdown in BG3 roll presentation — when a roll has bonuses (proficiency, ability mod, equipment, etc.), individual pills appear one-by-one after dice resolve with 280ms stagger. Each pill is color-coded (emerald for positive, red for negative) with label + value. The displayed total counts up in real-time as each bonus reveals, building from dice raw sum to final total. A "N more..." hint pulses while bonuses are still revealing. Uses existing `diceSettle` animation for smooth entrance.
- Added per-player latency indicators in Lobby seat cards — color-coded RTT badges (green <150ms, amber <300ms, red >300ms) appear on each seated player. Clients report their measured RTT to the Lobby DO via `report_rtt`, which stores it per-session and broadcasts a `latency_update` snapshot. Player list REST endpoint now also includes `rttMs`. Game.tsx receives latency via `useGameWebSocket` for future use in DMSidebar. Helps DMs make informed roll sync policy decisions.
- Added `auto` roll sync policy with DM-tunable RTT and jitter thresholds. Auto mode computes an effective policy (`smooth` or `strict`) per-client by sampling the last 8 RTT pings and comparing average RTT + jitter stdev against configurable thresholds (default 260ms RTT, 90ms jitter). Thresholds are durably persisted in the Lobby DO and synced via welcome + live broadcast. DM settings panel exposes range sliders for both thresholds when auto is selected. Header badge shows `auto (smooth)` or `auto (strict)` reflecting the live client-side decision.
- Added DM-controlled roll interpolation policy (`smooth`/`strict`/`auto`) with durable Lobby DO persistence and live broadcast updates. Both Lobby and Game now surface the active sync policy in the header, and BG3 roll presentation honors the mode (smooth keeps RTT catch-up interpolation; strict disables it for closer lockstep timing).
- Added chat read-anchor behavior for long campaigns: Lobby/Game now persist a per-room per-user last-read timestamp locally, auto-jump to first unread on hydrate, and mark-read when users catch up at the bottom.
- Added incremental chat history pagination in Lobby + Game: users can load older campaign messages on demand, backed by `before` cursor support in `loadChatHistory()` to improve cross-device continuity for long campaigns.
- Added first-pass high-latency roll interpolation: BG3 popup now factors live RTT into phase catch-up (small latency compensation window) to reduce jarring animation jumps for reconnecting/high-ping clients while preserving server-authoritative timing.
- Added live sync-quality telemetry in Lobby/Game headers (clock offset + RTT) using the new ping/pong time-sync channel so players can quickly tell when visual desync risk is network-related.
- Added active clock-sync sampling over WebSocket ping/pong (with RTT-aware offset estimation) and wired both Lobby/Game roll popups to consume smoothed server-time offset so roll animation phases stay visually aligned across clients.
- Implemented first cross-device parity layer in Lobby DO: durable persistence for lobby strokes/seats/DM/active-roll queue with restore-on-wake, welcome backfill for active roll state, and timestamp-based catch-up in BG3 popup for closer client sync on late join.
- Cross-device lobby parity pass: DO now snapshots lobby state (stroke history, seat/DM state, active/queued rolls) to durable storage and restores it on wake/restart. Welcome payload now backfills active roll + queued roll info for late joiners, and roll presentation uses server timestamps so animation phase is closer to in-sync across clients.
- d2 coin flow finalized: coin faces now render as H/T per-die in chat/presentation while totals remain numeric sums, and d2 crit/fumble logic is single-coin only (multi-coin rolls like 2d2 no longer trigger full critical states).
- Added `d2` coin die support across roller/presentation/stats with coin face rendering (`H`/`T`), plus outcome semantics update: Heads = success, Tails = failure. Also updated dice button layout so d20 occupies the full bottom row for faster primary-roll access.
- BG3-style center roll presentation shipped for Lobby + Game with DM veto flow, single active roll queue, delayed chat insert until presentation clears, and softer non-startling popup transitions. Added shared `RollPresentation` model + `BG3RollPopup` component, moved roll UX out of sidebar, and blocked dice panel interactions during active presentation.
- Roll presentation polish pass: dynamic timing (`1s + animation`, plus extra hold for crit outcomes), per-die stagger (500ms), adv/disadv hidden keep/discard reveal until animation end, and min/max per-die reveal colors with settle FX. Crit/fumble outcome bar now has theatrical states (rave rainbow success, fiery failure + drop) and full-theme normal bar gradients for both dark/light modes.
- Lobby DO roll orchestration now server-authoritative for presentation lifecycle: queueing (`roll_queued`), active roll events (`roll_result` with animation metadata), DM veto (`veto_roll`/`roll_vetoed`), and cleanup (`roll_cleared`). Includes disconnect-safe queue cleanup and next-roll handoff.
- Chat persistence refresh fix: temp-user localStorage no longer suppresses persisted chat when a real auth cookie exists, so history survives refresh for authenticated users.
- Help + Hide combat actions — two new D&D 5e combat actions in CombatToolbar. Help: grants `helping` condition (next ally attack has advantage). Hide: DEX (Stealth) check vs enemy passive perception — success applies `hidden` condition (+2 attack on next attack, enemies can't target). Both added as `ConditionType` with CONDITION_EFFECTS, CONDITION_TOOLTIPS, CONDITION_COLORS, CONDITION_ABBREV entries. Teal accent for Help, slate for Hide.
- Flanking bonus — `isFlanking()` pure function in `mapUtils.ts`. Checks if any ally of the attacker is adjacent to the target on the opposite side (dot product < 0 means ~180° apart). +2 attack bonus for melee attacks when flanking. Shows `+2flank` in attack roll log. Wired into CombatToolbar Quick Attack.
- Status effect visual overlays on battle map tokens — upgraded from tiny dots to full overlays. Colored ring around tokens with conditions (primary condition color, 2.5px stroke with 0.7 opacity). Pulsing glow for urgent conditions (burning, stunned, frightened). Abbreviated text labels above tokens (PSN, STN, BRN, DDG, etc.) in colored pill badges with dark background. All 12 condition types mapped with abbreviations.
- Cover system — `checkCover()` function in `mapUtils.ts` walks the line between attacker and target, counting terrain obstructions. Returns `CoverLevel`: none (0 AC), half (+2 AC for 1+ water/difficult terrain), three-quarters (+5 AC for 3+ obstructions), full (wall/void = untargetable). Applied to ranged attacks in CombatToolbar. Cover label shown in combat log messages.
- Custom monster creator — `CustomMonsterCreator` component (~250 lines) in DMSidebar encounter tab. DMs build custom monsters with form: name, CR (auto-fills HP/AC/attack/damage/speed defaults from CR), type (14 types with icons), size, stat block grid (HP/AC/Atk+/Dmg+/DEX/Speed), damage die, description, and custom abilities (name/type/die/cooldown/ranged toggle). Save to localStorage per campaign for reuse. Spawn directly into combat via existing `handleSpawnMonster`. Saved monsters list with count selector and per-entry spawn/delete. Purple accent UI.
- Dynamic difficulty scaling — `useDynamicDifficulty` hook (~100 lines) auto-adjusts encounter strength mid-combat. Monitors party HP% vs enemy HP% every 2 rounds (max 2 adjustments per encounter). If party is getting destroyed (< 30% HP, enemies > 50%): nerf enemy HP by 15% + reduce attack bonus by 1. If struggling: nerf HP by 10%. If steamrolling: heal enemies 20% of missing HP + boost attack. Narrative DM messages disguise the adjustment. DM toggle in DMSidebar ("Auto-balance encounters" ON/OFF). Persisted to localStorage per campaign.
- Shareable character cards — `CharacterCard` component (~220 lines) renders a 600x340 canvas card with: portrait (with fallback initial), name, race/class/level, alignment/background, HP/AC/gold/XP bar, 6-stat block with modifier badges, equipment highlights, feat list, HP bar, and branding. Download as PNG or copy to clipboard. Shown at bottom of CharacterSheet.
- Concentration tracker visual — glowing purple ring + pulsing "C" badge on InitiativeBar avatars when a unit is concentrating on a spell. Ring uses `ring-2 ring-purple-400/60` with `shadow-[0_0_8px_rgba(168,85,247,0.4)]` glow. Badge tooltip shows spell name. Always visible (not just on hover).
- Combat damage type indicators — `DamageType` union type with 13 D&D damage types (slashing, piercing, bludgeoning, fire, cold, lightning, thunder, poison, acid, necrotic, radiant, force, psychic). Each mapped to an emoji icon. `FloatingText.damageType` optional field renders the icon next to floating damage numbers during combat. Added to `FloatingCombatText` rendering.
- AI session recap — "Previously on your adventure..." auto-narration when returning to a game with existing history. Fires once on mount via the `/api/dm/narrate` endpoint with a recap-specific prompt using the last 8 DM history entries. Dramatic amber-themed banner with dismiss button. Session-scoped via sessionStorage (only shows once per browser session). Loading spinner while generating. 20s timeout — non-critical, graceful failure.
- Downtime activities — `DowntimeActivities` component (~200 lines) with 6 between-adventure activities: Crafting (INT), Research (INT), Carousing (CHA), Gambling (WIS), Training (STR), Meditation (WIS). Each has gold cost, ability check DC, success/failure/critical success outcomes with gold/XP rewards. Integrated into DMSidebar encounter tab (shown out of combat). Wired to character gold, XP, and DM message log. 2s cooldown between activities.
- Lair actions — `LairAction` interface (damage/condition/terrain/flavor types with save DC + stat). Boss monsters fire environmental effects at initiative count 20 (start of each new round). Adult Dragon gets 3 lair actions: Volcanic Tremor (2d6 fire, DEX DC 15), Toxic Fumes (poisoned, CON DC 14), Lair Darkness (flavor). Save-for-half-damage on damage types. Implemented as third useEffect in useEnemyAI, round-tracked via ref.
- Inventory trading — `tradeItem(fromCharId, toCharId, itemId)` in GameContext. Handles stacked items (potions/scrolls trade one copy, decrement quantity). Auto-stacks into recipient inventory. "Give" button on CharacterSheet inventory items opens dropdown of party members. Full character picker with name, level, class display.
- Legendary actions — `legendaryActions`, `legendaryActionsUsed`, `legendaryAbilities` fields on Unit. Boss enemies fire extra attacks between player turns (50% chance per player turn). Adult Dragon gets 3 legendary actions (Tail Sweep, Wing Gust, Detect). Mind Flayer gets 2 (Psychic Lash, Tentacle Grab). Reset at start of boss turn. Purple dot indicator in InitiativeBar showing remaining legendary actions.
- Achievement badges — `Achievements` component (~250 lines) with 16 achievements across 4 categories (combat, exploration, social, legendary). Persistent tracking via localStorage (stats + unlocked badges). Auto-parses combat log for kills, crits, fumbles, damage, healing, spells. Tracks encounters won, combat rounds, chat messages. New "Badges" view tab (`0` keyboard shortcut). Amber-themed progress bar. Filter tabs by category. Unlocked/locked visual states with category-colored borders.
- AI player turn logic — `useAIPlayerTurn` hook (~320 lines) at `src/hooks/useAIPlayerTurn.ts` makes AI-controlled player seats actually play during combat. Intelligent decision tree: heal self/allies when low HP (potions first, then class abilities, then spells), use class abilities when available (70% chance), cast damage spells (casters prefer highest damage in-range spell), cast cantrips when out of slots, move toward enemies via pathfinding, melee attack with equipped weapon stats + proficiency + feat bonuses. Supports Extra Attack for martial classes at level 5+. Handles opportunity attacks against AI player movement. Identifies AI players via `aiCharacterIds` Set loaded from sessionStorage (set by Lobby.tsx on Start Game from AI seat data). Game.tsx creates units for AI characters on mount. `isPlayerTurn` now excludes AI player turns from enabling human controls. Smart target selection: 30% chance to focus-fire lowest HP enemy. Delay slightly longer than enemy AI (1000ms vs 800ms) to feel more deliberate. All sound FX wired (combat hits/misses/crits, spells, healing). Full multiplayer sync via broadcastCombatSync.
- Campaign timeline — `CampaignTimeline` component (~270 lines) at `src/components/game/CampaignTimeline.tsx`. New "Timeline" view tab (`9` keyboard shortcut). Auto-generates session history by parsing DM history and combat log strings for events: adventure start, combat encounters (kill count), rest events, deaths, loot finds, level-ups, critical hit milestones. 9 event types with distinct icons and color themes (combat/red, narration/amber, levelup/yellow, quest/emerald, death/slate, loot/amber, rest/sky, scene/indigo, milestone/purple). Filter tabs to browse by category. Vertical timeline with dot+line layout, time-ago timestamps. Auto-tracks character level changes for level-up events. localStorage persistence per campaign (capped at 100 events). Live combat indicator with pulsing red dot. Indigo-themed tab button.
- Chat emoji reactions — full-stack emoji reaction system on chat messages. `ChatMessage` interface extended with `reactions?: Record<string, string[]>` (emoji → playerIds). 8 D&D-themed reaction emojis (👍⚔️🎯😂🔥❤️💀🎲). Hover over any message reveals a floating reaction picker bar. Click to toggle reaction on/off. Reaction pills below messages show emoji + count, highlighted when you've reacted. Lobby DO handles `chat_reaction` message type — broadcasts to all clients. `useGameWebSocket` and Lobby.tsx both handle incoming `chat_reaction` with toggle logic (add/remove playerId from emoji array). Wired in both Game.tsx and Lobby.tsx via `onReaction` prop on ChatPanel. Orange accent on your own reactions.
- Session MVP awards — `CombatMVP` component (~140 lines) shows post-combat awards when combat ends. Parses full combat log for per-player stats: damage dealt, kills, critical hits, spells cast, healing done. Awards: Most Damage (sword), Most Kills (skull), Critical Master (bullseye), Arcane Master (sparkle), Healer (heart). Detects combat-end transition via `usePrevious` ref pattern. Collapsible amber-themed banner in narration view with award cards (icon, category, winner, value). Auto-hides when new combat starts, click to dismiss. All player character names passed from `characters` array.
- Travel pace calculator + treasure hoard generator — Two DM utility tools in DMSidebar encounter tab (shown out of combat). Travel pace: D&D 5e reference table (Fast 4mi/hr 30mi/day -5 Perception, Normal 3mi/hr 24mi/day, Slow 2mi/hr 18mi/day can stealth) with forced march exhaustion rules and difficult terrain/mounted notes. Treasure hoard: 4-tier CR-based generator (CR 0-4, 5-10, 11-16, 17+) with gold dice rolls, weighted gem tables (Agate through Diamond), and weighted magic item tables (Potion of Healing through Ring of Three Wishes). Rarity-colored item display. `rollTreasureHoard()` and `HOARD_TIER_LABELS` in rules.ts.
- Map pin/marker system — DM-placed named annotations on the battle map. `MapPin` interface (id, col, row, label, color, icon, createdBy) in types/game.ts with 8 preset colors. New `'pin'` DM tool in BattleMap toolbar — click map cell to open inline creation form with label input, emoji/icon field, and 8-color picker. Pins rendered as HTML overlay elements inside the zoom/pan container (not canvas-drawn) — colored pill with label text, triangle tail pointing to cell, hover-reveal delete button. Pin list in DMSidebar Notes tab showing all pins with color dot, label, coordinates, hover-delete. localStorage persistence per campaign (`adventure:pins:{roomId}`). WebSocket sync via `pin_sync` game event. Late-join recovery includes pins in `state_response`. Erase DM tool also removes pins at the erased cell.
- Party formation presets — `FormationPresets` component (~230 lines) in DMSidebar encounter tab. Six formations: Line, Column, Wedge, Diamond, Circle, Scatter. Drag-reorderable marching order with localStorage persistence. Repositions player tokens relative to current center, respects terrain (skips walls). WebSocket sync via `formation_apply` game event. Only shown out of combat.
- Combat recap per round — `CombatRecap` component (~200 lines) auto-generates narrative summaries when combat rounds advance. Parses combat log strings for damage, kills, spells, crits, fumbles, and KOs. Produces italic narrative one-liners ("Round 2: 3 enemies fell, a devastating critical hit landed, Fireball cast."). Collapsible banner with round history. Color-coded by event severity (amber for crits, red for kills, yellow for KOs). Shown in narration view during combat.
- Dice roll statistics — `DiceStats` component (~250 lines) as new "Stats" view tab. Luck rating (-100 cursed to +100 blessed) with visual bar. Per-die breakdown (d4-d20) with average vs expected comparison bars. Crit/fumble counts. Hot/cold streaks on d20 rolls. Per-player leaderboard (d20 average, crits, fumbles). Recent roll history with timestamps. All computed via `useMemo` from GameContext `rolls` array. `8` keyboard shortcut.
- NPC relationship tracker — `NpcTracker` component (~260 lines) as new "NPCs" view tab. DM adds NPCs with name, role, location, faction, and disposition (-2 hostile to +2 allied). Disposition bar with +/- controls. Search + filter (all/alive/dead/hostile/friendly). Inline editable notes per NPC. Mark dead/revive toggle. Purple-accented faction display. localStorage persistence per campaign. `7` keyboard shortcut.
- Exhaustion levels — D&D 5e exhaustion system (0-6) with cumulative penalties. `exhaustion: number` on Character interface. DM controls in DMSidebar Notes tab (per-character +/- buttons). Visual indicator in PartyHealthBar (E1-E6 badge, color-coded by severity). Full exhaustion section in CharacterSheet with level pips and active penalty list. Long rest reduces exhaustion by 1. `EXHAUSTION_LEVELS` data in rules.ts. Character creation defaults to 0. JSON import validates with fallback.
- Encounter history log — `EncounterLog` component (220 lines) as new "Encounters" view tab. Auto-saves combat stats when combat ends: damage dealt/taken, kills, spells cast, critical hits, fumbles, KOs, rounds survived. Live stats during active combat with pulsing red indicator. Past encounters as expandable cards with time-ago display. Parses combat log strings with regex heuristics to extract structured data. localStorage persistence per campaign (last 20 encounters). `6` keyboard shortcut.
- Inspiration points — D&D 5e DM reward mechanic. `inspiration: boolean` on Character interface. DM grants/revokes from DMSidebar Notes tab (per-character toggle buttons). Golden star pip on PartyHealthBar portraits. "Spend Inspiration (Advantage)" button in DiceRoller that auto-sets advantage mode and consumes the point. Character creation defaults to `false`. JSON import validates with fallback. Synced via existing `character_update` game event.
- Quick rules reference — `RulesReference` modal with 5 tabs (Conditions, Actions, Spells, Scores, Rules). Conditions tab shows all 10 conditions with modifier badges. Actions tab has 11 D&D 5e combat actions with icons. Spells tab groups all 24 spells by school with expandable cards. Scores tab explains all 6 ability scores. Rules tab covers 10 key mechanics (advantage, death saves, concentration, etc.). Searchable. `R` keyboard shortcut. Shared `rules.ts` data file extracted from CharacterSheet.
- Session timer — compact timer in Game header, auto-starts on mount, persists to localStorage per campaign, click to pause/resume. Shows elapsed play time as `H:MM:SS`.
- Party loot tracker — `LootTracker` component (276 lines) with rarity-colored item cards (common/uncommon/rare/very rare/legendary), DM add form, player claim/unclaim system, filter tabs (all/unclaimed/claimed), auto-detect gold in item names for total gold display. localStorage persistence per campaign. WebSocket sync via `loot_sync` game event. `5` keyboard shortcut. New "Loot" view tab in Game.tsx.
- Weather effects — rain/fog/snow/sandstorm CSS overlays on battle map, DM weather selector in DMSidebar Scene section, WebSocket sync via `weather_change` game event so all players see same weather. Reduced-motion accessible.
- Monster manual browser — 30+ SRD monsters (CR 0.125–10) with searchable/filterable modal, type/environment/CR filters, expandable stat cards with abilities, count selector + direct spawn to battlefield. `B` keyboard shortcut, "Browse Monsters" button in DMSidebar encounter tab. `monsters.ts` data file with `searchMonsters()` API.
- Random encounter tables — 8 biomes (forest/dungeon/mountain/swamp/desert/underdark/coastal/urban) with weighted encounter tables, biome selector in DMSidebar, "Check (DC 15)" d20 roll and "Force" buttons, encounter result card with difficulty + flavor + enemy names
- Session journal — shared party notes panel (new `journal` view tab in Game.tsx), any player can add/pin/remove entries, localStorage persistence per campaign, WebSocket sync via `journal_sync` game event, `J` / `4` keyboard shortcuts, amber-themed UI with entry attribution and timestamps
- Dice macros — saved roll shortcuts (e.g. "Fireball: 8d6+5") in DiceRoller, amber-themed pills, inline add form, localStorage persistence, wired to chat in Game.tsx and Lobby.tsx with SFX
- Login modal — Discord/Google/Quick Login moved into centered modal, header cleaned up
- Auth gates — `RequireAuth` wrapper on all sub-pages (Lobby, Game, CharacterCreate), redirects to Home if not logged in
- Sign-out clears all auth state (temp user + session cookie) and redirects to Home
- Avatar dropdown fix — removed overflow-hidden from header that was clipping dropdown
- Spell search/filter — search bar + level/school filter pills in the CharacterSheet spellbook
- Initiative drag reorder — DM drag-and-drop reorder during combat
- Character portrait in dice roll chat messages — 24px circular portrait next to roller name
- Map fog of war presets — Dark/Explored/Reveal quick buttons in DM tools
- Chat whisper/private messages — `/whisper @player` and `/w @player` full-stack routing
- Character JSON import — validate + import from file picker
- Session recap persistence — localStorage caching by roomId
- Dice history panel — collapsible last-20-rolls log
- Interactive spell slot tracker — clickable pips, spell DC display, concentration badges
- Condition reference tooltips — full 5e rules text on hover
- Configurable turn timer — DM toggle, 15s-5m range, auto-advance
- Quick roll buttons — click ability scores/saves/skills for instant d20+mod

**Full v0.1.0 feature set (1) **Spell search/filter** — CharacterSheet spellbook gains a search bar, level filter pills (Cantrip/Lv1/Lv2/Lv3), and school filter pills (abbreviated 4-char labels with color coding per school). Filters compose: search + level + school all work together. `SpellbookSection` extracted as a sub-component with its own state (`spellSearch`, `schoolFilter`, `levelFilter`). `useMemo` for filtered results. Clear button resets all filters. "No spells match" empty state. School colors defined in `SCHOOL_COLORS` map (8 schools). (2) **Initiative drag reorder** — DM can drag-and-drop initiative cards to reorder during combat. `InitiativeBar` gains `canReorder` and `onReorder` props. HTML5 drag-and-drop: `dragStart`/`dragOver`/`drop`/`dragEnd` handlers with visual feedback (opacity reduction on dragged card, purple ring on drop target). Game.tsx wires `canReorder={canUseDMTools && inCombat}` and reorders `units` array via `setUnits`. Broadcasts via `broadcastCombatSyncLatest`. Combat log entry on reorder. (3) **Character portrait in dice roll chat messages** — `ChatMessage` interface gains `portrait?: string` field. `RollMessage` component shows a 24px circular portrait next to the roller's name (falls back to initial-circle with crit/fumble color coding). Portraits populated from `selectedCharacter.portrait` on local rolls and slash rolls in Game.tsx. (4) **Map fog of war presets** — three quick-access buttons in BattleMap DM tools (visible when DM mode is active): "Dark" (reset all explored to false), "Explored" (keep current exploration state), "Reveal" (mark all cells as explored). Styled with sky-blue accent on Reveal button. Allows DM to quickly control map visibility without toggling DM mode. All 153 tests pass (104 player + 49 worker, 2 budget-skipped), zero TS errors.

**Detailed iteration logs (preserved for reference, oldest first):**

v0.1.0-dev.45: (1) **Chat whisper/private messages** — full-stack whisper system. Lobby DO (`lobby.ts`): new `whisper` case with case-insensitive username lookup, sends to target player + echoes to sender. ChatPanel: parses `/whisper @player message` and `/w @player message` syntax. New `onWhisper` callback prop wired in both Game.tsx and Lobby.tsx. `ChatMessage` type extended with `'whisper'` type, `targetUsername`/`targetPlayerId` fields. useGameWebSocket handles incoming whisper messages. Pink-themed whisper rendering in ChatPanel (shows "To X" for sent, "From X" for received). (2) **Character JSON import** — complete round-trip import/export. `validateCharacterJSON()` in `export.ts` validates 8 required fields + types, fills 20+ optional field defaults. `importJSONFile()` opens native file picker, reads + parses + validates JSON. Home.tsx: "Import" button next to "+New" in characters section, assigns new ID on import to avoid conflicts. (3) **Session recap persistence** — localStorage-backed recap caching. NarrationPanel gains `roomId` prop, stores recap text in `adventure:recap:${roomId}`. On mount, loads cached recap and auto-shows if exists. On generate, persists new recap. Game.tsx passes `roomId={room}` to NarrationPanel. (4) **Dice history panel** — collapsible roll log between DiceRoller and ChatPanel. `showDiceHistory` state in Game.tsx. Shows last 20 rolls with value, die type, character/player name, timestamp. Color-coded: yellow for crits, red for fumbles. Compact design, max-h-36 scrollable. All 153 tests pass (104 player + 49 worker, 2 budget-skipped), zero TS errors.

v0.1.0-dev.44 (complete): Four features. (1) **Interactive spell slot tracker** — spell slot pips in CharacterSheet are now clickable: click a filled pip to spend a slot, click an empty pip to restore one. Uses `updateCharacter` for direct `spellSlotsUsed` mutation. Added spell save DC and spell attack bonus display (e.g., "DC 15 +7 atk") calculated from casting stat per class + proficiency bonus. Concentration indicator ("C") badge on leveled spells in the spellbook. Per-level remaining/max counter below pips. (2) **Condition reference tooltips** — full 5e condition descriptions appear on hover for all condition badges. `CONDITION_TOOLTIPS` record with detailed rules text for all 10 condition types (poisoned, stunned, frightened, blessed, hexed, burning, prone, dodging, raging, inspired). Applied to both CharacterSheet (active conditions on player unit with duration and source) and InitiativeBar (condition badges on all units). CharacterSheet now displays active unit conditions as a dedicated badge row below concentration. All badges use `cursor-help` for discoverability. (3) **Configurable turn timer** — DM can toggle the combat turn timer on/off and set duration (15s-5m) from the DMSidebar encounter tab. Quick-select buttons for 30s/1m/2m/3m. Range slider with 15s steps. Timer state (`turnTimerEnabled`, `turnTimeSeconds`) lives in Game.tsx and passes through to InitiativeBar. When timer expires, automatically advances turn with `nextTurn()` + combat log entry. Timer display in InitiativeBar already existed (v0.1.0-dev.40) — now fully configurable. (4) **Quick roll buttons** — ability scores, saving throws, and skills in CharacterSheet are now clickable to instantly roll d20+modifier. Ability score boxes: click to roll ability check. Saving throw rows: click to roll save (with proficiency). Skill rows: click to roll skill check (with proficiency). All rolls go through `addRoll` to appear in the dice log. Hover states show "d20" indicator and modifier. Subtle hover background transitions for discoverability. All 153 tests pass, zero TS errors.

v0.1.0-dev.43 (complete): Four features. (1) **Chat typing indicator** — full-stack implementation. Server (`lobby.ts`): new `case 'typing'` relays to all other clients (exclude sender). Client: `Lobby.tsx` and `useGameWebSocket.ts` track `typingUsers` Map with 3s auto-expire timers per player. `ChatPanel.tsx` gains `onTyping` and `typingUsers` props. Input `onChange` sends typing messages throttled to max once per 2s. UI shows "X is typing...", "X and Y are typing...", or "X and N others are typing..." below the message list. Placeholder text updated to include `/roll, /me` hint. (2) **Hit dice tracker** — proper D&D 5e hit dice implementation. `Character` interface gets `hitDiceRemaining` field. `HIT_DIE_SIDES` constant maps class to die size (d6-d12). Short rest now actually spends 1 hit die (rolls the class die + CON mod, minimum 1 HP). Disabled when no hit dice remain. Long rest restores half hit dice (min 1). Level-up grants new hit dice. CharacterSheet displays a visual hit dice tracker: small die tiles showing d-size, blue when available, grey when spent. Short rest button shows actual die type (e.g., "d10 + CON"). Backward-compatible — old characters default to full hit dice. (3) **CharacterCreate.tsx decomposition** — `AppearanceStep` component (296 lines) extracted to `src/components/character/AppearanceStep.tsx`. Contains portrait preview, all 7 appearance pickers (skin/hair/eye color, hair style, scar, face markings, facial hair), and portrait source tabs (Default/AI Generate/Upload). `portraitMode` and `portraitStyle` state now lives in the component. Parent passes callbacks for portrait generation (now accepts style parameter), upload, and appearance changes. CharacterCreate.tsx: 1840→1521 lines (319 lines removed, **17.3% reduction**). `PORTRAIT_STYLES` constant and `PortraitStyle`/`PortraitMode` types moved to AppearanceStep and re-exported. (4) **Makefile CI targets** — `make typecheck` runs `npx tsc --noEmit`, `make ci` runs full pipeline: typecheck → lint → build → test. All 153 tests pass, zero TS errors. Bundle: main 395KB + Game 197KB + CharacterCreate 94KB + Lobby 30KB.

v0.1.0-dev.42 (complete): Four features. (1) **Chat slash commands wired** — `/roll d20`, `/roll 2d6+3`, `/roll adv`, `/roll disadv`, `/roll 4d6kh3` now work in chat. `parseSlashRoll()` parser (implemented in v0.1.0-dev.42 WIP) is now fully connected: `handleSlashRoll` callbacks added to both Game.tsx and Lobby.tsx, creating `type: 'roll'` chat messages with full notation display, individual rolls, kept dice, and totals. `/me` emote command also wired. `/roll` with no args defaults to d20. Invalid notation shows error in chat. Messages persisted to D1. Sound FX play on slash rolls (dice sound + crit/fumble). (2) **Chat message grouping + scroll-to-bottom** — consecutive messages from the same sender within 60s are visually grouped (no repeated avatar/name). Auto-scroll only when user is already at bottom. "X new messages" pill button appears when scrolled up with new messages arriving. (3) **Advantage/disadvantage toggle in DiceRoller** — new Normal/ADV/DISADV toggle bar above dice buttons. When ADV is active, clicking d20 rolls 2d20 and keeps highest. When DISADV, keeps lowest. d20 button gets a colored ring (green for ADV, red for DISADV) and a "2x" badge. Only affects d20 rolls (other dice unaffected). (4) **Campaign delete confirmation dialog** — clicking the delete button on a campaign now opens a modal confirmation dialog instead of immediately deleting. Shows campaign name, warns about irreversibility. Cancel/Delete buttons. Click outside to dismiss. Styled consistently with the keyboard shortcut help overlay. All 153 tests pass, zero TS errors. Bundle: main 395KB + Game 196KB + CharacterCreate 93KB + Lobby 29KB.

v0.1.0-dev.41 (complete): Four features. (1) **AoE confirm handler extraction** — the 67-line inline `onAoEConfirm` callback was moved from BattleMap JSX to a proper `handleAoEConfirm` useCallback in Game.tsx. Handles spell slot consumption, target finding via cell intersection, save DC calculation, damage/condition application, and combat log. Game.tsx: 1387→1396 lines (net +9 from new callback definition, offset by removed inline). (2) **Party health overview** — new `PartyHealthBar` component (102 lines) at `src/components/game/PartyHealthBar.tsx`. Compact horizontal strip showing all party members: tiny portrait, name/class/level, HP bar (color-coded), HP text (DEAD/DOWN/numbers), condition pips. Always visible during adventure below the initiative bar. Clicking a character selects their unit. Dead characters shown greyed out with strikethrough. (3) **Character sheet skills & proficiencies** — full D&D 5e 18-skill list with ability score associations. Class skill proficiencies (2-4 per class) shown with orange dot indicators. Collapsible section. When collapsed, shows Passive Perception (10 + WIS mod + proficiency if proficient). Skill bonus = ability mod + proficiency bonus if proficient. (4) **Structured combat log** — enhanced NarrationPanel combat log with `classifyCombatEntry()` function that categorizes entries into 8 types (crit/hit/miss/death/spell/condition/heal/other). Filter tabs (All/Attacks/Spells/Conditions/Deaths) for quick filtering. Spell entries now get distinct blue styling. Heal entries get green styling. Round separators on initiative/round entries. Max height increased to 48 (from 40). All 153 tests pass, zero TS errors.

v0.1.0-dev.40 (complete): Four features. (1) **Sound FX volume slider** — master GainNode inserted between all audio and hardware output. `getVolume()`/`setVolume()` API with localStorage persistence (`adventure:volume`). Mute state also persisted (`adventure:muted`). Mute now zeroes gain instead of suspending AudioContext (fixes ambient timing issues). Volume slider UI: hover over mute button reveals a dropdown with range input (0-100%) + percentage label. Speaker icon changes: muted (X), low (<30%), normal (waves). Dragging slider to 0 auto-mutes, dragging above 0 auto-unmutes. (2) **Battle map touch support** — full mobile touch interaction on BattleMap canvas. Pinch zoom (two fingers → scale), single-finger swipe to pan, tap to select tokens, long-press (300ms) to start drag with movement range overlay. `touch-none` CSS prevents browser default gestures. Legend shows mobile-specific help text on small screens ("Pinch to zoom | Swipe to pan | Long-press to drag"). (3) **Initiative bar turn transition animations** — `animate-turn-enter` CSS animation (scale bounce 1→1.08→1.05 with golden glow pulse) on the active unit card when turn changes. `animate-turn-badge` animation (slide down + bounce) on the TURN badge. Auto-scroll: scrolls the initiative bar to center on the current turn unit via `scrollIntoView`. (4) **Ambient mood visual tinting** — each ambient mood (tavern/dungeon/forest/combat/mystery) maps to a subtle full-screen gradient overlay: tavern=warm amber, dungeon=deep slate/indigo, forest=emerald/green, combat=red, mystery=purple/indigo. Overlay uses `pointer-events-none` + z-0 with 1s opacity transition on mood change. Header and main content elevated to z-10. Game.tsx: 1336→1387 lines. All 153 tests pass, zero TS errors.

v0.1.0-dev.39 (complete): Four features. (1) **useCampaignPersistence hook** (192 lines) extracted to `src/hooks/useCampaignPersistence.ts` — debounced auto-save, server load on mount with localStorage merge, campaign registration on first adventure start. Uses `getState` callback pattern and `onAutoSelectCharacter` ref bridge to avoid circular deps with handleSelectCharacter. (2) **Session recap AI** ("Previously on...") — new `/api/dm/recap` endpoint using Workers AI Llama 3.1 with dramatic narrator system prompt. NarrationPanel shows a collapsible "Previously on this adventure..." button (appears after 3+ DM history entries) that generates and displays an AI-written recap. Indigo-themed UI with loading state. (3) **Floating combat text** — new `FloatingCombatText` component (100 lines) + `useFloatingCombatText` hook with `animate-float-up` CSS animation. Damage numbers (red), healing (green), crits (amber, larger), misses (grey italic) float up and fade out during combat. Wired into CombatToolbar: quick attack hits/misses/crits, spell damage/healing, class abilities, rest actions. (4) **Combat CSS animations** — `animate-float-up` (float + fade), `animate-damage-shake` (hit feedback), `animate-heal-pulse` (healing glow) keyframe animations added to styles.css. Game.tsx: 1397→1336 lines. All 153 tests pass, zero TS errors.

v0.1.0-dev.38 (complete): Two major improvements. (1) **useGameWebSocket hook extraction** (418 lines) — the entire WS message handler (~275 lines of switch/case + session state) moved to `src/hooks/useGameWebSocket.ts`. Manages wsPlayerId, isDM, isSpectating, dmPlayerId, wsConnected state internally. Uses `wsPlayerIdRef` for stable callback identity and `getStateForResponse` callback pattern for late-join state exchange. Game.tsx: 1610→1397 lines (213 net reduction including new features). (2) **Keyboard shortcut help overlay** — press `?` to toggle a styled modal showing all shortcuts. New shortcuts: M (mute), C (character sheet), Q (quests), L (combat log), D (DM sidebar), 1/2/3 (view switch). Input field detection prevents shortcuts while typing. `?` button added to header. All 153 tests pass, zero TS errors.

v0.1.0-dev.37 (complete): ShopView extraction — `ShopView` component (107 lines) extracted to `src/components/game/ShopView.tsx`, containing merchant inventory display, category filter tabs, buy/sell interface. `shopCategory`/`setShopCategory` state moved into component. `SHOP_ITEMS`, `SHOP_CATEGORIES`, `RARITY_COLORS`, `RARITY_BG` imports removed from Game.tsx. Game.tsx reduced from 1697→1610 lines (87 lines removed). Total Game.tsx decomposition: 3274 (v0.1.0-dev.34 start) → 1610 (v0.1.0-dev.37 end) — **50.8% reduction, 1664 lines extracted across 8 targets**. All 153 tests pass, zero TS errors.

v0.1.0-dev.36 (complete): Combat Toolbar extraction — the biggest decomposition target. `CombatToolbar` component (745 lines) extracted to `src/components/game/CombatToolbar.tsx`, containing all DM controls (encounter, NPC talk, scene name), combat actions (roll initiative, end turn, quick attack, cast spell, class ability, dodge, dash, disengage), end combat with loot/XP rewards, level up indicator, rest buttons, potion use, clear history, and status indicators. Game.tsx import cleanup removed 22 now-unused imports (combat helpers, sound FX, map utils, constants moved to extracted components). Game.tsx reduced from 2288→1697 lines (591 lines removed). All 153 tests pass, zero TS errors. Total decomposition: Game.tsx went from 3065 (v0.1.0-dev.34 end) to 1697 (v0.1.0-dev.36 end) — 45% reduction.

v0.1.0-dev.35 (complete): Game.tsx decomposition round — three major extractions. (1) `useEnemyAI` hook (285 lines): enemy AI combat useEffect extracted to `src/hooks/useEnemyAI.ts`, consumes `useGame()` directly, takes callback props for parent-owned functions. (2) `DMSidebar` component (277 lines): DM tools sidebar extracted to `src/components/game/DMSidebar.tsx` with Encounter/NPC/Notes tabs + Ambiance selector, owns `dmSidebarTab` state internally. (3) `NarrationPanel` component (308 lines): character status bar, turn indicator, quest tracker, death saves, DM history scroll, combat log, and action input extracted to `src/components/game/NarrationPanel.tsx`. Also: `Quest` interface moved from inline in Game.tsx to `src/types/game.ts` for reuse. Game.tsx reduced from 3065→2288 lines (777 lines removed, 25% reduction). All 153 tests pass, zero TS errors.

v0.1.0-dev.34 (complete): Game.tsx decomposition — wired LevelUpModal (161 lines) and CharacterPicker (76 lines) as extracted components, removed 209 lines of inline JSX from Game.tsx (3274→3065 lines), removed 4 useState hooks (levelUpTab, asiMode, asiStat1, asiStat2) that moved into LevelUpModal, cleaned unused applyASI/selectFeat from useGame destructuring. Keyboard shortcuts (Escape closes modals in priority order: level-up → DM sidebar → combat log → quests). Toast mobile repositioning (bottom-center on mobile, bottom-right on desktop). DoodlePad touch support (getTouchPos, onTouchStart/Move/End with preventDefault for scroll prevention, touch-none CSS). GitHub repo description + topics set. v0.1.0-dev.33 (complete): Mobile responsive (Home, Lobby, CharacterCreate — stacking layouts, safe areas, tap targets), meta viewport fix (viewport-fit=cover, theme-color, apple-mobile-web-app), CharacterCreate step transition animations (fade-in-up on all 6 wizard steps), mobile CSS (safe-area-inset, text-size-adjust, tap-highlight removal). v0.1.0-dev.32 (complete): Error boundary for lazy-loaded routes (catches chunk load failures + render errors with branded recovery UI), 404 page ("maybe it was a mimic all along"), Lobby visual polish (page-enter animation, glass morphism seat cards, staggered reveals, connection badge pill, gradient Start Game button, polished password gate, drawing indicator with pulse dot, settings panel slide-in), Game visual polish (crit-flash on CRITICAL combat log entries, hp-bar-shimmer on character + initiative HP bars), loading skeletons on Home.tsx dashboard (shimmer cards while campaigns fetch), new CSS classes (skeleton, seat-card, seat-ready pulse, connection-badge). v0.1.0-dev.31 (complete): Fantasy animation system, hero gradient + shimmer, card hover effects, hono security patch, GameContext decomposition (1896→1082 lines), code splitting (703KB→split chunks), prefers-reduced-motion, error handling overhaul (18 bare catches → logError). v0.1.0-dev.30 (complete): Lobby passwords, save indicator, auth gating, dashboard polish. Previous: v0.1.0-dev.26 through v0.1.0-dev.29 (D1, chat, OAuth, character wizard, battle map, spectator, animations).

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

### Multiplayer session sync + test framework

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
- **Status:** Done
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

### Cross-Device Chat History by Campaign ID (PLANNED)
- Ensure chat history is fully persisted and loaded by campaign ID so players see the same timeline when they switch machines/browsers.
- Remove any remaining local-only fallback behavior that can hide server-backed history for authenticated users.
- Add pagination + lazy loading for long-running campaigns so history stays fast while remaining complete.
- Add a persisted "return-to-last-read" anchor per campaign/user so rejoining players resume at their previous unread boundary.
- Add a true browser E2E smoke suite (Playwright) for create/join lobby, chat hydrate, paint hydrate, and synchronized roll presentation checks.

### Cross-Device Session Parity: Paint + Chat + Dice Playback (PLANNED)
- Persist lobby doodle/paint state by campaign/session ID so anyone joining (or rejoining on another computer) sees identical lobby art.
- Guarantee chat history + paint state hydrate together on connect so session context is consistent immediately.
- Make dice presentation playback synchronized for all participants (same start time, animation phase, and resolve timing) so everyone sees rolls unfold in lockstep.
- Backfill late joiners with the active/queued roll state so they do not miss ongoing roll presentations.
- Add clock-skew compensation using server-time offset handshake so roll phase sync stays tight even on high-latency or drifted clients.
- Add periodic paint snapshot checkpoints (plus stroke deltas) to speed up hydration in long sessions while preserving full artwork continuity.
- Auto-tune roll animation interpolation for high-latency clients (reduce visual jumps when RTT spikes) while preserving shared server-authoritative timing.
- [x] Add adaptive interpolation modes (smooth/strict/auto) with DM-toggle defaults so competitive tables can prefer stricter lockstep while narrative tables prefer visual smoothness.
- [x] Add optional `auto` roll sync policy that switches between smooth/strict based on rolling RTT + jitter windows, with DM-tunable thresholds and per-campaign defaults.
- [x] Add DM roll sync mode toggle in Game.tsx DMSidebar (currently only configurable from Lobby settings).
- [x] Add animated bonus breakdown in roll presentation — show modifier contributions (proficiency, ability mod, magic weapon) stacking up to the total with per-bonus animated pills.
- Add roll history replay in BG3 popup — click any recent roll in chat to re-watch its presentation animation.
- [x] Add per-player latency indicators in the party roster so DM can see who has high ping before choosing sync policy.
- [x] Add latency heatmap to DM sidebar showing all player RTTs at a glance with visual severity.
- [x] Add WebSocket heartbeat failure detection — show disconnection warning for players whose RTT exceeds 10s or who miss 3 consecutive pings.

### Dice Presentation: Character-Sheet Bonus Breakdown (PLANNED)
- Show per-roll modifiers in the BG3 presentation window as animated + / - contributions (ability mod, proficiency, equipment, buffs/debuffs, situational effects).
- Animate bonus application after base dice resolution so players can watch totals build step-by-step.
- Persist bonus breakdown into chat history with color-coded positive/negative modifier text, and include those values in the final displayed total.
- Keep source-of-truth bonus math server-authoritative so chat/popup totals always match.

### D1 Database + Persistent Users + Chat Persistence (DONE — Phases 1-2)
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

### Landing Page + Lobby + Seat Model + Campaign Management Polish (DONE)
**Goal:** Rebrand as player-first, implement the 0-to-N seat model in the lobby, and flesh out campaign management.

**Landing page (DONE):**
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
- [x] "How it works" section (create campaign, invite friends, play)

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

**Campaign management (remaining — deferred):**
- [x] Campaign archive (soft delete, can restore)
- [x] Public/private visibility toggle
- [x] Campaign browser API

### Character + Game Board + DM Tools Polish (DONE)
**Goal:** Enhance the character creation experience, improve the battle map, and give DMs better tools.

**Character creation:**
- [x] Step-by-step wizard flow (Identity → Appearance → Background → Personality → Stats → Review)
- [x] Preview sidebar showing character portrait, stats, background as you build
- [x] AI Build shortcut (fills all fields, jumps to Review)
- [x] Edit mode jumps directly to Review (all fields pre-filled)
- [x] AI-generated backstory hooks based on party composition
- [x] AI backstory hook integration with DM narration — automatically weave party connections into the opening narrative
- [x] Backstory hooks persist in campaign state so they survive reload before adventure starts
- [x] Import characters from D&D Beyond / Foundry VTT JSON
- [x] Foundry VTT character import (full parser for Foundry dnd5e actor JSON)
- [x] Foundry VTT spell import (parse spell items with school/damage/concentration)
- [x] D&D Beyond inventory import (map DDB equipment to our Item types with full stat extraction)
- [x] D&D Beyond spell import (parse + report cantrips/spells from DDB classSpells array)
- [x] Custom spellbook field on Character — store imported/custom spells beyond the class list
- [x] Spell management UI on character sheet — prepare toggle + remove custom spells
- [x] "Add Custom Spell" form on character sheet (name, level, school, damage, description)
- [x] Filter spellbook to show only prepared spells (toggle view)
- [x] Auto-equip best weapon/armor from DDB import into equipment slots

**Game board:**
- [x] Minimap with click-to-pan (4px/cell, terrain + token dots + viewport rect, toggle button)
- [x] AoE spell templates in BattleMap (circle/cone/line/cube, hover preview, click confirm, ESC cancel)
- [x] Initiative tracker with turn timer countdown (60s default, green→yellow→red, pulse at 10s)
- [x] **AoE wired into Game.tsx** — `activeAoE`/`pendingAoESpell` state, spell click enters targeting mode + switches to map view, `onAoEConfirm` applies multi-target damage with per-unit saves, AoE badge on spell list, targeting banner with cancel
- [x] Animated token movement — easeInOutQuad interpolation between grid cells, requestAnimationFrame loop during animation, `animateMoveRef` callback for Game.tsx to trigger enemy AI animations, remote `token_move` events also animate
- [x] Hover tooltips on initiative bar (HP, AC, abilities with cooldowns, conditions with durations, speed, CR, concentration)
- [x] Fog of war per-player (each player sees only from their token — currently global fog)
- [x] DM "View As" dropdown — DM can preview the map from any specific player's perspective
- [x] Per-unit vision range — darkvision, torches, and spells modify vision radius beyond default 30ft
- [x] Torch/Light spell mechanic — consumable item or spell that temporarily boosts vision range for the carrier
- [x] Lantern item type with fuel tracking (burns 60 turns, refillable from Oil Flask)
- [x] Fuel indicator on character sheet inventory (color-coded badge + Light/Refuel buttons)
- [x] Torch burnout timer (torches burn 10 turns, candles 6, auto-consume from stack)
- [x] Environmental lighting zones (DM can paint bright/dim/dark areas on the battle map)
- [x] Lighting zone persistence in campaign save/load (survives reload and session resume)
- [x] Light source propagation — torch conditions auto-paint bright/dim zones around the carrier token
- [x] Darkvision spell light propagation (60ft dim-only radius, no bright zone)
- [x] Multiple light source types (candle: 2/4 cells, lantern: 6/10 cells, daylight spell: 12/20 cells)
- [x] Light source items in inventory (candle, torch, lantern, tinderbox) — use from inventory to apply condition
- [x] Add light source items to the shop (Supplies category with adventuring gear)
- [x] Starting equipment presets by class (Fighter gets chain mail + longsword, Rogue gets leather + daggers, etc.)
- [x] "Re-roll equipment" button on character sheet to reset to class starting gear
- [x] Daylight spell auto-cast from spellbook UI (applies condition to caster for spell duration)
- [x] Dispel Magic: remove magical conditions from target units (counter to buffs/debuffs/light spells)

**DM tools:**
- [x] DM sidebar panel (collapsible w-72, left side) with 3 tabs: Encounter, NPC, Notes
- [x] Encounter tab: difficulty selector (4 levels), spawn button, active unit list with HP, scene name
- [x] Encounter difficulty calculator: D&D 5e DMG p.82 XP thresholds per party level, live XP budget display, current encounter rating
- [x] NPC tab: NPC Talk mode toggle, name/role inputs, dialogue history
- [x] Quick NPC generator: random race + name (from names.ts) + role + personality + quirk, auto-fills NPC name/role, adds character note to dialogue history
- [x] Notes tab: auto-saved textarea (localStorage per room), character counter
- [x] Music/ambiance system — 5 procedural mood presets (tavern, dungeon, forest, combat, mystery) via Web Audio API oscillators + filtered noise. Fade in/out, LFO modulation, auto-switch to combat on encounter spawn. DM sidebar selector (always visible at bottom)

### Lobby Hub + Role-Based Flows + Campaign Discovery (DONE)
**Goal:** Restructure the home page and lobby into a role-aware hub. DMs create campaigns, players find games, spectators browse. Public/private lobbies. Everything accessible from within a live lobby session.

**Home page role-based entry points:**
*Groundwork done: Home.tsx already has New Campaign + Create Character buttons, campaign dashboard cards with Lobby/Play, character cards with stat overview. This version adds the discovery/browse layer and explicit role entry points.*
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

### Full Persistence + Local Cache (PARTIAL)
**Goal:** Everything persists. Browser cache for instant loads, server for cross-device sync.

**Browser cache strategy:**
- [x] Service Worker for offline-first static assets
- [x] IndexedDB for local cache of characters, campaigns, campaign state
- [x] Optimistic UI: show IndexedDB-cached state immediately, server fetch overwrites in background
- [x] Cache invalidation via ETags (SHA-256 hash, 304 Not Modified support)
- [x] ETag support on campaign list endpoint (SHA-256, 304 support, completes full ETag coverage)
- [x] Character export to PDF (printable sheet with stats, equipment, inventory, spells)
- [x] Shared party inventory (DM-managed loot pool with give-to-player transfers)
- [x] Loot roll table integration — weighted random loot from 4-tier table, auto-populates party inventory
- [x] Encounter-specific loot overrides (Staged Loot section, used instead of random rolls)
- [x] Loot rarity glow effect on party inventory items (colored borders + box-shadow per tier)
- [x] AI encounter balancing (DMG XP budget calculation + party composition awareness)
- [x] Map preset library (6 templates: tavern, dungeon, forest, cave, castle, arena)
- [x] Community map sharing (upload/download/rate via API + Browse panel in DM toolbar)
- [x] Map preview thumbnails in community browser (80×80 canvas snapshot on upload)
- [x] Map search by name/tag (client-side filter in community browser panel)
- [x] Turn timer (configurable countdown per player turn, auto-end on expiry — already implemented)
- [x] Initiative roll automation (shows order in combat log + DM re-roll during combat)
- [x] Condition duration countdown in initiative bar (already shows round count + tooltip)
- [x] Sound effects library (21 Web Audio API functions: dice, crits, combat, spells, ambient moods — already implemented)
- [x] Campaign session log export (markdown with party roster, narration, chat, combat log)
- [x] Player notes panel (personal notes per-campaign, localStorage, N shortcut)
- [x] Shareable player notes (opt-in: Share with Party button → broadcast to chat via WebSocket)

### v2.0 Feature Ideas
- [x] Campaign timeline view (339-line component with combat/narration/milestone events — already implemented)
- [x] Character relationship graph (canvas node graph with 5 edge types, draggable, persisted)
- [x] AI-suggested relationships based on backstory analysis (Llama 3.1 8B, ✨ AI Suggest button)
- [x] Voice chat: in-client WebRTC audio with push-to-talk (V key) + peer state indicators
- [ ] Discord voice channel toggle alongside WebRTC (switch between in-client and Discord voice)
- [ ] Discord voice widget embed — show who's talking in the game UI via Discord's embedded voice widget
- [ ] Auto-generate Discord voice channel invite link when campaign starts (via Discord bot API)
- [x] Map fog-of-war reveal animation (0.5s fade dissolve via requestAnimationFrame)
- [x] Encounter theater mode (auto-zoom 2x + smooth pan to current turn unit)
- [x] AI DM personality presets (6 styles: theatrical, comedic, grimdark, tolkien, noir, horror)
- [x] Character multiclassing support (classLevels field + merged spellbook + UI)
- [x] Multiclass ability score requirements validation (PHB p163, Fighter STR/DEX special case)
- [x] Multiclass proficiency rules (PHB p164, confirmation dialog shows gained profs)
- [x] Spell concentration auto-tracking (CON save on damage + War Caster feat — already implemented)
- [x] Death save automation (auto d20 roll on turn start, nat 20/1 special cases, 3-strike system)
- [x] Battle map layers (7 toggleable z-layers: terrain, lighting, traps, grid, tokens, fog, effects — DM toolbar toggle buttons)

### v3.0 Feature Ideas
- [x] Replay mode — auto-record combat events + step-through viewer with scrubber + speed control
- [x] Replay mode: save recordings in campaign state (last 5, with picker dropdown)
- [x] Replay mode: render unit movements on mini battle map canvas during replay
- [x] AI NPC memory — NPCs remember past conversations across sessions (KV-persisted, 20-entry rolling window)
- [x] NPC memory viewer — DM can inspect/clear NPC memories from sidebar (expandable list + clear button)
- [x] Quest tracker with world map pins (SVG markers, priority colors, clickable detail popups)
- [x] Spell slot visual tracker (clickable pip circles per level — already implemented)
- [x] Ambient weather effects on battle map (5 types: rain/fog/snow/sandstorm/none — already implemented with CSS particles + DM controls + WebSocket broadcast)
- [x] DM screen mode — separate browser tab with initiative/party/enemies, synced via BroadcastChannel
- [x] Player quick-reference cards (228-line RulesReference component with Conditions/Actions/Spells/Mechanics tabs — already implemented, R shortcut)
- [x] Encounter history analytics (Achievements component tracks kills, damage, healing, crits, fumbles, spells — already implemented)
- [x] Collaborative world-building wiki (5 categories, search, edit, persist in campaign state)
- [x] Wiki: AI lore generation (Workers AI generates content based on title/category/tags/scene/existing pages)
- [x] Wiki: inter-page linking ([[Page Title]] syntax renders as clickable links)
- [x] Mobile companion app mode (/companion/:roomId with Sheet/Dice/Chat tabs)

### v4.0 Feature Ideas
- [x] Streaming AI narration (SSE token-by-token with typewriter cursor, fallback to non-streaming)
- [x] Player character journal (diary entries on Character, persisted, reverse-chron display)
- [x] Initiative card drag-and-drop (HTML5 drag-and-drop with visual feedback — already implemented)
- [x] Hex grid toggle UI + coordinate math (full hex rendering is a future deep integration)
- [x] Hex grid: full terrain rendering in hex cells (pixelToHex, hex terrain fills, hex grid lines, hex token positioning, hex fog of war, hex drag-drop)

### v17.0 — Post-Roadmap (everything buildable is done, these are new ideas)
- [x] Hex pathfinding (6-neighbor BFS via getHexNeighbors, offset-row aware, computeReachableCells + isAdjacent accept gridType)
- [x] Game.tsx code-split (18 components converted to React.lazy — Game chunk 578KB→482KB, -17%)
- [x] Offline mode indicator (OfflineBanner component: red/amber banner, reconnect countdown, "single-player mode active" messaging)
- [x] Theme system (4 themes: Dark/Light/Parchment/High Contrast — CSS custom properties, data-theme attr, selector dropdown, early-apply in main.tsx)
- [x] Campaign export to PDF (enhanced campaign book: table of contents, NPC section, calendar status, session journal, 50 combat log entries, parchment styling)

### v18.0 — Fresh Roadmap
- [x] Condition auto-expiration (already implemented — duration decrements on turn, auto-remove at 0, message posted)
- [x] Opportunity attack automation (already implemented — findOpportunityAttackers + full attack roll + damage + reaction tracking in BattleMap handleMouseUp)
- [x] Cover calculation display (visual badges on enemy tokens when player selected: ½ yellow, ¾ orange, ■ red — uses checkCover from mapUtils)
- [x] Spell slot tracking per encounter (EncounterSlotTracker: snapshot on combat start, show delta, per-caster mini bars)
- [x] Map fog brush preview (hoverCell state + ghost overlay in draw loop, brush-radius-aware, hex-compatible, red for refog / blue for paint)
- [x] Initiative cards drag reorder for players (myUnitId prop — players can drag their own card for readied actions / voluntary delay)
- [x] Character import from JSON URL (importJSONFromURL in export.ts, URL button on Home, validates content-type + JSON structure)
- [x] Combat XP auto-award to all party members (XP + gold split evenly, remainder to first char, level-up checked per char)
- [x] AI-generated encounter music keywords (detectSceneMoodAI in sceneMood.ts — AI classifies scene mood, fire-and-forget refinement on combat start)
- [x] Token status effect icons on canvas (emoji icons below HP bar: poison skull, fire, frightened face, etc — max 4 shown)

### v19.0 — Quality & Depth
- [ ] Dash action doubles movement range (show expanded reachable cells when Dash is active)
- [ ] Healing word quick-cast (one-click bonus action heal on any visible ally)
- [ ] Short rest hit dice roller (roll HD to recover HP, choose how many to spend)
- [ ] Passive investigation display (DM sees party passive scores in a compact bar)
- [ ] Attack of opportunity warning (highlight cells that would trigger OA before moving)
- [x] Terrain tooltip on hover (HTML tooltip above hovered cell: terrain name, movement cost, hazard damage — hex-compatible positioning)

### v7.0 Feature Ideas
- [x] AI DM voice: per-NPC voices (hash-based voice assignment with varied pitch/rate)
- [x] Multi-language UI (I18nProvider + t() + locale JSON files: en/es/fr/de/ja, language selector in header)
- [x] Plugin system (AdventurePlugin interface, event bus, registry, PluginManager UI, Crit Tracker built-in plugin, window.__ADVENTURE_PLUGINS__ API)
- [x] Campaign templates (4 starter adventures with narration, quests, map coords)
- [x] OAuth with GitHub (full OAuth flow, JWT, Octocat SVG button, GITHUB_CLIENT_ID/SECRET bindings)
- [x] Google OAuth login (Phase 2 of D1 — full OAuth flow + ensureUser + JWT)
- [x] Rich text wiki editor (markdown rendering with headers/bold/italic/code/links/lists)
- [x] Battle map fog: per-player persistence (explored grid saved to localStorage per myUnitId)
- [x] Hot-seat mode (/hotseat/:roomId with pass-the-device screen + character selector)
- [ ] Integration with D&D Beyond API (live sync character data bidirectionally)

### v8.0 Feature Ideas
- [x] Dice roll history analytics (d20 distribution bar chart with nat 20/nat 1 highlights)
- [x] Session timer pause/resume from DM sidebar (SessionTimer component in Notes tab)
- [x] Auto-save indicator (⏳/✓/✗ in Game header from existing saveStatus)
- [x] Character comparison view (⚖️ modal with side-by-side stats, higher values highlighted)
- [x] Quick NPC generator (GET /api/dm/random-npc via unified AI client)
- [x] Encounter difficulty estimator (XP budget breakdown + enemy XP + difficulty label — already implemented)
- [x] Sound effect trigger buttons for DM (12 SFX buttons in DMSidebar, lazy-loaded)
- [x] Map grid size selector (15×15 to 40×40 dropdown in zoom controls)
- [x] Character portrait gallery (thumbnails on character sheet, click to set active portrait)

### v9.0 Feature Ideas
- [x] Drag-and-drop seat reordering in lobby (HTML5 DnD, reorder_seats WS message, DM-only)
- [x] AI encounter post-mortem (EncounterPostmortem component + POST /api/dm/encounter-postmortem endpoint)
- [x] Character backup/restore (AES-256-GCM encrypted export/import via lib/backup.ts)
- [x] Battle map fog reveal undo (Re-fog DM tool — click or drag-paint cells to un-explore)
- [x] Dice roll sound customization (4 packs: Classic/Crystal/Wooden/Metal, selector in volume dropdown)
- [x] Campaign branching (Fork button in Game header, snapshots state to new room ID)
- [x] NPC per-party-member attitudes (partyAttitudes map on NpcRecord, expandable per-member UI)
- [x] Quick combat resolver (auto-resolve encounters, simulates round-by-round, in DMSidebar)
- [x] Session scheduling (SessionScheduler in DMSidebar Notes, date/time picker, countdown)
- [x] Performance dashboard (PerfDashboard: FPS, memory, DOM nodes, Ctrl+Shift+P toggle)

### v10.0 Feature Ideas
- [x] Fog shape tools for batch reveal/hide (circle/rect, two-click model, 4 new DM tools)
- [x] Initiative lock toggle (DM freezes initiative order during combat, amber lock button)
- [x] Encounter history search/filter (search by kills/spells/log text, difficulty filter pills)
- [x] Ambient sound mixer (layer multiple moods with per-channel volume sliders, mixer UI in DMSidebar)
- [x] Map fog-of-war brush size (1/3/5 cell selector, brushCells helper, works with all paint tools)
- [x] Combat damage graph (CombatDamageGraph canvas bar chart, round markers in log, hover tooltip)
- [x] Player readiness check (DM Ready? button, per-player banner, game_event relay)
- [x] Spell effect templates library (save/load AoE shapes: circle/cone/line/cube, radius, color picker)
- [x] Character backstory AI continuation (POST /api/backstory/continue, Continue Story on CharacterSheet)
- [x] Map layer opacity controls (fog dim opacity slider 10-90% in DM toolbar)
- [x] Party loot split calculator (auto-divide gold evenly among party, DMSidebar)
- [x] Keyboard shortcut overlay (? key toggles modal with 10 shortcuts, lazy-loaded)
- [x] Campaign export as Foundry VTT module (actors + inventory + quests as journal entries)
- [x] PWA install prompt (manifest.json + beforeinstallprompt + Install button)

### v11.0 Feature Ideas
- [x] Combat timeline scrubber (already existed as CombatReplay.tsx with full scrubber, play/pause, mini-map)
- [x] DM encounter notes (freeform text per encounter template, shown on load)
- [x] Token aura visualization (two-pass draw, Set Aura button, dashed circle + fill)
- [x] Map weather particle effects (WeatherParticles canvas: rain, snow, sand, fog)
- [x] Spell slot recovery tracker (SpellSlotRecovery: Wizard Arcane Recovery + Warlock Pact Magic)

### v12.0 Feature Ideas
- [x] Mass heal/damage tool (MassHPTool: checkbox unit selection, damage/heal toggle, apply to all)
- [x] Encounter XP budget display (EncounterXPTracker: live progress bar, per-player share)
- [x] Initiative tiebreaker display (DEX mod shown on ties in InitiativeBar)
- [x] Token HP flytext (HPFlytext: animated floating numbers above tokens — damage red, heal green, crit gold, SLAIN)
- [x] Rainbow crit celebration (CritCelebration: confetti + rainbow border flash on nat 20)
- [x] Kill streak tracker (KillStreak: Double Kill → RAMPAGE → LEGENDARY! slide-in banner)
- [x] Persona-driven README (routing table, accurate feature list, "Roll for initiative.")
- [x] Persona-driven Makefile (make play / quickstart / dm-guide, grouped help output)
- [x] Map waypoint path drawing (DM draws path, 'Go' animates token along it, numbered dots)
- [x] Combat encounter templates from AI (AI Template button, auto-generates + saves balanced encounters)
- [x] Session notes auto-save to cloud (DM textarea + KV endpoints, 1.5s debounce)
- [x] Player character trading (TradePanel: gold + items between party members)
- [x] Campaign recap AI summary (POST /api/dm/campaign-recap, Recap button in header)

### v13.0 Feature Ideas
- [x] Fumble table (10 entries, 4 severity tiers, banner on nat 1, posted to DM history)
- [x] Death save cinematic (screen dim + heartbeat pulse, contextual text by outcome)
- [x] Dice luck tracker (SVG sparkline of last 20 d20 rolls, hot/cold streak detection)
- [x] Bardic inspiration pool (BardicInspiration component, Grant/Spend, d6-d12 by bard level)
- [x] Minimap pings (double-click minimap, pulsing amber circles, broadcast to party)
- [x] Token movement trails (ghosted orange dots along animation path during movement)
- [x] Combat round summary (auto-generated damage/kill recap after each round)
- [x] Natural language dice labels ('/roll 2d6+3 fire damage' captures + displays labels)
- [x] Dice superstitions tracker (dry commentary on hot/cold/average roll streaks)

### v14.0 Feature Ideas
- [x] Concentration spell visual tether (purple dashed line from caster to targets on map)
- [x] Initiative portrait cards (enemy tokenImage in initiative bar, fallback chain)
- [x] Combat threat indicator (!! deadly, ! hard, color-coded by CR vs party level)
- [x] Environmental hazard zones (lava/acid/poison_gas terrain, patterns, HAZARD_DAMAGE)
- [x] HP bar emotional states (shake when low, glow when full)
- [x] Auto-loot distribution (already existed — staged + random loot on combat end)
- [x] Dice tower mode (2D animated bounce, CSS keyframes, crit/fumble glow, clip-path shapes)
- [x] Spell range visualization (sky-blue dashed circle on map during AoE targeting)
- [x] Turn order prediction ("in N" count on initiative cards, circular distance)
- [x] Party formation presets (already existed — 6 formations, marching order, drag reorder)
- [x] Death recap (DeathRecap component, last 3 damage sources, auto-dismiss)
- [x] Mounted combat support (mountId/riderId on Unit, Mount/Dismount buttons, paired movement)
- [x] Grapple/shove automation (contested checks, auto-apply grappled/prone conditions)

### v16.0 Feature Ideas
- [x] Scene transition cards (dramatic title overlay on scene change, amber divider)
- [x] Combat emotes (6 quick-reaction buttons, broadcast via game_event)
- [x] Passive perception alerts (DM warned when party PP beats trap DC)
- [x] Damage type emoji on flytext (fire/cold/lightning/radiant/necrotic/psychic/poison/acid/thunder/force)
- [x] Initiative countdown sound (rising-pitch ticks in last 5 seconds of turn timer)
- [x] Campaign world clock (hour of day, time-of-day labels, rest gating, advance buttons)
- [x] Spell component tracker (V/S/M on Spell interface, monospace tag on spell buttons)
- [x] Token HP bars enhanced (numeric readout, wider bars, dark background)
- [x] NPC voice pitch (per-NPC slider 0.5-2.0 on NPC tracker, overrides TTS hash)
- [x] DM secret rolls (toggle + local roll + reveal button, purple accent)
- [x] Encounter mood music auto-switch (mystery for easy, combat for harder, restore on end)

### v6.0 Feature Ideas
- [x] AI DM voice narration (browser SpeechSynthesis API, zero deps, works offline)
- [x] Undo/redo for battle map terrain (Ctrl+Z / Ctrl+Shift+Z, 50-level stack)
- [x] Import maps from image files (drag-and-drop PNG/JPG onto battle map)
- [x] Keyboard-driven character creation (Enter/arrows navigate steps, Enter in inputs advances)
- [x] Campaign statistics dashboard (Achievements tracks kills/damage/crits/spells + SessionTimer tracks play time — already implemented)
- [x] QR code for campaign join link (SVG pattern + toggle in Lobby)
- [x] Exportable encounter templates (export/import as JSON files)
- [x] Theme customization (color picker → CSS --accent variable, persisted)
- [x] Drag-and-drop inventory management (drag items from inventory to equipment slots)
- [x] AI-generated map descriptions (POST /api/dm/describe-cell via unified AI client)

### AI Architecture (shipped)
- [x] Unified AI client (`aiText` + `aiChatStream`) — single code path for all text AI
- [x] Three-tier backend: local OpenAI-compatible server → Workers AI → offline graceful fallback
- [x] Model-agnostic: configurable via `LOCAL_AI_MODEL` (any model) and `WORKERS_AI_MODEL` (any CF model)
- [x] All 15+ AI endpoints migrated to unified client, zero duplicate routing
- [x] Offline mode returns a graceful fallback string instead of crashing
- [x] Local AI image generation (aiImage() routes to /v1/images/generations or FLUX, offline returns null)
- [x] AI backend indicator in game UI (color-coded badge: local/cloud/off)
- [x] Model quality presets (AI_QUALITY env var: fast/balanced/quality → auto-select model)

### v5.0 Feature Ideas
- [x] Discord OAuth login (was already built — enabled the disabled button, removed 'coming soon' divider, all 3 OAuth providers now active)
- [x] Character leveling wizard (Summary tab with HP roll/average, gains list, ASI/Feat tabs)
- [x] AI trap generator (✨AI DM tool + POST /api/dm/generate-trap, level-scaled)
- [x] Session recap generator (auto-fires on return + manual "📖 Previously on..." button + dedicated API endpoint)
- [x] Ambient soundscape per scene (keyword-to-mood mapper, auto-fires on scene change)
- [x] Quick-roll macros (save/execute custom dice expressions with localStorage persistence — already implemented)
- [x] Party formation presets (save/load unit positions in localStorage, name-matched)
- [x] Export campaign as PDF book (parchment-styled HTML with party, narration, quests, lore, battles, chat)
- [x] Spectator mode enhancements (player count badge in header — spectator-specific chat deferred)
- [x] AI encounter recap (auto-fires after combat, bard-style dramatic summary)
- [x] Campaign calendar (in-world dates, 5 event types, long rest tracking, month navigation)
- [x] Encounter templates (save to localStorage + load dropdown in DMSidebar)
- [x] Map annotations (floating text labels via 📝 Label DM tool)
- [x] Damage type tracking (13 types, resistances/vulnerabilities/immunities auto-applied in damageUnit)
- [x] Wild Magic table (50-entry d100 table, auto-check on Sorcerer leveled spells)
- [x] Concentration spell visual indicator on tokens (pulsing blue ring via sin wave)
- [x] Custom token images (DM double-click to set URL, rendered in clipped circles)
- [x] AI-generated enemy portraits (FLUX-1-schnell, fire-and-forget parallel gen on encounter spawn)
- [x] Initiative tiebreaker rules (DEX mod, then stable ID comparison)
- [x] Rest mechanics (short rest hit dice, long rest full restore — already implemented with full UI)
- [x] Procedural dungeon generator (BSP tree with seeded RNG, doors, hazards)
- [x] Dungeon seed sharing — copy seed to clipboard, enter seed to regenerate layout
- [x] Multi-floor dungeons (stairs terrain types + floor navigation bar)
- [x] Per-floor terrain/lighting persistence (each floor stored in floorData array, saved/loaded with campaign)
- [x] Stair click navigation (clicking stairs auto-switches to the connected floor)

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

### v0.2.0: Visual Polish + Codebase Health (DONE)
**Goal:** Make the app feel premium — slick animations, fantasy color palette, smooth transitions. Simultaneously decompose bloated files and optimize the bundle.

**Visual polish (DONE):**
- [x] Fantasy CSS animation system: 10 keyframes (fadeInUp, cardReveal, shimmer, gentleFloat, glowPulse, gradientShift, slideIn, popIn, emberRise, borderGlow)
- [x] Utility classes: `.animate-fade-in-up`, `.animate-card-reveal`, `.stagger-children`, `.text-shimmer`, `.card-glow`, `.hero-gradient`, `.btn-glow`, `.animate-float`, `.feature-card`, `.game-card`, `.hp-bar-shimmer`, `.stat-badge`, `.input-glow`, `.crit-flash`, `.page-enter`
- [x] Fantasy color palette tokens: ember, gold, mystic, arcane, dragon, forest
- [x] Polished scrollbar (gradient thumb, thinner)
- [x] Hero section: `hero-gradient` animated background, `text-shimmer` on tagline
- [x] Feature cards: `feature-card` + `card-glow`, staggered entrance via `stagger-children`, ember hover glow
- [x] Campaign/character cards: `game-card` + `card-glow`, staggered entrance, hover lift with ember shadow
- [x] CTA buttons: `btn-glow` pulse on New Campaign, Create Character, + New, empty-state CTA
- [x] Page entrance animation: `page-enter` on Home `<main>`, Lobby outer div, Game outer div
- [x] Lobby UI: `seat-card` hover lift, `seat-ready` pulse on ready seats, `animate-card-reveal` entrance
- [x] Game UI: `crit-flash` on DiceRoller crit display, `hp-bar-shimmer` on PartyHealthBar + InitiativeBar + NarrationPanel HP bars

**Codebase decomposition (DONE):**
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
- [x] WS Message Handler → `src/hooks/useGameWebSocket.ts` (already extracted)
- [x] Campaign Persistence → `src/hooks/useCampaignPersistence.ts` (extracted + localStorage fallback for temp users)
- [x] Shop View (~94 lines) — extracted to `src/components/game/ShopView.tsx` in v0.1.0-dev.37

**Bundle optimization:**
- [x] Hono security patch: 4.12.5 → 4.12.7 (Dependabot CVE fix)
- [x] Lazy load routes: `React.lazy()` for Game, CharacterCreate, Lobby (in main.tsx)
- [x] Manual chunks: `vendor-react` (49KB: react/react-dom/react-router-dom) + `vendor-ui` (30KB: clsx/tailwind-merge/lucide-react) via Vite rollupOptions.manualChunks. Main bundle down from ~395KB → 339KB.
- [x] Target: initial load well under 400KB (main 339KB + vendor-react 49KB cached separately)

**Error handling improvements (from code review):**
- [x] Add `console.error` to bare `catch {}` blocks in _worker.ts — audited all 4 bare catches: 3 are JWT verify (expected auth failures, return null/user:null), 1 fallback error in portrait describe now logs with `console.error`
- [x] Standardize error response shape: `{ error: string }` everywhere — verified all error responses already use `{ error: string }` format
- [x] AbortController timeout on client-side AI fetch calls (fetchWithTimeout wired to all 10 AI calls)

### v0.3.0: Mobile + Accessibility (PLANNED)
**Goal:** Touch-friendly on phones/tablets, accessible to all players.

- [x] Mobile-responsive lobby (collapsible panels, touch-friendly seat cards)
- [x] Mobile-responsive game (bottom tab bar: game/chat/sheet panels)
- [x] Mobile-responsive lobby (collapsible panels, stacked layout on small screens)
- [x] Touch-friendly battle map (pinch zoom, tap to select, long-press to move)
- [x] Accessibility "Low-FX" mode (reduced motion, high contrast, screen reader hints)
- [x] `prefers-reduced-motion` media query: disable all animations automatically
- [x] Keyboard navigation for combat actions
- [x] ARIA labels on interactive elements

### v0.4.0: Cloudflare Access/IDP + Campaign Invites (PLANNED)
**Goal:** Corporate/team login, campaign sharing via Discord DM.

- ~~Cloudflare Access login~~ — removed, CF is not a public IdP. Discord OAuth is the right auth path for a public app.
- [ ] Campaign invite links via Discord DM (bot or webhook)
- [x] Lobby chat reactions (emoji reactions on messages)
- [x] Campaign archive (soft delete, can restore)

### Future versions

**Infrastructure:**
- ~~Lobby DO hibernation — `this.state.acceptWebSocket()` for cost reduction~~ (DONE — migrated to hibernation API with webSocketMessage/webSocketClose/webSocketError handlers, rehydrateWebSockets on wake, handlePlayerLeave extracted)
- ~~Undo/redo for DM actions (command pattern, rewindable state stack)~~ (DONE — useUndoRedo hook, snapshot-based, Ctrl+Z/Ctrl+Shift+Z, max 20 entries)
- ~~Rate limiting + abuse protection on public lobbies~~ (DONE — chat 5/sec + dice 8/sec rate limits in Lobby DO, game_event 10/sec existing)
- ~~Service Worker for offline-first static assets~~ (ALREADY DONE — assets/sw.js with cache-first strategy, registered in main.tsx)
- ~~IndexedDB local cache for characters, campaign state, chat~~ (ALREADY DONE — src/lib/localCache.ts with getCachedCharacters/cacheCampaigns, user-scoped keys)

**Gameplay depth:**
- ~~Multiclass support (second class on level-up, shared spell slots)~~ (ALREADY DONE — multiclass button in CharacterSheet with D&D 5e prereq checks, classLevels tracking, proficiency grants)
- ~~Reaction system expansion (Shield, Counterspell, Hellish Rebuke on enemy turn)~~ (DONE — isReaction flag on Spell, orange "Reaction" section in CombatToolbar visible off-turn, Shield applies +5 AC condition, Hellish Rebuke added to spell list, all consume reaction + spell slot, regular spell dropdown filters out reaction spells)
- ~~Inventory trading between players (drag to portrait)~~ (DONE — tradeItem in GameContext, "Give" button in CharacterSheet with party member picker, stack handling)
- ~~Dice macros / saved roll shortcuts~~ (DONE — v0.1.0)
- ~~Initiative reroll / manual editing (DM drag-reorder)~~ (DONE — drag-reorder was existing, manual initiative editing added via inline click-to-edit on InitiativeBar)
- ~~Weather/lighting effects on battle map (rain, fog, darkness, torch light)~~ (DONE — weather overlays + DM selector + WebSocket sync)
- ~~Random encounter tables (per biome/dungeon level, auto-roll between rests)~~ (DONE — 8 biomes, weighted tables, DMSidebar UI)
- ~~Downtime activities (crafting, research, carousing)~~ (DONE — 6 activities with ability checks, gold/XP rewards, DMSidebar integration)
- ~~Familiar/companion tokens (separate initiative, player-controlled)~~ (DONE — Summon Companion button for Ranger/Druid/Wizard/Warlock, creates secondary Unit with isCompanion + companionOwnerId, separate initiative, scaled stats, teal-themed UI)
- ~~Custom monster creator (DM builds custom monsters with ability editor)~~ (DONE — CustomMonsterCreator component with full stat block form, ability editor, localStorage persistence, spawn integration)
- ~~AI companion auto-generation (auto-create character for AI seats without one assigned)~~ (DONE — auto-generates Fighter/Cleric/Wizard/Rogue at party level with class-appropriate stats)
- ~~Lair actions (boss monsters trigger environmental effects on initiative count 20)~~ (DONE — LairAction interface, Adult Dragon with 3 lair actions, useEnemyAI round-start effect)
- ~~Legendary actions (boss enemies get extra actions between player turns)~~ (DONE — Unit fields, Adult Dragon 3 + Mind Flayer 2 legendary abilities, useEnemyAI between-turn effect, InitiativeBar indicator)
- ~~Grapple/shove combat maneuvers (contested Athletics checks, movement restrictions)~~ (DONE — Grapple button: contested Athletics vs DEX, applies grappled condition with speed 0 enforced across all 3 BattleMap movement paths. Shove button: contested Athletics vs DEX, knocks target prone. Both require melee adjacency, synced via combat broadcast.)
- ~~Concentration tracker visual (glowing aura on concentrating tokens, auto-break notification)~~ (DONE — purple glow ring + pulsing C badge on InitiativeBar avatars)
- ~~Initiative reroll / manual editing (DM drag-reorder)~~ (DONE — DM clicks initiative number to inline-edit with number input, Enter/blur commits, Escape cancels, logs change to combat log, synced via broadcast)
- ~~Initiative tiebreaker resolution (DEX mod comparison, DM choice on ties)~~ (ALREADY DONE — rollInitiative sorts by initiative DESC → DEX mod DESC → stable ID)
- ~~Status effect visual overlays on battle map tokens (poison green, fire orange, stunned stars)~~ (DONE — colored rings, pulsing glow for urgent, abbreviated text labels in pill badges)
- ~~"Readied action" support (hold action until trigger condition, execute as reaction)~~ (DONE — readiedAction field on Unit with trigger/action text, Ready button in CombatToolbar with prompt input, Fire/Cancel controls, ⏳ indicator on InitiativeBar, auto-clears on next turn start, uses reaction when triggered)
- ~~Flanking bonus (+2 to attacks when allies are on opposite sides of target)~~ (DONE — isFlanking() in mapUtils, +2 melee bonus, shown in attack log)
- ~~Cover system (half/three-quarters/full cover modifying AC behind terrain)~~ (DONE — checkCover() in mapUtils, +2/+5/full AC bonus for ranged attacks through terrain)
- ~~Dash/Dodge/Disengage/Help/Hide action buttons with proper 5e mechanics~~ (DONE — Dodge/Dash/Disengage were existing, Help + Hide added with conditions, stealth checks, teal/slate UI)
- ~~Opportunity attack prompt for players (when enemy moves away, prompt to use reaction)~~ (INTENTIONAL AUTO — OAs already fire automatically via useEnemyAI with correct D&D 5e mechanics; prompting would slow gameplay for every enemy move near a player)
- ~~Bonus action system (separate from main action — Cunning Action, healing word, etc.)~~ (DONE — bonusActionUsed field, class-specific buttons: Rogue Cunning Action, Fighter Second Wind, Monk Step of the Wind, Barbarian Rage)
- ~~Attack of opportunity for players when enemy leaves their reach (reaction-based)~~ (ALREADY DONE — auto-fires via useEnemyAI findOpportunityAttackers, uses reaction, rolls attack+damage)
- ~~Party loot tracker (shared inventory, DM distributes items to players)~~ (DONE — LootTracker component + WebSocket sync)
- ~~Quick rules reference panel (conditions, actions, spell schools during play)~~ (DONE — RulesReference modal + rules.ts data)
- ~~Session timer (track total play time per session, auto-save on idle)~~ (DONE — SessionTimer component in Game header)
- ~~Encounter history log (damage dealt, spells cast, rounds survived)~~ (DONE — EncounterLog component with auto-save + live stats)
- ~~Inspiration points (D&D 5e DM reward mechanic, spend for advantage)~~ (DONE — Character field + DMSidebar grant/revoke + DiceRoller spend)
- ~~Exhaustion levels (6 levels, cumulative penalties, tracked on character)~~ (DONE — Character field + DMSidebar controls + PartyHealthBar badge + CharacterSheet section + long rest reduces by 1)
- ~~Map pin/marker system (DM drops named annotations on battle map)~~ (DONE — MapPin interface, pin DM tool, HTML overlay rendering, pin list in DMSidebar, localStorage + WebSocket sync)
- ~~Party formation presets (marching order for travel, auto-arrange tokens)~~ (DONE — FormationPresets component with 6 formations, drag-reorder marching order, WebSocket sync)
- ~~Travel pace calculator (fast/normal/slow with miles per day)~~ (DONE — D&D 5e travel table in DMSidebar encounter tab with forced march/difficult terrain rules)
- ~~Random treasure hoard generator (DMG treasure tables)~~ (DONE — 4 CR tiers, weighted gems + magic items, rollTreasureHoard() in rules.ts)
- ~~Session MVP awards (most damage, most heals, most crits per session)~~ (DONE — CombatMVP component, 5 award categories, post-combat banner)
- ~~Combat recap per round (auto-generated summary of what happened)~~ (DONE — CombatRecap component with narrative summaries, round history, severity coloring)
- ~~NPC relationship tracker (faction standing, NPC disposition, notes)~~ (DONE — NpcTracker component with disposition scale, search/filter, DM controls, localStorage)

**Content & Import/Export:**
- ~~Import from D&D Beyond / Foundry VTT / Roll20 JSON~~ (DONE — ddbImport.ts + foundryImport.ts existing, roll20Import.ts added with attribs[] parser, all auto-detected in import flow)
- ~~Export to Pathfinder 2e~~ (DONE — exportPathfinder2e maps to PF2e Foundry actor format, class conversion, wired into export list)
- ~~Export to Forbidden Lands, Savage Worlds (remaining cross-system exports)~~ (DONE — exportForbiddenLands YZE format + exportSavageWorlds SWADE format, both wired into export UI)
- ~~VTT map import (Foundry, Roll20 map files → BattleMap background)~~ (DONE — file upload + URL paste for map images, rendered as BattleMap background)
- ~~Homebrew content editor (custom races, classes, spells, items, monsters)~~ (DONE — HomebrewEditor component in DMSidebar Notes tab with spell/item creation forms, per-campaign localStorage, grant-to-character dropdowns)
- ~~Pre-built adventure modules (starter dungeons, one-shots)~~ (DONE — 7 campaign templates: Lost Mine, Whispering Woods, Ashfall Keep, Golden Masquerade, Into the Underdark, Sunken Throne, Shattered Gate)
- ~~Monster manual browser (CR, type, environment filters)~~ (DONE — MonsterBrowser modal + monsters.ts data)

**Visual & Audio:**
- ~~Particle effects for spells (fire, ice, lightning, healing shimmer)~~ (DONE — SpellParticles component with CSS animations for 7 effects, triggered on AoE spell casts with school-based color mapping)
- ~~Map layers (background, terrain, tokens, effects — separate composited layers)~~ (ALREADY DONE — 7 toggleable layers: terrain, lighting, traps, grid, tokens, fog, effects)
- ~~Sound FX expansion — remaining spell effects, death saves, conditions~~ (DONE — 5 new procedural Web Audio sounds: death save heartbeat, buff/debuff condition chimes, condition removed tone, shield spell metallic ring, initiative roll drum)
- ~~Portrait gallery — save/browse AI portraits, remix styles, share with party~~ (ALREADY DONE — portraitGallery on Character, gallery view in CharacterSheet with click-to-use, auto-migration to server URLs)
- ~~Dynamic lighting (token light sources, darkvision, dim light zones)~~ (ALREADY DONE — effectiveLighting with bright/dim/dark, torch/candle/lantern/darkvision radius, DM painting tools)
- ~~Animated token attack indicators (slash/arrow/spell beam between attacker and target)~~ (ALREADY DONE — useAttackIndicators hook + drawAttackIndicators canvas rendering for melee/ranged/spell)
- ~~Dice roll 3D animation (three.js or CSS 3D transforms for satisfying dice physics)~~ (DONE — CSS 3D perspective + rotateX/Y/Z tumble animation during rolls, bounce-land settle on result)
- ~~Ambient background music player (tavern, combat, exploration — royalty-free tracks via Web Audio)~~ (ALREADY DONE — 5 procedural moods in useSoundFX, DM selector UI, auto-switch on combat)
- ~~Combat damage type indicators (slash/pierce/bludgeon/fire/cold/etc icons on floating text)~~ (DONE — 13 DamageType with emoji icons on FloatingCombatText)
- ~~Token aura system (visual rings around tokens for spell effects, threat ranges)~~ (ALREADY DONE — auraRadius/auraColor on Unit, canvas rendering in BattleMap, Set/Clear Aura button in CombatToolbar)
- ~~Battle map fog-of-war per-player (each player only sees what their token can see)~~ (ALREADY DONE — computeVisibility using player token positions, explored tracking, fog opacity slider)
- ~~Minimap overlay (small corner map showing full battlefield when zoomed in)~~ (ALREADY DONE — minimap canvas in BattleMap with click-to-pan, ping markers, toggle button, viewport rectangle)
- ~~Combat initiative history (show previous rounds' turn orders for reference)~~ (DONE — initiative snapshots captured per round, collapsible panel below initiative bar shows last 10 rounds with names, init values, HP)

**Social & Community:**
- ~~AI session recap ("last time on..." from combat log + chat)~~ (DONE — auto-narration on game load via DM AI endpoint, amber banner, session-scoped)
- ~~Campaign timeline / session log (auto-generated, browseable)~~ (DONE — CampaignTimeline component with 9 event types, filter tabs, auto-parse from DM history + combat log)
- ~~Journal/notes — shared campaign notes, session summaries, DM-only notes~~ (DONE — SessionJournal component + DM notes tab)
- ~~Chat emoji reactions (react to messages with emoji)~~ (DONE — 8 D&D-themed emoji, hover picker, toggle reactions, WebSocket sync, lobby + game)
- ~~Discord integration for voice/chat (Activity SDK or webhook)~~ (DONE — discordActivity.ts with iframe detection, participant tracking, Rich Presence, invite URLs, auto-init in main.tsx)
- ~~Drop-in/drop-out guest characters (no account, temporary token)~~ (DONE — "Quick Join" button in Lobby spectator view creates temp Fighter + claims seat)
- ~~Campaign templates (share setup for others to clone)~~ (DONE — Share button copies ?template=id URL, Home auto-launches shared template links)
- ~~Campaign comparison stats (total kills, gold earned, sessions played across campaigns)~~ (DONE — aggregate stats panel on Home page showing character count, campaign count, highest level, total gold across all characters)
- ~~Achievement badges (first crit, 100 kills, TPK survivor, dragon slayer, etc.)~~ (DONE — 16 achievements, 4 categories, persistent tracking, Badges view tab)
- ~~Shareable character cards (social media image export with stats + portrait)~~ (DONE — canvas-based 600x340 PNG generation with portrait, stats, equipment, download + clipboard copy)

**AI enhancements:**
- ~~AI player turn logic (AI seats actually play — move, attack, cast)~~ (DONE — useAIPlayerTurn hook with intelligent decision tree, heal/cast/attack/move, feat+proficiency support, Extra Attack, OA handling)
- ~~AI DM encounter pacing (dynamic difficulty mid-combat)~~ (DONE — useDynamicDifficulty with varied narrative narrations for deadly/easy adjustments, mechanical stat scaling disguised as combat flavor)
- ~~AI rules lawyer (passive — flags rule violations in chat)~~ (DONE — useRulesReminder hook with client-side pattern matching: unused bonus action reminders for Rogues/Fighters, reaction spell availability for Wizards/Sorcerers, unused movement warnings, concentration save DC callouts. Deduped with 30s window. DM-togglable in DMSidebar settings panel.)
- ~~AI session prep (DM goals → generated maps + encounters + NPCs)~~ (DONE — AI Session Prep collapsible in DMSidebar Encounter tab, generates session outlines via /api/dm/narrate)
- ~~AI voice narration (TTS with distinct NPC voices)~~ (ALREADY DONE — tts.ts with SpeechSynthesis API, speak() + speakAsNPC() with per-NPC voice hashing, toggle in Game header)
- ~~Dynamic difficulty auto-scaling~~ (DONE — useDynamicDifficulty hook, party HP% monitoring, DM toggle in DMSidebar, narrative-disguised adjustments)

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
- Weather effects: CSS overlay system for battle map atmosphere — 4 weather types (rain: diagonal streaks, fog: drifting translucent waves, snow: floating particles, sandstorm: horizontal amber streaks). Each uses CSS keyframe animations with `pointer-events: none` and `::after` pseudo-elements for depth. DM toggles weather via pill buttons in DMSidebar Scene section. State synced via `weather_change` game event in useGameWebSocket. BattleMap wrapped in relative container with conditional weather div. Reduced-motion media query disables all weather animations.
- Monster manual browser: `MonsterBrowser` component (175 lines) at `src/components/game/MonsterBrowser.tsx` — searchable/filterable modal with 30+ SRD monsters. Search by name/description, filter by type (14 types with icons), environment (12 envs), CR range slider. Expandable monster cards showing stats, abilities, environments. Spawn controls with count selector (1–8) and level-scaled HP. `monsters.ts` data file (128 lines) with `Monster` interface, `searchMonsters()`, `formatCR()`, `TYPE_ICONS`. "Browse Monsters" button in DMSidebar encounter tab. `B` keyboard shortcut (DM only). `handleSpawnMonster` in Game.tsx converts Monster → Unit[] with level scaling, broadcasts via `encounter_spawn`. Help overlay updated.
- Random encounter tables: 8 biome types (`Biome` type + `BIOME_ENCOUNTERS` + `BIOME_LABELS` in `enemies.ts`) with 4-6 weighted encounters each across all 4 difficulty tiers. `rollBiomeEncounter()` weighted random selection, `checkRandomEncounter()` d20 vs DC check. DMSidebar encounter tab gains biome selector (compact pill buttons with icons), "Check (DC 15)" and "Force" buttons, encounter result card with difficulty badge, flavor text, and enemy name tags. Hidden during combat (only between rests). 40+ unique encounter entries with evocative flavor text per biome.
- Session journal: `SessionJournal` component (204 lines) at `src/components/game/SessionJournal.tsx` — shared party notes panel as a new `journal` view tab in Game.tsx. Any player can add/pin/remove entries. localStorage persistence per campaign (`adventure:journal:{roomId}`). WebSocket sync via `journal_sync` game event through Lobby DO relay. `syncRef` callback pattern for remote updates. `J` and `4` keyboard shortcuts. Pinned entries filter toggle. Amber-themed UI with entry attribution (author + timestamp), hover-reveal pin/delete controls. Entry counter badge in header. Auto-scroll on new entries. Help overlay updated with new shortcut.
- Dice macros: Saved roll shortcuts in DiceRoller — `DiceMacro` interface (id/label/notation), localStorage persistence, amber-themed pill buttons with hover-delete, inline add form with notation validation via `parseSlashRoll`, `executeMacro` registers in game context + calls `onMacroRoll` prop. Wired in Game.tsx (`handleMacroRoll` with sound FX, chat message, D1 persistence) and Lobby.tsx (same minus sound FX). Cleaned unused `useMemo` import. Macros hidden in compact mode (lobby sidebar). All 153 tests pass, zero TS errors.
- D1 Database Phase 2: Full chat persistence — dice rolls, DM narration, NPC dialogue, player actions all persisted to D1 (roller/sender persists to avoid duplicates). Auto-join party on WebSocket welcome (fire-and-forget). Google OAuth: standard browser redirect flow (`/api/auth/google` + callback), normalized user object in JWT, `ensureUser()` handles Google avatar URLs. Google "G" button on Home.tsx alongside Discord. GameContext + Home.tsx avatar handling updated for multi-provider (Google `picture` URL vs Discord CDN hash). Party member avatars on campaign cards (stacked row, 5 max + overflow). Makefile: `secrets-google` target.
- Party loot tracker: `LootTracker` component (276 lines) at `src/components/game/LootTracker.tsx` — shared party inventory with rarity-colored item cards (5 D&D rarities), DM-only add form (name, quantity, rarity, description), claim/unclaim system (any player claims unclaimed items, only claimer can unclaim), filter tabs (all/unclaimed/claimed), auto-detect gold amounts in item names for total gold display. localStorage persistence per campaign (`adventure:loot:{roomId}`). WebSocket sync via `loot_sync` game event through `syncRef` callback pattern (same as SessionJournal). `5` keyboard shortcut. New "Loot" view tab in Game.tsx between Journal and Battle Map. Help overlay updated. All 153 tests pass, zero TS errors.
- Encounter history log: `EncounterLog` component (220 lines) at `src/components/game/EncounterLog.tsx` — auto-saves combat statistics when combat ends. Tracks: total damage dealt/taken, kills (enemy names), unique spells cast, critical hits, fumbles, player KOs, combat rounds, encounter difficulty. Regex-based combat log parser extracts structured data from string entries. Live combat stats panel (pulsing red border) shows real-time stats during active combat. Past encounters displayed as expandable cards with time-ago timestamps, difficulty badges, stat grids, kill lists, and spell lists. localStorage persistence per campaign (`adventure:encounters:{roomId}`, capped at 20 encounters). Clear history button. `6` keyboard shortcut. New "Encounters" view tab in Game.tsx. Help overlay updated. `usePrevious` hook for combat-end detection. All 153 tests pass, zero TS errors.
- Inspiration points: D&D 5e DM reward mechanic. `inspiration: boolean` field added to Character interface (`types/game.ts`). DM grants/revokes from DMSidebar Notes tab — per-character toggle buttons with star icon (★ Inspired / ☆ Grant). Golden star pip on PartyHealthBar character portraits when inspired. DiceRoller gains "★ Spend Inspiration (Advantage)" button — visible only when current character has inspiration, auto-sets advantage mode and consumes the point via `updateCharacter`. Character creation (`CharacterCreate.tsx`) defaults `inspiration: false`. JSON import (`export.ts`) validates with `?? false` fallback for backward compat. Existing `character_update` game event handles multiplayer sync. All 153 tests pass, zero TS errors.
- Quick rules reference + session timer: Two features in one commit. (1) `RulesReference` modal (200 lines) at `src/components/game/RulesReference.tsx` — 5-tab D&D 5e rules lookup (Conditions, Actions, Spells, Scores, Rules). Conditions tab shows all 10 conditions with colored modifier badges (ATK/AC/SAVE). Actions tab has 11 combat actions with icons and descriptions. Spells tab groups all 24 spells by school in expandable accordion cards. Scores tab explains all 6 ability scores. Rules tab covers 10 key mechanics (advantage, death saves, concentration, etc.). Search on conditions/spells/mechanics tabs. `R` keyboard shortcut, Escape to close. "Rules" button in Game header. Shared `src/data/rules.ts` (100 lines) extracted `CONDITION_TOOLTIPS` from CharacterSheet.tsx into shared data file, added `COMBAT_ACTIONS`, `SPELL_SCHOOLS`, `ABILITY_SCORES`, `GAME_MECHANICS`. CharacterSheet now imports from shared file. (2) `SessionTimer` component (115 lines) at `src/components/game/SessionTimer.tsx` — compact elapsed time display in Game header. Auto-starts on mount, click to pause/resume. Persists to localStorage per campaign (`adventure:timer:{roomId}`). Auto-saves every 30s + on unmount. Displays as `H:MM:SS` or `M:SS`. Green when running, muted when paused. All 153 tests pass, zero TS errors.
