import type { FullCampaign } from '../types';

export const theLastHerd: FullCampaign = {
  id: 'full-last-herd',
  type: 'full',
  title: 'The Last Herd',
  tagline: 'They chose you to walk with them. You do not yet understand why.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness', 'classic_fantasy'],
  playerCount: { min: 2, max: 5 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 14,
  settingSummary:
    'The Veldt is a vast wilderness stretching from the Amber Coast to the Teeth of the World. Across it migrates the last herd of Solemn Beasts - enormous, gentle creatures with crystalline antlers and eyes that hold starlight. They have walked this path for ten thousand years. This year, they approached the party\'s camp, lowered their heads, and waited. The elders say this means the herd has chosen its witnesses. No one knows what that means.',
  hook:
    'The party encounters the herd at dawn. Twenty creatures, each the size of a house, standing in morning mist with light refracting through their antlers. They will not move until the party joins them. A ranger in a nearby village says: "They choose their witnesses once a generation. Last time was before my grandmother was born. You should walk with them. Something is ending."',
  twist:
    'The breeding grounds are dying. The ancient grove where the Solemn Beasts have given birth for millennia is withering. The herd knows. They have always known this would be the last migration. They chose the party not to save them but to witness - to remember them when they are gone. The party must decide whether to accept this or fight to find another way.',
  climax:
    'The herd arrives at the breeding grounds - a grove of impossible beauty that is visibly fading. The matriarch lies down. The herd gathers. The party can attempt a desperate quest to restore the grove (possible but uncertain), or they can stay and witness, honoring the herd\'s choice. Either way, the final scene is the most beautiful and heartbreaking thing they have ever seen.',
  acts: [
    {
      title: 'Act 1: The Choosing',
      summary:
        'The herd chooses the party and the migration begins. The first leg crosses open plains - river crossings, predator ambushes, and the slow process of bonding with creatures that communicate through subsonic hums and the angle of their antlers.',
      keyEvents: [
        'The herd arrives at the party\'s camp and refuses to move until they join',
        'Learning to communicate with the beasts through vibration, posture, and patience',
        'First river crossing - helping 20 house-sized creatures ford a swollen river',
        'A pack of dire wolves tests the herd. The matriarch handles it with a single look.',
        'Poachers. The crystalline antlers are worth a fortune. The party must drive them off.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Long Walk',
      summary:
        'The middle passage. Mountain passes, storms, and the deepening bond between party and herd. A calf is born mid-journey. The party learns why the beasts chose witnesses - and begins to suspect this migration is different from every one before it.',
      keyEvents: [
        'A mountain pass blocked by a landslide - the party must find an alternate route for creatures that cannot climb',
        'A calf is born during a thunderstorm. The herd circles. The party helps.',
        'An ancient waypoint: carved stones from civilizations that witnessed previous migrations, all gone now',
        'The matriarch shows the party a vision: the breeding grounds, green and alive. Then the same grove, withering.',
        'A rival group claims the migration path. Negotiation or confrontation.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Witnessing',
      summary:
        'The herd arrives at the breeding grounds and the party understands. The grove is dying. The herd knew. They chose witnesses so someone would remember. The party faces the hardest choice: accept the ending or chase a miracle.',
      keyEvents: [
        'Arrival at the breeding grounds - a grove of crystal-leafed trees, half of them dark',
        'The matriarch communicates clearly for the first time: "Remember us."',
        'A possible cure: a seed from the First Tree, buried deep in a dangerous ruin nearby',
        'If pursued: a desperate delve into ancient ruins while the herd waits',
        'The final scene: whether the grove is saved or not, the herd gathers, the antlers chime, and the witnesses remember',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'The Matriarch',
      role: 'herd leader / quest giver',
      personality:
        'The oldest Solemn Beast. Car-sized, slow-moving, with antlers that ring like bells. Communicates through visions and subsonic hums. Ancient, dignified, and profoundly sad in a way that takes sessions to understand.',
      secret: 'She has walked this path 47 times. She knows this is the last.',
    },
    {
      name: 'Wren Ashbrook',
      role: 'ranger / guide',
      personality:
        'A weathered human ranger who has studied the Solemn Beasts her entire life. She was not chosen by the herd and it is the quiet heartbreak of her life. She helps the party from the margins.',
    },
    {
      name: 'Skarr',
      role: 'poacher / antagonist',
      personality:
        'A gnoll poacher who wants the crystalline antlers. Not evil in a grand way - just desperate and willing to kill beautiful things for money. Can be reasoned with. Might not be worth it.',
    },
    {
      name: 'The Calf',
      role: 'herd member / the future',
      personality:
        'Born mid-journey. Wobbly, curious, and imprints on whichever party member helped with the birth. Follows them everywhere. Chews on their gear.',
    },
  ],
  keyLocations: [
    {
      name: 'The Veldt',
      description:
        'Endless rolling grassland under a sky so wide it makes you dizzy. Wind carries the sound of the herd\'s humming for miles.',
      significance: 'The migration path. Where the party bonds with the herd across weeks of walking.',
    },
    {
      name: 'The Teeth of the World',
      description:
        'A jagged mountain range the herd must cross through a single viable pass. Snow, wind, and thin air.',
      significance: 'The most dangerous leg of the journey. Where the calf is born.',
    },
    {
      name: 'The Crystal Grove',
      description:
        'The ancestral breeding grounds. Trees with crystalline leaves that chime in the wind. Half alive, half dark. Heartbreakingly beautiful.',
      significance: 'The destination. Where the campaign ends, one way or another.',
    },
  ],
  dataSystems: ['wildernessSurvival', 'weatherEvent', 'naturalDisaster', 'npcPersonality', 'magicalEcosystem'],
};
