import type { OneShotCampaign } from '../types';

export const theWorldTreeOneshot: OneShotCampaign = {
  id: 'oneshot-world-tree',
  type: 'oneshot',
  title: 'The World Tree',
  tagline: 'Leaves are falling from the sky in every plane at once. The World Tree is rotting from the inside. A city of a million people is living in its branches, and they do not know they are killing it.',
  tone: 'epic',
  themes: ['epic', 'planar', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  level: 8,
  estimatedHours: 3,
  settingSummary:
    'Yggdravar, the World Tree, spans every plane of existence. Its roots connect reality itself. It is dying. The bark is cracking, the leaves are falling across every plane simultaneously, and where roots die, the planes they connected begin to drift apart. The party must heal a tree the size of a planet before the multiverse unravels.',
  hook: 'Leaves are falling from the sky in every plane simultaneously - golden, silver, and black. A druid collapses: "The World Tree is dying. Its heartwood is rotting. If the trunk fails, the planes disconnect. No afterlife. No Feywild. No Shadowfell. Everything that is connected becomes alone."',
  twist: 'The Tree is not sick. It is being poisoned - by a city built in its branches that is dumping arcane waste into its heartwood. The city, Canopy, houses a million souls who have lived in the Tree for generations. They do not know they are killing it. Saving the Tree means confronting a civilization with the fact that their home is a parasite.',
  climax: 'The heartwood chamber. The party must purify the rot - a massive undertaking - while negotiating with Canopy\'s leaders about their future. The city can stay if it stops poisoning the Tree. But stopping means no more arcane industry, which is their entire economy. Save the Tree by destroying a city\'s way of life, or find a way to do both.',
  scenes: [
    {
      title: 'Scene 1: The Roots',
      summary: 'Traveling through the World Tree\'s root system. Seeing the damage firsthand. Understanding the scale.',
      challenge: 'exploration',
      keyEvents: [
        'The roots: tunnels of living wood connecting planes - some are dark and dead, cutting off entire realms',
        'The damage: rot spreading from above, not below - something in the canopy is causing this',
        'A dying root: the tunnel goes dark ahead. A pixie slams into the party, screaming. Behind her, the root tunnel collapses like a closing throat. The Feywild connection is severed. She is the last thing through.',
        'The path upward: climbing the trunk toward the source of the poison',
      ],
    },
    {
      title: 'Scene 2: The City of Canopy',
      summary: 'Discovering the city in the branches. A million people living in a tree they are unknowingly killing.',
      challenge: 'social',
      keyEvents: [
        'Canopy: a sprawling city built on and between branches, powered by arcane industry',
        'The waste: factories dumping arcane runoff into channels that lead directly to the heartwood',
        'The people: they love the Tree - it is their home, their identity - they do not know they are killing it',
        'The leaders: when told, some deny it, some are horrified, some argue economic necessity',
      ],
    },
    {
      title: 'Scene 3: The Heartwood',
      summary: 'Descending to the heartwood to purify the rot. The Tree\'s immune system treats the party as both threat and hope.',
      challenge: 'combat',
      keyEvents: [
        'The heartwood: a vast chamber of golden wood pulsing with fading life, streaked with black rot',
        'The purification: druidic magic, natural remedies, or the Tree\'s own dormant healing - all require the party\'s help',
        'The Tree\'s defenses: it cannot distinguish helpers from invaders - bark guardians attack',
        'The agreement: Canopy\'s leaders arrive - if they commit to change, the party\'s efforts succeed faster',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Archdruid Oaken', role: 'guide', personality: 'An ancient druid who has lived within the Tree for centuries. She felt the sickness first and has been screaming into the void for decades. Bitter, exhausted, and vindicated by the party\'s arrival.' },
    { name: 'Mayor Thell', role: 'Canopy leader', personality: 'A man who built his career on Canopy\'s prosperity. When shown the rot, he goes through five stages of grief in ten minutes. Denial: "Our filtration systems are fine." Anger: "You are fearmongering." Bargaining: "What if we reduce output by half?" Depression: silence. Acceptance: "Tell me what to do. Tell me how to save my city without killing the thing it stands on."', secret: 'He has seen the rot himself. He has been in denial because the alternative is unbearable.' },
    { name: 'The Heartwood Spirit', role: 'the tree itself', personality: 'A manifestation of the World Tree\'s consciousness. Speaks in seasons and growth cycles. Not angry at the city - just tired and in pain.' },
  ],
  keyLocations: [
    { name: 'The Root Tunnels', description: 'Living wood corridors connecting the planes. Some are dark where connections have died.', significance: 'Where the damage is visible and the stakes are clear.' },
    { name: 'Canopy City', description: 'A million-person city built in the World Tree\'s branches. Beautiful, vibrant, and unknowingly parasitic.', significance: 'The source of the poison and the hardest conversation.' },
    { name: 'The Heartwood Chamber', description: 'The core of the World Tree. Golden wood streaked with black rot. The pulse of reality itself.', significance: 'Where the healing happens and the Tree speaks.' },
  ],
  dataSystems: ['encounterWaves', 'combatNarration', 'socialEncounter', 'diplomaticNegotiation'],
};
