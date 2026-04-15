import type { FullCampaign } from '../types';

export const theKingdomThatSlept: FullCampaign = {
  id: 'full-the-kingdom-that-slept',
  type: 'full',
  title: 'The Kingdom That Slept',
  tagline: 'Everyone is alive. Everyone is awake. Nobody can bring themselves to care.',
  tone: 'mystery',
  themes: ['mystery', 'classic_fantasy', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Kingdom of Veranthas was once industrious, ambitious, and proud. Now it is still. The party arrives to find a functioning civilization in total surrender. Guards lean on their spears and watch bandits pass. Farmers sit beside full fields and let the grain rot. Mothers stare at crying children without moving. Nobody is cursed. Nobody is charmed. They simply do not care anymore. The kingdom has not stopped living. It has stopped trying. And the apathy is comfortable in a way that should terrify anyone who feels it.',
  hook: 'A merchant from the neighboring Altanni Confederation hires the party to investigate why trade from Veranthas has stopped. No caravans, no shipments, no messengers. Just silence. The party crosses the border and finds the first village: doors open, hearth fires out, a woman sitting on her porch staring at nothing. She acknowledges them. She says hello. She says she knows the bread is burning in the oven. She does not get up.',
  twist:
    'A god of rest named Solace heard the kingdom\'s collective unconscious cry. Veranthas had been in a spiral of overwork for decades: longer hours, more production, children laboring in mines, elders working until they dropped. The people were exhausted to their souls. In their deepest collective wish, they asked for permission to stop. Solace granted it. The apathy is not a curse. It is a gift. They asked for rest and received it. The tragedy is that they cannot stop resting any more than they could stop working. Solace gave them what they wanted, and what they wanted is killing them.',
  climax:
    'The party reaches Solace\'s shrine deep beneath the capital. The god is gentle, sympathetic, and confused by the party\'s objection. The kingdom asked. Solace answered. Is rest not what they needed? The party must convince Solace that there is a difference between rest and surrender, between a break and an ending. Solace offers a deal: the god will lift the gift if the party can show that the kingdom will not simply work itself back into the same desperation. This requires the party to change how Veranthas operates before the apathy is removed - building something worth waking up for.',
  acts: [
    {
      title: 'Act 1: The Stillness',
      summary:
        'The party enters Veranthas and discovers a kingdom in total apathy. Investigation begins. They rule out enchantment, disease, and foul play. The apathy is genuine. It is also contagious - the party begins to feel it pulling at them.',
      keyEvents: [
        'The first village: alive, conscious, completely inert. A child asks the party for food. His mother is ten feet away.',
        'The capital city: markets empty, palace unguarded, the king on his throne staring at nothing with tears on his face',
        'Detect magic reveals no enchantment. Remove curse does nothing. The people are choosing this.',
        'A party member fails a Wisdom save and spends an afternoon sitting in a garden, unable to explain why they stopped moving',
        'A historian found catatonic in the library with one book open: "The Rites of Solace, God of Deserved Rest"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Weight',
      summary:
        'The party digs into Veranthas\'s history and discovers the truth: this kingdom worked itself to ruin. Children in mines. Elders in fields. No rest, no holidays, no mercy. The people begged for relief in their hearts. A god answered. Now the party must find that god while fighting the growing pull of apathy.',
      keyEvents: [
        'The mines: children\'s tools still scattered where they fell. The foreman is alive, sitting in the dark, relieved.',
        'Interviews with nobles reveal Veranthas ran on a culture of productivity as virtue. Rest was weakness.',
        'The party tracks the divine signature to an underground shrine dedicated to Solace',
        'Apathy effects intensify: one party member must be physically dragged from a comfortable chair. It was very comfortable.',
        'The king speaks, briefly: "We were tired. All of us. For so long. This is the first time I have felt peace."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Bargain',
      summary:
        'The party reaches Solace and negotiates. The god is not a villain - just a divine being who answered a prayer. Lifting the gift requires proving the kingdom will not simply return to the misery that created the wish. The party must redesign Veranthas before they can wake it up.',
      keyEvents: [
        'Solace\'s shrine: warm, quiet, blanketed in divine comfort. The party must resist the urge to sit down and never leave.',
        'Solace speaks: gentle, patient, genuinely puzzled. "They asked me. All of them. What would you have me do?"',
        'The bargain: prove the kingdom will be different, and the rest will end',
        'The party works through the apathy to draft reforms: labor laws, rest days, children out of mines',
        'Solace lifts the gift. The kingdom wakes slowly, blinking, confused. The bread is still burning.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Solace',
      role: 'god / well-meaning antagonist',
      personality:
        'A minor god of rest and reprieve. Warm, gentle, speaks in the cadence of a lullaby. Genuinely does not understand why the party is upset. The kingdom asked. Solace answered. That is what gods do.',
      secret: 'This is the third kingdom Solace has granted this gift. The other two never woke up. The god is starting to wonder if mortals are capable of balance.',
    },
    {
      name: 'King Draeven',
      role: 'tragic figure',
      personality:
        'The king of Veranthas. Sits on his throne with tears on his face. He drove his people harder than any predecessor. He knows the apathy is his fault. He is too tired to fix it.',
      secret: 'He can feel Solace\'s gift more strongly than anyone because he needed it more than anyone. Even after the spell breaks, he may not get up.',
    },
    {
      name: 'Eladri',
      role: 'ally / guide',
      personality:
        'An Altanni merchant who has been trying to wake the border villages for weeks. Energetic, frustrated, and slowly realizing the problem is not a spell - it is a feeling.',
    },
    {
      name: 'Maren',
      role: 'emotional anchor',
      personality:
        'A mother in the first village. Her child is hungry. She is ten feet from the pantry. She cannot bring herself to stand. She is not enchanted. She is just so tired of getting up.',
    },
  ],
  keyLocations: [
    {
      name: 'Veranthas',
      description: 'A productive kingdom that worked itself into spiritual exhaustion. Now still as a pond. Everything functions mechanically but nobody is steering.',
      significance: 'The campaign\'s setting. A kingdom-sized thought experiment about what happens when an entire society gives up.',
    },
    {
      name: 'The Capital Throne Room',
      description: 'A grand hall with a king on his throne, courtiers in their chairs, and absolute silence. Dust on everything.',
      significance: 'The visual heart of the crisis. Power without will. Authority without energy.',
    },
    {
      name: 'The Shrine of Solace',
      description: 'A cavern beneath the capital that radiates divine warmth and comfort. The air smells like clean sheets and chamomile. Sitting down feels like the most important thing you could do.',
      significance: 'Where the bargain is struck. The party negotiates with a god in the coziest room in the world.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'deityPantheon',
    'socialEncounter',
    'moralDilemma',
    'urbanEncounter',
    'npcRelationshipWeb',
    'environmentalHazard',
  ],
};
