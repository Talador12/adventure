import type { OneShotCampaign } from '../types';

export const theGarden: OneShotCampaign = {
  id: 'oneshot-garden',
  type: 'oneshot',
  title: 'The Garden',
  tagline: 'Every plant in her garden is a gravestone. The roses are her husband. The lavender is her daughter. She is planting a forget-me-not. It is for herself.',
  tone: 'serious',
  themes: ['social', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2,
  settingSummary:
    'On the outskirts of town, an elderly woman named Briar tends a walled garden where every plant was chosen to represent someone she loved and lost. Roses for her husband. Lavender for her daughter. An oak for her father. The party arrives as she is planting a new seed. She asks for help digging. She tells them about every plant as they work.',
  hook: 'The party passes the garden and sees an old woman struggling with a shovel. She is frail but determined. "I need to plant this before the frost. Would you help an old woman dig? I will tell you stories while you work. My garden is full of stories."',
  twist: 'The seed she is planting is for herself. Briar is dying and has chosen a flower to represent her own life. She does not tell the party this directly. As they plant and she tells each story, it becomes clear: every plant is a memorial, and this last one is hers. She wants the garden to be complete before she goes.',
  climax: 'The party realizes what the last seed represents. Briar asks them to promise to water the garden after she is gone. The one-shot ends with planting the last flower and sitting with her in a garden full of memory.',
  scenes: [
    {
      title: 'Scene 1: The Stories',
      summary: 'Helping Briar tend the garden while she tells the story behind each plant. Every story is a life.',
      challenge: 'social',
      keyEvents: [
        'The roses: her husband, a carpenter who built the garden walls. He died of age, gently',
        'The lavender: her daughter, who left for the sea and never came back. Lost in a storm',
        'The oak: her father, who planted the first tree here when the town was new',
        'The party tends each plant as they hear its story, connecting with the lives behind them',
      ],
    },
    {
      title: 'Scene 2: The Empty Plot',
      summary: 'Briar leads the party to the last empty plot. She has been saving it. She pulls out a seed.',
      challenge: 'social',
      keyEvents: [
        'The empty plot: the last space in the garden, clearly saved for something specific',
        'The seed: a forget-me-not. Briar holds it gently and does not explain right away',
        'Perceptive party members notice: Briar is thinner than she should be. Her hands tremble',
        'She says, quietly: "This one is for someone who is not gone yet. But will be soon."',
      ],
    },
    {
      title: 'Scene 3: The Planting',
      summary: 'Understanding what the last flower represents. Planting it together. Saying what needs to be said.',
      challenge: 'social',
      keyEvents: [
        'The realization arrives quietly. Nobody says it aloud. The last flower is for Briar. She is completing her own memorial',
        'Briar sees the party understand. She smiles. Not sad. Ready. "I wanted it to be whole. Now it will be."',
        'They plant the forget-me-not together. Her hands in the dirt one last time. She waters it once, carefully, like she is introducing it to the soil',
        'She sits on the bench her husband built and looks at the whole garden. "Come back in the spring, dears. Make sure they all have water." The sun is going down. The garden is complete',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Briar Holloway', role: 'the heart', personality: 'Talks to the plants as she works. "This one needs more sun, do you not, love." Calls everyone "dear" but means it differently each time. Hands like tree roots, never still. Laughs at her own jokes before she finishes telling them. "I have had a good life. I grew a good garden. That is enough. More than enough."' },
    { name: 'Neighbor Tam', role: 'context', personality: 'Leans on the garden wall with his arms folded. Talks like someone reporting the weather. "She talks to those plants like they are people. I used to think that was sad. Now I think she knows something I do not."' },
  ],
  keyLocations: [
    { name: 'Briar\'s Garden', description: 'A walled garden where every plant represents a person who was loved and lost.', significance: 'The entire adventure takes place here. Every plant is a story.' },
    { name: 'The Empty Plot', description: 'The last open space in the garden, saved for a forget-me-not that has not been planted yet.', significance: 'The emotional center. Where the party understands what is happening.' },
    { name: 'The Garden Bench', description: 'A wooden bench built by Briar\'s husband, worn smooth by decades of sitting.', significance: 'Where the stories are told and the garden is viewed as a whole.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'npcRelationship', 'herbalism'],
};
