import type { OneShotCampaign } from '../types';

export const theIslandOfMisfitMonsters: OneShotCampaign = {
  id: 'oneshot-island-misfit-monsters',
  type: 'oneshot',
  title: 'The Island of Misfit Monsters',
  tagline: 'They\'re supposed to be terrifying. They\'re just... trying their best.',
  tone: 'comedic',
  themes: ['comedy', 'wilderness', 'social'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A remote island where "defective" monsters live — an owlbear that\'s afraid of the dark, a beholder who needs glasses, a mimic that only turns into helpful furniture, a gelatinous cube that\'s vegan. They\'ve built a community. Now an adventuring company wants to clear the island for development. The party is hired by the monsters to protect their home.',
  hook: 'A panicking owl-bear (emphasis on owl) flies to the party: "HOOT. Danger. HOOT. They\'re coming. HOOT. We can\'t fight. HOOT. We\'re... not very good at being scary. HOOT. Please help?"',
  twist: 'The adventuring company isn\'t there for the island — they\'re there because they heard about the monsters\' "defects" and want to capture them as exotic pets for wealthy collectors. The island isn\'t being cleared, it\'s being raided.',
  climax: 'The adventuring company lands. The party must organize the monsters into a defense force — using their "defects" as strengths. The beholder\'s poor eyesight means it fires rays wildly (area denial). The afraid-of-dark owlbear fights hardest in torchlight. The helpful mimic becomes the best barricade ever. The vegan gelatinous cube provides an impassable non-lethal wall.',
  scenes: [
    {
      title: 'Scene 1: Welcome to Misfit Island',
      summary: 'The party arrives and meets the monsters. Each one is endearing, useless in combat, and terrified of being discovered.',
      challenge: 'social',
      keyEvents: [
        'The owlbear guide: afraid of its own shadow (literally — it\'s an unusual shadow)',
        'The beholder: needs glasses, keeps bumping into things, very polite about it',
        'The mimic: turns into chairs for visitors, desks for paperwork, a bed when someone looks tired',
        'The vegan gelatinous cube: "I only dissolve vegetables. I\'m on a JOURNEY."',
      ],
    },
    {
      title: 'Scene 2: The Plan',
      summary: 'The adventuring company\'s ship is spotted. The party must organize the monsters into a defensive force, finding ways to make defects into advantages.',
      challenge: 'exploration',
      keyEvents: [
        'Scout report: 20 adventurers, capture nets, cages on the ship',
        'War council: each monster explains what they CAN\'T do (which reveals what they CAN)',
        'Training montage: teaching a beholder to use its bad aim as area denial',
        'Defenses built: mimic barricades, gelatinous cube moats, owlbear sentry (with nightlights)',
      ],
    },
    {
      title: 'Scene 3: The Battle of Misfit Island',
      summary: 'The adventuring company attacks. The monsters fight with everything they\'ve got, which isn\'t much — but it\'s creative, surprising, and effective.',
      challenge: 'combat',
      keyEvents: [
        'The beach landing: 20 adventurers meet a wall of vegan gelatinous cube',
        'The inner defense: a beholder firing wildly is scarier than one firing accurately',
        'The owlbear charge: screaming HOOT at maximum volume in torchlight',
        'Victory: the adventurers retreat, the monsters celebrate, nobody got seriously hurt',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Hoot (owlbear)', role: 'guide / village leader', personality: 'An owlbear who is afraid of loud noises, the dark, and confrontation. Despite this, he\'s the island\'s leader because he\'s the bravest — his fear just has a very low bar.' },
    { name: 'Gerald (beholder)', role: 'monster / comic relief', personality: 'A near-sighted beholder who squints at everything and keeps apologizing for accidentally disintegrating things. Wears a monocle that doesn\'t help.' },
    { name: 'Couchworth (mimic)', role: 'monster / utility', personality: 'A mimic that transforms into whatever would be most helpful. Currently a very comfortable armchair. "Sit, please! I insist! Would you like a footrest? I can be that too!"' },
    { name: 'Captain Snare', role: 'antagonist', personality: 'Leader of the adventuring company. Sees monsters as products. "Do you know what a collector pays for a defective beholder? Novelty value."' },
  ],
  keyLocations: [
    { name: 'Misfit Island', description: 'A small tropical island where defective monsters have built a surprisingly cozy community. Treehouses, a communal garden, and a sign reading "WELCOME (PLEASE DON\'T BE SCARED)."', significance: 'The setting and the thing worth protecting.' },
    { name: 'The Beach', description: 'Where the adventuring company will land. The party must fortify it with creative monster-based defenses.', significance: 'The primary battlefield.' },
    { name: 'The Village Center', description: 'A clearing with mismatched furniture (all mimics), a vegetable garden (tended by the cube), and a fire pit (lit by the owlbear\'s one brave moment each day).', significance: 'The emotional heart of the island.' },
  ],
  dataSystems: ['encounterWaves', 'combatNarration', 'socialEncounter', 'monsterEcology', 'warbandBuilder', 'siegeDefense'],
};
