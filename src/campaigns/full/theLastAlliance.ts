import type { FullCampaign } from '../types';

export const theLastAlliance: FullCampaign = {
  id: 'full-the-last-alliance',
  type: 'full',
  title: 'The Last Alliance',
  tagline: 'Every war in history was engineered. The puppet master has a reason.',
  tone: 'epic',
  themes: ['epic', 'war', 'political'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 5, end: 20 },
  estimatedSessions: 24,
  settingSummary:
    'Every major conflict in the continent\'s history - the elf-dwarf wars, the orc crusades, the dragon rampages, the human civil wars - was engineered by a single entity, manipulating from the shadows for millennia. The party discovers this truth when they find a hidden archive containing correspondence, plans, and manipulations spanning thousands of years. All authored by the same hand. The party must do the impossible: forge an alliance between species that have hated each other for generations, unite them against an enemy they do not believe exists, and confront a being whose sole purpose has been to keep them divided.',
  hook: 'A dying historian hands the party a key to a vault beneath the oldest library in the world. Inside: a room filled with documents. Letters forged in the names of kings. Battle plans designed to maximize casualties on both sides. Trade agreements written to create dependency and then famine. Every document signed with the same seal: an unbroken circle. Every document orchestrated a different war. The historian\'s last words: "Follow the circle. It connects everything."',
  twist:
    'The enemy is not a villain. It is a guardian. An entity called the Warden was created at the dawn of civilization by the world\'s first united peoples - after their unity nearly destroyed reality. Ten thousand years ago, every mortal species was allied. They pooled their power and attempted a great work: reshaping the world to eliminate suffering. The ritual went wrong. Reality cracked. Millions died. The survivors created the Warden to ensure it never happened again. Its method: keep mortals fighting so they never unite with enough power to accidentally break the world. Every war it engineered saved reality from a greater threat: mortal ambition unchecked.',
  climax:
    'The alliance is forged. Mortals stand united for the first time in ten thousand years. The Warden appears and explains. It shows the party the crack in reality - still present, still fragile. If united mortals pool their power again, the crack widens. If they stay divided, the crack heals. The party must choose: trust that this generation can be responsible with the power unity brings, or accept that the Warden is right and the price of peace is division. A third option exists: heal the crack together, proving that unity can create as well as destroy.',
  acts: [
    {
      title: 'Act 1: The Archive',
      summary: 'The discovery. The conspiracy revealed. The party begins the impossible task of convincing species with millennia of hate to listen.',
      keyEvents: [
        'The vault: thousands of documents proving every major war was orchestrated by the same entity',
        'Verification: the party cross-references the documents with historical records. It checks out.',
        'Quiet moment: the party finds a letter in the archive. Forged, never sent, but written in perfect elvish. It was the letter that triggered the elf-dwarf border war. It accuses the dwarves of poisoning a river. The river was fine. Three thousand elves died over a lie on paper.',
        'First contact: approaching the elven delegation. Their reaction: "You expect us to believe our war with the dwarves was manufactured? We have a thousand years of graves."',
        'The dwarven response is worse: "Even if it is true, the dead are still dead. Knowing we were manipulated does not bring them back."',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Diplomacy',
      summary: 'Building the alliance one species at a time. Old hatreds, new evidence, and the slow realization that enemies share a common victim.',
      keyEvents: [
        'The orc summit: presenting evidence that the orc crusades were provoked by forged atrocities on both sides',
        'The dragon conclave: even the dragons were manipulated. Their rampages were responses to planted provocations.',
        'The moment of cost: the Warden\'s agents try to reignite old conflicts with a border incident. If the party built trust with the elves in Act 1, Caelynn stops her people from retaliating. If not, the alliance nearly shatters before it forms.',
        'Quiet moment: Thane Borik and Warchief Gorra share a drink at the Council of All. They do not speak each other\'s language. Borik slides a dwarven war medal across the table. Gorra places an orc battle tooth beside it. They nod. The alliance is not in the treaty. It is in that nod.',
        'The alliance forms: fragile, suspicious, held together by evidence and the party\'s reputation. Every species sends representatives.',
      ],
      estimatedSessions: 9,
    },
    {
      title: 'Act 3: The Warden',
      summary: 'Confronting the puppet master. The revelation of its purpose. The choice between unity and safety.',
      keyEvents: [
        'The united army marches to the Warden\'s stronghold. The largest combined force in history.',
        'The Warden appears: not a monster, not a tyrant. A weary construct doing the job it was made to do.',
        'The crack in reality: the Warden shows what happened last time mortals were united. The scar is still there.',
        'Quiet moment: the Warden asks the party a single question. "Are you better than they were?" The party must answer honestly. The Warden has watched for ten thousand years. It knows when people lie.',
        'The final choice: disband and stay safe, stay united and risk the world, or heal the crack and prove the Warden\'s mission is complete. If Borik and Gorra\'s trust holds, the healing ritual has enough participants. If the alliance fractured during the sabotage, they are short-handed.',
      ],
      estimatedSessions: 8,
    },
  ],
  keyNPCs: [
    {
      name: 'The Warden',
      role: 'the antagonist / the guardian',
      personality: 'A construct of immense power and deep weariness. It has spent ten thousand years engineering conflicts to prevent a greater catastrophe. It does not enjoy its work. It considers it a sacred duty. "I have made you hate each other for ten thousand years. I am sorry. The alternative was worse. It is still worse."',
      secret: 'It wants to be proven wrong. It wants the party to show that mortals can be trusted. It just does not believe they can.',
    },
    {
      name: 'High Arbiter Caelynn',
      role: 'elven representative / reluctant ally',
      personality: 'An elven diplomat who lost family in the elf-dwarf wars. Accepting that those wars were manufactured means accepting that her grief was engineered. She is furious. "If this is true, then my mother died for a lie. If it is true, I want the thing that wrote the lie."',
    },
    {
      name: 'Thane Borik Ironhand',
      role: 'dwarven representative / pragmatist',
      personality: 'A dwarven war-leader who fought in the last border skirmish. He does not trust elves. He trusts evidence. "Show me the proof. All of it. If the math adds up, I will march beside a dragon and an orc and an elf and I will not complain. Much."',
    },
    {
      name: 'Warchief Gorra',
      role: 'orc representative / the one with the most to gain',
      personality: 'An orc leader whose people have been cast as the continent\'s villains for centuries. If the wars were manufactured, the orcs were framed. She has waited her entire life for vindication. "We were not the monsters. We were the excuse. Every nation used us to justify their armies. Now they will know the truth."',
    },
  ],
  keyLocations: [
    {
      name: 'The Historian\'s Vault',
      description:
        'A vast underground archive containing ten thousand years of forged correspondence, manipulated treaties, and manufactured provocations. The dust is undisturbed. Nobody has been here in centuries. The truth was buried and forgotten.',
      significance: 'Where the conspiracy is discovered and the evidence is gathered.',
    },
    {
      name: 'The Council of All',
      description:
        'A hastily-constructed diplomatic camp where representatives of every species meet for the first time in millennia. Tense, historic, and one insult away from war. The cooking fires smell different. The languages blur together at night.',
      significance: 'Where the alliance is forged.',
    },
    {
      name: 'The Scar',
      description:
        'A wound in reality at the center of the continent, hidden by the Warden for ten thousand years. The air hums. The ground is warm. Light bends wrong. The evidence of what united mortals nearly did - and the thing they must now heal together.',
      significance: 'The proof that the Warden\'s fears are justified - and the thing that must be healed.',
    },
  ],
  dataSystems: [
    'massCombat',
    'factionWar',
    'diplomaticNegotiation',
    'cataclysmCountdown',
    'warRoomBriefing',
    'ancientProphecy',
    'npcRelationshipWeb',
    'encounterWaves',
    'legendaryWeapon',
  ],
};
