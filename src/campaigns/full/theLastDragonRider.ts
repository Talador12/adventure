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
      summary: 'Meeting Yara, learning the history of the Rider Order, and preparing for the journey beyond the Veil while the Accord Kingdoms slide toward war without their peacekeepers.',
      keyEvents: [
        'Meeting Yara: ninety years old, sharp as a lance, and riding a dragon with cataracts. She is magnificent.',
        'The Rider archives: learning the Order\'s history. Glorious beginnings. Gradual corruption. The dragons\' departure.',
        'A border skirmish: two kingdoms fighting because no rider is there to stop them. The party intervenes.',
        'Preparation: gathering supplies, allies, and courage for a journey into a permanent storm',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: Beyond the Veil',
      summary: 'The journey through the Veil and into uncharted territory. The party faces the storm, the wilderness beyond it, and the growing understanding of why the dragons really left.',
      keyEvents: [
        'The Veil crossing: a wall of perpetual storm. Calebraxis guides them through. It nearly kills the old dragon.',
        'The wilderness beyond: a land untouched by civilization. The party survives on what they carry and what they find.',
        'Dragon sign: claw marks on cliffsides. Shed scales. Scorch marks from play-fighting. They are close.',
        'A young dragon encounter: curious, cautious, and carrying a message: "The elders will hear you. Follow."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Dragon Council',
      summary: 'The party reaches the dragon roost-city, faces the council, and undergoes trials that test character rather than combat. The fate of the Rider Order is decided.',
      keyEvents: [
        'The roost-city: floating mountains connected by bridges of hardened flame. Dragons of every color and age.',
        'The council: ancient dragons who remember the corruption. They are not hostile. They are disappointed.',
        'The trials: moral dilemmas with no clean answers. Power vs. mercy. Truth vs. kindness. Duty vs. compassion.',
        'The return: dragons agree to come back on new terms. The flight home. Yara sees a hundred dragons in the sky and weeps.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Commander Yara Ashwing',
      role: 'last rider / mentor',
      personality: 'Ninety years old and held together by stubbornness and duty. She was the youngest rider when the dragons left and the only one who asked herself why. She knows the Order was corrupt. She stayed because someone had to.',
      secret: 'She can barely ride anymore. Calebraxis compensates for her failing body. They are each other\'s life support.',
    },
    {
      name: 'Calebraxis',
      role: 'last dragon / ancient copper',
      personality: 'A copper dragon with cataracts, arthritis, and a wit as sharp as ever. He stayed for Yara, not for the Order. He speaks rarely and means every word. "I stayed because she was worth staying for. The rest of you will have to prove it."',
    },
    {
      name: 'Sovereign Malachite',
      role: 'dragon council elder / judge',
      personality: 'An ancient green dragon who led the exodus. She does not hate humanoids. She is tired of being used by them. Her judgment is fair but absolute. She has waited thirty years for someone to come and prove her wrong.',
    },
    {
      name: 'Prince Aldren',
      role: 'Accord Kingdom heir / political pressure',
      personality: 'A young prince who wants the dragons back for military power, not peace. He represents everything the dragons left to escape. If the party brings him along, the dragons will test him hardest.',
    },
  ],
  keyLocations: [
    { name: 'Skyhold', description: 'The abandoned Rider headquarters. Empty roosts, dusty tack, and a hall of portraits showing five centuries of riders - from idealists to tyrants.', significance: 'Where the party learns the Order\'s history and its fall from grace.' },
    { name: 'The Veil', description: 'A wall of perpetual storm at the edge of the known world. Lightning, wind, and rain so dense it is nearly solid. The dragons flew through it. Most things cannot.', significance: 'The barrier between the known world and the dragons\' refuge.' },
    { name: 'The Roost', description: 'A city of floating mountains beyond the Veil. Connected by bridges of hardened dragonfire. Home to every dragon that left, and their children born in exile.', significance: 'The campaign\'s final destination and the site of the dragon council trials.' },
  ],
  dataSystems: ['companionAnimal', 'socialEncounter', 'npcRelationshipWeb', 'npcLoyalty', 'moralDilemma', 'diplomaticIncident', 'wildernessSurvival', 'naturalDisaster', 'legendaryLastStand'],
};
