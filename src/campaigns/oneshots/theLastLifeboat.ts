import type { OneShotCampaign } from '../types';

export const theLastLifeboat: OneShotCampaign = {
  id: 'oneshot-last-lifeboat',
  type: 'oneshot',
  title: 'The Last Lifeboat',
  tagline: 'The ship is sinking. One lifeboat. Too many people. You decide who lives.',
  tone: 'survival',
  themes: ['nautical', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A merchant vessel struck a reef in a storm. The hull is breached, the cargo hold flooding. One lifeboat remains, capacity twelve. There are thirty souls aboard. The party must organize the evacuation while the ship breaks apart beneath them.',
  hook: 'A shuddering crack wakes the party at midnight. Water pours through the lower deck. The captain is dead, pinned under a collapsed mast. The first mate screams: "One lifeboat! One! Who decides?"',
  twist:
    'The reef was no accident. The navigator sabotaged the ship to collect insurance from a rival merchant. He is among the passengers demanding a seat on the lifeboat, and he will kill to get one.',
  climax:
    'The ship splits in two. The lifeboat is lowering. The navigator pulls a weapon. The party must stop him, finish loading, and cut the ropes before the sinking hull drags the lifeboat down with it.',
  scenes: [
    {
      title: 'Scene 1: The Breach',
      summary: 'The ship is flooding. The party assesses damage, discovers one lifeboat, and realizes the math does not work.',
      challenge: 'exploration',
      keyEvents: [
        'A crack loud enough to feel in your teeth. The deck tilts fifteen degrees. Cargo slides. Someone screams below deck.',
        'The captain is pinned under the mainmast, eyes open, gone. The first mate looks at the party and says nothing. He does not know what to do.',
        'One lifeboat on the port davits. Capacity twelve if nobody breathes deep. Thirty souls aboard. The math is the monster.',
        'The cargo hold is knee-deep and rising. Rope, food, a medical kit - all down there. Going in means going under if the ship rolls.',
      ],
    },
    {
      title: 'Scene 2: The Impossible Choice',
      summary: 'The party must decide who gets on the lifeboat. Passengers plead, bribe, threaten, and lie about their importance.',
      challenge: 'social',
      keyEvents: [
        'A mother with two children. A wounded sailor. A noble demanding priority.',
        'The navigator insists he is essential for navigation to shore.',
        'A cleric offers to stay behind if the party saves the children.',
        'Clues surface: the navigator knows too much about the damage pattern.',
      ],
    },
    {
      title: 'Scene 3: Abandon Ship',
      summary: 'The ship breaks apart. The navigator reveals himself. The party must launch the lifeboat in collapsing conditions.',
      challenge: 'combat',
      keyEvents: [
        'The hull splits. Minutes remain.',
        'The navigator attacks to seize the lifeboat.',
        'Passengers in the water. Rescue who you can.',
        'Cut the ropes before the wreck drags the lifeboat under.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Varn Hollis',
      role: 'navigator / saboteur',
      personality: 'Calm, collected, helpful on the surface. Offers to navigate to shore. Underneath, a desperate man covering his crime.',
      secret: 'He drilled holes in the hull before the storm hit. The insurance payout goes to a merchant lord who will have him killed if he fails.',
    },
    {
      name: 'Sister Aelith',
      role: 'cleric / moral compass',
      personality: 'A traveling healer who immediately volunteers to stay behind. Her selflessness forces the party to confront their own choices.',
    },
    {
      name: 'Lord Desmond Hale',
      role: 'noble / antagonist',
      personality: 'Grabs the party by the collar while water rises around his ankles. "Do you know who I am? I have a seat on the Trade Council. That seat on that boat is MINE by right." He cannot swim. He cannot tie a knot. He is holding a velvet coin purse.',
    },
  ],
  keyLocations: [
    {
      name: 'The Verdant Star',
      description: 'A three-masted merchant vessel, now listing badly to port. Water rising through every deck.',
      significance: 'The entire one-shot takes place on this sinking ship.',
    },
    {
      name: 'The Lifeboat Deck',
      description: 'Port-side davits holding the last remaining lifeboat. The crowd here grows more desperate by the minute.',
      significance: 'Where the moral dilemma and final confrontation occur.',
    },
  ],
  dataSystems: ['shipwreckSurvival', 'moraleTracker', 'combatNarration', 'npcGenerator'],
};
