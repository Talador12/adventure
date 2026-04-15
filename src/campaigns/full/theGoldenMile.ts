import type { FullCampaign } from '../types';

export const theGoldenMile: FullCampaign = {
  id: 'full-the-golden-mile',
  type: 'full',
  title: 'The Golden Mile',
  tagline: 'One coin. One mile of treasure. One dragon who is technically bankrupt.',
  tone: 'heist',
  themes: ['heist', 'urban', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'Beneath the trade city of Auranvex lies a vault one mile long - a converted dwarven highway packed floor to ceiling with the hoard of Tessavraxi, an ancient gold dragon. Her wealth is not decorative. It is load-bearing. The regional economy is pegged to the hoard. Merchant guilds issue currency backed by verified pile inventories. Moving a single stack of coins in the wrong section could collapse a commodity market three cities away. The surface land directly above the vault is the most valuable real estate in the world, and the deed to it is a single platinum coin buried somewhere in the mile.',
  hook: 'A kobold in an immaculate three-piece suit slides a contract across the table. His name is Comptroller Visk, and he represents the First Consolidated Bank of Auranvex. The dragon Tessavraxi has defaulted on her loans. The bank is foreclosing. They need the party to enter the vault, locate a specific platinum coin that serves as the land deed to the surface district, and extract it without disturbing the surrounding hoard. Any disruption to the piles will destabilize the currency. The pay is excellent. The kobold is not joking. He has graphs.',
  twist:
    'Tessavraxi is broke. Completely, catastrophically broke. The hoard is leveraged six times over. She owes more than it is worth. She has been borrowing against her own treasure for centuries, using the interest to pay off older loans, in a recursive debt spiral that would make a lich weep. The foreclosure is not aggressive - it is merciful. If the party takes the wrong coin, the entire leveraged structure collapses and takes the regional economy with it. The dragon is not guarding her treasure. She is guarding her creditors from finding out there is nothing left to guard.',
  climax:
    'The party reaches the platinum deed coin deep in the vault. Tessavraxi is waiting - not hostile, but exhausted. She explains everything: the debt, the leverage, the fact that the economy above depends on everyone believing the hoard is real wealth and not a financial fiction. The party must choose: extract the coin (foreclosure succeeds, Tessavraxi loses everything, the economy survives), expose the truth (the economy collapses but the corrupt banking system goes with it), or forge a deal between the dragon and the bank that restructures the debt and keeps the illusion alive. Comptroller Visk is listening through a sending stone. He has opinions.',
  acts: [
    {
      title: 'Act 1: The Prospectus',
      summary:
        'The party is briefed, equipped, and inserted into the vault entrance. They learn the rules: every pile is catalogued, every coin is tracked, the dragon has wards that detect displacement. They must navigate the first quarter-mile while learning how the hoard economy works and why surgical precision matters.',
      keyEvents: [
        'Comptroller Visk delivers a 40-page briefing with pie charts about hoard-backed currency',
        'The vault entrance: a dwarven highway gate now sealed with gold leaf and banking wards',
        'First trap: a pile rigged to collapse if touched, which would devalue grain futures in three provinces',
        'The party meets a team of kobold auditors who live inside the vault full-time, cataloguing coins',
        'A rival salvage crew hired by a competing bank is also in the vault, working from the other end',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Audit',
      summary:
        'Deeper into the mile. The party discovers the hoard is not what it seems. Piles that should contain gold contain painted lead. Loan documents are layered six deep. The dragon has been running a Ponzi scheme with her own treasure. The rival crew is getting closer. The vault is shifting.',
      keyEvents: [
        'A pile collapses revealing painted lead underneath real gold - the hoard is partially fake',
        'Kobold auditors panic: if the fake piles are reported, the currency crashes overnight',
        'The rival crew trips a ward. Tessavraxi stirs. The vault trembles.',
        'The party finds loan documents showing the hoard has been borrowed against by six different banks',
        'Visk, via sending stone, goes very quiet when told about the leverage. Then he says: "Continue."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Foreclosure',
      summary:
        'The final stretch. The platinum deed coin is in Tessavraxi\'s personal chamber at the deepest point. The dragon is awake, aware, and not fighting - she is negotiating. The rival crew arrives. Visk wants his coin. The economy hangs on what happens in the next hour.',
      keyEvents: [
        'Tessavraxi reveals herself: exhausted, dignified, and completely honest about her debts',
        'The rival crew arrives and demands the entire hoard be liquidated immediately',
        'Visk presents the foreclosure terms through the sending stone. Tessavraxi counter-offers.',
        'The party holds the deed coin and must choose: foreclose, expose, or broker a deal',
        'Epilogue: the economic consequences of the party\'s choice ripple across the region',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Comptroller Visk',
      role: 'quest giver / patron',
      personality:
        'A kobold banker in a perfectly tailored suit who speaks in spreadsheets and considers financial literacy a moral obligation. Professional, dry, unexpectedly ruthless. He respects competence above all.',
      secret: 'He suspected the hoard was leveraged before hiring the party. The foreclosure is a controlled demolition. He wants to restructure the entire banking system with himself at the top.',
    },
    {
      name: 'Tessavraxi',
      role: 'dragon / debtor / tragic figure',
      personality:
        'An ancient gold dragon who speaks softly and carries the weight of centuries of compounding interest. She started hoarding because it was instinct. She started leveraging because everyone said it was smart. Now she cannot stop.',
      secret: 'She has not slept in forty years. She stays awake recalculating her debts. She would surrender the entire hoard if someone would just let her rest.',
    },
    {
      name: 'Gault Ironprice',
      role: 'rival / antagonist',
      personality:
        'Leader of the rival salvage crew, hired by a competing bank. A dwarf who believes all debt should be repaid in full, no exceptions, no mercy. He is not wrong. He is just inflexible.',
    },
    {
      name: 'Ledger',
      role: 'guide / comic relief',
      personality:
        'A kobold auditor who has lived inside the vault for twelve years. She knows every pile by name. Talks to the coins. Deeply alarmed by the party\'s presence but too professional to say so.',
    },
  ],
  keyLocations: [
    {
      name: 'The Golden Mile',
      description: 'A mile-long converted dwarven highway filled with treasure, organized by asset class, warded against displacement, and slowly revealing itself to be a financial fiction.',
      significance: 'The entire campaign takes place here. Each quarter-mile has a different character and a different economic secret.',
    },
    {
      name: 'The Counting Floor',
      description: 'The kobold auditors\' base camp at the vault entrance. Desks, filing cabinets, and a break room, all made from repurposed treasure chests.',
      significance: 'Where the party gets information, supplies, and increasingly alarming financial reports.',
    },
    {
      name: 'Tessavraxi\'s Chamber',
      description: 'The deepest point of the mile. A vast cavern where the dragon sits on the last genuine pile - and the platinum deed coin.',
      significance: 'The final confrontation and negotiation. The hoard\'s heart and the campaign\'s climax.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'trapMechanism',
    'merchantHaggling',
    'diplomaticNegotiation',
    'factionReputation',
    'dungeonRoom',
    'treasureHoard',
  ],
};
