import type { OneShotCampaign } from '../types';

export const risingWaters: OneShotCampaign = {
  id: 'oneshot-rising-waters',
  type: 'oneshot',
  title: 'Rising Waters',
  tagline: 'The valley is flooding. High ground is occupied. Climb or drown. Fight or negotiate.',
  tone: 'survival',
  themes: ['survival', 'wilderness'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 2.5,
  settingSummary:
    'A flash flood is filling the Greymist Valley. The party and a group of villagers must reach higher ground before the water swallows everything. Problem: the only high ground is a hilltop occupied by a territorial griffon and her nest.',
  hook: 'The rain has not stopped for three days. At noon, a wall of water roars down the valley. The party grabs villagers and runs uphill. The only hill tall enough is Thornridge. Something screeches from its peak.',
  twist:
    'The griffon is not just territorial. She is protecting eggs that are about to hatch. She will fight to the death to protect them. But the eggs are also in danger from the rising water. The party can save the eggs and earn an ally instead of fighting a mother defending her young.',
  climax:
    'Water reaches the hilltop base. The griffon attacks anyone who approaches. The party must protect the villagers, deal with the griffon, and keep everyone above the waterline. If they save the eggs, the griffon becomes an ally. If they kill her, the eggs die too.',
  scenes: [
    {
      title: 'Scene 1: The Flood',
      summary: 'The water rises. The party evacuates villagers and races for high ground.',
      challenge: 'exploration',
      keyEvents: [
        'A sound like thunder without lightning. Brown water surges around the bend, carrying trees and fence posts. It is moving faster than a horse.',
        'A child screams from a rooftop across the rising water. An elderly man pounds on his cellar door - the water outside is holding it shut.',
        'The water does not stop. It is not rain runoff. Something upstream collapsed. In one hour, the valley floor is a lake. Only rooftops and Thornridge show above it.',
        'Thornridge: the only hill tall enough. Something screeches from its peak - a shape with wings and a lion\'s body, circling. She has seen the flood too.',
      ],
    },
    {
      title: 'Scene 2: The Climb',
      summary: 'Ascending the hill while the water chases them. The griffon makes passes, warning them away.',
      challenge: 'combat',
      keyEvents: [
        'The hillside is muddy and unstable. Climbing checks. Villagers need help.',
        'The griffon dives. Warning passes first, then attacks.',
        'A mudslide sweeps part of the group downhill. Rescue mission.',
        'Discovery: a nest with three large eggs visible near the summit.',
      ],
    },
    {
      title: 'Scene 3: The Summit',
      summary: 'The hilltop standoff. Water is at their heels. The griffon is in their face. Find a solution.',
      challenge: 'social',
      keyEvents: [
        'The summit is small. Forty people and a griffon cannot share it by force.',
        'The eggs are in danger. Water is lapping at the nest.',
        'Move the eggs to safety and the griffon calms. Simple idea, terrifying execution.',
        'Water peaks. The hill holds. Dawn breaks. The valley below is a lake.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Stormfeather',
      role: 'griffon / obstacle / potential ally',
      personality: 'Eight feet at the shoulder. Golden feathers matted from three days of rain. She screeches at anything that approaches within fifty feet of the nest. But when the water laps at the eggs, she looks at the party. Just looks. The desperation in a predator\'s eyes is unmistakable.',
    },
    {
      name: 'Warden Callum',
      role: 'village protector',
      personality: 'A retired soldier who has been protecting this village for twenty years. Calm in crisis. Knows the terrain. Knows the griffon has been here longer than the village.',
    },
  ],
  keyLocations: [
    {
      name: 'Greymist Valley',
      description: 'A river valley rapidly filling with floodwater. Homes, fields, and roads vanishing under brown water.',
      significance: 'The ticking clock. Everything below the hilltop is gone.',
    },
    {
      name: 'Thornridge Summit',
      description: 'A rocky hilltop with a griffon nest, barely large enough for the villagers. The last dry ground in the valley.',
      significance: 'The only safe ground and the site of every major conflict.',
    },
  ],
  dataSystems: ['environmentalHazard', 'survivalTracker', 'moraleTracker', 'combatNarration'],
};
