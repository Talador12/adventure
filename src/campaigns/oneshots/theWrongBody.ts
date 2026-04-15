import type { OneShotCampaign } from '../types';

export const theWrongBody: OneShotCampaign = {
  id: 'oneshot-wrong-body',
  type: 'oneshot',
  title: 'The Wrong Body',
  tagline: 'A body was found. Identified. Buried. Then the "dead" person walked into the tavern. Whose body was that?',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'Three days ago, the body of merchant Elias Crane was found in the river. His wife identified him. The funeral happened yesterday. This morning, Elias Crane walked into the Broken Compass tavern and ordered breakfast. He has no memory of the last week.',
  hook: 'Elias Crane sits at the bar, confused and hungry. His wife faints. The undertaker goes pale. The guards stare at the man they buried yesterday. "I went to bed Tuesday. I woke up in a field this morning. Why is everyone looking at me like I am dead?"',
  twist:
    'Elias was kidnapped and replaced with a doppelganger. The doppelganger was killed by a third party who mistook it for the real Elias. The kidnapper needed Elias alive for a specific purpose: his blood is the key to a magical vault. The kidnapper is furious that his replacement was murdered before the vault job was complete.',
  climax:
    'The kidnapper comes for Elias again, now that his cover story (Elias\'s "death") is ruined. The party must protect Elias, identify the kidnapper, and figure out who killed the doppelganger (a separate crime with separate motives).',
  scenes: [
    {
      title: 'Scene 1: The Living Dead',
      summary: 'Elias is alive. The body was someone else. The party must figure out who was actually buried.',
      challenge: 'exploration',
      keyEvents: [
        'Elias is real. Medical examination, Zone of Truth, everything confirms it.',
        'The grave is exhumed. The body has reverted: a doppelganger, dead, in its natural form.',
        'Elias\'s last memory: going to bed Tuesday. He woke in a field, disoriented.',
        'His wife is terrified. Someone replaced her husband and she did not notice.',
      ],
    },
    {
      title: 'Scene 2: Two Crimes',
      summary: 'Two separate mysteries: who kidnapped Elias and replaced him, and who killed the replacement.',
      challenge: 'puzzle',
      keyEvents: [
        'The kidnapping: Elias was drugged. Traces of a rare sleeping powder in his home.',
        'The murder: the doppelganger was drowned. Someone wanted "Elias" dead.',
        'The doppelganger had enemies of its own. It was impersonating Elias to access his business.',
        'Elias\'s blood is special: it opens a vault sealed by his ancestor\'s bloodline magic.',
      ],
    },
    {
      title: 'Scene 3: The Return',
      summary: 'The kidnapper comes back for Elias. The party must protect him and close both cases.',
      challenge: 'combat',
      keyEvents: [
        'The kidnapper: a thief who needs Elias\'s blood to open a family vault.',
        'He hired the doppelganger, then someone else killed it. He is as confused as everyone.',
        'The doppelganger\'s killer was a debt collector who thought it was the real Elias.',
        'The thief attacks. Protect Elias. Solve both crimes. Tie up every thread.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Elias Crane',
      role: 'victim / living dead man',
      personality: 'Keeps touching his own face as if confirming he is real. Orders a second breakfast because "I apparently missed three days of meals." Handles existential terror with dry humor and escalating wine consumption.',
    },
    {
      name: 'Vera Crane',
      role: 'wife / shaken witness',
      personality: 'Cannot stop staring at her husband. She buried him. She mourned him. She identified the body. How did she not know it was not him?',
    },
    {
      name: 'Corvin Shade',
      role: 'kidnapper / thief',
      personality: 'A professional thief who is having the worst week of his life. His doppelganger got killed, his target got buried, and now the target is back and everyone is watching.',
      secret: 'He does not want to hurt Elias. He just needs five drops of blood.',
    },
  ],
  keyLocations: [
    {
      name: 'The Broken Compass Tavern',
      description: 'Where a dead man orders breakfast and the entire town\'s understanding of reality breaks.',
      significance: 'Where the mystery begins.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
