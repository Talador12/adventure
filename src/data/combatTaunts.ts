// Combat taunts — flavor text enemies shout during combat.
// Indexed by enemy type/theme for variety.

export const ENEMY_TAUNTS: Record<string, string[]> = {
  default: [
    '"You will fall!"',
    '"Is that the best you can do?"',
    '"Your bones will decorate my lair!"',
    '"Run while you still can, mortals!"',
    '"I\'ve eaten tougher adventurers for breakfast!"',
  ],
  undead: [
    '"Join us... in death..."',
    '"The grave awaits you..."',
    '"You cannot kill what is already dead!"',
    '"Your warmth... I hunger for it..."',
  ],
  beast: [
    '*snarls and circles menacingly*',
    '*lets out a bone-chilling howl*',
    '*bares its fangs and charges*',
    '*the creature\'s eyes gleam with predatory intelligence*',
  ],
  humanoid: [
    '"Surrender your gold and you might live!"',
    '"Wrong turn, adventurer."',
    '"The boss will reward us well for your heads!"',
    '"Get them! Don\'t let them escape!"',
  ],
  dragon: [
    '"Foolish mortals, you dare challenge ME?"',
    '"Kneel before my magnificence!"',
    '"Your trinkets and baubles amuse me. Die now."',
    '"I have burned kingdoms. You are nothing."',
  ],
};

// Player intimidation responses
export const INTIMIDATION_RESPONSES = {
  success: [
    'The enemy visibly falters, fear creeping into their eyes.',
    'A tremor runs through the enemy ranks. They hesitate.',
    'The creature takes a step back, intimidated by your presence.',
  ],
  failure: [
    'The enemy laughs at your attempt. "Is that supposed to scare me?"',
    'Your words fall flat. The enemy seems unimpressed.',
    'The creature snarls, seemingly angered rather than frightened.',
  ],
};

export function getEnemyTaunt(enemyName: string): string {
  const lower = enemyName.toLowerCase();
  let category = 'default';
  if (lower.match(/skeleton|zombie|ghoul|wight|wraith|specter|vampire|lich/)) category = 'undead';
  else if (lower.match(/wolf|bear|spider|rat|snake|beast|dire/)) category = 'beast';
  else if (lower.match(/dragon|drake|wyvern/)) category = 'dragon';
  else if (lower.match(/goblin|orc|bandit|thug|cultist|guard|knight|hobgoblin/)) category = 'humanoid';
  const taunts = ENEMY_TAUNTS[category] || ENEMY_TAUNTS.default;
  return taunts[Math.floor(Math.random() * taunts.length)];
}
