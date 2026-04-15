import type { OneShotCampaign } from '../types';

export const theLastMarch: OneShotCampaign = {
  id: 'oneshot-last-march',
  type: 'oneshot',
  title: 'The Last March',
  tagline: 'A retreating army. You guard the rear. The enemy is behind you. The army is slow. Choose who to save.',
  tone: 'survival',
  themes: ['survival', 'war'],
  playerCount: { min: 4, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The battle is lost. The army retreats. The party commands the rearguard: fifty soldiers protecting two thousand wounded, civilians, and supply wagons crawling toward the fortress of Ironhold, two days away. The enemy pursues. The rearguard must buy time, and time is paid in lives.',
  hook: 'The general is dead. The battle is over. The retreat horn sounds. A bloodied colonel grabs the party: "You. Rearguard. Hold them off. Slow them down. Get these people to Ironhold. I don\'t care how. Just get them there alive."',
  twist:
    'The enemy commander does not want to destroy the army. She wants to capture a specific person hiding among the refugees: a defector carrying battle plans. She will negotiate: hand over the defector, and she calls off the pursuit. The defector is a child soldier who deserted.',
  climax:
    'The enemy closes in a mile from Ironhold. The enemy commander offers terms: the defector for the army. The defector is a fourteen-year-old kid who stole plans to save their village. Surrender a child, fight an army, or find a way to make the exchange without giving anyone up.',
  scenes: [
    {
      title: 'Scene 1: The Retreat',
      summary: 'Organizing the retreat. The party must manage the column, prioritize who moves fast, and set up delay actions.',
      challenge: 'exploration',
      keyEvents: [
        'Two thousand people: wounded soldiers, camp followers, civilians, supply wagons.',
        'The column moves at the speed of its slowest element. Cut the wagons, move faster. Keep them, eat tomorrow.',
        'Fifty rearguard soldiers look to the party for orders.',
        'Enemy scouts spotted. Pursuit has begun. They will catch up by nightfall.',
      ],
    },
    {
      title: 'Scene 2: Buying Time',
      summary: 'The party fights delaying actions. Bridge destruction, ambushes, and hard choices about who stays behind.',
      challenge: 'combat',
      keyEvents: [
        'A river crossing: destroy the bridge after the column passes, or leave it for the wounded still coming.',
        'Enemy cavalry probes. Fast, hit-and-run. The rearguard bleeds.',
        'A narrow pass: perfect for an ambush. Someone must hold it. They will not make it back.',
        'The defector is discovered among the refugees. She is fourteen and terrified.',
      ],
    },
    {
      title: 'Scene 3: The Offer',
      summary: 'The enemy commander rides forward under a white flag. Her terms are simple and terrible.',
      challenge: 'social',
      keyEvents: [
        'One mile from Ironhold. The enemy army is in full view. The rearguard is spent.',
        'Commander Vashka rides forward. She does not want a massacre. She wants the defector.',
        'The defector stole plans that would save her village from being razed. She is a kid.',
        'Hand her over, fight impossible odds, bluff, or sacrifice something else entirely.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Commander Vashka Dren',
      role: 'enemy commander / pragmatist',
      personality: 'Professional, calm, respects the party for holding this long. She does not want bloodshed. She wants the plans. The defector is secondary, but she cannot say that openly.',
      secret: 'She was ordered to retrieve the plans at any cost. If she returns without them, her own superiors will execute her.',
    },
    {
      name: 'Seri',
      role: 'defector / child soldier',
      personality: 'Fourteen years old. Terrified. Stole the plans because they detailed the destruction of her village. She does not understand the larger war. She just wanted to save her family.',
    },
    {
      name: 'Colonel Breck',
      role: 'rearguard officer',
      personality: 'A career soldier who follows the party\'s lead but offers blunt tactical advice. He will die for the column without hesitation.',
    },
  ],
  keyLocations: [
    {
      name: 'The Retreat Road',
      description: 'A muddy road stretching between a lost battlefield and the fortress of Ironhold. Two days of misery.',
      significance: 'The gauntlet. Every mile is bought with blood.',
    },
    {
      name: 'Ironhold Fortress',
      description: 'A border fortress visible on the horizon. Safety. If the column reaches it.',
      significance: 'The goal. Close enough to see. Far enough to die before reaching.',
    },
  ],
  dataSystems: ['warRoomBriefing', 'moraleTracker', 'combatNarration', 'encounterWaves'],
};
