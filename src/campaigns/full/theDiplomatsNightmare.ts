import type { FullCampaign } from '../types';

export const theDiplomatsNightmare: FullCampaign = {
  id: 'full-diplomats-nightmare',
  type: 'full',
  title: 'The Diplomat\'s Nightmare',
  tagline: 'Five kingdoms. One peace treaty. Everything that can go wrong will.',
  tone: 'social',
  themes: ['social', 'intrigue', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 14,
  settingSummary:
    'Five kingdoms have been at war for 20 years. A peace conference has been called at the neutral city of Accord. The party is hired as the conference security team. Their job: keep the delegates alive, keep the negotiations on track, and prevent the war hawks on all five sides from sabotaging the peace. Every meal is a political landmine. Every handshake is a trap.',
  hook: 'The conference organizer briefs the party: "Five delegations. Five sets of grudges. Five assassination plots we know about and probably ten we don\'t. The negotiations start tomorrow. Your job is to make sure everyone is still alive and talking by the end of the week. Here is the seating chart. It\'s already wrong."',
  twist:
    'The peace conference isn\'t just about ending a war — it\'s a trap set by the conference organizer himself. He\'s a war profiteer who organized the conference to get all five leaders in one place so he can assassinate them all and sell the resulting chaos to the highest bidder. The party must protect the leaders from external threats AND from the very person who hired them.',
  climax:
    'Day 5: the treaty signing. The organizer\'s assassination plan activates. The party must protect five leaders who hate each other, expose the organizer, and somehow get the treaty signed in the middle of a security crisis. If even one leader dies, the war resumes. If the treaty isn\'t signed, the war resumes. Everything must go right.',
  acts: [
    {
      title: 'Act 1: Arrivals (Days 1-2)',
      summary: 'The five delegations arrive. Each brings grudges, demands, and at least one person who doesn\'t want peace. The party manages logistics, security, and personality clashes.',
      keyEvents: [
        'Day 1: Delegations arrive. The seating chart causes the first crisis (cultural insult).',
        'Day 1 evening: a delegate from Kingdom A is found searching Kingdom B\'s rooms',
        'Day 2: first negotiation session — two delegates nearly come to blows over a border river',
        'Day 2 evening: the party discovers a poisoned bottle intended for Kingdom C\'s delegate',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Negotiations (Days 3-4)',
      summary: 'The negotiations hit crisis after crisis. The party must mediate, investigate threats, and keep everyone alive and talking.',
      keyEvents: [
        'Day 3: A delegate storms out — the party must bring them back',
        'Day 3 evening: an assassination attempt (foiled) reveals a professional operation',
        'Day 4: A breakthrough — two kingdoms agree on trade terms — then a spy is caught',
        'Day 4 evening: the party notices the organizer\'s behavior doesn\'t add up',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Signing (Day 5)',
      summary: 'Treaty day. The organizer activates his plan. The party must stop it and get the treaty signed.',
      keyEvents: [
        'Morning: final treaty draft — all five kingdoms have grudgingly agreed',
        'The organizer\'s plan: hidden assassins, poisoned ink, and a dead man\'s switch',
        'The party exposes the organizer mid-ceremony — chaos erupts',
        'The signing: five leaders, five pens, one treaty — and the party standing between them and death',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Director Aldric Voss',
      role: 'conference organizer / true villain',
      personality: 'A charming, competent diplomat who has organized dozens of peace conferences. This is the first one he intends to fail. War is profitable.',
      secret: 'He has been selling weapons to all five kingdoms for 20 years. Peace would end his empire.',
    },
    {
      name: 'Queen Sera of Valdris',
      role: 'delegate / hardliner',
      personality: 'Lost her son in the war. Wants peace but cannot bring herself to sit across from his killers. The emotional core of the negotiations.',
    },
    {
      name: 'Ambassador Kell',
      role: 'delegate / peacemaker',
      personality: 'The one delegate who genuinely, desperately wants peace. Works behind the scenes to resolve disputes. The party\'s natural ally.',
    },
    {
      name: 'Whisper',
      role: 'spy / wildcard',
      personality: 'A spy working for no specific kingdom — she sells information to whoever pays. Might help the party. Might sell them out. Depends on the offer.',
    },
  ],
  keyLocations: [
    { name: 'Accord', description: 'A neutral city built specifically for diplomacy. Every building is designed for meetings. The architecture physically prevents combat (narrow halls, no corners for ambush).', significance: 'The entire campaign takes place here.' },
    { name: 'The Treaty Hall', description: 'The grand chamber where negotiations happen. Five tables arranged in a pentagon. Excellent acoustics — for better and worse.', significance: 'Where negotiations and the climax take place.' },
    { name: 'The Delegates\' Wing', description: 'Five separate quarters for five hostile delegations. The party\'s security station is in the center.', significance: 'Where assassinations are attempted and thwarted.' },
  ],
  dataSystems: ['diplomaticNegotiation', 'socialEncounter', 'courtIntrigue', 'factionReputation', 'npcRelationshipWeb', 'detectiveCase', 'politicalEvent', 'poisonCrafting', 'heistPlanner'],
};
