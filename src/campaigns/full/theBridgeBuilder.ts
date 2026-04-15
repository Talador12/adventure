import type { FullCampaign } from '../types';

export const theBridgeBuilder: FullCampaign = {
  id: 'full-bridge-builder',
  type: 'full',
  title: 'The Bridge Builder',
  tagline: 'Two nations. Two hundred years of war. One bridge. Build it or break it.',
  tone: 'serious',
  themes: ['political', 'war', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 18,
  settingSummary:
    'The nations of Valdris and Korreth have been at war for two hundred years. The Ashflow River separates them — a mile-wide torrent that no bridge has ever spanned permanently. A new peace accord includes an unprecedented provision: build a bridge. A real, physical bridge between the two nations. The party is hired as the bridge-building team\'s protectors and diplomats. Every session, something threatens the project: saboteurs, floods, political opposition, supply chain failures, cultural misunderstandings, and ancient grudges.',
  hook: 'The Peace Commission hires the party. "We need fighters, diplomats, and problem-solvers. The bridge must be completed in one year. Both nations have extremists who want it destroyed. The river itself is hostile — enchanted during the war to resist crossing. And the workers from both sides do not trust each other. Your job is to make sure the bridge gets built. Whatever it takes."',
  twist:
    'The bridge has been built before. Seven times in two hundred years, someone attempted it. Every time it was completed or nearly completed, it was destroyed. The party discovers that the saboteur is not from either nation. A third party — a merchant consortium called the Ashflow Trading Company — profits enormously from the war and has been destroying every bridge for two centuries. They control the ferry crossings, the smuggling routes, and the arms trade. Peace is bad for business.',
  climax:
    'The bridge is nearly complete. The Ashflow Trading Company makes its final move: a coordinated attack using agents embedded on both the Valdris and Korreth sides, designed to look like each nation attacked the other. If the party cannot expose the conspiracy, the bridge\'s destruction will restart the war. The final session is a race to protect the bridge, unmask the saboteurs, and lay the last stone — while two nations watch with their hands on their swords.',
  acts: [
    {
      title: 'Act 1: Laying the Foundation',
      summary:
        'The project begins. Workers from both nations arrive and immediately distrust each other. The river is hostile. The first sabotage attempt happens before the foundation is laid. The party must keep the peace among the workers while protecting the site.',
      keyEvents: [
        'Arrival at the build site: a muddy camp on the Ashflow\'s banks with workers from two enemy nations',
        'Cultural friction: a Valdris worker refuses to eat at the same table as a Korreth worker',
        'First sabotage: supply wagons are raided — made to look like the other side did it',
        'The river: enchanted currents destroy the first pilings, requiring magical countermeasures',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: Rising Tensions',
      summary:
        'The bridge progresses despite setbacks. Political opposition from both nations grows. Sabotage becomes more sophisticated. The party discovers the historical pattern: seven bridges, seven destructions. Someone does not want this river crossed.',
      keyEvents: [
        'Political delegation: hardliners from both nations visit the site and demand the project be stopped',
        'Historical research: old records mention previous bridge attempts — all failed at the same stage',
        'A worker from each side becomes friends - the first genuine cross-cultural bond, and a target',
        'Quiet moment: Malik teaches Seren a Valdris drinking song. Seren teaches Malik a Korreth prayer. Neither understands the words. Both learn the melody.',
        'The pattern: every sabotage uses the same methods, the same timing, the same result — this is not organic opposition',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Last Stone',
      summary:
        'The bridge is nearly done. The Ashflow Trading Company launches its final attack. The party must expose a two-hundred-year conspiracy, protect the bridge, and prevent the sabotage from restarting the war.',
      keyEvents: [
        'The conspiracy revealed: the Ashflow Trading Company, neutral merchants who have profited from war for two centuries',
        'Embedded agents: saboteurs on both work crews, triggered to attack and blame the other side',
        'The race: protecting the bridge while exposing the conspiracy to both nations\' leadership',
        'The last stone: the bridge is completed — or it falls, depending on the party\'s choices',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Chief Engineer Petra Yune',
      role: 'project leader',
      personality:
        'The engineer in charge of the bridge construction. Brilliant, stubborn, and singularly focused on the build. Carries a slide rule like a weapon. Taps her pencil on surfaces when calculating. "I was hired to build a bridge. I am going to build a bridge. Your wars are not my department." Arc: begins apolitical, grows to understand the bridge is more than stone. By Act 3, she fights for it.',
    },
    {
      name: 'Ambassador Dorin Kell',
      role: 'peace commission diplomat',
      personality:
        'A weary diplomat who has spent thirty years working toward this peace accord. He believes in the bridge with the fervor of a man who has gambled his entire career on it. Polite, persistent, and terrified of failure.',
    },
    {
      name: 'Tavish Grant',
      role: 'Ashflow Trading Company agent',
      personality:
        'The local representative of the trading company. Friendly, helpful, and always offering to supply the project at a discount. He is managing the sabotage operation with the calm efficiency of a businessman managing any other project.',
      secret: 'The company has standing orders, passed down for two centuries: the bridge must not be completed. The war must continue. Tavish does not question this. It is just business.',
    },
    {
      name: 'Malik and Seren',
      role: 'cross-cultural workers',
      personality:
        'A Valdris stonemason and a Korreth carpenter who became friends over the project. Malik is loud and Seren is quiet and they argue about everything except what matters. They represent what the bridge is supposed to achieve. They are also targets for anyone who wants the project to fail. If the party protected their friendship in Act 2, they rally both work crews in Act 3.',
    },
  ],
  keyLocations: [
    {
      name: 'The Build Site',
      description: 'A sprawling construction camp on both banks of the Ashflow River. Tents, scaffolding, cranes, and two groups of workers who are learning to coexist.',
      significance: 'The primary setting for the entire campaign.',
    },
    {
      name: 'The Ashflow River',
      description: 'A mile-wide river enchanted during the war to resist crossing. Strong currents, magical interference, and two centuries of dumped war debris on the bottom.',
      significance: 'The physical obstacle the bridge must span and a source of ongoing challenges.',
    },
    {
      name: 'Ashflow Trading Company HQ',
      description: 'A prosperous merchant house in the neutral trade city of Ferros, strategically located where the river narrows. Maps on the walls show two centuries of profitable war.',
      significance: 'Where the conspiracy is headquartered and the evidence trail leads.',
    },
  ],
  dataSystems: [
    'politicalEvent',
    'diplomaticNegotiation',
    'socialEncounter',
    'npcRelationship',
    'encounterWaves',
    'secretSociety',
    'siegeDefense',
    'warCampaign',
  ],
};
