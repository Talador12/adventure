import type { FullCampaign } from '../types';

export const theVaultOfSouls: FullCampaign = {
  id: 'full-vault-of-souls',
  type: 'full',
  title: 'The Vault of Souls',
  tagline: 'You died to get in. You have seven days to rob a god.',
  tone: 'heist',
  themes: ['heist', 'planar', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 7, end: 14 },
  estimatedSessions: 14,
  settingSummary:
    'The Pallid Reaches - the grey afterlife where unclaimed souls drift until they fade. At its center stands the Vault of Kelemvor, where the god of death stores souls taken before their time. The living cannot enter. So the party drinks a carefully measured poison, dies on a timer, and wakes up in a colorless wasteland with exactly seven days before the poison finishes the job for real. The vault is guarded by dead heroes who chose eternal service over oblivion.',
  hook: 'Maren, a grief-hollowed woman, hires the party with a simple pitch: her daughter was taken by a soul collector acting outside divine law. The girl is in Kelemvor\'s vault, filed away like a ledger entry. No god will intervene. No prayer will reach. The only option is to die, walk in, and steal her back. Maren has the poison. She has the map. She does not have the seven days of life it would cost.',
  twist:
    'The daughter, Lira, was not taken unjustly. She made a deal with the soul collector willingly - trading her soul to cure her mother of a terminal illness Maren does not even know she had. Lira chose to be in the vault. She does not want to leave. The party must decide whether to honor a child\'s sacrifice or override it because a mother is breaking apart.',
  climax:
    'Inside the vault\'s deepest chamber, Lira refuses to leave. The dead heroes close in. The seven-day timer is almost up. The party can force Lira out (breaking the deal and returning Maren\'s illness), convince Lira to let go (which means explaining the truth to Maren), or find a third option - offering something of their own to renegotiate the deal with the soul collector, who has been watching them the entire heist with amusement.',
  acts: [
    {
      title: 'Act 1: The Dying',
      summary:
        'The party prepares for death. They drink the poison, cross into the Pallid Reaches, and begin navigating a grey wasteland full of drifting souls who have forgotten their own names. The clock is ticking from moment one.',
      keyEvents: [
        'Maren explains the job: her daughter Lira was taken, the vault holds her, only the dead can enter',
        'The party drinks the measured poison and dies - character death scenes played for weight',
        'Waking in the Pallid Reaches: colorless, cold, populated by fading souls',
        'First encounter with the Faded - souls who stayed too long and lost themselves',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Dead Walk',
      summary:
        'Crossing the Pallid Reaches toward the vault. The party encounters dead heroes serving as wardens, navigates traps designed to catch soul-thieves, and begins to suspect the job is not what Maren described.',
      keyEvents: [
        'The Hero Wardens - dead champions who guard the vault paths, each a legendary figure',
        'A warden offers information in exchange for a memory - the party must trade pieces of themselves',
        'The soul collector appears, cryptic and amused: "She came to me. I did not take her."',
        'Discovery of Lira\'s deal: her soul for her mother\'s cure, signed willingly',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Vault',
      summary:
        'The heist itself. Breaking into Kelemvor\'s vault, finding Lira, confronting the truth, and getting out before the poison finishes the job. Every decision carries permanent weight.',
      keyEvents: [
        'Vault infiltration: layers of divine wards, soul-locked doors, hero guardians',
        'Finding Lira - she is at peace, she does not want rescue, she chose this',
        'The choice: force her out (curse returns to Maren), accept her sacrifice, or renegotiate',
        'The escape: the poison timer hits zero as the party races back to the living world',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Maren',
      role: 'quest giver',
      personality:
        'Hollow-eyed, steady-handed, running on nothing but grief and determination. She has planned every detail of this heist except the possibility that her daughter chose to leave.',
      secret: 'She has a terminal illness she does not know about. Lira cured it without telling her.',
    },
    {
      name: 'Lira',
      role: 'the "stolen" soul',
      personality:
        'A twelve-year-old girl who made the hardest decision an adult would struggle with. Calm in a way that is heartbreaking. "I am not lost, I am where I chose to be."',
    },
    {
      name: 'The Soul Collector (Verath)',
      role: 'ambiguous antagonist',
      personality:
        'Not evil. Not good. A functionary of death who honors deals. Watches the heist with the detached interest of someone watching a chess game. Will not help. Will not hinder. Will enforce contracts.',
      secret: 'Verath is tired of the job and quietly hopes the party finds a loophole.',
    },
    {
      name: 'Ser Aldwyn the Undying',
      role: 'vault guardian',
      personality:
        'A dead paladin who chose eternal guard duty over paradise. Takes the job seriously but respects courage. Will fight the party if he must, but would rather they prove their cause is just.',
    },
  ],
  keyLocations: [
    {
      name: 'The Pallid Reaches',
      description: 'An infinite grey wasteland where unclaimed souls drift. No color, no warmth, no sound except the wind.',
      significance: 'The party must cross it to reach the vault, losing time with every detour.',
    },
    {
      name: 'The Vault of Kelemvor',
      description: 'A fortress of black stone and silver light. Souls stored in crystalline chambers, catalogued and filed. Beautiful and horrifying.',
      significance: 'The heist target. Lira is inside.',
    },
    {
      name: 'The Threshold',
      description: 'The border between death and life - a shimmering wall of light that the living cannot see and the dead cannot touch without permission.',
      significance: 'The exit. The party must reach it before the poison kills them permanently.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'trapDisarm',
    'puzzleLock',
    'clockworkDungeon',
    'moralDilemma',
    'encounterWaves',
    'planarTravel',
    'countdownClock',
  ],
};
