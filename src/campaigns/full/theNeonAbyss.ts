import type { FullCampaign } from '../types';

export const theNeonAbyss: FullCampaign = {
  id: 'full-neon-abyss',
  type: 'full',
  title: 'The Neon Abyss',
  tagline: 'Someone is murdering people with spells that do not exist yet.',
  tone: 'mystery',
  themes: ['mystery', 'urban', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Luxarra runs on industrialized magic. Spell-factories produce bottled cantrips for consumer sale. Divination powers the surveillance network. Necromancy provides the labor force - undead workers staff the factories, the docks, the sewers. No unions. No rights. No complaints. The city glows neon with arcane signage, rain slicks the cobblestones, and everyone has a secret. The party works as private investigators in a city where magic has made crime both easier and stranger.',
  hook:
    'Three bodies in three weeks. Each killed by a spell that no diviner, artificer, or arcane scholar can identify. The wounds do not match any known school of magic. The Arcane Registry has no record. The Watch has no leads. A wealthy widow whose husband was victim number two hires the party. "Find who did this. The Watch says these spells are impossible. I do not care about possible. I care about my husband."',
  twist:
    'The spells DO exist. They are from the future. Someone has figured out how to reach forward in time and pull back spells that have not been invented yet. The murders are side effects - temporal bleed from spells forced into a timeline that is not ready for them. The killer is not choosing victims. The victims are people who happen to be standing where the temporal rift opens.',
  climax:
    'The party traces the temporal theft to a brilliant chronomancer who is dying. She has been pulling future spells because one of them is the cure for her disease - a spell not yet invented. The murders were accidents. The moral question: do you stop someone from saving their own life because the method killed others? The final confrontation is a conversation, not a fight. Unless the party makes it one.',
  acts: [
    {
      title: 'Act 1: Impossible Crimes',
      summary:
        'The party investigates the murders. Each crime scene is stranger than the last. The spells leave residues that do not match any known magic. The city\'s power structures resist investigation - the spell-factories do not want scrutiny.',
      keyEvents: [
        'Crime scene one: a man dissolved from the inside out by a spell with no arcane signature',
        'The Arcane Registry: a vast bureaucracy that catalogues every known spell. These are not in it.',
        'The spell-factories: touring an industrialized magic facility where bottled cantrips roll off assembly lines',
        'A pattern: all murders happen at the same time of day, at locations that form a spiral on the city map',
        'A witness: a street kid who saw "light that looked wrong, like it was from somewhere else"',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Temporal Bleed',
      summary:
        'The party discovers the temporal component. The spells are from the future. Someone is pulling them through, and the process is unstable. Each theft weakens the boundary between now and later. The murders are accelerating.',
      keyEvents: [
        'Consulting a chronomancer who recognizes the temporal signature and is deeply alarmed',
        'A rift opens: the party witnesses a spell manifest from nowhere and destroy a market stall. No caster visible.',
        'The undead labor question: necromantic workers are being affected by temporal bleed, remembering futures they have not lived',
        'Tracking the rifts to a location: an abandoned spell-factory in the Undercity',
        'The Arcane Council wants this buried. The factories do not want the public knowing magic can be stolen from the future.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Chronomancer',
      summary:
        'The party finds the chronomancer responsible and faces the hardest question of the campaign. She is dying. The cure exists in the future. She has been pulling it toward her, spell by spell. The murders were not intentional. The party must decide what justice means.',
      keyEvents: [
        'Finding the chronomancer\'s lab: a room where time visibly fractures, clocks run in all directions',
        'Her story: Veyra, a brilliant mage with a degenerative arcane disease. Months to live.',
        'The moral dilemma: she has killed five people by accident trying to save herself. Does intention matter?',
        'The temporal damage: if she pulls one more spell, the rift becomes permanent. Future and present bleed together.',
        'The resolution: arrest her, help her, find another way, or let the timeline decide. No clean answers.',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Veyra Castellane',
      role: 'the chronomancer / tragic antagonist',
      personality:
        'Physically frail — leans on a staff, hands tremble, coughs into a handkerchief she quickly hides. Magically extraordinary — when she casts, the air around her tastes like lightning. Speaks precisely, as if every word costs her something. "I chose myself over strangers. I would do it again. I hate that I would do it again. Does that make me better or worse than someone who would not hesitate?"',
      secret: 'She has already found the cure spell. She is afraid to use it because the last pull might kill someone she can see.',
    },
    {
      name: 'Lady Seraphine Voss',
      role: 'client / widow',
      personality:
        'A wealthy socialite whose grief has calcified into fury. She wants answers, then justice, then revenge - in that order. Generous with coin. Unforgiving with results.',
    },
    {
      name: 'Archivist Denn',
      role: 'ally / Arcane Registry',
      personality:
        'A tiefling archivist who catalogues every spell in existence and knows when something does not belong. Methodical, dry-witted, and the only bureaucrat in Luxarra who actually cares about truth.',
    },
    {
      name: 'Captain Holtz',
      role: 'City Watch / obstructionist',
      personality:
        'The Watch captain assigned to the case who has been told to close it quietly. Not corrupt - just leaned on by the Arcane Council. Grateful when the party finds real answers. Useless until then.',
    },
  ],
  keyLocations: [
    {
      name: 'Luxarra',
      description:
        'A rain-soaked city lit by arcane neon. Spell-factories belch colored smoke. Undead workers shuffle through the streets. Everyone is selling something.',
      significance: 'The setting. A city where magic is industry and industry is power.',
    },
    {
      name: 'The Arcane Registry',
      description:
        'A monolithic building where every known spell is catalogued, cross-referenced, and filed. Dusty, vast, and staffed by people who have strong opinions about indexing.',
      significance: 'Where the party confirms the spells do not exist - yet.',
    },
    {
      name: 'Veyra\'s Laboratory',
      description:
        'An abandoned spell-factory basement where time is visibly broken. Clocks melt. Shadows move wrong. The air tastes like tomorrow.',
      significance: 'Where the chronomancer works and the final confrontation takes place.',
    },
  ],
  dataSystems: ['npcPersonality', 'socialEncounter', 'mysteryClue', 'urbanEncounter', 'magicalEcosystem'],
};
