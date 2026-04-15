import type { OneShotCampaign } from '../types';

export const theBrokenClock: OneShotCampaign = {
  id: 'oneshot-broken-clock',
  type: 'oneshot',
  title: 'The Broken Clock',
  tagline: 'The town clock stopped at 3:47 AM. Every gear is perfect. The pendulum swings once and returns to 3:47. It knows what time it is. It will not move past it.',
  tone: 'serious',
  themes: ['mystery', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The great clock in the town square stopped at 3:47 AM, six months ago. Every clockmaker who has tried to fix it has failed. The mechanism is perfect. The gears are aligned. It simply refuses to move. The town council hires the party to investigate because strange things have been happening since the clock stopped: people lose track of time, appointments are missed by hours, and the town feels stuck.',
  hook: 'The clockmaker opens the mechanism and shows the party. "Every gear is perfect. Every spring is wound. Watch." He pushes the pendulum. It swings once, returns to 3:47, and stops. "It knows what time it is. It will not move past it."',
  twist: 'At 3:47 AM six months ago, the town\'s beloved teacher was murdered in the square directly below the clock. The murderer was never found. The clock is enchanted, built centuries ago by a mage who tied it to the town\'s wellbeing. It stopped because the town has an unresolved injustice. It will not restart until the truth is known.',
  climax: 'The party solves the murder. The teacher was killed by a student she had caught cheating, who is now a respected town official. Revealing the truth restarts the clock but destroys a man\'s reputation and career. The clock demands justice, not mercy.',
  scenes: [
    {
      title: 'Scene 1: The Clock',
      summary: 'Examining the clock, learning its history, and discovering the connection between its stopping and the murder below it.',
      challenge: 'puzzle',
      keyEvents: [
        'The mechanism: perfect, maintained, and stubbornly frozen at 3:47',
        'The clock\'s history: built by a mage who enchanted it to reflect the town\'s health',
        'The connection: 3:47 AM, six months ago, a teacher named Elwin was found dead below the clock',
        'The case: officially unsolved. The guard investigated for weeks and found nothing',
      ],
    },
    {
      title: 'Scene 2: The Murder',
      summary: 'Investigating the cold case. Interviewing witnesses, examining evidence, and following leads that the original investigation missed.',
      challenge: 'exploration',
      keyEvents: [
        'Elwin: a beloved teacher, no enemies anyone admits to, no debts, no secrets',
        'The night of the murder: only three people were seen near the square',
        'A student of Elwin\'s who was caught cheating and expelled shortly before the murder',
        'That student is now a town councilmember who pushed to stop investigating the case',
      ],
    },
    {
      title: 'Scene 3: The Truth',
      summary: 'Confronting the murderer and presenting evidence. The clock begins to tick when the truth is spoken aloud.',
      challenge: 'social',
      keyEvents: [
        'Evidence assembled: the gradebook, the expulsion record, the missing investigation files. Vane\'s signature is on the order to stop the inquiry',
        'Confrontation: Vane\'s composure cracks one layer at a time. The smile goes first. Then the posture. Then the voice',
        'The confession: spoken in the square below the clock with the town watching. "He was going to ruin me. I could not let him ruin me." The square goes silent',
        'Above them: a single tick. 3:48. Then 3:49. Then the chime that has not rung in six months. The sound makes half the crowd weep',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Clockmaker Henn', role: 'quest giver / ally', personality: 'Oil-stained fingers, talks with her hands, interrupts herself. Pulls out diagrams mid-sentence. "I have rebuilt this mechanism four times. Four. Every spring is wound. Every gear meshes. I push the pendulum and it swings once and stops at - you already know what time. It is not a mechanical problem. I do not know what kind of problem it is. That is why you are here."' },
    { name: 'Councilmember Aldric Vane', role: 'antagonist', personality: 'Smiles with only his mouth. Straightens things on his desk that are already straight. "The clock? A nuisance. We have hired three clockmakers. Perhaps the fourth will succeed. I do not see why the investigation into Elwin is relevant." His hand moves to his cuff. He tugs it down. There is nothing there. The gesture is pure habit.' },
    { name: 'Teacher Elwin (deceased)', role: 'the victim', personality: 'Present only in what he left behind: a classroom with perfect handwriting on the chalkboard, still unwiped. A gradebook with one entry circled in red: "Vane, A. - EXAMINATION FRAUD." The chalk is still on the rail. His coat is still on the hook.' },
  ],
  keyLocations: [
    { name: 'The Town Clock', description: 'A centuries-old enchanted clock frozen at 3:47 AM, its mechanism perfect but immobile.', significance: 'The central mystery. The clock knows something the town does not.' },
    { name: 'The Square Below', description: 'The town square directly beneath the clock, where Elwin was found dead at 3:47 AM.', significance: 'The crime scene and the location where the truth must be spoken.' },
    { name: 'Elwin\'s Classroom', description: 'A preserved room in the schoolhouse, left untouched since his death.', significance: 'Where evidence of the motive is found: the cheating records Vane tried to destroy.' },
  ],
  dataSystems: ['detectiveCase', 'npcDialogue', 'socialEncounter', 'puzzleLock', 'moralDilemma'],
};
