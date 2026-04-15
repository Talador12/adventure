import type { OneShotCampaign } from '../types';

export const theWrongSpellbook: OneShotCampaign = {
  id: 'oneshot-the-wrong-spellbook',
  type: 'oneshot',
  title: 'The Wrong Spellbook',
  tagline: 'The wizard grabbed a cookbook by mistake. "Cast Fireball" produces a souffle. "Shield" is a recipe for trifle.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Wizard Fenwick grabbed the wrong book this morning. His spellbook and his wife\'s enchanted cookbook look identical - leather-bound, gold-leafed, rune-inscribed. He did not notice until the party was already in the dungeon and he tried to cast Fireball. A perfectly golden souffle appeared instead. Every spell in the cookbook produces food when cast with arcane energy. Shield? Trifle. Magic Missile? Three meatballs. Detect Magic? A cheese plate that glows near magical objects. The food is excellent. The combat applications are limited. Or are they?',
  hook: 'The party enters a dungeon. The wizard says "I\'ll open with Fireball." He waves his hands. A souffle materializes, lands on the goblin\'s head, and explodes in a puff of egg and sugar. The goblin is confused. Everyone is confused. The wizard looks at his book. "This is... this is the COOKBOOK."',
  twist: 'The cookbook spells WORK, just not how anyone expects. The souffle Fireball deals bludgeoning damage (it is a heavy souffle). The meatball Magic Missiles home in on targets (meat missiles). The cheese plate Detect Magic actually detects magic (it glows). The wizard is not useless - he is an unconventional genius. By scene three, the party is weaponizing cuisine.',
  climax: 'The dungeon boss is immune to conventional magic. The wizard must defeat it using cookbook spells exclusively. The solution: cast the equivalent of Power Word Kill. In the cookbook, this is "The Perfect Seven-Course Meal." It does not kill the boss. It feeds the boss so thoroughly that it falls asleep from a food coma. The wizard\'s wife\'s cooking saves the day.',
  scenes: [
    {
      title: 'The Discovery',
      summary: 'The wizard discovers the wrong book and tries to function as a wizard using a cookbook. Initial disaster. Gradual adaptation.',
      challenge: 'combat',
      keyEvents: [
        '"Fireball!" A souffle lands on a goblin. The goblin is buried in pastry. Not dead. Very confused.',
        '"Magic Missile!" Three meatballs launch at high velocity. One hits a kobold in the face. 1d4+1 bludgeoning.',
        '"Shield!" A trifle appears in a protective dome shape. It blocks one arrow. Then collapses deliciously.',
        'The party stares. The wizard stares at his book. "The meatballs HOMED IN. This cookbook is ENCHANTED."',
      ],
    },
    {
      title: 'Weaponizing Cuisine',
      summary: 'The party figures out how to use the cookbook spells effectively. Food-based combat becomes the strategy. The dungeon monsters have never seen anything like this.',
      challenge: 'combat',
      keyEvents: [
        '"Detect Magic" produces a cheese plate. It glows when pointed at magical objects. Functional AND delicious.',
        '"Counterspell" - a pie to the face at the exact moment of casting. It interrupts concentration by sheer surprise.',
        '"Wall of Force" - a wall of jello. Transparent, bouncy, and surprisingly load-bearing.',
        'The party starts calling out orders: "Give me a missile appetizer and a shield dessert! We need covering trifle!"',
      ],
    },
    {
      title: 'The Seven-Course Finale',
      summary: 'The boss is immune to conventional magic. Only the cookbook can win. The wizard casts the most powerful recipe: a seven-course meal that incapacitates through satiation.',
      challenge: 'puzzle',
      keyEvents: [
        'The boss: a golem immune to spell damage. Normal magic bounces off. The party is stuck.',
        'The wizard flips to the back of the cookbook: "Grand Finale: The Perfect Seven-Course Meal."',
        'Each course is a spell: soup appetizer (slow), fish course (confusion via bones), main (grapple via gravity of meal), dessert (sleep)',
        'The golem eats every course (golems eat?). It does now. Food coma. It slumps. The wizard\'s wife is the real hero of this dungeon.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Wizard Fenwick', role: 'party member / accidental chef', personality: 'A wizard who is mortified about grabbing the wrong book and increasingly impressed by how well the cookbook works. Goes from "I am useless" to "I am a COMBAT CHEF" over the course of the session.' },
    { name: 'Fenwick\'s Wife (via Sending)', role: 'remote support / amused', personality: 'Sends periodic messages via Sending spell: "You took my cookbook." "Did the souffle work?" "Try page 47 for the golem." She is not worried. She enchanted that cookbook. She knew this would happen eventually.' },
  ],
  keyLocations: [
    { name: 'The Dungeon', description: 'A standard dungeon that was not designed for food-based combat. The monsters are unprepared for being hit with meatballs and buried in pastry.', significance: 'Every room is a test of cookbook-based problem solving.' },
    { name: 'The Boss Chamber', description: 'A large room with a magic-immune golem and, after the wizard is done, a seven-course meal spread across the floor.', significance: 'The climax. Where cuisine defeats what magic cannot.' },
  ],
  dataSystems: ['combatNarration', 'encounterWaves', 'dungeonRoom'],
};
