import type { FullCampaign } from '../types';

export const theLastOrchard: FullCampaign = {
  id: 'full-last-orchard',
  type: 'full',
  title: 'The Last Orchard',
  tagline: 'When the world ended, one grove refused to die.',
  tone: 'survival',
  themes: ['survival', 'wilderness', 'classic_fantasy'],
  playerCount: { min: 2, max: 5 },
  levelRange: { start: 1, end: 8 },
  estimatedSessions: 12,
  settingSummary:
    'The Blight consumed the world\'s vegetation three generations ago. Now only the Last Orchard remains—a magical grove protected by an ancient dryad whose power is fading. The players are refugees who stumble upon this sanctuary and must defend it from those who would consume it or steal its secrets.',
  hook: 'The party escapes a Blight-touched wasteland and discovers the Orchard hidden in a valley. The dryad Elder Willow offers shelter in exchange for protection and assistance finding the source of her fading power.',
  twist:
    'The Blight is not natural—it was created by the Orchard\'s original gardener, who went mad with grief when his family died. His final spell was meant to protect the trees by killing everything else that might threaten them.',
  climax:
    'The party must enter the Blight-wastes to find the Gardener\'s Tomb, break the spell at its source, and restore life to the world—all while defending the Orchard from a desperate army of Blight-survivors who want to take the grove by force.',
  acts: [
    {
      title: 'Act 1: Sanctuary',
      summary:
        'The party arrives at the Orchard and integrates with its small community of survivors. They help defend against blight-wolves, discover the dryad\'s weakening condition, and earn the trust of suspicious refugees.',
      keyEvents: [
        'First encounter with the Blight—undead vegetation that hunts living things',
        'Meeting Elder Willow and learning she grows weaker each season',
        'Defending the Orchard walls against a pack of blight-wolves',
        'Discovering ancient journals about the Orchard\'s creation',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Wastes',
      summary:
        'The party ventures into the Blight-wastes to find the Gardener\'s Tomb. They encounter other survivor settlements—some friendly, some hostile—and learn the true nature of the Blight\'s creation.',
      keyEvents: [
        'Travel through the Gray Wastes where even stone is slowly dissolving',
        'Meeting the Iron Harvesters—a cult that worships the Blight as purification',
        'Finding the Gardener\'s abandoned cottage with his mad writings',
        'An ally is infected with Blight-touch and begins transforming',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Life from Death',
      summary:
        'The party reaches the Gardener\'s Tomb and breaks the Blight spell. But this causes the Orchard\'s protective magic to fail—now they must race back to save the refugees from the returning wilderness and the Iron Harvesters\' final assault.',
      keyEvents: [
        'Navigating the Tomb\'s plant-based traps and the Gardener\'s undead form',
        'Breaking the Blight spell—green shoots begin appearing in the wastes',
        'The Iron Harvesters attack the now-vulnerable Orchard',
        'Final choice: let Elder Willow sacrifice herself to save the trees, or find another way',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Willow',
      role: 'ally / quest giver',
      personality:
        'Ancient dryad bound to the last apple tree. Kind but weary, speaks in growing metaphors. Views the refugees as her adopted children.',
      secret: 'She knows breaking the Blight will probably kill her—the magic sustaining her is tied to the spell.',
    },
    {
      name: 'Commander Harsha',
      role: 'antagonist',
      personality:
        'Leader of the Iron Harvesters who believes the Blight is divine punishment for humanity\'s sins. Charismatic, absolutely convinced, genuinely cares for her followers.',
      secret: 'She was the Gardener\'s daughter, cast out long ago. Part of her wants to save the Orchard, part wants to destroy it.',
    },
    {
      name: 'Tom the Trader',
      role: 'merchant / ally',
      personality:
        'Grizzled wasteland survivor who knows every settlement in the Gray Wastes. Cynical but has a soft spot for children.',
    },
    {
      name: 'The Gardener',
      role: 'tragic villain',
      personality:
        'Now a Blight-lich, driven by the last command of his dying grief: "Protect the trees." Cannot be reasoned with but can be reminded of who he was.',
    },
  ],
  keyLocations: [
    {
      name: 'The Last Orchard',
      description:
        'A valley of impossible greenery—apple trees, berry bushes, and flowers thriving in a world of gray death. Protected by a fading magical dome.',
      significance: 'The party\'s home base and the only source of non-tainted food for hundreds of miles.',
    },
    {
      name: 'The Gray Wastes',
      description:
        'The Blight-touched world beyond the Orchard. Ash-colored dust, skeletal trees that hunt the living, poisoned rivers.',
      significance: 'The journey to the Gardener\'s Tomb takes the party through this hostile landscape.',
    },
    {
      name: 'The Gardener\'s Tomb',
      description:
        'A greenhouse that became a mausoleum, now choked with Blight-touched vegetation. The spell\'s epicenter and the Gardener\'s prison.',
      significance: 'Where the Blight must be broken to save the world.',
    },
  ],
  dataSystems: ['wildernessSurvival', 'magicalEcosystem', 'naturalDisaster', 'apocalypseCamp'],
};
