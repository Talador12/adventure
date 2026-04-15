import type { OneShotCampaign } from '../types';

export const theLighthouse: OneShotCampaign = {
  id: 'oneshot-lighthouse',
  type: 'oneshot',
  title: 'The Lighthouse',
  tagline: 'A lighthouse sixty miles inland, on a cliff over a forest. No ocean in any direction. Every night at dusk, the beam sweeps the valley. What is it holding back?',
  tone: 'exploration',
  themes: ['exploration', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'Sixty miles inland, on a cliff overlooking a forested valley, stands a lighthouse. There is no ocean, no lake, no body of water of any kind. Every night at dusk, the light turns on and sweeps the valley until dawn. Nobody tends it. Nobody built it, as far as anyone knows. The party investigates.',
  hook: 'The party sees the light from the road: a powerful beam sweeping the valley from a cliff-top tower. A passing farmer shrugs. "Been doing that since before my grandparents were born. Nobody goes up there. Nothing good comes from asking about it."',
  twist: 'The lighthouse is not warning ships. It is warning something in the forest. An ancient predator that hunts by darkness is sealed beneath the valley, held dormant by the lighthouse\'s beam. The light is not illumination. It is a ward. If the lighthouse stops, the predator wakes.',
  climax: 'The lighthouse\'s mechanism is failing. The light stutters. Darkness pools in the valley below and something moves in it. The party must repair the lighthouse before the beam dies completely and the predator escapes its prison of light.',
  scenes: [
    {
      title: 'Scene 1: The Climb',
      summary: 'Approaching and entering the lighthouse. It is well-maintained from the inside despite no visible keeper. The mechanism is complex and ancient.',
      challenge: 'exploration',
      keyEvents: [
        'The exterior: grey stone weathered by centuries of wind but structurally perfect. No door. Entry requires climbing through a ground-level window that opens easily, as if expecting visitors',
        'Inside: clean floors, oiled hinges, tools arranged by size on a workbench. A half-eaten meal has been perfectly preserved by the same magic that maintains everything. It smells of fresh bread',
        'The light mechanism: not fire, not crystal, not any recognizable magic. A sphere of pure white light that generates warmth and sound - a low hum felt in the teeth more than heard',
        'The logbook: entries in a spiral script with no known translation. But the drawings are universal: something vast and dark filling the valley like smoke, held at bay by lines that clearly represent the beam',
      ],
    },
    {
      title: 'Scene 2: The Warning',
      summary: 'Decoding the logbook and understanding what the lighthouse protects against. The drawings are unsettling. The mechanism needs maintenance.',
      challenge: 'puzzle',
      keyEvents: [
        'The drawings: a creature of shadow that fills the valley from edge to edge',
        'The mechanism: powered by a crystal that is cracking, its light noticeably dimmer',
        'A hidden chamber below the light room containing the original builder\'s explanation',
        'The explanation: the predator feeds on darkness, the light holds it dormant, the crystal is finite',
      ],
    },
    {
      title: 'Scene 3: The Failing Light',
      summary: 'The crystal cracks further. The light stutters. The valley below goes dark in patches and something moves in the shadows. Repair the lighthouse or face what it holds back.',
      challenge: 'combat',
      keyEvents: [
        'The light flickers and dies for 30 seconds: shadow tendrils rise from the valley',
        'The crystal shatters: the party must find an alternative power source immediately',
        'Shadow creatures climb the cliff as the darkness reaches the lighthouse',
        'Emergency repair: channel magical energy into the mechanism to restore the ward',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Farmer Redd', role: 'local / information', personality: 'Leans on his fence and watches the lighthouse with the wary respect of someone who lives next to something they do not understand. "My grandmother told me three things: pay your debts, never lie to a cleric, and never go up that tower. I have followed all three. I sleep fine." His cattle will not graze within a mile of the valley.' },
    { name: 'The Builder (journal)', role: 'backstory', personality: 'Present only through journal entries and drawings. A practical engineer who built the lighthouse not for ships but for survival. Their final entry: "The crystal will last 1,000 years. Someone must replace it before then. I will not be alive. I hope someone reads this."' },
    { name: 'The Shadow', role: 'antagonist', personality: 'Not a creature with personality. A predator of pure darkness that fills empty spaces. It does not think. It consumes. The light is the only thing that stops it.' },
  ],
  keyLocations: [
    { name: 'The Inland Lighthouse', description: 'A stone tower on a cliff 60 miles from any water, its beam sweeping a forested valley every night.', significance: 'The central location and the ward that keeps the predator dormant.' },
    { name: 'The Light Room', description: 'The top of the tower containing the failing crystal mechanism and the builder\'s logbook.', significance: 'Where the truth is learned and the repair must happen.' },
    { name: 'The Valley Below', description: 'A forested valley that looks peaceful by day but conceals something vast and dark beneath its surface.', significance: 'What the lighthouse protects. When the light fails, this is where the danger comes from.' },
  ],
  dataSystems: ['puzzleLock', 'explorationChallenge', 'encounterWaves', 'environmentalHazard', 'combatNarration'],
};
