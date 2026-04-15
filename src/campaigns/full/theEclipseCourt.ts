import type { FullCampaign } from '../types';

export const theEclipseCourt: FullCampaign = {
  id: 'full-eclipse-court',
  type: 'full',
  title: 'The Eclipse Court',
  tagline: 'The sun went out three weeks ago. Your shadow kept moving.',
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
        'The eclipse begins - shadows detach from their owners and stand up. They do not mirror their owners. They bow to something the party cannot see.',
        'Meeting the Shadow Tax collectors who demand life essence as tribute. They speak in the voices of the people they shadow. They smell like cold stone.',
        'Finding survivors hiding in light-warded sanctuaries. A child draws pictures of a sun she has never seen - she was born during the last eclipse. The pictures are wrong. Too many rays.',
        'Discovery that the eclipse should have ended days ago. The astronomers have gone silent. Their instruments show nothing. One astronomer sits in her observatory repeating "the math is right, the math is right" while her shadow paces behind her.',
        'Quiet dread: the party lights a torch. Their shadows flicker normally. Then one shadow turns to look at them. Just for a moment. Then it is a shadow again.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Dual Throne',
      summary:
        'The party investigates why the eclipse persists, uncovering the secret pact between surface and shadow rulers. They must navigate both societies—hated as living in the Court, as rebels on the surface.',
      keyEvents: [
        'Infiltrating the Eclipse Court as "tribute bearers." The Court is beautiful - architecture of living shadow, staircases that float on nothing, light that comes from darkness. The air smells like cold metal and midnight.',
        'Discovering the ritual site where surface nobles trade citizens for power. The stones are stained with life essence. The nobles\' names are carved into the altar. The party recognizes one of the names.',
        'Meeting the Shadow Queen, who is more reasonable than expected. She offers the party tea. The cup casts no shadow. Neither does the tea. She is polite in a way that makes the party\'s skin crawl with how normal it feels.',
        'Learning the surface king has broken the pact, causing the permanent eclipse. His throne room is half-shadow now. He sits in it, half his face in light, half in dark. He does not notice.',
        'Quiet dread: the party sleeps in the Eclipse Court. They dream of sunlight. They wake and cannot remember the color of the sun. It comes back slowly. One of them takes longer than the others.',
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
        'Ancient shadow sovereign who honors the ancient pacts. She speaks in a whisper that fills the room, as if the darkness itself is her voice box. Not evil, just from a different realm with different needs. She tilts her head when she listens, and the tilt goes further than a neck should allow. Willing to negotiate if approached with respect.',
    },
    {
      name: 'King Aldric',
      role: 'surface antagonist',
      personality:
        'Corrupted ruler who tried to cheat the eclipse pact. Now trapped between realms, half-shadow himself. One eye is dark, one is light. He speaks in two voices simultaneously - his own and his shadow\'s. His hands shake when he reaches for solid objects, as if unsure they will be there.',
      secret: 'He can still be saved. The shadow transformation is not complete and Queen Nocturne knows the reversal ritual, but she will only perform it if the surface kingdom surrenders the stolen eclipse stone.',
    },
    {
      name: 'Sister Light',
      role: 'resistance leader',
      personality:
        'Cleric maintaining sanctuaries for refugees. She has not slept since the eclipse began - her eyes are bloodshot and her hands glow faintly with maintained warding spells. She speaks in short, clipped commands and flinches when shadows move, which is always. She keeps count of the people she has lost. She taps the number on her thigh when she thinks nobody is watching.',
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
