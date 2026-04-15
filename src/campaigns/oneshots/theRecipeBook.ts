import type { OneShotCampaign } from '../types';

export const theRecipeBook: OneShotCampaign = {
  id: 'oneshot-recipe-book',
  type: 'oneshot',
  title: 'The Recipe Book',
  tagline: 'A legendary cookbook guarded by the world\'s most paranoid chef. In a kitchen where everything is a weapon.',
  tone: 'heist',
  themes: ['heist', 'comedy', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Chef Hellion\'s Recipe Book contains the greatest culinary secrets ever written. It is locked in a vault inside his restaurant kitchen. Chef Hellion is a retired adventurer who trapped his kitchen like a dungeon. Boiling oil vats with tripwires. Knife racks that launch on command. A walk-in freezer that locks from the outside. The party must infiltrate the kitchen during dinner service and steal the book.',
  hook: 'The rival restaurateur is desperate: "Hellion\'s recipes are worth a fortune. He guards that book like a dragon guards gold - and his kitchen is more dangerous than any dungeon. Sneak in during dinner rush when the chaos covers you. Get the book. Get out. Do NOT eat the soup - it is enchanted."',
  twist: 'The Recipe Book is written in a code that only makes sense to Chef Hellion. The "recipes" are actually his memoir - stories of his adventuring career disguised as cooking instructions. "Two cups of dragon fire" means "we fought a red dragon." The book is worthless as a cookbook. But as a treasure map? Every recipe contains coordinates to loot he stashed during his career.',
  climax: 'The party reaches the vault during the dinner rush. The kitchen is chaos - fire, knives, shouting chefs. The vault is behind the industrial oven. Chef Hellion catches them and challenges them to a cooking duel: beat his signature dish and he will let them take the book. Lose and he adds them to tomorrow\'s menu. Figuratively. Probably.',
  scenes: [
    {
      title: 'Scene 1: Casing the Kitchen',
      summary: 'Dining at the restaurant to study the layout, the traps, and Chef Hellion\'s routine.',
      challenge: 'exploration',
      keyEvents: [
        'The restaurant: packed every night, a three-month waiting list, food that is genuinely incredible',
        'The open kitchen: visible from the dining room, showing a fraction of the chaos behind the line',
        'Hellion\'s routine: he never leaves the kitchen during service - he IS the security system',
        'The traps: a waiter accidentally triggers a knife rack and barely dodges - this place is dangerous',
      ],
    },
    {
      title: 'Scene 2: Behind the Line',
      summary: 'Infiltrating the kitchen during dinner service. Dodging chefs, traps, and boiling liquids.',
      challenge: 'puzzle',
      keyEvents: [
        'Entry: disguised as new line cooks, delivery workers, or through the ventilation (which is also trapped)',
        'The kitchen: a gauntlet of hazards - oil vats, knife racks, enchanted cutting boards that bite',
        'The sous chefs: focused on cooking, but they notice anyone who does not belong',
        'The vault: behind the oven, locked with a combination that changes every night',
      ],
    },
    {
      title: 'Scene 3: The Cooking Duel',
      summary: 'Caught. Hellion offers a deal: beat his dish or face the consequences.',
      challenge: 'social',
      keyEvents: [
        'The challenge: cook one dish, judged by the head waiter (who has no taste for politics, only food)',
        'The ingredients: the party has access to anything in the kitchen - including trapped ingredients',
        'The cook-off: skill checks, creativity, and whoever makes the better meal wins',
        'Win or lose: the book, its coded contents, and Hellion\'s grudging respect or furious pursuit',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Chef Hellion', role: 'obstacle / duel opponent', personality: 'Shouts everything. Absolute everything. "FIRE ON STATION THREE! WHO PUT THAT THERE? TASTE THIS. IS THAT ENOUGH SALT? DO NOT ANSWER, IT IS PERFECT." Holds a cleaver the way a fighter holds a longsword - because he used to hold a longsword. His kitchen is a dungeon because he cannot stop being a dungeon master.' },
    { name: 'Restaurateur Patel', role: 'quest giver', personality: 'Speaks about Hellion the way a bard speaks about a legend - equal parts reverence and jealousy. His own restaurant is "fine." He knows it is fine. "Fine" keeps him up at night. When the recipes turn out to be coded memoirs, his disappointment is visible from space.' },
    { name: 'Sous Chef Knives', role: 'kitchen hazard', personality: 'A goblin who juliennes carrots faster than most people draw swords. Answers every question with "Chef says no." Can be distracted only by a genuinely interesting cooking question - "What is the right temperature for a roux?" will buy you thirty seconds of passionate lecture.' },
  ],
  keyLocations: [
    { name: 'Hellion\'s Restaurant', description: 'The best restaurant in the city. The dining room is elegant. The kitchen is a death trap. The food is worth dying for.', significance: 'The heist location.' },
    { name: 'The Kitchen', description: 'A massive professional kitchen with hidden traps at every station. Boiling vats, spring-loaded knife racks, and enchanted utensils.', significance: 'The gauntlet to the vault.' },
    { name: 'The Vault', description: 'A small safe behind the industrial oven. Fireproof. The combination is a temperature - set the oven correctly and the vault clicks open.', significance: 'Where the Recipe Book is stored.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'socialEncounter'],
};
