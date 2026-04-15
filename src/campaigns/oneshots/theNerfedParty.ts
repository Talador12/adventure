import type { OneShotCampaign } from '../types';

export const theNerfedParty: OneShotCampaign = {
  id: 'oneshot-the-nerfed-party',
  type: 'oneshot',
  title: 'The Nerfed Party',
  tagline: 'A god deemed you "too powerful" and reduced you to commoner stats. The monsters were not nerfed.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 6 },
  level: 1,
  estimatedHours: 3,
  settingSummary:
    'The god of Balance, Equilibrus, has been watching the party with growing irritation. They are too competent. Too equipped. Too heroic. In his divine opinion, adventurers have been power-creeping for centuries and someone needs to put a stop to it. He strips the party to commoner-level stats overnight. The fighter can only slap. The wizard can only cast Prestidigitation. The cleric heals 1 HP per cast. The rogue\'s sneak attack does 1 damage. Their quest - clear a dungeon they were hired for yesterday when they were still powerful - remains mandatory. The contract was signed. The monsters were not nerfed.',
  hook: 'The party wakes up in their inn room and everything feels wrong. The fighter tries to lift their greatsword and cannot get it off the ground. The wizard opens their spellbook and every spell above cantrip level is just... gone. The cleric prays and gets a divine response: "YOU HAVE BEEN BALANCED. YOU ARE WELCOME. -EQUILIBRUS." A note appears on the bedside table: "Today\'s dungeon clear is still expected. The Goblin Warren of Thorncrag. Contract penalty for failure: 500 gold each. Good luck." The goblins in that warren are not nerfed. They have a bugbear chief. The bugbear has 27 HP. The fighter does 1 damage per slap.',
  twist:
    'Equilibrus is watching and scoring. This is not punishment - it is a GAME SHOW. He has been running "Balance Check" for centuries, nerfing overconfident adventurers and watching them struggle. Other gods are watching too. There are bets. The god of Chaos bet the party would clear the dungeon using only Prestidigitation and harsh language. The god of War bet they would die in room one. If the party performs entertainingly enough, Equilibrus restores their power - but only because the show needs a Season 2.',
  climax:
    'The party reaches the bugbear chief with nothing but slaps, Prestidigitation, 1 HP heals, and whatever environmental creativity they have mustered. The bugbear is a genuine threat at their current power level. Mid-fight, Equilibrus manifests on a floating throne with popcorn. Other gods appear in spectator seats. The party realizes they are entertainment. If they win creatively, powers restored. If they complain, Equilibrus nerfs them further. The fighter\'s slap becomes a gentle pat. The wizard loses Prestidigitation and can only do finger guns. They must win the fight AND the audience.',
  scenes: [
    {
      title: 'Scene 1: The Morning After',
      summary:
        'The party discovers they have been nerfed. Everything they relied on is gone or pathetically weakened. They must decide whether to attempt the contracted dungeon clear at commoner level or face a 500-gold penalty they cannot afford.',
      challenge: 'social',
      keyEvents: [
        'The fighter cannot lift their greatsword. They resort to slapping. It does 1 damage.',
        'The wizard\'s entire spellbook is blank except Prestidigitation. They can clean things. They can flavor things. That is it.',
        'The cleric casts Cure Wounds. It heals 1 HP. "I am a MEDICAL PROFESSIONAL" they shout at the ceiling.',
        'The rogue tests Sneak Attack. 1 bonus damage. Their lockpicking tools feel like they weigh 50 pounds. "This is a HATE CRIME against rogues."',
      ],
    },
    {
      title: 'Scene 2: The Goblin Warren',
      summary:
        'The party enters the dungeon they were contracted to clear. The goblins are normal-power goblins. To the nerfed party, they are terrifying. Every encounter requires creative environmental solutions because direct combat is nearly suicidal.',
      challenge: 'combat',
      keyEvents: [
        'First goblin encounter: 3 goblins with 7 HP each. The fighter slaps one. 1 damage. The goblin laughs. This is going to take a while.',
        'The wizard uses Prestidigitation to create the smell of a troll. The goblins panic. Creative solutions matter more than stats now.',
        'The cleric heals the fighter for 1 HP after a goblin arrow. "You are welcome. That was my ENTIRE contribution."',
        'The rogue finds a trap. Cannot disarm it (DC 15, they have +0). They trigger it on purpose and lure goblins into it instead. Improvisation is the only weapon that works.',
      ],
    },
    {
      title: 'Scene 3: The Bugbear Problem',
      summary:
        'The final room. A bugbear chief with 27 HP. The party does approximately 1 damage per round per person. Equilibrus appears with divine spectators. The fight is both deadly and absurd.',
      challenge: 'combat',
      keyEvents: [
        'The bugbear chief looks at the party. He is confused. "You... are the adventurers? You look like peasants."',
        'Equilibrus appears on a floating throne. Other gods materialize in spectator seats. The god of Chaos is eating divine popcorn.',
        'Mid-fight, Equilibrus threatens to nerf them FURTHER if they are boring. The slap becomes a gentle pat. Prestidigitation becomes finger guns. "ENTERTAIN ME."',
        'The party must win creatively: environmental kills, improvised traps, teamwork exploits. A sufficiently entertaining victory restores their power. A boring victory does not.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Equilibrus, God of Balance',
      role: 'antagonist / game show host',
      personality:
        'A smug, perfectly symmetrical god who speaks in a measured tone and treats adventurer suffering as premium entertainment. He wears a referee\'s whistle made of starlight. "You had a +8 to hit. That is EXCESSIVE. Now you have a +0. This is FAIR. Enjoy."',
      secret: 'He was once an adventurer who min-maxed so hard the other gods deified him out of self-defense. He has been salty about it for eons.',
    },
    {
      name: 'Grukk, Bugbear Chief',
      role: 'final boss / confused combatant',
      personality:
        'A bugbear who was expecting a real fight and got a group of apparent commoners trying to slap him to death. He is insulted. "I prepared for this. I sharpened my morningstar. I did WARMUPS. And you bring me... slapping?"',
    },
    {
      name: 'The Contract Golem',
      role: 'quest enforcer / debt collector',
      personality:
        'A golem made of contract paper that follows the party reminding them of their legal obligation to clear the dungeon. It cannot fight. It can sue. "Clause 7b: failure to complete results in a 500 gold penalty per party member. Clause 7c: complaints about divine intervention are not grounds for contract nullification."',
    },
  ],
  keyLocations: [
    {
      name: 'The Goblin Warren of Thorncrag',
      description:
        'A standard goblin dungeon that would be trivial for a normal party. For a nerfed party, it is a death trap. Every room has goblins, traps, or environmental hazards that a commoner-level party must outsmart rather than overpower.',
      significance: 'The entire adventure. A dungeon balanced for level 5 being run by level 0 characters.',
    },
    {
      name: 'The Chief\'s Arena',
      description:
        'The bugbear chief\'s throne room, now also a divine amphitheater. Floating seats for spectating gods ring the ceiling. A scoreboard tracks "Creativity" and "Suffering" in equal measure.',
      significance: 'The climax location where combat and entertainment merge.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'trapDisarm',
    'environmentalHazard',
    'socialEncounter',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
