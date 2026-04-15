import type { OneShotCampaign } from '../types';

export const theGraveyardShift2: OneShotCampaign = {
  id: 'oneshot-graveyard-shift-heist',
  type: 'oneshot',
  title: 'The Graveyard Shift',
  tagline: 'Steal a body from a graveyard before sunrise. The golem watchman never blinks. The spirits never sleep.',
  tone: 'heist',
  themes: ['heist', 'horror', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A woman needs her husband\'s body back. He was buried in Greymoor Cemetery three days ago - but he was buried alive under a suspended animation curse, and the cure exists. The cemetery is guarded by a stone golem that patrols endlessly, restless spirits that report intruders, and a gravedigger named Mord who has not slept in forty years. The party must dig up a grave, retrieve a body, and escape before dawn.',
  hook: 'The wife, tears and fury: "My husband is NOT dead. He was cursed - suspended animation. The priests declared him dead because they could not tell the difference. I found a cure. I need his body before the curse becomes permanent at sunrise. He is in Greymoor Cemetery. Nothing leaves Greymoor after dark."',
  twist: 'The gravedigger Mord knows the husband is alive. Mord can sense life in the dead - it is why he was hired. He has been waiting for someone to come for the body. He will help the party on one condition: they must also take a second body - Mord\'s own daughter, buried ten years ago under the same curse. He has been guarding her grave all this time.',
  climax: 'Two graves open. Two bodies recovered. The golem has detected the disturbance and is converging. The spirits are howling. Dawn is thirty minutes away and the cursed bodies must reach the healer before sunrise or they are truly dead. The party must escape Greymoor with two bodies, past a golem, through a field of angry ghosts.',
  scenes: [
    {
      title: 'Scene 1: Greymoor After Dark',
      summary: 'Entering the cemetery at night. Mapping the golem\'s patrol, avoiding the spirits, and finding the grave.',
      challenge: 'exploration',
      keyEvents: [
        'The cemetery: vast, fog-shrouded, headstones stretching to the tree line',
        'The golem: a stone sentinel that walks a predictable but thorough patrol route',
        'The spirits: wisps that drift between graves and scream when they spot the living',
        'The grave: Row 14, Plot 7 - freshly turned earth three days old',
      ],
    },
    {
      title: 'Scene 2: The Dig',
      summary: 'Digging up the grave while the golem patrols and the spirits circle. Then Mord appears.',
      challenge: 'puzzle',
      keyEvents: [
        'Digging: silent tools, coordinated effort, timing the golem\'s patrol to work during its blind spots',
        'The coffin: reached, opened - the husband inside looks dead but faintly warm',
        'Mord arrives: not hostile - he has been watching, waiting, hoping someone would come',
        'The deal: "Take my daughter too. Row 3, Plot 12. She has been waiting longer than your husband."',
      ],
    },
    {
      title: 'Scene 3: The Escape',
      summary: 'Two bodies. One golem. A cemetery full of ghosts. Thirty minutes to sunrise.',
      challenge: 'combat',
      keyEvents: [
        'The second dig: faster but noisier - Mord helps but the spirits have noticed',
        'The golem: deviates from its patrol, drawn by the disturbance, closing in',
        'The spirits: a wave of angry ghosts trying to keep the dead in the ground',
        'The gate: locked from inside, Mord has the key, the golem is twenty feet behind them',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elara Venn', role: 'quest giver', personality: 'Grips a vial of cure so tightly her knuckles are white. Has not slept in three days and it shows in her voice - cracking between fury and panic. Refers to her husband in present tense. "He IS alive. He is just... underground." Will physically grab the party if they hesitate.' },
    { name: 'Gravedigger Mord', role: 'unexpected ally', personality: 'Appears between headstones like he grew there. Speaks in a whisper that somehow carries across the cemetery. Knows every grave by name, date, and cause of death. When he talks about his daughter, his voice does not change - it has been the same grief for ten years and he has worn it smooth.', secret: 'He has dug up and reburied his daughter\'s grave dozens of times over the years, just to check.' },
    { name: 'The Stone Watcher', role: 'golem guardian', personality: 'Its footsteps on gravel are the cemetery\'s heartbeat. One directive: nothing leaves after dark. Does not think. Does not tire. When it turns the corner of a row and sees the party, it does not speed up. It does not need to.' },
  ],
  keyLocations: [
    { name: 'Greymoor Cemetery', description: 'A fog-bound graveyard on a hill. Hundreds of headstones, ancient trees, and the constant sound of the golem\'s footsteps on gravel.', significance: 'The heist location.' },
    { name: 'Row 14, Plot 7', description: 'A fresh grave. Three days old. The earth is soft but the coffin is six feet down.', significance: 'The husband\'s grave.' },
    { name: 'Row 3, Plot 12', description: 'An old grave, ten years settled. Mord has kept the headstone polished and the plot clear of weeds.', significance: 'Mord\'s daughter\'s grave - the condition of the deal.' },
  ],
  dataSystems: ['heistPlanner', 'encounterWaves', 'combatNarration', 'chaseSequence'],
};
