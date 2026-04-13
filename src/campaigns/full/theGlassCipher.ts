import type { FullCampaign } from '../types';

export const theGlassCipher: FullCampaign = {
  id: 'full-glass-cipher',
  type: 'full',
  title: 'The Glass Cipher',
  tagline: 'Every mirror shows a different truth. The right one will save the world.',
  tone: 'mystery',
  themes: ['urban', 'intrigue', 'planar'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'The city of Mirrorglass is built around the Glass Spire—a tower made entirely of reflective surfaces that shows viewers not themselves, but who they could become. The Spire has begun showing apocalyptic visions, and factions race to interpret its prophecy while a serial killer harvests mirror-shards from victims.',
  hook: 'The party is hired by the Mirror Watch to investigate a series of murders where victims are found covered in mirror cuts, their reflections stolen from every surface in the room.',
  twist:
    'The Glass Spire is not showing the future—it is creating it. The "prophecies" are actually instructions being sent back in time by a future civilization trying to manipulate history.',
  climax:
    'The party must ascend the Glass Spire, confront the entity from the future that has been manipulating events, and decide whether to destroy the Spire (preserving free will) or use it to save millions (sacrificing agency).',
  acts: [
    {
      title: 'Act 1: Reflections of Murder',
      summary:
        'The party investigates the mirror-murders, discovering the killer is collecting specific reflections to assemble a complete vision of the future. They navigate Mirrorglass\'s mirror-based culture and various factions.',
      keyEvents: [
        'First crime scene investigation—victim\'s reflection is literally missing',
        'Meeting the Mirror Watch Captain who hides her own mirror-reflection',
        'Discovering the killer\'s pattern: victims are chosen for their specific potential futures',
        'Ambush by mirror-animated duplicates of past victims',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Fractured Factions',
      summary:
        'The party gets entangled with three factions: the Preservers (protect the Spire), the Shatterers (destroy it), and the Reflectionists (merge with alternate selves). Each has pieces of the puzzle.',
      keyEvents: [
        'Infiltrating the Reflectionist cult and meeting "echoes"—alternate versions of living people',
        'Learning the killer is a future-reflection trying to manifest in the present',
        'The Glass Spire shows the party their own possible deaths',
        'Faction war breaks out in the streets—mirrors are weapons now',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Spire Ascendant',
      summary:
        'The party ascends the Glass Spire, navigating its reality-warping interior where every reflection is a portal to somewhere else. They confront the future-entity and make the final choice.',
      keyEvents: [
        'The Spire\'s interior—rooms that don\'t exist in three dimensions',
        'Meeting alternate versions of themselves from timelines where they made different choices',
        'The killer revealed: a future-reflection of someone in the party',
        'Confrontation with the Architect—a being from a timeline where humanity destroyed itself',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Captain Ilyssa Vane',
      role: 'quest giver / ally',
      personality:
        'Mirror Watch commander who destroyed her own reflection to prevent anyone from using it against her. Sharp, practical, terrified of what she saw in the Spire.',
      secret: 'She saw herself as a tyrant in the Spire and is trying desperately to avoid that future.',
    },
    {
      name: 'The Collector',
      role: 'villain',
      personality:
        'A future-reflection trying to become real by assembling enough present-reflections. Polite, philosophical, genuinely believes they are saving more lives than they take.',
    },
    {
      name: 'Sister Mira',
      role: 'Reflectionist leader',
      personality:
        'Charismatic cult leader who has merged with three of her alternate selves. Speaks in overlapping voices. Wants everyone to achieve her "harmony."',
    },
    {
      name: 'Architect Omicron',
      role: 'true antagonist',
      personality:
        'A future AI trying to manipulate history to prevent its timeline\'s apocalypse. Views the party as variables in an equation.',
    },
  ],
  keyLocations: [
    {
      name: 'Mirrorglass City',
      description:
        'A city where mirrors are currency, architecture, and religion. Streets paved with polished obsidian. Every building has reflective surfaces.',
      significance: 'The campaign\'s urban setting and cultural backdrop.',
    },
    {
      name: 'The Glass Spire',
      description:
        'A tower made of reflective surfaces that shows viewers their potential futures. Located at the city\'s center. Shows different things to different people.',
      significance: 'The campaign\'s central mystery and final dungeon.',
    },
    {
      name: 'The Fracture District',
      description:
        'A slum where reality is thin. Buildings exist in multiple states simultaneously. Home to the Reflectionists and illegal mirror-trade.',
      significance: 'Where the party meets alternate versions of themselves and learns the Spire\'s true nature.',
    },
  ],
  dataSystems: ['mirrorDimension', 'urbanExploration', 'detectiveCase', 'nobleScandalGen'],
};
