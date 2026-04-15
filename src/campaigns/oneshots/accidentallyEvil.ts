import type { OneShotCampaign } from '../types';

export const accidentallyEvil: OneShotCampaign = {
  id: 'oneshot-accidentally-evil',
  type: 'oneshot',
  title: 'Accidentally Evil',
  tagline: 'Every good deed has an unintended evil consequence. Save the orphanage? Front for a cult. Heal the sick man? Serial killer. Helping always backfires.',
  tone: 'shenanigans',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 3,
  settingSummary:
    'The town of Goodhaven is cursed. Not with dark magic, but with ironic consequences. Every good deed performed within the town limits produces an equal and opposite evil result. Save a drowning man? He is a con artist who robs the tavern. Donate to the temple? The gold funds a summoning ritual. Help an old woman cross the street? She is a hag and now she has reached the orphanage. The curse was placed by a trickster god who was offended by the town\'s self-righteousness and wanted to teach them that virtue is not as simple as they think. The party must figure out how to do genuine good in a town where helping always backfires.',
  hook: 'The party arrives in Goodhaven. A child is stuck in a tree. The fighter helps the child down. The child runs straight to the market, steals a pie, and triggers a chain of events that ends with the baker\'s shop on fire. A woman screams "HEROES DID THIS!" The party has been in town for three minutes and is already responsible for arson. A nervous priest approaches: "Thank you for coming. We need help. Please... stop helping."',
  twist:
    'The curse has a loophole: it only affects INTENTIONALLY good deeds. Actions done for selfish reasons, or actions done without knowing they are helpful, produce GOOD outcomes. The party must do good by pretending to be selfish. Rob the temple (the stolen gold was cursed and removing it breaks a hex). Insult the old woman (she laughs for the first time in years and her depression lifts). Refuse to save the drowning man (he learns to swim and gains the confidence to change his life). Virtue through vice.',
  climax:
    'The trickster god manifests to watch the party navigate his curse. He expects them to either give up or become genuinely evil. Instead, the party has figured out the loophole and is performing selfish acts that accidentally produce good outcomes. The trickster is DELIGHTED. "You understood! Virtue is not about LOOKING good. It is about OUTCOMES. You are the first group in 50 years to get it!" He offers to lift the curse if the party performs one final act: something that looks completely selfish but saves the entire town. They must steal the sacred relic from the temple (the relic is what anchors the curse).',
  scenes: [
    {
      title: 'Scene 1: Good Intentions, Bad Results',
      summary:
        'The party tries to help and everything goes wrong. Each good deed triggers an escalating chain of negative consequences. They learn the pattern: kindness causes catastrophe in Goodhaven.',
      challenge: 'social',
      keyEvents: [
        'Helping the child from the tree: leads to theft, fire, and a screaming mob. The party is accused of being agents of chaos.',
        'Healing a sick merchant: he recovers, returns to his shop, and sells cursed goods that poison half the market district.',
        'Donating gold to the orphanage: the orphanage uses it to hire a "tutor" who is actually a necromancer recruiting child apprentices.',
        'The priest explains: "Every good deed backfires. We have stopped helping each other. The town is frozen. Nobody does anything because everything makes it worse."',
      ],
    },
    {
      title: 'Scene 2: The Loophole',
      summary:
        'The party discovers that selfish actions produce good results. They must rewire their instincts: be rude to help, steal to save, refuse to rescue. It feels wrong. It works.',
      challenge: 'exploration',
      keyEvents: [
        'The rogue steals from a merchant out of frustration. The stolen goods turn out to be the cursed items poisoning the market. Theft saved lives.',
        'The barbarian insults a grieving widow. She gets angry, snaps out of her depression, and rallies the town guard for the first time in months.',
        'The wizard refuses to help a farmer with his broken fence. The farmer fixes it himself, discovers a hidden cellar underneath, and finds his grandfather\'s lost fortune.',
        'The pattern clicks: good intentions = bad results. Selfish intentions = good results. The curse inverts morality.',
      ],
    },
    {
      title: 'Scene 3: The Sacred Theft',
      summary:
        'The trickster god appears. The party must steal the sacred temple relic - the most selfish, sacrilegious act possible - to break the curse permanently.',
      challenge: 'social',
      keyEvents: [
        'The trickster god manifests: "Most groups become paralyzed or genuinely evil. You found the middle path. I am impressed. Genuinely."',
        'He reveals: the sacred temple relic anchors the curse. Removing it breaks everything. But it MUST be stolen, not given. An act of apparent evil to do actual good.',
        'The party robs the temple while the town watches in horror. The priest knows what they are doing and cannot explain. The townsfolk think the heroes are villains.',
        'The relic is removed. The curse lifts. Good deeds work normally again. The town realizes what the party did. The child from Scene 1 brings them a pie. It is the stolen pie. Everyone laughs.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'The Trickster God (Ironis)',
      role: 'curse creator / moral philosopher / audience',
      personality:
        'A trickster deity who cursed Goodhaven because he was annoyed by their performative virtue. He does not want to destroy them - he wants to teach them that good intentions are not the same as good outcomes. He is genuinely pleased when the party figures out the loophole.',
      secret: 'He was a mortal from Goodhaven who ascended. He cursed his own hometown because they exiled him for being "not virtuous enough." He was the town drunk.',
    },
    {
      name: 'Father Aldwin',
      role: 'quest giver / the one who understands',
      personality:
        'The town priest who figured out the curse years ago but cannot ACT on it because his every good intention backfires. He has been paralyzed: unable to help, unable to stop helping, trapped in moral stasis. "I know what must be done. I cannot do it. My intentions are too pure. I need someone... less noble."',
    },
    {
      name: 'The Child (Pip)',
      role: 'recurring chaos agent / innocent',
      personality:
        'A child who keeps appearing at the worst moments. Every time the party helps Pip, something goes catastrophically wrong. Pip is not cursed - Pip is just a normal child in a cursed town who keeps needing help.',
    },
  ],
  keyLocations: [
    {
      name: 'Goodhaven',
      description:
        'A picturesque town that has been frozen in moral paralysis. Everyone is afraid to help anyone. Neighbors do not speak. The temple is full but nobody prays (prayers are good deeds). The market functions on exact transactions only - no kindness, no favors.',
      significance: 'The entire adventure takes place in and around this town. Every location is a moral trap.',
    },
    {
      name: 'The Temple of Light',
      description:
        'Goodhaven\'s central temple housing the sacred relic that anchors the curse. Beautiful, well-maintained, and the site of the final act: a theft that saves a town.',
      significance: 'The climax location where the party must commit apparent evil for actual good.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'plotTwistEngine',
    'combatNarration',
    'fantasyInsults',
    'moralDilemma',
  ],
};
