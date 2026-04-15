import type { OneShotCampaign } from '../types';

export const theWhistleblower: OneShotCampaign = {
  id: 'oneshot-whistleblower',
  type: 'oneshot',
  title: 'The Whistleblower',
  tagline: 'A clerk found the receipts. Now everyone wants her dead. Get the evidence out before they burn it all.',
  tone: 'political',
  themes: ['political', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Nella, a junior clerk in the Royal Treasury, discovered that the Lord Treasurer has been siphoning funds meant for public infrastructure into private accounts for a decade. Bridges that should exist do not. Hospitals that were funded were never built. Nella copied the ledgers. Now the Treasury Guard is hunting her. The party must get Nella and the evidence to the independent judiciary before the Lord Treasurer destroys the originals at dawn.',
  hook: 'Nella stumbles into the party\'s inn, bleeding from a crossbow bolt: "I work in the Treasury. I found proof the Lord Treasurer stole millions. They are burning the originals right now. I have copies. The judiciary opens at dawn. I need to survive until then. Please."',
  twist: 'The Lord Treasurer is not acting alone. Half the city council is complicit - they all took cuts. Nella\'s evidence implicates not just one person but the entire ruling class. The judiciary itself has a compromised judge. Getting the evidence to the RIGHT judge is the real challenge.',
  climax: 'Dawn. The judiciary building. Two judges are present - one clean, one bought. The Treasury Guard surrounds the building. The party must get Nella to Judge Orvaan (the honest one) while the corrupt Judge Pellam tries to have the evidence "sealed for review" - meaning buried forever.',
  scenes: [
    {
      title: 'Scene 1: The Run',
      summary: 'Protecting Nella through the city at night while Treasury Guards search every district. The party must move, hide, and fight.',
      challenge: 'exploration',
      keyEvents: [
        'Nella\'s injury: she needs healing or she will not make it to dawn',
        'The Treasury Guards: organized, armed, checking every inn and safe house',
        'The evidence: copied ledgers showing ten years of theft totaling millions in gold',
        'Safe house options: a sympathetic priest, an underground newspaper, or the sewers',
      ],
    },
    {
      title: 'Scene 2: The Bigger Picture',
      summary: 'While hiding, the party reviews the evidence and realizes the scope. Nella explains who is implicated.',
      challenge: 'social',
      keyEvents: [
        'The ledgers: infrastructure funds diverted to private accounts across half the council',
        'Nella\'s realization: "It is not one person. It is the whole system."',
        'The compromised judge: Nella knows Judge Pellam took money - the party must avoid him',
        'Planning the approach: which entrance, which judge, how to get past the guard cordon',
      ],
    },
    {
      title: 'Scene 3: The Judiciary',
      summary: 'Dawn arrives. The party must breach the guard cordon, navigate the courthouse, and reach Judge Orvaan before Pellam can intervene.',
      challenge: 'combat',
      keyEvents: [
        'The cordon: Treasury Guards surrounding the building - fight through or find another way in',
        'Inside: Judge Pellam is already there, claiming jurisdiction over "treasury matters"',
        'The race: getting to Judge Orvaan\'s chamber before Pellam can issue a seizure order',
        'The testimony: Nella presents the evidence, the judge reads it, and the city changes forever',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Nella Briggs', role: 'whistleblower', personality: 'A young human clerk who is terrified but resolute. She did not plan to be brave. She just could not look at the numbers and stay silent. Practical, shaking, determined.' },
    { name: 'Lord Treasurer Vance', role: 'primary antagonist', personality: 'A charming, well-dressed man who has stolen enough gold to build a small kingdom. Believes he deserves it. "I kept this city running for a decade. The money is my fee."', secret: 'He is already preparing to flee the country. The guard response is his backup plan.' },
    { name: 'Judge Orvaan', role: 'ally', personality: 'An elderly dwarf judge known for being incorruptible. Has been suspicious of the treasury for years but never had proof. Will act on the evidence immediately.' },
  ],
  keyLocations: [
    { name: 'The City Streets (Night)', description: 'Dark, patrolled, dangerous. Every alley could hide a guard or a friend. The party must cross the city by dawn.', significance: 'The gauntlet the party must navigate to survive the night.' },
    { name: 'The Judiciary Building', description: 'A stone courthouse with two wings - Pellam\'s to the left, Orvaan\'s to the right. Treasury Guards ring the entrance.', significance: 'Where the evidence must be delivered and the truth spoken.' },
    { name: 'The Underground Press', description: 'A hidden printing operation run by dissidents. They can copy and distribute the evidence if given time.', significance: 'A backup plan - even if Nella does not make it, the truth can still get out.' },
  ],
  dataSystems: ['socialEncounter', 'chaseSequence', 'encounterWaves', 'combatNarration'],
};
