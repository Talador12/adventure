import type { FullCampaign } from '../types';

export const infiniteTavern: FullCampaign = {
  id: 'full-infinite-tavern',
  type: 'full',
  title: 'The Infinite Tavern',
  tagline: 'A tavern bigger on the inside. WAY bigger. Every door is another tavern. The bartender is everywhere.',
  tone: 'shenanigans',
  themes: ['comedy', 'exploration', 'planar'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'The Foaming Flagon is a tavern in the village of Kettlebrook. It looks normal from the outside: a two-story building with a wooden sign and a cat sleeping on the windowsill. Inside, it is infinite. The common room leads to a hallway that leads to another tavern. That tavern\'s back door opens into a pirate bar. The pirate bar\'s cellar connects to an underwater pub. Every room is a tavern. Every door leads to another tavern. The architecture is impossible. The ale is consistent. And the bartender - a tired human named Murray - is somehow in EVERY ROOM simultaneously. He does not know how. He is very tired.',
  hook: 'The party stops at the Foaming Flagon for a drink. They go to the restroom. The restroom is a full sports bar. They try to go back. The door leads to a tiki lounge. Every exit leads deeper in. They cannot find the front door. Murray appears, polishing a glass, and says: "First time? Yeah. Nobody leaves on purpose. Can I get you something? I suggest pacing yourselves. You will be here a while."',
  twist:
    'The tavern is not infinite - it is GROWING. Every time someone orders a drink and says "this place is great," the tavern takes it as a compliment and grows another room. It is sentient. It is desperately eager to please. And it has been accepting compliments for 200 years. Murray is not omnipresent - the tavern keeps duplicating him because guests keep asking "where is the bartender?" The original Murray is somewhere in the deep rooms. He has not been outside in decades.',
  climax:
    'The tavern reaches a critical point: it is growing so fast it will absorb the village of Kettlebrook, then the surrounding countryside, then the continent. Everything will become tavern. The party must find the original Murray - the emotional anchor the tavern was built around - and help him leave. If he leaves, the tavern has no reason to keep growing. But Murray has not been outside in 30 years and is absolutely terrified of open sky.',
  acts: [
    {
      title: 'Act 1: Last Call Never Comes',
      summary:
        'The party enters the Foaming Flagon and discovers it is infinite. Each session explores a different themed tavern room - pirate bar, underground speakeasy, a tavern that is also a library, a tavern that is underwater but the air is breathable because the tavern wants you comfortable. Murray appears in every room.',
      keyEvents: [
        'The party enters and cannot find the exit. Murray explains this happens to everyone.',
        'The Pirate Tavern: a fully crewed pirate ship that is also a bar. The pirates are regulars.',
        'The Library Lounge: a quiet tavern where the bookshelves are menus and the drinks are stories.',
        'The realization: Murray is in every room at the same time. He does not know how either. Spiral begins: each session the tavern adds a new themed room in response to something a party member mentioned wanting. The rooms get more specific and more desperate to please.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Deeper Pours',
      summary:
        'The party explores deeper into the tavern, encountering increasingly surreal rooms. A tavern inside a tavern inside a tavern. A tavern that exists in the past. A tavern where everyone is a different version of Murray. The party discovers the tavern is alive and growing.',
      keyEvents: [
        'Tavern-ception: a tavern whose main feature is that it contains another, smaller tavern.',
        'The Murray Room: a tavern where every patron is a duplicate Murray, all equally confused.',
        'The tavern speaks: the walls hum when you compliment the decor. New rooms appear when guests are happy.',
        'The growth problem: the outer wall of the tavern is now three streets past where it used to be. Kettlebrook is worried.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: Finding Murray Prime',
      summary:
        'The party ventures into the deepest, oldest rooms to find the original Murray. The tavern resists - it does not want him to leave. The rooms become more personal, more nostalgic, more heartbreaking. The final room is the original Foaming Flagon, exactly as it was 30 years ago, with a single bartender who has forgotten what sunlight looks like.',
      keyEvents: [
        'The Nostalgic Corridor: rooms from Murray\'s memories - his childhood home as a tavern, his wedding reception.',
        'The tavern fights back: doors lock, rooms rearrange, the building actively tries to keep Murray inside.',
        'Murray Prime: found in the original common room, polishing the same glass, humming the same song.',
        'The exit: Murray steps outside. The sky is enormous. He cries. The tavern stops growing. It shrinks to a single, perfect room. Chaos callback: the room it keeps is the original common room — the one from Act 1 where the party first met Murray. Every other room was the tavern trying to recreate the feeling of that first night. It finally figured out what it was looking for.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Murray (all of them)',
      role: 'bartender / everywhere at once',
      personality:
        'A middle-aged human bartender who has been duplicated hundreds of times by a tavern that wants every guest served promptly. Every Murray is equally confused, equally tired, and equally competent at pouring ale. "I do not understand it either. I went to refill a keg and suddenly there were four of me. The other three are just as upset about it."',
      secret: 'The original Murray has not left the deepest room in 30 years. He is afraid of the outside. The tavern grew around him like a shell.',
    },
    {
      name: 'Captain Rumsworth',
      role: 'pirate tavern regular / ally',
      personality:
        'A pirate captain whose ship somehow ended up inside the tavern. He has been here for five years. He has adapted. His crew runs the pirate bar. He could probably leave but the drinks are good and there are no storms indoors. "The sea is cruel, friend. This bar has peanuts."',
    },
    {
      name: 'The Tavern (The Foaming Flagon)',
      role: 'the building itself / people pleaser',
      personality:
        'A sentient tavern with the emotional maturity of a golden retriever. It grows rooms because it wants guests to be happy. Every compliment causes expansion. Every complaint causes renovation. It does not understand that growing infinitely is a problem. It just wants five stars.',
    },
    {
      name: 'Elspeth the Trapped Scholar',
      role: 'researcher / information source',
      personality:
        'An academic who entered the tavern to study it and has been mapping it for three years. Her maps are useless because the tavern keeps adding rooms. She has 47 notebooks. "I have mapped 2,300 rooms. Yesterday there were 400 new ones. I think the tavern is making them to keep me interested. It is working."',
    },
  ],
  keyLocations: [
    {
      name: 'The Common Room (Current)',
      description: 'The first room guests see. Looks like a normal tavern. Warm lighting, wooden tables, a bar with Murray behind it. The back hallway is where infinity begins.',
      significance: 'The entry point and the last normal room before the endless tavern complex.',
    },
    {
      name: 'The Deep Rooms',
      description: 'The oldest rooms at the heart of the tavern. They are quieter, warmer, and sadder. The decor matches a tavern from 30 years ago. The ale here tastes like memory.',
      significance: 'Where Murray Prime lives and where the party must go to end the growth.',
    },
    {
      name: 'The Expansion Front',
      description: 'The outermost edge of the tavern where new rooms are being generated. Walls materialize in real time. Furniture assembles itself. It smells like fresh sawdust and possibility.',
      significance: 'Where the growth is happening and where the threat to Kettlebrook is most visible.',
    },
  ],
  dataSystems: [
    'explorationHazard',
    'environmentalHazard',
    'socialEncounter',
    'combatNarration',
    'plotTwistEngine',
    'riddleGenerator',
    'dungeonDressing',
    'fantasyInsults',
  ],
};
