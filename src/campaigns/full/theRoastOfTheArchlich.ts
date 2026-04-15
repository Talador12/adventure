import type { FullCampaign } from '../types';

export const theRoastOfTheArchlich: FullCampaign = {
  id: 'full-roast-of-the-archlich',
  type: 'full',
  title: 'The Roast of the Archlich',
  tagline: 'He is turning 1000 years undead. Make him laugh or everyone dies. No pressure.',
  tone: 'comedic',
  themes: ['comedy', 'dark_fantasy', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 12 },
  estimatedSessions: 12,
  settingSummary:
    'The archlich Mortivus the Undying is celebrating his 1000th deathday by hosting a comedy roast — of himself. He has invited the greatest performers in the realm to his necropolis for one night of jokes, insults, and celebration. The catch: his sense of humor is a millennium out of date, his patience is nonexistent, and when he does not laugh, people tend to stop being alive. The party has been "invited." Declining is not an option.',
  hook: 'An undead courier delivers gilt-edged invitations to the party: "You are cordially commanded to attend the Millennial Roast of His Eternal Majesty Mortivus the Undying. Formal attire required. Humor mandatory. Survival probable." The invitation is magically binding. They are going whether they want to or not.',
  twist:
    'Mortivus does not actually want to be roasted. He wants to be remembered. He has been undead for so long that everyone who knew him as a living person is gone. The roast is a desperate attempt to feel something — to hear people talk about who he was, even if they are making fun of him. He is not dangerous because he is evil. He is dangerous because he is grieving a life he can no longer remember, and laughter is the only thing that still makes him feel alive.',
  climax:
    'The final roast set. Mortivus is losing patience, guests are dying (some of them literally), and the party must deliver the closing act. But the real challenge is not being funny — it is being honest. A genuine, heartfelt roast that acknowledges who Mortivus was and who he became. If they go for cheap laughs, he rages. If they go for pure sincerity, he is embarrassed. The perfect set walks the line between comedy and eulogy — roasting a man at his own funeral, 1000 years late.',
  acts: [
    {
      title: 'Act 1: The Invitation You Cannot Refuse',
      summary:
        'The party arrives at the necropolis, meets the other "guests" (comedians, bards, and very nervous nobles), and learns the rules: make him laugh or suffer the consequences. Early acts bomb. People start disappearing.',
      keyEvents: [
        'Arrival at the Necropolis of Mirth — a death-themed comedy club the size of a castle',
        'Meeting the other performers: a terrified bard, a skeleton who thinks he is still funny, a demon who only does observational humor',
        'The first act bombs — Mortivus disintegrates a jester for a knock-knock joke',
        'The party realizes they need to learn what Mortivus actually finds funny',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Research and Development',
      summary:
        'The party investigates Mortivus\'s past to write material. They explore his necropolis, interview his undead servants, and piece together who he was before he became a lich. The picture that emerges is unexpectedly tragic.',
      keyEvents: [
        'Exploring the necropolis: rooms frozen in time from when Mortivus was alive',
        'His journal: he became a lich to save his dying wife, who died anyway',
        'His undead butler remembers when he used to laugh — dry, dark, self-deprecating',
        'A rival comedian is sabotaging other acts to ensure she survives',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Final Set',
      summary:
        'The roast reaches its climax. Acts are dying (figuratively and literally). The party must deliver the closing performance — a set that balances genuine humor with the truth about who Mortivus is and what he has lost. The funniest and saddest night of everyone\'s unlife.',
      keyEvents: [
        'The rival comedian\'s set: cruel, funny, and dangerously close to making Mortivus snap',
        'Mortivus begins losing control — necromantic energy surges, the dead start rising',
        'The party\'s set: comedy, tragedy, and the most important roast in history',
        'Resolution: Mortivus laughs, cries, or both — and decides what to do with eternity',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Mortivus the Undying',
      role: 'host / tragic antagonist',
      personality:
        'A 1000-year-old archlich with the demeanor of a tired late-night host. Dry, imperious, and desperately lonely. His humor is ancient — he laughs at irony, dark wit, and self-deprecation, but not at cruelty or shock value. "I have heard every joke. Surprise me. I beg you."',
      secret: 'He has a phylactery destruction ritual prepared. If someone gives him a reason to let go, he will use it. He is tired.',
    },
    {
      name: 'Belvadere the Bold',
      role: 'rival comedian / saboteur',
      personality:
        'A human bard who has survived three of Mortivus\'s previous parties by being ruthlessly funny and eliminating competition. She will stab someone backstage and deliver a punchline over the body. "Comedy is war, darling. And I never lose."',
      secret: 'She is terrified. She has nightmares about the last party. She sabotages others because if she ever has a bad set, she knows she will die.',
    },
    {
      name: 'Dustin',
      role: 'undead butler / heart of the story',
      personality:
        'Mortivus\'s skeleton butler who has served him since before the lichdom. Remembers everything. Speaks in a dry monotone that is accidentally hilarious. "The master was funnier when he had lips, sir. But I suppose we all were."',
    },
    {
      name: 'Rictus',
      role: 'skeleton comedian / opening act',
      personality:
        'A skeleton who died doing comedy 200 years ago and was raised by Mortivus to keep performing. His material is two centuries out of date. He does not know he is dead. His sets are awful but he tries so hard that it circles back to being genuinely touching.',
    },
  ],
  keyLocations: [
    {
      name: 'The Necropolis of Mirth',
      description: 'A massive underground complex converted into a comedy venue. Skull-shaped spotlights. Coffin-shaped booths. The stage is a raised sarcophagus. The bar serves drinks that glow.',
      significance: 'The venue for the roast and the site of all three acts.',
    },
    {
      name: 'The Living Quarters (Mortivus\'s Old Home)',
      description: 'Preserved rooms from when Mortivus was alive. A nursery that was never used. A wife\'s portrait. Books with bookmarks that will never be moved.',
      significance: 'Where the party learns who Mortivus was and writes their material.',
    },
    {
      name: 'The Green Room',
      description: 'Backstage area where performers prepare, panic, and occasionally get murdered by Belvadere. The snacks are surprisingly good for a necropolis.',
      significance: 'Hub for social encounters, sabotage, and alliance-building.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'fantasyInsults',
    'villainMonologue',
    'combatNarration',
    'plotTwistEngine',
    'npcRelationshipWeb',
    'moralDilemma',
    'deathAndDying',
  ],
};
