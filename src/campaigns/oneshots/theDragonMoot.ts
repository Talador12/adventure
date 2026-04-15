import type { OneShotCampaign } from '../types';

export const theDragonMoot: OneShotCampaign = {
  id: 'oneshot-dragon-moot',
  type: 'oneshot',
  title: 'The Dragon Moot',
  tagline: 'Every dragon meets once per century. One proposes war on mortals. Convince them otherwise.',
  tone: 'epic',
  themes: ['epic', 'political', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 9,
  estimatedHours: 3,
  settingSummary:
    'Once every hundred years, every dragon in the world gathers at the Moot - a volcanic caldera where draconic law is made. This century, the ancient red dragon Pyraxis has proposed a motion: total war on mortal civilization. The party has been invited by the metallic dragons as "mortal advocates" to argue against the motion. They must sway enough dragons to prevent a unanimous vote for extinction.',
  hook: 'A gold dragon lands before the party: "The Moot convenes at dawn. Pyraxis proposes war. If the vote is unanimous, draconic law compels every dragon to attack. I invited you as mortal advocates - the first in Moot history. You have one day to convince ancient beings that your species deserves to exist."',
  twist: 'Pyraxis does not want war. He wants leverage. His real goal is a treaty that gives dragons sovereign territory - mountains, volcanoes, and deep places where mortals cannot build, mine, or hunt. The war vote is a negotiating tactic. If the party figures this out, they can give Pyraxis what he actually wants and broker a historic peace instead of just preventing a war.',
  climax: 'The final vote. Each dragon speaks. The party has addressed concerns, made alliances, and (if they discovered the truth) offered Pyraxis a real alternative. The vote happens. Every dragon\'s choice reflects the party\'s diplomacy. The fate of mortal civilization is decided by the oldest beings in the world.',
  scenes: [
    {
      title: 'Scene 1: Arrival',
      summary: 'Arriving at the Moot. Meeting dragons. Being very, very small among very, very large beings.',
      challenge: 'social',
      keyEvents: [
        'The caldera: a massive volcanic bowl where dragons perch on cliff ledges like senators in an amphitheater',
        'The factions: metallic dragons (mostly pro-mortal), chromatic dragons (divided), Pyraxis\'s bloc (pro-war)',
        'First impressions: dragons test the party with riddles, challenges, and deliberate intimidation',
        'The undecided: three ancient dragons who have not chosen a side - they are the swing votes',
      ],
    },
    {
      title: 'Scene 2: The Lobbying',
      summary: 'Making the case for mortal survival. Each dragon has different concerns and different prices.',
      challenge: 'social',
      keyEvents: [
        'The blue dragon: mortals polluted her desert - she wants environmental promises',
        'The green dragon: mortals cut her forest - she wants territory, not war',
        'The ancient white: does not care about politics - wants to be left alone in the arctic',
        'Pyraxis: a private conversation reveals his true goal - sovereign territory for dragonkind',
      ],
    },
    {
      title: 'Scene 3: The Vote',
      summary: 'The Moot reconvenes. Speeches, votes, and the weight of the world on mortal shoulders.',
      challenge: 'social',
      keyEvents: [
        'Pyraxis speaks: war, vengeance, centuries of mortal encroachment - a compelling case',
        'The party speaks: whatever argument they have built over the day',
        'The swing votes: each undecided dragon announces their position',
        'The count: war, peace, or something new - a treaty that changes the relationship forever',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Pyraxis', role: 'antagonist / negotiator', personality: 'An ancient red dragon who appears to want war but actually wants recognition. Brilliant, theatrical, and using the threat of extinction as a bargaining chip.', secret: 'He has a map of proposed dragon territories already drawn up. He has been planning the treaty, not the war.' },
    { name: 'Aurixia', role: 'gold dragon ally', personality: 'The gold dragon who invited the party. Ancient, wise, and worried. She has seen one Moot vote for war and it took three hundred years to undo the damage.' },
    { name: 'The White Ancient', role: 'swing vote', personality: 'An enormous white dragon who has not spoken to another living being in fifty years. Does not care about politics. Wants exactly one thing: to be left alone. The simplest and hardest vote to win.' },
  ],
  keyLocations: [
    { name: 'The Caldera', description: 'A dormant volcanic crater where dragons perch on cliff ledges. The speaking platform is a basalt column in the center. Lava glows far below.', significance: 'Where the Moot convenes and the vote happens.' },
    { name: 'Pyraxis\'s Ledge', description: 'The highest point in the caldera, wreathed in heat. Pyraxis receives visitors here like a king holding court.', significance: 'Where the party discovers the real agenda.' },
    { name: 'The Neutral Ground', description: 'A flat stone platform where dragons and mortals can meet at something approaching eye level. Ancient draconic law marks it as a zone of truce.', significance: 'Where negotiations happen safely.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
