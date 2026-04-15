import type { FullCampaign } from '../types';

export const theHollowKing: FullCampaign = {
  id: 'full-hollow-king',
  type: 'full',
  title: 'The Hollow King',
  tagline: 'The king is a puppet. The strings lead into the Shadowfell. Someone is pulling them.',
  tone: 'mystery',
  themes: ['intrigue', 'dark_fantasy', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'King Aldric of Valdheim has been acting strange for months — signing bizarre laws, dismissing trusted advisors, and staring at shadows. The party is hired to investigate by the queen, who suspects enchantment. What they discover is worse: the king is literally hollow. His body is a shell being worn by a shadow creature from the Shadowfell, and the real king\'s soul is trapped in a mirror realm.',
  hook: 'The queen summons the party in secret. "My husband is not my husband. I know how that sounds. But last night, I saw his shadow move when he didn\'t." She offers the party unrestricted access to the castle to investigate — discreetly.',
  twist:
    'The shadow creature wearing the king isn\'t doing this voluntarily. It\'s a shadar-kai noble who was cursed to replace a mortal ruler by the Raven Queen — a punishment for defying her. The shadar-kai hates being trapped in a mortal body, hates the mortal world, and is actually trying to find a way to reverse the swap. The party and the "villain" want the same thing.',
  climax:
    'To free both the king and the shadar-kai, the party must enter the mirror realm in the Shadowfell, find the king\'s soul, and perform a swap back. But the Raven Queen doesn\'t want her punishment undone, and she sends her enforcers to stop them.',
  acts: [
    {
      title: 'Act 1: The Investigation',
      summary:
        'The party investigates the king\'s behavior, discovers the shadow possession, and makes first contact with the entity wearing the king\'s body.',
      keyEvents: [
        'Castle investigation — the king\'s shadow behaves independently',
        'Testing the king: holy water, detect magic, zone of truth — the entity panics',
        'First contact: the shadar-kai speaks through the king\'s shadow, begging for help',
        'Discovery of the mirror realm — a Shadowfell reflection of the castle',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Mirror Realm',
      summary:
        'The party enters the Shadowfell\'s mirror version of the kingdom to find the real king. Everything is inverted: light is dark, allies are enemies, and the king doesn\'t want to be found.',
      keyEvents: [
        'Entry into the mirror realm — the Shadowfell version of Valdheim',
        'Mirror versions of people the party knows — twisted, hostile',
        'Finding King Aldric\'s soul — he\'s built a fortress out of memories and refuses to leave',
        'The Raven Queen\'s enforcers arrive — time to move',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Swap',
      summary:
        'Performing the reverse swap while the Raven Queen\'s forces try to prevent it. The shadar-kai, the king, and the party must all cooperate in a ritual that requires trust between mortal enemies.',
      keyEvents: [
        'Convincing King Aldric to leave his memory fortress',
        'The swap ritual — requires the shadar-kai and the king to both be willing',
        'The Raven Queen sends her champion — combat during a delicate ritual',
        'The swap completes — but the Raven Queen demands a price for defiance',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Queen Evaine',
      role: 'quest giver / ally',
      personality:
        'Speaks quietly so the walls cannot hear. Keeps one hand on a hidden dagger at all times. Smiles in public to maintain the appearance of normalcy, and the smile never reaches her eyes. "I have been sleeping next to something that wears my husband\'s face for six months. Do not tell me to be patient."',
    },
    {
      name: 'Nyx (the shadar-kai)',
      role: 'sympathetic antagonist / reluctant ally',
      personality:
        'A shadar-kai noble trapped in a mortal body as punishment. Haughty, bitter, uncomfortable in flesh. Insults everything about mortal life but is quietly terrified of being stuck forever.',
      secret: 'She defied the Raven Queen to save a mortal child. Her "crime" was compassion.',
    },
    {
      name: 'King Aldric (soul)',
      role: 'rescue target',
      personality:
        'A good king whose soul is trapped in the Shadowfell. He\'s built a fortress from his happiest memories and doesn\'t want to leave because leaving means facing that he was replaced.',
    },
    {
      name: 'The Raven Queen\'s Champion',
      role: 'enforcer / final boss',
      personality:
        'A death knight bound to enforce the Raven Queen\'s will. Not cruel — dutiful. Will fight the party but respects their cause. "I understand. But she has spoken."',
    },
  ],
  keyLocations: [
    {
      name: 'Castle Valdheim',
      description:
        'A grand castle where something is very wrong. Shadows are too long, mirrors show the wrong reflections, and the king\'s throne room is always cold.',
      significance: 'Investigation location and gateway to the mirror realm.',
    },
    {
      name: 'The Mirror Realm',
      description:
        'A Shadowfell reflection of the kingdom — everything inverted. Day is night, friends are enemies, and the sky is a dark mirror showing the mortal world above.',
      significance: 'Where King Aldric\'s soul is trapped.',
    },
    {
      name: 'The Memory Fortress',
      description:
        'A castle built from Aldric\'s happiest memories — his wedding, his children\'s births, his coronation. Beautiful and deeply sad.',
      significance: 'Where the king\'s soul hides and must be convinced to leave.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'mirrorDimension',
    'npcRelationshipWeb',
    'hauntedLocation',
    'dreamSequence',
    'darkBargain',
    'courtIntrigue',
    'encounterWaves',
    'puzzleLock',
  ],
};
