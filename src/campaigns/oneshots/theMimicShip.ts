import type { OneShotCampaign } from '../types';

export const theMimicShip: OneShotCampaign = {
  id: 'oneshot-mimic-ship',
  type: 'oneshot',
  title: 'The Mimic Ship',
  tagline: 'The treasure chest was a mimic. The ship is also a mimic. So is the ocean.',
  tone: 'horror',
  themes: ['horror', 'nautical', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 4,
  settingSummary:
    'The party books passage on a merchant vessel. Three days into the voyage, someone opens a treasure chest in the hold and discovers it\'s a mimic. Standard stuff. Then the stairs turn out to be a mimic. Then the mast. Then the hull. The ship itself is a colony organism — an elder mimic that has been pretending to be a vessel for decades, slowly feeding on crews. Now it\'s awake, it\'s hungry, and the party is inside it.',
  hook: 'A scream from the cargo hold. The party investigates and finds a sailor stuck to a treasure chest that has grown teeth. Classic mimic. They kill it. As they walk away, the floorboards ripple. A door handle blinks. The ship groans — not wood groaning. A voice groaning.',
  twist:
    'The ship-mimic isn\'t evil — it\'s a mother. It has been carrying a clutch of mimic eggs in the hold for years, and it\'s been consuming crews to feed its young. The eggs are about to hatch. The mother won\'t let the party harm them. Every surface of the ship is now potentially hostile — but the mimic-ship won\'t actively kill the party if they don\'t threaten the eggs.',
  climax:
    'The eggs start hatching. Dozens of baby mimics (disguised as coins, buckles, spoons) emerge. The mother-ship is protective and desperate. The party can fight their way out (requiring destroying the eggs, which makes the mother-ship go berserk), negotiate (find a way to feed the babies without being the food), or escape to a lifeboat (if the lifeboat isn\'t also a mimic).',
  scenes: [
    {
      title: 'Scene 1: Something\'s Wrong',
      summary:
        'The first mimic is killed. Then the party notices more and more of the ship isn\'t what it seems. Paranoia builds as every surface becomes suspect.',
      challenge: 'exploration',
      keyEvents: [
        'The treasure chest mimic — standard encounter, false sense of security',
        'Small signs: a door handle that\'s warm, a rope that flinches when grabbed',
        'A sailor disappears — absorbed into the deck',
        'The ship itself moves in ways that the wind doesn\'t explain',
      ],
    },
    {
      title: 'Scene 2: The Awakening',
      summary:
        'The ship fully reveals itself. The party is inside a living creature. Navigation becomes survival. Every room is a mouth.',
      challenge: 'combat',
      keyEvents: [
        'The ship speaks through creaking wood: "My... children..."',
        'The hold is revealed: dozens of mimic eggs, pulsing, warm',
        'The crew panics — some are absorbed, some flee to locations that are also mimics',
        'The party must move through the ship without touching walls, floors, or anything',
      ],
    },
    {
      title: 'Scene 3: Mother Knows Best',
      summary:
        'Eggs hatching. Baby mimics everywhere. The mother-ship is both the environment and the boss. The party must resolve the situation before being absorbed.',
      challenge: 'combat',
      keyEvents: [
        'Baby mimics hatch — disguised as coins, buttons, spoons, crawling everywhere',
        'The mother becomes desperate — the ship itself attacks (masts swing, hull constricts)',
        'A way out: the lifeboat (is it real? Investigation check)',
        'Resolution: fight, negotiate, or flee — each has consequences',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Mother',
      role: 'the ship / antagonist',
      personality:
        'A massive elder mimic that has pretended to be a ship for 40 years. Not intelligent in a human way — more like a protective animal. Will destroy everything to protect its young.',
    },
    {
      name: 'Captain Aldric',
      role: 'doomed authority figure',
      personality:
        'The ship\'s captain who has been commanding this vessel for 5 years without knowing it\'s alive. Currently in denial. "Ships creak! That\'s what ships DO!"',
      secret: 'He suspected something was wrong months ago. Crew kept disappearing. He chose not to investigate.',
    },
    {
      name: 'Yara the Cook',
      role: 'unlikely ally',
      personality:
        'The ship\'s cook who figured it out years ago. She\'s been feeding the ship extra rations to keep it docile. "I keep her fed, she doesn\'t eat us. We had an understanding. Until you opened that chest."',
    },
  ],
  keyLocations: [
    {
      name: 'The Deck',
      description:
        'What appears to be a normal ship deck. The planks are warm. The railings have a texture that isn\'t quite wood.',
      significance: 'Where the party spends most of the early adventure.',
    },
    {
      name: 'The Hold',
      description:
        'The ship\'s cargo hold — actually the mimic\'s womb. Dozens of eggs cluster in warm, sticky organic material poorly disguised as cargo netting.',
      significance: 'Where the truth is discovered and the eggs are found.',
    },
    {
      name: 'The Lifeboat',
      description:
        'A small boat lashed to the deck. May or may not be part of the mimic. There\'s only one way to find out.',
      significance: 'The potential escape route and a moment of extreme tension.',
    },
  ],
  dataSystems: [
    'navalCombat',
    'shipCrewManagement',
    'encounterWaves',
    'trapDisarm',
    'combatNarration',
    'hauntedLocation',
  ],
};
