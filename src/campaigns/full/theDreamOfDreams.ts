import type { FullCampaign } from '../types';

export const theDreamOfDreams: FullCampaign = {
  id: 'full-the-dream-of-dreams',
  type: 'full',
  title: 'The Dream of Dreams',
  tagline: 'You are trapped in someone else nightmare. The doors lead to childhood memories. The monster is a metaphor.',
  tone: 'mystery',
  themes: ['mystery', 'planar', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 14 },
  estimatedSessions: 15,
  settingSummary:
    'The party wakes up in a place that does not make sense. Hallways stretch and compress. Doors open onto impossible landscapes - a childhood bedroom, a funeral, a school that never existed. Monsters appear that are not monsters: a shadowy figure that just stands and stares, a flood with no water source, a locked door that screams when touched. Nothing follows physical law. Everything follows emotional logic. The party is inside a dream. Not their own. Someone is having a nightmare and the party is trapped inside it.',
  hook:
    'The party falls asleep at an inn. They wake up in a version of the inn where the walls breathe and the ceiling drips something warm. The door leads to a forest that smells like a specific perfume. A child laughs in the distance but runs when approached. A clock ticks but its hands move backward. Nothing is dangerous yet. Everything is wrong. A voice - barely a whisper - says: "Please wake me up. I cannot find the way out."',
  twist:
    'The dreamer is one of the party members. They do not know it. The nightmare is built from a memory they suppressed so thoroughly they forgot it existed. The other party members are real - pulled into the dream by its intensity. The monsters are metaphors for the dreamer guilt, fear, and grief. The labyrinth is the dreamer subconscious trying to protect them from remembering. The "cure" is forcing the dreamer to confront what they buried. They will not want to.',
  climax:
    'The dreamer is identified (or identifies themselves). The nightmare collapses into the core memory: the event they suppressed. It is personal, painful, and real. The party must help the dreamer face it - not fight it, face it. The monsters dissolve when acknowledged. The labyrinth opens when the dreamer stops running. Waking up requires accepting what happened. The campaign ends with the party waking at the inn, changed, with the dreamer finally free of something they carried for years.',
  acts: [
    {
      title: 'Act 1: Wrong in Every Direction',
      summary:
        'The party explores the dreamscape. Dream logic rules: doors lead to emotions, not rooms. Combat encounters are metaphors. A "dragon" is made of report cards and disapproving faces. A "dungeon" is a childhood closet. The party tries to map the unmappable while searching for the dreamer.',
      keyEvents: [
        'Waking in the breathing inn. The door leads to a forest that smells like a specific person perfume.',
        'The first dream-monster: a shadow that does not attack - it just watches and radiates disappointment. Weapons pass through it.',
        'A door labeled "DO NOT OPEN" leads to a birthday party where every guest has no face',
        'The party discovers they can manipulate the dream by focusing on emotions rather than logic. Anger opens locked doors. Grief calms storms.',
        'A recurring figure: a woman who appears in the distance, never approaches, and vanishes when observed directly. She feels familiar to one party member.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Architecture of Guilt',
      summary:
        'The dreamscape intensifies into a nightmare. The party realizes the dreams are structured around a specific life - one of their own. The childhood bedroom belongs to a party member. The funeral is for someone they knew. The labyrinth is their subconscious. The dreamer is among them.',
      keyEvents: [
        'The bedroom: one party member recognizes the wallpaper, the toys, the view from the window. This is their room.',
        'The other players confront the dreamer (who still does not realize it). "These are YOUR memories. This is YOUR dream."',
        'The labyrinth tightens: the subconscious fights back, creating walls and dead ends to prevent the party from reaching the core memory',
        'The nightmare peaks: a flood of formless guilt - not a monster, a feeling made manifest. It drowns everything.',
        'The woman appears clearly for the first time. The dreamer recognizes her. The temperature drops. The dream goes silent.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Waking',
      summary:
        'The core memory is exposed. The dreamer must face what they buried: a loss, a failure, a choice that cannot be undone. The party cannot fight this. They can only be present. The monsters dissolve when named. The labyrinth opens when the dreamer stops running. Waking up is the hardest thing the dreamer has ever done.',
      keyEvents: [
        'The core memory manifests: a specific, personal scene. Not epic. Not fantastical. Painfully ordinary and devastating.',
        'The monsters gather - not to attack but to be acknowledged. Each one is a specific guilt, fear, or regret given form.',
        'The dreamer names them: "You are my guilt for leaving. You are my fear of being forgotten. You are the words I never said."',
        'The labyrinth walls dissolve. The dream becomes still. The woman is there, clear and present. The dreamer says what they could not say before.',
        'Waking: the party opens their eyes at the inn. Dawn. Everything is normal. Everything is different.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Watcher',
      role: 'dream entity / guardian',
      personality:
        'A shadowy figure that appears in the early dreamscape. It does not speak. It does not attack. It stands at the edge of rooms with its arms at its sides and an expression of infinite sadness. When the party approaches, it takes one step backward. Always one step. It is the dreamer\'s self-awareness, trying to tell them something they are not ready to hear. If a party member waves, it waves back — slowly, as if remembering how.',
    },
    {
      name: 'The Woman',
      role: 'core memory / emotional center',
      personality:
        'A figure who appears throughout the dream, always distant. She is someone the dreamer lost - the person at the center of the suppressed memory. Not a ghost. A memory given form by the dream. She does not blame. She does not forgive. She just is.',
      secret: 'She is the dreamer memory of the last time they saw this person. The dream preserved her exactly as she was in that moment.',
    },
    {
      name: 'The Labyrinth Keeper',
      role: 'obstacle / protector',
      personality:
        'The dreamer subconscious defense mechanism, manifested as a robed figure that constantly rearranges the dreamscape. It believes it is protecting the dreamer by preventing them from reaching the core memory. It is not wrong - the memory hurts. But suppressing it hurts more.',
    },
    {
      name: 'The Birthday Guests',
      role: 'dream constructs / atmosphere',
      personality:
        'Faceless figures at a recurring dream party. They speak in half-sentences and repeat phrases. They represent people the dreamer has lost touch with. If spoken to directly, they say things like: "We are still here. You just stopped looking."',
    },
  ],
  keyLocations: [
    {
      name: 'The Breathing Inn',
      description: 'The dream version of the real inn. Walls expand and contract. The ceiling drips warmth. Doors lead to emotional landscapes instead of rooms.',
      significance: 'The starting and ending location. Where the dream begins and where waking happens.',
    },
    {
      name: 'The Perfume Forest',
      description: 'A forest that smells like a specific person. Trees are made of half-remembered conversations. The path loops unless you follow emotional logic.',
      significance: 'The first sign that the dream is structured around a specific life.',
    },
    {
      name: 'The Core Memory',
      description: 'A small, ordinary room. A kitchen. A hospital. A car. Whatever the DM and player decide. The most important and painful place in someone life, preserved in amber by a dream that could not let go.',
      significance: 'The final location. Where the dream resolves and the dreamer wakes.',
    },
  ],
  dataSystems: ['plotTwistEngine', 'emotionalBeat', 'riddleGenerator', 'environmentalHazard', 'planarAnomaly'],
};
