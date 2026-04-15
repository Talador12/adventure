import type { FullCampaign } from '../types';

export const theWeightOfCrowns: FullCampaign = {
  id: 'full-weight-of-crowns',
  type: 'full',
  title: 'The Weight of Crowns',
  tagline: 'Three heirs. One throne. No right answer.',
  tone: 'political',
  themes: ['political', 'intrigue', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 18,
  settingSummary:
    'The Kingdom of Valdris has been stable for forty years under King Aldric, a man who was neither brilliant nor terrible but kept things running. Now he is dying of something the healers cannot name, and his three children are circling. The kingdom is a powder keg - border lords with private armies, a merchant class that wants representation, and a priesthood that believes divine right means they pick. The party is summoned because Aldric trusts none of his children and all of his advisors. He asks one thing: choose well.',
  hook: 'King Aldric receives you in a room that smells like medicine and regret. He is propped up on pillows, thin as paper. "I have three children," he says. "Serenna is brilliant and cruel. Theron is kind and weak. Cael is competent and a liar. I love all three. I trust none of them. You have four months before I die. Spend them with my children. Then tell the realm who should sit here." He coughs blood into a silk handkerchief. "Get it right. I could not."',
  twist:
    'King Aldric is not dying of natural causes. He is being slowly poisoned - but not by any of his children. His most trusted advisor, Chancellor Voss, has been administering the poison for a year. Voss does not want the throne. He wants the chaos of succession because he has sold Valdris to a neighboring empire in exchange for a governorship. The longer the succession crisis drags on, the weaker Valdris becomes. By the time a ruler is crowned, the army at the border will be too large to stop.',
  climax:
    'The coronation ceremony. The party must name their choice, expose Voss, and deal with the invading army - all while the three heirs and their factions watch. Any of the three can rule. None will rule well in every way. The party crowns someone knowing full well what that choice will cost.',
  acts: [
    {
      title: 'Act 1: The Candidates',
      summary:
        'The party spends time with each heir, attends court, navigates faction politics, and begins to understand that this is not a puzzle with a solution. Each heir is deeply human - admirable and frightening in different measures.',
      keyEvents: [
        'Audience with King Aldric: the task is given, the clock starts',
        'Week with Serenna: she runs the intelligence network, shows the party how she keeps the kingdom safe through fear and information. She is effective and terrifying.',
        'Week with Theron: he runs the orphanages and temples, shows the party genuine compassion. Then a border lord defies him and he crumbles.',
        'Week with Cael: competent administration, military acumen, effortless charm. And the party catches him in a lie that does not matter - yet.',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Factions',
      summary:
        'The party navigates the factions backing each heir. Alliances shift. Bribes are offered. Threats are made. Each faction has legitimate grievances and selfish motives tangled together. The party also notices the king is getting worse faster than expected.',
      keyEvents: [
        'The Border Lords demand military strength - they back Cael',
        'The Merchant Guild wants a parliament - they back Theron, who promised reform',
        'The Priesthood claims divine right of selection - they back Serenna, who funded their cathedral',
        'An assassination attempt on one heir (which heir depends on who the party favors)',
        'The party discovers the poisoning - but the trail leads to Voss, not any heir',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Crown',
      summary:
        'Voss exposed. The invasion revealed. The party must rally a fractured kingdom behind a single heir in days, not months. Each choice has consequences that play out in an epilogue the DM narrates based on the party decision.',
      keyEvents: [
        'Confrontation with Voss - he is not a fighter, but he has leverage and hostages',
        'The invading army crosses the border. Valdris needs a leader NOW.',
        'The party makes their recommendation to the assembled court',
        'Coronation and the new ruler\'s first command: how to face the invasion',
        'Epilogue: the DM narrates the next ten years based on who was crowned',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Princess Serenna',
      role: 'heir candidate (intelligence)',
      personality:
        'Speaks softly. Knows everything about everyone. Built the kingdom\'s spy network from scratch. She will do what is necessary without hesitation and that is exactly the problem. She is not evil. She is efficient. The line between those gets thin.',
      secret: 'She already knows about Voss. She has been gathering evidence. She did not tell anyone because she wants to reveal it at the perfect political moment.',
    },
    {
      name: 'Prince Theron',
      role: 'heir candidate (compassion)',
      personality:
        'Genuinely good. Volunteers at hospices. Remembers the names of servants\' children. Terrible at confrontation. Cries when he is angry instead of shouting. The kingdom would be kind under him and it might not survive.',
      secret: 'He does not want the throne. He never has. He is only in the running because his father asked him not to withdraw.',
    },
    {
      name: 'Prince Cael',
      role: 'heir candidate (competence)',
      personality:
        'The most capable administrator of the three. Good with soldiers, good with numbers, good with people. Lies the way other people breathe - casually, constantly, about things that do not matter. Until they do.',
      secret: 'He has been negotiating with the invading empire independently, trying to buy time. His "lies" are a survival strategy he learned from a childhood where his siblings outshone him.',
    },
    {
      name: 'Chancellor Voss',
      role: 'antagonist / trusted advisor',
      personality:
        'Grandfatherly. Warm. Has served the crown for thirty years. Pours tea for everyone. The last person anyone would suspect. He sold out the kingdom not from malice but from a cold calculation that Valdris cannot survive its succession intact.',
      secret: 'He believes he is saving lives by orchestrating a peaceful surrender through controlled collapse. In his mind, he is the hero.',
    },
  ],
  keyLocations: [
    {
      name: 'The Ember Throne Room',
      description:
        'A throne carved from a single piece of blackite ore, warm to the touch. The room is smaller than expected. Aldric insisted on removing the ostentatious decorations his father installed. It feels almost intimate.',
      significance: 'Where the king tasks the party, and where the coronation takes place.',
    },
    {
      name: 'Serenna\'s Map Room',
      description:
        'A windowless chamber beneath the castle. Every wall covered in maps, notes, and threads connecting names. It smells like candle wax and secrets.',
      significance: 'Where Serenna reveals how she actually runs the kingdom.',
    },
    {
      name: 'The People\'s Quarter',
      description:
        'The poorest district of the capital, where Theron spends most of his time. Cramped streets, open-air kitchens, children who know the prince by name.',
      significance: 'Where the party sees what kindness without power looks like.',
    },
  ],
  dataSystems: [
    'courtIntrigue',
    'npcRelationshipWeb',
    'factionReputation',
    'diplomaticNegotiation',
    'socialEncounter',
    'detectiveCase',
    'massCombat',
    'partyMoraleTracker',
  ],
};
