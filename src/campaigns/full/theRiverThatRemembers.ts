import type { FullCampaign } from '../types';

export const theRiverThatRemembers: FullCampaign = {
  id: 'full-river-that-remembers',
  type: 'full',
  title: 'The River That Remembers',
  tagline: 'The water knows what happened. Do you want to?',
  tone: 'mystery',
  themes: ['mystery', 'exploration', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 2, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Ashenmere River runs two hundred miles from the Greythorn Mountains to the sea. Drinking its water shows you a memory - not yours. Fragments of the past play behind your eyes like a dream you cannot control. Most memories are mundane: a woman hanging laundry, a man singing to his horse. But lately, the river has been showing the same memory to everyone who drinks: a young woman being murdered on a bridge, 200 years ago. The town of Millhaven at the river mouth has hired the party to find out why. Their beloved founder, Saint Elara, is said to have built the town. Nobody wants to hear what the river has to say about her.',
  hook: 'The mayor of Millhaven pours you each a glass of river water. "Drink," she says. You do. You see a bridge at night. A woman in white. A man she trusts. A knife. The memory cuts off. "Everyone sees it now," the mayor says. "For six weeks. The river wants us to know something. We need to know what." She pauses. "But we also need you to be careful. Saint Elara built this town. She is in every prayer, every school name, every harvest blessing. Whatever you find - be sure before you speak."',
  twist:
    'Saint Elara was not the woman who was murdered. She was the murderer. The woman on the bridge was Lirael, a river druid who discovered that Elara was siphoning magic from the river to fuel her own power. Elara killed Lirael and buried her in the riverbed. Then she built Millhaven on top of the grave and became its saint. The river has been trying to tell someone for two centuries. It finally gathered enough of Lirael\'s scattered memory to show the truth.',
  climax:
    'The party reaches the headwaters and finds Lirael\'s bones tangled in the river source. Freeing them will break the memory loop but also break the enchantments that Elara wove into Millhaven\'s foundations - enchantments that have protected the town from floods, famine, and plague for 200 years. The town must choose: live with the truth and lose the protection, or leave the bones and keep the lie. The party carries that question back downstream.',
  acts: [
    {
      title: 'Act 1: Downstream',
      summary:
        'The party investigates in Millhaven. They interview old families, search archives, and drink more river water to piece together fragments. Each drink shows a different slice of memory - some beautiful, some terrible. The town does not want this investigated too deeply.',
      keyEvents: [
        'First visions: each party member sees different memory fragments',
        'The town archivist has pages missing from the founding records',
        'A fisherwoman shows them where the visions are strongest - a bend in the river near the old bridge pilings',
        'Opposition emerges: the Church of Saint Elara does not want their saint questioned',
        'A second vision: Elara and the victim were friends. Close friends.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Upstream',
      summary:
        'The party follows the river upstream, village by village. Each settlement has its own relationship with the water and its own fragment of the 200-year-old story. The picture assembles slowly, and it is not the story anyone expected.',
      keyEvents: [
        'Village of Redford: a memory of Elara studying druidic magic under a woman in white',
        'Ruins of an old druid circle, half-submerged, still humming with power',
        'The river shows a happy memory: the two women laughing together, planning a town',
        'The first hint that Elara was not the victim but the aggressor',
        'Father Aldren follows the party upstream, intent on destroying evidence',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Source',
      summary:
        'At the headwaters, the full truth. Lirael\'s bones. The stolen magic. And a choice that has no clean answer. The party returns to Millhaven carrying the weight of what they know.',
      keyEvents: [
        'The headwater cave: Lirael\'s remains tangled in the river source',
        'Final vision: the complete memory plays - the betrayal, the murder, the burial',
        'The river spirit manifests - not angry, just tired of carrying this alone',
        'Father Aldren arrives and begs the party to leave the bones, for the town\'s sake',
        'The choice: free the bones (truth, lose protection) or leave them (safety, keep the lie)',
        'Return to Millhaven. The town gathers. The party speaks.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Mayor Tessa Wren',
      role: 'quest giver',
      personality:
        'Rolls her sleeves up past her elbows year-round. Stands with feet planted wide, arms crossed, like she is bracing for bad news. Speaks in plain sentences with no decoration. "The visions are scaring the fishermen. No fishermen, no fish. No fish, no town. I want the truth, but I want my town to survive more. If those two things conflict, we will cross that bridge when the river lets us."',
    },
    {
      name: 'Father Aldren',
      role: 'antagonist / true believer',
      personality:
        'Head of the Church of Saint Elara. Not corrupt - genuinely devout. He has built his entire life around Elara\'s example. The possibility that she was a murderer is not just a historical correction; it is the destruction of everything he believes.',
      secret: 'He found one of the missing archive pages years ago. He burned it. He has never forgiven himself, but he would do it again.',
    },
    {
      name: 'Nessa Clearwater',
      role: 'guide / river-wise fisherwoman',
      personality:
        'Third-generation fisherwoman. Talks to the river like it is a person. Mostly practical, occasionally mystical. She has been drinking river water her whole life and has seen more memories than anyone.',
      secret: 'She has seen a memory of Lirael alive - and recognized the resemblance to her own family. She may be a descendant.',
    },
    {
      name: 'The River Spirit (Lirael\'s Echo)',
      role: 'spectral witness',
      personality:
        'Not a ghost. Not quite alive. A consciousness dissolved into water over two centuries, slowly reassembling itself from scattered memories. Speaks in fragments. Patient beyond measure. Not vengeful - just exhausted from holding a truth no one would listen to.',
    },
  ],
  keyLocations: [
    {
      name: 'Millhaven',
      description:
        'A prosperous river town built on enchanted foundations. Every doorframe has Elara\'s sigil carved into it. The river runs clean here, the harvests never fail, and nobody asks why.',
      significance: 'Where the investigation begins and ends. What the party discovers threatens everything this place is built on.',
    },
    {
      name: 'The Old Bridge Pilings',
      description:
        'Stone pillars jutting from the river where the original bridge stood. The water here is colder. The visions here are louder. Flowers left by pilgrims rot faster than they should.',
      significance: 'The murder site. Where the visions are strongest.',
    },
    {
      name: 'The Headwater Cave',
      description:
        'A cavern where the river is born from stone. Bioluminescent moss. The sound of water echoing. At the center, bones wrapped in roots, glowing faintly with stolen druidic power.',
      significance: 'Where the truth lives and the final choice is made.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcRelationshipWeb',
    'socialEncounter',
    'ancientProphecy',
    'factionReputation',
    'hauntedLocation',
    'ritualCasting',
    'weatherHazard',
  ],
};
