import type { FullCampaign } from '../types';

export const theBlindCity: FullCampaign = {
  id: 'full-blind-city',
  type: 'full',
  title: 'The Blind City',
  tagline: 'Everyone in Ashen can see perfectly. Except the truth.',
  tone: 'mystery',
  themes: ['mystery', 'urban', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 14,
  settingSummary:
    'The city of Ashen appears perfect — no crime, no poverty, no conflict. Citizens smile, work, and never complain. The party arrives and immediately feels wrong. A zone of divine magic covers the city, making every citizen perceive reality as ideal. They literally cannot see ugliness, injustice, or suffering. The party, as outsiders, sees the truth: the city is rotting.',
  hook: 'The party enters Ashen. A guard greets them cheerfully. Behind him, a building is clearly on fire. Nobody reacts. A woman walks through rubble, stepping around debris she doesn\'t appear to see. A child cries in an alley — the mother walks past, smiling. "Welcome to Ashen! Best city in the realm!"',
  twist:
    'The illusion isn\'t divine — it\'s a creature. A psychic parasite attached to the city\'s central temple has been feeding on negative emotions for decades, and the easiest way to feed is to prevent anyone from noticing the problems that create negative emotions. The city isn\'t happy — it\'s anaesthetized. The creature doesn\'t care about the city. It\'s farming despair.',
  climax:
    'Destroying the creature means the city sees the truth all at once — decades of ignored decay, injustice, and suffering hitting every citizen simultaneously. The psychic shock could destroy the city. The party must either destroy the parasite gradually (taking weeks, during which the city continues to rot), instantly (mass psychic trauma), or find a way to prepare the citizens for the truth first.',
  acts: [
    {
      title: 'Act 1: Paradise',
      summary: 'Arriving in the perfect city. Everything seems wonderful — to the residents. The party sees cracks everywhere. Investigating without alarming the blindly-happy citizens.',
      keyEvents: [
        'Arrival: the gate guard does not see the pothole he is standing in. His ankle is twisted. He is smiling.',
        'Walking through the city: a bakery sign reads "BEST BREAD" — the shop is gutted, the baker is selling ash. Citizens eat it and compliment the flavor.',
        'Testing the illusion: the party holds a cracked mirror in front of a citizen. She describes a beautiful woman. The mirror shows a gaunt face with hollow eyes.',
        'First ally: Pip tugs a party member\'s sleeve toward an alley where a man is bleeding from a head wound. "Man hurt." His wife walks past, humming.',
        'Quiet moment: the party sits on a bench at sunset. The city is beautiful in the golden light. For a moment, they wonder if the illusion is so wrong.',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Source',
      summary: 'Investigation leads to the central temple, the psychic field, and the creature beneath it. The party must navigate a city where asking the wrong question makes people hostile — not because they\'re hiding something, but because they genuinely don\'t understand.',
      keyEvents: [
        'The temple: a ledger in the temple archives lists "emotional harvests" in two columns — despair collected, contentment distributed. The handwriting is not human.',
        'The creature: a psychic parasite the size of the temple basement, pulsing with bioluminescent veins that map the city streets above. Each vein connects to a district.',
        'The founding myth rewritten: the original charter, found behind a false wall, describes the "blessing" as a 30-day ward. Someone scratched out "30 days" and wrote "forever."',
        'Citizens told the truth become aggressive — a shopkeeper shown his ruined store screams and attacks the party, not from anger but from the pain of seeing',
        'Quiet moment: Wren Galviss shares a bottle of bad wine in the Undercity. "The worst part is not seeing the truth. The worst part is being the only one who does."',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Awakening',
      summary: 'The creature must be dealt with. The city must face the truth. Both at once is catastrophic. The party must find a sequence that minimizes damage.',
      keyEvents: [
        'Preparing key citizens: the party gives Mayor Sunwatch a tincture that weakens the illusion. He sees one crack in a wall and cannot stop staring at it. "How long has that been there?"',
        'The creature fights back: the city becomes aggressively joyful — citizens break into song, grab the party for dances, refuse to let them leave celebrations. The happiness is a weapon.',
        'Act 1 callback: Pip\'s mother, who walked past her crying child in Act 1, is one of the first to break through. She picks up her daughter and does not stop holding her.',
        'The truth hits: the illusion lifts district by district. Silence first. Then a single scream. Then weeping that spreads through the city like a wave. Then, eventually, someone starts cleaning.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Mayor Aldric Sunwatch',
      role: 'unwitting puppet / evolves to suspect in Act 2',
      personality: 'Booming laugh, never stops smiling, gestures expansively at crumbling buildings like they are palaces. Speaks in superlatives: "Finest district! Happiest people! Perfect weather!" Tugs his ear when stressed — the only tell that something is wrong underneath. When the illusion cracks, he is the most devastated person in the city. He weeps openly.',
      secret: 'In his deepest memories, he remembers what the city looked like before the "blessing." He chose to forget. He signed a document authorizing the temple\'s founding fifty years ago — his own handwriting, which he does not recognize.',
    },
    {
      name: 'Pip (age 4)',
      role: 'child ally / truth-seer',
      personality: 'Points at things with a sticky finger and says "broken" while adults smile. Tugs the party\'s sleeves toward danger. Communicates in two-word sentences that cut through illusion: "Man crying." "House falling." "Monster under." Falls asleep at inconvenient moments because she is four.',
    },
    {
      name: 'The Anesthetic',
      role: 'psychic parasite / antagonist',
      personality: 'Not intelligent in a conversational way — more like a stomach. It wants to keep feeding. When threatened, it makes the city MORE happy, MORE blind, MORE compliant. Communicates through waves of contentment that feel like sinking into a warm bath — the party must save against it or lose an hour sitting blissfully on a park bench.',
    },
    {
      name: 'Wren Galviss',
      role: 'underground contact / changed by the truth',
      personality: 'A thin, twitchy woman who lives in the Undercity because she clawed through the illusion years ago and nearly lost her mind. Speaks in rapid whispers, never makes eye contact, picks at her nails until they bleed. "I see it all. I see the rot, the rats, the sadness. I would give anything to be blind again." She starts hostile, becomes the party\'s most valuable ally, and by Act 3 must choose whether to accept the cure and forget again.',
    },
  ],
  keyLocations: [
    { name: 'Ashen', description: 'A city that appears perfect. Every wall is clean (it isn\'t). Every person is happy (they\'re not). The sky is always sunny (there\'s a permanent haze).', significance: 'The entire campaign takes place here.' },
    { name: 'The Temple of Radiance', description: 'The city\'s central temple, source of the "blessing." Below it: a creature that feeds on suppressed suffering.', significance: 'Where the truth and the parasite are found.' },
    { name: 'The Undercity', description: 'Below Ashen — where the illusion is weakest. Here, things are real. It\'s ugly, honest, and the only place in the city where people occasionally cry.', significance: 'The party\'s base of operations.' },
  ],
  dataSystems: ['mindControl', 'detectiveCase', 'npcSchedule', 'hauntedLocation', 'socialEncounter', 'magicalAnomaly', 'cataclysmCountdown', 'secretSociety', 'politicalEvent'],
};
