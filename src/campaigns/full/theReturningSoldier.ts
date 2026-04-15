import type { FullCampaign } from '../types';

export const theReturningSoldier: FullCampaign = {
  id: 'full-returning-soldier',
  type: 'full',
  title: 'The Returning Soldier',
  tagline: 'The war ended. The hero came home. Home does not fit anymore.',
  tone: 'serious',
  themes: ['war', 'social', 'political'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 11 },
  estimatedSessions: 16,
  settingSummary:
    'The Kethran War is over. Three years of blood, mud, and magic, and the kingdom of Aldenmere won. Parades were held. Medals were given. The soldiers came home. Now the parades are over. The medals are in drawers. The soldiers are standing in their kitchens, unable to sleep, unable to explain where they have been for three years, and unable to understand why the world moved on without them. The party are veterans. They are Level 5 because of the war. They are home because of the peace. They do not fit.',
  hook: 'The party attends a "Heroes\' Welcome" feast in their honor at the capital. Speeches are given. Toasts are raised. A noble who never saw combat thanks them for their sacrifice. A child asks one of them to "do a war spell." On the way home, they pass a veteran begging on a bridge. Nobody stops. The kingdom celebrated the victory. It forgot the cost.',
  twist:
    'The war did not end. A ceasefire was declared because both sides ran out of soldiers willing to fight. Diplomats called it "peace" for political convenience. The ceasefire is expiring. The enemy is regrouping. And the kingdom, having celebrated victory, is drafting the same veterans who barely survived the first campaign. The party\'s homecoming was not a reward - it was a rest stop.',
  climax:
    'Draft orders arrive. The party is called to serve again. They can comply (returning to a war they know is pointless), resist (becoming deserters in a kingdom they fought to save), or use their status as war heroes to force a real peace - which means confronting both their own government\'s lies and the enemy\'s. The climax is not a battle. It is a choice about what the party is willing to sacrifice for a peace that might not hold.',
  acts: [
    {
      title: 'Act 1: Homecoming',
      summary:
        'The party returns to civilian life. Jobs that feel meaningless, relationships strained by absence, a kingdom that says "thank you" but does not mean it. The act is slow, character-driven, and uncomfortable.',
      keyEvents: [
        'The feast: hollow celebration, performative gratitude. A noble raises a glass: "To our brave soldiers, who gave so much." He is wearing a ring that cost more than the party\'s combined wages for three years of combat.',
        'Reintegration: trying to return to trades, families, and routines that feel alien. A party member\'s workshop was rented to someone else while they were gone.',
        'Quiet moment: Sergeant Brynn pours the party drinks at her tavern. Nobody talks about the war. They just sit together. It is the first time anyone has felt normal.',
        'Fellow veterans: some coping well, some not at all. One drinking themselves to death. One standing in the market square talking to people who are not there.',
        'The first signs: military supply convoys moving at night, recruitment posters going up quietly. The party notices because veterans notice things civilians do not.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Lie',
      summary:
        'The party discovers the ceasefire is expiring. "Peace" was a political fiction. The kingdom is quietly remilitarizing, and the veterans who came home are being tracked for re-conscription.',
      keyEvents: [
        'A friend from the war receives draft papers and panics. He was a cook. He is being drafted as infantry.',
        'Investigation: the "peace treaty" is a ceasefire with an expiration date, never renewed. It expires in six weeks.',
        'Government officials deny everything publicly while preparing for mobilization privately. Minister Crane will not make eye contact.',
        'The moment of cost: the party discovers their own draft orders have already been signed. Their "homecoming" was staged to keep them calm until remobilization.',
        'The enemy side: through back channels, the party learns the other side is also exhausted and does not want to fight. Commander Yara Tesh has been trying to reach someone for months.',
        'If the party organized veterans in Act 1, those veterans now form the core of a resistance.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Real War',
      summary:
        'Draft orders come for the party. They must decide what to do. Comply, resist, or use their fame to force a real peace negotiation. The real war is not on the battlefield - it is in the halls of power.',
      keyEvents: [
        'Draft orders arrive: the party is officially called to serve again. The paper shakes in someone\'s hand.',
        'Rally: the party can organize veterans to resist, drawing on bonds forged in combat. The sergeant who held the line at Keth River joins them.',
        'Quiet moment: the night before the confrontation. The party sits in Brynn\'s tavern again. This time they talk about the war. Everything they never said comes out.',
        'Confrontation with the Crown: the party uses their hero status to demand a real peace process. The court is not used to being challenged by the people it decorated.',
        'The negotiation: if the party reaches the enemy, they find exhausted people who want the same thing - peace that is not a lie. Yara Tesh shakes their hand and her hand is trembling too.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Sergeant Brynn Holloway',
      role: 'fellow veteran / ally',
      personality:
        'The party\'s former sergeant. She held the unit together during the war. Now she runs a struggling tavern and flinches at loud noises. Still the person everyone turns to when things get hard. Wipes the bar compulsively. "The tavern is fine. The tavern is always fine." Arc: begins as someone holding it together for others, ends as someone who finally lets others hold her together.',
    },
    {
      name: 'Minister Aldric Crane',
      role: 'government official / obstacle',
      personality:
        'The Minister of War who orchestrated the "peace" narrative. Not a villain - he genuinely believed a brief ceasefire was better than no ceasefire. Speaks in measured, diplomatic sentences that answer every question without saying anything. He is in too deep to admit the lie now.',
      secret: 'He knows the ceasefire was always temporary. He hoped he could negotiate a real peace before it expired. He failed and is covering it up. Arc: can be broken by the truth if the party brings undeniable evidence. If pushed, he admits: "I thought I had more time."',
    },
    {
      name: 'Commander Yara Tesh',
      role: 'enemy counterpart',
      personality:
        'A Kethran military leader who is tired of war. She has been trying to reach Aldenmere\'s leadership for months. Pragmatic, direct, and desperate for real peace. Scars on her arms mirror the party\'s. "I have killed your people. You have killed mine. Can we stop?"',
    },
  ],
  keyLocations: [
    {
      name: 'Aldenmere (the capital)',
      description:
        'A prosperous city celebrating a victory that is not real. Victory banners hang over recruitment offices. The disconnect is everywhere.',
      significance: 'The primary setting - where the party must navigate civilian life and political machinations.',
    },
    {
      name: 'The Veterans\' Quarter',
      description:
        'A neighborhood where returning soldiers have concentrated. Cheap housing, mutual aid, and a lot of people who do not sleep well. Someone put up a sign: "We held the line. Now hold each other."',
      significance: 'The party\'s community and the heart of the resistance if they choose to organize.',
    },
    {
      name: 'The Kethran Border',
      description:
        'A no-man\'s-land between the two nations. Muddy, scarred, and patrolled by soldiers who do not want to be there. Wildflowers grow in the craters.',
      significance: 'Where the real peace negotiation can happen, if the party gets that far.',
    },
  ],
  dataSystems: [
    'politicalEvent',
    'socialEncounter',
    'npcRelationship',
    'npcSchedule',
    'diplomaticNegotiation',
    'rumor',
    'moralDilemma',
    'warCampaign',
  ],
};
