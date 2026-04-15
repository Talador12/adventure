import type { FullCampaign } from '../types';

export const theGuildBeneath: FullCampaign = {
  id: 'full-the-guild-beneath',
  type: 'full',
  title: 'The Guild Beneath',
  tagline: 'You started with a basement and three lockpicks. Now the king wants to hire you.',
  tone: 'heist',
  themes: ['heist', 'urban', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'The city of Ironhallow sits on a network of ancient tunnels nobody mapped until the party found them. Aboveground, Ironhallow is a prosperous trade city with a corrupt merchant council, an underfunded city watch, and a population that locks its doors at night. Belowground, the tunnels connect every district — mansions, vaults, warehouses, the palace itself. The party has stumbled onto the greatest infrastructure a thieves guild could ask for. All they need is ambition, a fence, and enough sense to not get caught before they are too big to be stopped.',
  hook: 'The party is broke. Truly, utterly broke. They discover a basement in the abandoned Tanner\'s District that connects to the old tunnel network. Their first job is not glamorous: stealing a crate of silverware from a merchant who cheated one of them. But the tunnels make it embarrassingly easy. And if one job is that easy, why not two? Why not ten? Why not build something?',
  twist:
    'King Aldric does not want to destroy the guild. His kingdom\'s intelligence network was dismantled by a palace coup six months ago — every spy, every handler, every dead drop compromised. He has been watching the guild grow and he is impressed. He does not need thieves. He needs professionals who can operate in the shadows, and the party just proved they are the best in the city. The offer: become the Crown\'s secret service. Keep the guild. Keep the tunnels. Just add "the interests of the realm" to the job list.',
  climax:
    'The party sits in the king\'s private study, surrounded by the evidence of everything they have stolen, and receives the offer of a lifetime. But accepting means abandoning the guild\'s independence. The members who joined for freedom will not accept a leash — even a golden one. Refusing means the king has enough evidence to hang them all. The party must negotiate, bluff, or find a third option: a deal where the guild serves the crown\'s interests without being owned by it. The final negotiation is the hardest heist of all — stealing a king\'s leverage while sitting in his chair.',
  acts: [
    {
      title: 'Act 1: The Basement',
      summary:
        'The party starts from nothing. A basement, a tunnel map, and petty theft. Each session is a job: steal a thing, sell a thing, do not get caught. The guild grows from the party alone to a dozen members. The stakes are low but the skills are being built.',
      keyEvents: [
        'The silverware job: the party\'s first theft. Embarrassingly easy. Addictively profitable.',
        'Tunnel mapping: the party discovers connections to the merchant quarter and the noble district',
        'First recruit: a pickpocket named Sparrow who is fourteen and better with locks than anyone in the party',
        'Establishing a fence: a pawnbroker named Della who asks no questions for a 40% cut',
        'First close call: a city watch patrol finds a tunnel entrance. The party must seal it or relocate.',
        'The guild gets a name (player choice). The basement gets a proper door. It is official.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Network',
      summary:
        'The guild is real. Jobs are bigger. The party is running operations: planning heists, managing members, bribing guards, and defending territory from rival gangs. Each session introduces a new challenge — a rival guild, the city watch getting clever, or a job that goes sideways.',
      keyEvents: [
        'The warehouse job: steal an entire weapons shipment for resale. Requires a crew of twelve.',
        'Rival guild encounter: the Black Fingers have operated in Ironhallow for decades and do not appreciate competition',
        'Guard bribery network: systematically buying patrol routes and shift schedules',
        'A guild member gets caught. The party must extract them from a watch house before they talk.',
        'The vault job: a merchant bank with magical wards, pressure plates, and a golem guard. The party\'s masterpiece.',
        'Attention from above: someone in the palace is asking questions about the "tunnel thieves"',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Crown',
      summary:
        'The king reveals himself. The guild is at its peak — but the crown has leverage. The final act is not a heist. It is a negotiation between power and independence, where the party must decide what their guild becomes.',
      keyEvents: [
        'A royal summons: not an arrest, an invitation. The party enters the palace through the front door for the first time.',
        'The king\'s offer: become the crown\'s intelligence arm. Resources, legitimacy, and a royal pardon.',
        'The guild reacts: half the members want the deal, half would rather burn than serve a king',
        'The leverage: the king has evidence of every job. Accepting the deal buries it. Refusing the deal releases it.',
        'The negotiation: the party must find terms that preserve independence while satisfying the crown',
        'The final handshake — or the final heist, if the party decides to steal the evidence instead of negotiating',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'King Aldric',
      role: 'patron / shrewd monarch',
      personality:
        'A practical king who inherited a broken intelligence apparatus and has been looking for a replacement. He is not threatening. He is offering. But the offer comes with the implicit understanding that refusal has consequences. Drinks tea while discussing espionage.',
      secret: 'He admires the party. Genuinely. He wishes his actual spies had been half as competent.',
    },
    {
      name: 'Della',
      role: 'fence / businesswoman',
      personality:
        'Runs a pawnshop that smells like old wood and plausible deniability. Della can sell anything to anyone and remembers every transaction. She is loyal to profit first and the guild second, but profit and the guild have been aligned so far.',
      secret: 'She fences for the Black Fingers too. She has been playing both sides since the beginning.',
    },
    {
      name: 'Sparrow',
      role: 'guild member / protege',
      personality:
        'A fourteen-year-old pickpocket who joined the guild because the streets were worse. Treats the party as family. Frighteningly talented with locks. Will defend the guild with her life, which is exactly why the party should never let it come to that.',
    },
    {
      name: 'Vex',
      role: 'Black Fingers leader / rival',
      personality:
        'Runs the rival guild with ruthless efficiency. Does not hate the party — hates that they are good at something he thought was his monopoly. Would rather absorb them than destroy them. Destruction is expensive.',
    },
  ],
  keyLocations: [
    {
      name: 'The Basement (Guild HQ)',
      description:
        'Started as a literal basement. Now a sprawling underground complex connected to the tunnel network. Maps on the walls. Lockpick racks. A table where jobs are planned over stolen wine.',
      significance: 'The guild\'s home. Grows with the party. Every upgrade represents a milestone.',
    },
    {
      name: 'The Tunnel Network',
      description:
        'Ancient tunnels beneath Ironhallow connecting every district. Unmapped by anyone except the party. Some sections are flooded. Some are warded. All are useful.',
      significance: 'The guild\'s strategic advantage. Every heist starts and ends in the tunnels.',
    },
    {
      name: 'Ironhallow',
      description:
        'A prosperous trade city with a corrupt council, a tired watch, and enough wealthy targets to keep a guild busy for decades. The upper city glitters. The lower city schemes.',
      significance: 'The playground. Every building is a potential target. Every person is a potential mark or recruit.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'trapCorridor',
    'disguiseIdentity',
    'socialEncounter',
    'factionReputation',
    'npcRelationshipWeb',
    'lootTable',
    'chaseSequence',
  ],
};
