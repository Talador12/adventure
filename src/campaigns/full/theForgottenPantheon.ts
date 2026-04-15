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
        'Quiet moment: a cleric of Pelor sits in his empty temple at dawn. Light comes through the window but it is just light now. Nothing answers his prayer. The party watches a man lose his purpose.',
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
        'The moment of cost: Varek destroys a temple to Istara, the child-goddess, claiming he is liberating mortals from divine parasitism. If the party defended temples in Act 1, they have allies who warn them. If not, the temple falls before they arrive.',
        'A surviving god speaks directly to the party: "It is not attacking us. It is waking up. We are its dream."',
        'Quiet moment: The Witness shares a memory of the very first prayer ever spoken. A mortal child, alone and afraid, reaching out to the universe. Something answered. "That was the moment the universe stopped being alone," she says.',
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
        'Quiet moment: Istara asks the party to tell her a bedtime story. She is barely a century old and she is afraid of the dark. The party tells her a story. She listens like a child. She IS a child, despite being divine.',
        'The argument: the party must embody what identity means. Mortal experience as evidence for existence. If Varek has been turned, he stands with the party. If not, he argues for dissolution alongside the Unspoken.',
        'The resolution: the Unspoken does not retreat. It integrates. The gods are reborn as something new - divine and primal, shaped and shapeless.',
      ],
      estimatedSessions: 9,
    },
  ],
  keyNPCs: [
    {
      name: 'The Witness',
      role: 'last archivist of the divine',
      personality:
        'An immortal record-keeper who existed before the gods and remembers what the universe was like without them. Neutral, precise, and deeply sad. "I have watched seventeen pantheons rise. This is the first time I have watched one dissolve from the inside." Arc: in Act 1 she is a distant source of exposition. By Act 2 she shares memories that reveal she loves what the universe became. In Act 3 she faces her own dissolution and chooses to testify for identity.',
      secret: 'She was created by the Unspoken as a witness. She is, in a sense, its only conscious fragment.',
    },
    {
      name: 'Istara, the Fearful',
      role: 'the last god / the stakes',
      personality:
        'A young goddess born from children\'s prayers. She governs small comforts: warm beds, bedtime stories, the feeling of safety. She is barely a century old and she is terrified. "I do not want to stop being me. Is that wrong?" Arc: fragile and hidden in Act 2, then in Act 3 she stands before the Unspoken and says the simplest, truest thing anyone has ever said to entropy.',
    },
    {
      name: 'The Unspoken',
      role: 'the force / the antagonist without malice',
      personality:
        'Not a character. A state of being. It does not want anything because wanting requires identity. It is the universe before it decided to be something. Communicating with it is like arguing with gravity. It does not hate. It cannot.',
    },
    {
      name: 'High Inquisitor Varek',
      role: 'mortal antagonist',
      personality:
        'A former paladin who lost his god and concluded that the gods were parasites on mortal belief. He wants the Unspoken to finish the job. "We prayed and they ate our prayers. We are better without them." Arc: in Act 1 he is a dangerous zealot. In Act 2 the party can challenge his certainty by showing him Istara - a god made entirely of children\'s comfort. In Act 3, he either stands with the party or speaks for the void.',
    },
  ],
  keyLocations: [
    {
      name: 'The Empty Thrones',
      description:
        'The Astral Plane\'s divine seats, now vacant. Each throne holds the shape of its god like an imprint in sand, slowly smoothing. Offerings still appear on the altars. The faithful do not know their gods are gone.',
      significance: 'Where the investigation begins and the scope of the crisis becomes clear.',
    },
    {
      name: 'The Blur',
      description:
        'The edge of the Unspoken\'s influence. A region where reality loses resolution: colors fade, sounds merge, names are forgotten. Step too far in and you forget your own.',
      significance: 'The boundary between existence and potential.',
    },
    {
      name: 'The Nursery',
      description:
        'A hidden plane where the youngest gods shelter. Protected by mortal faith, fragile, and the last line of defense. Istara\'s domain feels like a warm blanket and smells like a bakery. It is built from the prayers of children.',
      significance: 'Where the final stand takes place.',
    },
  ],
  dataSystems: [
    'cataclysmCountdown',
    'ancientProphecy',
    'magicalAnomaly',
    'encounterWaves',
    'factionWar',
    'diplomaticNegotiation',
    'dreamSequence',
    'legendaryWeapon',
  ],
};
