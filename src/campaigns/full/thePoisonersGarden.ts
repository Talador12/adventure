import type { FullCampaign } from '../types';

export const thePoisonersGarden: FullCampaign = {
  id: 'full-poisoners-garden',
  type: 'full',
  title: 'The Poisoner\'s Garden',
  tagline: 'A healer is killing the city\'s elite. Every victim deserved it.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 9 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Aurelia has a problem it will not admit: its most powerful citizens are dying of natural causes, one by one. A lord\'s heart gave out. A general\'s liver failed. A judge choked on nothing. All natural. All plausible. All wrong. A master poisoner is at work, using botanical toxins so rare and so precisely dosed that they mimic natural death perfectly. The party is hired by the one noble who suspects foul play — because she thinks she is next.',
  hook: 'Lady Merrin Ashcroft contacts the party in secret. "Three lords dead in two months. The physicians say natural causes. I say someone is very good at what they do. I found this in Lord Harwick\'s study after he died." She shows them a dried flower — rare, beautiful, and one of the most toxic plants in the world. Someone left it as a signature.',
  twist:
    'The poisoner is a healer named Thessa Vane. She is not killing for power or profit. Every person she has killed was a war criminal who escaped justice after the Aurelia-Kethren War. They burned her village, killed her family, and were pardoned by the crown for political convenience. The courts failed. The crown shielded them. Thessa spent fifteen years learning botany, medicine, and patience. The party must decide: turn her in to a justice system that already failed her, or let her finish her list — knowing that vengeance dressed as justice is still vengeance.',
  climax:
    'Thessa has one name left on her list: General Aldric Croft, the man who gave the order to burn her village. Croft knows someone is killing his old comrades and has hired his own protection. The party must choose their side before the final act. If they stop Thessa, Croft lives free. If they let her finish, a woman who became a killer to avenge the innocent adds one more body to her count. If they find a third option — public exposure of the war crimes — they risk political upheaval.',
  acts: [
    {
      title: 'Act 1: Natural Causes',
      summary:
        'Three dead nobles. The party investigates each death, finding inconsistencies the physicians missed. Each victim leads to a rare botanical specimen and a trail toward a hidden garden.',
      keyEvents: [
        'Lady Ashcroft\'s briefing: the dried flower, the three deaths, her fear',
        'Autopsy investigation: a sympathetic physician helps identify trace botanical compounds',
        'The flower trail: each victim received a rare bloom before death — a calling card',
        'The hidden garden: a secluded greenhouse on the city outskirts, full of deadly beauty',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Healer\'s Motive',
      summary:
        'The trail leads to Thessa Vane, a respected healer. The party investigates her past and discovers the war crimes — and that every victim was guilty.',
      keyEvents: [
        'Thessa identified through botanical expertise — she treated nobles publicly while poisoning them privately',
        'The war records: the Aurelia-Kethren War, the village of Ashenford, the massacre',
        'Testimony from survivors: Thessa\'s village was burned, civilians killed, soldiers pardoned',
        'Moral fracture: the party must reconcile a killer they sympathize with and victims who were monsters',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Last Name',
      summary:
        'General Croft is the final target. Thessa is preparing. Croft is fortified. The party\'s choice determines what justice looks like in Aurelia.',
      keyEvents: [
        'Croft\'s fortress: the general knows he is a target and has hired mercenaries',
        'Thessa\'s preparation: she has been growing the final poison for a year — it is exquisite and lethal',
        'The party chooses: stop Thessa, help Thessa, or expose the war crimes publicly',
        'The aftermath: whatever they choose changes Aurelia\'s political landscape permanently',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Thessa Vane',
      role: 'poisoner / sympathetic antagonist',
      personality:
        'A gentle, soft-spoken healer who smells faintly of lavender and antiseptic. Holds patients\' hands while she talks to them. Hums while she works. Her clinic is spotless. She is warm, kind, and genuinely cares about the sick. She is also a meticulous killer who has spent fifteen years planning the deaths of six people who destroyed everything she loved. "Healing and killing require the same knowledge. Dosage is the only difference."',
      secret: 'She does not enjoy the killing. She throws up after each one. She will stop when the list is done. She will not stop before.',
    },
    {
      name: 'Lady Merrin Ashcroft',
      role: 'patron / potential target',
      personality:
        'A sharp-witted noblewoman who suspects she is on the poisoner\'s list. She is not — she was not involved in the war — but her paranoia drives the investigation.',
    },
    {
      name: 'General Aldric Croft',
      role: 'final target / war criminal',
      personality:
        'A decorated military hero to the public. A monster to the villages he burned. He knows what he did. He sleeps fine. "War is war. We won. That is what matters."',
    },
    {
      name: 'Dr. Lena Marsh',
      role: 'forensic ally',
      personality:
        'A physician who was suspicious about the "natural" deaths but lacked the resources to investigate. Meticulous, ethical, and horrified by what the party uncovers.',
    },
  ],
  keyLocations: [
    {
      name: 'Aurelia',
      description: 'A wealthy, politically connected city still living off the prestige of a war that ended fifteen years ago. Beautiful, powerful, and rotten underneath.',
      significance: 'The campaign setting — every investigation thread leads through its districts.',
    },
    {
      name: 'The Hidden Garden',
      description: 'A secluded greenhouse where Thessa cultivates the rarest and most dangerous plants in the world. Beautiful and deadly in equal measure.',
      significance: 'The physical evidence of Thessa\'s work and the key to understanding her methods.',
    },
    {
      name: 'Croft\'s Estate',
      description: 'A fortified manor on the city outskirts. High walls, hired guards, and a paranoid occupant who knows his past is catching up.',
      significance: 'The site of the final confrontation, however the party chooses to play it.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcSchedule',
    'socialEncounter',
    'poisonBrewing',
    'politicalEvent',
    'npcRelationship',
    'urbanEncounter',
    'darkBargain',
  ],
};
