import type { FullCampaign } from '../types';

export const theThousandMasks: FullCampaign = {
  id: 'full-the-thousand-masks',
  type: 'full',
  title: 'The Thousand Masks',
  tagline: 'Nobody in the guild knows anyone\'s real face. That is the first rule. The second rule is there are no rules.',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 4, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Valcross is a vertical metropolis built into the face of a cliff — the rich live at the top in sunlight, the poor live at the bottom in shadow, and five noble houses wage a cold war for control of everything in between. The Thousand Masks operate in every layer. They are not assassins. They steal secrets, forge documents, manipulate elections, and stage elaborate deceptions. Every member wears a different mask for every job. Nobody knows anyone\'s real identity. Trust is built on competence, not names.',
  hook: 'The party receives a mask in a box with no return address. Inside is a note: "Wear it to the Fountain of Echoes at midnight. Speak your skills, not your name. If you are good enough, you will be hired. If you are not, you will forget this ever happened." The guild does not recruit. It selects.',
  twist:
    'The guild master, known only as The Conductor, has been taking contracts from all five noble houses simultaneously. Every job the party has pulled — every stolen document, every forged letter, every manipulated negotiation — has been a move in a chess game only The Conductor can see. The guild is not a business. It is a regime change operation. The Conductor is dismantling the noble house system entirely, replacing aristocratic rule with a merchant republic. Every mask the party wore was a vote in an election that has not happened yet.',
  climax:
    'The five noble houses discover The Conductor\'s plan and unite against the guild for the first time in history. The party must pull the final job: infiltrate all five houses on the same night, plant evidence of each house\'s crimes against the others, and trigger a simultaneous collapse of public trust. If they succeed, the merchant republic rises. If they fail, every guild member is unmasked, and the houses execute them all. The Conductor removes their mask. It is someone the party has known since session one — but in a different mask.',
  acts: [
    {
      title: 'Act 1: The Audition',
      summary:
        'The party joins the guild and learns the craft. Each session is a contract: steal a letter, forge a seal, impersonate a diplomat. They build their reputation within the guild while learning the city\'s political landscape.',
      keyEvents: [
        'The midnight audition at the Fountain of Echoes — masks on, names off',
        'First contract: steal a love letter being used as blackmail. Simple. Clean. Educational.',
        'Second contract: forge trade documents to redirect a grain shipment to the lower city',
        'The party meets guild members who are clearly nobility, clergy, and guard captains — behind their masks',
        'A rival guild operative tries to infiltrate. The party must identify them using only behavioral tells.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Web',
      summary:
        'Contracts become more complex and politically charged. The party begins to notice patterns — every job weakens a noble house in a specific way. They start asking questions The Conductor does not want answered.',
      keyEvents: [
        'A contract to manipulate a judicial ruling — the "guilty" party is actually innocent',
        'The party discovers two of their contracts directly contradicted each other. By design.',
        'A noble house hires the guild to investigate... the guild. The party must investigate themselves.',
        'The Conductor assigns a contract that will destabilize the entire grain market. Thousands could go hungry.',
        'A guild member goes rogue. The party must bring them back without exposing the guild — or silence them.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Unmasking',
      summary:
        'The Conductor\'s endgame is revealed. The five houses unite. The guild faces annihilation or revolution. The party must pull the most complex job in the guild\'s history — or betray The Conductor and save the status quo.',
      keyEvents: [
        'The Conductor reveals the plan: regime change, merchant republic, end of aristocratic rule',
        'The five houses announce a joint inquisition targeting "the masked conspiracy"',
        'The party plans the final job: five simultaneous infiltrations, one night, no room for error',
        'Execution night: each party member leads a team into a different noble house',
        'The Conductor unmasks. The party realizes they have been working with this person all along.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Conductor',
      role: 'guild master / revolutionary',
      personality:
        'Appears differently in every interaction — different mask, different voice, different mannerisms. The only constant is an absolute calm under pressure and a habit of finishing other people\'s sentences. Treats the guild like an orchestra and every job like a movement in a symphony.',
      secret: 'Is one of the five noble house heirs. Is destroying the system that would have made them the most powerful person in Valcross.',
    },
    {
      name: 'Redhand',
      role: 'guild lieutenant / moral compass',
      personality:
        'The guild\'s oldest active operative. Wears a red leather glove on their left hand. Never speaks above a whisper. Judges people by what they do when they think nobody is watching.',
      secret: 'Was the first person The Conductor recruited. Knows the full plan. Does not fully agree with it but is in too deep to walk away.',
    },
    {
      name: 'Lady Vesper Ashford',
      role: 'noble house leader / primary target',
      personality:
        'Controls House Ashford, the wealthiest of the five. Intelligent, paranoid, and correct about the conspiracy — she just cannot prove it. Treats everyone like a suspect because everyone might be.',
      secret: 'She has a guild mask hidden in her chambers. She was a member once. She left. The Conductor has never forgiven her.',
    },
  ],
  keyLocations: [
    {
      name: 'Valcross',
      description:
        'A vertical city carved into a cliff face. The top sees sun. The bottom sees none. Bridges, lifts, and ladders connect the layers. Every level has its own culture.',
      significance: 'The entire campaign takes place in this city. Knowing its geography is knowing its politics.',
    },
    {
      name: 'The Fountain of Echoes',
      description:
        'A fountain in the middle layer where sound carries strangely — whispers amplify and shouts vanish. The guild meets here because surveillance is impossible.',
      significance: 'Guild meeting point. Where the party was recruited and where the final job is planned.',
    },
    {
      name: 'The Masquerade Archive',
      description:
        'A hidden vault beneath the fountain containing a mask for every job the guild has ever pulled. Thousands of faces, all hollow.',
      significance: 'The guild\'s history and The Conductor\'s evidence vault. Finding it is finding the proof of everything.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'disguiseIdentity',
    'socialEncounter',
    'factionReputation',
    'politicalIntrigue',
    'npcRelationshipWeb',
    'chaseSequence',
    'trapCorridor',
  ],
};
