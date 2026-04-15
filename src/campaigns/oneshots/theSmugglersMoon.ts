import type { OneShotCampaign } from '../types';

export const theSmugglersMoon: OneShotCampaign = {
  id: 'oneshot-smugglers-moon',
  type: 'oneshot',
  title: 'The Smuggler\'s Moon',
  tagline: 'Her face is on every wanted poster. Every gate is locked. The bounty doubles every hour. Get her out by dawn.',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The city of Vaultgate is under lockdown. The gates are sealed, the walls patrolled, and checkpoints block every major street. The party must smuggle out Sera Quinn - a resistance leader whose face is on every wanted poster in the city. She cannot fight. She cannot hide. She is the most recognizable person in Vaultgate. The party has one night.',
  hook: 'Sera stands in a safe house that will not be safe much longer: "I need to be outside these walls by dawn. If they catch me, the resistance dies. I am not a fighter - I am a symbol. Symbols are useless in a dungeon cell. Every guard has my face memorized. Every gate is locked. Get me out."',
  twist: 'The lockdown is not because of Sera. The city is locked down because of a plague outbreak in the eastern district. The guards are not looking for Sera specifically - they are checking everyone for disease symptoms. This changes the party\'s approach entirely: they do not need to hide Sera from a manhunt. They need to get her through a quarantine checkpoint.',
  climax: 'The north gate. The only exit not fully bricked shut. A quarantine checkpoint with a health mage, six guards, and a line of civilians trying to leave. Sera must pass the health check, the identity check, and walk through the gate without being recognized. The disguise, the forged papers, and the distraction must all work simultaneously.',
  scenes: [
    {
      title: 'Scene 1: The Safe House',
      summary: 'Planning the route, disguising Sera, and gathering the tools needed to breach the checkpoints.',
      challenge: 'social',
      keyEvents: [
        'Sera\'s face: on every poster, known to every guard - no simple disguise will work',
        'The routes: four gates, all sealed; the walls are 30 feet high and patrolled',
        'The north gate: the only one still processing civilian exit - through a quarantine checkpoint',
        'The disguise: Sera needs a new face, new papers, and a cover story that withstands scrutiny',
      ],
    },
    {
      title: 'Scene 2: The Streets',
      summary: 'Moving through the locked-down city at night. Checkpoints, patrols, and a population that might turn Sera in for the bounty.',
      challenge: 'exploration',
      keyEvents: [
        'The route: backstreets, rooftops, a friendly merchant\'s warehouse - multiple paths to the north gate',
        'A checkpoint encounter: guards checking papers - Sera\'s disguise gets its first test',
        'The bounty: doubled since morning - some civilians are actively looking for her',
        'A close call: someone recognizes something familiar about "the woman with the limp"',
      ],
    },
    {
      title: 'Scene 3: The Gate',
      summary: 'The north gate. The final checkpoint. Everything depends on the next five minutes.',
      challenge: 'social',
      keyEvents: [
        'The line: civilians waiting for quarantine clearance, guards checking everyone slowly',
        'The health mage: magical inspection for plague symptoms - Sera is healthy but the spell might detect her magical disguise',
        'The identity check: forged papers, a cover story, and a guard who takes his job seriously',
        'The walk: through the gate, past the guards, into the darkness beyond the walls - do not look back',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Sera Quinn', role: 'the cargo', personality: 'Writes speeches that move thousands. Cannot lie to a single guard without her voice shaking. Keeps trying to adjust her disguise. Apologizes every time she slows the party down. Brave in exactly one way and terrified in all the others.' },
    { name: 'Gate Captain Renn', role: 'obstacle', personality: 'Checks papers by holding them up to the light. Asks the same three questions of every person and watches their eyes, not their mouths. Not hunting Sera - just doing her job with a thoroughness that might as well be malice.' },
    { name: 'Forger Kell', role: 'ally', personality: 'Examines his own forgeries with a magnifying glass before handing them over. Talks about paper weight and ink consistency the way sommeliers talk about wine. "I guarantee the paper. I guarantee the seal. The performance is your problem. Do not sweat on the documents."' },
  ],
  keyLocations: [
    { name: 'The Safe House', description: 'A basement apartment in the merchant quarter. Temporary, cramped, and about to be compromised.', significance: 'Where the plan is made.' },
    { name: 'The Locked-Down Streets', description: 'Empty after curfew. Guard patrols every ten minutes. Checkpoint barriers at every major intersection.', significance: 'The gauntlet between the safe house and the gate.' },
    { name: 'The North Gate', description: 'The only functioning exit from Vaultgate. A quarantine checkpoint with health mages, guards, and a long line of desperate civilians.', significance: 'The final obstacle.' },
  ],
  dataSystems: ['heistPlanner', 'chaseSequence', 'socialEncounter'],
};
