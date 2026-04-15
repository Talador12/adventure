import type { FullCampaign } from '../types';

export const theCircusOfNightmares: FullCampaign = {
  id: 'full-circus-of-nightmares',
  type: 'full',
  title: 'The Circus of Nightmares',
  tagline: 'The audience laughed for three hours. The show ended two hours ago.',
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
        'Entering the Carnival and the immediate disappearance of the exit. The party turns around and the entrance is a painted backdrop. It smells like wet canvas and something sweet that has turned.',
        'Meeting Pierrot, a clown who has been performing for 200 years. His makeup is perfect. His eyes are not. They track the party with the focus of someone who has not seen a new face in decades.',
        'The Hall of Mirrors shows each party member a different way they could die. The reflections are detailed. They include the date.',
        'Discovering that performers who stop entertaining become part of the scenery - a juggler frozen mid-throw, incorporated into a tent pole, his painted smile wider than his face should allow',
        'Quiet dread: the party hears applause from the Big Top. It is empty. The seats are full of impressions where people sat so long the cushions remember their shapes.',
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
        'Eternal performer who remembers every audience. He counts them. He is on audience 73,412. He tells you this immediately, then apologizes. He laughs at things that are not funny and goes silent when they are. Two hundred years of performing have made his smile automatic and his sadness genuine.',
      secret: 'He was the Ringmaster\'s brother and knows how the first contract was signed.',
    },
    {
      name: 'Ringmaster Silas',
      role: 'tragic figure',
      personality:
        'A man who tried to save his dying carnival and accidentally bound it to something beyond comprehension. He speaks in a showman\'s cadence even in private conversation. He cannot stop performing. His hands gesture constantly, directing invisible acts. Desperate to be freed but protective of his "performers" in the way a warden is protective of prisoners he has come to love.',
    },
    {
      name: 'The Trapeze Twins',
      role: 'conflicted NPCs',
      personality:
        'Elena wants to escape. Elara has gone mad and wants the party to stay forever. Identical, synchronized, terrifying. They finish each other\'s sentences but one sentence is a plea for help and the other is an invitation to join. Their hands are always reaching - Elena toward the exit, Elara toward you.',
    },
    {
      name: 'The Tent',
      role: 'true villain',
      personality:
        'Not malevolent - just hungry. Communicates through dreams and the rustling of canvas. When it is pleased, the tent flaps sound like applause. When it is angry, the fabric tightens and the space inside shrinks. It does not hate. It performs.',
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
