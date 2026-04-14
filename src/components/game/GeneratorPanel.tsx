// GeneratorPanel — searchable, categorized DM toolbox
// Replaces the endless scrolling button list with organized tabs
import { useState, useMemo } from 'react';

interface GeneratorDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: 'combat' | 'world' | 'npcs' | 'story' | 'items' | 'misc';
  importPath: string;
  importName: string;
  formatName: string;
  isRandom?: boolean;
}

const GENERATORS: GeneratorDef[] = [
  // Combat & Encounter
  { id: 'lair-action', name: 'Lair Action', emoji: '🏰', description: 'Boss environmental actions', category: 'combat', importPath: '../../data/lairAction', importName: 'getRandomLairAction', formatName: 'formatLairAction', isRandom: true },
  { id: 'elemental-storm', name: 'Elemental Storm', emoji: '⛈️', description: 'Magical weather hazards', category: 'combat', importPath: '../../data/elementalStorm', importName: 'generateElementalStorm', formatName: 'formatStorm', isRandom: true },
  { id: 'caravan-ambush', name: 'Caravan Ambush', emoji: '🐪', description: 'Surprise attack scenarios', category: 'combat', importPath: '../../data/caravanAmbush', importName: 'generateCaravanAmbush', formatName: 'formatCaravanAmbush', isRandom: true },
  { id: 'monster-alliance', name: 'Monster Alliance', emoji: '🤝', description: 'Unlikely monster teams', category: 'combat', importPath: '../../data/monsterAlliance', importName: 'generateMonsterAlliance', formatName: 'formatAlliance', isRandom: true },
  { id: 'evolving-monster', name: 'Evolving Monster', emoji: '🧬', description: 'Creatures that adapt', category: 'combat', importPath: '../../data/monsterEvolution', importName: 'generateEvolvingMonster', formatName: 'formatEvolvingMonster', isRandom: true },
  { id: 'battlefield-aftermath', name: 'Battlefield Aftermath', emoji: '⚔️', description: 'Post-battle scenes', category: 'combat', importPath: '../../data/battlefieldAftermath', importName: 'generateBattlefieldAftermath', formatName: 'formatAftermath', isRandom: true },
  { id: 'lair-designer', name: 'Villain Lair', emoji: '🏛️', description: 'Boss dungeon layouts', category: 'combat', importPath: '../../data/villainLair', importName: 'generateVillainLair', formatName: 'formatLair', isRandom: true },
  { id: 'trap-corridor', name: 'Trap Corridor', emoji: '🕸️', description: 'Sequential trap gauntlets', category: 'combat', importPath: '../../data/trapCorridor', importName: 'generateTrapCorridor', formatName: 'formatTrapCorridor', isRandom: true },
  { id: 'battle-cry', name: 'Battle Cry', emoji: '📢', description: 'Inspiring combat shouts', category: 'combat', importPath: '../../data/battleCry', importName: 'generateBattleCry', formatName: 'formatBattleCry', isRandom: true },
  { id: 'death-scene', name: 'NPC Death Scene', emoji: '💀', description: 'Dramatic dying moments', category: 'combat', importPath: '../../data/npcDeathScene', importName: 'generateNpcDeathScene', formatName: 'formatDeathScene', isRandom: true },
  
  // World Building
  { id: 'enchanted-forest', name: 'Enchanted Forest', emoji: '🌲', description: 'Living woodlands', category: 'world', importPath: '../../data/enchantedForest', importName: 'generateEnchantedForest', formatName: 'formatForest', isRandom: true },
  { id: 'haunted-location', name: 'Haunted Location', emoji: '👻', description: 'Spirited places', category: 'world', importPath: '../../data/hauntedLocation', importName: 'generateHauntedLocation', formatName: 'formatHauntedLocation', isRandom: true },
  { id: 'ancient-ruin', name: 'Ancient Ruin', emoji: '🏛️', description: 'Forgotten architecture', category: 'world', importPath: '../../data/ancientRuinLayout', importName: 'generateAncientRuin', formatName: 'formatRuin', isRandom: true },
  { id: 'pocket-dimension', name: 'Pocket Dimension', emoji: '🎒', description: 'Tiny otherworlds', category: 'world', importPath: '../../data/pocketDimension', importName: 'generatePocketDimension', formatName: 'formatDimension', isRandom: true },
  { id: 'mirror-dimension', name: 'Mirror Dimension', emoji: '🪞', description: 'Reflected realities', category: 'world', importPath: '../../data/mirrorDimension', importName: 'generateMirrorDimension', formatName: 'formatMirrorDimension', isRandom: true },
  { id: 'clockwork-dungeon', name: 'Clockwork Dungeon', emoji: '⚙️', description: 'Mechanized lairs', category: 'world', importPath: '../../data/clockworkDungeon', importName: 'generateClockworkDungeon', formatName: 'formatClockworkDungeon', isRandom: true },
  { id: 'time-loop-dungeon', name: 'Time Loop Dungeon', emoji: '⏰', description: 'Groundhog Day lairs', category: 'world', importPath: '../../data/timeLoopDungeon', importName: 'generateTimeLoopDungeon', formatName: 'formatTimeLoop', isRandom: true },
  { id: 'magical-ecosystem', name: 'Magical Ecosystem', emoji: '🌿', description: 'Living environments', category: 'world', importPath: '../../data/magicalEcosystem', importName: 'generateMagicalEcosystem', formatName: 'formatEcosystem', isRandom: true },
  { id: 'planar-weather', name: 'Planar Weather', emoji: '🌌', description: 'Otherworldly climate', category: 'world', importPath: '../../data/planarWeather', importName: 'generatePlanarWeather', formatName: 'formatPlanarWeather', isRandom: true },
  { id: 'magical-anomaly', name: 'Magical Anomaly', emoji: '⚡', description: 'Reality distortions', category: 'world', importPath: '../../data/magicalAnomaly', importName: 'generateMagicalAnomaly', formatName: 'formatMagicalAnomaly', isRandom: true },
  
  // NPCs & Social
  { id: 'dragon-personality', name: 'Dragon Personality', emoji: '🐉', description: 'Wyrm temperaments', category: 'npcs', importPath: '../../data/dragonPersonality', importName: 'generateDragonProfile', formatName: 'formatDragonProfile', isRandom: true },
  { id: 'npc-voice', name: 'NPC Voice', emoji: '🗣️', description: 'Voice and accent', category: 'npcs', importPath: '../../data/npcVoiceAccent', importName: 'generateNpcVoice', formatName: 'formatVoiceProfile', isRandom: true },
  { id: 'npc-backstory', name: 'NPC Backstory', emoji: '📖', description: 'Life histories', category: 'npcs', importPath: '../../data/npcBackstoryGen', importName: 'generateNpcBackstory', formatName: 'formatBackstory', isRandom: true },
  { id: 'rival-party', name: 'Rival Party', emoji: '⚔️', description: 'Competing adventurers', category: 'npcs', importPath: '../../data/rivalParty', importName: 'generateRivalParty', formatName: 'formatRivalParty', isRandom: true },
  { id: 'npc-pet', name: 'NPC Pet', emoji: '🐕', description: 'Memorable companions', category: 'npcs', importPath: '../../data/npcPetCompanion', importName: 'generateNpcPet', formatName: 'formatPet', isRandom: true },
  { id: 'villain-monologue', name: 'Villain Monologue', emoji: '🎭', description: 'Boss speeches', category: 'npcs', importPath: '../../data/villainMonologue', importName: 'generateVillainMonologue', formatName: 'formatMonologue', isRandom: true },
  { id: 'oracle', name: 'Oracle Consultation', emoji: '🔮', description: 'Prophecy generator', category: 'npcs', importPath: '../../data/oracleConsultation', importName: 'generateOracleConsultation', formatName: 'formatOracle', isRandom: true },
  { id: 'tattoo-artist', name: 'Tattoo Artist', emoji: '🎨', description: 'Ink magic vendors', category: 'npcs', importPath: '../../data/tattooArtist', importName: 'generateTattooArtist', formatName: 'formatArtist', isRandom: true },
  { id: 'ancestral-spirit', name: 'Ancestral Spirit', emoji: '👴', description: 'Family ghosts', category: 'npcs', importPath: '../../data/ancestralSpirit', importName: 'generateAncestralSpirit', formatName: 'formatSpirit', isRandom: true },
  { id: 'relationship-web', name: 'Relationship Web', emoji: '🕸️', description: 'NPC connections', category: 'npcs', importPath: '../../data/npcRelationWeb', importName: 'generateRelationshipWeb', formatName: 'formatWeb', isRandom: true },
  
  // Story & Plot
  { id: 'cataclysm', name: 'Cataclysm Countdown', emoji: '☄️', description: 'Apocalyptic timers', category: 'story', importPath: '../../data/cataclysmCountdown', importName: 'generateCataclysm', formatName: 'formatCataclysm', isRandom: true },
  { id: 'prophecy', name: 'Ancient Prophecy', emoji: '📜', description: 'Foretold futures', category: 'story', importPath: '../../data/ancientProphecy', importName: 'generateAncientProphecy', formatName: 'formatProphecy', isRandom: true },
  { id: 'dark-bargain', name: 'Dark Bargain', emoji: '🤝', description: 'Deals with evil', category: 'story', importPath: '../../data/darkBargain', importName: 'generateDarkBargain', formatName: 'formatBargain', isRandom: true },
  { id: 'divine-quest', name: 'Divine Quest', emoji: '✨', description: 'God-given missions', category: 'story', importPath: '../../data/divineQuestGiver', importName: 'generateDivineQuest', formatName: 'formatDivineQuest', isRandom: true },
  { id: 'faction-quest', name: 'Faction Quest', emoji: '🏛️', description: 'Guild missions', category: 'story', importPath: '../../data/factionQuestChain', importName: 'generateFactionQuestChain', formatName: 'formatFactionQuestChain', isRandom: true },
  { id: 'political-marriage', name: 'Political Marriage', emoji: '💒', description: 'Alliance weddings', category: 'story', importPath: '../../data/politicalMarriage', importName: 'generatePoliticalMarriage', formatName: 'formatMarriage', isRandom: true },
  { id: 'exile-scenario', name: 'Exile Scenario', emoji: '🚫', description: 'Banishment stories', category: 'story', importPath: '../../data/exileScenario', importName: 'generateExileScenario', formatName: 'formatExile', isRandom: true },
  { id: 'prison-break', name: 'Prison Break', emoji: '🔓', description: 'Escape plans', category: 'story', importPath: '../../data/prisonBreak', importName: 'generatePrisonBreak', formatName: 'formatPrisonBreak', isRandom: true },
  { id: 'secret-society', name: 'Secret Society', emoji: '🤫', description: 'Hidden orders', category: 'story', importPath: '../../data/secretSociety', importName: 'generateSecretSociety', formatName: 'formatSociety', isRandom: true },
  
  // Items & Treasure
  { id: 'cursed-treasure', name: 'Cursed Treasure', emoji: '💎', description: 'Greed punishers', category: 'items', importPath: '../../data/cursedTreasure', importName: 'generateCursedTreasureHoard', formatName: 'formatHoard', isRandom: true },
  { id: 'haunted-item', name: 'Haunted Item', emoji: '👻', description: 'Possessed objects', category: 'items', importPath: '../../data/hauntedItem', importName: 'generateHauntedItem', formatName: 'formatHauntedItem', isRandom: true },
  { id: 'sentient-item', name: 'Sentient Item', emoji: '🗡️', description: 'Talking weapons', category: 'items', importPath: '../../data/sentientItem', importName: 'generateSentientItem', formatName: 'formatSentientItem', isRandom: true },
  { id: 'item-pet-peeve', name: 'Item Pet Peeve', emoji: '😤', description: 'Demanding magic items', category: 'items', importPath: '../../data/magicalPetPeeve', importName: 'generateMagicalPetPeeve', formatName: 'formatPetPeeve', isRandom: true },
  { id: 'armor-quirk', name: 'Armor Quirk', emoji: '🛡️', description: 'Living armor traits', category: 'items', importPath: '../../data/enchantedArmorQuirk', importName: 'generateArmorQuirk', formatName: 'formatArmorQuirk', isRandom: true },
  { id: 'weapon-rivalry', name: 'Weapon Rivalry', emoji: '⚔️', description: 'Competing blades', category: 'items', importPath: '../../data/weaponRivalry', importName: 'generateWeaponRivalry', formatName: 'formatRivalry', isRandom: true },
  { id: 'enchanted-food', name: 'Enchanted Food', emoji: '🍲', description: 'Magical meals', category: 'items', importPath: '../../data/enchantedFoodDrink', importName: 'generateEnchantedFood', formatName: 'formatFood', isRandom: true },
  { id: 'artifact-history', name: 'Artifact History', emoji: '🏺', description: 'Legendary item lore', category: 'items', importPath: '../../data/artifactHistory', importName: 'generateArtifactHistory', formatName: 'formatHistory', isRandom: true },
  { id: 'legendary-weapon', name: 'Legendary Weapon', emoji: '⚔️', description: 'Heroic armaments', category: 'items', importPath: '../../data/legendaryWeapon', importName: 'generateLegendaryWeapon', formatName: 'formatLegendaryWeapon', isRandom: true },
  
  // Misc Generators
  { id: 'court-case', name: 'Court Case', emoji: '⚖️', description: 'Legal drama', category: 'misc', importPath: '../../data/magicalCourtroom', importName: 'generateCourtCase', formatName: 'formatCase', isRandom: true },
  { id: 'teleport-mishap', name: 'Teleport Mishap', emoji: '✨', description: 'Gone wrong magic', category: 'misc', importPath: '../../data/teleportMishap', importName: 'generateTeleportMishap', formatName: 'formatMishap', isRandom: true },
  { id: 'magic-forecast', name: 'Magic Forecast', emoji: '🌤️', description: 'Arcane weather', category: 'misc', importPath: '../../data/magicalForecast', importName: 'generateMagicalForecast', formatName: 'formatForecast', isRandom: true },
  { id: 'tavern-event', name: 'Tavern Event', emoji: '🍺', description: 'Pub happenings', category: 'misc', importPath: '../../data/tavernEntertainment', importName: 'generateTavernEntertainment', formatName: 'formatEntertainment', isRandom: true },
  { id: 'beast-mount', name: 'Beast Mount', emoji: '🦅', description: 'Exotic steeds', category: 'misc', importPath: '../../data/beastMount', importName: 'generateBeastMount', formatName: 'formatMount', isRandom: true },
  { id: 'inheritance', name: 'Magical Inheritance', emoji: '📜', description: 'Estate surprises', category: 'misc', importPath: '../../data/magicalInheritance', importName: 'generateMagicalInheritance', formatName: 'formatInheritance', isRandom: true },
  { id: 'black-market', name: 'Black Market', emoji: '🏴‍☠️', description: 'Illegal goods', category: 'misc', importPath: '../../data/arcaneBlackMarket', importName: 'generateBlackMarketItem', formatName: 'formatBlackMarketItem', isRandom: true },
  { id: 'familiar-rebellion', name: 'Familiar Rebellion', emoji: '🐱', description: 'Pet uprising', category: 'misc', importPath: '../../data/familiarRebellion', importName: 'generateFamiliarRebellion', formatName: 'formatRebellion', isRandom: true },
  { id: 'survivor-camp', name: 'Survivor Camp', emoji: '⛺', description: 'Post-apoc refuge', category: 'misc', importPath: '../../data/apocalypseCamp', importName: 'generateApocalypseCamp', formatName: 'formatCamp', isRandom: true },
  { id: 'noble-scandal', name: 'Noble Scandal', emoji: '👑', description: 'Court gossip', category: 'misc', importPath: '../../data/nobleScandalGen', importName: 'generateNobleScandal', formatName: 'formatScandal', isRandom: true },
  { id: 'ancient-language', name: 'Ancient Language', emoji: '📚', description: 'Rune puzzles', category: 'misc', importPath: '../../data/ancientLanguageDecoder', importName: 'generateInscriptionPuzzle', formatName: 'formatPuzzle', isRandom: true },
  { id: 'quest-negotiation', name: 'Quest Negotiation', emoji: '💰', description: 'Reward haggling', category: 'misc', importPath: '../../data/questRewardNegotiation', importName: 'generateQuestNegotiation', formatName: 'formatNegotiation', isRandom: true },
  { id: 'magical-bond', name: 'Magical Bond', emoji: '🔗', description: 'Linked souls', category: 'misc', importPath: '../../data/magicalBond', importName: 'generateMagicalBond', formatName: 'formatBond', isRandom: true },
  { id: 'magical-library', name: 'Magical Library', emoji: '📚', description: 'Living archives', category: 'misc', importPath: '../../data/magicalLibraryCatalog', importName: 'generateLibrarySection', formatName: 'formatSection', isRandom: true },
  { id: 'dream-combat', name: 'Dream Combat', emoji: '💭', description: 'Psychic battles', category: 'misc', importPath: '../../data/dreamCombat', importName: 'generateDreamCombat', formatName: 'formatDreamCombat', isRandom: true },
  { id: 'planar-refugee', name: 'Planar Refugee', emoji: '🌌', description: 'Interdimensional displaced', category: 'misc', importPath: '../../data/planarRefugee', importName: 'generateRefugeeGroup', formatName: 'formatRefugeeGroup', isRandom: true },

  // Wave 66
  { id: 'planar-tavern', name: 'Planar Tavern', emoji: '🍺', description: 'Bars across the planes', category: 'world', importPath: '../../data/planarBarCrawl', importName: 'getRandomTavern', formatName: 'formatTavern', isRandom: true },
  { id: 'undead-uprising', name: 'Undead Uprising', emoji: '💀', description: 'Zombie outbreak phases', category: 'combat', importPath: '../../data/undeadUprising', importName: 'getRandomScenario', formatName: 'formatScenario', isRandom: true },
  { id: 'heist-complication', name: 'Heist Complication', emoji: '🔓', description: 'Mid-heist twists', category: 'story', importPath: '../../data/magicalHeistComplication', importName: 'getRandomComplication', formatName: 'formatComplication', isRandom: true },
  { id: 'monster-court', name: 'Monster Court', emoji: '👑', description: 'Dragon/vampire/lich courts', category: 'npcs', importPath: '../../data/monsterCourtEtiquette', importName: 'getRandomCourt', formatName: 'formatCourt', isRandom: true },
  { id: 'expedition-supply', name: 'Expedition Supply', emoji: '🎒', description: 'Travel supply loadouts', category: 'misc', importPath: '../../data/expeditionSupply', importName: 'buildExpeditionLoadout', formatName: 'formatLoadout' },
  { id: 'cursed-village', name: 'Cursed Village', emoji: '🏘️', description: 'Cursed settlement mysteries', category: 'story', importPath: '../../data/cursedVillage', importName: 'getRandomVillage', formatName: 'formatVillage', isRandom: true },

  // Wave 67
  { id: 'wizard-exam', name: 'Wizard Exam', emoji: '🎓', description: 'Magic school encounters', category: 'npcs', importPath: '../../data/magicalSchoolExam', importName: 'getRandomExam', formatName: 'formatExam', isRandom: true },
  { id: 'haunted-carnival', name: 'Haunted Carnival', emoji: '🎪', description: 'Creepy carnival adventures', category: 'world', importPath: '../../data/hauntedCarnival', importName: 'getRandomCarnival', formatName: 'formatCarnival', isRandom: true },
  { id: 'bounty-contract', name: 'Bounty Contract', emoji: '🎯', description: 'Target dossiers', category: 'story', importPath: '../../data/bountyHunterContract', importName: 'getRandomContract', formatName: 'formatContract', isRandom: true },
  { id: 'diplomatic-crisis', name: 'Diplomatic Crisis', emoji: '🏛️', description: 'International incidents', category: 'story', importPath: '../../data/diplomaticIncident', importName: 'getRandomIncident', formatName: 'formatIncident', isRandom: true },
  { id: 'dream-realm', name: 'Dream Realm', emoji: '💭', description: 'Dreamscape adventures', category: 'world', importPath: '../../data/dreamRealmAdventure', importName: 'getRandomDream', formatName: 'formatDream', isRandom: true },
  { id: 'trial-ordeal', name: 'Trial by Ordeal', emoji: '⚖️', description: 'Divine judgment encounters', category: 'story', importPath: '../../data/magicalTrialByOrdeal', importName: 'getRandomTrial', formatName: 'formatTrial', isRandom: true },

  // Wave 68
  { id: 'abandoned-mine', name: 'Abandoned Mine', emoji: '⛏️', description: 'Mine dungeon crawls', category: 'world', importPath: '../../data/abandonedMine', importName: 'getRandomMine', formatName: 'formatMine', isRandom: true },
  { id: 'magical-bazaar', name: 'Magical Bazaar', emoji: '🏪', description: 'Planar marketplace', category: 'world', importPath: '../../data/magicalBazaar', importName: 'getRandomBazaar', formatName: 'formatBazaar', isRandom: true },
  { id: 'magical-parasite', name: 'Magical Parasite', emoji: '🦠', description: 'Symbiotic creatures', category: 'items', importPath: '../../data/magicalParasite', importName: 'getRandomParasite', formatName: 'formatParasite', isRandom: true },
  { id: 'cult-recruitment', name: 'Cult Recruitment', emoji: '🕯️', description: 'Cult lure tactics', category: 'story', importPath: '../../data/cultRecruitment', importName: 'getRandomCult', formatName: 'formatCult', isRandom: true },
  { id: 'academy-professor', name: 'Academy Professor', emoji: '🎓', description: 'Magic school faculty', category: 'npcs', importPath: '../../data/magicalAcademyFaculty', importName: 'getRandomProfessor', formatName: 'formatProfessor', isRandom: true },
  { id: 'library-guardian', name: 'Library Guardian', emoji: '📚', description: 'Knowledge protectors', category: 'world', importPath: '../../data/ancientLibraryGuardian', importName: 'getRandomGuardian', formatName: 'formatGuardian', isRandom: true },

  // Wave 69
  { id: 'trickster-spirit', name: 'Trickster Spirit', emoji: '🦊', description: 'Mischievous fey pranks', category: 'npcs', importPath: '../../data/tricksterSpirit', importName: 'getRandomSpirit', formatName: 'formatSpirit', isRandom: true },
  { id: 'living-labyrinth', name: 'Living Labyrinth', emoji: '🏰', description: 'Sentient dungeons', category: 'world', importPath: '../../data/livingLabyrinth', importName: 'getRandomLabyrinth', formatName: 'formatLabyrinth', isRandom: true },
  { id: 'ghost-ship', name: 'Ghost Ship', emoji: '⚓', description: 'Haunted vessels', category: 'world', importPath: '../../data/ghostShip', importName: 'getRandomShip', formatName: 'formatShip', isRandom: true },
  { id: 'forgotten-god', name: 'Forgotten God', emoji: '✨', description: 'Fading deities', category: 'npcs', importPath: '../../data/forgottenGod', importName: 'getRandomGod', formatName: 'formatGod', isRandom: true },
  { id: 'failed-prophecy', name: 'Failed Prophecy', emoji: '🔮', description: 'Prophecies gone wrong', category: 'story', importPath: '../../data/failedProphecy', importName: 'getRandomProphecy', formatName: 'formatProphecy', isRandom: true },
];

