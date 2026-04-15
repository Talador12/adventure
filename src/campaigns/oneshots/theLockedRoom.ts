import type { OneShotCampaign } from '../types';

export const theLockedRoom: OneShotCampaign = {
  id: 'oneshot-locked-room',
  type: 'oneshot',
  title: 'The Locked Room',
  tagline: 'A noble is dead in a sealed chamber. No doors opened. No windows broken. No magic detected. Someone killed him.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Lord Aldric Vane is found dead in his study, locked from the inside. Iron bolts, no windows, no secret passages (the party checks). Detect Magic reveals nothing. The city guard is baffled. The party is hired to solve the impossible murder.',
  hook: 'The locksmith who opened the door is still shaking. "Bolted from inside. Both bolts. The man is dead at his desk with a knife in his chest. Nobody went in. Nobody came out. I checked the bolts myself three times."',
  twist:
    'The killer is the knife itself. A sentient cursed dagger that can telekinetically throw itself. The lord bought it at auction. It waited until he was alone, locked in, and struck. The dagger has killed before. It always frames someone else.',
  climax:
    'The party deduces the weapon is the killer. The dagger tries to frame the butler by flying into his hand. The party must contain a sentient weapon that can move on its own and has been orchestrating murders for decades across multiple cities.',
  scenes: [
    {
      title: 'Scene 1: The Crime Scene',
      summary: 'Examination of the sealed room. The body, the bolts, the lack of any entry point. Classic locked-room investigation.',
      challenge: 'exploration',
      keyEvents: [
        'The body: Lord Vane, stabbed in the chest. Expression of surprise.',
        'The room: iron bolts on the door, no windows, solid stone walls. No secret passages.',
        'Detect Magic shows nothing on the room or the body. The knife radiates faintly but "all magic weapons do."',
        'Suspects: the butler, the wife, the business partner. All have motive. None had access.',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary: 'Interviewing suspects, checking alibis, and running into dead ends. Every lead points nowhere because the true killer is sitting on the evidence table.',
      challenge: 'puzzle',
      keyEvents: [
        'The butler: alibi confirmed by three witnesses. The wife: in another city. The partner: at a public event.',
        'Research reveals the dagger was bought at auction six months ago. Previous owner also died strangely.',
        'A pattern: every owner of this dagger has died in a locked room. Five deaths. Five cities.',
        'The dagger is tested. It reacts to handling. Something is in there.',
      ],
    },
    {
      title: 'Scene 3: The Living Weapon',
      summary: 'The dagger reveals itself. It tries to frame the butler. The party must contain a sentient killer that can fly.',
      challenge: 'combat',
      keyEvents: [
        'The dagger moves on its own. It flies toward the butler\'s hand.',
        'If it touches him, his prints are on the murder weapon. Perfect frame.',
        'Combat: a flying sentient dagger. Small, fast, and very sharp.',
        'Containment: antimagic, lead-lined box, or destroying it. The dagger pleads for its life.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Inspector Morwen',
      role: 'city guard investigator',
      personality: 'Methodical, skeptical, exhausted. She has been on the force for twenty years and this is the first case that makes no sense.',
    },
    {
      name: 'The Whisper Blade',
      role: 'sentient dagger / the actual killer',
      personality: 'Intelligent, manipulative, and enjoying the game. It has been killing for decades and being passed from owner to owner. It considers murder an art form.',
      secret: 'It was made by an assassin who bound his soul into the blade at death. He cannot stop killing. It is compulsion, not choice.',
    },
  ],
  keyLocations: [
    {
      name: 'Lord Vane\'s Study',
      description: 'A sealed stone room with iron-bolted doors, a dead noble, and no explanation.',
      significance: 'The impossible crime scene. The answer is in the room, sitting on the desk.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'combatNarration'],
};
