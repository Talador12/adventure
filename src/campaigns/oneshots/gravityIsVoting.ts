import type { OneShotCampaign } from '../types';

export const gravityIsVoting: OneShotCampaign = {
  id: 'oneshot-gravity-is-voting',
  type: 'oneshot',
  title: 'Gravity Is Voting',
  tagline: 'Gravity goes where the majority goes. If most people jump, gravity reverses. The monsters have figured this out.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'puzzle'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Demiplane of Democratic Physics is a pocket dimension where the laws of nature are decided by majority rule. Gravity pulls in whatever direction most creatures in the room are moving. If three goblins jump and only two adventurers are standing, gravity reverses. Temperature, friction, and light levels also shift by consensus but gravity is the big one. The local monsters have lived here for generations and understand the system perfectly. The party does not.',
  hook: 'The party steps through a portal into a dungeon where the floor looks normal. Then five goblins on the ceiling wave. They jump. Gravity reverses. The party falls upward and slams into the ceiling. The goblins are now on the floor. They wave again. "Welcome to voting room! You lose this round."',
  twist: 'The monsters are not hostile - they are competitive. The dungeon is a GAME to them. Gravity-flipping is a sport. The goblins challenge the party to matches: "Best of three flips, winner gets the treasure room key." The dungeon is not a combat gauntlet. It is a gravity-based athletic competition where understanding the voting mechanic IS the skill.',
  climax: 'The final room is a gravity championship against the dungeon\'s reigning champions: a team of monks who can change their movement direction mid-air. The party must win a gravity-flipping match where both sides are trying to flip gravity to crush the other team against surfaces. The match is played with total sincerity. There are spectators. There is a referee. There is a trophy.',
  scenes: [
    {
      title: 'Learning the Rules',
      summary: 'The party falls upward, sideways, and in directions they did not know existed as they learn how democratic gravity works. The goblins demonstrate by flipping them repeatedly.',
      challenge: 'puzzle',
      keyEvents: [
        'First flip: five goblins jump, gravity reverses, party hits the ceiling. "Rule one: more jumpers wins."',
        'The party tries to outnumber the goblins by all jumping together. It works. The goblins hit the ceiling. Then ten more goblins enter.',
        'A hallway where the party must maintain gravity consensus while walking. One person trips and the floor becomes the wall.',
        'The party discovers they can SPLIT gravity by splitting the room - half fall left, half fall right. Chaos.',
      ],
    },
    {
      title: 'The Tournament',
      summary: 'The monsters challenge the party to gravity-flipping matches. Each match teaches a new mechanic: momentum, timing, and the art of mid-flip combat.',
      challenge: 'combat',
      keyEvents: [
        'Match one: goblins vs party. Simple flip contest. The goblins cheat by hiding extra goblins behind pillars.',
        'Match two: an ogre alone vs the party. The ogre weighs enough that his jump counts as three. The math changes.',
        'The party starts gaming the system: lightweight party members jump while heavy members anchor. Strategy emerges.',
        'A spectator goblin starts selling "gravity insurance" from the sidelines. It is a hat with a pillow on top.',
      ],
    },
    {
      title: 'The Championship',
      summary: 'The final match against the reigning gravity champions. A team of monks who can change direction mid-air. The most intense gravity sport match in dimensional history.',
      challenge: 'combat',
      keyEvents: [
        'The monks enter. They are calm. They have done this a thousand times. They bow. The match begins.',
        'The monks flip gravity and immediately reposition mid-fall. They land on their feet every time. The party does not.',
        'The party discovers a counter-strategy: if they can split the monks\' formation, they can out-vote them in subgroups',
        'Final flip: the entire room goes weightless as exactly half the creatures go each direction. A zero-gravity tiebreaker. The ref has no rule for this.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Referee Plim', role: 'official / explainer', personality: 'A kobold wearing a striped shirt who referees gravity matches with extreme seriousness. Has a whistle. Uses it constantly. "Illegal flip! Three-second penalty! Gravity stays DOWN for three seconds!"' },
    { name: 'Grand Champion Kira', role: 'final opponent / respectful rival', personality: 'Leader of the monk gravity-flipping team. Serene, graceful, and can change direction three times before hitting a surface. Treats gravity sport as an art form. Respects worthy opponents.' },
  ],
  keyLocations: [
    { name: 'The Demiplane of Democratic Physics', description: 'A pocket dimension where physics is determined by majority vote. Gravity, temperature, and friction shift based on consensus.', significance: 'The setting. Every room operates under democratic physics rules.' },
    { name: 'The Championship Arena', description: 'A spherical room with padded surfaces (relatively) where gravity matches are held. Spectator galleries on all six surfaces.', significance: 'The final match. Where gravity mastery is tested against the best.' },
  ],
  dataSystems: ['combatNarration', 'encounterWaves', 'chaseSequence'],
};
