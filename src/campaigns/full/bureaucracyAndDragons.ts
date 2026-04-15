import type { FullCampaign } from '../types';

export const bureaucracyAndDragons: FullCampaign = {
  id: 'full-bureaucracy-and-dragons',
  type: 'full',
  title: 'Bureaucracy & Dragons',
  tagline: 'You cannot slay the dragon without Form 7-B. Filed in triplicate. Notarized.',
  tone: 'comedic',
  themes: ['comedy', 'intrigue', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 1, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The Kingdom of Procedurea runs on paperwork. Adventuring requires permits. Spellcasting in public spaces requires environmental impact assessments. Dungeon delving requires a Subterranean Exploration License (Form 12-C). The Dungeon Master is an actual bureaucratic title — she approves your dungeon permits. Nobody finds any of this unusual. It is simply how civilization works.',
  hook: 'The party registers as a licensed adventuring company (Form 1-A, Articles of Incorporation for Heroic Enterprises). Their first quest comes through proper channels: a dragon has been reported in the Dreadfire Mountains. They receive the quest assignment, the dragon slaying permit (Form 7-B, filed in triplicate), the environmental impact waiver, and a 900-page tax code for hoard acquisition. The dragon, meanwhile, has filed a counter-complaint.',
  twist:
    'The bureaucracy is not a joke — it is a ward. Centuries ago, a cabal of wizards realized that the most dangerous things in the world (dragons, liches, demon lords) could be contained not by magic, but by process. Every form filed adds to an arcane lattice of binding contracts. The kingdom is safe BECAUSE of the paperwork. And someone is trying to deregulate.',
  climax:
    'The Deregulator — a libertarian lich who believes in "free market adventuring" — has begun dissolving the bureaucratic wards. Dragons break free. Demons ignore their binding contracts. The party must either restore the paperwork (filing the most important forms in history while under siege), defeat the lich through proper legal channels (serving him a Cease and Desist of Undeath), or find a way to maintain the wards without the bureaucracy (the compromise ending).',
  acts: [
    {
      title: 'Act 1: Permits and Dragons',
      summary:
        'The party navigates the adventuring permit system, encounters the dragon (who has a lawyer), and begins to suspect the bureaucracy is more than it seems when their properly filed Form 7-B physically repels the dragon.',
      keyEvents: [
        'Registering the adventuring company — 6 hours of in-character paperwork montage',
        'The dragon serves them with a restraining order',
        'Form 7-B glows when held near the dragon — the paperwork is magical',
        'The Dungeon Master (bureaucratic title) hints that the forms are more than forms',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Arcane Lattice',
      summary:
        'The party discovers that the bureaucracy IS the ward system. Every form is a spell component. Every filing cabinet is a phylactery. The kingdom\'s safety depends on proper procedure. Then things start getting deregulated.',
      keyEvents: [
        'A demon lord escapes because someone lost his binding contract in a filing error',
        'The Archivist reveals the truth: bureaucracy is applied metamagic',
        'The Deregulator manifests — a lich who died waiting in line and came back angry',
        'Wards begin failing across the kingdom as the lich burns permits',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Final Filing',
      summary:
        'The kingdom descends into chaos as wards collapse. The party must file the Master Form — the original contract that binds all threats — while fighting through a deregulated hellscape of freed monsters and a lich who just wants to abolish the DMV.',
      keyEvents: [
        'Gathering the signatures: three ancient beings must co-sign the Master Form',
        'The dragon from Act 1 helps — she LIKES the bureaucracy because it keeps competitors away (callback: she serves the party with a formal alliance agreement, referencing the restraining order from Act 1)',
        'The Deregulator\'s lair: a burned-out records office surrounded by freed monsters',
        'Filing the Master Form: the most dramatic act of paperwork in the history of the realm',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Dungeon Master Irene Filigree',
      role: 'quest giver / ally',
      personality:
        'The kingdom\'s official Dungeon Master — the bureaucratic position that approves all subterranean exploration permits. Meticulous, patient, and secretly one of the most powerful mages alive. She enchants every form she stamps. "Your permit is approved. Please note the dragon has filed an appeal."',
      secret: 'She is the last surviving member of the original cabal that built the ward system. She has been stamping forms for 300 years.',
    },
    {
      name: 'The Deregulator (Lich Voltaire Freemarket)',
      role: 'villain',
      personality:
        'A lich who died of old age while waiting at the Bureau of Adventuring Licenses, came back as undead, and dedicated his unlife to destroying bureaucracy. His arguments are occasionally reasonable, which makes him more dangerous. "Why should a HERO need a PERMIT to save people?"',
    },
    {
      name: 'Scoria the Red (the dragon)',
      role: 'antagonist turned ally',
      personality:
        'A dragon with a law degree. She files counter-complaints, sues adventurers for trespassing, and has never lost a case. Secretly loves the system because it protects her hoard through property law. "I have rights. Read my filing."',
    },
    {
      name: 'Aldric the Archivist',
      role: 'lore keeper',
      personality:
        'Keeper of the Grand Archive. Speaks exclusively in footnotes and citations. Knows every form ever filed and can locate any document in seconds. Terrified of the Deregulator because a world without records is his personal hell. Running gag: he cites the relevant form number for every situation, including emotional ones. "Your grief is noted. Please file Form 11-D, Emotional Distress Regarding Institutional Collapse."',
    },
  ],
  keyLocations: [
    {
      name: 'The Bureau of Adventuring Licenses',
      description: 'A massive government building with 47 service windows, 46 of which are closed. The line wraps around the block. The coffee is a war crime.',
      significance: 'Where quests are issued and the ward system is maintained.',
    },
    {
      name: 'The Grand Archive',
      description: 'An underground vault containing every form ever filed in the kingdom. The shelves are infinite. The filing system makes sense only to Aldric.',
      significance: 'Contains the Master Form and the original ward contracts.',
    },
    {
      name: 'The Deregulated Zone',
      description: 'A region where the lich has burned all permits. Monsters roam free. There are no building codes. It is terrifying.',
      significance: 'The lich\'s territory and the site of the final confrontation.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'diplomaticNegotiation',
    'factionReputation',
    'combatNarration',
    'villainMonologue',
    'plotTwistEngine',
    'questRewardNegotiation',
    'encounterWaves',
    'fantasyInsults',
  ],
};
