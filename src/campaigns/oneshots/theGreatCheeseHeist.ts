import type { OneShotCampaign } from '../types';

export const theGreatCheeseHeist: OneShotCampaign = {
  id: 'oneshot-great-cheese-heist',
  type: 'oneshot',
  title: 'The Great Cheese Heist',
  tagline: 'You are mice. The cheese is in the castle. The cat has a sword.',
  tone: 'comedic',
  themes: ['comedy', 'heist'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The players are sentient mice in a medieval kitchen. The legendary Wheel of Evercheese — a magic cheese that never runs out — sits in the lord\'s pantry, guarded by Sir Claws (a housecat with delusions of knighthood), a mousetrap gauntlet, and the Head Chef who sleeps in the kitchen. The mouse village is starving. It\'s heist time.',
  hook: 'Elder Squeaks addresses the mouse village: the winter stores are gone, eaten by rats from the sewers. The only hope is the Wheel of Evercheese in the lord\'s pantry. No mouse has ever returned from the kitchen. But these mice are different — they have classes.',
  twist:
    'Sir Claws isn\'t guarding the cheese for the lord — he\'s hoarding it for himself. He\'s been stealing from the pantry and blaming the mice. If the mice can prove this to the lord, they might not need to steal anything.',
  climax:
    'The mice reach the Wheel of Evercheese but Sir Claws corners them. They can fight (a terrifying battle against a creature 20x their size), negotiate (Sir Claws is lonely and just wants attention), expose him to the lord (justice), or grab the cheese and run (pure heist).',
  scenes: [
    {
      title: 'Scene 1: The Mouse Village',
      summary:
        'Character introductions, the quest briefing, and preparation. Each mouse has a role: the Nose (scout), the Paw (fighter), the Whisker (rogue), the Brain (wizard).',
      challenge: 'social',
      keyEvents: [
        'Elder Squeaks gives the quest — the village is starving',
        'Each mouse explains their specialty (reflavored D&D classes)',
        'Equipment: a thimble helmet, a needle sword, a button shield, a crumb of magic chalk',
        'The village map of the kitchen — drawn from survivors\' accounts, mostly wrong',
      ],
    },
    {
      title: 'Scene 2: The Kitchen Crossing',
      summary:
        'The mice navigate the kitchen — scaling countertops, crossing the gap between shelves, avoiding the sleeping Chef, and surviving the mousetrap gauntlet.',
      challenge: 'exploration',
      keyEvents: [
        'Counter-climbing with a paperclip grappling hook',
        'The sleeping Chef — must cross his chopping board without waking him',
        'Mousetrap gauntlet — 5 traps between the mice and the pantry door',
        'A friendly cockroach offers a shortcut through the walls (for a price)',
      ],
    },
    {
      title: 'Scene 3: The Pantry Showdown',
      summary:
        'Sir Claws guards the pantry. The Wheel of Evercheese glows on the top shelf. The mice must deal with a cat who thinks he\'s a knight.',
      challenge: 'combat',
      keyEvents: [
        'Sir Claws monologues about duty and honor (he\'s rehearsed this)',
        'Discovery: the pantry is full of hidden cheese — Sir Claws has been hoarding',
        'The confrontation: fight, negotiate, expose, or grab-and-run',
        'Escape back to the village — victory celebration with tiny cheese crowns',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Elder Squeaks',
      role: 'quest giver',
      personality:
        'A very old mouse with one eye and a tiny walking stick. Speaks in dramatic whispers. Has been planning this heist for years.',
    },
    {
      name: 'Sir Claws',
      role: 'antagonist / potential ally',
      personality:
        'A housecat wearing a napkin as a cape who genuinely believes he\'s a knight. Speaks in formal, chivalric language. Actually lonely — the lord ignores him.',
      secret: 'He\'s been stealing cheese for comfort eating. He doesn\'t even like cheese that much.',
    },
    {
      name: 'Chef Grumbold',
      role: 'environmental hazard',
      personality:
        'A heavy-sleeping human chef. Not a character so much as a terrain feature. Snores loud enough to shake the mousetraps.',
    },
  ],
  keyLocations: [
    {
      name: 'Mouse Village',
      description:
        'A tiny settlement inside the castle walls, made from matchboxes, thimbles, and cloth scraps.',
      significance: 'Starting point and emotional anchor.',
    },
    {
      name: 'The Kitchen',
      description:
        'A vast, terrifying landscape at mouse scale. The countertop is a plateau. The stove is a volcano. The sink is an abyss.',
      significance: 'The primary exploration/obstacle course.',
    },
    {
      name: 'The Lord\'s Pantry',
      description:
        'A locked room full of food, with the Wheel of Evercheese glowing on the top shelf like a holy relic.',
      significance: 'The heist target and final confrontation location.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'trapDisarm',
    'combatNarration',
    'merchantHaggling',
    'tavernBrawl',
  ],
};
