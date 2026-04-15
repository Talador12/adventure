import type { FullCampaign } from '../types';

export const theLastDragonRider: FullCampaign = {
  id: 'full-the-last-dragon-rider',
  type: 'full',
  title: 'The Last Dragon Rider',
  tagline: 'One rider left. One dragon left. Both dying. The world needs them to hold on a little longer.',
  tone: 'serious',
  themes: ['classic_fantasy', 'war', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'For five centuries, the Dragon Riders kept peace across the Accord Kingdoms. A hundred riders on a hundred dragons, each bonded from youth, each sworn to protect the balance between nations. They stopped wars before they started. They rescued cities from calamity. They were the world\'s conscience on wings. Then, thirty years ago, the dragons left. All of them. Every dragon abandoned their rider and flew beyond the Veil - a wall of perpetual storm at the edge of the world. No one knows why. The riders aged and died without their bonds. Except one. Commander Yara Ashwing, ninety years old, still bonded to Calebraxis, an ancient copper dragon with cataracts and arthritis. Both refuse to die. Both refuse to give up. The party is recruited to find where the dragons went and bring them back.',
  hook: 'Yara lands Calebraxis in the town square - badly. The dragon clips a belltower. Yara dismounts with difficulty and addresses the crowd: "I need riders. Not heroes, not warriors - riders. People willing to bond with something bigger than themselves and spend their lives keeping the peace. The dragons are gone, but they can be found. I know where they went. I cannot make the journey. You can." She hands the party a map marked with one location beyond the Veil. "Bring them home. The world will not survive much longer without them."',
  twist:
    'The dragons left because the riders became corrupt. Over five centuries, the Rider Order drifted from peacekeepers to power brokers. They chose sides in wars. They took bribes. They installed puppet rulers. The dragons - beings of deep moral conviction - could not abide it. They left as a judgment, not an abandonment. Yara is the only honest rider who remained. The dragons know this. She is the reason they might come back. The party must prove to the dragons that the next generation of riders will be different - not by fighting, but by demonstrating the kind of character the original riders were supposed to have.',
  climax:
    'Beyond the Veil, the dragons have built a society of their own - a roost-city on floating mountains where they raise their young in peace. The dragon council hears the party\'s case. They test each party member: not combat trials, but moral ones. Impossible choices with no right answer. How you choose reveals who you are. If the party passes, the dragons agree to return - on new terms. No more rider supremacy. Partnership, not service. The flight home, with the party riding dragons for the first time, is the campaign\'s final image.',
  acts: [
    {
      title: 'Act 1: The Last Rider',
      summary:
        'Meeting Yara, learning the history of the Rider Order, and preparing for the journey beyond the Veil while the Accord Kingdoms slide toward war without their peacekeepers.',
      keyEvents: [
        'Meeting Yara: ninety years old, sharp as a lance, and riding a dragon with cataracts. She is magnificent and she is the last.',
        'The Rider archives at Skyhold: learning the Order\'s history. Glorious beginnings. Gradual corruption. The dragons\' departure.',
        'Quiet moment: Yara and Calebraxis alone on the roost at sunset. She brushes his scales. He rumbles. Neither says anything. They have been doing this for seventy years.',
        'A border skirmish: two kingdoms fighting because no rider is there to stop them. The party intervenes and sees the cost of the dragons\' absence.',
        'Prince Aldren arrives demanding to join the expedition. He wants the dragons for military power, not peace. Yara stares at him for a long time and says: "You remind me of why they left."',
        'Preparation: gathering supplies, allies, and courage for a journey into a permanent storm.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: Beyond the Veil',
      summary:
        'The journey through the Veil and into uncharted territory. The party faces the storm, the wilderness beyond it, and the growing understanding of why the dragons really left.',
      keyEvents: [
        'The Veil crossing: a wall of perpetual storm. Calebraxis guides them through. It nearly kills the old dragon. The party carries supplies while Yara whispers encouragement to a creature older than nations.',
        'A letter from home: one party member receives a message (sent before the Veil) from someone who doubts them. It sits heavy in a pocket for sessions.',
        'The wilderness beyond: a land untouched by civilization. The party survives on what they carry and what they find. No roads. No maps. No safety.',
        'Dragon sign: claw marks on cliffsides. Shed scales. Scorch marks from play-fighting. They are close.',
        'Calebraxis refuses to go further. He tells the party (through Yara): "They left because of riders like me. Corrupt, comfortable, complicit. I stayed for Yara, not for honor. You go. Prove you are better than we were."',
        'A young dragon encounter: curious, cautious, and carrying a message: "The elders will hear you. Follow."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Dragon Council',
      summary:
        'The party reaches the dragon roost-city, faces the council, and undergoes trials that test character rather than combat. The fate of the Rider Order is decided.',
      keyEvents: [
        'The roost-city: floating mountains connected by bridges of hardened flame. Dragons of every color and age. Hatchlings chasing each other through clouds.',
        'The council: ancient dragons who remember the corruption. They are not hostile. They are disappointed. Sovereign Malachite speaks first: "Thirty years and this is who comes asking?"',
        'The trials: moral dilemmas with no clean answers. Power vs. mercy. Truth vs. kindness. Duty vs. compassion. If the party chose poorly with Prince Aldren earlier, the dragons reference it.',
        'Quiet moment: a young dragon approaches the party at night and asks what the surface world is like. It has never seen it. It was born in exile. "Is it true there are creatures with no wings? How do they bear it?"',
        'The return: dragons agree to come back on new terms. Partnership, not service. The flight home.',
        'Yara sees a hundred dragons in the sky and weeps. Calebraxis flies one last time. The party rides dragons for the first time. The world below looks different from up here.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Commander Yara Ashwing',
      role: 'last rider / mentor',
      personality:
        'Ninety years old and held together by stubbornness and duty. She was the youngest rider when the dragons left and the only one who asked herself why. Speaks in short, declarative sentences. Never wastes a word. Calls everyone "recruit" until they earn a name. She knows the Order was corrupt. She stayed because someone had to.',
      secret: 'She can barely ride anymore. Calebraxis compensates for her failing body. They are each other\'s life support. Arc: begins as commander, ends as witness - her role is to see the new order born, not to lead it.',
    },
    {
      name: 'Calebraxis',
      role: 'last dragon / ancient copper',
      personality:
        'A copper dragon with cataracts, arthritis, and a wit as sharp as ever. Speaks rarely and means every word. Communicates mostly through rumbles, snorts, and pointed silences. When he does speak: "I stayed because she was worth staying for. The rest of you will have to prove it."',
    },
    {
      name: 'Sovereign Malachite',
      role: 'dragon council elder / judge',
      personality:
        'An ancient green dragon who led the exodus. She does not hate humanoids. She is tired of being used by them. Speaks in a low hum that vibrates the chest. Her judgment is fair but absolute. She has waited thirty years for someone to come and prove her wrong. Arc: begins as skeptic, softens if the party shows genuine humility in the trials.',
    },
    {
      name: 'Prince Aldren',
      role: 'Accord Kingdom heir / political pressure',
      personality:
        'A young prince who wants the dragons back for military power, not peace. Stands too straight. Speaks too loudly. Calls dragons "assets." He represents everything the dragons left to escape. If the party brings him along, the dragons will test him hardest. Arc: can learn or can break. If the party mentors him, he sees the corruption his family enabled. If ignored, he becomes a future problem.',
    },
  ],
  keyLocations: [
    {
      name: 'Skyhold',
      description:
        'The abandoned Rider headquarters. Empty roosts, dusty tack, and a hall of portraits showing five centuries of riders - from idealists to tyrants. The last portrait is Yara, painted before the exodus. She looks young.',
      significance: 'Where the party learns the Order\'s history and its fall from grace.',
    },
    {
      name: 'The Veil',
      description:
        'A wall of perpetual storm at the edge of the known world. Lightning, wind, and rain so dense it is nearly solid. The dragons flew through it. Most things cannot.',
      significance: 'The barrier between the known world and the dragons\' refuge. Crossing it is Act 2\'s defining challenge.',
    },
    {
      name: 'The Roost',
      description:
        'A city of floating mountains beyond the Veil. Connected by bridges of hardened dragonfire. Home to every dragon that left, and their children born in exile. The air smells like ozone and old stone.',
      significance: 'The campaign\'s final destination and the site of the dragon council trials.',
    },
  ],
  dataSystems: [
    'companionAnimal',
    'socialEncounter',
    'npcRelationshipWeb',
    'npcLoyalty',
    'moralDilemma',
    'diplomaticIncident',
    'wildernessSurvival',
    'naturalDisaster',
    'legendaryLastStand',
  ],
};
