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
        'The melody: wordless, in a minor key. The kind of melody that makes you think of a memory you do not have. Your eyelids are heavy before you understand why',
        'The campfire freezes mid-flicker. Not goes out. Freezes. A bird drops from a branch, asleep before it hits the ground. The wind stops. Water in a canteen stops sloshing. Everything is falling asleep',
        'Constitution saves each round. Failure means your head drops. Your weapon lowers. You sit down. You do not want to sit down but you are sitting down. Your eyes close and it feels wonderful',
        'A shape between the trees. White. Drifting. Cradling empty arms. The singing is coming from it. It is so close you can see its mouth moving',
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
    { name: 'The Singer', role: 'antagonist / tragic figure', personality: 'Drifts between the trees cradling nothing. Her mouth moves and the lullaby comes out but her eyes are looking down at her empty arms and she is smiling. She smiles at empty campsites. She smiles at the places where people used to be. She tucks invisible blankets around nothing. She does not know they are gone. She thinks they are sleeping.' },
    { name: 'Ranger Voss', role: 'quest giver', personality: 'Shakes constantly. Pupils blown. Drinks cold water to stay awake and flinches at every sound. "Four days. I have not slept in four days. Every night the song comes and I stuff wax in my ears and bite my own hand to stay awake. Look." He shows the bite marks. "If I sleep when it sings, I am gone. Like the others. Gone."' },
    { name: 'The Child (spirit)', role: 'the key', personality: 'A faint glow in the small grave. Not scared. Patient. It reaches up when the party approaches, the way a toddler reaches for a parent. It has been calling for its mother for centuries but the song drowns it out. If brought close enough, the mother hears it through the madness, and the lullaby softens, and slows, and finally stops.' },
  ],
  keyLocations: [
    { name: 'The Forest', description: 'A woodland that falls completely silent when the lullaby begins. No wind, no fire, no sound but the song.', significance: 'The hunting ground. The silence is the first warning.' },
    { name: 'The Ruined Cottage', description: 'A mother\'s home, centuries old, with a frost-covered crib and a grave behind it.', significance: 'The banshee\'s origin and the key to resolving the haunting.' },
    { name: 'The Child\'s Grave', description: 'A small unmarked grave behind the cottage where the child\'s spirit waits.', significance: 'Where the resolution is found. The child can bring the mother peace.' },
  ],
  dataSystems: ['hauntedLocation', 'encounterWaves', 'combatNarration', 'environmentalHazard', 'monsterLore'],
};
