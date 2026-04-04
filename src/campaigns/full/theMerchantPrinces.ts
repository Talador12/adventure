import type { FullCampaign } from '../types';

export const theMerchantPrinces: FullCampaign = {
  id: 'full-merchant-princes',
  type: 'full',
  title: 'The Merchant Princes',
  tagline: 'Gold is power. Power is gold. Welcome to the most cutthroat market in the world.',
  tone: 'political',
  themes: ['intrigue', 'urban', 'social'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 2, end: 10 },
  estimatedSessions: 16,
  settingSummary:
    'The trade city of Goldwater is ruled by five Merchant Princes — each controlling a monopoly: food, weapons, magic, transport, and information. The party arrives as entrepreneurs seeking to establish a business. To succeed, they must navigate the Princes\' games: hostile acquisitions, trade wars, espionage, and occasionally literal wars. This is a campaign about building something in a city that destroys the small.',
  hook: 'The party arrives in Goldwater with a business plan (any business — the players choose). Within a day, they learn the rules: you can\'t sell food without Prince Grainsworth\'s blessing, can\'t sell weapons without Prince Steelhand\'s cut, and information is Princess Whisper\'s domain. Starting a business means playing their game. Or changing it.',
  twist:
    'The five Princes are all aspects of the same entity — a mercantile deity that split itself into five personas to control the city more effectively. None of the Princes know they\'re fragments of the same god. Exposing this truth could either unite them (creating an all-powerful trade deity) or shatter them (destroying Goldwater\'s economic foundation).',
  climax:
    'The party\'s business success has made them a threat. All five Princes move against them simultaneously — a coordinated economic attack. The party discovers the truth about the Princes and must decide: reveal it (chaos), use it as leverage (power), or find a way to break the deity\'s hold on the city permanently (freedom).',
  acts: [
    {
      title: 'Act 1: The Startup',
      summary:
        'Establishing a business, learning the city\'s power structure, and making the first deals with (and against) the Merchant Princes.',
      keyEvents: [
        'Choosing a business: the party picks their venture (the DM adapts)',
        'First obstacles: permits, monopolies, "protection fees"',
        'Making contacts: which Prince to ally with (each has pros and cons)',
        'First success: the business turns a profit, and someone notices',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Game',
      summary:
        'Playing the Princes against each other, expanding the business, and discovering that the Princes are connected in ways nobody suspects.',
      keyEvents: [
        'Trade war: two Princes use the party as pawns against each other',
        'Business expansion: new markets, new enemies, new opportunities',
        'The connection: the party notices all five Princes share mannerisms, speech patterns',
        'A Prince warns the party: "You\'re getting too big. The others are watching."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Hostile Takeover',
      summary:
        'All five Princes move against the party. The truth is discovered. The final play.',
      keyEvents: [
        'Coordinated attack: every Prince targets the party\'s business simultaneously',
        'The deity truth discovered: five aspects, one god, total economic control',
        'The party\'s play: expose, leverage, or break — each has massive consequences',
        'The aftermath: Goldwater is changed, for better or worse, by the party\'s choice',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Prince Grainsworth (Food)',
      role: 'merchant prince / deity aspect',
      personality:
        'Jolly, generous, and absolutely ruthless about food supply. Controls every grain silo and cattle ranch. "Everyone eats. I make sure of it. For a modest fee."',
    },
    {
      name: 'Prince Steelhand (Weapons)',
      role: 'merchant prince / deity aspect',
      personality:
        'Military, disciplined, runs the weapons trade like an army. Respects strength. "A city without weapons is a city that belongs to whoever has them."',
    },
    {
      name: 'Princess Whisper (Information)',
      role: 'merchant prince / deity aspect',
      personality:
        'The most dangerous Prince — she sells secrets. Knows everything about everyone. "Information wants to be free. I make sure it isn\'t."',
      secret: 'She\'s the aspect closest to becoming aware of the deity truth. She has dreams she doesn\'t understand.',
    },
    {
      name: 'Vera Coin',
      role: 'ally / small business owner',
      personality:
        'A local merchant who has survived in Goldwater by being too small to notice. Streetwise, kind, and deeply angry about the Princes\' stranglehold. She becomes the party\'s first real ally.',
    },
  ],
  keyLocations: [
    {
      name: 'Goldwater',
      description: 'A trade city where gold flows like water and drowning is literal. Beautiful, wealthy, and deeply unfair.',
      significance: 'The setting for the entire campaign.',
    },
    {
      name: 'The Exchange',
      description: 'The central trading hall where deals are made, broken, and weaponized. The five Princes\' boxes overlook the floor.',
      significance: 'Where business and politics intersect.',
    },
    {
      name: 'The Underbazaar',
      description: 'The black market beneath the Exchange — where the Princes\' control doesn\'t reach. Theoretically.',
      significance: 'Where the party can operate outside Prince control.',
    },
  ],
  dataSystems: [
    'shopInventory',
    'merchantHaggling',
    'courtIntrigue',
    'socialEncounter',
    'factionReputation',
    'npcRelationshipWeb',
    'politicalEvent',
    'secretSociety',
    'diplomaticNegotiation',
  ],
};
