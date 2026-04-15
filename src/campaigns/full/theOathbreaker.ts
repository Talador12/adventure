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
    'Dame Aveline of the Order of the Silver Dawn broke her oath. She was commanded to let a child die - the execution was sanctioned, the prophecy clear, the order absolute. She refused. She drew her sword against her own brothers and sisters and carried the child to safety. Now she is hunted. Her divine power fades daily. The child, a five-year-old boy named Kael, does not understand why people want him dead. The campaign explores what happens when rigid moral systems meet the messy, human reality of a child\'s life.',
  hook: 'The party encounters Dame Aveline on the road - battered, exhausted, carrying a sleeping child. Paladins of the Silver Dawn are a day behind her. "I need help. I do not have time to explain why. If you turn me in, a child dies. If you help me, you become enemies of the most powerful holy order on the continent." Kael wakes up and asks if the party are more of the scary people.',
  twist:
    'The child she saved - Kael - will grow up to be a tyrant. The Order of the Silver Dawn knew this through a verified prophecy: Kael will one day unite the eastern kingdoms under a brutal dictatorship, causing the deaths of thousands. The oath Aveline broke was specifically designed to prevent that future. The order is not cruel - they wrestled with this decision for years. They chose the calculus of future suffering over one child\'s life. Aveline chose the child.',
  climax:
    'The prophecy is confirmed. Kael does carry the seeds of what the order fears. But prophecy is not destiny - it is probability. The party must decide: surrender Kael to the order (who will execute him), hide him and hope the prophecy is wrong, or find a way to raise him differently - breaking the cycle of violence that the prophecy describes. Aveline will fight anyone who tries to harm the child, even the party. The final choice is not about Kael. It is about whether the future is written or made.',
  acts: [
    {
      title: 'Act 1: The Flight',
      summary:
        'Protecting Aveline and Kael while fleeing the Silver Dawn. The order is relentless, disciplined, and genuinely believes it is doing the right thing. Aveline is losing her powers. The child needs stability.',
      keyEvents: [
        'The road encounter: Aveline, Kael, and the party\'s first decision. Kael is holding a wooden horse toy. He will not put it down.',
        'Pursuit: Silver Dawn paladins track them with divine magic - professional, not angry. One of them calls out: "Aveline, please. Do not make this harder."',
        'Aveline\'s fading power: each day without her oath, her abilities diminish. She tries to heal Kael\'s scraped knee. The light flickers and dies.',
        'Kael: a scared child who does not understand why adults keep trying to kill him. He names every animal they pass. He asks the party to check under the bed at every inn.',
        'Quiet moment: Kael cannot sleep. Aveline holds him and sings a hymn to her former god. It is the only song she knows. Her voice cracks. "I do not know if He still listens. But you need a lullaby and this is all I have."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Prophecy',
      summary:
        'The party learns why the order wants Kael dead. The prophecy is real, verified by multiple seers. Kael shows no signs of evil, but the prophecy is specific and has a strong track record. The moral ground shifts beneath the party.',
      keyEvents: [
        'A captured Silver Dawn knight explains the prophecy, calmly and with genuine regret. He shows them the documentation. Fourteen seers independently confirmed it.',
        'Independent verification: a seer confirms the prophecy\'s authenticity and specificity. She weeps afterward.',
        'Kael has a nightmare: he dreams of armies, of a throne, of a crown. He wakes up crying and asks Aveline what "conquer" means.',
        'The moment of cost: Aveline\'s confession. She knows about the prophecy. She knew before she broke her oath. She chose the child anyway. "Prophecy is not a death warrant. It is a weather forecast. You prepare differently, not surrender."',
        'Quiet moment: Kael draws a picture for the party. It is the group, badly drawn, standing in front of a house. "This is us. When the scary people stop chasing us, we will live here."',
        'If the party treated the Silver Dawn with respect during pursuit, Grand Master Thorn agrees to a meeting.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Weight of Maybe',
      summary:
        'The final confrontation with the Silver Dawn. The prophecy hangs over everything. The party has to decide what they believe about fate, free will, and a child who might become a monster.',
      keyEvents: [
        'The Silver Dawn\'s Grand Master Elias Thorn arrives: not a villain, but a person carrying an impossible burden. He has not slept in weeks. "Do you think I want to kill a child? I have nightmares about this too."',
        'Kael demonstrates both kindness and a flash of something darker - the prophecy is not baseless. He commands a dog to sit with a voice that sounds like it belongs to someone older. Then he giggles and pets it.',
        'Aveline\'s last stand: she will die before she lets anyone touch the child. She has no divine power left. She has a sword and a body between Kael and harm.',
        'The choice: the party decides Kael\'s fate - and, in doing so, decides what kind of world they believe in. The prophecy watches.',
        'Epilogue: if the party chose to raise Kael differently, they see flashes of his future. It is not the prophecy\'s future. It is uncertain, messy, and full of choices he gets to make himself.',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Dame Aveline',
      role: 'oathbreaker / protector',
      personality:
        'A woman who spent twenty years as a perfect paladin and threw it all away for one child. She is not conflicted. She would do it again. Exhausted, losing her powers, and absolutely certain she made the right choice. Stands between threats and Kael without thinking. It is reflex now. Arc: begins as protector, ends as something new - not a paladin, not powerless, but a person whose conviction IS her power.',
    },
    {
      name: 'Kael',
      role: 'the child',
      personality:
        'Five years old. Scared, sweet, and deeply confused. Likes insects and drawing. Has nightmares about things he cannot describe. Names every animal he meets. Holds Aveline\'s hand with both of his. He is a child, not a prophecy - but the prophecy describes him specifically.',
    },
    {
      name: 'Grand Master Elias Thorn',
      role: 'Silver Dawn leader',
      personality:
        'A man who has not slept well in years. Ordered a child\'s execution after months of deliberation, prayer, and agony. He is not cruel. Speaks slowly, choosing words like a man who knows every one carries weight. He believes he chose the lesser evil. He would give anything to be wrong.',
      secret: 'He secretly hopes Aveline succeeds. If she can prove the prophecy wrong, he would be the most relieved person alive. Arc: if the party shows him an alternative, he breaks. Not from weakness - from relief.',
    },
  ],
  keyLocations: [
    {
      name: 'The Road',
      description:
        'The campaign is a chase. Much of it takes place on roads, in inns, in hiding places. The party is always moving. Every town is a question: will they help or report?',
      significance: 'The primary setting for Act 1 - constant motion, constant danger.',
    },
    {
      name: 'The Silver Citadel',
      description:
        'Headquarters of the Order of the Silver Dawn. A beautiful fortress dedicated to justice, prophecy, and the terrible decisions they require. Statues of paladins line the halls. Aveline\'s statue is still there. Nobody has removed it.',
      significance: 'Where the prophecy originated and the final confrontation takes place.',
    },
    {
      name: 'The Sanctuary',
      description:
        'A hidden monastery that shelters those the orders of the world have condemned. The abbot asks no questions. The walls are thick. Children\'s drawings cover one wall.',
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
