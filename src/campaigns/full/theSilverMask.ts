import type { FullCampaign } from '../types';

export const theSilverMask: FullCampaign = {
  id: 'full-silver-mask',
  type: 'full',
  title: 'The Silver Mask',
  tagline: 'Everyone in the city wears a mask. Yours just started whispering.',
  tone: 'mystery',
  themes: ['mystery', 'urban', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 2, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Masquerade is built on a tradition: everyone wears a mask in public. Rank, identity, and social status are conveyed through mask design. Removing your mask in public is the greatest taboo. The party arrives and receives standard visitor masks — silver, plain, anonymous. Then the masks start whispering. They show visions of crimes. They know secrets. Someone enchanted the visitor masks, and now the party can see what the city is hiding.',
  hook: 'At the city gate, every visitor is fitted with a silver mask. "Tradition," says the gate guard. That night, the party\'s masks whisper: names, locations, crimes. A vision shows a murder that hasn\'t happened yet. The masks want the party to stop it.',
  twist:
    'The masks are fragments of the city\'s founder — an archmage who bound her consciousness into the mask tradition to protect the city forever. She can see through every mask. She knows every crime. But she can\'t act — she can only speak through visitor masks that aren\'t bound by city enchantments. The city\'s ruling council knows she\'s watching and has been working to destroy her consciousness permanently so they can rule without oversight.',
  climax:
    'The council performs a ritual to shatter the founder\'s consciousness. If they succeed, every mask in the city goes dark — no more protection, no more surveillance, and the criminals the masks have been keeping in check are unleashed. The party must stop the ritual, save the founder, and decide: does the city need an all-seeing protector, or does surveillance — even benevolent — go too far?',
  acts: [
    {
      title: 'Act 1: The Whispering Masks',
      summary:
        'The party arrives, receives their masks, and discovers they can see crimes. They prevent the first murder. The city\'s power structure becomes apparent.',
      keyEvents: [
        'Arrival and mask fitting — the masks are more than decorative',
        'First whisper: a vision of a murder in the Theater District tonight',
        'The murder prevented — but the would-be killer has powerful connections',
        'The masks explain: they are fragments of someone who loves this city',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Behind the Masks',
      summary:
        'Investigation into the mask tradition, the founder, and the council\'s plot. Each council member has reasons to want the founder silenced — some selfish, some arguably valid.',
      keyEvents: [
        'The Masquerade Library — history of the founder and the mask enchantment',
        'Council members confronted: the corrupt, the idealistic, the frightened',
        'A philosophical debate: is an all-seeing protector a tyrant or a guardian?',
        'The ritual preparations discovered — the council is moving quickly',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Unmask',
      summary:
        'The ritual to destroy the founder begins. The party must choose sides. Fighting through masked agents to reach the ritual chamber.',
      keyEvents: [
        'The ritual begins — masks across the city flicker and dim',
        'The founder speaks through the party\'s masks: "I don\'t want to die. But I understand why they\'re afraid."',
        'Combat through the Masquerade Palace — every guard is masked, identities unknown',
        'The final choice: save the founder, let her die, or transform the surveillance into something consensual',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Founder (through masks)',
      role: 'quest giver / moral question',
      personality:
        'Speaks through the party\'s masks in fragments — warm, protective, occasionally overwhelmed by seeing every crime simultaneously. She loves the city. She also knows she\'s become something the city didn\'t ask for.',
      secret: 'She chose to bind herself. But she didn\'t ask the city\'s permission. That\'s the council\'s real argument: consent.',
    },
    {
      name: 'Councillor Vex',
      role: 'primary antagonist',
      personality:
        'Head of the council, driven by genuine belief that surveillance is wrong — even benevolent surveillance. Articulate, principled, and willing to kill for freedom from observation.',
    },
    {
      name: 'Councillor Maren',
      role: 'sympathetic antagonist',
      personality:
        'A council member who supports destroying the founder because her own mask showed her a family secret she never wanted to know. "Privacy isn\'t a luxury. It\'s a right."',
    },
    {
      name: 'The Mask Maker',
      role: 'ally / craftsman',
      personality:
        'The artisan who crafts the city\'s masks. Knows the enchantment intimately. Loyal to the founder but conflicted. "I build the eyes. I don\'t get to choose what they see."',
    },
  ],
  keyLocations: [
    {
      name: 'The City of Masquerade',
      description: 'A beautiful city where every face is hidden behind an ornate mask. Identity is fluid, reputation is everything.',
      significance: 'The entire campaign takes place here.',
    },
    {
      name: 'The Masquerade Palace',
      description: 'Where the council meets and the founder\'s consciousness is anchored. The most heavily masked building in the city.',
      significance: 'Where the ritual and final confrontation take place.',
    },
    {
      name: 'The Mask Maker\'s Workshop',
      description: 'A cluttered studio where every mask tells a story. The founder\'s original mask is in a locked case.',
      significance: 'Where the party learns to communicate with the founder.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'courtIntrigue',
    'npcRelationshipWeb',
    'socialEncounter',
    'undergroundFaction',
    'npcSchedule',
    'politicalEvent',
    'darkBargain',
    'secretSociety',
  ],
};
