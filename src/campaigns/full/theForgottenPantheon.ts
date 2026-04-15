import type { FullCampaign } from '../types';

export const theForgottenPantheon: FullCampaign = {
  id: 'full-the-forgotten-pantheon',
  type: 'full',
  title: 'The Forgotten Pantheon',
  tagline: 'The gods are dying. Something older than divinity is coming home.',
  tone: 'epic',
  themes: ['epic', 'planar', 'dark_fantasy'],
  playerCount: { min: 4, max: 6 },
  levelRange: { start: 5, end: 20 },
  estimatedSessions: 24,
  settingSummary:
    'The gods are failing. One by one, divine domains go silent. Clerics lose spells. Temples crumble. Paladins feel their oaths dissolve. The party witnesses a god die - not in battle, but in dissolution, unraveling like thread pulled from cloth. Something is unmaking the divine. The party must cross planes, consult dead gods, and confront a force that existed before divinity, before mortals, before creation itself. A force that is not destroying the gods. It is reclaiming them.',
  hook: 'The party\'s cleric loses their spells mid-combat. Across the continent, every cleric of Pelor screams simultaneously as their god\'s domain flickers. By sunset, Pelor is gone - not dead, not defeated, just absent, as if he never existed. His temples still stand but the holy symbols are blank. The faithful remember him but the world does not. The party has a vision: a voice older than language says, "They were never yours."',
  twist:
    'The gods are not being killed. They are being returned to what they were before worship gave them form. The primordial force - called the Unspoken - is the universe\'s original state: raw potential, undifferentiated, without identity. The gods were shaped from this potential by mortal belief. They are, in a sense, the universe\'s daydream, given form by worship. The Unspoken is not evil. It is entropy returning the borrowed material. The gods were the aberration. The Unspoken is the natural order.',
  climax:
    'The last god stands: a young deity created by the faith of children, barely formed, terrified. The Unspoken comes for it. The party must make the argument of their lives: that consciousness, identity, and meaning are not aberrations but the universe\'s purpose. They must convince a force without ego, without desire, without self, that becoming something is worth the cost of no longer being everything. The debate is fought with words, with memory, with the weight of mortal experience.',
  acts: [
    {
      title: 'Act 1: The Silence',
      summary: 'Gods begin to vanish. The party investigates, crossing into divine planes to find them empty. The pattern becomes clear: the oldest gods fall first.',
      keyEvents: [
        'Pelor\'s dissolution: witnessed by millions. Clerics worldwide lose their connection.',
        'Investigation: other gods are weakening. Moradin\'s forges cool. Corellon\'s forests wilt.',
        'The party enters the Astral Plane and finds a god\'s throne empty - just formless potential where a deity sat',
        'A dead god\'s library: records of what existed before the pantheon. A name that predates names.',
      ],
      estimatedSessions: 7,
    },
    {
      title: 'Act 2: The Unmaking',
      summary: 'More gods fall. The party races to understand the Unspoken. Allies are scarce - who helps when the gods themselves cannot?',
      keyEvents: [
        'Half the pantheon is gone. The planes are destabilizing. Weather, magic, and reality glitch.',
        'A surviving god speaks directly to the party: "It is not attacking us. It is waking up. We are its dream."',
        'The party finds the Unspoken\'s edge: a region of reality where things lose definition. Colors blur. Identities merge.',
        'An audience with the Unspoken itself: not hostile, not aware, not anything. It is the absence of identity becoming present.',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Argument',
      summary: 'The last gods, the final confrontation, and the case for existence itself.',
      keyEvents: [
        'The last pantheon: a handful of young gods, created by recent faith, protected by the party',
        'The Unspoken reaches the material plane. Reality simplifies. Mountains lose their names.',
        'The argument: the party must embody what identity means. Mortal experience as evidence for existence.',
        'The resolution: the Unspoken does not retreat. It integrates. The gods are reborn as something new - divine and primal, shaped and shapeless.',
      ],
      estimatedSessions: 9,
    },
  ],
  keyNPCs: [
    {
      name: 'The Witness',
      role: 'last archivist of the divine',
      personality: 'An immortal record-keeper who existed before the gods and remembers what the universe was like without them. Neutral, precise, and deeply sad. "I have watched seventeen pantheons rise. This is the first time I have watched one dissolve from the inside."',
      secret: 'She was created by the Unspoken as a witness. She is, in a sense, its only conscious fragment.',
    },
    {
      name: 'Istara, the Fearful',
      role: 'the last god / the stakes',
      personality: 'A young goddess born from children\'s prayers. She governs small comforts: warm beds, bedtime stories, the feeling of safety. She is barely a century old and she is terrified. "I do not want to stop being me. Is that wrong?"',
    },
    {
      name: 'The Unspoken',
      role: 'the force / the antagonist without malice',
      personality: 'Not a character. A state of being. It does not want anything because wanting requires identity. It is the universe before it decided to be something. Communicating with it is like arguing with gravity.',
    },
    {
      name: 'High Inquisitor Varek',
      role: 'mortal antagonist',
      personality: 'A former paladin who lost his god and concluded that the gods were parasites on mortal belief. He wants the Unspoken to finish the job. "We prayed and they ate our prayers. We are better without them."',
    },
  ],
  keyLocations: [
    { name: 'The Empty Thrones', description: 'The Astral Plane\'s divine seats, now vacant. Each throne holds the shape of its god like an imprint in sand, slowly smoothing.', significance: 'Where the investigation begins and the scope of the crisis becomes clear.' },
    { name: 'The Blur', description: 'The edge of the Unspoken\'s influence. A region where reality loses resolution: colors fade, sounds merge, names are forgotten.', significance: 'The boundary between existence and potential.' },
    { name: 'The Nursery', description: 'A hidden plane where the youngest gods shelter. Protected by mortal faith, fragile, and the last line of defense.', significance: 'Where the final stand takes place.' },
  ],
  dataSystems: ['cataclysmCountdown', 'ancientProphecy', 'magicalAnomaly', 'encounterWaves', 'factionWar', 'diplomaticNegotiation', 'dreamSequence', 'legendaryWeapon'],
};
