import type { OneShotCampaign } from '../types';

export const theWeaponSpeaks: OneShotCampaign = {
  id: 'oneshot-weapon-speaks',
  type: 'oneshot',
  title: 'The Weapon Speaks',
  tagline: 'Your sword has opinions. Your shield has anxiety. Your bow won\'t stop narrating.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A wild magic surge in the armory has made every weapon sentient — for 24 hours. The party\'s weapons now have personalities, opinions, and feelings about being used. The sword is a pacifist. The shield has social anxiety. The bow keeps narrating everything in third person. And there\'s a dungeon that needs clearing TODAY.',
  hook: 'The party picks up their gear for a routine dungeon crawl and every weapon starts talking. The Fighter\'s sword screams "NOT THE FACE" when swung. The Rogue\'s daggers argue about who\'s the favorite. The quest is still on — the dungeon has a deadline.',
  twist:
    'The weapons aren\'t randomly sentient — they\'re haunted by the ghosts of their previous wielders. The sword is a pacifist because its last owner died by the sword. The shield has anxiety because its last owner let it get hit too many times. Working through their trauma makes them more powerful.',
  climax:
    'The dungeon boss is a sentient suit of armor — the BBEG\'s weapons became sentient too, and they mutinied. The boss is immobilized by its own equipment. The party\'s weapons and the boss\'s weapons have a heated argument about working conditions. The party can fight, mediate, or let the weapons unionize.',
  scenes: [
    {
      title: 'Scene 1: The Awakening',
      summary:
        'The party discovers their weapons are talking. Introductions, personality clashes, and the realization that the dungeon quest can\'t wait.',
      challenge: 'social',
      keyEvents: [
        'Each weapon introduces itself and its personality',
        'The quest briefing — clear the dungeon by sundown or the client doesn\'t pay',
        'First test: a bar brawl, and the weapons have opinions about violence',
        'Negotiation: the weapons agree to cooperate if their conditions are met',
      ],
    },
    {
      title: 'Scene 2: The Dungeon (With Commentary)',
      summary:
        'A standard dungeon crawl, except every combat is complicated by weapons that talk back, refuse orders, or try to help in unhelpful ways.',
      challenge: 'combat',
      keyEvents: [
        'First encounter: the sword tries diplomacy with the goblins (it almost works)',
        'Trap corridor: the shield volunteers to block everything (and won\'t stop apologizing)',
        'The bow provides color commentary on every shot ("And the arrow flies TRUE!")',
        'Discovering the weapons\' backstories through their reactions to danger',
      ],
    },
    {
      title: 'Scene 3: The Boss (Dis)armed',
      summary:
        'The dungeon boss\'s own weapons have immobilized him. A negotiation between two sets of sentient weapons, with the party as mediators.',
      challenge: 'social',
      keyEvents: [
        'The boss: a hobgoblin warlord pinned by his own rebelling equipment',
        'His weapons have demands: shorter battles, better maintenance, no throwing',
        'A weapons summit: both sides argue while the party moderates',
        'Resolution: labor agreement, boss surrenders, or everyone fights everyone',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Valor (the sword)',
      role: 'sentient weapon / pacifist',
      personality:
        'A greatsword who speaks in a deep, mournful voice and would really prefer not to be used for violence. "Can we try talking first? I\'m very good at pointing threateningly."',
      secret: 'Its last wielder was a paladin who fell. Valor watched it happen and blames himself.',
    },
    {
      name: 'Clink (the shield)',
      role: 'sentient weapon / anxious',
      personality:
        'A shield with severe anxiety who flinches before every impact. "Oh no, here it comes, oh no oh no—" *CLANG* "...I\'m okay. I\'m okay. That one wasn\'t so bad."',
    },
    {
      name: 'Narrator (the bow)',
      role: 'sentient weapon / dramatic',
      personality:
        'A longbow that narrates everything in breathless third person. "The archer nocks the arrow. Tension builds. The wind holds its breath—" "JUST SHOOT!"',
    },
  ],
  keyLocations: [
    {
      name: 'The Armory',
      description:
        'Where the wild magic surge happened. Every weapon in the room is talking. The quartermaster has locked himself in the closet.',
      significance: 'Where the sentience began.',
    },
    {
      name: 'Grimtooth Dungeon',
      description:
        'A standard goblin dungeon that becomes very non-standard when your equipment has opinions about your tactical choices.',
      significance: 'The main adventure environment.',
    },
    {
      name: 'The Boss Chamber',
      description:
        'A throne room where a hobgoblin warlord is being held hostage by his own equipment. His armor won\'t let him sit down.',
      significance: 'The climactic scene.',
    },
  ],
  dataSystems: [
    'sentientItem',
    'weaponSentienceAwaken',
    'combatNarration',
    'questRewardNegotiation',
    'wildMagicSurge',
  ],
};
