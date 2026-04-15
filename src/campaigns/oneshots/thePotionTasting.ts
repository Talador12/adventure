import type { OneShotCampaign } from '../types';

export const thePotionTasting: OneShotCampaign = {
  id: 'oneshot-the-potion-tasting',
  type: 'oneshot',
  title: 'The Potion Tasting',
  tagline: 'Notes of regret, a bouquet of poor decisions, and a finish that lasts until next Tuesday.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'Master Sommelier Vesper Tincture hosts the annual Grand Potion Tasting at her salon in the Alchemist\'s Quarter. This is the event of the season for potion enthusiasts, connoisseurs, and people who enjoy making questionable decisions in formal wear. Each potion is presented like a fine wine: swirl, sniff, sip, and suffer the consequences. The party has been invited as guest tasters. The potions start mild. They do not stay mild. Side effects are cumulative.',
  hook: 'The party arrives at an elegant salon. Crystal flutes hold shimmering potions. Vesper describes each one like a wine expert: "This Elixir of Hindsight has notes of oak, regret, and a hint of \'I should not have done that.\' The finish is three hours of knowing exactly what you should have said in every conversation you have ever had." The party tastes. The effects begin. By the third round, things get complicated.',
  twist:
    'The tasting is a competition. The last person standing wins a legendary potion: the Draught of One Perfect Day. It lets you relive any single day of your life and change one decision. Every guest at the tasting wants it desperately - and they are all secretly trying to sabotage each other while maintaining the pretense of civilized behavior. The potions are the weapon. Choosing what to drink and what to slip into someone else\'s glass is the game.',
  climax:
    'By the final round, every character is experiencing multiple stacking side effects simultaneously. Someone is invisible but only to themselves. Someone speaks only in rhyme. Someone has prophetic vision but it only shows them embarrassing moments from the future. The last potion is the Draught of Absolute Truth - anyone who drinks it must answer any question honestly. The saboteurs are exposed. Alliances shatter. The party must navigate the social catastrophe while barely functional. The winner is whoever is still conscious.',
  scenes: [
    {
      title: 'Scene 1: The First Flight',
      summary:
        'The tasting begins with mild potions. The party samples the first round and experiences gentle, humorous effects while meeting the other guests and learning the social dynamics.',
      challenge: 'social',
      keyEvents: [
        'Potion of Mild Regret: causes the drinker to apologize for minor things they did years ago',
        'Tincture of Tuesday: the drinker experiences everything as if it were a Tuesday, regardless of what day it is',
        'Elixir of Hindsight: perfect recall of every argument, plus the ideal response (too late to use)',
        'The party meets rival tasters who are suspiciously interested in what everyone else is drinking',
      ],
    },
    {
      title: 'Scene 2: The Second Round Escalates',
      summary:
        'The potions get stronger. Side effects stack. The sabotage begins. Guests start slipping potions into each other\'s drinks. Maintaining composure becomes the real challenge.',
      challenge: 'puzzle',
      keyEvents: [
        'Draught of Selective Invisibility: the drinker is invisible, but only to themselves. Everyone else can see them fine.',
        'Philter of Rhyming: all speech must rhyme. Failure causes mild electric shocks.',
        'Someone slips a Potion of Brutal Honesty into a rival\'s drink mid-conversation. Social carnage follows.',
        'Side effects stack: the party member who took Hindsight AND Rhyming is apologizing for old grudges in couplets',
      ],
    },
    {
      title: 'Scene 3: The Final Round',
      summary:
        'The last potion is the Draught of Absolute Truth. Saboteurs are exposed. Everyone is barely functional from stacking effects. The competition reaches its peak.',
      challenge: 'social',
      keyEvents: [
        'The Draught of Absolute Truth is served - anyone who drinks it cannot lie',
        'Saboteurs are exposed mid-sentence as the truth serum overrides their cover stories',
        'A guest confesses to poisoning his own drink because he secretly did not want to win',
        'The winner is declared: whoever is still standing and coherent. Standards for "coherent" have lowered considerably.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Vesper Tincture',
      role: 'host / quest giver',
      personality:
        'A tiefling potion sommelier who treats alchemy like high art. She describes every potion with devastating precision. She has tasted every potion she serves and has built up an immunity to most of them. Most. "The Draught of Regret pairs beautifully with the Elixir of Poor Judgment. I recommend them together."',
    },
    {
      name: 'Lord Percival Drench',
      role: 'rival / saboteur',
      personality:
        'A nobleman who wins the tasting every year through bribery and cheating. He has an alchemist on retainer who pre-doses him with antidotes. When the Truth Draught hits, his confessions are spectacular.',
    },
    {
      name: 'Miri the Quiet',
      role: 'dark horse competitor',
      personality:
        'A halfling apothecary who says almost nothing but watches everything. She has been quietly swapping her drinks with water the entire time. She is the most dangerous person in the room.',
      secret: 'She wants the Draught of One Perfect Day to go back and save her sister from a house fire.',
    },
  ],
  keyLocations: [
    {
      name: 'Vesper\'s Salon',
      description: 'An elegant tasting room with crystal decanters, plush seating, and a chandelier that changes color based on the dominant magical effect in the room. By Scene 3, it is strobing.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Cellar',
      description: 'Where Vesper keeps her rarest potions. Off-limits to guests. Contains the prize: the Draught of One Perfect Day, glowing softly in a velvet case.',
      significance: 'Contains the prize and the evidence of Lord Percival\'s pre-dosing scheme.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'alchemicalForaging',
    'plotTwistEngine',
    'randomConsequence',
    'statusEffectReference',
  ],
};
