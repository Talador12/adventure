import type { OneShotCampaign } from '../types';

export const theSwitcheroo: OneShotCampaign = {
  id: 'oneshot-switcheroo',
  type: 'oneshot',
  title: 'The Switcheroo',
  tagline: 'Swap a prisoner with a body double. The double is willing. The prisoner is not.',
  tone: 'heist',
  themes: ['heist', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A political prisoner is being transferred between prisons tomorrow. During the transfer, the party must swap her with a body double. The double is a volunteer who will serve the remaining sentence. The prisoner does not know about the plan and has explicitly refused rescue - she believes her imprisonment is a political statement. The party must kidnap someone who does not want to be rescued.',
  hook: 'The resistance leader is grim: "Commander Thayne refused extraction. She thinks her imprisonment inspires the movement. She is wrong - it is killing it. The transfer happens tomorrow. The body double is ready. Thayne does not know. She will resist. Do it anyway."',
  twist: 'The body double is Commander Thayne\'s twin sister. She volunteered because she believes her sister matters more to the cause than she does. If Thayne discovers who replaced her, it will break her. The party must complete the swap without either sister knowing the other is involved.',
  climax: 'The transfer carriage. The party must intercept, subdue Thayne without harming her, get the double into the carriage, and disappear. Thayne fights them because she thinks it is an enemy attack. The guards fight because it IS an attack. The double must stay calm through it all. Nobody can know.',
  scenes: [
    {
      title: 'Scene 1: The Plan',
      summary: 'Preparing the switch. Meeting the double. Studying the transfer route. Reconciling with kidnapping an ally.',
      challenge: 'social',
      keyEvents: [
        'The double: identical appearance, coached on Thayne\'s mannerisms, calm and determined',
        'The transfer route: five blocks through the merchant district, two guards, one armored carriage',
        'The window: a narrow alley where the carriage slows for a turn - thirty seconds maximum',
        'The moral weight: the party is overriding a person\'s explicit wishes - is this right?',
      ],
    },
    {
      title: 'Scene 2: The Intercept',
      summary: 'The transfer begins. The party moves into position. The clock starts.',
      challenge: 'exploration',
      keyEvents: [
        'Positioning: the party splits between the intercept point and the extraction vehicle',
        'The carriage approaches: two guards on top, one inside with Thayne, iron locks on the door',
        'The distraction: whatever the party planned to slow or stop the carriage at the alley',
        'The thirty-second window: the alley, the carriage, the guards distracted - now or never',
      ],
    },
    {
      title: 'Scene 3: The Swap',
      summary: 'Open the carriage. Subdue Thayne. Insert the double. Close the carriage. Disappear.',
      challenge: 'combat',
      keyEvents: [
        'The door: breaking or picking the lock under time pressure',
        'Thayne: she fights - she thinks this is an assassination attempt',
        'Subduing without harm: non-lethal restraint of a trained military commander',
        'The double: steps in, assumes position, the carriage door closes - the guards return to find nothing amiss',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Commander Thayne', role: 'the target', personality: 'A military commander imprisoned for refusing an immoral order. Believes her imprisonment is more powerful than her freedom. Proud, principled, and will punch anyone who tries to rescue her.' },
    { name: 'The Double (Maris)', role: 'volunteer', personality: 'Thayne\'s twin sister. A civilian who believes her sister is more important to the cause. Calm, brave, and heartbreakingly willing to disappear into a prison.', secret: 'She has a terminal illness. She volunteered because she has less time to lose.' },
    { name: 'The Resistance Leader', role: 'quest giver', personality: 'A pragmatist who loves Thayne but needs her free. Made the decision to override Thayne\'s wishes. Carries that weight.' },
  ],
  keyLocations: [
    { name: 'The Transfer Route', description: 'Five blocks through the merchant district. Cobblestones, market stalls, and one narrow alley where the carriage must slow.', significance: 'Where the intercept happens.' },
    { name: 'The Alley', description: 'A narrow passage between two warehouses. Just wide enough for the carriage, just dark enough for the swap.', significance: 'The thirty-second window.' },
    { name: 'The Safe House', description: 'A basement room where an unconscious Commander Thayne will wake up free and furious.', significance: 'Where the aftermath happens.' },
  ],
  dataSystems: ['heistPlanner', 'chaseSequence', 'encounterWaves', 'combatNarration'],
};
