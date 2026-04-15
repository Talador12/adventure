import type { FullCampaign } from '../types';

export const theWorldForge: FullCampaign = {
  id: 'full-the-world-forge',
  type: 'full',
  title: 'The World Forge',
  tagline: 'The machine that creates reality is breaking. Or is it being upgraded?',
  tone: 'epic',
  themes: ['epic', 'planar', 'dungeon_crawl'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 6, end: 20 },
  estimatedSessions: 20,
  settingSummary:
    'At the center of the world is the World Forge: a massive, ancient construct that generates the laws of reality. Gravity, time, magic, the speed of light - all are products of the Forge\'s continuous operation. It is breaking down. Gravity reverses in random zones. Time stutters, replaying moments or skipping hours. Fire freezes. Water burns. The party must descend through layers of reality to reach the Forge and repair it before the laws of nature fail entirely. The journey is a vertical dungeon crawl through the fabric of existence itself.',
  hook: 'A village wakes up to find gravity reversed for exactly eleven seconds. The next day, the same village experiences a time loop: the same hour plays three times. A week later, rain falls upward. A wizard\'s divination returns a single image: gears, miles wide, grinding, and one of them cracking. "Something at the bottom of everything is broken. If we do not fix it, there will not be a bottom, a top, or an anything."',
  twist:
    'The Forge is not breaking down. It is being upgraded. The original builders - entities called the Architects, who predate the current universe - have returned. They are installing a patch, rewriting reality\'s source code. The glitches are not failures. They are features being tested. The Architects do not consider the current version of reality worth preserving. Version 2.0 has different physics, different magic, and no room for the species that evolved under version 1.0. The party must decide: fight the upgrade, negotiate compatibility, or accept a new world.',
  climax:
    'The Forge chamber. The Architects are mid-upgrade. Reality is half-rewritten: the party stands in a space where two versions of physics coexist. The old world and the new overlap. The Architects are not hostile - they are engineers performing maintenance. They did not know the old version had inhabitants. The party must make the case for their world\'s existence, propose a compromise (a merge, a fork, a compatibility layer), or sabotage the upgrade and accept that the old Forge will eventually fail on its own.',
  acts: [
    {
      title: 'Act 1: The Glitches',
      summary: 'Reality is malfunctioning. The party investigates, discovers the Forge\'s existence, and begins the descent.',
      keyEvents: [
        'Gravity anomalies, time loops, and elemental reversals spread across the continent',
        'The wizard\'s divination: the Forge exists, it is deep, and it is failing. Or changing.',
        'The entrance: a cavern beneath the oldest mountain, where the stone becomes metal becomes something else',
        'The first layer: a realm where the laws of physics are exposed as mechanisms. Gravity is a gear. Light is a filament.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Descent',
      summary: 'Deeper through layers of reality\'s infrastructure. Each layer has different rules and guardians. The Architects\' presence grows stronger.',
      keyEvents: [
        'The time layer: the party experiences time as a spatial dimension. They can walk to yesterday.',
        'The magic layer: raw arcane energy flows like rivers. Spells behave differently here.',
        'First contact with an Architect: a being of pure geometry who examines the party like a user examining a file',
        'The upgrade in progress: new rules being installed alongside old ones. Reality stutters.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The Forge',
      summary: 'The center. The Architects. The upgrade. The argument for version 1.0.',
      keyEvents: [
        'The Forge: a construct the size of a small plane. Gears of solidified law. Pistons of compressed time.',
        'The Architects: not one, not many, but a collective intelligence debugging their creation',
        'The patch notes: version 2.0 is elegant, efficient, and uninhabitable for current life. A clean rewrite.',
        'The negotiation: preserve the old, accept the new, or merge them into something neither side planned',
      ],
      estimatedSessions: 7,
    },
  ],
  keyNPCs: [
    {
      name: 'Sage Orryn',
      role: 'the guide / theoretical physicist',
      personality: 'A gnome wizard who has spent forty years theorizing that reality has an engine. He was right. He is terrified. "I wanted to be wrong. I really wanted to be wrong. I wrote a paper about the Forge as a thought experiment. It is not a thought experiment."',
    },
    {
      name: 'The Architect (Fragment)',
      role: 'builder / alien intelligence',
      personality: 'A shard of the collective Architect consciousness, separated to communicate with the party. It thinks in blueprints and speaks in specifications. It does not understand "suffering" as a concept. "Your version has... legacy dependencies. We are cleaning them up."',
      secret: 'It is developing curiosity about mortal experience. The party is the first interesting thing it has encountered in the new version.',
    },
    {
      name: 'Axiom',
      role: 'Forge guardian / living law',
      personality: 'A construct born from the Forge itself - a personification of natural law. It maintains the current version and is being overwritten. It does not want to die. "I am gravity. I am the reason things fall. If they replace me, things will still fall. But it will not be me making them fall. Does that matter?"',
    },
  ],
  keyLocations: [
    { name: 'The Glitch Zones', description: 'Areas on the surface where reality\'s rules fail. Gravity inverts, time loops, fire freezes. Dangerous and disorienting.', significance: 'The visible symptoms that drive the investigation.' },
    { name: 'The Infrastructure', description: 'Layers beneath reality where natural laws are exposed as mechanisms. Gears of gravity, filaments of light, rivers of time.', significance: 'The primary exploration environment of the campaign.' },
    { name: 'The World Forge', description: 'The construct at the center of everything. Miles of machinery that generates and maintains the laws of physics. Currently half-dismantled for upgrades.', significance: 'The final destination and the site of the campaign\'s central choice.' },
  ],
  dataSystems: ['cataclysmCountdown', 'magicalAnomaly', 'ancientProphecy', 'encounterWaves', 'puzzleTrap', 'legendaryWeapon', 'dreamSequence', 'diplomaticNegotiation'],
};
