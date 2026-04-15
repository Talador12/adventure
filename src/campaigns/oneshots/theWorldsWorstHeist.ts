import type { OneShotCampaign } from '../types';

export const theWorldsWorstHeist: OneShotCampaign = {
  id: 'oneshot-the-worlds-worst-heist',
  type: 'oneshot',
  title: 'The World\'s Worst Heist',
  tagline: 'Everything goes wrong from minute one. Every mistake accidentally solves the next problem.',
  tone: 'shenanigans',
  themes: ['heist', 'comedy', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The Goldspire Bank of Velmara is the most secure vault in the realm. Triple-warded doors, guard golems, alarm crystals, and a vault that only opens during a full moon. The party has been hired by a desperate nobleman to steal back his family heirloom from the vault. He gave them a map, disguises, a timeline, and a getaway plan. Every single piece of intel is wrong. The map is upside down. The disguises are for the wrong bank. The timeline is for last month\'s guard rotation. The getaway horse is a donkey that refuses to move. But through cascading failures, each mistake accidentally creates the conditions for the next step to work.',
  hook: 'The plan begins at midnight. The party arrives at the bank in their disguises: matching uniforms for the GOLDLEAF Bank across the street. They are at the wrong bank. When confronted by the guard, the rogue\'s explanation is so absurdly confident that the guard assumes they must be secret inspectors (Goldspire has been expecting an audit). The party is escorted inside as VIPs. They are now inside the bank for completely the wrong reasons, with completely the wrong plan, and somehow in a better position than if things had gone right.',
  twist:
    'The nobleman who hired them is the bank manager. He embezzled funds, hid the evidence in the vault disguised as a "family heirloom," and hired the most incompetent thieves he could find so the heist would fail visibly, giving him an excuse to increase security and lock the vault permanently with the evidence inside. The party\'s accidental success is his worst nightmare. Every mistake they make keeps working, and he cannot understand why.',
  climax:
    'The party reaches the vault through a series of accidental victories. The bank manager arrives in a panic, revealing himself as their employer. He tries to stop them. The vault opens (someone leaned on the moon-phase lever by accident) and the "family heirloom" turns out to be accounting ledgers proving his embezzlement. The party, holding evidence of a crime they were hired to steal, must decide: return the ledgers to the authorities (doing the right thing by accident), give them to the manager (completing the job as hired), or use them as leverage (accidentally becoming the most successful heist crew in Velmara through pure incompetence).',
  scenes: [
    {
      title: 'Scene 1: The Wrong Everything',
      summary:
        'The party arrives with wrong disguises, a wrong map, and a wrong timeline. Each mistake cascades into an accidental advantage. Wrong disguises get them treated as auditors. The upside-down map leads them to the correct floor by accident. The wrong guard rotation means fewer guards than expected.',
      challenge: 'social',
      keyEvents: [
        'Wrong disguises: the party arrives in Goldleaf Bank uniforms at Goldspire Bank. The guard assumes they are secret auditors.',
        'Wrong map: read upside down, the map points them to the basement instead of the top floor. The vault is in the basement. The map was wrong AND right.',
        'Wrong timeline: they expected guards at every door. The guard rotation changed and there are FEWER guards than the wrong intel suggested.',
        'The party is given a full tour as "inspectors" and shown the security systems they need to bypass. The guards explain how everything works.',
      ],
    },
    {
      title: 'Scene 2: Failing Upward',
      summary:
        'The party attempts to bypass security using their terrible plan. Every step fails. Every failure triggers the next solution. Lockpick breaks in the lock? It jams the alarm mechanism. Set off a trap? It breaks the wall to the next room. Drop the smoke bomb early? Guards evacuate the floor.',
      challenge: 'puzzle',
      keyEvents: [
        'The rogue\'s lockpick breaks in the lock. The broken pick jams the alarm crystal connected to the lock. Alarm disabled.',
        'The fighter accidentally triggers a pressure plate trap. The trap fires a crossbow bolt that shatters the ward crystal on the vault corridor door. Ward disabled.',
        'Someone drops a smoke bomb prematurely. Guards evacuate the floor. The party has 10 minutes alone with the vault.',
        'The wizard tries to Dispel Magic on the vault door. Wrong spell slot. Casts Prestidigitation instead. It cleans the door, revealing a hidden keyhole nobody knew about.',
      ],
    },
    {
      title: 'Scene 3: The Vault',
      summary:
        'The vault opens by accident. The heirloom is not what they expected. The bank manager arrives and the truth comes out. The party must make a decision with evidence of embezzlement in their hands and a very nervous nobleman between them and the exit.',
      challenge: 'social',
      keyEvents: [
        'Someone leans on a lever. It is the moon-phase vault control. The vault door opens. Nobody did this on purpose.',
        'Inside: not a family heirloom. Accounting ledgers. Detailed records of embezzlement. The "heirloom" was evidence.',
        'The bank manager arrives, sweating. "Give me those. That is what I hired you for. Give. Me. Those." The party realizes they were set up.',
        'The getaway donkey is still outside. It has not moved. It will not move. The party must resolve this with the donkey as their only exit strategy.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Ambrose Whitfield',
      role: 'quest giver / secret villain',
      personality:
        'A nervous, sweating nobleman who hired the party specifically because they seemed incompetent. He wanted a visible failed heist, not a successful one. He speaks in increasingly panicked half-sentences as the party accidentally succeeds at everything. "No no no. You were supposed to FAIL. How are you INSIDE?"',
      secret: 'He is the bank manager who embezzled 40,000 gold. The ledgers in the vault prove it.',
    },
    {
      name: 'Sergeant Ironhelm',
      role: 'head of security / unwitting ally',
      personality:
        'The bank\'s head guard who is convinced the party are legitimate auditors. He is extremely helpful, showing them every security system, explaining every weakness, and apologizing for the state of the ward crystals. He is very good at his job, which is why the party\'s accidental audit is so thorough.',
    },
    {
      name: 'Bartholomew (The Donkey)',
      role: 'getaway vehicle / immovable object',
      personality:
        'A donkey. Will not move. Has been tied to a post outside the bank since midnight. Has not moved. Will not move. The party was told this was a "swift steed." It is a donkey. It is eating a bush.',
    },
  ],
  keyLocations: [
    {
      name: 'Goldspire Bank of Velmara',
      description:
        'The most secure bank in the realm. Triple wards, guard golems, alarm crystals, and a vault that should be impenetrable. It is being penetrated by a group of people who have done literally nothing right.',
      significance: 'The entire heist takes place here. Every room is a chance for something to go wrong in the right way.',
    },
    {
      name: 'The Moon Vault',
      description:
        'A circular vault that only opens during specific lunar phases. Or if someone leans on the lever. Inside: neat rows of deposit boxes and one very incriminating set of accounting ledgers.',
      significance: 'The climax location where the truth is revealed.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'socialEncounter',
    'trapDisarm',
    'plotTwistEngine',
    'fantasyInsults',
    'heistGenerator',
  ],
};
