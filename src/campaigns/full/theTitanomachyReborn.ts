import type { FullCampaign } from '../types';

export const theTitanomachyReborn: FullCampaign = {
  id: 'full-titanomachy-reborn',
  type: 'full',
  title: 'The Titanomachy Reborn',
  tagline: 'The war between gods and titans ended eons ago. Someone is reopening old wounds.',
  tone: 'epic',
  themes: ['war', 'planar', 'epic'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 8, end: 18 },
  estimatedSessions: 20,
  settingSummary:
    'The ancient war where gods overthrew the primordial titans is history. But now titan-forged weapons are appearing in mortal hands, divine champions are being assassinated, and ancient seals are cracking. Someone is trying to restart the Titanomachy—and this time, the gods might lose.',
  hook: 'The party witnesses a divine champion murdered by mortals wielding titan-forged weapons. Before dying, the champion begs them to warn the gods that "the chains are singing."',
  twist:
    'The instigator is a god—specifically, a minor deity who believes the current pantheon has grown corrupt and lazy. They are orchestrating a controlled titan release to force the gods to prove their worth or be replaced.',
  climax:
    'The party must enter the Titan Prison, confront the released titans, and decide whether to help the gods re-imprison them, allow the titans to establish a new order, or find a third path that ends the cycle of divine violence.',
  acts: [
    {
      title: 'Act 1: The Singing Chains',
      summary:
        'The party investigates the appearance of titan-forged weapons and cracking seals. They discover a conspiracy involving multiple factions who want the gods brought low.',
      keyEvents: [
        'Investigating the murdered champion\'s temple',
        'Tracking titan-forged weapons to a secret forge',
        'Discovering the seals are being deliberately weakened from both sides',
        'First encounter with a minor titan released as a "test"',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: Divine Games',
      summary:
        'The party enters divine politics, meeting gods who are variously terrified, defiant, or complicit. They learn the conspiracy\'s true scope and identify the rogue deity behind it.',
      keyEvents: [
        'Audience with the God of War, who sees opportunity in the chaos',
        'Meeting the Goddess of Wisdom, who suspects an inside job',
        'Discovering the rogue deity\'s manifesto—"Divine Rot Must Be Purged"',
        'The first major titan breaks free, devastating a divine realm',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 3: The New Titanomachy',
      summary:
        'With titans and gods at war, the party enters the Titan Prison to either restore the seals or break them entirely. They hold the balance of power between primordial chaos and divine order.',
      keyEvents: [
        'Navigating the Titan Prison—a realm built to contain beings of infinite scale',
        'Confronting the rogue deity in their fortress',
        'Meeting the Titan King, who offers a different kind of order',
        'Final choice: restore the old order, establish a new one, or end divine rule entirely',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Prometheus the Unbound',
      role: 'titan ally / philosopher',
      personality:
        'A titan who sided with mortals in the first Titanomachy and was imprisoned for it. Wise, patient, believes in mortals\' potential to transcend divine games.',
    },
    {
      name: 'Lady Ambition',
      role: 'rogue deity',
      personality:
        'Minor goddess of aspiration who believes the pantheon has failed. Genuinely thinks releasing titans will force beneficial change.',
      secret: 'She was once mortal and ascended—she remembers what it is like to be powerless.',
    },
    {
      name: 'Chronos the Infinite',
      role: 'titan threat',
      personality:
        'Personification of time itself, imprisoned to prevent the past from overwhelming the present. Not evil—just beyond mortal comprehension.',
    },
    {
      name: 'Archon Seraphiel',
      role: 'divine enforcer',
      personality:
        'Angel who represents the established order. Sees any challenge to divine authority as heresy. Difficult ally.',
    },
  ],
  keyLocations: [
    {
      name: 'The Sealed Realms',
      description:
        'Divine territories where reality itself is cracking as titan influence seeps through.',
      significance: 'Where the party sees the effects of weakening seals.',
    },
    {
      name: 'The Secret Forge',
      description:
        'Where titan-forged weapons are being recreated. Built on a site of ancient titan bloodshed.',
      significance: 'Key location for understanding the conspiracy.',
    },
    {
      name: 'The Titan Prison',
      description:
        'A realm outside normal reality where beings of infinite scale are compressed to finite forms.',
      significance: 'Final location and setting for the climactic choices.',
    },
  ],
  dataSystems: ['legendaryWeapon', 'planarInvasion', 'massCombat', 'divineIntervention'],
};
