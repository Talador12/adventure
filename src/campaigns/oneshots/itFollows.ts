import type { OneShotCampaign } from '../types';

export const itFollows: OneShotCampaign = {
  id: 'oneshot-it-follows',
  type: 'oneshot',
  title: 'It Follows',
  tagline: 'A potted plant follows the party at 5 feet per round. If it reaches them... nothing happens. But the ANXIETY.',
  tone: 'shenanigans',
  themes: ['comedy', 'horror', 'exploration'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2,
  settingSummary:
    'A potted fern appeared behind the party two hours ago. It moves 5 feet per round. It does not attack. It does not speak. Detect Magic reveals nothing. Detect Evil reveals nothing. It is a potted plant and it is following them. The party is on a routine dungeon crawl but they cannot focus because the plant is always there. Always exactly behind them. Getting closer. What happens when it reaches them? Nothing. But they do not know that. And that is worse.',
  hook: 'The party exits a room and the rogue notices: "Was that potted plant there before?" It was not. They move on. Next room: the plant is in the doorway. They move on faster. Next corridor: the plant is 20 feet behind them. It has no legs. It is not being carried. It is just there. Closer each time. Nobody is okay with this.',
  twist: 'The plant belongs to a lonely ghost who died in the dungeon decades ago. The ghost cannot interact with the living. But she can move her plant. She just wants company. The plant following the party is the only way she can be near people. If the party destroys the plant, the ghost appears, visibly heartbroken. If they adopt the plant, the ghost smiles and passes on. The horror was never real. The sadness is.',
  climax: 'The plant is right behind them. One more round and it touches someone. The party must decide: destroy it, flee, or let it catch up. When it does, nothing happens. It just sits there. Near them. Happy. Then the ghost appears, thanks them for letting her be close to people one last time, and dissolves into light. The plant blooms.',
  scenes: [
    {
      title: 'The First Sighting',
      summary: 'The party notices the plant. It is just a plant. In a pot. In a dungeon. They ignore it. It follows. The dread begins.',
      challenge: 'exploration',
      keyEvents: [
        'The rogue spots it first. A fern in a ceramic pot. In a dungeon corridor. Odd but harmless.',
        'Ten minutes later: the plant is in the next room. Nobody carried it. Nobody saw it move.',
        'The wizard casts Detect Magic. Nothing. The cleric casts Detect Evil. Nothing. It is just a plant.',
        'The fighter kicks it over. They leave. Next room: it is upright again. Behind them. Closer.',
      ],
    },
    {
      title: 'The Pursuit',
      summary: 'The plant keeps following. The party tries everything to stop it. Nothing works. The dungeon crawl continues but nobody can focus because the PLANT.',
      challenge: 'puzzle',
      keyEvents: [
        'They lock it in a room. It is in the next room when they arrive. The locked room is empty.',
        'They run. It does not speed up. It does not slow down. 5 feet per round. Inevitable.',
        'Paranoia: the party starts checking every plant in the dungeon. Are OTHER plants following? (No. Just this one.)',
        'A combat encounter happens. Mid-fight, someone notices the plant has entered the room. Watching. Silently.',
      ],
    },
    {
      title: 'Contact',
      summary: 'The plant catches up. The party braces for something terrible. Nothing happens. Then the ghost appears, and the real story unfolds.',
      challenge: 'social',
      keyEvents: [
        'The plant is one step behind the cleric. Next round it will touch them. The party prepares for the worst.',
        'It touches. Nothing. It just sits there. Near them. A fern in a pot.',
        'A shimmer: a ghost appears. An old woman. She looks at the plant. She looks at the party. "Thank you for letting me follow. It has been so long since I was near anyone."',
        'The ghost dissolves. The plant blooms - a single white flower. It never moves again. The party carries it out. Nobody talks about it on the walk home.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Ghost (Elara)', role: 'hidden presence / emotional core', personality: 'A ghost who died alone in the dungeon fifty years ago. Cannot speak or interact directly. Moves her fern - the only thing she could still touch - to be near the living. Just wants company. Not scary. Heartbreaking.' },
    { name: 'The Fern', role: 'antagonist / red herring', personality: 'A potted fern in a ceramic pot. It is a plant. It does not have a personality. It follows. That is all it does. That is enough to terrify a party of adventurers.' },
  ],
  keyLocations: [
    { name: 'The Dungeon', description: 'A standard dungeon crawl that becomes secondary to the plant situation. The corridors feel longer when something is behind you.', significance: 'The backdrop. The real dungeon is the psychological torment of being followed by a fern.' },
    { name: 'Elara\'s Chamber', description: 'A dusty room with a skeleton in a chair. Next to the chair: an empty pot-shaped ring in the dust where a plant used to sit.', significance: 'The truth. If the party finds this room, they learn who the ghost was and why the plant follows.' },
  ],
  dataSystems: ['dungeonRoom', 'socialEncounter'],
};
