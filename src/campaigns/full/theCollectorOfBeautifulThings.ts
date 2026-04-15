import type { FullCampaign } from '../types';

export const theCollectorOfBeautifulThings: FullCampaign = {
  id: 'full-the-collector-of-beautiful-things',
  type: 'full',
  title: 'The Collector of Beautiful Things',
  tagline: 'The waterfall is still there. The water still falls. The beauty is gone.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'Beauty is disappearing. Not beautiful things - beauty itself. A painting in the Verandol Gallery still hangs on the wall, but looking at it provokes nothing. The colors are there. The composition is there. The spark is gone. A famous soprano can still hit every note, but her voice no longer moves anyone to tears. A waterfall in the Emerald Valley still falls, but tourists stand before it and feel nothing. Something is stealing the quality of beauty from the world, leaving the objects intact but emptied of the thing that made them matter.',
  hook: 'The Verandol Gallery hires the party after three masterwork paintings lose their beauty overnight. The canvases are undamaged. The paint is untouched. Restoration experts confirm nothing has changed physically. But nobody who looks at them feels anything anymore. A critic calls them "technically perfect and spiritually dead." The gallery wants answers. The party discovers this is not limited to art: a violinist, a garden, a sunset over the harbor - beauty is being extracted from the world, and the extractions are accelerating.',
  twist:
    'The collector is a woman named Vivienne Lace. She is dying. A degenerative condition is destroying her ability to perceive beauty - not blindness, but the erosion of the aesthetic sense itself. Colors are flattening. Music is becoming noise. Faces are becoming geometry. She discovered that stealing beauty from the world lets her perceive it one final time during the moment of theft. She is not hoarding beauty. She is experiencing it for the last time, over and over, in the seconds before it leaves her grasp. She is not a villain. She is a woman saying goodbye to everything that made life worth living, one stolen sunset at a time.',
  climax:
    'The party finds Vivienne in her gallery - a private room filled with captured beauty. The room is overwhelming: every beautiful thing she has stolen exists here in concentrated form. It is the most beautiful room in the world. Vivienne cannot see any of it anymore. Her condition has progressed. She sits in a room of wonders and perceives nothing. The party must decide: return the beauty to the world (Vivienne loses her collection and gains nothing, as she can no longer perceive it anyway), find a cure for her condition (possible but would take years, during which the world remains drained), or let her keep stealing (the world slowly empties of beauty so one woman can feel something). Vivienne does not beg. She just asks the party if the room is as beautiful as she remembers.',
  acts: [
    {
      title: 'Act 1: The Absence',
      summary:
        'The party investigates the disappearance of beauty from art, music, nature, and people. They map the pattern, rule out conventional magic, and begin to realize something unprecedented is happening: beauty is being separated from its source and taken somewhere.',
      keyEvents: [
        'The gallery: three masterworks, technically flawless, emotionally dead. Even Detect Magic finds nothing wrong.',
        'The soprano: she sings perfectly. Nobody cries. She cries instead. "I can hear that it is wrong but I do not know why."',
        'The waterfall: tourists standing before it with confused expressions. "It used to be beautiful. I remember that it was."',
        'A pattern emerges: the thefts cluster around specific neighborhoods and times. Someone is doing this deliberately.',
        'A witness: a street artist who saw a woman touch a mural at midnight. In the morning, the mural was just paint.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Collector',
      summary:
        'The party tracks the thefts to Vivienne Lace and discovers her condition. She is not a monster. She is a woman losing the ability to experience beauty and fighting it the only way she can. The party must decide whether to stop her, help her, or watch.',
      keyEvents: [
        'Vivienne identified: a reclusive patron of the arts, once the city\'s greatest aesthetic authority',
        'Her condition: healer records show progressive loss of aesthetic perception. No known cure.',
        'A conversation with Vivienne. She is gracious, articulate, and honest. She knows what she is doing. She cannot stop.',
        'The moral weight: a world slowly losing its beauty versus one woman\'s desperate attempt to feel something',
        'The rate increases. Vivienne is stealing more because she can perceive less. The diminishing returns are accelerating.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Gallery',
      summary:
        'The party enters Vivienne\'s private gallery where all stolen beauty is concentrated. They experience the most beautiful room in existence. Vivienne sits in the center and sees nothing. The final choice.',
      keyEvents: [
        'The gallery: overwhelming. Every stolen sunset, symphony, and smile compressed into one room. The party must save against weeping.',
        'Vivienne in the center: serene, still, unable to perceive the room she built. Her condition is complete.',
        'A healer offers a possible cure - years of treatment, uncertain outcome. The beauty stays locked up meanwhile.',
        'The choice: return, cure, or continue. Each path costs something the world cannot replace.',
        'Vivienne\'s question: "Is it beautiful? I built it from memory. I cannot tell anymore."',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Vivienne Lace',
      role: 'antagonist / tragic figure',
      personality:
        'Once the most sensitive aesthetic mind in the city. Now a woman in a fading world, stealing light before her eyes close forever. Dignified, honest, and heartbreaking. She does not excuse what she does. She just cannot face a world without beauty.',
      secret: 'The first thing she stole was her own reflection. She could no longer see herself as beautiful. That was when she knew she was losing everything.',
    },
    {
      name: 'Curator Halvess',
      role: 'quest giver / art world contact',
      personality:
        'The Verandol Gallery\'s head curator. Passionate about art, devastated by the losses, and increasingly frightened that beauty itself is dying. He does not know Vivienne personally but admires her old critical essays.',
    },
    {
      name: 'Maestro Davin',
      role: 'victim / ally',
      personality:
        'A composer whose latest symphony lost its beauty overnight. He can hear that the notes are right and the soul is gone. He is helping the party because he needs to understand what happened to his music.',
    },
    {
      name: 'Syla',
      role: 'healer / hope',
      personality:
        'A cleric who specializes in conditions of perception. She believes Vivienne\'s condition can be treated, but it would take years of therapy and divine intervention. She is patient, kind, and realistic about the odds.',
    },
  ],
  keyLocations: [
    {
      name: 'The Verandol Gallery',
      description: 'The city\'s premier art gallery. Home to masterworks that are now technically perfect and emotionally vacant.',
      significance: 'Where the investigation begins. The party sees beauty\'s absence before they understand the theft.',
    },
    {
      name: 'The Emerald Valley Waterfall',
      description: 'A famous natural wonder that tourists travel weeks to see. The water falls. Nobody feels anything. The absence is almost physical.',
      significance: 'Proof that the theft extends beyond art. Nature itself is being drained.',
    },
    {
      name: 'Vivienne\'s Gallery',
      description: 'A private room containing every piece of stolen beauty, concentrated into the most overwhelming aesthetic experience in the world. Vivienne sits in the center and perceives none of it.',
      significance: 'The climax. A room of captured beauty and a woman who can no longer see it.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcRelationshipWeb',
    'socialEncounter',
    'moralDilemma',
    'urbanEncounter',
    'cursedItem',
    'artObject',
  ],
};
