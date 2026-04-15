import type { OneShotCampaign } from '../types';

export const theQuiltOfNames: OneShotCampaign = {
  id: 'oneshot-quilt-of-names',
  type: 'oneshot',
  title: 'The Quilt of Names',
  tagline: 'A community quilt with names of the dead. One name is wrong. Someone who died is still alive.',
  tone: 'serious',
  themes: ['mystery', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A rural community adds a patch to a quilt for every member who dies. The quilt has hung in the meeting hall for generations. A visiting scholar notices a discrepancy: one name on the quilt belongs to someone who is still alive, living in a city 100 miles away. The party investigates how a living person ended up on a memorial quilt.',
  hook: 'The scholar points at a patch near the center of the quilt. "Eryn Thatch. Died 20 years ago, according to this. But I met Eryn Thatch last month in the capital. She is very much alive." The village elder goes pale.',
  twist: 'Eryn did not die. She faked her death to escape an arranged marriage to the elder\'s son. She was 16. The village helped cover it up because the marriage was wrong and the elder was too powerful to refuse openly. The quilt patch was the only way to make the elder stop searching. Now his son, who has mourned Eryn for 20 years, might learn the truth.',
  climax: 'The party must decide: reveal the truth (destroying the village\'s carefully maintained lie and reopening a wound for the elder\'s son), protect the secret (which the scholar will eventually publish), or find a way to resolve 20 years of deception that protects Eryn\'s freedom.',
  scenes: [
    {
      title: 'Scene 1: The Discrepancy',
      summary: 'Investigating the quilt patch. The village is evasive. People change the subject. Something is being hidden.',
      challenge: 'social',
      keyEvents: [
        'The quilt: beautiful, generations old, every patch a life remembered',
        'Eryn\'s patch: handmade, placed 20 years ago, surrounded by genuine memorials',
        'The village: nervous when asked about Eryn. "She drowned. Sad story. Please, have some tea."',
        'The elder: visibly disturbed by the questions. His son visits the patch every year',
      ],
    },
    {
      title: 'Scene 2: The Truth',
      summary: 'Digging deeper reveals the conspiracy. The village faked a death to save a girl from a bad marriage.',
      challenge: 'exploration',
      keyEvents: [
        'The midwife who helped Eryn escape talks after the party earns her trust',
        'The arranged marriage: the elder\'s son, 30 at the time, and Eryn, 16',
        'The village decided collectively: fake the death, let the girl go, bear the lie together',
        'Eryn in the capital: alive, successful, and terrified of being found',
      ],
    },
    {
      title: 'Scene 3: The Reckoning',
      summary: 'The scholar will publish. The son will learn. The party must navigate truth, protection, and the limits of well-meaning deception.',
      challenge: 'social',
      keyEvents: [
        'The scholar: plans to publish the discrepancy as an academic curiosity. Does not understand the stakes',
        'The son: has mourned for 20 years. Learning the truth could free him or destroy him',
        'Eryn: contacted by the party, asks them to protect her. "I built a life. Do not take it from me."',
        'The party brokers a resolution: silence, truth, or something imperfect in between',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Eryn Thatch', role: 'the living dead', personality: 'A woman who faked her death at 16 to escape a forced marriage and built an entire life in the capital. She is not a victim anymore. She is a person who made a choice and does not regret it.' },
    { name: 'Tommas Elder', role: 'the mourner', personality: 'The elder\'s son, now 50, who has visited a quilt patch every year for 20 years, mourning a woman who is not dead. He never remarried. He is gentle and sad and entirely deceived.' },
    { name: 'Scholar Niven', role: 'the catalyst', personality: 'An academic who found the discrepancy and intends to publish it. Brilliant, oblivious to the human stakes, and unwilling to suppress findings. "Truth is not optional."' },
  ],
  keyLocations: [
    { name: 'The Meeting Hall', description: 'A community hall where the quilt of names hangs, each patch a life and a story.', significance: 'Where the discrepancy is found and the mystery begins.' },
    { name: 'The Village', description: 'A tight-knit rural community that has kept a secret for 20 years to protect one of their own.', significance: 'Where the conspiracy lives and the party must earn trust to learn the truth.' },
    { name: 'Eryn\'s Home (capital)', description: 'A successful merchant\'s house in the capital, belonging to a woman who officially died 20 years ago.', significance: 'Where the party meets the living "dead" and understands the stakes.' },
  ],
  dataSystems: ['detectiveCase', 'npcDialogue', 'socialEncounter', 'moralDilemma', 'npcRelationship'],
};
