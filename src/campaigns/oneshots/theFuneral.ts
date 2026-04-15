import type { OneShotCampaign } from '../types';

export const theFuneral: OneShotCampaign = {
  id: 'oneshot-funeral',
  type: 'oneshot',
  title: 'The Funeral',
  tagline: 'A beloved friend is dead. Old enemies attend. The letters she left behind will change everything.',
  tone: 'social',
  themes: ['social', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Grandmother Isolde, beloved to everyone in the valley, has died at 97. Her funeral draws hundreds: friends, family, rivals, enemies, and people who owe her favors. She left sealed letters to be read aloud after the eulogy. Nobody knows what they say.',
  hook: 'The party knew Isolde. She helped each of them once. Her will requests they attend the funeral as honor guard and letter-readers. Simple duty. Then the first letter is opened and the room goes silent.',
  twist:
    'Isolde was a retired spy. Her letters reveal secrets she kept for decades: affairs, hidden children, stolen identities, and one letter that proves the town mayor murdered his business partner thirty years ago. She could not reveal it in life. She waited for death.',
  climax:
    'The mayor tries to stop the final letter from being read. The room divides. The party must decide: read the letter publicly and blow the town apart, or give it privately and let justice work quietly. Either way, Isolde gets the last word.',
  scenes: [
    {
      title: 'Scene 1: The Gathering',
      summary: 'Arrivals at the funeral. Old faces, old tensions. The party mingles and senses that Isolde\'s death has unsettled powerful people.',
      challenge: 'social',
      keyEvents: [
        'Hundreds attend. The party is asked to stand honor guard and read letters.',
        'The mayor is nervous. A noblewoman is crying too hard. A stranger nobody recognizes watches from the back.',
        'Eulogies: each reveals a different Isolde. Saint, schemer, friend, liar.',
        'The lawyer produces six sealed letters. One for each section of the service.',
      ],
    },
    {
      title: 'Scene 2: The Letters',
      summary: 'The letters are read. Each one drops a bomb. The room shifts with every revelation.',
      challenge: 'social',
      keyEvents: [
        'Letter 1: A confession of love to someone unexpected. Gasps.',
        'Letter 2: A hidden child revealed. A family is rewritten.',
        'Letter 3: A debt forgiven with a pointed explanation of why it was owed.',
        'The mayor intercepts the party. He offers gold to skip the remaining letters.',
      ],
    },
    {
      title: 'Scene 3: The Last Word',
      summary: 'The final letter contains the murder accusation. The mayor acts. The party must protect the truth or negotiate peace.',
      challenge: 'social',
      keyEvents: [
        'The mayor\'s guards move to block the reading. The room tenses.',
        'The stranger from the back steps forward: the murdered partner\'s daughter.',
        'Read the letter publicly, or hand it to the daughter privately.',
        'Isolde\'s final line in every letter: "The truth outlives us all."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Grandmother Isolde',
      role: 'the deceased / puppet master',
      personality: 'Dead, but her letters do all the talking. Warm, sharp, and devastatingly honest from beyond the grave.',
    },
    {
      name: 'Mayor Aldric Fenn',
      role: 'politician / murderer',
      personality: 'Charming, powerful, and increasingly desperate. He built thirty years on a lie. Isolde is unraveling it from her coffin.',
      secret: 'He killed his partner over a land deal. He has convinced himself it was justified.',
    },
    {
      name: 'Sera Voss',
      role: 'stranger / the partner\'s daughter',
      personality: 'Quiet, watchful, has been waiting for this day. Isolde sent her a private letter years ago telling her to come.',
    },
  ],
  keyLocations: [
    {
      name: 'The Valley Chapel',
      description: 'A stone chapel filled with flowers, candles, and three hundred people pretending to be sad for the same reasons.',
      significance: 'Where every secret is revealed and every alliance is tested.',
    },
  ],
  dataSystems: ['npcGenerator', 'factionReputation', 'moraleTracker'],
};
