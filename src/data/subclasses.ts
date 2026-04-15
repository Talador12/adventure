// PHB subclass options per class with the level they are gained.
import type { CharacterClass } from '../types/game';

export interface SubclassOption {
  id: string;
  name: string;
  description: string;
  level: number; // character level at which this subclass is chosen
}

// Level at which each class gains its subclass (PHB)
export const SUBCLASS_LEVEL: Record<CharacterClass, number> = {
  Barbarian: 3,
  Bard: 3,
  Cleric: 1,
  Druid: 2,
  Fighter: 3,
  Monk: 3,
  Paladin: 3,
  Ranger: 3,
  Rogue: 3,
  Sorcerer: 1,
  Warlock: 1,
  Wizard: 2,
};

export const SUBCLASS_OPTIONS: Record<CharacterClass, SubclassOption[]> = {
  Barbarian: [
    { id: 'berserker', name: 'Path of the Berserker', description: 'Channel raw fury into a frenzy that lets you attack as a bonus action.', level: 3 },
    { id: 'totem-warrior', name: 'Path of the Totem Warrior', description: 'Draw on spirit animals for resistance, senses, and auras.', level: 3 },
    { id: 'ancestral-guardian', name: 'Path of the Ancestral Guardian', description: 'Summon ancestral spirits to shield your allies from harm.', level: 3 },
  ],
  Bard: [
    { id: 'lore', name: 'College of Lore', description: 'Master additional skills and steal spells from any class list.', level: 3 },
    { id: 'valor', name: 'College of Valor', description: 'Inspire allies in battle with medium armor, shields, and extra attacks.', level: 3 },
    { id: 'glamour', name: 'College of Glamour', description: 'Weave fey magic to charm and command with otherworldly grace.', level: 3 },
  ],
  Cleric: [
    { id: 'life', name: 'Life Domain', description: 'Supreme healer with bonus healing and heavy armor proficiency.', level: 1 },
    { id: 'light', name: 'Light Domain', description: 'Wield radiant fire and impose disadvantage on attacks against you.', level: 1 },
    { id: 'war', name: 'War Domain', description: 'Martial prowess with bonus attacks and guided strikes.', level: 1 },
    { id: 'knowledge', name: 'Knowledge Domain', description: 'Gain expertise in knowledge skills and read thoughts.', level: 1 },
  ],
  Druid: [
    { id: 'land', name: 'Circle of the Land', description: 'Recover spell slots on short rest and gain terrain-themed bonus spells.', level: 2 },
    { id: 'moon', name: 'Circle of the Moon', description: 'Transform into powerful combat beasts with Wild Shape.', level: 2 },
    { id: 'shepherd', name: 'Circle of the Shepherd', description: 'Summon spirit totems that empower and heal your allies.', level: 2 },
  ],
  Fighter: [
    { id: 'champion', name: 'Champion', description: 'Improved criticals on 19-20 and remarkable athleticism.', level: 3 },
    { id: 'battlemaster', name: 'Battle Master', description: 'Tactical superiority dice power combat maneuvers like Trip and Riposte.', level: 3 },
    { id: 'eldritch-knight', name: 'Eldritch Knight', description: 'Blend martial skill with abjuration and evocation wizard spells.', level: 3 },
  ],
  Monk: [
    { id: 'open-hand', name: 'Way of the Open Hand', description: 'Master unarmed combat with knockdowns, pushes, and Quivering Palm.', level: 3 },
    { id: 'shadow', name: 'Way of Shadow', description: 'Harness darkness to teleport, turn invisible, and strike unseen.', level: 3 },
    { id: 'four-elements', name: 'Way of the Four Elements', description: 'Channel ki into elemental spells like fireball and water whip.', level: 3 },
  ],
  Paladin: [
    { id: 'devotion', name: 'Oath of Devotion', description: 'Classic holy knight with Sacred Weapon and protection auras.', level: 3 },
    { id: 'ancients', name: 'Oath of the Ancients', description: 'Fey-touched protector who resists spell damage and ensnares foes.', level: 3 },
    { id: 'vengeance', name: 'Oath of Vengeance', description: 'Relentless avenger who hunts down sworn enemies with extra speed.', level: 3 },
  ],
  Ranger: [
    { id: 'hunter', name: 'Hunter', description: 'Specialized monster slayer with Colossus Slayer and defensive tactics.', level: 3 },
    { id: 'beast-master', name: 'Beast Master', description: 'Bond with an animal companion that fights alongside you.', level: 3 },
    { id: 'gloom-stalker', name: 'Gloom Stalker', description: 'Ambush predator who is invisible to darkvision and strikes first.', level: 3 },
  ],
  Rogue: [
    { id: 'thief', name: 'Thief', description: 'Supreme burglar with bonus action item use and second-story work.', level: 3 },
    { id: 'assassin', name: 'Assassin', description: 'Lethal first strike with auto-crits on surprised enemies.', level: 3 },
    { id: 'arcane-trickster', name: 'Arcane Trickster', description: 'Blend roguery with illusion and enchantment wizard spells.', level: 3 },
  ],
  Sorcerer: [
    { id: 'draconic', name: 'Draconic Bloodline', description: 'Dragon ancestry grants extra HP, AC, and elemental affinity.', level: 1 },
    { id: 'wild-magic', name: 'Wild Magic', description: 'Tap into chaotic magic surges that can help or harm unpredictably.', level: 1 },
    { id: 'divine-soul', name: 'Divine Soul', description: 'Access the cleric spell list and gain celestial resilience.', level: 1 },
  ],
  Warlock: [
    { id: 'fiend', name: 'The Fiend', description: 'Pact with a devil grants temp HP on kills and fire resistance.', level: 1 },
    { id: 'archfey', name: 'The Archfey', description: 'Fey patron grants charm, teleportation, and misty escape.', level: 1 },
    { id: 'great-old-one', name: 'The Great Old One', description: 'Alien patron grants telepathy, mind reading, and psychic powers.', level: 1 },
  ],
  Wizard: [
    { id: 'evocation', name: 'School of Evocation', description: 'Master blaster who sculpts spell AoEs around allies and empowers cantrips.', level: 2 },
    { id: 'abjuration', name: 'School of Abjuration', description: 'Protective ward absorbs damage and you counter spells more reliably.', level: 2 },
    { id: 'divination', name: 'School of Divination', description: 'Roll portent dice each dawn to replace any attack, save, or check.', level: 2 },
  ],
};

// Get subclass options for a class
export function getSubclassOptions(charClass: CharacterClass): SubclassOption[] {
  return SUBCLASS_OPTIONS[charClass] || [];
}

// Check if a character should choose their subclass at the given level
export function shouldChooseSubclass(charClass: CharacterClass, level: number): boolean {
  return level >= SUBCLASS_LEVEL[charClass];
}
