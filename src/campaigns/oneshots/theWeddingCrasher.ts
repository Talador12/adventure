import type { OneShotCampaign } from '../types';

export const theWeddingCrasher: OneShotCampaign = {
  id: 'oneshot-wedding-crasher',
  type: 'oneshot',
  title: 'The Wedding Crasher',
  tagline: 'The bride is a dragon. The groom doesn\'t know. The cake is cursed. Go.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 4,
  settingSummary:
    'The party is hired as last-minute event security for the high-society wedding of Lord Percival and Lady Emmeline. Unknown to the groom, Emmeline is actually an adult copper dragon in permanent human form who genuinely fell in love with this clueless nobleman. Unknown to both, Percival\'s ex has cursed the wedding cake. Unknown to everyone, Emmeline\'s dragon mother is attending and hates mortals.',
  hook: 'A panicked wedding planner shoves the party into matching uniforms: "Security! The caterer quit, the mother-in-law is terrifying, and someone enchanted the ice sculpture. You\'re on door duty, food duty, and please-gods-don\'t-let-anything-go-wrong duty. Here\'s the seating chart. The wedding is in one hour."',
  twist:
    'The mother of the bride — a terrifying older woman named Aurelion — is an ancient gold dragon who disapproves of the marriage. She hasn\'t come to stop it; she\'s come to test Percival. Every "crisis" at the wedding is a test she arranged. The cursed cake, the enchanted ice sculpture, the suspicious guests — all her. If Percival handles the chaos with courage and love, she\'ll accept him. If not, she eats him.',
  climax:
    'All the crises converge during the ceremony. The cake curse activates (everyone who ate it starts floating), the ice sculpture comes to life, and Aurelion reveals her dragon form to test Percival. The party must manage all three simultaneously while the ceremony continues. Percival either rises to the occasion or the party has to save him — either way, the wedding must go on.',
  scenes: [
    {
      title: 'Scene 1: Pre-Ceremony Chaos',
      summary:
        'One hour before the wedding. Everything is going wrong. The party must solve logistical nightmares while noticing that something supernatural is happening.',
      challenge: 'social',
      keyEvents: [
        'Seating chart disaster — two feuding noble families placed next to each other',
        'The cake is glowing faintly (nobody else notices)',
        'Mother Aurelion arrives — the temperature drops ten degrees',
        'Lady Emmeline pulls the party aside: "If anything happens, protect Percival. ANYTHING."',
      ],
    },
    {
      title: 'Scene 2: The Ceremony Begins',
      summary:
        'The wedding starts. The party maintains security while crises escalate. Subtle at first (a guest acting strangely, food behaving oddly), then increasingly wild.',
      challenge: 'exploration',
      keyEvents: [
        'The vows begin — everything seems fine (it\'s not)',
        'A guest transforms into a sheep (Aurelion\'s test: "handle the unexpected")',
        'The ice sculpture develops opinions about the decor',
        'The cake curse primes — everyone who ate appetizers starts floating slightly',
      ],
    },
    {
      title: 'Scene 3: The Test',
      summary:
        'All hell breaks loose. The party must manage three simultaneous crises while the ceremony reaches its climax. Percival is tested, and Emmeline\'s secret threatens to come out.',
      challenge: 'combat',
      keyEvents: [
        'Cake curse activates — 40 guests are floating, screaming, some enjoying it',
        'Ice sculpture becomes hostile — the party fights a beautiful frozen swan',
        'Aurelion reveals her dragon form: "MORTAL. WHY SHOULD I ALLOW THIS?"',
        'Percival\'s response — and whether the party helps him impress or saves him from being lunch',
      ],
    },
    {
      title: 'Scene 4: The Reception',
      summary:
        'Resolution. The wedding either succeeds beautifully or beautifully fails. Either way, there\'s an open bar and a lot to talk about.',
      challenge: 'social',
      keyEvents: [
        'Aurelion\'s verdict — acceptance or... negotiation',
        'Emmeline\'s secret: does Percival find out she\'s a dragon?',
        'The reception: the party is invited as honored guests (or given a very large tip)',
        'The bouquet toss — the bouquet is mildly enchanted',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Lord Percival Fancyworth',
      role: 'the groom / oblivious',
      personality:
        'A sweet, earnest nobleman who is genuinely in love and completely unaware that anything supernatural is happening. "Darling, why is your mother... larger than I remember?"',
    },
    {
      name: 'Lady Emmeline',
      role: 'the bride / adult copper dragon',
      personality:
        'A copper dragon who fell in love with a human and has been living in permanent human form for three years. Warm, witty, terrified her mother will eat her fiance.',
      secret: 'She hasn\'t told Percival. She keeps meaning to. There\'s never a good time to say "I\'m a dragon."',
    },
    {
      name: 'Aurelion',
      role: 'mother-in-law / ancient gold dragon',
      personality:
        'Appears as an intimidating older woman with gold eyes. Speaks in clipped, judgmental sentences. Actually protective of her daughter — she just has very high standards for sons-in-law.',
      secret: 'She\'s already decided to accept Percival if he shows courage. The tests are a formality. She just enjoys watching mortals squirm.',
    },
  ],
  keyLocations: [
    {
      name: 'Fancyworth Manor',
      description:
        'An elegant estate decorated for the wedding. Flowers everywhere. An ice sculpture of the happy couple. A suspiciously glowing cake.',
      significance: 'The entire one-shot takes place here.',
    },
    {
      name: 'The Ceremony Garden',
      description:
        'A beautiful outdoor space with rows of chairs, a flower arch, and a view of the lake. Currently on fire (slightly).',
      significance: 'Where the ceremony and climactic chaos occur.',
    },
    {
      name: 'The Kitchens',
      description:
        'Where the cursed cake was prepared and where evidence of the enchantments can be found.',
      significance: 'Investigation location for the cake curse.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'enchantedFoodDrink',
    'dragonPersonality',
    'npcRelationshipWeb',
    'combatNarration',
    'nobleScandalGen',
  ],
};
