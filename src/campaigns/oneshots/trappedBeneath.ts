import type { OneShotCampaign } from '../types';

export const trappedBeneath: OneShotCampaign = {
  id: 'oneshot-trapped-beneath',
  type: 'oneshot',
  title: 'Trapped Beneath',
  tagline: 'Buried alive. Air running out. Every action costs oxygen you cannot afford.',
  tone: 'survival',
  themes: ['survival', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A mining expedition gone wrong. An explosion sealed the tunnel behind the party. They are 200 feet underground with limited tools, fading torches, and a finite air supply. Every exertion burns oxygen faster. Digging out is possible, but so is digging into something worse.',
  hook: 'The blast hits without warning. Dust, darkness, silence. When the ringing stops, the party realizes the tunnel behind them is gone. The air already tastes thin.',
  twist:
    'The cave-in was not natural. The mine owners sealed it deliberately. The party stumbled into a vein of raw magic ore the company wants kept secret. A rescue team is coming, but not to rescue them.',
  climax:
    'The party breaks through to an air pocket and hears voices above. Rescuers? No. A cleanup crew sent to make sure nobody leaves. Fight in near-darkness with depleted resources, or find another way out through an unstable vertical shaft.',
  scenes: [
    {
      title: 'Scene 1: Buried',
      summary: 'Assessment of the situation. Limited light, limited air, limited tools. The party inventories what they have and plans.',
      challenge: 'exploration',
      keyEvents: [
        'Total darkness after the blast. One torch, two tinderboxes, mining tools.',
        'Air quality mechanic introduced: every strenuous action costs air.',
        'Two paths: dig back through the collapse, or push deeper into unknown tunnels.',
        'Strange glowing ore in the walls. Beautiful. Possibly the reason for the blast.',
      ],
    },
    {
      title: 'Scene 2: The Deep',
      summary: 'The party pushes deeper, navigating unstable tunnels, underground water, and claustrophobic passages. Air gets thinner.',
      challenge: 'exploration',
      keyEvents: [
        'A flooded passage. The water is black and cold. Swimming through costs three air ticks. Walking around costs forty minutes. Choose.',
        'An air pocket the size of a closet. The party gasps. Fresh-ish air. They have maybe ten minutes before they use it up. Rest or move.',
        'Something moves in the dark. Pale, eyeless cave crawlers drawn to the heat of living bodies. Fighting in a three-foot-high tunnel. Every swing costs air.',
        'Three skeletons in miner\'s gear around the glowing ore. One still holds a pickaxe. Another holds a note: "They sealed us in. The company knows about this vein."',
      ],
    },
    {
      title: 'Scene 3: No Rescue',
      summary: 'The party reaches the surface breach only to find the cleanup crew. Fight with nearly nothing, or escape through the unstable shaft.',
      challenge: 'combat',
      keyEvents: [
        'Voices above. Hope. Then the party hears the orders: "Seal it. Leave no witnesses."',
        'The cleanup crew begins pouring rubble into the shaft.',
        'Fight upward through the shaft, or collapse it on the crew and find another exit.',
        'The magic ore destabilizes. The whole mine is coming down. Run.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Foreman Galt',
      role: 'dead witness',
      personality: 'Found crushed in the initial blast. His journal reveals the company knew about the ore and planned to eliminate witnesses.',
    },
    {
      name: 'Captain Serna',
      role: 'cleanup crew leader',
      personality: 'Military posture, clean armor, flat voice. Gives orders like checking items off a list. "Seal shaft B. Confirm no egress." When cornered, she negotiates like someone doing math. Not cruel. Just compartmentalized.',
      secret: 'She does not know what the ore is. She was told the miners found a plague vein.',
    },
  ],
  keyLocations: [
    {
      name: 'The Collapsed Tunnel',
      description: 'A mining tunnel sealed by a deliberate explosion. Rubble fills 40 feet of passage.',
      significance: 'The starting prison. Going back through here is possible but costs enormous air.',
    },
    {
      name: 'The Glowing Vein',
      description: 'A vein of raw magic ore pulsing with faint light. Beautiful and dangerous. Destabilizes stone around it.',
      significance: 'The reason the party was buried. The MacGuffin the company wants hidden.',
    },
  ],
  dataSystems: ['survivalTracker', 'trapCorridor', 'combatNarration', 'environmentalHazard'],
};
