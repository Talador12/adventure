import type { OneShotCampaign } from '../types';

export const thePriceOfBread: OneShotCampaign = {
  id: 'oneshot-price-of-bread',
  type: 'oneshot',
  title: 'The Price of Bread',
  tagline: 'Bread tripled overnight. Someone is getting rich while the city starves.',
  tone: 'political',
  themes: ['political', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Overnight, the price of bread in Millford tripled. Bakers say flour costs more. Millers say grain costs more. Farmers say nothing has changed. Somewhere between the field and the table, someone is creating artificial scarcity to drive up prices. People are already going hungry. The party, hired by the baker\'s guild, must trace the chain and expose the profiteer.',
  hook: 'The head baker drops a loaf on the table: "This cost three coppers yesterday. Nine coppers today. My flour supplier says grain is scarce. The farmers say it is not. Someone between here and the farm is lying. Find out who, or this city riots by week\'s end."',
  twist: 'The grain baron is not hoarding grain for profit alone. He is stockpiling it because he has received a private warning that a blight is coming next season. He believes he is saving the city by building reserves - but he is doing it by starving the poor now to feed everyone later. His math might even be right. His methods are monstrous.',
  climax: 'The party confronts the grain baron in his warehouse, surrounded by mountains of grain while people go hungry outside. He presents his evidence of the coming blight. The party must decide: force him to release the grain now (saving the hungry but risking next year), negotiate a compromise, or find a third option.',
  scenes: [
    {
      title: 'Scene 1: Following the Coin',
      summary: 'Tracing the supply chain from bakery to mill to granary. Each step points to the next, and each middleman is telling half-truths.',
      challenge: 'exploration',
      keyEvents: [
        'The bakers: genuinely struggling, some closing their shops, angry at the millers',
        'The millers: paying double for grain from a single supplier - Baron Kelwick - who controls the river barges',
        'The farmers: harvested a normal crop, sold it at normal prices to Kelwick\'s agents',
        'The missing link: Kelwick\'s warehouses are full while his barges sit idle',
      ],
    },
    {
      title: 'Scene 2: The Warehouse',
      summary: 'Getting into Kelwick\'s grain warehouse to see the stockpile firsthand. Guards, locks, and a ledger that tells the real story.',
      challenge: 'exploration',
      keyEvents: [
        'The warehouse district: Kelwick\'s guards patrol three massive warehouses by the river',
        'Inside: grain stacked floor to ceiling - enough to feed the city for months',
        'The ledger: purchase records, price projections, and a letter from a druid warning of blight',
        'The guard captain: loyal to Kelwick but uneasy - he has a family that cannot afford bread either',
      ],
    },
    {
      title: 'Scene 3: The Confrontation',
      summary: 'Facing Baron Kelwick with the evidence. A moral argument with no clean answers.',
      challenge: 'social',
      keyEvents: [
        'Kelwick\'s defense: "I am saving this city. You cannot see past next week."',
        'The druid\'s warning: it is credible - the blight is real and coming',
        'The human cost: a mother from the lower district testifies about her children going hungry NOW',
        'The decision: release all grain, ration it, negotiate public disclosure, or something else entirely',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Baron Kelwick', role: 'antagonist', personality: 'A grain merchant who sees himself as a savior. Paternalistic, condescending, and genuinely worried about the future. He has not missed a meal in his life.', secret: 'He is also profiting enormously from the price increase. The blight fear is real, but so is the greed.' },
    { name: 'Hilda Crumb', role: 'quest giver', personality: 'Head of the baker\'s guild. Flour on her apron, fury in her eyes. Has been baking bread for thirty years and never turned away a hungry child.' },
    { name: 'Druid Ashwell', role: 'wild card', personality: 'The druid who warned Kelwick about the blight. Reclusive, honest, horrified to learn her warning was used to justify price gouging.' },
  ],
  keyLocations: [
    { name: 'The Baker\'s Quarter', description: 'Usually smells like fresh bread. Today it smells like worry. Half the ovens are cold.', significance: 'Where the crisis is felt most directly.' },
    { name: 'Kelwick\'s Grain Warehouse', description: 'Three massive stone buildings by the river docks. Guarded, locked, and full to bursting with grain the city desperately needs.', significance: 'Where the stockpile is hidden and the confrontation happens.' },
    { name: 'The River Docks', description: 'Kelwick\'s barges sit idle while farmers\' smaller boats are turned away. The bottleneck is physical and deliberate.', significance: 'Where the artificial scarcity is enforced.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
