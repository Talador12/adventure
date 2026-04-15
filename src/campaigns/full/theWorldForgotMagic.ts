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
        'A dragon wakes up. The kingdom mobilizes an army of mundane soldiers. Captain Hask leads them. The party watches in horror knowing this cannot work.',
        'Casting magic in public: the party helps a sick child with Cure Wounds. The village reacts with fear and worship in equal measure. Some kneel. Some reach for weapons.',
        'Quiet moment: Elder Tova sits at her window drawing symbols she does not understand. She looks up at the party. "I dream of light that comes from hands. Am I insane?" She is the only crack in the Purge.',
        'An agent of the Vaulted Mind appears, disguised as a mundane traveler. They observe the party using magic and report back. The party feels watched.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Vaulted Mind',
      summary:
        'The party discovers the Vaulted Mind through investigation and encounters with their agents. The order is revealed: a secret magical society that periodically wipes magical knowledge from the public "for their own safety." They are powerful, organized, and they want the party silenced.',
      keyEvents: [
        'A Vaulted Mind agent offers the party a deal: forget magic voluntarily and live normal lives. They hand the party a vial. "Drink this. Everything becomes simple."',
        'Breaking into a Vaulted Mind safe house: finding records of previous Purges going back thousands of years. This has happened before. Twelve times.',
        'Sera Nightwell: an insider ally who disagrees with the Purge. She feeds the party information at enormous personal risk.',
        'The moment of cost: to reach the Purge mechanism, the party must sacrifice a magical ability permanently. The mechanism is warded against magic users who are not Vaulted Mind members. Giving up a part of what makes you special to save everyone else\'s magic.',
        'The order\'s argument, delivered by Sellus Vane himself: "Last time magic was public, a wizard burned a continent. The time before that, a cleric created a plague. We are not evil. We are careful."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Choice',
      summary:
        'The party breaches the vault. The Purge mechanism is before them. They can destroy it (magic returns to public knowledge forever), activate it on themselves (forget and join the forgetting), strengthen it (help the Vaulted Mind), or find a middle path. Meanwhile, the dragon has destroyed three cities and nobody can stop it.',
      keyEvents: [
        'The vault: a cavern beneath the oldest mountain, containing the enchantment that erases magical knowledge worldwide. It hums with three thousand years of accumulated intent.',
        'The dragon crisis: without magical defenses, a single ancient dragon has become an extinction-level threat. Captain Hask is still fighting. His soldiers are dying.',
        'Quiet moment: Sellus Vane sits across from the party. He is tired. He has been doing this for three thousand years. "I am asking you to trust that I know what happens when magic is free. I have seen it. Twelve times. I have watched civilizations burn."',
        'Sera sacrifices her position to get the party to the mechanism. She will never be able to return to the order.',
        'The choice: destroy (restore magic, accept the risks), strengthen (protect the world through enforced ignorance), or partial release (bring back limited magical education - the compromise nobody fully trusts). If the party built trust with Sellus Vane, partial release is possible. If not, it is all or nothing.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Archmage Sellus Vane',
      role: 'Vaulted Mind leader',
      personality:
        'Head of the Vaulted Mind. Not a villain in any traditional sense. A deeply tired immortal who has watched magic destroy civilizations and decided ignorance was safer than freedom. Speaks quietly. Never raises his voice. Every sentence carries three thousand years of context. He has performed twelve Purges. He sleeps poorly.',
      secret: 'He wants to be stopped. He is exhausted. But every time he considers letting magic return, he remembers what happened last time. The burden is crushing him and he cannot put it down. Arc: can be released from his burden if the party offers a genuine alternative. He does not need to be defeated. He needs to be relieved.',
    },
    {
      name: 'Sera Nightwell',
      role: 'insider ally',
      personality:
        'A junior Vaulted Mind member who disagrees with the Purge. Fierce, idealistic, and young enough to still believe in better solutions. Bites her lip when lying to her superiors. She feeds the party information at enormous personal risk.',
    },
    {
      name: 'Captain Hask Dunmore',
      role: 'mundane military / perspective',
      personality:
        'A career soldier tasked with fighting the dragon using swords and catapults. He knows it will not work. He goes anyway because that is what soldiers do. Salutes before walking into certain death. His bravery is staggering and his odds are zero. He represents everyone the Purge was supposed to protect.',
    },
    {
      name: 'Elder Tova',
      role: 'fragment of memory',
      personality:
        'An elderly woman who almost remembers. She has dreams about magic. She draws symbols she does not understand on every surface she can reach. She is a crack in the Purge - proof that memory cannot be completely erased. "I dream of light that comes from hands. Am I insane?" She is not.',
    },
  ],
  keyLocations: [
    {
      name: 'The Confused Mages Guild',
      description:
        'A grand building full of scholars who cannot read their own library. They have reclassified spellbooks as "decorative calligraphy" and potion ingredients as "exotic spices." One scholar clutches a wand and does not know why he will not let go of it.',
      significance: 'Where the forgetting is most visible and most absurd.',
    },
    {
      name: 'The Vaulted Mind Citadel',
      description:
        'Hidden beneath the world\'s oldest mountain. A fortress of preserved magical knowledge, staffed by people who remember everything the world forgot. Libraries, workshops, and the Purge mechanism at its heart.',
      significance: 'The secret heart of the campaign. Where the order operates and the mechanism lives.',
    },
    {
      name: 'The Dragon Scorch',
      description:
        'Three cities reduced to ash by a single ancient dragon that nobody knows how to fight. Smoke columns visible for hundreds of miles. Refugees in the thousands. The dragon is not evil. It is confused. It remembers when people could fight back.',
      significance: 'The consequence of the Purge made physical. The cost of forgetting.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'npcGenerator',
    'plotTwistEngine',
    'politicalIntrigue',
    'urbanEncounter',
    'moralDilemma',
  ],
};
