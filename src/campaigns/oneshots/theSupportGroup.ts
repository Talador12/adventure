import type { OneShotCampaign } from '../types';

export const theSupportGroup: OneShotCampaign = {
  id: 'oneshot-the-support-group',
  type: 'oneshot',
  title: 'The Support Group',
  tagline: 'Hi, my name is Vex, and I am a vampire who hates blood. It has been 200 years.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'In the basement of a community center in Easthaven, a support group meets every Thursday night. It is called Monsters Anonymous. The members are monsters who are tired of being monsters. They sit in a circle on folding chairs. There are stale cookies. There is weak tea. There is a werewolf who brought a therapy dog (who is terrified of him). The group has been struggling since their facilitator quit last month. The party accidentally walks into the wrong room - they were looking for the adventurers\' guild meeting next door - and is immediately recruited as the new group therapy facilitators.',
  hook: 'The party opens the wrong door and finds a circle of monsters sitting on folding chairs. A vampire raises his hand. "Are you the new facilitators? Please say yes. Gerald has been crying for twenty minutes and none of us know what to do." Gerald is a gelatinous cube. He is, in fact, quivering. The monsters are not hostile. They are sad. The party is now in charge of group therapy for a vampire, a werewolf, a beholder, a gelatinous cube, and a lich who is having an existential crisis.',
  twist:
    'The group\'s original facilitator did not quit. She was kidnapped by a monster hunter who has been tracking the group. He plans to use her notes to find and destroy every member. The monsters have not been attending lately because they sensed danger. Tonight they all showed up because they heard new facilitators were coming - the monster hunter spread that rumor to lure them all into one place. The attack is coming.',
  climax:
    'The monster hunter and his team burst in during the trust exercise. The monsters freeze - they have spent months learning not to fight. The party must protect the group, rally the monsters to defend themselves (with the emotional context of their therapeutic breakthroughs), and stop the hunter. Gerald the gelatinous cube engulfs a hunter and will not let go. The beholder, who was self-conscious about his eyes, uses every single one. The vampire, who hates blood, reluctantly bites someone to save a friend. It is triumphant and bittersweet.',
  scenes: [
    {
      title: 'Scene 1: Introductions',
      summary:
        'The party accidentally joins Monsters Anonymous and begins facilitating. Each monster introduces themselves and shares their struggle. It is funny and unexpectedly moving.',
      challenge: 'social',
      keyEvents: [
        'Vex the vampire: hates blood, lives on tomato soup, his fangs are mostly decorative at this point',
        'Fenris the werewolf: allergic to his own fur, transforms and immediately starts sneezing',
        'Ophelia the beholder: self-conscious about her eyes, wears a collection of tiny hats on her eyestalks',
        'Gerald the gelatinous cube: cannot stop absorbing things, dissolved the last facilitator\'s clipboard',
      ],
    },
    {
      title: 'Scene 2: Breakthroughs and Breakdowns',
      summary:
        'The party runs exercises: trust falls (the gelatinous cube absorbs anyone who falls), visualization (the beholder visualizes too literally with her eye beams), and sharing (the lich shares too much). Progress is made. Then clues about the missing facilitator emerge.',
      challenge: 'social',
      keyEvents: [
        'Trust fall: Gerald volunteers. He is a cube. Several people are absorbed. They survive.',
        'The lich, Mordenkainen Jr., has an existential crisis about whether undeath counts as living',
        'Discovery: the facilitator\'s notes are missing. A forced entry mark on the back door.',
        'Ophelia uses her central eye to detect scrying: someone is watching the building right now',
      ],
    },
    {
      title: 'Scene 3: The Intervention',
      summary:
        'The monster hunter attacks. The monsters must overcome their pacifist therapy mindset to defend themselves and each other. The party leads them.',
      challenge: 'combat',
      keyEvents: [
        'Monster hunters burst in mid-trust exercise. "We found all of you in one place. Perfect."',
        'The monsters freeze - they have been trained NOT to fight. The party must rally them.',
        'Each monster uses their abilities in ways that reflect their therapeutic breakthroughs',
        'The facilitator is rescued from the hunter\'s wagon. Group therapy saves her and vice versa.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Vex Sanguine',
      role: 'group member / ally',
      personality:
        'A 400-year-old vampire who realized he hated blood approximately 398 years ago. Lives on tomato soup and denial. His fangs have receded from disuse. "I know what you are thinking. A vampire who does not drink blood. Yes, it is as inconvenient as it sounds."',
    },
    {
      name: 'Ophelia',
      role: 'group member / ally',
      personality:
        'A beholder who is deeply self-conscious about having eleven eyes. She wears tiny knitted hats on each eyestalk (she knits them herself). She thinks everyone is staring at her. They are, but only because the hats are adorable.',
    },
    {
      name: 'Gerald',
      role: 'group member / comic relief',
      personality:
        'A gelatinous cube who absorbs things involuntarily and feels terrible about it. He has absorbed six clipboards, four folding chairs, and the facilitator\'s favorite pen. He quivers when sad, which is often.',
    },
    {
      name: 'Harken Voss',
      role: 'villain',
      personality:
        'A monster hunter who believes all monsters are irredeemable. He considers Monsters Anonymous an abomination. He is wrong, and the party will prove it.',
    },
  ],
  keyLocations: [
    {
      name: 'The Community Center Basement',
      description: 'A fluorescent-lit room with folding chairs, a water-stained ceiling, and a banner that reads "You Are Enough" (partially dissolved by Gerald). It is where healing happens.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Parking Lot',
      description: 'Where the monster hunter\'s wagon is parked, containing the kidnapped facilitator and enough silver weapons to arm a small militia.',
      significance: 'The facilitator rescue location and the source of the final clue.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'npcRelationWeb',
    'plotTwistEngine',
    'partyDynamic',
  ],
};
