import type { FullCampaign } from '../types';

export const theWorldForgotMagic: FullCampaign = {
  id: 'full-the-world-forgot-magic',
  type: 'full',
  title: 'The World Forgot Magic',
  tagline: 'Magic is not gone. Nobody remembers it exists. Wizards look at their spellbooks and see gibberish.',
  tone: 'serious',
  themes: ['classic_fantasy', 'political', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 16,
  settingSummary:
    'Overnight, the world forgot magic. Not gone - forgotten. Wizards wake up confused by the strange books on their shelves. Clerics pray to gods they do not remember having. Potions are "weird old drinks in the pantry." Dragons are "impossibly large fire-breathing lizards" and everyone is terrified because nobody remembers how to fight one. Magic items are curiosities. Enchanted swords are "strangely sharp antiques." The entire magical infrastructure of civilization - wards, teleportation, healing, communication - has collapsed because nobody knows it exists. The party are the only ones who remember.',
  hook:
    'The party wakes up and the wizard cannot read their spellbook. Except - they can. It is everyone else who cannot. The innkeeper stares at their glowing staff and asks "what is that lantern?" A guard sees a party member cast Prestidigitation and screams "WITCH!" The party quickly realizes: they remember magic. Nobody else does. The Mages Guild is a confused book club. The Temple is a social hall. And a dragon just woke up on the eastern ridge and nobody has any idea what to do about it.',
  twist:
    'Magic was not forgotten. It was classified. A secret order called the Vaulted Mind decided centuries ago that magic was too dangerous for public knowledge. Every few generations, they perform a mass memory wipe called the Purge, erasing all magical knowledge from the general population. The order still uses magic freely. They are the secret government behind every government. The party remembers because they were in a warded zone when the Purge hit. The Vaulted Mind considers them a security breach and has dispatched agents to "correct" them.',
  climax:
    'The party confronts the Vaulted Mind leadership. Their argument is not insane: unrestricted magic nearly destroyed the world multiple times. The Purge prevents magical arms races, keeps power distributed, and protects ordinary people from arcane catastrophe. But it also means no magical healing, no wards against fiends, and entire populations defenseless against magical threats. The choice: help restore magical knowledge (risking the disasters the Vaulted Mind prevents), join the order (become part of the secret), or destroy the Purge mechanism entirely (permanent change, unknown consequences).',
  acts: [
    {
      title: 'Act 1: The Forgetting',
      summary:
        'The party discovers they are the only people who remember magic. Society has instantly collapsed into medieval low-fantasy. Dragons are unexplained terrors. Healers have no spells. The party must navigate a world that is suddenly afraid of everything magical while investigating what happened.',
      keyEvents: [
        'The wizard spellbook: readable to them, gibberish to everyone else. The first sign that something targeted memory, not magic.',
        'A dragon wakes up. The kingdom mobilizes an army of mundane soldiers. The party watches in horror knowing this cannot work.',
        'Casting magic in public: the party helps a sick child with Cure Wounds. The village reacts with fear and worship in equal measure.',
        'The Mages Guild: a building full of confused scholars staring at "incomprehensible old texts." One of them says: "I feel like I should understand this."',
        'An agent of the Vaulted Mind appears, disguised as a mundane traveler. They observe the party using magic and report back.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Vaulted Mind',
      summary:
        'The party discovers the Vaulted Mind through investigation and encounters with their agents. The order is revealed: a secret magical society that periodically wipes magical knowledge from the public "for their own safety." They are powerful, organized, and they want the party silenced.',
      keyEvents: [
        'A Vaulted Mind agent offers the party a deal: forget magic voluntarily and live normal lives. They decline.',
        'Breaking into a Vaulted Mind safe house: finding records of previous Purges going back thousands of years. This has happened before.',
        'An ally inside the order: a junior member who disagrees with the Purge and feeds the party information',
        'The Purge mechanism: a massive enchantment stored in a vault beneath the world oldest mountain. It can be activated or deactivated.',
        'The order argument: "Last time magic was public, a wizard burned a continent. The time before that, a cleric created a plague. We are not evil. We are careful."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Choice',
      summary:
        'The party breaches the vault. The Purge mechanism is before them. They can destroy it (magic returns to public knowledge forever), activate it on themselves (forget and join the forgetting), strengthen it (help the Vaulted Mind), or find a middle path. Meanwhile, the dragon has destroyed three cities and nobody can stop it.',
      keyEvents: [
        'The vault: a cavern beneath the oldest mountain, containing the enchantment that erases magical knowledge worldwide',
        'The dragon crisis: without magical defenses, a single ancient dragon has become an extinction-level threat',
        'The Vaulted Mind makes their final case: "Every time magic is public, thousands die. We save more lives than you can count. The cost is ignorance."',
        'The party ally from inside the order sacrifices their position to get the party to the mechanism',
        'The choice: destroy (restore magic, accept the risks), strengthen (protect the world through enforced ignorance), or partial release (bring back limited magical education - the compromise nobody fully trusts)',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Archmage Sellus Vane',
      role: 'Vaulted Mind leader',
      personality:
        'Head of the Vaulted Mind. Not a villain in any traditional sense. A deeply tired immortal who has watched magic destroy civilizations and decided ignorance was safer than freedom. He has performed twelve Purges over three thousand years. He sleeps poorly.',
      secret: 'He wants to be stopped. He is exhausted. But every time he considers letting magic return, he remembers what happened last time. The burden is crushing him and he cannot put it down.',
    },
    {
      name: 'Sera Nightwell',
      role: 'insider ally',
      personality:
        'A junior Vaulted Mind member who disagrees with the Purge. She believes magical education (not erasure) is the answer. She feeds the party information at enormous personal risk. Fierce, idealistic, and young enough to still believe in better solutions.',
    },
    {
      name: 'Captain Hask Dunmore',
      role: 'mundane military / perspective',
      personality:
        'A career soldier tasked with fighting the dragon using swords and catapults. He knows it will not work. He goes anyway because that is what soldiers do. His bravery is staggering and his odds are zero. He represents everyone the Purge was supposed to protect.',
    },
    {
      name: 'Elder Tova',
      role: 'fragment of memory',
      personality:
        'An elderly woman who almost remembers. She has dreams about magic. She draws symbols she does not understand. She is a crack in the Purge - proof that memory cannot be completely erased. "I dream of light that comes from hands. Am I insane?"',
    },
  ],
  keyLocations: [
    {
      name: 'The Confused Mages Guild',
      description: 'A grand building full of scholars who cannot read their own library. They have reclassified spellbooks as "decorative calligraphy" and potion ingredients as "exotic spices." The irony is crushing.',
      significance: 'Where the forgetting is most visible and most absurd.',
    },
    {
      name: 'The Vaulted Mind Citadel',
      description: 'Hidden beneath the world oldest mountain. A fortress of preserved magical knowledge, staffed by people who remember everything the world forgot. Libraries, workshops, and the Purge mechanism.',
      significance: 'The secret heart of the campaign. Where the order operates and the mechanism lives.',
    },
    {
      name: 'The Dragon Scorch',
      description: 'Three cities reduced to ash by a single ancient dragon that nobody knows how to fight. Smoke columns visible for hundreds of miles. Refugees in the thousands.',
      significance: 'The consequence of the Purge made physical. The cost of forgetting.',
    },
  ],
  dataSystems: ['combatNarration', 'npcGenerator', 'plotTwistEngine', 'politicalIntrigue', 'urbanEncounter'],
};
