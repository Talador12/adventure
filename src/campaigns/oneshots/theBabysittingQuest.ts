import type { OneShotCampaign } from '../types';

export const theBabysittingQuest: OneShotCampaign = {
  id: 'oneshot-babysitting-quest',
  type: 'oneshot',
  title: 'The Babysitting Quest',
  tagline: 'The wizard\'s kids have magic. The wizard is gone for the night. Good luck.',
  tone: 'comedic',
  themes: ['comedy', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The party owes a favor to Archmage Theodora. She\'s calling it in: babysit her three children for one evening while she attends a gala. The children are 4, 7, and 11. They all have wild magic. The 4-year-old turns things into frogs when upset. The 7-year-old is invisible when scared. The 11-year-old has accidentally opened a portal in the basement. Bedtime is in 4 hours.',
  hook: '"They\'re wonderful children. Very well-behaved. Just... don\'t let Pip touch anything metal, don\'t let Wren see spiders, and under NO circumstances let Ash go in the basement. There\'s leftover stew in the icebox. I\'ll be home by midnight." The door closes. Something croaks from the kitchen.',
  twist: 'The 11-year-old (Ash) opened the basement portal on purpose — she\'s been communicating with a fey creature who promised to teach her "real magic" if she lets it through. The portal is almost stable. If the party doesn\'t close it before midnight, a very charming, very dangerous fey entity walks into the house.',
  climax: 'The portal opens fully. The fey entity steps through — charming, beautiful, and very interested in three magically gifted children. The party must protect the kids, close the portal, and deal with a fey who technically was invited in. All while getting the children to bed on time, because Theodora WILL check.',
  scenes: [
    {
      title: 'Scene 1: The First Hour',
      summary: 'Getting to know the kids, discovering their magical quirks, and the first disaster: Pip turns the family cat into a frog.',
      challenge: 'social',
      keyEvents: [
        'Meet the kids: Pip (4, wild magic), Wren (7, invisibility), Ash (11, suspiciously quiet)',
        'The cat-frog incident — Pip is crying, the frog is angry',
        'Wren sees a spider and vanishes — the party must find an invisible 7-year-old',
        'Ash is in the basement. The door is locked. She says she\'s "reading."',
      ],
    },
    {
      title: 'Scene 2: Escalation',
      summary: 'Pip\'s magic gets wilder, Wren finds the snack stash, and the party discovers the basement portal.',
      challenge: 'exploration',
      keyEvents: [
        'Pip\'s tantrum: turns three rooms of furniture into frogs',
        'Wren, invisible, has eaten an entire cake and is vibrating with sugar',
        'The basement: a glowing portal, a circle drawn in chalk, and Ash talking to something',
        'The fey voice through the portal: "Just a little longer, dear. I\'m almost there."',
      ],
    },
    {
      title: 'Scene 3: Bedtime',
      summary: 'The portal opens. A fey steps through. The kids need protecting and the portal needs closing — ideally before Theodora gets home.',
      challenge: 'combat',
      keyEvents: [
        'The fey manifests: beautiful, kind-seeming, and offering Ash "everything she wants"',
        'Ash is tempted — she\'s lonely and wants to be a "real wizard" like her mom',
        'Combat/negotiation with the fey while protecting three panicking, magically gifted children',
        'Portal closed, fey banished, kids in bed, house cleaned — right as the door opens',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Ash (age 11)', role: 'oldest child / portal opener', personality: 'Smart, lonely, feels overshadowed by her mother\'s fame. The fey told her she was special. Nobody else has.', secret: 'She knows the portal is dangerous. She opened it because she wanted to prove she could do something her mother couldn\'t.' },
    { name: 'Pip (age 4)', role: 'youngest / wild magic chaos', personality: 'A tiny child with enormous magical power and no control. Happy = sparkles. Sad = frogs. Angry = DO NOT MAKE PIP ANGRY.' },
    { name: 'Wren (age 7)', role: 'middle child / invisible', personality: 'Anxious, sensitive, turns invisible when overwhelmed. Loves the party if they\'re nice. Hides otherwise.' },
    { name: 'Glimmer (the fey)', role: 'antagonist', personality: 'A fey creature who collects magically gifted children as "students." Charming, patient, and persistent. Not evil in a fey context — but very dangerous in a mortal one.' },
  ],
  keyLocations: [
    { name: 'Theodora\'s House', description: 'A large, well-warded wizard\'s home. Every room has magical objects, safety enchantments, and at least one thing that shouldn\'t be touched.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Basement', description: 'Theodora\'s private lab, now containing a glowing fey portal drawn in chalk by an 11-year-old.', significance: 'Where the portal threat originates.' },
    { name: 'The Kids\' Rooms', description: 'Three bedrooms reflecting three very different children. Ash\'s has hidden spellbooks. Pip\'s has frog-proof furniture. Wren\'s has glow-in-the-dark stars.', significance: 'Where bedtime happens (eventually).' },
  ],
  dataSystems: ['wildMagicSurge', 'socialEncounter', 'summoningMishap', 'darkBargain', 'combatNarration'],
};
