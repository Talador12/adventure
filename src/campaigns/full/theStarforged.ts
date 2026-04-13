import type { FullCampaign } from '../types';

export const theStarforged: FullCampaign = {
  id: 'full-starforged',
  type: 'full',
  title: 'The Starforged',
  tagline: 'Weapons made from fallen stars. Each one carries a fragment of the heavens—and a curse.',
  tone: 'epic',
  themes: ['classic_fantasy', 'dungeon_crawl', 'war'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 6, end: 16 },
  estimatedSessions: 18,
  settingSummary:
    'Meteorite metal called Starsteel can be forged into weapons of immense power, but each carries a fragment of celestial consciousness. A millennium ago, seven Starforged blades were created to seal a demon prince. Now the seal is breaking, and the blades have scattered. The party must find them before the demon returns.',
  hook: 'The party\'s village is destroyed by a cult seeking a local heirloom—a rusted sword that turns out to be one of the Starforged blades. They must learn the blade\'s history and seek the other six.',
  twist:
    'The demon prince was actually a fallen angel who was unjustly imprisoned. The Starforged blades are not just keys to his prison—they are his scattered consciousness. Reassembling them will either destroy him or restore him.',
  climax:
    'At the prison site, the party must choose: destroy the blades (killing the angel permanently), free him (risking divine wrath), or become the new seal by sacrificing their own souls to replace the blades.',
  acts: [
    {
      title: 'Act 1: The Scattered Blades',
      summary:
        'The party hunts for the seven Starforged blades across the world. Each is in a different location—some in noble collections, some lost in dungeons, one wielded by a warlord.',
      keyEvents: [
        'Discovery that their heirloom blade is Starforged and contains a consciousness fragment',
        'Journey to find the Sword of Dawn in a sunken temple',
        'Negotiating or fighting for the Blade of Storms from a barbarian king',
        'Realization that the blades are communicating with each other across distance',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Demon\'s Truth',
      summary:
        'As the party collects blades, they learn the true history of the imprisoned being. They must decide whether to continue their mission or find another solution.',
      keyEvents: [
        'Finding the archives of the ancient forgers who created the blades',
        'Learning the imprisoned being was an angel who tried to help mortals against divine law',
        'The blades\' consciousness fragments begin speaking to the party, telling different versions of the story',
        'Cult attacks intensify—they want to free the angel, but for selfish reasons',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Prison of Stars',
      summary:
        'With all seven blades, the party travels to the celestial prison. They confront the imprisoned being and make the final choice about its fate—and theirs.',
      keyEvents: [
        'Journey to the prison, a fortress built on a fragment of the moon',
        'The imprisoned angel speaks directly, pleading his case',
      'Divine messengers arrive to ensure the seal remains intact',
        'Final choice and confrontation—destroy, free, or replace the seal',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Caelum',
      role: 'imprisoned angel',
      personality:
        'Once a servant of the gods who chose to help mortans at the cost of his grace. Bitter but still compassionate. Speaks through the sword fragments.',
    },
    {
      name: 'Sword of Dawn',
      role: 'speaking weapon',
      personality:
        'The first and most powerful Starforged blade. Noble, proud, convinced Caelum is dangerous and must remain imprisoned.',
    },
    {
      name: 'Archon Seraphiel',
      role: 'divine enforcer',
      personality:
        'Heavenly being sent to ensure the seal remains. Not evil, but absolutely committed to cosmic order above mortal concerns.',
    },
    {
      name: 'Cult Leader Malphas',
      role: 'antagonist',
      personality:
        'Wants to free Caelum not out of justice but to gain his power. Willing to sacrifice thousands to achieve his goal.',
      secret: 'He already absorbed a fragment of Caelum\'s power years ago. If Caelum is freed, Malphas dies - he is gambling on draining the angel completely before that happens.',
    },
  ],
  keyLocations: [
    {
      name: 'The Sunken Temple',
      description:
        'An underwater ruin where the Sword of Dawn was lost centuries ago. Protected by aquatic guardians.',
      significance: 'First major blade retrieval mission.',
    },
    {
      name: 'The Anvil of Heaven',
      description:
        'The ancient forge where Starsteel was first worked. Contains records of the blades\' creation.',
      significance: 'Where the party learns the truth about Caelum.',
    },
    {
      name: 'The Lunar Prison',
      description:
        'A fortress on a fragment of the moon, accessible only when specific stars align. Contains Caelum\'s physical form.',
      significance: 'Final location and site of the climactic choice.',
    },
  ],
  dataSystems: ['legendaryWeapon', 'sentientItem', 'divineQuestGiver', 'astralEncounter'],
};
