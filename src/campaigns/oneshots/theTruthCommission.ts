import type { OneShotCampaign } from '../types';

export const theTruthCommission: OneShotCampaign = {
  id: 'oneshot-truth-commission',
  type: 'oneshot',
  title: 'The Truth Commission',
  tagline: 'The tyrant fell. Now comes the hard part: justice without revenge.',
  tone: 'political',
  themes: ['political', 'intrigue', 'social'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The dictator Kael Duskmantle ruled for twenty years. He fell three months ago. The new government created a Truth Commission to hear testimony from victims and perpetrators. The party runs the commission. Today: three victims testify, two perpetrators seek amnesty, and one case blurs the line between both.',
  hook: 'The commission chair hands the party the day\'s docket: "Three victims. Two former officials seeking amnesty. One case that will test everything you believe about justice. The city is watching. The world is watching. Be fair. That is all I ask."',
  twist: 'One of the "victims" - a resistance leader named Sera - ordered a bombing during the revolution that killed twelve civilians, including children. She has come to testify about her own torture under the regime. But a perpetrator on today\'s docket was the officer who investigated HER bombing. The torturer and the bomber are both in the same room, both guilty, both victims.',
  climax: 'Sera\'s testimony and the officer\'s amnesty hearing collide. The crowd demands justice for both. The party must navigate a case where no one is purely innocent, everyone has suffered, and the new government\'s legitimacy rests on how the commission handles this moment.',
  scenes: [
    {
      title: 'Scene 1: Morning Testimony',
      summary: 'Three victims testify about life under the regime. Disappearances, imprisonment, loss. The party listens and records.',
      challenge: 'social',
      keyEvents: [
        'A shopkeeper: arrested for selling banned books, spent five years in prison, lost his family',
        'A teacher: forced to teach propaganda, fired when she refused, her children were taken',
        'A soldier: conscripted, ordered to burn a village, deserted, was hunted for years',
        'The weight: each story is real, specific, and impossible to reduce to politics',
      ],
    },
    {
      title: 'Scene 2: The Amnesty Hearings',
      summary: 'Two former regime officials request amnesty. One is genuinely remorseful. One is performing remorse for a lighter sentence.',
      challenge: 'social',
      keyEvents: [
        'Official One: a prison warden who claims she protected inmates secretly - some survivors confirm it',
        'Official Two: a propaganda minister who says he was "following orders" - his sincerity is questionable',
        'The crowd: victims in the gallery, some angry, some weeping, some numb',
        'The standard: amnesty requires full disclosure and genuine acknowledgment - the party decides what qualifies',
      ],
    },
    {
      title: 'Scene 3: The Hard Case',
      summary: 'Sera the resistance bomber and Captain Roth the torturer. Both guilty. Both suffering. The commission must decide.',
      challenge: 'social',
      keyEvents: [
        'Sera testifies: she was tortured for six months after her arrest',
        'Captain Roth seeks amnesty: he investigated the bombing and "used harsh methods" - he tortured Sera',
        'The revelation: Sera\'s bombing killed twelve civilians - including Roth\'s daughter',
        'The impossible question: the party must decide what justice looks like when everyone is broken',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Sera Voss', role: 'victim / perpetrator', personality: 'A resistance leader who did terrible things for a cause she believed in. Haunted by the bombing. Haunted by the torture. Neither cancels the other.' },
    { name: 'Captain Roth', role: 'perpetrator / victim', personality: 'A former secret police officer who tortured the woman who killed his daughter. His grief does not justify his cruelty. His cruelty does not erase his grief.' },
    { name: 'Commissioner Adela', role: 'commission chair', personality: 'The chair who appointed the party. A former judge who insists on process even when emotion demands shortcuts. "Justice without procedure is just another word for revenge."' },
  ],
  keyLocations: [
    { name: 'The Commission Hall', description: 'A converted courthouse. Witness chairs, a long table for the commissioners, a gallery packed with citizens. Every word echoes.', significance: 'Where testimony is given and justice is attempted.' },
    { name: 'The Waiting Room', description: 'Where witnesses wait before testifying. Victims and perpetrators separated by a thin wall. The tension is physical.', significance: 'Where the party talks to witnesses privately.' },
    { name: 'The Gallery', description: 'Public seating in the commission hall. Victims\' families, journalists, and citizens who need to hear the truth.', significance: 'The audience whose reaction shapes the commission\'s legitimacy.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
