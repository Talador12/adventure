import type { FullCampaign } from '../types';

export const theMourningMarches: FullCampaign = {
  id: 'full-mourning-marches',
  type: 'full',
  title: 'The Mourning Marches',
  tagline: 'An army of the dead walks toward the capital. They do not want war. They want justice.',
  tone: 'serious',
  themes: ['war', 'horror', 'political'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 13 },
  estimatedSessions: 15,
  settingSummary:
    'Ten years ago, the kingdom sacrificed an entire province to stop a demonic invasion—sealing the borders and letting everyone inside die. Now the dead of that province are marching on the capital, not as mindless undead but as conscious spirits seeking acknowledgment of their sacrifice. The kingdom sees them as a threat. The party must navigate between the living and the dead to prevent a war no one wants.',
  hook: 'The party is hired to investigate the approaching "undead army" and discovers the dead can talk, reason, and remember their lives. They are led by the former provincial governor who just wants an apology.',
  twist:
    'The seal was unnecessary. The royal advisor who recommended it knew the demon invasion would burn itself out in days. The sacrifice was ordered to seize the province\'s resources for the crown, not to save the kingdom.',
  climax:
    'The dead reach the capital\'s gates. The king must either publicly admit the sacrifice was unnecessary (destroying his legitimacy) or fight a war against victims seeking only acknowledgment. The party holds the power to negotiate or escalate.',
  acts: [
    {
      title: 'Act 1: The March',
      summary:
        'The party travels with the dead, learning their stories and understanding that they are not a threat unless attacked. They face hostility from terrified living communities along the way.',
      keyEvents: [
        'First encounter with the March—discovering the dead are sentient and peaceful',
        'Meeting Governor Aldric, leader of the dead, who explains their demand: recognition and apology',
        'Defending the March from living militias who attack out of fear',
        'Uncovering evidence that the original sacrifice order was falsified',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Truth',
      summary:
        'The party investigates the original decision, finding proof that the advisor manipulated the king. They must decide whether to expose the truth or find another solution that does not destroy the kingdom.',
      keyEvents: [
        'Infiltrating the royal archives to find the original invasion reports',
        'Meeting the royal advisor, who believes the sacrifice was necessary for the greater good',
        'The king\'s dilemma—he is beginning to suspect he was deceived',
        'A faction of the dead grows impatient and considers violence',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Gates',
      summary:
        'The March reaches the capital. The party must negotiate between the dead and the living, expose the truth, and find a resolution that honors the sacrifice without destroying the kingdom.',
      keyEvents: [
        'Arrival at the capital—armies mobilized, tensions at breaking point',
        'Public confrontation where the truth is revealed',
        'The advisor\'s attempted coup to maintain control',
        'Final resolution—peace, war, or something between',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Governor Aldric',
      role: 'leader of the dead',
      personality:
        'Former provincial ruler who died with his people. Dignified, sad, determined to get recognition for their sacrifice. Does not want revenge—just acknowledgment.',
    },
    {
      name: 'King Alderan',
      role: 'tragic monarch',
      personality:
        'Ruler who genuinely believed he was saving his kingdom. Learning he was manipulated is breaking him. Willing to do what is right, even at the cost of his crown.',
    },
    {
      name: 'Advisor Thorn',
      role: 'villain',
      personality:
        'Cold pragmatist who believes some must be sacrificed for the greater good. Views the March as inconvenient truth that must be suppressed.',
      secret: 'He personally wrote the orders that sent the province to die. The King never saw them. Thorn has been manipulating history to protect himself, not the kingdom.',
    },
    {
      name: 'Sister Mercy',
      role: 'peacekeeper',
      personality:
        'Cleric traveling with the March, keeping the dead focused on their peaceful goal. Afraid violence will damn them all.',
    },
  ],
  keyLocations: [
    {
      name: 'The March Route',
      description:
        'The path from the sealed province to the capital, lined with communities reacting with fear, sympathy, or hostility to the dead passing through.',
      significance: 'Main setting and site of early encounters.',
    },
    {
      name: 'The Sealed Province',
      description:
        'The dead landscape where a million people died. Still marked by the demonic invasion that the sacrifice failed to stop.',
      significance: 'Source of evidence about the original decision.',
    },
    {
      name: 'The Capital Gates',
      description:
        'Where the March ends and the confrontation occurs. Armies, diplomats, and the fate of the kingdom converge here.',
      significance: 'Final location and site of resolution.',
    },
  ],
  dataSystems: ['massCombat', 'diplomaticNegotiation', 'hauntedLocation', 'siegeDefense'],
};
