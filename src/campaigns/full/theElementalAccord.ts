import type { FullCampaign } from '../types';

export const theElementalAccord: FullCampaign = {
  id: 'full-elemental-accord',
  type: 'full',
  title: 'The Elemental Accord',
  tagline: 'Four nations. Four elements. One absence that will consume them all.',
  tone: 'epic',
  themes: ['epic', 'political', 'exploration'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 15 },
  estimatedSessions: 18,
  settingSummary:
    'The world of Tetrava is divided into four nations, each aligned with a classical element. The Ember Dominion (fire), the Tidecallers (water), the Stonemark Republic (earth), and the Windsworn Reaches (air). For centuries they coexisted through the Elemental Accord - a balance maintained by a living embodiment of harmony. Fire warmed water. Earth sheltered air. Now the balance is breaking. Fire scorches water lands. Earth swallows air. The spaces between the elements grow dark and cold.',
  hook:
    'The border between the Ember Dominion and the Tidecaller coast is burning. Literally - a strip of ocean is on fire, and neither nation started it. The party is summoned by the Council of Four to investigate, and discovers that the elemental imbalance is not an attack. It is an absence. Something that held the elements together is gone.',
  twist:
    'The Elemental Accord was not a treaty. It was a person. The Harmonist - a being who embodied all four elements simultaneously - maintained the balance by existing. The last Harmonist died six months ago. No one outside the Council knows. No one knows how the next one is chosen. The Void - the absence of all elements - is filling the spaces the Accord used to hold.',
  climax:
    'The party must find or become the next Harmonist. This requires understanding each element\'s perspective - not defeating one, but harmonizing all four. The final confrontation is not a battle but a ritual: standing at the convergence point of all four nations and holding the elements in balance while the Void tries to consume everything. Victory is not strength. It is empathy.',
  acts: [
    {
      title: 'Act 1: The Imbalance',
      summary:
        'The party investigates the elemental disruptions across Tetrava. Each nation blames the others. The party must travel to at least two nations, experience their cultures, and discover that the problem is not aggression but absence.',
      keyEvents: [
        'The burning ocean: fire and water colliding at the border, neither nation responsible',
        'Visiting the Ember Dominion: a culture of passion, forge-cities, and a military that is terrified',
        'Visiting the Tidecallers: a maritime nation of navigators whose currents are running backward',
        'Discovering the Void: patches of cold nothingness where elements refuse to exist',
        'A dying elder reveals: "The Accord is not a document. It never was."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Four Perspectives',
      summary:
        'The party learns the truth about the Harmonist and must earn the trust of each nation to access the convergence point. Each nation has a trial that reflects its element: passion, adaptability, endurance, and freedom.',
      keyEvents: [
        'The Ember Trial: walking through sacred flame without fighting it - letting passion burn without destroying',
        'The Tide Trial: navigating a living labyrinth of water that changes with the party\'s emotions',
        'The Stone Trial: carrying an impossible weight up a mountain, learning to ask for help instead of enduring alone',
        'The Wind Trial: letting go of something precious and trusting the wind to carry it',
        'The Void grows: entire villages are falling into cold nothingness. Time is short.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Harmonist',
      summary:
        'The party reaches the convergence point at the center of Tetrava. The Void is massive. The ritual requires holding all four elements in balance simultaneously. The party must harmonize, not conquer.',
      keyEvents: [
        'Reaching the Convergence: a plateau where all four nations\' borders meet, now half-consumed by Void',
        'The Void manifests as a presence - not evil, just empty. It wants to fill the silence the Harmonist left.',
        'The ritual: each party member channels an element. Balance is not control - it is understanding.',
        'One party member (or an NPC) begins to transform - the new Harmonist is not chosen. They choose themselves.',
        'The elements stabilize. The Void recedes. The world breathes.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Chancellor Pyra Ashvane',
      role: 'Ember Dominion leader',
      personality:
        'A fierce woman who leads with passion and fears her element is out of control. Aggressive but honest. Would burn down the world to protect her people - and hates that about herself.',
      secret: 'She knew the Harmonist personally. She blames herself for not noticing he was dying.',
    },
    {
      name: 'Tidecaller Nereus',
      role: 'Tidecaller elder',
      personality:
        'An ancient triton who speaks in currents and metaphors. Patient beyond measure. Knows more than he says. Believes the party will fail but hopes he is wrong.',
    },
    {
      name: 'The Void',
      role: 'antagonist / force of nature',
      personality:
        'Not a person. Not evil. The absence of harmony given form. It does not want to destroy. It simply fills space that is no longer held. It is cold, quiet, and growing.',
    },
    {
      name: 'Lira Windborne',
      role: 'guide / Windsworn nomad',
      personality:
        'A young air-nation nomad who acts as the party\'s guide. Irreverent, restless, and terrified of being tied down. The Wind Trial is hardest for her.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ember Dominion',
      description:
        'A nation of volcanic plateaus, forge-cities, and people whose emotions burn as hot as their element. Beautiful and dangerous.',
      significance: 'Where the party learns what fire means: passion, not destruction.',
    },
    {
      name: 'The Tidecaller Coast',
      description:
        'A maritime nation of floating cities, coral palaces, and navigators who read the sea like a book. The currents are running wrong.',
      significance: 'Where the party learns what water means: adaptability, not submission.',
    },
    {
      name: 'The Convergence',
      description:
        'A plateau at the center of Tetrava where all four nations\' borders meet. Half consumed by Void. The air tastes like nothing.',
      significance: 'Where the Harmonist ritual takes place and the campaign climaxes.',
    },
  ],
  dataSystems: ['magicalEcosystem', 'politicalFaction', 'socialEncounter', 'weatherEvent', 'ritualComponent'],
};
