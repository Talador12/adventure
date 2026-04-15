import type { OneShotCampaign } from '../types';

export const paperworkQuest: OneShotCampaign = {
  id: 'oneshot-paperwork-quest',
  type: 'oneshot',
  title: 'Paperwork Quest',
  tagline: 'A quest that requires actual in-game paperwork. License applications, tax returns, insurance claims, and an environmental impact assessment for Fireball.',
  tone: 'shenanigans',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The city of Regulon has achieved what no dungeon ever could: making adventurers give up. Not through monsters or traps, but through BUREAUCRACY. Every action in Regulon requires a permit. Entering the dungeon below the city requires a Dungeon Access License (Form DD-7). Casting spells requires a Spellcasting Variance Permit (Form MG-12). Using a weapon requires a Combat Authorization Form (Form WP-3). Looting treasure requires filing a Treasure Acquisition Tax Return (Form TX-1). The dungeon below Regulon is apparently trivial. Nobody has ever completed the paperwork required to enter it.',
  hook: 'The party arrives in Regulon to clear a dungeon. They approach the entrance and are stopped by a clerk. "Do you have your DD-7 Dungeon Access License?" No. "Then you will need to apply at the Bureau of Subterranean Affairs, third floor, Window 7. They close at 3. It is currently 2:45." The party has 15 minutes to navigate a bureaucracy that has never processed a form in under 3 weeks. The dungeon has a 500-gold bounty. The filing fees total 487 gold.',
  twist:
    'The bureaucracy IS the dungeon. The clerk at Window 7 is a lich in disguise who feeds on frustration. The maze of offices is the dungeon layout. The "traps" are circular references between forms (Form MG-12 requires Form DD-7, which requires Form MG-12). The boss fight is the Head of Regulatory Compliance, a devil who trades in signed contracts. The party was in the dungeon the moment they walked into the Bureau. Nobody has completed the paperwork because nobody has ever beaten the bureaucracy-dungeon.',
  climax:
    'The party reaches the Head of Regulatory Compliance: a pit fiend in a three-piece suit sitting behind a desk covered in forms. He offers a deal: sign one form - a contract that gives him their souls - and all other paperwork is waived. Every dungeon, every spell, every weapon, permit-free forever. Or they can fight him. With permits for combat. Which they do not have. The party must either out-bureaucracy the devil (find a loophole in HIS contract), fight without permits (illegal, guards spawn), or fill out every form correctly in real time while the devil watches.',
  scenes: [
    {
      title: 'Scene 1: The Bureau',
      summary:
        'The party enters the Bureau of Subterranean Affairs and begins the permit process. Each window sends them to another window. Each form requires another form. The maze of offices IS the dungeon.',
      challenge: 'puzzle',
      keyEvents: [
        'Window 7: "You need Form DD-7. Do you have Form MG-12 (spell permit)? No? Window 12, second floor."',
        'Window 12: "Form MG-12 requires a Hazard Assessment (Form HA-3). Do you plan to cast Fireball? You need an Environmental Impact Assessment. Window 19."',
        'Window 19: "The Environmental Impact Assessment requires a Structural Integrity Report from the dungeon you have not entered yet. You need Form DD-7 to enter the dungeon. Window 7."',
        'The party realizes the forms are circular. DD-7 requires MG-12 requires HA-3 requires a dungeon report requires DD-7. This is not bureaucracy. This is a trap.',
      ],
    },
    {
      title: 'Scene 2: The Bureaucracy Dungeon',
      summary:
        'The party navigates the Bureau as a dungeon. Clerks are disguised monsters. Office corridors are dungeon hallways. The filing cabinets are mimics. The water cooler is a slime. Combat requires a permit the party does not have.',
      challenge: 'combat',
      keyEvents: [
        'The party identifies a clerk as a lich. He does not attack. He files their complaint in the "Resolved" pile and it vanishes.',
        'A mimic filing cabinet bites the rogue. The rogue fights back. An alarm sounds: "UNAUTHORIZED COMBAT. DO YOU HAVE FORM WP-3?"',
        'The break room is a safe zone. Other adventurers are here, stuck in paperwork hell. Some have been here for WEEKS. One is filling out Form TX-1 for a treasure he found three months ago.',
        'The party finds a shortcut: the "Expedited Processing" corridor, which is a trapped hallway with spinning filing cabinets and paper guillotines.',
      ],
    },
    {
      title: 'Scene 3: The Head of Regulatory Compliance',
      summary:
        'The pit fiend behind the desk. The soul contract. The party must out-lawyer a devil or fight him in a bureaucratic nightmare.',
      challenge: 'social',
      keyEvents: [
        'The pit fiend offers the deal: sign one form, all permits waived forever. The form is a soul contract. The fine print is in Infernal.',
        'The party can read the contract: it has a clause that voids itself if any permit is filed CORRECTLY. The devil assumed nobody ever would.',
        'Option 1: find the one form in the Bureau that has been correctly filed (it exists, from a clerk who actually did her job) and present it.',
        'Option 2: fight the devil. Without permits. Guards spawn. The guards also need permits to arrest the party. The entire Bureau devolves into a bureaucratic paradox where nobody has the correct paperwork to do anything.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Head of Regulatory Compliance',
      role: 'final boss / pit fiend in a suit',
      personality:
        'A pit fiend who discovered that bureaucracy harvests more souls than war. He wears a perfectly tailored suit, speaks in legalese, and has never lost a contract negotiation. "Read the fine print. Or do not. Most people do not. That is the fun part."',
      secret: 'He is terrified of correctly filed paperwork. One properly completed form disrupts his entire system.',
    },
    {
      name: 'Mildred (Window 7)',
      role: 'lich clerk / frustration harvester',
      personality:
        'A lich disguised as an elderly woman at a service window. She feeds on the frustration of people waiting in line. She has been at Window 7 for 200 years. She is the happiest lich alive. "Take a number, dear. Current wait time: infinity."',
    },
    {
      name: 'Dave the Stuck Adventurer',
      role: 'comic relief / cautionary tale',
      personality:
        'A barbarian who has been filling out Form TX-1 for three months. He does not understand taxes. He does not understand forms. He is crying over a quill. "What does \'adjusted gross income\' mean? I AM gross. Is that the same thing?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Bureau of Subterranean Affairs',
      description:
        'A massive government building that is secretly a dungeon. Office corridors are dungeon hallways. Clerks are disguised monsters. The filing system is a trap. It looks exactly like a boring government office, which is what makes it so insidious.',
      significance: 'The entire adventure. The bureaucracy IS the dungeon.',
    },
    {
      name: 'The Office of the Head of Regulatory Compliance',
      description:
        'A corner office with a mahogany desk, leather chair, and a pit fiend in a three-piece suit. The walls are lined with soul contracts in filing frames. It smells like brimstone and printer toner.',
      significance: 'The final boss fight. Contract negotiation as combat.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'puzzleLock',
    'combatNarration',
    'trapDisarm',
    'fantasyInsults',
    'plotTwistEngine',
  ],
};
