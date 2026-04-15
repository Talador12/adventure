import type { OneShotCampaign } from '../types';

export const theWizardSneezed: OneShotCampaign = {
  id: 'oneshot-the-wizard-sneezed',
  type: 'oneshot',
  title: 'The Wizard Sneezed',
  tagline: 'A teleport spell went wrong. The party arrived in pieces. Not injured - SCRAMBLED. The fighter has the wizard\'s arms.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'Wizard Portalis operates a budget teleportation service called "Blink & You\'re There." He sneezed during the party\'s transport. The spell completed but reassembled them wrong. The fighter has the wizard\'s scrawny arms (Strength modifier gone). The rogue has the cleric\'s legs (heavy, slow, blessed). The wizard has the fighter\'s arms (huge, muscular, cannot fit through his own sleeves). They arrived at the dungeon as requested. The dungeon does not care about their body situation. They must complete the quest with each other\'s parts.',
  hook: 'The party materializes in front of a dungeon entrance. Something feels wrong. The fighter looks down at his arms. They are thin. They are wearing wizard sleeves. The wizard looks at HIS arms. They are enormous. The rogue tries to run and discovers her legs weigh twice what they used to. The cleric is three inches taller and cannot figure out why. Portalis\'s voice echoes: "ALL SALES FINAL. NO REFUNDS."',
  twist: 'The dungeon contains the only counterspell component they need: a Re-assembly Crystal at the bottom level. But each room\'s challenge requires the body part that is on the WRONG person. Doors need the fighter\'s strength (the wizard has it). Locks need the rogue\'s dexterity (it is in the cleric\'s fingers now). Cooperation between mismatched bodies is the only path forward.',
  climax: 'The final room requires all original body configurations to activate the crystal. The party must figure out how to coordinate four scrambled bodies to simultaneously press four plates calibrated to their original forms. The fighter must use the wizard\'s frail arms to press a plate designed for frail arms while the wizard uses the fighter\'s arms on the strength plate. It is a team puzzle where you are the pieces.',
  scenes: [
    {
      title: 'Reassembly Required',
      summary: 'The party discovers their situation and must navigate the first rooms using body parts that belong to someone else. The fighter cannot swing a sword. The wizard keeps accidentally flexing.',
      challenge: 'puzzle',
      keyEvents: [
        'The fighter tries to lift his sword. With the wizard\'s arms, it weighs a thousand pounds. He uses it as a walking stick.',
        'The wizard accidentally punches through a wooden door reaching for the handle. Fighter arms do not know their own strength.',
        'The rogue attempts stealth. The cleric\'s legs make heavy cleric-leg sounds. Stealth is over.',
        'The cleric tries to cast healing. The spell works but comes out of the rogue\'s hands, wherever those are.',
      ],
    },
    {
      title: 'The Wrong-Body Gauntlet',
      summary: 'Dungeon rooms that each require specific physical abilities - strength, dexterity, wisdom, intelligence - but the abilities are on the wrong people. Cooperation is mandatory.',
      challenge: 'puzzle',
      keyEvents: [
        'A heavy gate needs Strength 18 to open. The wizard has it. The wizard has never lifted anything heavier than a spellbook.',
        'A lock needs thieves\' tools and nimble fingers. The cleric has the rogue\'s fingers but does not know which pick is which.',
        'Combat breaks out. The fighter punches ineffectively with wizard arms. The wizard accidentally knockout-punches a goblin.',
        'They start working together: the wizard lifts the fighter so the fighter can reach a high switch with precision he still has.',
      ],
    },
    {
      title: 'The Re-assembly Crystal',
      summary: 'Four pressure plates, each calibrated to a different body type. The party must use their wrong bodies to press the right plates simultaneously.',
      challenge: 'puzzle',
      keyEvents: [
        'The crystal chamber: four glowing plates labeled with body silhouettes matching their ORIGINAL forms',
        'Each plate rejects the wrong body type. The fighter steps on his plate and it buzzes - wrong arms.',
        'The solution: each person stands on the plate that matches the body parts they CURRENTLY have',
        'Simultaneous activation. A flash. Everything snaps back to its proper owner. The fighter hugs his own arms. The wizard misses being strong.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Wizard Portalis', role: 'cause of the problem / absent', personality: 'A cut-rate teleportation wizard who operates out of a tent next to a horse stable. His slogan: "Blink & You\'re There." His disclaimer: "Results May Vary. All Sales Final." He has allergies. He should not be teleporting anyone.' },
    { name: 'Dungeon Keeper Voss', role: 'neutral dungeon operator', personality: 'A bored tiefling who maintains the dungeon as a licensed adventuring venue. Charges admission. Does not care about the party\'s body situation. "You paid for the full dungeon. Refunds require original limb configuration."' },
  ],
  keyLocations: [
    { name: 'The Licensed Dungeon', description: 'A government-regulated adventuring dungeon with safety rails (broken), exit signs (misleading), and a gift shop (closed).', significance: 'The setting. Each room tests abilities that are on the wrong person.' },
    { name: 'The Crystal Chamber', description: 'The deepest room. Four pressure plates around a glowing Re-assembly Crystal. The solution to their body-swap problem.', significance: 'The climax. The cooperative puzzle that fixes everything.' },
  ],
  dataSystems: ['trapGenerator', 'dungeonRoom', 'combatNarration'],
};
