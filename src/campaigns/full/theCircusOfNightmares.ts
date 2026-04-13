import type { FullCampaign } from '../types';

export const theCircusOfNightmares: FullCampaign = {
  id: 'full-circus-of-nightmares',
  type: 'full',
  title: 'The Circus of Nightmares',
  tagline: 'They came for the show. The show would not let them leave.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'comedy'],
  playerCount: { min: 2, max: 5 },
  levelRange: { start: 2, end: 9 },
  estimatedSessions: 12,
  settingSummary:
    'The Carnival Maleficarum appears only at night, sets up in minutes, and vanishes before dawn. Its performers are trapped—bound by ancient contracts to entertain eternally. When the circus comes to the party\'s town, some locals enter and do not return. The party must investigate, only to find the doors locked behind them.',
  hook: 'The Carnival arrives in town. The party\'s employer asks them to find their child who snuck inside. When they enter to retrieve the kid, the tents rearrange and the exit disappears.',
  twist:
    'The Ringmaster is actually the first victim, not the villain. The true master of the Carnival is the Tent itself—a sentient extradimensional entity that feeds on the fear and wonder of its audience.',
  climax:
    'The party must perform their own act in the Grand Finale—impressing the Carnival enough to earn their freedom—or find a way to destroy the Tent without killing everyone trapped inside.',
  acts: [
    {
      title: 'Act 1: The Big Top',
      summary:
        'The party explores the Carnival\'s impossible geography—tents bigger inside than out, performers who cannot die, attractions that show visitors their worst fears. They meet other trapped souls and learn the rules of survival.',
      keyEvents: [
        'Entering the Carnival and the immediate disappearance of the exit',
        'Meeting Pierrot, a clown who has been performing for 200 years',
        'The Hall of Mirrors shows each party member a different way they could die',
        'Discovering that performers who stop entertaining become part of the scenery',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Behind the Curtain',
      summary:
        'The party investigates the Carnival\'s origins and learns about the Ringmaster\'s tragic backstory. They discover that contracts can be transferred—and that some performers want to escape, while others have gone mad and want new company.',
      keyEvents: [
        'Finding the Contract Scrolls in the Ringmaster\'s wagon',
        'Learning the Carnival moves between worlds, not just towns',
        'Meeting the Trapeze Twins—one wants to leave, one wants the party to stay forever',
        'The Freakshow revolt—some attractions want to help, others want fresh victims',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Grand Finale',
      summary:
        'The party must either perform in the Finale or find another way out. They confront the true nature of the Carnival and make the final choice: escape, take over, or destroy it all.',
      keyEvents: [
        'Preparing an act—each party member contributes a skill to the performance',
        'The Finale begins—the audience includes everyone who ever died in the Carnival',
        'Confronting the Tent itself, a writhing mass of canvas and dimension',
        'Final choice: break all contracts (freeing everyone but ending the magic), become new management, or burn it down',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Pierrot the Sad Clown',
      role: 'ally / guide',
      personality:
        'Eternal performer who remembers every audience. Kind, tired, helps newcomers navigate the Carnival\'s dangers.',
      secret: 'He was the Ringmaster\'s brother and knows how the first contract was signed.',
    },
    {
      name: 'Ringmaster Silas',
      role: 'tragic figure',
      personality:
        'A man who tried to save his dying carnival and accidentally bound it to an entity beyond comprehension. Desperate to be freed but also protective of his "performers."',
    },
    {
      name: 'The Trapeze Twins',
      role: 'conflicted NPCs',
      personality:
        'Elena wants to escape and help the party. Elara has gone mad and wants the party to become new attractions. Identical, synchronized, terrifying.',
    },
    {
      name: 'The Tent',
      role: 'true villain',
      personality:
        'Not malevolent—just hungry. Wants to exist, wants to perform, wants to grow. Communicates through dreams and the rustling of canvas.',
    },
  ],
  keyLocations: [
    {
      name: 'The Big Top',
      description:
        'The central tent, larger inside than a cathedral. The stage is never in the same place twice.',
      significance: 'Main performance venue and site of the Grand Finale.',
    },
    {
      name: 'The Hall of Mirrors',
      description:
        'A maze of reflections where visitors see versions of themselves from timelines where they made different choices.',
      significance: 'Navigation puzzle and source of psychological horror.',
    },
    {
      name: 'The Ringmaster\'s Wagon',
      description:
        'A mobile office containing the Contract Scrolls and records of every performance across centuries.',
      significance: 'Where the party learns the truth and finds the path to freedom.',
    },
  ],
  dataSystems: ['hauntedLocation', 'mirrorDimension', 'darkBargain', 'evolvingTrap'],
};
