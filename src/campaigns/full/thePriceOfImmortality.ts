import type { FullCampaign } from '../types';

export const thePriceOfImmortality: FullCampaign = {
  id: 'full-price-immortality',
  type: 'full',
  title: 'The Price of Immortality',
  tagline: 'He was immortal this morning. He has aged sixty years since lunch. His eleven colleagues are dust.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'dark_fantasy'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 15,
  settingSummary:
    'Archmage Vorenthal achieved true immortality 200 years ago. Not lichdom — genuine, perfect immortality. He shared the secret with twelve other wizards. Now they\'re dying. One by one, the Immortal Thirteen are aging centuries in minutes, crumbling to dust. Vorenthal, the last survivor, is terrified and has hired the party to find out why. The answer is worse than death.',
  hook: 'An impossibly ancient man appears at the party\'s door. He was young this morning. "I was immortal for 200 years. It stopped working three hours ago. I will be dead by tomorrow unless you find out what went wrong. My eleven colleagues are already dust." He offers everything he has.',
  twist:
    'The immortality ritual didn\'t make them immortal — it stole the lifespan of 200 random people per wizard and redistributed it. 2,600 people across the realm lived shorter lives so thirteen wizards could live forever. The ritual has run out of victims — it\'s been pulling from increasingly distant populations, and it finally tried to pull from a community protected by a god. The god noticed, broke the spell, and now the stolen years are reverting all at once.',
  climax:
    'The party confronts Vorenthal with the truth. He didn\'t know (or didn\'t want to know). The god demands justice: either the remaining stolen years return to the victims\' descendants (killing Vorenthal), or the party finds another solution. Vorenthal begs for mercy. Some descendants want vengeance. Some want peace. There is no clean answer.',
  acts: [
    {
      title: 'Act 1: The Dying Immortals',
      summary:
        'The party investigates the deaths of the Thirteen. Each death site reveals more about the ritual — and its cost. Something is actively hunting the survivors.',
      keyEvents: [
        'Vorenthal\'s plea — watch him age years in real time',
        'First death site: a wizard\'s tower where centuries of entropy hit all at once',
        'Second death site: a former immortal who had been living as a "wise hermit" for 200 years',
        'Pattern: each death coincides with a village reporting mysteriously longer lifespans',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Source',
      summary:
        'The party traces the ritual to its origin and discovers the horrifying mechanism. They must find the original research while Vorenthal deteriorates.',
      keyEvents: [
        'Vorenthal\'s original laboratory — hidden, warded, containing 200-year-old research notes',
        'The truth: a ledger listing "donors" — people whose years were taken without consent',
        'A village where people are suddenly gaining decades of life — the stolen years returning',
        'The god who broke the spell sends an emissary demanding justice',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Justice',
      summary:
        'The god, the descendants, and the dying wizard all demand different things. The party must mediate an impossible ethical situation.',
      keyEvents: [
        'Vorenthal confronted with the ledger — his reaction (denial, horror, rationalization)',
        'Descendants of the victims arrive — some want blood, some want answers, some want money',
        'The god\'s ultimatum: balance the scales or face divine intervention',
        'The final choice: justice, mercy, pragmatism, or something the party invents',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Archmage Vorenthal',
      role: 'client / morally complex figure',
      personality:
        'A brilliant wizard who is watching his 200-year life evaporate. His hands are aging visibly during conversation - liver spots appearing, skin thinning. He alternates between terror, arrogance, and genuine remorse, sometimes within the same sentence. He adjusts his robes constantly, as if they no longer fit. He tells himself he did not know the cost. His voice drops to a whisper when he says it, as if even he does not believe it.',
      secret: 'He suspected the ritual had a cost. He chose not to investigate. That willful ignorance is its own kind of guilt. The research notes have a page he tore out. The torn edge is still in the binding.',
    },
    {
      name: 'Emissary of Kelemvor',
      role: 'divine enforcer',
      personality:
        'A calm, implacable servant of the god of death. He does not blink. He does not breathe unless he chooses to speak. The air around him smells like autumn leaves and fresh-turned earth. Not cruel - simply insistent that the natural order be restored. "Death is not a punishment. It is a right that was stolen from 2,600 people." His voice does not echo, even in rooms where it should.',
    },
    {
      name: 'Elara Whitfield',
      role: 'descendant leader',
      personality:
        'A farmer whose grandmother died twenty years "too early." She leads a group of descendants demanding justice. Angry, articulate, and not interested in magical excuses.',
    },
    {
      name: 'The Last Page',
      role: 'information source',
      personality:
        'A sentient spellbook that contains the original ritual. It tried to warn Vorenthal about the cost. He didn\'t listen. It\'s been waiting 200 years to say "I told you so."',
    },
  ],
  keyLocations: [
    {
      name: 'Vorenthal\'s Tower',
      description:
        'A once-magnificent wizard tower now showing 200 years of entropy as Vorenthal\'s immortality fades. Cracks spread in real time.',
      significance: 'Where the investigation begins and the research is found.',
    },
    {
      name: 'The Donor Villages',
      description:
        'Small communities across the realm where people mysteriously gained years of life as the spell reversed. Happy, confused, and about to learn an ugly truth.',
      significance: 'Where the human cost is made visceral.',
    },
    {
      name: 'The Temple of Kelemvor',
      description:
        'A solemn temple where the god of death\'s emissary holds court. The scales of justice are literal — and they haven\'t balanced in 200 years.',
      significance: 'Where the final judgment takes place.',
    },
  ],
  dataSystems: [
    'magicalDisease',
    'darkBargain',
    'arcaneResearch',
    'npcBackstoryGen',
    'magicalContract',
    'detectiveCase',
    'socialEncounter',
    'cataclysmCountdown',
    'ancientProphecy',
  ],
};
