import type { OneShotCampaign } from '../types';

export const theExitInterview: OneShotCampaign = {
  id: 'oneshot-exit-interview',
  type: 'oneshot',
  title: 'The Exit Interview',
  tagline: 'You quit the villain\'s organization. HR would like a word.',
  tone: 'comedic',
  themes: ['comedy', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  level: 8,
  estimatedHours: 4,
  settingSummary: 'The party used to work for the Dark Lord. They quit. Now the Dark Lord\'s HR department has scheduled mandatory exit interviews before they can officially leave. The interview involves fighting through the exit interview dungeon, filling out termination paperwork, returning company property (cursed items), and sitting through a 2-hour feedback session with a very persistent HR lich.',
  hook: 'A skeletal courier delivers a scroll: "Dear Former Minion, Your resignation has been received. Per Dark Lord Enterprises employee handbook Section 14.2, all departing staff must complete an exit interview before final separation. Report to HR Tower, Level -7, at 9 AM sharp. Failure to appear voids your severance package (you get to keep your soul)."',
  twist: 'The HR lich doesn\'t want them to leave — not because of loyalty to the Dark Lord, but because the Dark Lord has been terrible to HR too. The lich wants the party to take him WITH them. The "exit interview" is a cover for the lich\'s own escape plan.',
  climax: 'The final form: the Dark Lord himself arrives for the "meeting." The party, the HR lich, and a surprisingly supportive group of ex-minions must escape the Evil Corporate Tower while the Dark Lord screams about "two weeks\' notice" and "breaching their non-compete."',
  scenes: [
    { title: 'Scene 1: Processing', summary: 'Arriving at the Evil Corporate Tower. Signing in. Getting visitor badges (they expired when you quit). Navigating evil corporate bureaucracy.', challenge: 'social', keyEvents: ['The lobby: skulls on the walls, motivational posters ("Obey or Die"), a water cooler that dispenses tears', 'The receptionist (skeleton) insists on the correct forms — in triplicate, signed in blood', 'The elevator to HR: it goes DOWN, past levels named "Torture," "Accounting" (worse), and "HR"', 'HR Level -7: cubicles made of bone, a break room with stale soul-cookies'] },
    { title: 'Scene 2: The Interview', summary: 'The HR lich conducts the interview. Questions include "What could we have done to retain you?" and "Would you recommend Dark Lord Enterprises to a friend?"', challenge: 'social', keyEvents: ['Question 1: "On a scale of 1 to 10, how evil was your experience?"', 'Question 2: "What improvements would you suggest for the Doom Pits?"', 'The lich drops hints: "What if, hypothetically, someone in HR wanted to leave TOO?"', 'The lich\'s proposal: "Get me out and I\'ll give you the back exit codes"'] },
    { title: 'Scene 3: The Escape', summary: 'The Dark Lord arrives. The party, the lich, and several other ex-minions make a break for it through the Evil Corporate Tower.', challenge: 'combat', keyEvents: ['The Dark Lord: "YOU CAN\'T QUIT. I HAVEN\'T APPROVED YOUR FORM 12-B."', 'Running through the tower: traps, guards, and the elevator is out of service', 'The lich helps: disabling wards, opening doors, filing emergency exit paperwork', 'Freedom: the exit is a revolving door that literally revolves through dimensions'] },
  ],
  keyNPCs: [
    { name: 'Mortimer the HR Lich', role: 'interviewer / secret ally', personality: 'An undead bureaucrat who is trapped in the worst job in the evil empire. "I\'ve been in HR for 400 years. I have processed 30,000 exit interviews. PLEASE take me with you."' },
    { name: 'The Dark Lord', role: 'former employer / antagonist', personality: 'A villain who takes employee retention personally. Not threatening so much as aggressively managerial. "Your non-compete clause is BINDING. I WILL see you in Infernal Court."' },
    { name: 'Karen (front desk)', role: 'obstacle / skeleton receptionist', personality: 'A skeleton who runs the front desk with ruthless efficiency. "Do you have an appointment? No? Then please take a number. Your number is 47,000. Current serving: 12."' },
  ],
  keyLocations: [
    { name: 'Dark Lord Enterprises Tower', description: 'An evil corporate tower that combines dungeon aesthetics with office park functionality. The worst of both worlds.', significance: 'The entire one-shot takes place here.' },
    { name: 'HR Level -7', description: 'A floor of bone cubicles, soul-powered copiers, and a break room where the coffee is tears.', significance: 'Where the interview and alliance happen.' },
    { name: 'The Exit', description: 'A revolving door at the base of the tower that literally spins through dimensions. Getting there is the challenge.', significance: 'The escape target.' },
  ],
  dataSystems: ['socialEncounter', 'trapDisarm', 'heistPlanner', 'fantasyInsults', 'combatNarration', 'puzzleLock'],
};
