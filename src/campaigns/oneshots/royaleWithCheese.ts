import type { OneShotCampaign } from '../types';

export const royaleWithCheese: OneShotCampaign = {
  id: 'oneshot-royale-with-cheese',
  type: 'oneshot',
  title: 'Royale with Cheese',
  tagline: 'You are a sentient wheel of cheese. Your weapon is a ladle. The oven is closing in. SURVIVE.',
  tone: 'comedic',
  themes: ['comedy', 'war', 'dungeon_crawl'],
  playerCount: { min: 4, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Grand Kitchen of the Gilded Spoon is the most prestigious restaurant in the realm — and today it is a warzone. The Head Chef has enchanted the ingredients for the annual Culinary Battle Royale, a tradition so old nobody remembers if it started as a joke. Every ingredient in the pantry has been awakened with sentience, given tiny weapons forged from silverware, and dropped into the kitchen arena. The countertops are plateaus. The sink is an ocean. The spice rack is a mountain range. The oven is the zone — slowly heating up, its door opening wider, pulling everything toward the center. Last ingredient standing gets plated as the masterpiece. Everyone else gets composted.',
  hook: 'You wake up and you are food. Specifically: a barbarian baguette with a rolling pin, a rogue radish dual-wielding toothpicks, a wizard wheel of cheese wielding a whisk as a staff, a cleric carrot with a serving spoon holy symbol, a ranger raspberry with a fork-bow, and a paladin potato in tin foil armor. The countertop stretches before you like a desert. In the distance, a banana screams a war cry. The oven glows red. The cooking show host clears his throat. "LADIES AND GENTLEMEN... LET THE CULINARY BATTLE ROYALE... BEGIN!"',
  twist:
    'It is literally a cooking competition. The kitchen is a pot. The "arena" is a cutting board that sits over a simmering stockpot. The "oven zone" is the actual heat source. The "last one standing" does not win freedom — they get plated as the chef\'s signature dish. The only actual escape is off the cutting board entirely, onto the floor, where the kitchen dog waits. Out of the pot and into the dog. There are no good options. Only delicious ones.',
  climax:
    'The final three ingredients face off on a rapidly heating cutting board over a stockpot. The cooking show host narrates with increasing excitement. The chef reaches for the pepper grinder — an orbital strike from the sky. The winner is grabbed by enormous tongs and placed artfully on a plate with a garnish. The crowd applauds. The winner is eaten by a food critic who says "needs salt." Credits roll. A post-credits scene shows the kitchen dog eating every ingredient that fell off the board, which is arguably the best ending.',
  scenes: [
    {
      title: 'Scene 1: The Drop',
      summary: 'The ingredients awaken on the countertop. Orientation, gear check, and the first chaotic scramble for power-up condiments. A banana charges a tomato. A head of lettuce builds a fort.',
      challenge: 'exploration',
      keyEvents: [
        'Awakening: "I have... legs? I have LEGS. Wait, what AM I?" — the existential crisis of a sentient baguette',
        'The countertop: a vast plateau with condiment dispensers as loot drops',
        'First condiment grab: ketchup (healing potion), mustard (haste), hot sauce (fireball), mayo (shield)',
        'The cooking show host introduces himself: "I am Chef Renaldo and you are ALL going to be DELICIOUS"',
      ],
    },
    {
      title: 'Scene 2: The Midgame',
      summary: 'Alliances form along food group lines. The vegetables unionize. The fruits go guerrilla. The carbs form a defensive phalanx. The oven heats up and the zone shrinks.',
      challenge: 'combat',
      keyEvents: [
        'The Vegetable Union demands solidarity: "Greens stick together!" The radish player must choose.',
        'The Fruit Guerrillas launch a surprise attack from the fruit bowl using grape-shot (actual grapes)',
        'The Carb Phalanx: baguette, pretzel, and croissant form an impenetrable bread wall',
        'The oven opens wider. The heat zone expands. A crouton catches fire and runs screaming.',
        'Power-up: someone finds the SRIRACHA. It is a tactical nuke. The spice rack explodes.',
      ],
    },
    {
      title: 'Scene 3: Kitchen Hazards',
      summary: 'Environmental disasters escalate. The chef starts actively cooking, introducing hazards no ingredient anticipated. The faucet turns on. The blender activates. A knife falls.',
      challenge: 'puzzle',
      keyEvents: [
        'The faucet: a tsunami across the countertop. The lettuce surfs. The bread absorbs water and slows.',
        'The blender activates in the corner — a vortex of death that pulls everything toward it',
        'A knife falls from the magnetic strip: a monolith crashing into the battlefield',
        'The pepper grinder: orbital bombardment from the sky. Sneezing debuff on everyone.',
        'The cutting board tips slightly. Everyone slides toward the stockpot. Grab something or become soup.',
      ],
    },
    {
      title: 'Scene 4: The Plating',
      summary: 'The final showdown on a tilting cutting board over a boiling stockpot. The last ingredients fight for the dubious honor of being the main course.',
      challenge: 'combat',
      keyEvents: [
        'Three ingredients remain on the board. The stockpot bubbles below. The chef reaches for the tongs.',
        'Final combat: slippery surface, rising steam, the cooking host screaming "WHAT A FINISH!"',
        'The winner is grabbed by enormous tongs and placed on a plate with a sprig of parsley',
        'The food critic takes a bite: "Interesting texture. Needs salt." THE END.',
        'Post-credits: the kitchen dog eats everyone who fell off the board. Arguably the happy ending.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Chef Renaldo', role: 'cooking show host / god', personality: 'An enormously enthusiastic human who narrates everything the food does as if it is intentional cuisine. When the baguette punches the banana: "A BOLD pairing! Sweet meets savory in a VIOLENT reduction!" Treats carnage as art.' },
    { name: 'The Banana', role: 'rival / early threat', personality: 'A banana with a cocktail sword and an anger management problem. Charges everything. Slips on its own peel. Gets back up. Charges again. The first enemy every party faces and the one they remember.' },
    { name: 'The Kitchen Dog', role: 'floor boss / alternative ending', personality: 'A golden retriever who waits below the counter for anything that falls. Is not malicious. Is just a dog. Will eat you with the same enthusiasm as a tennis ball. Tail wagging the entire time.' },
    { name: 'The Food Critic', role: 'final judge / existential horror', personality: 'A human who eats the winner. That is the prize. Being eaten by someone important. The food critic is pretentious, demanding, and will definitely say "needs salt" regardless of what the dish actually is.' },
  ],
  keyLocations: [
    { name: 'The Countertop', description: 'A vast granite plateau. Condiment dispensers dot the landscape like towers. The sink is an ocean on the north edge. The spice rack is a mountain range to the east.', significance: 'The main arena. Flat, exposed, with scattered cover from utensil holders and napkin dispensers.' },
    { name: 'The Cutting Board', description: 'A wooden platform suspended over a stockpot. It tilts. It is slippery. It is where the final fight happens.', significance: 'The final circle. Fall off and you become soup. Stay on and you become dinner.' },
    { name: 'The Oven', description: 'A glowing red maw that opens wider as the game progresses. The heat zone radiates outward, shrinking the playable area. Anything that enters does not come out.', significance: 'The zone. The ticking clock. The reason you cannot camp in the bread basket forever.' },
  ],
  dataSystems: ['encounterWaves', 'trapCorridor', 'lootTable', 'chaseSequence'],
};
