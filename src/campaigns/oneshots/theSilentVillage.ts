import type { OneShotCampaign } from '../types';

export const theSilentVillage: OneShotCampaign = {
  id: 'oneshot-silent-village',
  type: 'oneshot',
  title: 'The Silent Village',
  tagline: 'Nobody in this village can speak. The thing that took their voices is still here.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 4,
  settingSummary:
    'The party arrives at a remote mountain village to find every resident alive but completely mute — not just silent, but physically unable to produce sound. No screaming, no whispering, no sound at all. The villagers communicate through frantic gestures and terrified eyes. Something in the old mine took their voices, and it\'s using them.',
  hook: 'The party arrives at the village seeking shelter from a storm. Nobody answers the door. They find villagers inside — alive, healthy, but utterly silent. A woman writes on a chalkboard with trembling hands: "DO NOT SPEAK ABOVE A WHISPER. IT HEARS THROUGH OUR VOICES."',
  twist:
    'The mine contains a creature from the Plane of Sound — a being made entirely of stolen voices. Each voice it consumes makes it louder and more powerful. It doesn\'t just steal voices — it learns from them. It knows every secret, every lie, every prayer the villagers ever spoke. It\'s using their voices to call for more victims, imitating loved ones to lure people deeper.',
  climax:
    'The party enters the mine to confront the Sound Eater. It speaks with hundreds of stolen voices simultaneously. Combat is complicated by the fact that verbal spell components feed it — every spell spoken makes it stronger. The party must fight in silence, find the creature\'s core, and either destroy it (releasing all stolen voices in a deafening burst) or contain it (trapping the voices forever).',
  scenes: [
    {
      title: 'Scene 1: The Silent Welcome',
      summary:
        'Arrival at the mute village. Investigation through gestures, written notes, and growing unease. The party learns the rules: sound attracts the creature.',
      challenge: 'exploration',
      keyEvents: [
        'The silent village — alive, terrified, communicating through chalk and gestures',
        'The rules: no loud sounds, no singing, no verbal spells near the mine',
        'The village elder writes the story: it started three days ago after miners opened a new tunnel',
        'A distant echo from the mine — a child\'s voice calling for help. The child is standing right next to them, mute.',
      ],
    },
    {
      title: 'Scene 2: The Mine',
      summary:
        'The party enters the mine. It\'s dark, silent, and then suddenly filled with stolen voices — calling, whispering, screaming. Navigation by touch and light only.',
      challenge: 'exploration',
      keyEvents: [
        'The mine entrance — tools abandoned mid-swing, lanterns still burning',
        'The voices begin: loved ones calling from deeper tunnels, pleas for help',
        'A trap: a voice imitates a party member\'s ally perfectly, luring them into a collapse',
        'The creature\'s lair: a cavern that vibrates with hundreds of layered voices',
      ],
    },
    {
      title: 'Scene 3: The Sound Eater',
      summary:
        'Confrontation with a creature made of stolen sound. Verbal spells feed it. The party must fight in near-silence — creative solutions only.',
      challenge: 'combat',
      keyEvents: [
        'The Sound Eater manifests — a shimmering mass of visible sound waves',
        'It speaks with villagers\' voices: secrets, lies, confessions, lullabies',
        'Verbal spell components make it grow — casters must adapt or arm the enemy',
        'The core: a crystallized first voice at its center. Destroy or contain.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Tomás',
      role: 'village leader / mute guide',
      personality:
        'A strong, proud man reduced to writing on a chalkboard. His frustration is palpable. He\'s been the village leader for 20 years and has never felt so helpless.',
    },
    {
      name: 'Lira',
      role: 'child / motivation',
      personality:
        'A 7-year-old girl who had the most beautiful singing voice in the village. She was the first victim. She holds a music box that no longer plays because even mechanical sound was taken.',
      secret: 'She can still hear the creature. It sings to her at night in her own voice.',
    },
    {
      name: 'The Sound Eater',
      role: 'antagonist',
      personality:
        'Not sentient in a human way — more like a predator that feeds on sound. But with each voice consumed, it becomes slightly more aware. It\'s beginning to form thoughts from stolen words.',
    },
  ],
  keyLocations: [
    {
      name: 'The Silent Village',
      description:
        'A mountain village where the only sounds are wind and footsteps. No birds sing here anymore. Even the dogs are quiet.',
      significance: 'Where the mystery is introduced and the stakes are established.',
    },
    {
      name: 'The Old Mine',
      description:
        'An iron mine with tunnels stretching deep into the mountain. The deeper you go, the more sounds you hear — and none of them are real.',
      significance: 'The dungeon environment leading to the final confrontation.',
    },
    {
      name: 'The Echo Chamber',
      description:
        'A natural cavern at the mine\'s deepest point. The walls shimmer with visible sound. Hundreds of voices overlap in a constant, maddening chorus.',
      significance: 'The Sound Eater\'s lair and the final boss arena.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'trapCorridor',
    'puzzleLock',
    'combatNarration',
    'mindControl',
    'encounterWaves',
  ],
};
