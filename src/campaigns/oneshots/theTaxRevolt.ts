import type { OneShotCampaign } from '../types';

export const theTaxRevolt: OneShotCampaign = {
  id: 'oneshot-tax-revolt',
  type: 'oneshot',
  title: 'The Tax Revolt',
  tagline: 'The village cannot pay the new tax. The collector arrives at dawn. You have one night.',
  tone: 'political',
  themes: ['political', 'social', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The village of Thornfield has been hit with a new "defense tax" - ten gold per household, due tomorrow. The average family earns three gold a month. The tax collector, accompanied by soldiers, arrives at dawn. The party must find a way to save the village: negotiate, pay, resist, or find leverage.',
  hook: 'The village elder greets the party with desperation: "The Crown says we owe a hundred gold by morning for a war we did not ask for. We have forty. The tax collector brings soldiers. We are farmers, not fighters. Can you find a way?"',
  twist: 'The "defense tax" is illegal. It was imposed by the regional lord, not the Crown. The lord pockets the money and reports it as "collected for the war effort." If the party can prove this, the tax collector himself becomes an ally - he is a Crown agent being used as a tool for fraud.',
  climax: 'Dawn. The tax collector arrives with soldiers. The party presents evidence that the tax is fraudulent. The collector reads the lord\'s forged orders. He must choose: enforce an illegal tax for a corrupt lord, or report the fraud and side with the village.',
  scenes: [
    {
      title: 'Scene 1: The Village',
      summary: 'Understanding the stakes. Meeting families who have already sold livestock and possessions trying to scrape together the money.',
      challenge: 'social',
      keyEvents: [
        'The elder: has been pooling village resources, they have forty of the hundred gold needed',
        'The families: one sold their plow horse, another their seed grain for next season',
        'The tax notice: official-looking but missing certain Crown seals and formatting',
        'A traveling merchant: heard other villages got the same tax - and the same collector',
      ],
    },
    {
      title: 'Scene 2: The Paper Trail',
      summary: 'Investigating the tax\'s legitimacy. The party follows the documentation to discover the fraud.',
      challenge: 'exploration',
      keyEvents: [
        'The tax notice: a forgery - good but not perfect, the Crown seal is slightly wrong',
        'The lord\'s manor: three hours ride, the party can reach it and return before dawn',
        'At the manor: ledgers showing taxes collected from a dozen villages, none reported to the Crown',
        'The proof: the lord\'s own accounting book, comparing "collected" to "reported" - the gap is massive',
      ],
    },
    {
      title: 'Scene 3: Dawn',
      summary: 'The confrontation. A tax collector, soldiers, a village, and evidence of fraud.',
      challenge: 'social',
      keyEvents: [
        'The collector arrives: professional, stern, not cruel - just doing his job',
        'The party presents the evidence: the forged seal, the accounting discrepancy',
        'The collector examines the documents - his face changes as he realizes he has been used',
        'The choice: the collector can arrest the village or report the lord - the evidence makes it easy',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elder Marsh', role: 'quest giver', personality: 'A weathered farmer who leads by consensus. Has never asked for help before. The shame of asking hurts more than the tax.' },
    { name: 'Tax Collector Venn', role: 'neutral turned ally', personality: 'A Crown bureaucrat who takes pride in fairness. When he discovers the fraud, his professionalism turns from enforcing the tax to enforcing the law against the lord.' },
    { name: 'Lord Castellan', role: 'absent antagonist', personality: 'The regional lord running the tax fraud. Never appears in person - his power is in documents and soldiers. A coward who exploits the Crown\'s authority for personal gain.' },
  ],
  keyLocations: [
    { name: 'Thornfield', description: 'A farming village of thirty families. Modest, hardworking, and about to lose everything to a tax they should not owe.', significance: 'The community at stake.' },
    { name: 'Castellan Manor', description: 'The regional lord\'s estate, three hours by fast horse. Guarded but not a fortress - the lord relies on legitimacy, not walls.', significance: 'Where the fraud evidence is found.' },
    { name: 'The Village Square', description: 'A dirt clearing with a well and a notice board. Tomorrow morning, it becomes a courtroom.', significance: 'Where the confrontation happens at dawn.' },
  ],
  dataSystems: ['socialEncounter', 'chaseSequence', 'npcBackstoryGen'],
};
