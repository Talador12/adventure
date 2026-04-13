import type { FullCampaign } from '../types';

export const theEclipseCourt: FullCampaign = {
  id: 'full-eclipse-court',
  type: 'full',
  title: 'The Eclipse Court',
  tagline: 'When the sun dies, the shadow throne claims its due.',
  tone: 'horror',
  themes: ['dark_fantasy', 'political', 'survival'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 4, end: 12 },
  estimatedSessions: 14,
  settingSummary:
    'Every thousand years, a solar eclipse lasts for a month and the Court of Shadows rises from the dark places of the world. For this month, shadow creatures rule the surface, and the living must pay tribute or hide. The party is caught outside when the eclipse begins and must survive while uncovering why this eclipse is different—it is not ending.',
  hook: 'The party is traveling when the eclipse begins three days early. They watch as shadows detach from their owners and take physical form, bowing to aristocratic shadow-beings who demand submission from the living.',
  twist:
    'The Eclipse Court is not a natural phenomenon—it is maintained by a ritual performed by the surface rulers who trade the lives of their poorest citizens for shadow magic. This year, the Court has decided the deal is unequal and intends to make the eclipse permanent.',
  climax:
    'The party must infiltrate both the Eclipse Court and the surface capital simultaneously, breaking the ritual chains that bind the two worlds together while surviving the shadow war raging between them.',
  acts: [
    {
      title: 'Act 1: Night Without End',
      summary:
        'The party survives the initial transition as shadows become physical. They learn the rules of Eclipse Month and discover this eclipse is not following the normal patterns.',
      keyEvents: [
        'The eclipse begins—shadows detach and take form',
        'Meeting the Shadow Tax collectors who demand life essence as tribute',
        'Finding survivors hiding in light-warded sanctuaries',
        'Discovery that the eclipse should have ended days ago',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Dual Throne',
      summary:
        'The party investigates why the eclipse persists, uncovering the secret pact between surface and shadow rulers. They must navigate both societies—hated as living in the Court, as rebels on the surface.',
      keyEvents: [
        'Infiltrating the Eclipse Court as "tribute bearers"',
        'Discovering the ritual site where surface nobles trade citizens for power',
        'Meeting the Shadow Queen, who is more reasonable than expected',
        'Learning the surface king has broken the pact, causing the permanent eclipse',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Breaking the Chains',
      summary:
        'With the eclipse becoming permanent, both worlds begin to collapse. The party must destroy the ritual bindings simultaneously in both realms to restore natural order.',
      keyEvents: [
        'The convergence—both courts meeting at the ritual site',
        'Battle through shadow and living guards to reach the ritual core',
        'Destroying the binding artifacts in both realms simultaneously',
        'The sun returns—dealing with the aftermath and the revealed conspiracies',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Queen Nocturne',
      role: 'shadow ruler',
      personality:
        'Ancient shadow sovereign who honors the ancient pacts. Not evil, just from a different realm with different needs. Willing to negotiate if approached with respect.',
    },
    {
      name: 'King Aldric',
      role: 'surface antagonist',
      personality:
        'Corrupted ruler who tried to cheat the eclipse pact to gain unlimited shadow power. Now trapped between realms, half-shadow himself.',
      secret: 'He can still be saved. The shadow transformation is not complete and Queen Nocturne knows the reversal ritual, but she will only perform it if the surface kingdom surrenders the stolen eclipse stone.',
    },
    {
      name: 'Sister Light',
      role: 'resistance leader',
      personality:
        'Cleric maintaining sanctuaries for refugees. Practical, exhausted, willing to make hard choices to protect the innocent.',
    },
  ],
  keyLocations: [
    {
      name: 'The Shadow Lands',
      description:
        'The world during eclipse—dark, cold, populated by shadow versions of everything. Beautiful in a terrifying way.',
      significance: 'Main setting during the eclipse.',
    },
    {
      name: 'The Eclipse Court',
      description:
        'The shadow rulers\' palace, existing in both realms simultaneously. Architecture of impossible shadows.',
      significance: 'Political center and site of negotiations.',
    },
    {
      name: 'The Binding Site',
      description:
        'Where the ritual connecting both worlds is maintained. Located at a place that exists in both realms simultaneously.',
      significance: 'Final location and site of the climactic battle.',
    },
  ],
  dataSystems: ['vampireBloodline', 'darkBargain', 'hauntedLocation', 'magicalAnomaly'],
};
