import type { OneShotCampaign } from '../types';

export const thePoisonedPatron: OneShotCampaign = {
  id: 'oneshot-poisoned-patron',
  type: 'oneshot',
  title: 'The Poisoned Patron',
  tagline: 'Someone at this banquet is a murderer. The soup course is in 20 minutes.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 4,
  settingSummary:
    'A noble banquet in a locked manor. Duke Aldermere collapses mid-toast — poisoned. The doors seal magically (the Duke\'s own security system, triggered by his incapacitation). Nobody leaves until the poisoner is found. The party has access to 8 suspects, the crime scene, and a ticking clock: the poison will kill the Duke in one hour unless the antidote is found.',
  hook: 'The party is attending a banquet (for any reason — hired security, guests, entertainment). The Duke drinks, coughs, collapses. The doors slam shut and seal. A magical voice announces: "Security protocol active. No exit until threat is resolved." The clock starts.',
  twist:
    'The Duke poisoned himself. He\'s staging his own murder to expose his wife\'s affair with his business partner. The "poison" is a sleeping draught, and the real danger is that his wife — who doesn\'t know it\'s fake — is about to confess to a murder she didn\'t commit to protect her lover.',
  climax:
    'The party must decide: expose the Duke\'s deception (humiliating him and ruining the marriage), let the wife confess (destroying an innocent person), find the sleeping draught antidote and wake the Duke (forcing him to face consequences), or engineer a solution that saves everyone\'s dignity.',
  scenes: [
    {
      title: 'Scene 1: The Collapse',
      summary:
        'The Duke falls. Chaos erupts. The doors seal. The party must take charge, secure the scene, and begin investigating.',
      challenge: 'social',
      keyEvents: [
        'Duke Aldermere collapses mid-toast — dramatic, public, undeniable',
        'Magical lockdown — nobody in or out for one hour',
        'The party establishes authority (persuasion, intimidation, or credentials)',
        'Initial scene examination — the goblet, the wine, the seating chart',
      ],
    },
    {
      title: 'Scene 2: The Investigation',
      summary:
        'Interrogate 8 suspects, examine evidence, and follow leads. Every suspect has a motive, an alibi with holes, and a secret they\'re hiding (but only one relates to the "murder").',
      challenge: 'exploration',
      keyEvents: [
        'Suspect interviews — the wife, the partner, the rival, the servant, the chef, the heir, the priest, the bodyguard',
        'Physical evidence — the goblet (no residue), a vial in the kitchen, a torn letter',
        'Contradicting alibis — two suspects cover for each other',
        'The clock ticks — 30 minutes remain',
      ],
    },
    {
      title: 'Scene 3: The Truth',
      summary:
        'The evidence points in multiple directions. The wife is about to confess. The party must reach the truth before an innocent person takes the fall.',
      challenge: 'social',
      keyEvents: [
        'The wife begins her confession — the party can interrupt or let her continue',
        'The sleeping draught is identified — Arcana or Medicine check',
        'The Duke\'s journal found in his study — reveals the deception',
        'Resolution: expose, cover up, negotiate, or let it play out',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Duke Aldermere',
      role: 'victim / secret antagonist',
      personality:
        'Appears to be the victim. Actually a petty, jealous man who would rather destroy his own party than admit he\'s been cuckolded.',
      secret: 'He poisoned himself with a sleeping draught. The whole thing is theater.',
    },
    {
      name: 'Lady Elara Aldermere',
      role: 'primary suspect / innocent',
      personality:
        'Graceful, composed, and currently barely holding it together. She loves her husband\'s business partner and is about to confess to a murder she didn\'t commit to protect him.',
    },
    {
      name: 'Castellan Voss',
      role: 'red herring',
      personality:
        'The Duke\'s head of security who has been skimming funds. He thinks the investigation will expose his embezzlement and is acting extremely suspicious as a result.',
    },
    {
      name: 'Chef Morel',
      role: 'witness',
      personality:
        'The chef who prepared the meal. Extremely defensive about the food quality. "My soup does NOT kill people!"',
    },
  ],
  keyLocations: [
    {
      name: 'The Grand Dining Hall',
      description:
        'An opulent room with a long table, now a crime scene. The seating chart is a clue map.',
      significance: 'Where the crime occurred and suspects are gathered.',
    },
    {
      name: 'The Kitchen',
      description:
        'Below stairs, where the food was prepared. A vial of sleeping draught is hidden in a spice cabinet.',
      significance: 'Key evidence location.',
    },
    {
      name: 'The Duke\'s Study',
      description:
        'A private room adjacent to the hall. The Duke\'s journal and correspondence are here.',
      significance: 'Where the truth is revealed.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcSchedule',
    'socialEncounter',
    'poisonCrafting',
    'npcBackstoryGen',
    'nobleScandalGen',
  ],
};
