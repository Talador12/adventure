import type { OneShotCampaign } from '../types';

export const theGroupSession: OneShotCampaign = {
  id: 'oneshot-group-session',
  type: 'oneshot',
  title: 'The Group Session',
  tagline: 'Court-mandated therapy. Your therapist is a mind flayer. He is trying his best.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A licensed therapeutic practice in the basement of the Adventurers\' Guild. The waiting room smells like lavender and existential dread. Every chair is slightly too small. The receptionist is a mimic pretending to be a desk and doing a passable job. The practice is run by Dr. Quallix, a mind flayer who completed a seven-year psychology program at the Arcane University and is genuinely, earnestly committed to helping people process their feelings. He just keeps accidentally reading their thoughts.',
  hook:
    'After a "workplace incident" (a dungeon collapse, a Fireball cast in a residential district, friendly fire involving a polymorphed party member, and an insurance claim that made the Guild weep), the party has been mandated to attend group therapy before they can take another contract. Dr. Quallix greets them warmly. His tentacles twitch.',
  twist:
    'Dr. Quallix accidentally reads a thought that reveals one party member is genuinely struggling - not in a funny way but in a real way. The comedy pauses. The mind flayer drops his clipboard and says: "That is not a joke. Let us talk about that." The session becomes briefly, unexpectedly real before the receptionist-mimic eats someone\'s intake form and chaos resumes.',
  climax:
    'The breakthrough moment. Each character says something honest. Dr. Quallix cries (mind flayer tears are slightly acidic and ruin his notepad). The barbarian in the waiting room bursts in because he heard crying and wants to give everyone a hug. He is 7 feet tall and smells like elk. It is the most healing thing that has happened to anyone in years.',
  scenes: [
    {
      title: 'The Intake Forms',
      summary:
        'The party arrives in the waiting room and must fill out intake forms. The forms ask questions like "On a scale of 1-10, how haunted are you?" and "Have you ever been polymorphed against your will? If yes, into what?" A barbarian named Grok is in the waiting room. He has been smashing the magazines.',
      challenge: 'social',
      keyEvents: [
        'Each character fills out an intake form with increasingly absurd questions',
        'The receptionist-mimic eats a pen and nobody acknowledges it',
        'Grok the barbarian introduces himself: "I am here because I feel TOO MUCH"',
        'Dr. Quallix opens his office door with a warm smile that is mostly tentacles',
      ],
    },
    {
      title: 'The Sharing Circle',
      summary:
        'Dr. Quallix facilitates the sharing circle. Each character must describe their trauma - the dungeon collapse, the Fireball incident, the friendly fire. It starts funny. Then Dr. Quallix accidentally reads a real thought and it gets briefly, powerfully sincere.',
      challenge: 'social',
      keyEvents: [
        'Each player describes their character\'s version of the "workplace incident" - wildly contradictory accounts',
        'Dr. Quallix keeps accidentally reading thoughts and apologizing: "I am so sorry, I heard that. That was private."',
        'The comedy shifts when Quallix reads something genuine and stops the jokes cold',
        'A moment of real vulnerability before Grok bursts in asking if anyone wants trail mix',
      ],
    },
    {
      title: 'The Trust Fall and Breakthrough',
      summary:
        'The final exercise: trust falls. The safety net is a gelatinous cube that Dr. Quallix assures them is "completely tame and very supportive." The trust falls go wrong in every possible way but end with a genuine moment of connection.',
      challenge: 'exploration',
      keyEvents: [
        'The gelatinous cube safety net wobbles encouragingly',
        'Trust falls devolve into chaos - someone gets partially dissolved, someone refuses to fall, someone falls backward and misses the cube entirely',
        'Dr. Quallix gives a genuinely moving speech about vulnerability that he clearly rehearsed',
        'The breakthrough: everyone says one honest thing, Grok bear-hugs the whole group, the mimic-desk claps with a drawer',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Dr. Quallix',
      role: 'therapist / mind flayer',
      personality:
        'A mind flayer who chose psychology over brain-eating. Graduated top of his class. Keeps a "World\'s Best Therapist" mug on his desk (a gift from a grateful patient). Tentacles twitch when he is emotionally moved. "I do not eat brains anymore. I HEAL them."',
      secret: 'He went into therapy because he was the one who needed it first. His colony exiled him for being "too empathetic."',
    },
    {
      name: 'Grok',
      role: 'waiting room barbarian / comic relief / emotional support',
      personality:
        'An enormous barbarian attending anger management. Has been in the waiting room for three sessions because he keeps smashing the magazines instead of reading them. Surprisingly emotionally intelligent. Gives the best hugs in the realm.',
    },
    {
      name: 'The Desk',
      role: 'receptionist / mimic',
      personality:
        'A mimic who applied for the receptionist job and got it on merit. Handles scheduling, files, and intake forms. Occasionally eats a pen. Never breaks character. "Your 3 o\'clock is here, Doctor."',
    },
  ],
  keyLocations: [
    {
      name: 'The Waiting Room',
      description:
        'Lavender-scented, slightly too warm, with motivational posters like "Hang In There" featuring a cat on a staff of fireball. The magazines are shredded. Grok apologizes.',
      significance: 'Where intake forms are filled out and the tone is set.',
    },
    {
      name: 'Dr. Quallix\'s Office',
      description:
        'A warm, dimly lit room with a circle of comfortable chairs, a shelf of psychology texts (several in Deep Speech), and a gelatinous cube in the corner labeled "Emotional Support Cube."',
      significance: 'Where the sharing circle and breakthrough happen.',
    },
    {
      name: 'The Trust Fall Room',
      description:
        'A padded room (for safety, not the other reason) with a raised platform and a large gelatinous cube in a kiddie pool. A sign reads: "Fall. Be Caught. Grow."',
      significance: 'Where the final exercise and climax take place.',
    },
  ],
  dataSystems: ['socialEncounter', 'fantasyInsults', 'npcPersonality', 'combatNarration'],
};
