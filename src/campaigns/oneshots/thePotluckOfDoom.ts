import type { OneShotCampaign } from '../types';

export const thePotluckOfDoom: OneShotCampaign = {
  id: 'oneshot-potluck-doom',
  type: 'oneshot',
  title: 'The Potluck of Doom',
  tagline: 'Every dish is enchanted. Every guest is suspicious. The dessert is literally cursed.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'mystery'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The annual Wizard\'s Potluck at the Arcane Academy — where every wizard brings an enchanted dish to share. It\'s competitive, cutthroat, and someone enchants the food every year. Last year, everyone turned blue. This year, the stakes are higher: the dishes are more powerful, the judges are more corrupt, and someone brought a pie that grants wishes (but the wishes go wrong). The party is invited as "neutral taste-testers."',
  hook: 'An invitation: "You are cordially invited to judge the 47th Annual Arcane Potluck. Dinner is at 7. Magical effects may include but are not limited to: levitation, temporary polymorphing, prophetic visions, and mild existential dread. Antidotes provided (usually)."',
  twist: 'The wish-pie was baked by the Academy\'s janitor — a secret archmage who hides his power because he prefers cleaning to politics. He entered the competition anonymously because he wanted to win something for once. The wishes going wrong isn\'t a malfunction — each wish reveals the truth about what the wisher really wants.',
  climax: 'The wish-pie has granted three wishes that have gone spectacularly wrong. One wizard is 30 feet tall (she wished to be "bigger" in academia). One is being chased by gold coins (he wished for wealth that would follow him everywhere). One can hear everyone\'s thoughts (she wished to understand people). The party must reverse the wishes, find the baker, and judge the competition — all while affected by every dish they\'ve tasted.',
  scenes: [
    {
      title: 'Scene 1: The Tasting',
      summary: 'The potluck begins. Each dish is enchanted. The party must taste everything and is affected by cumulative magical food effects.',
      challenge: 'social',
      keyEvents: [
        'Dish 1: "Levitation Soup" — everyone who eats it floats for 10 minutes',
        'Dish 2: "Truth Tarts" — you cannot lie for an hour (awkward at a wizard party)',
        'Dish 3: "Memory Mousse" — you remember one thing you forgot (not always welcome)',
        'The wish-pie appears: golden, glowing, and smelling impossibly good',
      ],
    },
    {
      title: 'Scene 2: The Wishes',
      summary: 'Three wizards eat the wish-pie. Three wishes go wrong. The party must deal with the chaos while under the effects of multiple enchanted foods.',
      challenge: 'exploration',
      keyEvents: [
        'Wish 1: Wizard Thorne is now 30 feet tall and stuck in the dining hall',
        'Wish 2: Wizard Goldweave is being pelted by flying gold coins',
        'Wish 3: Wizard Mira can hear everyone\'s thoughts and is having a breakdown',
        'The party, while floating and unable to lie, must solve each wish-crisis',
      ],
    },
    {
      title: 'Scene 3: The Baker',
      summary: 'Finding the janitor-archmage, reversing the wishes, and judging the competition. The final tasting includes the party\'s own improvised dish.',
      challenge: 'social',
      keyEvents: [
        'The janitor revealed: an archmage who just wanted to win a cooking competition',
        'Reversing the wishes: each wisher must acknowledge what they really wanted',
        'The judging: the party, still under magical food effects, must pick a winner',
        'The janitor\'s pie wins — and the Academy loses its janitor',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Gus the Janitor', role: 'secret archmage / baker', personality: 'An elderly man who cleans the Academy and is secretly the most powerful wizard in the building. Humble, kind, and makes incredible pastry. "I don\'t want to be archmage. I want to be a baker. There\'s a difference."' },
    { name: 'Dean Pompous', role: 'potluck host', personality: 'The Academy\'s dean who takes the competition WAY too seriously. His dish is always mediocre but everyone praises it. "My crème brûlée DEFINES this event."' },
    { name: 'Wizard Mira', role: 'wish victim', personality: 'A shy wizard who wished to understand people and is now hearing every thought in the room. "EVERYONE PLEASE STOP THINKING SO LOUDLY."' },
  ],
  keyLocations: [
    { name: 'The Grand Dining Hall', description: 'A massive hall set for the potluck. 30 enchanted dishes, floating candles, and one very large wizard stuck in the ceiling.', significance: 'Where the entire one-shot takes place.' },
    { name: 'The Kitchens', description: 'Where the dishes were prepared. Evidence of the wish-pie\'s creation. Gus\'s apron hangs on a hook.', significance: 'Where the baker\'s identity is discovered.' },
    { name: 'The Judges\' Table', description: 'An elevated table with 6 seats, scorecards, and a bucket labeled "ANTIDOTES" that is disturbingly empty.', significance: 'Where the party sits and suffers.' },
  ],
  dataSystems: ['enchantedFoodDrink', 'potionBrewing', 'socialEncounter', 'wildMagicSurge', 'combatNarration'],
};
