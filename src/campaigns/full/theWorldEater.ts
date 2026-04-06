import type { FullCampaign } from '../types';

export const theWorldEater: FullCampaign = {
  id: 'full-world-eater',
  type: 'full',
  title: 'The World Eater',
  tagline: 'The monster is the size of a continent. The plan is insane. You\'re in.',
  tone: 'epic',
  themes: ['epic', 'classic_fantasy', 'war'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 8, end: 20 },
  estimatedSessions: 22,
  settingSummary:
    'A continent-sized creature is approaching from the deep ocean — a World Eater, a being from before creation that consumes landmasses. It will reach shore in 60 days. Every army, every wizard, every hero is needed. The party must unite warring kingdoms, gather legendary weapons, and lead the defense of the continent. This is the apocalypse, and the party is humanity\'s best shot.',
  hook: 'A scrying vision shared by every mage on the continent simultaneously: a darkness the size of the horizon, moving, eating the ocean floor as it comes. Tidal waves precede it. Sea life flees. A voice from the deep: "I hunger." Sixty days until landfall.',
  twist:
    'The World Eater has been here before — it consumed the original continent, and the gods reshaped its corpse into the current landmass. The mountains are its bones. The oceans fill its footprints. The "legendary weapons" scattered across the world are actually its teeth, knocked out in the last battle. The continent itself is the World Eater\'s previous meal.',
  climax:
    'Landfall. A creature whose mouth is an ocean. The continent\'s united forces — dwarves, elves, humans, orcs, everyone — fight to slow it while the party enters its body to reach its heart. Inside, they find the heart is a prison containing the last World Eater — one that was defeated and consumed eons ago. Free the inner World Eater and let them fight each other, or destroy the heart and kill this one permanently (but collapse the continent in the process).',
  acts: [
    {
      title: 'Act 1: The Warning (Days 1-20)',
      summary: 'The threat is confirmed. The party must convince warring kingdoms to unite, gather resources, and begin the weapons quest.',
      keyEvents: [
        'The vision: shared by every mage, undeniable',
        'Diplomatic missions: convincing 5 kingdoms to stop fighting each other',
        'The first legendary weapon found: a spear made from a tooth the size of a tower',
        'Tidal waves hit the coast — refugees pour inland',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Preparation (Days 21-50)',
      summary: 'Gathering weapons, building defenses, and discovering the truth about the continent. Each weapon is guarded by a challenge worthy of legend.',
      keyEvents: [
        'Weapon quests: each tooth-weapon is in a different legendary location',
        'The scholar\'s revelation: the mountains are bones, the continent is a corpse',
        'Alliance building: every race contributes — dwarven siege engines, elven archers, orcish berserkers',
        'The World Eater visible on the horizon — the sky darkens',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: Landfall (Days 51-60)',
      summary: 'The World Eater arrives. The greatest battle in history. The party enters the creature.',
      keyEvents: [
        'Landfall: a mouth that swallows coastline, tentacles the size of mountain ranges',
        'The continent fights: united armies, legendary weapons, everything',
        'The party enters: through a wound, into a body the size of a country',
        'The heart: a prison containing the previous World Eater — the final choice',
      ],
      estimatedSessions: 8,
    },
  ],
  keyNPCs: [
    {
      name: 'Grand Marshal Kira',
      role: 'military coordinator',
      personality: 'The general chosen to lead the united defense. She has never lost a battle. She has also never fought something that could swallow her army whole. Rising to the occasion with terrified competence.',
      secret: 'She\'s dying of a wasting disease. She has about 60 days left. Perfect timing.',
    },
    {
      name: 'The Historian',
      role: 'lore keeper / revelation',
      personality: 'An ancient elf who has lived long enough to remember the stories of the FIRST World Eater. He has been warning people for centuries. Nobody listened. "I told them. I told EVERYONE."',
    },
    {
      name: 'The World Eater',
      role: 'the threat',
      personality: 'Not sentient in a way mortals understand. It experiences hunger at a cosmic scale. It does not hate. It does not scheme. It simply needs to eat. That\'s what makes it terrifying.',
    },
  ],
  keyLocations: [
    { name: 'The Coastal Wall', description: 'A hastily-built mega-fortification along the entire eastern coast. Every kingdom contributed stone and soldiers.', significance: 'The primary defense line.' },
    { name: 'The Weapon Vaults', description: 'Ancient sites across the continent where the World Eater\'s teeth were enshrined as holy relics.', significance: 'Where the legendary weapons are found.' },
    { name: 'Inside the World Eater', description: 'A biological landscape the size of a nation. Rivers of ichor, forests of cilia, and a beating heart containing a prison.', significance: 'The final dungeon.' },
  ],
  dataSystems: ['massCombat', 'siegeWarfare', 'warbandBuilder', 'cataclysmCountdown', 'encounterWaves', 'legendaryWeapon', 'diplomaticNegotiation', 'warRoomBriefing', 'factionWar'],
};
