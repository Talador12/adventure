import type { FullCampaign } from '../types';

export const theLostLanguage: FullCampaign = {
  id: 'full-the-lost-language',
  type: 'full',
  title: 'The Lost Language',
  tagline: 'The children are speaking a language that died a thousand years ago. Nobody taught them.',
  tone: 'social',
  themes: ['social', 'mystery', 'exploration'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 1, end: 5 },
  estimatedSessions: 12,
  settingSummary:
    'In the village of Ashenmoor, children under the age of ten have begun speaking a language no living person recognizes. They speak it to each other, to animals, to the trees. Linguists from the university cannot classify it. Clerics detect no curse. The children are happy, healthy, and confused that adults cannot understand. The party must figure out what the language is, where it came from, and what it means - through conversation, research, and listening to people who have spent their lives ignoring the answers.',
  hook: 'A worried parent hires the party after her daughter began speaking to the river in a language that made the water respond. The river changed course slightly. Nobody was hurt. The parent is terrified. The daughter is delighted. "The water wanted to go that way, Mama. I just asked nicely."',
  twist:
    'The language is not dead. It is the native tongue of the land itself - the original language of the world, spoken before mortals developed their own words. Mountains, rivers, forests, and stones all speak it. Adults stopped listening centuries ago when civilization decided nature was something to conquer rather than converse with. The children hear it because they have not yet learned to stop listening.',
  climax:
    'A mining company is about to blast through a sacred hillside that has been trying to warn the village for decades - in a language nobody understood. The children translate: the hill is alive, ancient, and afraid. The party must convince the village to listen to their children, trust a language they cannot speak, and choose between profit and a relationship with the land that has sustained them for generations.',
  acts: [
    {
      title: 'Act 1: The Mystery',
      summary: 'The children are speaking. Adults are panicking. The party investigates through interviews, research, and observation.',
      keyEvents: [
        'Meeting the children: they are not possessed, cursed, or mad. They are simply bilingual in a language nobody else speaks.',
        'University linguists arrive and fail: the language does not match any known family',
        'Quiet moment: Elara takes the party to the river and speaks to it. The water shifts - not dramatically, just a gentle lean toward her voice. She smiles. "It likes you. It says you walk heavy but you mean well."',
        'A temple cleric detects no magic, no curse, no divine influence. This is natural.',
        'An elderly herbalist says: "My grandmother spoke like that. She said the herbs told her what they needed."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Research',
      summary: 'Digging deeper. Old texts, forgotten scholars, and the slow realization that this language was never lost - it was abandoned.',
      keyEvents: [
        'A crumbling archive contains a pre-civilizational text: "Before words, we listened. The world spoke first."',
        'The party finds a hermit druid who speaks fragments of the language. She has been alone for decades because nobody believed her.',
        'The moment of cost: Old Maren and Professor Venn meet. She speaks the language he spent his career cataloguing. He cannot hear it. He devoted his life to words and missed the oldest ones. The look on his face when Elara translates for him is the sound of a worldview breaking.',
        'Quiet moment: the children demonstrate. They speak to a dying tree and it blooms. A farmer who wanted the tree removed watches new leaves unfold. He takes off his hat. He does not have words for what he saw.',
        'Historical records show the language was systematically suppressed during the Age of Expansion - nature was to be tamed, not spoken to',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Listening',
      summary: 'The mining confrontation, the hill that speaks, and the village\'s choice: listen to their children or silence the last speakers.',
      keyEvents: [
        'The mining company arrives. The hill groans. Only the children understand: it is begging.',
        'The children translate the hill\'s words for the village: it has been their water source, their windbreak, their protector for centuries. If the party helped Old Maren reconnect with the village, her testimony adds weight.',
        'The village must decide: the mine brings wealth, the hill brings life. Foreman Drace is not wrong about the economics. The children are not wrong about the hill.',
        'Quiet moment: Venn kneels on the hill and presses his ear to the ground. He closes his eyes. "I do not hear words," he says. "But I hear something." He looks up at Elara. "What does it sound like to you?" She says: "It sounds like home."',
        'If the party has built enough trust, the adults begin to hear fragments themselves. The language was never lost. They just stopped paying attention.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Elara (age 8)',
      role: 'the first speaker / the party\'s translator',
      personality: 'A curious, earnest child who does not understand why adults find her abilities frightening. She speaks to the land the way other children speak to pets. "Everything talks. You just have to be quiet enough to hear it."',
    },
    {
      name: 'Professor Venn',
      role: 'university linguist / skeptic turned believer',
      personality: 'An academic who arrived to debunk the phenomenon and slowly, reluctantly, accepts that his entire field missed the oldest language in existence. "I have cataloged four hundred languages. I never thought to ask the ground what it called itself."',
    },
    {
      name: 'Old Maren',
      role: 'hermit druid / living connection',
      personality: 'A woman who retreated to the wilderness fifty years ago because she could hear the land and nobody believed her. Bitter, relieved, and overwhelmed that children are finally proving her right.',
      secret: 'She stopped speaking the human tongue entirely for a decade. The land kept her alive, fed, and sheltered. She owes it everything.',
    },
    {
      name: 'Foreman Drace',
      role: 'mining company representative / antagonist',
      personality: 'Not evil, just pragmatic. The mine means jobs, wealth, survival for the village. "I respect your feelings about the hill. But feelings do not feed families."',
    },
  ],
  keyLocations: [
    {
      name: 'Ashenmoor',
      description:
        'A rural village nestled against a range of old hills. The kind of place where people know the land without ever really knowing it. The well water tastes different than any other village\'s. Nobody ever asked why.',
      significance: 'Where the mystery unfolds and the community decides its future.',
    },
    {
      name: 'The Speaking Hill',
      description:
        'An ancient hill covered in wildflowers. The children say it hums. If you press your ear to the ground, you can almost hear it. Birds circle it differently than other hills. The wildflowers bloom a week early here.',
      significance: 'The living embodiment of the language. The thing that must be saved or lost.',
    },
    {
      name: 'The Old Archive',
      description:
        'A forgotten library beneath the village church, full of pre-civilizational texts that nobody has read in centuries. The pages smell like earth. Some of the text appears to have been written by pressing leaves into wet clay.',
      significance: 'Where the historical evidence of the language is found.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'npcRelationshipWeb',
    'ancientProphecy',
    'rumorMill',
    'magicalAnomaly',
    'backstoryComplication',
    'settlementEvent',
    'diplomaticNegotiation',
  ],
};
