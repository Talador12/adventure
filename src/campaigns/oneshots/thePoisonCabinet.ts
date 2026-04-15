import type { OneShotCampaign } from '../types';

export const thePoisonCabinet: OneShotCampaign = {
  id: 'oneshot-poison-cabinet',
  type: 'oneshot',
  title: 'The Poison Cabinet',
  tagline: 'Steal the antidote from a poisoner\'s cabinet. Everything in the room is toxic. Including the air.',
  tone: 'heist',
  themes: ['heist', 'horror', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 2.5,
  settingSummary:
    'The Alchemist Venom keeps every antidote in a personal cabinet in her laboratory. A child in the city has been poisoned - and Venom is the poisoner. She will not sell the cure. The party must break into her lab and steal the antidote from a room where every surface is coated in toxin, the air itself is poisonous, and the cabinet is trapped with contact poisons.',
  hook: 'The healer is desperate: "The child has six hours. The poison is Venom\'s signature - nightbloom extract. The antidote exists only in her lab. She will not negotiate. She poisoned the child to demonstrate her product to a buyer. Get the antidote. The lab is her fortress and everything inside it will kill you."',
  twist: 'Venom is not in the lab. She is at the buyer meeting across town. But she left a guardian: her apprentice, a teenager who was kidnapped and forced into service years ago. The apprentice will help the party if they promise to take her with them when they leave. She knows where every trap is.',
  climax: 'The cabinet. The apprentice guides them to it but cannot open it - it is keyed to Venom\'s blood. The party must crack the blood-lock while the lab\'s automated defenses activate: gas vents, acid sprays, and a golem made of crystal vials. The antidote is in a green vial among hundreds of identically shaped bottles.',
  scenes: [
    {
      title: 'Scene 1: The Lab',
      summary: 'Breaking into Venom\'s laboratory. Every surface is a hazard. Every breath is a risk.',
      challenge: 'exploration',
      keyEvents: [
        'The entrance: a nondescript door in an alley, trapped with contact poison on the handle',
        'The air: mildly toxic - the party has about 30 minutes before symptoms start without protection',
        'The layout: a main lab, a storage room, the cabinet room, and a sealed door marked "DO NOT OPEN"',
        'First hazards: tripwires attached to acid vials, pressure plates that release gas clouds',
      ],
    },
    {
      title: 'Scene 2: The Apprentice',
      summary: 'Finding the apprentice and earning her trust. She is the key to surviving the lab.',
      challenge: 'social',
      keyEvents: [
        'The apprentice: hiding in the storage room, thin, scared, covered in chemical burns',
        'Her offer: "I know where every trap is. Get me out of here and I will walk you through."',
        'Her knowledge: trap locations, the cabinet\'s blood-lock, and which vial is the antidote',
        'The sealed door: "Never open that. She keeps her failures in there. They are alive."',
      ],
    },
    {
      title: 'Scene 3: The Cabinet',
      summary: 'Cracking the blood-lock and finding the right vial while the lab fights back.',
      challenge: 'puzzle',
      keyEvents: [
        'The blood-lock: requires Venom\'s blood - or a creative workaround (a sample from a trap, transmutation)',
        'The defenses: automated gas vents, acid spray nozzles, and a crystal golem that activates',
        'The vials: hundreds of identical bottles, one green antidote among them - the apprentice points it out',
        'The escape: the lab is sealing itself - the party must get out before the final lockdown',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Alchemist Venom', role: 'absent antagonist', personality: 'A poison specialist who views toxins as art and people as test subjects. Currently selling her wares to the highest bidder across town. Her lab is her autobiography.', secret: 'Her real name is Tessara Wren. She was once a healer who was wronged by the medical establishment.' },
    { name: 'Apprentice Lira', role: 'reluctant ally', personality: 'A 15-year-old girl kidnapped three years ago and forced to learn poison-craft. Knows the lab intimately. Terrified of Venom returning. Wants out more than anything.' },
    { name: 'The Crystal Golem', role: 'guardian', personality: 'An automaton made of crystal vials filled with different poisons. Breaking it releases the contents. Fighting it is as dangerous as the poisons inside.' },
  ],
  keyLocations: [
    { name: 'Venom\'s Laboratory', description: 'A basement lab where every surface is coated in residual toxins. Glassware, distillation equipment, and the faint smell of almonds and flowers - both deadly.', significance: 'The heist location and a death trap.' },
    { name: 'The Cabinet Room', description: 'A small room dominated by a glass cabinet filled with hundreds of identical vials. The blood-lock glows red.', significance: 'Where the antidote is stored.' },
    { name: 'The Storage Room', description: 'Shelves of ingredients, a cot in the corner, and a scared teenager hiding behind barrels.', significance: 'Where the apprentice is found and the alliance is formed.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'encounterWaves', 'combatNarration'],
};
