import type { OneShotCampaign } from '../types';

export const theDungeonReview: OneShotCampaign = {
  id: 'oneshot-dungeon-review',
  type: 'oneshot',
  title: 'The Dungeon Review',
  tagline: 'The dungeon has a 2-star rating on AdventureAdvisor. It hired you to fix that.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary: 'Dungeons have an online review system (AdventureAdvisor). The Dungeon of Despair has a 2-star rating — adventurers complain it\'s "too easy," "poorly lit," and "the dragon seemed tired." The dungeon\'s sentient core has hired the party as consultants to improve its rating. Walk through the dungeon, rate each room, suggest improvements, and test the upgrades.',
  hook: 'A crystal ball delivers a message: "Your consulting firm has been engaged by the Dungeon of Despair to provide a comprehensive audit and improvement plan. Current rating: 2.1 stars on AdventureAdvisor. Target: 4.5 stars. Budget: unlimited (we have a hoard). Please arrive by 9 AM for the walkthrough."',
  twist: 'The dungeon\'s 2-star rating isn\'t because it\'s bad — it\'s because the dungeon is NICE. The dragon gives visitors tea. The traps have warning signs. The treasure has a "take one" policy. The dungeon wants to be scary but doesn\'t have the heart for it. The real consulting job is teaching a kind dungeon to be appropriately threatening without losing its soul.',
  climax: 'Grand reopening night. A test party of adventurers enters the improved dungeon. The party watches from the control room as the dungeon tries to be scary. The dragon attempts a menacing monologue (it prepared notecards). The traps go off (gently). The adventurers rate it: the result depends on how well the party\'s improvements balanced scary with safe.',
  scenes: [
    { title: 'Scene 1: The Walkthrough', summary: 'Touring the dungeon room by room. Each room has a problem the dungeon doesn\'t realize is a problem.', challenge: 'exploration', keyEvents: ['Room 1: the entrance. It has a welcome mat. And a doorbell.', 'Room 2: the trap room. The traps have warning signs: "CAUTION: PIT AHEAD"', 'Room 3: the treasure room. "Take one per person, please. Honor system."', 'The dragon\'s lair: the dragon offers tea and asks how the walkthrough is going'] },
    { title: 'Scene 2: The Improvements', summary: 'Implementing changes while respecting the dungeon\'s gentle nature. Remove the welcome mat but keep the soul.', challenge: 'social', keyEvents: ['Removing the warning signs (the dungeon is anxious about liability)', 'Upgrading the traps (the dungeon cries when testing them)', 'Coaching the dragon on menacing: "Try not smiling when you say DOOM"', 'The dungeon\'s condition: "You can make me scary, but nobody gets ACTUALLY hurt"'] },
    { title: 'Scene 3: Grand Reopening', summary: 'Test run. A party of adventurers enters. The dungeon performs. The party monitors from the control room.', challenge: 'social', keyEvents: ['The adventurers enter: the dungeon remembers not to say "welcome"', 'Trap performance: they go off properly! (The dungeon whispers "sorry" after each one)', 'The dragon\'s monologue: mostly menacing, one slip ("Would you like sugar with your DOOM?")', 'The review: the adventurers rate it — success, partial success, or adorable failure'] },
  ],
  keyNPCs: [
    { name: 'The Dungeon of Despair (Core)', role: 'client / kind dungeon', personality: 'A sentient dungeon that desperately wants to be scary but is fundamentally kind. "I TRIED putting skulls in the entrance. Then I felt bad for the skulls."' },
    { name: 'Ember the Dragon', role: 'the dungeon\'s dragon / too nice', personality: 'A dragon who offers tea to everyone. "Adventurers seem so stressed. A nice cup of chamomile helps. Then I eat them. Just kidding! ...Unless?"' },
    { name: 'The Test Party', role: 'guinea pig adventurers', personality: 'A group of mid-level adventurers who are very confused by a dungeon that seems to be trying its best. "Did that trap just apologize?"' },
  ],
  keyLocations: [
    { name: 'The Dungeon of Despair', description: 'A dungeon that wants to be scary but has a welcome mat, warning signs on traps, and a dragon who serves tea.', significance: 'The client and the setting.' },
    { name: 'The Control Room', description: 'A room behind the walls where the dungeon core communicates. Crystal balls show every room.', significance: 'Where the party monitors the grand reopening.' },
    { name: 'The Dragon\'s Lair', description: 'A cozy lair with a tea set, throw pillows, and a dragon who practiced its scary face in a mirror (it didn\'t work).', significance: 'The dungeon\'s final room and biggest consulting challenge.' },
  ],
  dataSystems: ['dungeonRoomTemplates', 'dungeonRoomDressing', 'trapDesigner', 'socialEncounter', 'combatNarration'],
};
