import type { OneShotCampaign } from '../types';

export const theOldSword: OneShotCampaign = {
  id: 'oneshot-old-sword',
  type: 'oneshot',
  title: 'The Old Sword',
  tagline: 'A retired soldier\'s sword is stolen. It is worthless metal. But it was his son\'s, and his son died in the war.',
  tone: 'serious',
  themes: ['social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2.5,
  settingSummary:
    'An elderly retired soldier named Garren asks the party to find his stolen sword. The city guard will not help because the sword has no monetary value. Garren\'s hands shake when he describes it: plain steel, nicked blade, wrapped leather grip. It was his son\'s sword, carried in the battle where the son died. It is the only thing Garren has left of him.',
  hook: 'Garren sits on a bench outside the guard post, turned away. The guard shrugs. "It is a worthless sword. We have real crimes." Garren looks at the party. "It is not worth anything to anyone else. That is true. But it is all I have."',
  twist: 'The thief is a child named Pim, 10 years old, living on the streets. She stole the sword to sell for food. She has already sold it to a pawnbroker. The pawnbroker has already sold it to a collector. The party must recover the sword through a chain of transactions while confronting the reality of a hungry child who did nothing that poverty did not force her to do.',
  climax: 'The party recovers the sword but must decide what happens to Pim. Garren, upon learning the thief is a starving child, is not angry. He is heartbroken. "My son would not have wanted a child to go hungry. Not for his sword. Not for anything."',
  scenes: [
    {
      title: 'Scene 1: The Trail',
      summary: 'Tracking the stolen sword through the city\'s lower districts. The party follows a chain of small transactions.',
      challenge: 'exploration',
      keyEvents: [
        'Garren\'s home: modest, clean, the empty sword mount above the hearth',
        'The break-in: small entry point, a child-sized window left open',
        'The pawnbroker: bought it for 2 copper, sold it for 5 silver, no questions asked',
        'The collector: bought it as scrap, recognizes the regiment markings, names a price',
      ],
    },
    {
      title: 'Scene 2: The Child',
      summary: 'Finding the thief. Pim is not a villain. She is a kid who needed to eat.',
      challenge: 'social',
      keyEvents: [
        'Tracking Pim to a squat under a bridge with three other street children',
        'Pim is defiant, scared, and protecting the younger children with her',
        'The truth: she steals to feed four mouths. The sword was the easiest grab',
        'She does not know what the sword meant. She does not understand yet',
      ],
    },
    {
      title: 'Scene 3: The Return',
      summary: 'Returning the sword to Garren and deciding what happens to Pim. Garren\'s response is not what anyone expected.',
      challenge: 'social',
      keyEvents: [
        'The sword: recovered, nicked, plain, and more precious than anything in the collector\'s vault',
        'Garren holds it and is quiet for a long time',
        'When told about Pim, Garren does not ask for punishment',
        'He asks the party to bring her to his house. He has a spare room and too much silence',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Garren Holt', role: 'quest giver', personality: 'Sits on the bench with his one hand on his knee. Does not look up when he talks. Voice is level and quiet, like a man who used up all his shouting years ago. "My boy carried that sword into his last fight. I carried it home. Someone took it while I slept." Pauses. "The mount on the wall has a dust outline. I keep looking at it."' },
    { name: 'Pim', role: 'the thief', personality: 'Stands in front of the younger kids with her arms out even when no one is threatening them. Talks too loud. Chews her lip. "I sold it for two coppers and bought bread. We ate. I am not sorry. I would do it again. Are you going to hit me or what?"' },
    { name: 'Collector Vars', role: 'obstacle', personality: 'Polishes things while he talks. Never makes eye contact. Knows the value of everything and the meaning of nothing. "Third Regiment, Kelden Campaign. See the notch on the crossguard? Field repair. Interesting piece. I paid fair price. You want it back, you pay market rate."' },
  ],
  keyLocations: [
    { name: 'Garren\'s Home', description: 'A small, clean house with an empty sword mount and too much quiet.', significance: 'Where the quest begins and ends. The heart of the story.' },
    { name: 'The Lower Market', description: 'The city\'s poorest district where pawnbrokers buy anything and children sleep under bridges.', significance: 'Where the party encounters the reality behind the theft.' },
    { name: 'The Bridge Squat', description: 'A makeshift shelter under a stone bridge where four children survive on stolen food.', significance: 'Where the party finds Pim and confronts the gap between crime and survival.' },
  ],
  dataSystems: ['npcDialogue', 'socialEncounter', 'detectiveCase', 'moralDilemma', 'urbanEncounter'],
};
