import type { FullCampaign } from '../types';

export const theHarvestFestival: FullCampaign = {
  id: 'full-harvest-festival',
  type: 'full',
  title: 'The Harvest Festival',
  tagline: 'The village has never lost a harvest. The village has never kept a child.',
  tone: 'horror',
  themes: ['horror', 'wilderness', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 7 },
  estimatedSessions: 12,
  settingSummary:
    'Willowmere\'s annual Harvest Festival is legendary - three days of feasting, games, and celebration. The party arrives as guests. Everything is warm, welcoming, and slightly too perfect. The food is too good. The people are too happy. The flowers bloom despite the season being wrong for them. And every year, someone goes missing on the third night. The villagers do not seem to remember.',
  hook: 'The party arrives at Willowmere for the festival. A cheerful elder greets them: "Welcome, welcome! The first night is the Feast of Plenty, the second is the Games of Harvest, and the third is the Night of Gratitude. We are so glad you are here." Behind her, a child tugs the nearest party member\'s sleeve and whispers without making eye contact: "Leave before the third night. Please. They chose me this year."',
  twist:
    'The village made a pact with a fey entity 200 years ago: perfect harvests forever, in exchange for one soul per year on the Night of Gratitude. The village does not remember the pact consciously - the fey erases the memory each year. But their bodies remember: every villager avoids a specific clearing in the woods without knowing why. Dogs will not cross the treeline. The child can see through the enchantment because she is this year\'s offering - the magic thins around the chosen.',
  climax:
    'The third night. The fey comes to collect. The party must protect the child, break the pact, and deal with the consequences: without the pact, the harvest fails. 200 years of stored famine hits at once. The village must decide if they want the truth - and whether survival without the pact is possible.',
  acts: [
    {
      title: 'Act 1: The Feast',
      summary:
        'Arrival, the first night\'s festivities, and the creeping wrongness. Everything is wonderful and something is off. The food tastes too perfect. The laughter lasts a beat too long. The village is performing joy with the precision of something rehearsed two hundred times.',
      keyEvents: [
        'The Feast of Plenty: incredible food, warm hospitality, genuine joy. A Perception check notices the flowers are wrong for the season - summer blooms in autumn.',
        'The child\'s warning - she speaks fast, wringing her hands, watching the treeline: "They do not know what they do. Every year, someone vanishes. Nobody asks where they went."',
        'Small oddities: the clearing nobody goes near, the song nobody remembers writing, a scarecrow that faces a different direction every time the party looks away',
        'A historical anomaly: 200 years of perfect harvests in a region known for poor soil. The inn\'s ledger lists no famine, no drought, no lean year. Ever.',
        'Quiet dread: the party wakes at dawn to find every door in the village open. Every single one. The villagers close them without comment.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: The Games',
      summary:
        'The second day. Festival games, deeper investigation, and the history of the pact. The party discovers the pattern while the village smiles through teeth that are starting to look less like hospitality and more like a rictus.',
      keyEvents: [
        'Harvest Games: archery, wrestling, pie-eating - genuinely fun. But the wrestling ring is a circle of white stones, and the old women watch the matches without blinking.',
        'Investigation: the child leads the party to the clearing - a stone circle, hidden by brambles that MOVE to block their path, then part reluctantly when the child approaches',
        'The archives: every year, one resident is listed as "moved away." None of them are real. The handwriting changes each entry, but the phrasing is identical. Word for word. For two hundred years.',
        'The fey\'s presence felt: eyes in the trees that reflect light wrong, whispers in the wind that use the party\'s names, the clearing glows faintly at midnight with a color that has no name',
        'Elder Maren sleepwalks to the clearing\'s edge. She stops at the treeline, turns around, and walks back. Her eyes are open. She is smiling. She does not remember in the morning.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Night',
      summary:
        'The third night. The fey comes. The village walks toward the clearing in a trance. The party must break the cycle while a two-hundred-year-old enchantment fights to maintain itself.',
      keyEvents: [
        'Midnight: every villager stands simultaneously and walks toward the clearing, eyes closed, smiling. Their footsteps are perfectly synchronized.',
        'The child is drawn by the pact - her feet move without her permission. She grabs a doorframe. Her fingers leave marks in the wood.',
        'The fey appears: beautiful, ancient, and offended that someone would break the arrangement. She smells like rotting flowers beneath perfume. Her shadow does not match her body.',
        'Breaking the pact: confrontation, negotiation, or a third option the fey did not anticipate. Every approach requires a sacrifice.',
        'The dawn: if the pact breaks, the fields wither in minutes. Two hundred years of stored famine settles on Willowmere like dust. The village must choose what they are willing to pay for the truth.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Maren',
      role: 'village leader / unknowing participant',
      personality:
        'A warm, grandmotherly figure who runs the festival with genuine love. She touches people\'s shoulders when she talks to them, as if confirming they are real. She does not remember the pact. When she learns the truth, something behind her eyes breaks quietly. She does not scream. She sits down and stops talking for a very long time.',
      secret: 'Her own daughter was the offering 30 years ago. She listed her as "moved to the city." She has never visited. She knits a scarf every winter for a daughter she cannot remember losing.',
    },
    {
      name: 'Lira (age 10)',
      role: 'the offering / the party\'s moral compass',
      personality:
        'A serious, frightened child who can see through the enchantment. She speaks in short, clipped sentences and will not stand near the treeline. She holds her own wrists when she is scared, as if keeping herself from running. She does not cry. Children who have been chosen do not cry - the enchantment takes that from them first.',
    },
    {
      name: 'The Greenmother',
      role: 'fey entity / antagonist',
      personality:
        'A fey who considers the pact a fair trade. Her voice sounds like wind through wheat. She tilts her head too far when she listens. "I give them 200 years of plenty. They give me one soul per year. The math favors them. You mortals are so ungrateful." She is not evil by fey standards. By mortal standards, she is a monster who has eaten two hundred people and kept a receipt for each one.',
    },
    {
      name: 'Tam Vossler',
      role: 'village blacksmith / the one who almost remembers',
      personality:
        'A broad, quiet man who works the forge with hands that shake when the wind blows from the clearing. He has carved 200 notches into the back wall of his smithy. He does not know why. He adds one every autumn and cannot explain the compulsion. When asked, he stares at the notches and his mouth opens and closes without sound.',
    },
  ],
  keyLocations: [
    {
      name: 'Willowmere',
      description: 'A picturesque village that is too good to be true. The kind of place artists paint and travelers remember fondly. The flowers are always in bloom. The bread is always warm. The children are always one short.',
      significance: 'The setting for all three days. A place so pleasant it takes effort to notice what is wrong.',
    },
    {
      name: 'The Clearing',
      description: 'A stone circle in the woods that nobody remembers going to. The brambles around it move to discourage visitors. The stones are warm to the touch. The grass inside the circle is a shade of green that does not exist in nature.',
      significance: 'Where the pact was made and the offerings are taken. The ground is soft - too soft, as if something is buried underneath, many times over.',
    },
    {
      name: 'The Festival Grounds',
      description: 'The village common, decorated for the harvest. Lanterns, tables, music. The happiest place in the world, built on a lie that renews itself every autumn.',
      significance: 'Where the first two days\' events take place. Where joy and dread share the same table.',
    },
  ],
  dataSystems: ['darkBargain', 'enchantedForest', 'festivalAdvanced', 'socialEncounter', 'hauntedLocation', 'backstoryComplication', 'cataclysmCountdown', 'dreamSequence', 'npcRelationshipWeb'],
};
