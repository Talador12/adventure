import type { OneShotCampaign } from '../types';

export const theBrewmastersTrial: OneShotCampaign = {
  id: 'oneshot-brewmasters-trial',
  type: 'oneshot',
  title: 'The Brewmaster\'s Trial',
  tagline: 'The dwarves brew beer that can kill a god. Today, you\'re the taste testers.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The dwarven city of Kegholm holds an annual brewing competition where the greatest brewmasters create the most potent magical ales. The party has been hired as the official taste-testing team. Each brew has magical effects (some beneficial, some catastrophic). The competition takes place in a massive underground brewery-dungeon where ingredients are gathered in real time, and rival brewmasters will sabotage each other.',
  hook: 'The Brewmaster\'s Guild invites the party as "impartial judges." The pay is excellent. The catch: each ale they taste has a magical effect that lasts 1d4 hours. Last year\'s judges grew tentacles, spoke only in rhyme for a week, and one became a goat. "But the beer was EXCELLENT."',
  twist:
    'The grand prize isn\'t a trophy — it\'s the recipe for Godsbrew, a legendary ale that can temporarily grant divine power. The competition is actually a test to find worthy guardians of the recipe. The judges who survive the tastings prove they can handle divine-tier enchantment. The real prize is being offered the recipe — and the responsibility that comes with it.',
  climax:
    'The final round: three brewmasters present their entries. Each ale is more powerful and more dangerous than the last. The party must taste all three, survive the combined magical effects, and choose a winner — while a rival faction raids the competition to steal the Godsbrew recipe.',
  scenes: [
    {
      title: 'Scene 1: The Gathering',
      summary:
        'Arrival at Kegholm, meeting the brewmasters, touring the underground brewery-dungeon where ingredients grow, and the first round of tastings.',
      challenge: 'social',
      keyEvents: [
        'Welcome to Kegholm — a city built inside a massive keg-shaped cavern',
        'Meet the three brewmasters (and their wildly different approaches)',
        'Round 1 tasting: three mild ales with minor magical effects (glowing skin, squeaky voice, seeing sounds)',
        'A sabotage attempt: someone poisons a brew — the party must detect it',
      ],
    },
    {
      title: 'Scene 2: The Ingredient Hunt',
      summary:
        'The brewmasters need rare ingredients from the deeper brewery-dungeon. The party escorts them through tunnels full of magical fungi, ale elementals, and fermentation gone wrong.',
      challenge: 'exploration',
      keyEvents: [
        'The Deep Cellar — tunnels where magical ingredients grow (luminous hops, fire-yeast, shadow-malt)',
        'Ale elementals — creatures made of animated beer, not hostile but very drunk',
        'A fermentation gone catastrophically wrong — a room-sized blob of sentient sourdough',
        'Round 2 tasting: stronger ales with significant effects (shrinking, fire breath, temporary telepathy)',
      ],
    },
    {
      title: 'Scene 3: The Grand Tasting',
      summary:
        'The final round. Three legendary ales. Maximum magical effects. And a raid by thieves who want the Godsbrew recipe.',
      challenge: 'combat',
      keyEvents: [
        'Final ales: one grants flight, one grants stone skin, one makes you speak only truth',
        'All effects stack — the party is dealing with 6+ simultaneous magical effects',
        'Thieves attack mid-tasting — fight while flying, stone-skinned, and unable to lie',
        'Choose the winner — and decide what to do with the Godsbrew recipe',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Brewmaster Barley Ironbelly',
      role: 'traditionalist competitor',
      personality:
        'A conservative dwarf brewer who believes in "pure brewing — no frills, no magic, just craft." His ales have subtle effects that sneak up on you. "The best enchantment is the one you don\'t notice until you\'re wrestling a bear."',
    },
    {
      name: 'Brewmaster Fizz Sparklecog',
      role: 'experimental competitor',
      personality:
        'A gnome who treats brewing like mad science. Explosions are "happy accidents." Her ales are unpredictable and she considers that a feature. "If you can predict the effect, where\'s the fun?"',
    },
    {
      name: 'Brewmaster Obsidian',
      role: 'mysterious competitor',
      personality:
        'A drow who brews with Underdark ingredients — mushrooms, lichen, cave water. His ales are dark, complex, and slightly terrifying. Doesn\'t smile. His ales are the best, and he knows it.',
    },
  ],
  keyLocations: [
    {
      name: 'Kegholm',
      description:
        'A dwarven city built inside a massive keg-shaped cavern. Everything smells like hops. The architecture incorporates brewing equipment as structural supports.',
      significance: 'The setting for the entire one-shot.',
    },
    {
      name: 'The Deep Cellar',
      description:
        'Tunnels beneath Kegholm where magical brewing ingredients grow wild. Bioluminescent fungi, sentient yeast colonies, and the occasional ale elemental.',
      significance: 'The dungeon-crawl portion of the adventure.',
    },
    {
      name: 'The Grand Tasting Hall',
      description:
        'A vast underground amphitheater built for the competition. Thousands of dwarves spectate. The judges\' table is in the center.',
      significance: 'Where the climactic tasting and raid take place.',
    },
  ],
  dataSystems: [
    'enchantedFoodDrink',
    'potionBrewing',
    'alchemicalForaging',
    'tavernEntertainment',
    'combatNarration',
    'trapDisarm',
  ],
};
