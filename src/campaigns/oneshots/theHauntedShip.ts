import type { OneShotCampaign } from '../types';

export const theHauntedShip: OneShotCampaign = {
  id: 'oneshot-haunted-ship',
  type: 'oneshot',
  title: 'The Haunted Ship',
  tagline: 'The cruise was supposed to be relaxing. The ghosts have other plans.',
  tone: 'horror',
  themes: ['horror', 'nautical'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 4,
  settingSummary: 'The party wins tickets to a luxury cruise on the Golden Dawn — a floating palace. On the first night, they discover the ship is haunted by the ghosts of its maiden voyage passengers, who all died in a mysterious catastrophe 50 years ago. The ghosts don\'t know they\'re dead and repeat their last evening endlessly — unless disturbed.',
  hook: 'First night, dinner service. The party notices a guest walk through a wall. A waiter serves drinks from an empty tray. The captain\'s portrait above the bar blinks. The entertainment announces: "Welcome to the Golden Dawn\'s maiden voyage. We hope your stay is... eternal."',
  twist: 'The ship isn\'t haunted — it\'s a trap. A sea hag sank the original Golden Dawn and has been using the ghosts to lure living passengers aboard as sacrifices. The "luxury cruise" is an illusion. The ship is a rotting hulk held together by the hag\'s magic.',
  climax: 'The illusion cracks — the luxury ship becomes a rotting wreck. The hag reveals herself. The ghosts, freed from their loop by the party\'s intervention, choose to help fight. A battle on a disintegrating ship at midnight, with ghost allies and a sea hag who controls the ocean.',
  scenes: [
    { title: 'Scene 1: The Perfect Evening', summary: 'Luxury, entertainment, and subtle wrongness. A guest who doesn\'t reflect in mirrors. A meal that tastes of nothing. A ballroom where everyone dances the same waltz.', challenge: 'exploration', keyEvents: ['The cruise: opulent, beautiful, and just slightly off', 'First ghost encounter: a guest who doesn\'t reflect, doesn\'t eat, and repeats the same conversation', 'The captain\'s log: the last entry is from 50 years ago', 'A ghost realizes the party is different: "You\'re... warm. Why are you warm?"'] },
    { title: 'Scene 2: The Loop Breaks', summary: 'The party disrupts the ghostly repetition. Memories surface. The truth about the maiden voyage is revealed.', challenge: 'exploration', keyEvents: ['Breaking the loop: a ghost remembers the water, the screaming, the sinking', 'The ship flickers: luxury one moment, rotting wreck the next', 'The hag\'s agents: sea spawn that guard the lower decks', 'The engine room: not an engine — a ritual circle, powered by trapped ghost energy'] },
    { title: 'Scene 3: The Wreck', summary: 'The illusion fails. The ship is a ruin. The hag attacks. The ghosts choose to fight.', challenge: 'combat', keyEvents: ['The ship transforms: opulent halls become rotting corridors', 'The sea hag manifests: rising from the water with the ocean at her command', 'Ghost allies: the freed passengers join the fight — spectral attacks, possession assists', 'The ship is sinking (for real this time) — fight the hag and escape'] },
  ],
  keyNPCs: [
    { name: 'Captain Aldric (ghost)', role: 'ghost captain / ally', personality: 'The ghost of the original captain. When he remembers the sinking, he is furious — at the hag, at himself for not saving his passengers, and at 50 years of stolen rest.' },
    { name: 'The Sea Hag (Brine)', role: 'antagonist', personality: 'An ancient sea hag who sank the Golden Dawn for its souls. Collects ghosts the way others collect shells. "You were supposed to be tonight\'s offering. How tedious that you\'re resisting."' },
    { name: 'Elise (ghost passenger)', role: 'tragic figure / information', personality: 'A young woman who was on her honeymoon when the ship sank. She\'s the first ghost to remember, and her grief breaks the loop for others.' },
  ],
  keyLocations: [
    { name: 'The Golden Dawn', description: 'A luxury cruise ship that is simultaneously beautiful and rotting, depending on whether the illusion is up.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Ballroom', description: 'Where the ghosts dance the same waltz forever. When the loop breaks, the music becomes a funeral dirge.', significance: 'Where the loop is broken.' },
    { name: 'The Engine Room', description: 'Not an engine — a ritual circle trapping ghost energy. The hag\'s power source.', significance: 'Where the hag\'s magic can be disrupted.' },
  ],
  dataSystems: ['hauntedLocation', 'navalCombat', 'shipwreckGenerator', 'encounterWaves', 'deathSaveDrama', 'combatNarration'],
};
