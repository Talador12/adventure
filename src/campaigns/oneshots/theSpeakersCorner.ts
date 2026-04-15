import type { OneShotCampaign } from '../types';

export const theSpeakersCorner: OneShotCampaign = {
  id: 'oneshot-speakers-corner',
  type: 'oneshot',
  title: 'The Speaker\'s Corner',
  tagline: 'Two centuries of free speech. One staged riot. A council vote at sunset. The square does not defend itself.',
  tone: 'political',
  themes: ['political', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Speaker\'s Corner in Ashgate has been a place of free expression for two centuries. Anyone can stand on the stone platform and say anything. Today, the city council votes to close it - "public safety concerns." The real reason: a speaker last week named council members taking bribes. The party must defend the square through one chaotic afternoon of speeches, protests, and political maneuvering.',
  hook: 'An old woman climbs onto the speaking stone: "This corner has heard every voice in this city for two hundred years. Today the council votes to silence it. I am too old to fight. Are you?"',
  twist: 'The "public safety" justification is not entirely fabricated. A speaker DID incite a small riot last month - but it was a plant. The council hired an agitator to cause a disturbance, then used the disturbance as evidence that the Corner is dangerous. The party can find the agitator and prove the setup.',
  climax: 'The council\'s emergency vote. The party can present evidence of the planted agitator, rally public support, or make their own speech from the Corner itself. The final speaker of the afternoon - whoever the party chooses - gives the speech that determines whether the Corner survives.',
  scenes: [
    {
      title: 'Scene 1: The Afternoon Begins',
      summary: 'The Speaker\'s Corner is alive with voices. The party arrives to find speakers, protesters, and city guards all converging.',
      challenge: 'social',
      keyEvents: [
        'The regulars: a poet, a conspiracy theorist, a preacher, and a woman reading names of the war dead',
        'The protesters: citizens with signs defending the Corner, facing a line of city guards',
        'The guards: under orders to "maintain order" but sympathetic - most grew up listening to Corner speeches',
        'The council: votes at sunset, three blocks away, and the party can influence the outcome',
      ],
    },
    {
      title: 'Scene 2: The Setup',
      summary: 'Investigating the planted agitator and the council\'s manufactured justification.',
      challenge: 'exploration',
      keyEvents: [
        'Witnesses to the riot: descriptions of the agitator do not match any known regular',
        'The trail: the agitator was seen entering a council member\'s office the day before',
        'Finding the agitator: a hired actor, paid in gold, still in town and not particularly loyal to his employer',
        'The confession: with the right pressure or persuasion, he admits the whole thing was staged',
      ],
    },
    {
      title: 'Scene 3: The Final Speech',
      summary: 'The council votes at sunset. The party makes their case - at the council chamber, at the Corner, or both.',
      challenge: 'social',
      keyEvents: [
        'The evidence: presenting the staged riot proof to the council or to the public',
        'The counter: the council argues the Corner is outdated and dangerous regardless',
        'The speech: someone must stand on the stone and make the case for free expression',
        'The vote: the council decides, influenced by public pressure and the party\'s evidence',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Grandmother Wynn', role: 'catalyst', personality: 'Grips the speaking stone like an old friend when she talks. Addresses the crowd as "neighbors" even when half of them are strangers. Tells you the history of every speech she remembers, dating back sixty years, and expects you to remember too.' },
    { name: 'Councilor Draven', role: 'antagonist', personality: 'Uses the phrase "reasonable people can agree" to introduce unreasonable proposals. Speaks with the calm of someone who has already decided and is performing deliberation. Touches his collar when someone mentions bribery.', secret: 'He was named in the bribery speech. His motive is self-preservation disguised as public safety.' },
    { name: 'Beck', role: 'hired agitator', personality: 'Still in character half the time - slips between his real voice and the "angry citizen" persona he performed. Picks at his fingernails when nervous. "Look, I am an actor. I needed coin. He said make some noise, I made some noise. Nobody said anything about shutting the place down."' },
  ],
  keyLocations: [
    { name: 'The Speaker\'s Corner', description: 'A weathered stone platform in a cobblestone square. Two centuries of footprints have worn grooves into the speaking stone. Surrounded by listeners, vendors, and today, guards.', significance: 'The place itself is what is at stake.' },
    { name: 'The Council Chamber', description: 'A formal room where the vote will happen at sunset. The gallery is packed.', significance: 'Where the political decision is made.' },
    { name: 'The Back Alleys', description: 'Where the agitator is hiding and where the party traces the conspiracy.', significance: 'Where the evidence is found.' },
  ],
  dataSystems: ['socialEncounter', 'chaseSequence', 'npcBackstoryGen'],
};
