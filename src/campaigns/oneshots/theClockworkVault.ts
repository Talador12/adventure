import type { OneShotCampaign } from '../types';

export const theClockworkVault: OneShotCampaign = {
  id: 'oneshot-clockwork-vault',
  type: 'oneshot',
  title: 'The Clockwork Vault',
  tagline: 'Rob a bank that is also a clock. The vault rotates every hour. You have three turns.',
  tone: 'heist',
  themes: ['heist', 'dungeon_crawl', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 6,
  estimatedHours: 3,
  settingSummary:
    'The First Mechanical Bank of Cogsworth is built inside a giant clock tower. The vault sits on a rotating platform that shifts to a new location within the building every hour on the hour. The party has been hired to steal a specific safety deposit box. They have three rotations to figure out the pattern, reach the vault, crack it, and escape.',
  hook: 'The fixer slides a blueprint across the table: "The vault moves. Every hour, it rotates to a new floor. Nine floors, nine positions, and the pattern changes daily. Your target is box 714. You enter at midnight. The vault rotates at 1, 2, and 3. Bank opens at 6. Three chances. Do not be inside when the gears turn."',
  twist: 'Box 714 does not contain gold or gems. It contains a deed - proof of ownership for half the city\'s waterfront. The client who hired the party is not a thief. She is the rightful owner, and the bank\'s president stole the deed and locked it away to seize her property. This is a heist to restore justice.',
  climax: 'The third rotation. The party knows the pattern now but the vault is on the ninth floor - the hardest to reach. The bank\'s clockwork golems have been activated. The gears are turning. The party must crack box 714, escape the vault before it rotates (crushing anything inside the mechanism), and get out of the building as the clock strikes 3.',
  scenes: [
    {
      title: 'Scene 1: First Rotation (Midnight-1AM)',
      summary: 'Entering the bank and figuring out how the rotating vault works. The first hour is reconnaissance.',
      challenge: 'exploration',
      keyEvents: [
        'Entry: through the maintenance tunnels, the roof, or a bribed night guard',
        'The mechanism: massive gears connect each floor - the vault slides on tracks between them',
        'First position: the vault is on floor 3 - accessible but the party does not have the combination yet',
        'The combination clue: each floor has a piece of the daily code etched into the clockwork',
      ],
    },
    {
      title: 'Scene 2: Second Rotation (1-2AM)',
      summary: 'The vault moves. The party chases it. Clockwork defenses activate.',
      challenge: 'puzzle',
      keyEvents: [
        'The rotation: the building shudders as the vault slides to floor 6',
        'Clockwork sentries: small mechanical spiders that patrol the gears and sound alarms',
        'The combination: two of three code pieces found - the third is on the vault door itself',
        'A close call: someone almost gets caught in the gears during the rotation',
      ],
    },
    {
      title: 'Scene 3: Third Rotation (2-3AM)',
      summary: 'Final chance. The vault is on floor 9. The golems are active. The clock is ticking.',
      challenge: 'combat',
      keyEvents: [
        'Floor 9: the highest point, narrow access, the vault door finally reachable',
        'The combination: all three pieces assembled - the lock is a mechanical puzzle within a puzzle',
        'Box 714: the deed, the proof, the reason for the heist',
        'The escape: the clock strikes 3, the vault rotates, and everything not bolted down moves with it',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Marina Dross', role: 'client', personality: 'Explains the heist using shipbuilding metaphors. "The vault is the hull. The gears are the rigging. Box 714 is the cargo." Bitter in a precise way - she can tell you the exact date her property was stolen, the name of the forged document, and the clerk who filed it.' },
    { name: 'Bank President Cogsworth III', role: 'absent antagonist', personality: 'His portrait hangs in the lobby next to a clock that has his family name on the face. Asleep in his mansion right now. The kind of man who inherits both a building and a talent for forgery and considers both family traditions.' },
    { name: 'The Clockwork Warden', role: 'obstacle', personality: 'Eight feet of brass, copper, and bad intentions. Ticks louder the closer it gets. Does not think. Does not negotiate. Does not stop. If it catches you in the gears during rotation, it does not notice.' },
  ],
  keyLocations: [
    { name: 'The First Mechanical Bank', description: 'A clock tower that is also a bank. Nine floors connected by gears, tracks, and the rotating vault platform. Beautiful, deadly, and always ticking.', significance: 'The entire heist takes place here.' },
    { name: 'The Vault', description: 'A circular room of safety deposit boxes on a rotating platform. It moves between floors on mechanical tracks. Being inside during rotation is fatal.', significance: 'The target and the ticking clock.' },
    { name: 'The Gear Works', description: 'The spaces between floors where massive clockwork mechanisms drive the rotation. Narrow, dangerous, and the fastest way to move between floors.', significance: 'The shortcut and the death trap.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'encounterWaves', 'combatNarration'],
};
