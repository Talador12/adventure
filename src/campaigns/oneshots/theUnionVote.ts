import type { OneShotCampaign } from '../types';

export const theUnionVote: OneShotCampaign = {
  id: 'oneshot-union-vote',
  type: 'oneshot',
  title: 'The Union Vote',
  tagline: 'The dockworkers are voting to unionize. The company is playing dirty. You are making sure the vote is fair.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The dockworkers of Port Gallus are voting on whether to form a union. The Ironwind Shipping Company has spent weeks intimidating workers, promising raises that will never come, and threatening to close the docks entirely. The party has been hired by the neutral Harbor Authority to ensure the vote happens fairly.',
  hook: 'The Harbor Master pins a badge on each party member: "Official election observers. The vote is tomorrow. Ironwind is bribing, threatening, and lying. The workers are scared. Your job: make sure every worker can vote freely. I do not care who wins. I care that it is honest."',
  twist: 'Ironwind\'s CEO is not the real opposition. She actually supports the union secretly - it would stabilize her workforce. The sabotage is coming from her own board of directors, who are leveraging the anti-union campaign to justify replacing her with a more "aggressive" CEO. The union vote is a proxy war for corporate control.',
  climax: 'Voting day. The party has spent the night preventing sabotage. As voting begins, the board makes its move - hired thugs blockade the docks. The party must break the blockade, protect the voters, and get the ballots counted. The CEO arrives and must decide: reveal the board\'s treachery or stay silent and lose everything.',
  scenes: [
    {
      title: 'Scene 1: The Eve of the Vote',
      summary: 'The party patrols the docks on the night before the vote. Intimidation attempts, last-minute bribes, and workers deciding their future.',
      challenge: 'social',
      keyEvents: [
        'A foreman threatens workers: "Vote yes and you are all fired Monday"',
        'Company flyers: "The union will cost you 10% of your wages in dues" - misleading but legal',
        'A secret meeting: workers gather to discuss the vote, afraid of company spies',
        'The party must reassure voters, document intimidation, and watch for sabotage',
      ],
    },
    {
      title: 'Scene 2: The Night Watch',
      summary: 'Overnight, someone tries to destroy the ballot boxes, bribe the vote counters, and spread fear.',
      challenge: 'exploration',
      keyEvents: [
        'The ballot storage: someone attempts to break in - hired thieves, not company employees',
        'The vote counter bribe: an envelope of gold left on the counter\'s doorstep with a note',
        'A fire at the union hall: arson attempt, caught early if the party is vigilant',
        'Tracing the sabotage: it leads not to the CEO\'s office but to a board member\'s intermediary',
      ],
    },
    {
      title: 'Scene 3: Voting Day',
      summary: 'The vote happens. The blockade. The count. The result.',
      challenge: 'combat',
      keyEvents: [
        'Morning: workers line up to vote - the turnout is massive',
        'The blockade: hired muscle blocks the dock gates, turning away voters',
        'Breaking through: the party must clear the blockade without hurting workers caught in between',
        'The count: ballots tallied in public, the result announced, and a new chapter begins',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Marta Cole', role: 'union organizer', personality: 'Counts votes on her fingers during conversations. Knows every dockworker\'s name, shift, and how many kids they have. Talks like she is giving a speech even in private. Runs on coffee and fury. "Two thousand people load their ships every day and not one of them gets a say in how."' },
    { name: 'CEO Adrienne Keel', role: 'secret ally', personality: 'Speaks like a press release in public - measured, corporate, deniable. In private, drops the mask and talks fast, checking the door. "My board wants a war. I want a workforce that does not hate me. Tell me what you need. Do not tell me how you got it."', secret: 'She has been leaking information to the union organizer through a trusted aide.' },
    { name: 'Harbor Master Fell', role: 'neutral authority', personality: 'Stands with hands clasped behind his back at all times. Addresses everyone by title. Issues instructions, not requests. "You are election observers. Observe. Document. Intervene only when the rules are broken. The rules will be broken."' },
  ],
  keyLocations: [
    { name: 'The Port Gallus Docks', description: 'A sprawling waterfront of warehouses, cranes, and ships. Two thousand workers load and unload cargo here every day.', significance: 'Where the vote happens and the blockade occurs.' },
    { name: 'The Union Hall', description: 'A converted warehouse where organizers meet. Flyers on the walls, coffee on the stove, a ballot box in the center.', significance: 'The heart of the organizing effort and an arson target.' },
    { name: 'The Harbor Authority Office', description: 'A stone building overlooking the docks. The Harbor Master\'s headquarters and the party\'s base of operations.', significance: 'Where the party coordinates and the ballots are secured.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'combatNarration', 'chaseSequence'],
};
