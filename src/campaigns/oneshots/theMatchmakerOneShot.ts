import type { OneShotCampaign } from '../types';

export const theMatchmakerOneShot: OneShotCampaign = {
  id: 'oneshot-matchmaker',
  type: 'oneshot',
  title: 'The Matchmaker',
  tagline: 'Three clients. Three potential matches. One evening. You ARE the dating service.',
  tone: 'social',
  themes: ['social', 'comedy'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The party runs a matchmaking service for one evening at the Midsummer Festival. Three clients, three potential matches, and a ballroom full of complications. No combat. Pure social engineering, romantic comedy, and the chaos of trying to make love happen on a deadline.',
  hook: 'The village matchmaker broke her leg. She begs the party to take over for the Midsummer Festival. "Three clients, all paid in advance. Match them by midnight or I lose my reputation. Here are the files. Good luck."',
  twist:
    'Client #2 and Match #3 are already secretly in love but both signed up with the matchmaker to make the other jealous. They have been playing games instead of talking. The party must see through the scheme and call them on it.',
  climax:
    'Midnight approaches. All three matches must be sealed. Client #1 is on a disastrous date. Client #2 and Match #3 are avoiding each other. Client #3 has fallen for someone not on the list. The party must improvise, redirect, and close all three matches before the clock strikes twelve.',
  scenes: [
    {
      title: 'Scene 1: The Clients',
      summary: 'Meet the three clients. Learn their desires, fears, and deal-breakers. Scout the potential matches.',
      challenge: 'social',
      keyEvents: [
        'Client #1: A shy half-elf librarian who wants adventure. Their match: a bold fighter who cannot read.',
        'Client #2: A confident merchant who claims to want stability. Secretly pining.',
        'Client #3: A widowed carpenter just re-entering the social world. Fragile and hopeful.',
        'The party scouts the matches, assesses compatibility, and plans introductions.',
      ],
    },
    {
      title: 'Scene 2: The Dates',
      summary: 'Three simultaneous dates at the festival. The party splits up to chaperone, coach, and rescue.',
      challenge: 'social',
      keyEvents: [
        'Date #1: the librarian spills wine. The fighter is charming but overwhelming. Rescue needed.',
        'Date #2: the merchant keeps looking at someone across the room. Their date notices.',
        'Date #3: the carpenter is doing well until their late spouse is mentioned. Tears.',
        'The party runs between dates, coaching through whispered advice and creative distractions.',
      ],
    },
    {
      title: 'Scene 3: Midnight',
      summary: 'The clock is ticking. One date is failing, one was never real, one went off-script. The party must close all three.',
      challenge: 'social',
      keyEvents: [
        'Client #1\'s date is salvaged by finding common ground: the fighter wants to learn to read.',
        'Client #2 and their secret love are confronted. The party calls the bluff.',
        'Client #3 fell for someone unexpected. The party must approve an off-list match.',
        'Midnight. Three couples. The matchmaker\'s reputation (and the party\'s fee) is saved.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Hazel Thornberry',
      role: 'injured matchmaker',
      personality: 'A no-nonsense halfling with forty years of matchmaking experience and very strong opinions about romantic chemistry. Coaches the party from her bed via messenger bird.',
    },
    {
      name: 'Elwin (Client #1)',
      role: 'shy librarian',
      personality: 'Quietly brilliant, socially terrified, writes beautiful letters but cannot make eye contact. Wants someone who makes the world feel bigger.',
    },
    {
      name: 'Mira (Client #2)',
      role: 'merchant / secret piner',
      personality: 'Confident, successful, and using the matchmaker to make someone jealous. Terrible at admitting feelings. Good at business, bad at love.',
    },
  ],
  keyLocations: [
    {
      name: 'The Midsummer Festival',
      description: 'A lantern-lit festival with dancing, food stalls, and dozens of potential romantic partners. The perfect backdrop for love or disaster.',
      significance: 'The venue for all three dates. The party must navigate the crowd while juggling clients.',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker'],
};
