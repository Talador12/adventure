import type { OneShotCampaign } from '../types';

export const theLullaby: OneShotCampaign = {
  id: 'oneshot-lullaby',
  type: 'oneshot',
  title: 'The Lullaby',
  tagline: 'A lullaby that puts everything to sleep. Trees, animals, fire, the wind. When the singing stops, whatever was awake is gone.',
  tone: 'horror',
  themes: ['horror', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 2.5,
  settingSummary:
    'A melody drifts through the forest at night. Everything it touches falls asleep: animals drop where they stand, trees stop rustling, campfires go still, even the wind dies. The singing gets closer each night. Travelers who stayed awake during the song survived. Those who fell asleep were gone by morning. Not dead. Just gone.',
  hook: 'The party camps in the forest. At 2 AM, they hear singing. Distant, wordless, beautiful. The fire freezes mid-flicker. A bird falls from a branch, asleep before it hits the ground. The wind stops. Absolute silence except for the melody. It is getting closer.',
  twist: 'The singer is a banshee who was once a mother. Her child died and she went mad with grief. The lullaby is real: she sang it to her child every night. In death, the song became weaponized. She does not know she is killing. She thinks she is putting people to sleep, as she did her child. She thinks they will wake up. They do not.',
  climax: 'The banshee reaches the party\'s camp. They must resist the sleep effect while either destroying her, breaking through to the remnant of the mother underneath, or finding the child\'s spirit to give the banshee peace.',
  scenes: [
    {
      title: 'Scene 1: The Silence',
      summary: 'The lullaby begins. The forest falls asleep around the party. They must stay awake as the song draws closer.',
      challenge: 'exploration',
      keyEvents: [
        'The melody: wordless, in a minor key, heartbreakingly beautiful',
        'The forest sleeps: animals collapse, flames freeze, wind dies, water stops flowing',
        'Constitution saves to resist the drowsiness. Failure means falling into magical sleep',
        'The singing moves through the trees. A shape is visible in the darkness, drifting closer',
      ],
    },
    {
      title: 'Scene 2: The Trail',
      summary: 'Following the song\'s path the next morning reveals its devastation. Empty camps, sleeping animals that never wake, and the banshee\'s lair.',
      challenge: 'exploration',
      keyEvents: [
        'Dawn: the song stops. The forest wakes. Some animals do not. They are gone',
        'Previous camps: belongings left behind, bedrolls slept in, people vanished',
        'The banshee\'s lair: a cottage ruin with a child\'s crib, covered in frost and grief',
        'The child\'s grave behind the cottage: small, unmarked, centuries old',
      ],
    },
    {
      title: 'Scene 3: The Mother',
      summary: 'The banshee returns at nightfall. The party confronts her. She thinks she is helping. She thinks the people are sleeping.',
      challenge: 'combat',
      keyEvents: [
        'The banshee: a spectral woman cradling empty arms, singing to a child who is not there',
        'Combat: her wail is the lullaby amplified, forcing saves against sleep and psychic damage',
        'The alternative: finding the child\'s spirit (in the grave) and reuniting them',
        'Resolution: the banshee sees her child, the song becomes gentle, and they both fade to rest',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Singer', role: 'antagonist / tragic figure', personality: 'A banshee who was a mother in life. Her lullaby kills because death twisted her love into a weapon. She does not know. She sees sleeping children where there are empty camps. She sees her baby where there is only air.' },
    { name: 'Ranger Voss', role: 'quest giver', personality: 'A forest ranger who has been tracking the disappearances for weeks. He is exhausted from not sleeping. "I cannot sleep. If I sleep when the song comes, I am gone. I have not slept in four days."' },
    { name: 'The Child (spirit)', role: 'the key', personality: 'A faint, gentle spirit in the grave behind the cottage. Not scared. Waiting. It has been calling for its mother but cannot reach her through the madness of the song.' },
  ],
  keyLocations: [
    { name: 'The Forest', description: 'A woodland that falls completely silent when the lullaby begins. No wind, no fire, no sound but the song.', significance: 'The hunting ground. The silence is the first warning.' },
    { name: 'The Ruined Cottage', description: 'A mother\'s home, centuries old, with a frost-covered crib and a grave behind it.', significance: 'The banshee\'s origin and the key to resolving the haunting.' },
    { name: 'The Child\'s Grave', description: 'A small unmarked grave behind the cottage where the child\'s spirit waits.', significance: 'Where the resolution is found. The child can bring the mother peace.' },
  ],
  dataSystems: ['hauntedLocation', 'encounterWaves', 'combatNarration', 'environmentalHazard', 'monsterLore'],
};
