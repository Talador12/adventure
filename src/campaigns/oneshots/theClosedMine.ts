import type { OneShotCampaign } from '../types';

export const theClosedMine: OneShotCampaign = {
  id: 'oneshot-closed-mine',
  type: 'oneshot',
  title: 'The Closed Mine',
  tagline: 'The mine is not depleted. The owners just found something more valuable than iron underneath.',
  tone: 'political',
  themes: ['political', 'intrigue', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The Ironhollow Mine employed two hundred workers. The Creston Mining Company closed it six months ago, claiming the veins were depleted. The miners know better - they were pulled out mid-shift. The town of Ironhollow is dying without the mine. The party has been hired by the miners\' collective to investigate.',
  hook: 'Foreman Dag slams a chunk of ore on the table: "This came out of Shaft 7 the day they closed us. Does this look depleted to you? Two hundred families are starving because Creston says the mine is empty. It is not. Something else is going on down there and I need someone to find out what."',
  twist: 'Creston found a deposit of residuum - raw magical energy in crystalline form - worth a thousand times more than iron. They closed the mine to clear the workers, filed for "depletion" to kill the union contract, and plan to reopen with non-union labor under a different company name. The miners\' rights to the mine die when the depletion claim is certified.',
  climax: 'Deep in the mine, the party finds the residuum deposit - glowing, massive, worth a fortune. Creston\'s private security team arrives. The foreman and miners are outside. The party must secure evidence of the fraud, protect the miners\' claim, and deal with armed guards in a confined space.',
  scenes: [
    {
      title: 'Scene 1: The Town',
      summary: 'Ironhollow is dying. The party sees the human cost and gathers information before entering the mine.',
      challenge: 'social',
      keyEvents: [
        'The town: closed shops, idle miners, children asking when work comes back',
        'The foreman: experienced, knows the mine intimately, certain the ore is still there',
        'Creston\'s local office: locked, emptied, one nervous clerk left behind to handle "paperwork"',
        'The clerk: knows something, scared of Creston, might talk if the party earns trust',
      ],
    },
    {
      title: 'Scene 2: The Mine',
      summary: 'Descending into the closed mine. Evidence of recent activity, new tunnels that were not on the old maps, and the discovery of what Creston is really after.',
      challenge: 'exploration',
      keyEvents: [
        'The entrance: officially sealed, but the locks have been changed recently',
        'Old tunnels: iron veins still rich - the depletion claim is provably false',
        'New tunnels: freshly dug, heading deeper than any miner has been, marked with Creston symbols',
        'The deposit: a cavern of glowing residuum crystals worth more than the entire town',
      ],
    },
    {
      title: 'Scene 3: The Claim',
      summary: 'Creston\'s private security arrives. The fight for the mine and the town\'s future.',
      challenge: 'combat',
      keyEvents: [
        'Security team: six armed guards and a company mage, ordered to "clean out trespassers"',
        'The evidence: mining surveys, residuum samples, the clerk\'s testimony',
        'The miners arrive: Dag brought people - the mine is theirs and they are not leaving',
        'Resolution: the evidence goes to the magistrate, the mine stays open, the union contract holds',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Foreman Dag', role: 'quest giver', personality: 'Speaks by hitting things for emphasis - the table, his knee, the wall. Never finishes a sentence without a mining metaphor. "You do not find truth sitting on the surface. You dig." Thirty years underground carved permanence into his voice.' },
    { name: 'Director Marsh', role: 'antagonist', personality: 'Speaks in quarterly earnings language even when discussing human lives. Calls miners "labor units." Calls the town "the operational footprint." Genuinely does not hear how monstrous it sounds.', secret: 'He is under pressure from Creston\'s board. If this fails, he loses his position too.' },
    { name: 'Clerk Penny', role: 'reluctant witness', personality: 'Whispers everything. Looks at the door before answering any question. Folds and unfolds the same piece of paper while talking. Will not make eye contact but will slide documents across the table when no one is looking.' },
  ],
  keyLocations: [
    { name: 'Ironhollow', description: 'A mining town built around a single industry. Without the mine, it is a collection of empty houses and desperate people.', significance: 'The human stakes.' },
    { name: 'The Ironhollow Mine', description: 'A deep mine network carved into the mountainside. Dark, damp, and full of ore that Creston says does not exist.', significance: 'Where the truth is buried - literally.' },
    { name: 'The Residuum Cavern', description: 'A natural cavern deep below the mine, filled with glowing crystals of raw magical energy. Beautiful and worth a kingdom.', significance: 'The real reason the mine was closed.' },
  ],
  dataSystems: ['encounterWaves', 'combatNarration', 'socialEncounter', 'trapDisarm'],
};