interface GeneratorPanelProps {
  onAddDmMessage: (text: string) => void;
}

const CATEGORY_CONFIG = {
  combat: { label: 'Combat', color: 'red', icon: '⚔️' },
  world: { label: 'World', color: 'emerald', icon: '🌍' },
  npcs: { label: 'NPCs', color: 'cyan', icon: '👤' },
  story: { label: 'Story', color: 'purple', icon: '📖' },
  items: { label: 'Items', color: 'amber', icon: '💎' },
  misc: { label: 'Misc', color: 'slate', icon: '🎲' },
} as const;

export default function GeneratorPanel({ onAddDmMessage }: GeneratorPanelProps) {
  const [activeTab, setActiveTab] = useState<keyof typeof CATEGORY_CONFIG>('combat');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredGen, setHoveredGen] = useState<string | null>(null);

  const filteredGenerators = useMemo(() => {
    return GENERATORS.filter((gen) => {
      const matchesCategory = gen.category === activeTab;
      const matchesSearch = searchTerm === '' || 
        gen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gen.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  const handleGenerate = async (gen: GeneratorDef) => {
    try {
      const module = await import(gen.importPath);
      const generatorFn = module[gen.importName];
      const formatterFn = module[gen.formatName];
      
      if (!generatorFn || !formatterFn) {
        console.error(`Missing functions for ${gen.name}`);
        return;
      }
      
      // Special case: expedition supply takes (partySize, days) args
      const result = gen.id === 'expedition-supply' ? generatorFn(4, 7) : generatorFn();
      const formatted = formatterFn(result);
      onAddDmMessage(formatted);
    } catch (error) {
      console.error(`Failed to generate ${gen.name}:`, error);
    }
  };

  const colorMap: Record<string, { bg: string; border: string; text: string; hover: string }> = {
    red: { bg: 'bg-red-900/20', border: 'border-red-600/30', text: 'text-red-400', hover: 'hover:bg-red-800/30' },
    emerald: { bg: 'bg-emerald-900/20', border: 'border-emerald-600/30', text: 'text-emerald-400', hover: 'hover:bg-emerald-800/30' },
    cyan: { bg: 'bg-cyan-900/20', border: 'border-cyan-600/30', text: 'text-cyan-400', hover: 'hover:bg-cyan-800/30' },
    purple: { bg: 'bg-purple-900/20', border: 'border-purple-600/30', text: 'text-purple-400', hover: 'hover:bg-purple-800/30' },
    amber: { bg: 'bg-amber-900/20', border: 'border-amber-600/30', text: 'text-amber-400', hover: 'hover:bg-amber-800/30' },
    slate: { bg: 'bg-slate-700/30', border: 'border-slate-500/30', text: 'text-slate-300', hover: 'hover:bg-slate-600/30' },
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search bar */}
      <div className="px-3 py-2 border-b border-slate-700">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search generators..."
          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 placeholder:text-slate-600 focus:border-[#F38020] focus:outline-none"
        />
      </div>

      {/* Category tabs */}
      <div className="flex border-b border-slate-700">
        {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const isActive = activeTab === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-1 px-2 py-2 text-[10px] font-semibold transition-all ${
                isActive
                  ? 'bg-slate-800 text-slate-200 border-b-2 border-[#F38020]'
                  : 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/50'
              }`}
            >
              <span className="mr-1">{config.icon}</span>
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Generator grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2">
          {filteredGenerators.map((gen) => {
            const colors = colorMap[CATEGORY_CONFIG[gen.category].color];
            return (
              <button
                key={gen.id}
                onClick={() => handleGenerate(gen)}
                onMouseEnter={() => setHoveredGen(gen.id)}
                onMouseLeave={() => setHoveredGen(null)}
                className={`relative p-2 rounded border text-left transition-all ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">{gen.emoji}</span>
                  <span className="text-[10px] font-semibold leading-tight">{gen.name}</span>
                </div>
                
                {/* Tooltip */}
                {hoveredGen === gen.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[9px] text-slate-300 whitespace-nowrap z-10">
                    {gen.description}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {filteredGenerators.length === 0 && (
          <p className="text-center text-[10px] text-slate-500 py-8">
            No generators match your search
          </p>
        )}
      </div>

      {/* Stats footer */}
      <div className="px-3 py-2 border-t border-slate-700 text-[9px] text-slate-500 text-center">
        {GENERATORS.length} generators across 6 categories
      </div>
    </div>
  );
}
