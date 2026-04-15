import type { OneShotCampaign } from '../types';

export const theMarketDay: OneShotCampaign = {
  id: 'oneshot-market-day',
  type: 'oneshot',
  title: 'The Market Day',
  tagline: 'No monsters. No dungeons. Just a village market, a pie contest, and a dance at sunset. Pure cozy.',
  tone: 'social',
  themes: ['social', 'comedy'],
  playerCount: { min: 3, max: 6 },
  level: 2,
  estimatedHours: 2.5,
  settingSummary:
    'The village of Willowmere holds its annual market day. The party runs a stall, haggles with merchants, enters the legendary pie contest, competes in games, and dances at the evening festival. No combat. Just community, competition, and charm.',
  hook: 'The party arrives in Willowmere on market day. A cheerful halfling thrusts an apron into their hands: "You look like you can cook! Pie contest in three hours! Sign up here!" Before they can protest, they are running a booth.',
  twist:
    'The village is under a subtle fey enchantment. Market day is always perfect because a brownie named Pip ensures it. This year, Pip is sick. Without intervention, the enchantment fades and a decade of suppressed bad weather, spoiled crops, and bad luck hits all at once.',
  climax:
    'The festival is magical. Literally. As Pip weakens, the magic flickers: rain threatens, pies go stale, music sours. The party must find Pip, heal him, and keep the festival going without anyone noticing. Save market day.',
  scenes: [
    {
      title: 'Scene 1: Morning Market',
      summary: 'The party sets up a stall, haggles, and makes friends. Pure roleplay and skill checks.',
      challenge: 'social',
      keyEvents: [
        'Running a stall: what do they sell? Persuasion, Deception, and Performance checks.',
        'Rival merchants: a charming dwarf cheese-monger and an aggressive gnome tinker.',
        'Bartering with villagers. Every deal tells a story.',
        'Signing up for the pie contest. The reigning champion is terrifying.',
      ],
    },
    {
      title: 'Scene 2: The Contests',
      summary: 'Pie baking, arm wrestling, archery, and a talent show. Skill checks as entertainment.',
      challenge: 'social',
      keyEvents: [
        'The pie contest: Cooking checks, ingredient sourcing, presentation.',
        'Village games: arm wrestling (Athletics), archery (Dexterity), riddles (Intelligence).',
        'A child asks the party to help find their lost cat. It is on the roof. Of the tallest building.',
        'Odd signs: flowers wilting, a pie going stale instantly. Something is off.',
      ],
    },
    {
      title: 'Scene 3: The Evening Festival',
      summary: 'Dancing, music, and the enchantment failing. The party must save Pip and the festival.',
      challenge: 'exploration',
      keyEvents: [
        'The dance begins. Partners are assigned by tradition. Awkwardness ensues.',
        'The magic flickers. Rain starts. Music goes flat. The crowd murmurs.',
        'Finding Pip: a tiny brownie, feverish, hidden under the festival stage.',
        'Healing Pip restores the magic. The rain stops. The music swells. Market day is saved.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Pip',
      role: 'brownie / secret guardian',
      personality: 'Tiny, proud, and embarrassed to need help. Has kept market day perfect for forty years. Being sick is a personal failure in his eyes.',
    },
    {
      name: 'Nessa Bramblecrust',
      role: 'pie contest champion',
      personality: 'A halfling grandmother who has won the pie contest nine years running. Competitive. Ruthless. Her crust is legendary.',
    },
  ],
  keyLocations: [
    {
      name: 'Willowmere Village Green',
      description: 'A sun-dappled village square lined with market stalls, bunting, and the smell of fresh pie.',
      significance: 'The entire one-shot. A cozy, warm, no-stakes environment (until the magic fails).',
    },
  ],
  dataSystems: ['npcGenerator', 'moraleTracker', 'combatNarration'],
};
