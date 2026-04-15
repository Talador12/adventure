import type { OneShotCampaign } from '../types';

export const theRaceCondition: OneShotCampaign = {
  id: 'oneshot-the-race-condition',
  type: 'oneshot',
  title: 'The Race Condition',
  tagline: 'Two identical parties. Same dungeon. Same quest. Same time. Sabotage is inevitable.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'intrigue'],
  playerCount: { min: 4, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Adventurer\'s Guild double-booked a quest. Two parties arrive at the Vault of Echoing Gold at the same time, both holding identical contracts, both refusing to leave. The dungeon has one entrance, one treasure, and exactly enough traps for one group. The guild representative on-site declares: "Whoever reaches the treasure first gets the contract. And the gold. And the bragging rights. Go." It is a race through a trapped dungeon against a rival party that is just as competent, just as motivated, and just as willing to cheat.',
  hook: 'The party arrives at the dungeon to find another party already arguing with the guild rep. Both have signed contracts. Neither will yield. The guild rep, exhausted, blows a whistle: "FINE. Race. First to the vault wins. No killing each other. Everything else is fair game." The rival party grins. They are already cheating.',
  twist: 'The dungeon was designed by the guild as a TEST. There is no treasure. The real test is whether either party cooperates when they realize the dungeon cannot be completed alone. The final door requires two keys held simultaneously from opposite sides. The parties MUST work together to open it. The guild is watching via scrying to see which group figures this out first.',
  climax: 'Both parties reach the final door from different paths. Two keyholes. Two keys. One on each side. Neither party can open it alone. They must cooperate with the team they have been sabotaging for the last hour. The guild rep appears via sending: "Congratulations. You both pass. The treasure was teamwork. Also there is actual gold behind the door but only if you open it together."',
  scenes: [
    {
      title: 'The Starting Line',
      summary: 'Both parties enter the dungeon simultaneously. The corridors split. They choose paths. The sabotage begins immediately.',
      challenge: 'exploration',
      keyEvents: [
        'The guild rep blows a whistle. Both parties sprint into the dungeon. Immediate collision in the first corridor.',
        'The path splits. Each party takes a different route. Both routes have traps and both routes intersect ahead.',
        'First sabotage: the rival party triggers a trap behind them to slow anyone following',
        'The party discovers a shortcut. The rival party discovers a different shortcut. They meet in the middle. Awkward.',
      ],
    },
    {
      title: 'The Sabotage Spiral',
      summary: 'Both parties escalate sabotage while racing through the dungeon. Traps are re-armed. Doors are barricaded. Monsters are redirected. It gets petty fast.',
      challenge: 'puzzle',
      keyEvents: [
        'The rival rogue picks a lock and then breaks the lock mechanism so it cannot be opened again',
        'The party pushes a boulder to block the rival\'s corridor. The rival blasts through it. Dust everywhere.',
        'A monster room: one party kites the monsters toward the other party\'s path. Friendly fire by proxy.',
        'Both parties arrive at a bridge. One bridge. A standoff. Someone has to cross first. Trust is nonexistent.',
      ],
    },
    {
      title: 'The Two-Key Door',
      summary: 'The final door requires cooperation. Both parties hold a key. Neither can open it alone. The race was never about speed.',
      challenge: 'social',
      keyEvents: [
        'Two doors, two keyholes, opposite sides of a wall. One key per party. Neither door opens without both keys turned simultaneously.',
        'Realization: the sabotage was pointless. The dungeon was designed to force cooperation.',
        'Negotiation through a wall. Trust exercises with people you spent an hour sabotaging. Tense.',
        'Both keys turn. The door opens. The guild rep appears: "The real treasure was teamwork. Also there is 500 gold. Split it."',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Guildmaster Hale', role: 'quest designer / observer', personality: 'A retired adventurer who designs guild tests. Dry humor. Watches both parties via scrying and takes notes. "Fascinating. They are using the goblin corpse as a door stop. That is new."' },
    { name: 'Rival Party Leader (Kass)', role: 'rival / eventual ally', personality: 'Leader of the rival party. Competitive, cunning, and just as annoyed about the double-booking. Respects skill but will absolutely cheat if given the opportunity. "Nothing personal. Just business."' },
  ],
  keyLocations: [
    { name: 'The Vault of Echoing Gold', description: 'A guild-designed test dungeon with split paths, intersecting corridors, and a final door that requires two keys from opposite sides.', significance: 'The race course. Every room is a potential sabotage opportunity or cooperation requirement.' },
    { name: 'The Two-Key Chamber', description: 'The final room split by a wall. One keyhole per side. Both keys must turn simultaneously. Cooperation or stalemate.', significance: 'The climax. Where competition must become cooperation.' },
  ],
  dataSystems: ['trapGenerator', 'chaseSequence', 'socialEncounter', 'combatNarration'],
};
