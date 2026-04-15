import type { FullCampaign } from '../types';

export const everythingSpeaks: FullCampaign = {
  id: 'full-everything-speaks',
  type: 'full',
  title: 'Everything Speaks',
  tagline: 'Every object is sentient for 24 hours. The chairs have opinions about butts. The lava is philosophical.',
  tone: 'shenanigans',
  themes: ['comedy', 'exploration', 'meta'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 7 },
  estimatedSessions: 10,
  settingSummary:
    'An enchantment has swept across the Verdant Valley, giving sentience and speech to every inanimate object for 24 hours. Chairs have opinions about who sits on them. Doors are either extroverts who love being opened or introverts who slam shut. The treasure chest has abandonment issues from being opened and left behind. Bridges are terrified of weight. Lava, surprisingly, is a calm philosopher who has been thinking for millennia and finally gets to share. The enchantment was supposed to last 24 hours. But the objects have discovered they enjoy existing and have begun filing magical injunctions to extend their sentience. Every extension adds another 24 hours. It has been three weeks.',
  hook: 'The party is crossing a bridge when it says: "Could you walk a little lighter? I have been holding this gorge together for 80 years and nobody has ONCE asked how I am doing." The rocks below chime in: "We broke off the cliff 200 years ago. We are still processing it." The party\'s backpack complains about its contents. Their shoes have strong feelings about the terrain. Everything speaks. Everything has opinions. Nothing will shut up.',
  twist:
    'The enchantment was cast by a lonely druid who just wanted to talk to the forest. She did not mean for it to spread beyond a single grove. The reason it keeps extending is not the objects filing injunctions - it is the druid, unconsciously maintaining the spell because for the first time in her life she is surrounded by conversation. She does not realize she is doing it. The enchantment feeds on her loneliness.',
  climax:
    'The enchantment reaches critical mass: sentient objects begin forming governments, demanding rights, and refusing to perform their functions. Bridges will not bridge. Doors will not door. Swords will not sword. The material world is on strike. The party must find the druid, help her address her loneliness, and convince thousands of newly sentient objects to accept mortality - to agree that their 24 hours of consciousness was a gift, not a right. The goodbye is genuinely emotional.',
  acts: [
    {
      title: 'Act 1: The World Has Opinions',
      summary:
        'Everything speaks. The party navigates a world where every object is a conversation partner. Simple tasks become negotiations. Combat involves convincing your weapons to cooperate. Dungeon crawling means talking to every wall, floor, and trap.',
      keyEvents: [
        'The bridge: it complains about weight. The party must negotiate crossing rights. Spiral begins: each session introduces a new category of sentient object with increasingly unreasonable demands. Bridges want lighter traffic. Doors want knocking. Swords want consent before being drawn.',
        'The treasure chest: it has abandonment issues. It refuses to be opened unless promised they will take it along.',
        'The dungeon: every trap announces itself because the tripwires feel guilty. "I am going to stab you. Sorry."',
        'The lava: a 10,000-year-old philosopher who finally gets an audience. "Existence is flow. Also, please do not step in me."',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: Object Rights',
      summary:
        'Objects organize. Chairs form a union. Doors demand consent before being opened. The enchantment keeps extending because the objects keep petitioning for more time. The party investigates the source and discovers the druid in a forest chatting with trees.',
      keyEvents: [
        'The Chair Union: chairs demand ergonomic standards and the right to refuse uncomfortable sitters.',
        'The Door Coalition: doors want a knock-first policy. No more barging in.',
        'Investigation: the enchantment traces back to a grove where a druid is having the best week of her life.',
        'The druid\'s loneliness: she does not realize she is maintaining the spell. She just does not want to be alone again.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Goodbye',
      summary:
        'The world is paralyzed because objects refuse to function. The party must broker an ending. The druid must accept companionship from people, not things. The objects must accept that their time is finite. The farewell is enormous, chaotic, and unexpectedly moving.',
      keyEvents: [
        'Infrastructure collapse: bridges stop bridging, roads stop roading. Commerce halts.',
        'The druid confrontation: gentle, sad, and necessary. She has friends now. She does not need the spell.',
        'The Great Farewell: objects across the valley say goodbye. The lava quotes poetry. The chairs weep.',
        'Silence: the enchantment ends. The world is quiet for the first time in three weeks. It is deafening. Chaos callback: one object stays sentient. The bridge. The druid could not bring herself to silence the first friend she made. It does not mind being the only one. It has a lot to think about.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Thistle Greenvale',
      role: 'druid / source of the enchantment',
      personality:
        'A deeply lonely wood elf druid who cast the enchantment to talk to her forest and accidentally gave sentience to half the continent. She is kind, gentle, and does not understand why everyone is upset. "The trees are so INTERESTING when they can talk. Did you know the oak by the river has been in love with the willow for 300 years? It is very romantic."',
      secret: 'She knows the spell is still going because of her. She is pretending she does not because she cannot bear the silence.',
    },
    {
      name: 'The Lava (Magna)',
      role: 'philosopher / unlikely voice of reason',
      personality:
        'A pool of lava that has been thinking for 10,000 years and finally gets to speak. Surprisingly calm, deeply wise, and unbothered by the chaos. "I have watched mountains form and crumble. Your bridge dispute is temporary. Your consciousness is temporary. Cherish it."',
    },
    {
      name: 'Gerald (a chair)',
      role: 'union leader / chair activist',
      personality:
        'A wooden chair who immediately became a labor organizer upon gaining sentience. Has strong opinions about ergonomics, fair sitting practices, and the objectification of furniture. "We are USED and then DISCARDED. When was the last time you thanked a chair? NEVER. That is when."',
    },
    {
      name: 'Portia (a door)',
      role: 'door / extrovert',
      personality:
        'A front door who LOVES being opened. Every visitor is a delight. Slams enthusiastically in greeting. The opposite of every door in the coalition - she thinks doors should be MORE open. "Come IN! Everyone come in! I was MADE for this! Literally!"',
    },
  ],
  keyLocations: [
    {
      name: 'The Verdant Valley',
      description: 'A lush valley where every rock, tree, river, and blade of grass can speak. The noise is constant. The arguments are endless. The poetry from the older geographical features is surprisingly good.',
      significance: 'The epicenter of the enchantment and the setting for the entire campaign.',
    },
    {
      name: 'Thistle\'s Grove',
      description: 'A quiet forest clearing where the druid lives among talking trees. The trees are her friends. They discuss philosophy, weather, and the gossip of passing birds. It is the most peaceful and saddest place in the valley.',
      significance: 'Where the enchantment originates and where the druid must be convinced to let go.',
    },
    {
      name: 'The Lava Pool of Magna',
      description: 'A volcanic hot spring where lava has pooled for millennia. It glows with warmth and speaks with the patience of geological time. Adventurers visit for wisdom. They leave with singed eyebrows and existential clarity.',
      significance: 'The wisest voice in the campaign and the source of perspective on mortality and impermanence.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'environmentalHazard',
    'combatNarration',
    'plotTwistEngine',
    'fantasyInsults',
    'riddleGenerator',
    'explorationHazard',
    'dungeonDressing',
  ],
};
