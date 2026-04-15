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
    'Ten years ago, the kingdom sacrificed an entire province to stop a demonic invasion - sealing the borders and letting everyone inside die. Now the dead of that province are marching on the capital, not as mindless undead but as conscious spirits seeking acknowledgment of their sacrifice. The kingdom sees them as a threat. The party must navigate between the living and the dead to prevent a war no one wants.',
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
        'First encounter with the March - discovering the dead are sentient and peaceful. A woman carries a baby that stopped aging when it died. She rocks it and hums.',
        'Meeting Governor Aldric, leader of the dead. He still wears his chain of office. He explains their demand: recognition and apology. Not revenge.',
        'Defending the March from living militias who attack out of fear. The dead do not fight back until provoked.',
        'Quiet moment: a dead soldier walks beside a living party member. He asks about the harvest this year. He was a farmer before. "Is the wheat still good in Thornvale? I miss the smell."',
        'Uncovering evidence that the original sacrifice order was falsified. The documents do not match the official history.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Truth',
      summary:
        'The party investigates the original decision, finding proof that the advisor manipulated the king. They must decide whether to expose the truth or find another solution that does not destroy the kingdom.',
      keyEvents: [
        'Infiltrating the royal archives to find the original invasion reports. The reports say the demons were dying on their own.',
        'Meeting Advisor Thorn. He is calm, measured, and utterly convinced the sacrifice was justified regardless of the demon threat. "The province was failing. The resources were needed. I made a decision."',
        'The moment of cost: the king begins to suspect he was deceived. He is not angry - he is terrified. If the truth comes out, everything he built on that sacrifice crumbles.',
        'A faction of the dead grows impatient and considers violence. Governor Aldric struggles to hold them back. "We came for justice, not revenge. But ten years of being forgotten makes the distinction difficult."',
        'Quiet moment: Sister Mercy sits with a dead mother who lost her children in the sacrifice. She cannot heal the dead. She can only listen.',
        'If the party defended the March in Act 1, the living communities along the route begin to support the dead\'s cause.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Gates',
      summary:
        'The March reaches the capital. The party must negotiate between the dead and the living, expose the truth, and find a resolution that honors the sacrifice without destroying the kingdom.',
      keyEvents: [
        'Arrival at the capital - armies mobilized, tensions at breaking point. The dead stand in silent rows. The living stand on the walls.',
        'Public confrontation where the truth is revealed. The king\'s face when he reads the original reports.',
        'Advisor Thorn\'s attempted coup to maintain control. He would rather burn the kingdom than admit what he did.',
        'Quiet moment: Governor Aldric stands at the gate and addresses the king directly. "I served you for thirty years. I died for your decision. I am asking for seven words. \'We know what happened and we are sorry.\'"',
        'Final resolution - peace, war, or something between. If the party built trust on both sides, a memorial is possible. If not, the dead march home with nothing.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Governor Aldric',
      role: 'leader of the dead',
      personality:
        'Former provincial ruler who died with his people. Dignified, sad, determined to get recognition for their sacrifice. Adjusts his chain of office out of habit. Does not want revenge - just acknowledgment. "We did not choose to die. We chose to die without complaint. That was our gift. All we ask is that someone remembers."',
      secret: 'Arc: begins as diplomat, tested as the march meets resistance. If the party fails to secure peace, he is the one who must decide whether to let his people\'s patience become rage.',
    },
    {
      name: 'King Alderan',
      role: 'tragic monarch',
      personality:
        'Ruler who genuinely believed he was saving his kingdom. Rubs his temples when stressed. Has aged twenty years in the last ten. Learning he was manipulated is breaking him. Willing to do what is right, even at the cost of his crown.',
    },
    {
      name: 'Advisor Thorn',
      role: 'villain',
      personality:
        'Cold pragmatist who believes some must be sacrificed for the greater good. Speaks in conditionals: "If we had not acted," "Had the province survived," "Were the truth to emerge." Never a declarative sentence about what he actually did.',
      secret: 'He personally wrote the orders that sent the province to die. The King never saw them. Thorn has been manipulating history to protect himself, not the kingdom. Arc: does not soften. Doubles down. Some people are so invested in their lie that the truth is an existential threat.',
    },
    {
      name: 'Sister Mercy',
      role: 'peacekeeper',
      personality:
        'Cleric traveling with the March, keeping the dead focused on their peaceful goal. Afraid violence will damn them all. Her holy symbol glows faintly around the dead - she is the only living person some of them will speak to. "I cannot heal them. I can witness them. Sometimes that is enough."',
    },
  ],
  keyLocations: [
    {
      name: 'The March Route',
      description:
        'The path from the sealed province to the capital, lined with communities reacting with fear, sympathy, or hostility to the dead passing through. Flowers appear on the roadside where sympathizers leave them.',
      significance: 'Main setting and site of early encounters.',
    },
    {
      name: 'The Sealed Province',
      description:
        'The dead landscape where a million people died. Still marked by the demonic invasion that the sacrifice was supposed to stop. The demons are gone. The scars remain.',
      significance: 'Source of evidence about the original decision.',
    },
    {
      name: 'The Capital Gates',
      description:
        'Where the March ends and the confrontation occurs. Armies, diplomats, and the fate of the kingdom converge here. The dead stand in the formation they held when they died.',
      significance: 'Final location and site of resolution.',
    },
  ],
  dataSystems: [
    'massCombat',
    'diplomaticNegotiation',
    'hauntedLocation',
    'siegeDefense',
    'socialEncounter',
    'moralDilemma',
  ],
};
