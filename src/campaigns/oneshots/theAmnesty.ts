import type { OneShotCampaign } from '../types';

export const theAmnesty: OneShotCampaign = {
  id: 'oneshot-amnesty',
  type: 'oneshot',
  title: 'The Amnesty',
  tagline: 'The new government offers forgiveness. One applicant does not deserve it. You decide.',
  tone: 'political',
  themes: ['political', 'intrigue', 'social'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'After the civil war, the new government offers amnesty to former soldiers of the defeated regime. Lay down your weapons, confess your actions, and be forgiven. Hundreds have applied. The party is the amnesty review board for today\'s cases. Most are straightforward - scared soldiers who followed orders. One is not. Colonel Varen commanded the Ashfield Massacre. He is applying for amnesty. The survivors are in the gallery.',
  hook: 'The review board chair sets the files before the party: "Twelve applications today. Eleven are soldiers who want to go home. One is Colonel Varen. He killed two hundred people at Ashfield. He says he was following orders. The survivors say he volunteered. You decide who goes free."',
  twist: 'Varen did follow orders at Ashfield - but the orders came from General Storne, who is now a hero of the new government. Storne switched sides during the war and is credited with winning the final battle. If Varen tells the truth about who gave the Ashfield order, it implicates the new regime\'s greatest hero. Amnesty for Varen means the truth stays buried. Denying amnesty means a trial where everything comes out.',
  climax: 'Varen\'s hearing. He tells the truth about General Storne. A survivor confronts him from the gallery. The party must decide: grant amnesty (protecting the new government\'s hero but freeing a war criminal), deny amnesty (forcing a trial that will shake the new government), or find a third path.',
  scenes: [
    {
      title: 'Scene 1: The Morning Cases',
      summary: 'Routine amnesty hearings. Scared soldiers, genuine remorse, straightforward decisions. Building context for the hard case.',
      challenge: 'social',
      keyEvents: [
        'A young conscript: 16 when drafted, never fired a weapon at a person, wants to see his mother',
        'A medic: served the old regime but treated both sides in secret - should she even need amnesty?',
        'A guard: watched prisoners die of neglect and did nothing - passive complicity, not active cruelty',
        'The pattern: most cases are grey, not black and white. The party develops their moral framework.',
      ],
    },
    {
      title: 'Scene 2: Varen\'s File',
      summary: 'Reviewing Colonel Varen\'s record before his hearing. Meeting the Ashfield survivors. Understanding the scope.',
      challenge: 'exploration',
      keyEvents: [
        'The file: military records, witness statements, the Ashfield death count - two hundred civilians',
        'The survivors: families who lost everyone, here to watch. Their presence is testimony.',
        'Varen\'s pre-hearing interview: calm, precise, military bearing, claims chain of command defense',
        'The discrepancy: Varen says "ordered by General Storne" - but Storne is the new government\'s hero',
      ],
    },
    {
      title: 'Scene 3: The Hearing',
      summary: 'Colonel Varen sits before the board. The gallery holds its breath. The truth is uglier than anyone expected.',
      challenge: 'social',
      keyEvents: [
        'Varen\'s testimony: detailed, specific, naming General Storne as the source of the Ashfield order',
        'The survivor\'s response: a woman who lost three children stands and speaks - raw, devastating',
        'The political pressure: a government aide whispers that implicating Storne would destabilize the peace',
        'The decision: amnesty, denial, or referral for full trial - each option has consequences the party must weigh',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Colonel Varen', role: 'applicant', personality: 'Answers every question in exactly three sentences. Never uses the word "killed" - always "neutralized" or "processed." When asked about the children at Ashfield, he pauses for exactly two seconds, then continues in the same flat voice. His calm is more disturbing than rage.' },
    { name: 'Mira of Ashfield', role: 'survivor', personality: 'Speaks slowly, deliberately, as if placing each word on the table like evidence. Never raises her voice. Lists her children by name, age, and what they wanted to be when they grew up. Calls Varen "the Colonel" - never his name.' },
    { name: 'General Storne', role: 'absent power', personality: 'Not present, but his portrait hangs in the hall. Quotes from his victory speech are carved into the building. Every time Varen says "I was ordered," someone glances at that portrait.', secret: 'He gave the Ashfield order, then defected to the winning side before anyone could hold him accountable.' },
  ],
  keyLocations: [
    { name: 'The Amnesty Hall', description: 'A converted assembly room with a long table for the board, a witness chair, and a gallery of survivors, families, and journalists.', significance: 'Where every decision is made and witnessed.' },
    { name: 'The Records Office', description: 'A basement archive of military records, war crimes documentation, and amnesty applications stacked to the ceiling.', significance: 'Where the party reviews Varen\'s file and finds the discrepancy.' },
    { name: 'The Gallery', description: 'Rows of seats filled with people who lost everything. They are here to watch justice happen - or fail.', significance: 'The moral weight of the audience.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
