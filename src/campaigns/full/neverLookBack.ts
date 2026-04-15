import type { FullCampaign } from '../types';

export const neverLookBack: FullCampaign = {
  id: 'full-never-look-back',
  type: 'full',
  title: 'Never Look Back',
  tagline: 'It does not run. It walks. It does not need to run.',
  tone: 'survival',
  themes: ['horror', 'survival', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 18,
  settingSummary:
    'A continent of failing roads and thinning civilization. The further from the coast you go, the wilder it gets. Forests that swallow sound, mountain passes that ice over in hours, swamps where the ground breathes. Every town is a brief reprieve. Every morning there is a single set of footprints behind the party, pressed deep into the mud, always exactly one day old.',
  hook: 'The party finds an iron reliquary in a dead courier\'s satchel on a mountain road. The courier has no wounds. His face is frozen in an expression of total calm, like he simply decided to stop living. That night, the party hears footsteps behind them on the trail. Slow, measured, patient. When they turn around, nothing is there. In the morning, a single line of footprints leads up to where they slept and stops ten feet from the campfire. Something stood there all night, watching. It left before dawn. It will be back tomorrow, and it will be closer.',
  twist:
    'The entity is not hunting them. It is following the reliquary, which contains the dreaming heartbeat of Ul-Kaveth, a sealed god of silence. The reliquary is the lock. If the party drops it, the lock weakens. If they destroy it, the seal breaks and Ul-Kaveth wakes - a god whose domain is the absence of all sound, all thought, all motion. The courier was not killed. He heard the heartbeat too long and simply stopped wanting to exist. The entity wants to return the reliquary to the place where Ul-Kaveth sleeps and open it. The party cannot fight it because it is not alive. It is an echo of the god\'s will given legs.',
  climax:
    'The party reaches the Threshold Vault, the place where Ul-Kaveth was sealed a thousand years ago. The entity is hours behind them. They must perform a binding ritual that takes six hours while the entity closes the final distance. The ritual demands absolute silence - one sound and it fails. The entity arrives during the ritual. It does not attack. It whispers. It tells them things they want to hear: that they can rest, that the running is over, that silence is not death but peace. Finishing the ritual means resisting not violence but the overwhelming desire to stop.',
  acts: [
    {
      title: 'Act 1: The Footprints',
      summary:
        'The party discovers the reliquary, begins hearing footsteps, and realizes something is following them. Early attempts to confront it fail. It is never where they look. Towns they pass through report silence the day after the party leaves - birds stop singing, dogs stop barking. The party learns to keep moving.',
      keyEvents: [
        'The dead courier on the mountain road: no wounds, face peaceful, reliquary in his bag',
        'First night: footsteps on the trail, footprints in the morning ten feet from camp',
        'First town (Greymoor): friendly, warm, helpful. Party rests. Next morning a rider catches up - Greymoor has gone silent, every living thing standing still and staring north',
        'A scholar identifies the reliquary as pre-divine, older than any known god',
        'The party tries to leave the reliquary behind. It appears in their pack the next morning. It cannot be abandoned.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Weight',
      summary:
        'The pursuit intensifies. The entity is no longer one day behind - it is hours. The party pushes through increasingly hostile terrain to stay ahead. They discover the nature of the reliquary and learn that a Threshold Vault exists where the seal can be reinforced. But the vault is two weeks of hard travel away through the worst terrain on the continent.',
      keyEvents: [
        'Footprints appear at midday now, not just mornings. It is gaining.',
        'A priest examines the reliquary and goes catatonic. She whispers "it is dreaming" before she stops speaking entirely.',
        'The party meets Kael, a ranger fleeing the same direction. He has been running for three months. He does not have a reliquary. He is running because he touched one.',
        'Passage through the Drowned Fen: three days of waist-deep water, no dry ground, things moving under the surface',
        'A town refuses to let the party enter. They have heard what follows. The party watches from the tree line as the entity walks through the town gate at dusk.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Threshold',
      summary:
        'The final push to the Vault. The entity is close enough to see now - a tall, featureless figure that walks with the certainty of gravity. The party reaches the Vault and must complete the binding ritual while the entity closes the last distance. The ritual demands silence, concentration, and the willingness to resist the most seductive voice any of them have ever heard.',
      keyEvents: [
        'First sighting: the entity on the horizon, walking. Not fast. Not slow. Inevitable.',
        'The Ashbone Pass: a mountain crossing so narrow only one person can walk at a time, with a blizzard closing in',
        'Arrival at the Threshold Vault: ancient, sealed, covered in warnings in languages that predate writing',
        'The binding ritual begins. Six hours. Total silence. The entity arrives at hour four.',
        'The entity speaks for the first time. It does not threaten. It offers rest. It tells each party member exactly what they want to hear.',
        'The party must resist or yield. The ritual completes or it does not. There is no combat. There is only will.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Kael Dunford',
      role: 'fellow survivor / cautionary tale',
      personality:
        'A ranger who touched a reliquary three months ago and has been running since. Gaunt, exhausted, speaks in half-sentences. Sleeps with his boots on. Knows every shortcut through the wild because shortcuts are all he has left.',
      secret: 'He stopped hearing the footsteps two weeks ago. He is not being followed anymore. He cannot stop running anyway.',
    },
    {
      name: 'Sister Vell',
      role: 'scholar / information source',
      personality:
        'An elderly cleric who studies pre-divine artifacts. Calm, precise, deeply curious about things that should terrify her. Examines the reliquary with the detachment of someone reading a textbook.',
      secret: 'She knows the binding ritual. She also knows it killed the last group that attempted it. She does not mention this because she believes this group is stronger. She might be wrong.',
    },
    {
      name: 'The Entity',
      role: 'pursuer / atmospheric pressure',
      personality:
        'Not a person. Not a monster. A function given form. It walks. It follows. When it finally speaks, its voice is the most comforting sound anyone has ever heard. It does not want to hurt them. It wants them to stop.',
    },
  ],
  keyLocations: [
    {
      name: 'Greymoor',
      description:
        'A small trading town at the edge of the highlands. Warm fires, good ale, friendly people. The party leaves and it goes silent. Every living thing stops moving. It takes weeks to recover.',
      significance: 'First proof that the entity leaves damage in its wake. The party cannot stop without consequences for others.',
    },
    {
      name: 'The Drowned Fen',
      description:
        'Three days of trackless swamp. No paths, no dry ground, water the color of old tea. Things brush against your legs underwater. The reeds whisper in a language that almost makes sense.',
      significance: 'A terrain obstacle that slows the party and the entity equally. Brief reprieve, maximum misery.',
    },
    {
      name: 'The Threshold Vault',
      description:
        'A stone chamber buried in a mountainside, sealed with sigils that predate every known civilization. The air inside tastes like the moment before sleep. The walls hum at a frequency felt in the teeth, not the ears.',
      significance: 'The only place where the reliquary seal can be reinforced. The finish line, if the party can hold it.',
    },
  ],
  dataSystems: [
    'survivalCondition',
    'travelPace',
    'weatherPattern',
    'wildernessHazard',
    'trapMechanism',
    'chaseSequence',
    'partyMoraleTracker',
    'campingEvent',
  ],
};
