import type { FullCampaign } from '../types';

export const theOathbreaker: FullCampaign = {
  id: 'full-the-oathbreaker',
  type: 'full',
  title: 'The Oathbreaker',
  tagline: 'She broke her oath to save a child. Her order says that was the wrong choice.',
  tone: 'serious',
  themes: ['classic_fantasy', 'intrigue', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'Dame Aveline of the Order of the Silver Dawn broke her oath. She was commanded to let a child die — the execution was sanctioned, the prophecy clear, the order absolute. She refused. She drew her sword against her own brothers and sisters and carried the child to safety. Now she is hunted. Her divine power fades daily. The child, a five-year-old boy named Kael, does not understand why people want him dead. The campaign explores what happens when rigid moral systems meet the messy, human reality of a child\'s life.',
  hook: 'The party encounters Dame Aveline on the road — battered, exhausted, carrying a sleeping child. Paladins of the Silver Dawn are a day behind her. "I need help. I do not have time to explain why. If you turn me in, a child dies. If you help me, you become enemies of the most powerful holy order on the continent." Kael wakes up and asks if the party are more of the scary people.',
  twist:
    'The child she saved — Kael — will grow up to be a tyrant. The Order of the Silver Dawn knew this through a verified prophecy: Kael will one day unite the eastern kingdoms under a brutal dictatorship, causing the deaths of thousands. The oath Aveline broke was specifically designed to prevent that future. The order is not cruel — they wrestled with this decision for years. They chose the calculus of future suffering over one child\'s life. Aveline chose the child.',
  climax:
    'The prophecy is confirmed. Kael does carry the seeds of what the order fears. But prophecy is not destiny — it is probability. The party must decide: surrender Kael to the order (who will execute him), hide him and hope the prophecy is wrong, or find a way to raise him differently — breaking the cycle of violence that the prophecy describes. Aveline will fight anyone who tries to harm the child, even the party. The final choice is not about Kael. It is about whether the future is written or made.',
  acts: [
    {
      title: 'Act 1: The Flight',
      summary:
        'Protecting Aveline and Kael while fleeing the Silver Dawn. The order is relentless, disciplined, and genuinely believes it is doing the right thing. Aveline is losing her powers. The child needs stability.',
      keyEvents: [
        'The road encounter: Aveline, Kael, and the party\'s first decision',
        'Pursuit: Silver Dawn paladins track them with divine magic — professional, not angry',
        'Aveline\'s fading power: each day without her oath, her abilities diminish',
        'Kael: a scared child who does not understand why adults keep trying to kill him',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Prophecy',
      summary:
        'The party learns why the order wants Kael dead. The prophecy is real, verified by multiple seers. Kael shows no signs of evil, but the prophecy is specific and has a strong track record. The moral ground shifts beneath the party.',
      keyEvents: [
        'A captured Silver Dawn knight explains the prophecy, calmly and with genuine regret',
        'Independent verification: a seer confirms the prophecy\'s authenticity and specificity',
        'Kael has a nightmare: he dreams of armies, of a throne, of a crown. He wakes up crying.',
        'Aveline\'s confession: she knows about the prophecy. She chose the child anyway. "Prophecy is not a death warrant."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Weight of Maybe',
      summary:
        'The final confrontation with the Silver Dawn. The prophecy hangs over everything. The party has to decide what they believe about fate, free will, and a child who might become a monster.',
      keyEvents: [
        'The Silver Dawn\'s grand master arrives: not a villain, but a person carrying an impossible burden',
        'Kael demonstrates both kindness and a flash of something darker — the prophecy is not baseless',
        'Aveline\'s last stand: she will die before she lets anyone touch the child',
        'The choice: the party decides Kael\'s fate — and, in doing so, decides what kind of world they believe in',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Dame Aveline',
      role: 'oathbreaker / protector',
      personality:
        'A woman who spent twenty years as a perfect paladin and threw it all away for one child. She is not conflicted. She would do it again. She is exhausted, losing her powers, and absolutely certain she made the right choice.',
    },
    {
      name: 'Kael',
      role: 'the child',
      personality:
        'Five years old. Scared, sweet, and deeply confused. He likes insects and drawing. He has nightmares about things he cannot describe. He is a child, not a prophecy — but the prophecy describes him specifically.',
    },
    {
      name: 'Grand Master Elias Thorn',
      role: 'Silver Dawn leader',
      personality:
        'A man who has not slept well in years. He ordered a child\'s execution after months of deliberation, prayer, and agony. He is not cruel. He believes he chose the lesser evil. He would give anything to be wrong.',
      secret: 'He secretly hopes Aveline succeeds. If she can prove the prophecy wrong, he would be the most relieved person alive.',
    },
  ],
  keyLocations: [
    {
      name: 'The Road',
      description: 'The campaign is a chase. Much of it takes place on roads, in inns, in hiding places. The party is always moving.',
      significance: 'The primary setting for Act 1 — constant motion, constant danger.',
    },
    {
      name: 'The Silver Citadel',
      description: 'Headquarters of the Order of the Silver Dawn. A beautiful fortress dedicated to justice, prophecy, and the terrible decisions they require.',
      significance: 'Where the prophecy originated and the final confrontation takes place.',
    },
    {
      name: 'The Sanctuary',
      description: 'A hidden monastery that shelters those the orders of the world have condemned. The only safe place for Aveline and Kael.',
      significance: 'The party\'s temporary refuge and where Kael\'s nature is examined.',
    },
  ],
  dataSystems: [
    'ancientProphecy',
    'socialEncounter',
    'npcRelationship',
    'politicalEvent',
    'encounterWaves',
    'moralDilemma',
    'chaseSequence',
    'diplomaticNegotiation',
  ],
};
