import type { OneShotCampaign } from '../types';

export const theAwakening: OneShotCampaign = {
  id: 'oneshot-the-awakening',
  type: 'oneshot',
  title: 'The Awakening',
  tagline: 'You were a fox yesterday. Today you can think. You do not have words for what thinking feels like yet.',
  tone: 'serious',
  themes: ['classic_fantasy', 'social', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 3,
  settingSummary:
    'The Thornwood is a dense, ancient forest bordering the village of Millhaven. Until this morning, it was an ordinary forest with ordinary animals. Now four creatures have woken up with something they have never had before: consciousness. A fox, a crow, a bear, and a rabbit open their eyes and the world is suddenly unbearably complex. Colors have names they do not know. Sounds have meaning they cannot parse. The fox sees a snare and understands, for the first time, that it was built to kill. The crow sees the village and understands that the smoke from chimneys means fire, and fire means warmth, and warmth means someone chose comfort. Thought is terrifying. Thought is beautiful. Thought is new.',
  hook: 'The players are the animals. They wake up sentient in the Thornwood with no language, no context, and no understanding of why the world just became so loud. They can communicate with each other through emotion and gesture but not words. The village is nearby. Humans are large and unknowable. Other animals are waking up too — and not all of them are handling it well.',
  twist:
    'A druid named Elara cast Awaken on the entire forest because she is dying. She has a wasting sickness with no cure. She spent her life protecting the Thornwood and could not bear the idea that no one would remember it — or her — after she was gone. She wanted someone to understand what the forest is. She wanted to be remembered by something that would outlive her. The awakening was not an accident. It was a love letter.',
  climax:
    'The party finds Elara in her grove, barely conscious. The awakened animals gather around her — dozens now, all confused, all afraid, all new. Elara sees them and smiles. She cannot speak anymore. The party must decide what to do with their gift: stay in the forest and build something new, approach the village and try to coexist, or seek out more druids to sustain the awakening. Elara dies at sunset. The forest remembers.',
  scenes: [
    {
      title: 'Scene 1: First Light',
      summary: 'The animals wake up sentient. Everything is new, overwhelming, and strange. They must learn to communicate with each other and navigate a world that just tripled in complexity.',
      challenge: 'exploration',
      keyEvents: [
        'Waking: the fox sees its reflection in a stream and realizes it is looking at itself',
        'The crow flies above the canopy and understands the concept of "far away" for the first time',
        'The bear accidentally frightens a deer. The deer is not sentient. The bear feels guilt. It has never felt guilt before.',
        'First communication: the rabbit taps a pattern on a log. The others understand it means "follow me." Language begins.',
      ],
    },
    {
      title: 'Scene 2: The Village',
      summary: 'The party approaches Millhaven and observes humans for the first time with understanding. They must navigate the terrifying world of people, buildings, and fire without being captured, killed, or adopted.',
      challenge: 'social',
      keyEvents: [
        'A child sees the fox and tries to pet it. First contact with a human. The fox understands the child means no harm but the hand is enormous.',
        'The crow lands on a windowsill and watches a family eat dinner. It understands sharing for the first time.',
        'A hunter walks into the forest with a bow. The party understands what the bow is for. Terror.',
        'An old woman in the village leaves food out for the animals. She talks to them. She has always talked to them. Now they understand.',
      ],
    },
    {
      title: 'Scene 3: The Druid\'s Grove',
      summary: 'The party follows the trail of awakened animals deeper into the forest and finds Elara. They learn why they can think, and must face the reality that the gift came with a goodbye.',
      challenge: 'social',
      keyEvents: [
        'More awakened animals appear: a badger who is furious, a deer who is serene, a squirrel who will not stop asking "why"',
        'The grove: ancient trees forming a natural cathedral. Elara lies among the roots.',
        'Elara sees them and her face breaks into the most peaceful expression any of them will ever witness',
        'She cannot speak but the forest translates: leaves fall in patterns that form meaning. Her last gift is language.',
        'The sunset. The decision. The first night of the rest of their lives.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elara', role: 'the druid / dying creator', personality: 'A woman who spent fifty years talking to trees and meaning it. She is not sad about dying. She is sad about leaving the forest alone. Her last act was to give it a voice.' },
    { name: 'The Old Woman (Maren)', role: 'village connection / kindness', personality: 'A widow who has fed the forest animals for thirty years. She talks to them because she is lonely. When the fox looks at her with understanding in its eyes, she cries. She does not know why.' },
    { name: 'The Hunter (Aldric)', role: 'threat / moral complexity', personality: 'A hunter who has killed animals his whole life. He is not cruel — he feeds his family. But the awakened animals understand what he does now, and he cannot understand why the fox is staring at him with what looks like horror.' },
  ],
  keyLocations: [
    { name: 'The Thornwood', description: 'An ancient forest that has just become sentient in patches. Some clearings feel different now — watchful, aware. Mushrooms grow in patterns that might be writing.', significance: 'The entire setting. The forest is both the world and a character in it.' },
    { name: 'Millhaven', description: 'A small farming village where humans live ordinary lives, unaware that the forest next door just woke up.', significance: 'The "other world" that the party must learn to navigate. Where the concept of civilization becomes real.' },
    { name: 'Elara\'s Grove', description: 'A cathedral of ancient oaks where a dying druid lies among roots that have grown around her like arms. The air smells like rain and endings.', significance: 'Where the party learns the truth. Where the druid dies. Where the forest\'s new life begins.' },
  ],
  dataSystems: ['socialEncounter', 'moralDilemma', 'survivalForaging', 'npcRelationshipWeb'],
};
