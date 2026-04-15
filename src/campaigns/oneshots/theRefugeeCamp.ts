import type { OneShotCampaign } from '../types';

export const theRefugeeCamp: OneShotCampaign = {
  id: 'oneshot-refugee-camp',
  type: 'oneshot',
  title: 'The Refugee Camp',
  tagline: 'Three hundred people in tents. Two weeks until frost. The city voted no. You need to change one vote by sunset.',
  tone: 'political',
  themes: ['political', 'social', 'war'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'Three hundred refugees from a burned village are camped outside the walls of Greyhaven. Winter is two weeks away. The city council has voted to deny entry, citing "resource strain." The party has been hired by a sympathetic council member to negotiate entry before the first frost kills children.',
  hook: 'Council Member Dara meets the party at the camp: "The council voted 4-3 against entry. I need you to change one vote by sunset tomorrow. The temperature drops below freezing in three days. There are sixty children in this camp. Do whatever it takes."',
  twist: 'The council is not heartless - they are broke. The city treasury was embezzled by the previous mayor, and there genuinely is not enough food for three hundred more people through winter. The "no" vote is based on real math, not bigotry. The party must find resources, not just change minds.',
  climax: 'The emergency council session. The party presents their solution - wherever they found the resources. The swing voter, a farmer named Edric, must be convinced that the city will survive. The refugees\' representative, a mother named Suli, gives testimony. The vote happens.',
  scenes: [
    {
      title: 'Scene 1: The Camp',
      summary: 'The party visits the refugee camp, meets the families, and understands the human stakes before entering the political arena.',
      challenge: 'social',
      keyEvents: [
        'The camp: tents in mud, children coughing, a community kitchen running on scraps',
        'Suli, the camp leader: organized, proud, refuses pity but accepts help',
        'A sick child: without shelter, she will not survive the frost - this is not abstract',
        'The council\'s argument: the party reads the denial letter and its economic justification',
      ],
    },
    {
      title: 'Scene 2: The Numbers',
      summary: 'The party investigates the city\'s claim of resource strain and discovers both the truth and a path forward.',
      challenge: 'exploration',
      keyEvents: [
        'The treasury: genuinely empty - the embezzlement was real and devastating',
        'The granary: enough grain for the city, barely, but not three hundred more mouths',
        'The abandoned noble estate: Lord Voss fled with the old mayor, his estate sits empty with stores',
        'The merchant guild: willing to donate if the council grants them a tax break - politics within politics',
      ],
    },
    {
      title: 'Scene 3: The Vote',
      summary: 'The emergency council session. Arguments, testimony, and one vote that decides three hundred lives.',
      challenge: 'social',
      keyEvents: [
        'Presenting the resource plan: the Voss estate, merchant donations, rationing adjustments',
        'The opposition: Councilor Harke argues this sets a precedent the city cannot sustain',
        'Suli\'s testimony: what they lost, what they need, what they can contribute',
        'Edric\'s decision: the swing vote, based on whether the math works AND whether it is right',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Council Member Dara', role: 'quest giver', personality: 'Keeps a tally on her hand of how many children are in the camp. Updates it every time she visits. Currently at sixty-three. Speaks in precise medical terms about what cold exposure will do. Does not let anyone look away.' },
    { name: 'Suli', role: 'refugee leader', personality: 'Runs the camp like a ship captain. Assigns jobs, settles disputes, tracks rations on a board made from a wagon door. Refuses to say "please." Says "here is what we need" and waits. If you offer pity, she hands you a shovel.' },
    { name: 'Farmer Edric', role: 'swing voter', personality: 'Keeps doing math on a piece of paper while the party talks. Asks about bushels, storage capacity, and caloric needs. Not heartless - just terrified of making a promise the city cannot keep. "Show me the grain and I will change my vote."' },
    { name: 'Councilor Harke', role: 'opposition', personality: 'Begins every argument with "I take no pleasure in this." Says "our people" to mean city residents and "those people" to mean refugees, and does not notice the distinction. Believes his own fear is civic responsibility.' },
  ],
  keyLocations: [
    { name: 'The Refugee Camp', description: 'Tents and cook fires outside Greyhaven\'s north gate. Muddy, cold, organized with desperate efficiency.', significance: 'Where the human cost is visible and undeniable.' },
    { name: 'Greyhaven Council Chamber', description: 'A circular room with seven chairs and a speaking floor. The acoustics amplify everything.', significance: 'Where the vote happens.' },
    { name: 'The Voss Estate', description: 'An abandoned manor with sealed cellars full of preserved food and empty rooms that could shelter families.', significance: 'The key resource that makes the math work.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
