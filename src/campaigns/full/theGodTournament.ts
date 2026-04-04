import type { FullCampaign } from '../types';

export const theGodTournament: FullCampaign = {
  id: 'full-god-tournament',
  type: 'full',
  title: 'The God Tournament',
  tagline: 'Every century, the gods play a game. This century, they\'re using you.',
  tone: 'epic',
  themes: ['planar', 'classic_fantasy', 'war'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 5, end: 16 },
  estimatedSessions: 20,
  settingSummary:
    'Every hundred years, the gods settle their disputes through the Tournament of Aspects — a competition where each deity selects mortal champions to compete in a series of trials across the planes. The winners\' gods gain dominion over a sphere of influence for the next century. The party has been chosen by different gods, which means they must cooperate despite their patrons being rivals.',
  hook: 'Each party member receives a divine mark in their sleep — a different god has chosen each of them. A celestial herald arrives and explains: they are now champions in the Tournament of Aspects. They must compete in five trials across five planes. Refusal isn\'t an option — the mark is permanent, and champions who don\'t compete forfeit their god\'s domain.',
  twist:
    'The Tournament is rigged. A forgotten god — one who lost everything in the last Tournament and was erased from mortal memory — has been manipulating the trials to ensure every champion fails. When all champions fail, the tournament rules reset all divine domains to neutral, creating a power vacuum this forgotten god intends to fill.',
  climax:
    'The final trial. The forgotten god reveals itself and rewrites the arena. The party must win a trial that was designed to be unwinnable, their patron gods can only watch, and the only way to succeed is for the champions of rival gods to trust each other completely — something no Tournament team has ever done.',
  acts: [
    {
      title: 'Act 1: The Choosing',
      summary:
        'The party receives their divine marks, meets the other champion teams, and competes in the first two trials. They learn the rules, the stakes, and that their gods don\'t always agree.',
      keyEvents: [
        'Divine marking — each player chosen by a different god with different expectations',
        'The Grand Arena — celestial colosseum where trials are announced',
        'Trial 1: The Labyrinth of Echoes — maze that tests wisdom and teamwork',
        'Trial 2: The Siege of Shadows — defend a fortress against wave attacks',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Trials',
      summary:
        'Trials 3 and 4 take the party across planes. Between trials, political maneuvering between champion teams. The party notices something is wrong — trials are harder than they should be.',
      keyEvents: [
        'Trial 3: The Merchant\'s Gambit — trade and negotiate across a planar marketplace',
        'Trial 4: The Crucible — survival in a hostile demiplane for 24 hours',
        'Other champion teams start losing in impossible ways — sabotage?',
        'A disqualified champion warns the party: "The tournament is rigged"',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Final Trial',
      summary:
        'The forgotten god reveals itself. The final trial is rewritten. The party must win an impossible challenge while their patron gods are forced to watch helplessly.',
      keyEvents: [
        'The forgotten god manifests — rewrites the arena mid-trial',
        'Patron gods are bound by tournament rules — they cannot intervene',
        'The party must trust each other despite their gods\' rivalries',
        'Victory requires using every skill, every alliance, every lesson from the campaign',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Herald Auraxis',
      role: 'tournament master / neutral',
      personality:
        'A solar angel who has run the Tournament for millennia. Formal, fair, slightly bored. Becomes alarmed when the sabotage begins.',
    },
    {
      name: 'Team Ironblood',
      role: 'rival champions',
      personality:
        'A team of ruthless champions sponsored by war gods. Competent, honor-bound, but willing to play dirty within the rules. Their leader, Kael, respects worthy opponents.',
    },
    {
      name: 'The Unnamed',
      role: 'true antagonist',
      personality:
        'A god so thoroughly erased that saying its name causes headaches. It exists in the gaps between memories. Bitter, brilliant, and patient — it has been planning this for a century.',
      secret: 'It was once the god of stories and was erased when it lost a tournament. It wants to become the god of everything.',
    },
    {
      name: 'Whisper (disqualified champion)',
      role: 'informant / ally',
      personality:
        'A halfling rogue whose entire team was eliminated in a "freak accident." She figured out the sabotage and is trying to warn surviving teams. Cynical, paranoid, right about everything.',
    },
  ],
  keyLocations: [
    {
      name: 'The Grand Arena',
      description:
        'A celestial colosseum floating between planes. Seats millions of divine spectators. Each trial transforms the arena into a different environment.',
      significance: 'Where trials are announced and the climax takes place.',
    },
    {
      name: 'The Champion Quarters',
      description:
        'A pocket dimension where champion teams rest between trials. Luxurious, but bugged by divine observers.',
      significance: 'Where inter-team politics and planning happen.',
    },
    {
      name: 'The Void Between',
      description:
        'Where the Unnamed hides — a gap in divine reality where erased things go. Cold, empty, and full of forgotten gods.',
      significance: 'Where the sabotage is orchestrated from.',
    },
  ],
  dataSystems: [
    'tournamentBracket',
    'encounterWaves',
    'skillChallenge',
    'deityPantheon',
    'planarMarketplace',
    'pocketDimension',
    'massCombat',
    'diplomaticNegotiation',
    'ancientProphecy',
  ],
};
