import type { FullCampaign } from '../types';

export const theMuseumOfImpossibleThings: FullCampaign = {
  id: 'full-museum-of-impossible-things',
  type: 'full',
  title: 'The Museum of Impossible Things',
  tagline: 'Every exhibit is a paradox. The one you need to steal is the museum itself.',
  tone: 'heist',
  themes: ['heist', 'mystery', 'exploration'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 6, end: 13 },
  estimatedSessions: 14,
  settingSummary:
    'In the city of Vanthos, there is a museum that should not exist. The Museum of Impossible Things collects paradoxes made physical: a door that opens into itself, a sword that was never forged, a book that contains only the sentences it does not contain, a map to a place that does not exist, a clock that tells the time it is not. The museum has no entrance and no exit. Visitors simply find themselves inside when conditions are right. Its curator, the Paradoxist, collects impossibilities the way others collect art - with obsessive care and a total disregard for the laws of reality.',
  hook: 'A scholar named Venn approaches the party with a problem that sounds like a riddle: "There is a hole in the world. Not a physical hole - a logical one. A place where cause and effect have separated. If it is not repaired, the contradiction will spread until reality stops making sense for miles around. The only tool that can stitch the world back together is inside the Museum of Impossible Things. I need you to steal it."',
  twist:
    'The item the party needs - the Paradox Needle, a tool that sews contradictions back together - cannot be removed from the museum because it is what holds the museum together. The museum is not a building that contains impossible things. It IS the impossible thing. A building that exists in a place that cannot contain buildings, built from materials that do not exist, curated by a person who was never born. Steal the Needle and the museum unravels. The party must steal the entire museum - collapse it into a portable paradox - and carry it to the rift.',
  climax:
    'The Paradoxist knows. He has always known they would come because a prophecy in the museum predicted visitors who would end it - and the prophecy is an exhibit he curates lovingly. He does not fight. He asks the party to make the museum\'s end beautiful. The party must solve one final impossible puzzle - fold the museum into itself until it fits in the palm of a hand - while every paradox inside goes haywire. Then carry it to the rift in reality, unfold it, and let the museum become the patch. The Museum of Impossible Things was always going to end by becoming the thing that makes the world possible again.',
  acts: [
    {
      title: 'Act 1: Getting In',
      summary:
        'Finding the museum that has no entrance. The party researches impossible architecture, consults mad scholars, and eventually discovers the trick: you do not go to the museum. You become the kind of person the museum lets in.',
      keyEvents: [
        'Venn\'s briefing: the rift in reality, the Paradox Needle, the museum that has no door',
        'Research: visiting scholars who have been inside and came back changed',
        'The entry condition: each party member must carry a personal contradiction to be "interesting" enough',
        'First entry: the museum appears around them mid-step, fully formed, as if it was always there',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Exhibits',
      summary:
        'Navigating the museum. Every room contains a paradox that must be interacted with to proceed. The Paradoxist watches, entertained. The party begins to realize the museum is alive, aware, and the Needle holds it all together.',
      keyEvents: [
        'The Door Room: a door that opens into itself - stepping through puts you back where you started, but different',
        'The Unforged Sword: a weapon that was never made but cuts perfectly. Taking it creates the contradiction of owning nothing.',
        'The Paradoxist appears: charming, delighted by guests, treats the heist as an art exhibition',
        'The realization: the Needle is not in the museum - it IS the museum. Stealing it means stealing everything.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: Folding the World',
      summary:
        'The impossible heist. Steal an entire museum by folding it into itself. The Paradoxist cooperates because the prophecy says he must. Every paradox in the building goes wild as the structure collapses inward. Then carry it to the rift and let it go.',
      keyEvents: [
        'The Paradoxist\'s request: "Make my ending beautiful."',
        'The folding: each exhibit must be resolved, reversed, or collapsed in sequence',
        'Paradox cascade: reality glitches as the museum shrinks - rooms swap, gravity reverses, time stutters',
        'The rift: unfolding the museum into the wound in reality, watching it become the patch that heals the world',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Paradoxist',
      role: 'curator / tragic ally',
      personality:
        'A being who was never born but exists anyway. Speaks in contradictions that somehow make perfect sense. Loves his museum the way a parent loves a child. Knows it must end. Wants it to matter. "Everything impossible becomes possible eventually. That is the one thing I cannot collect."',
      secret: 'He created the rift in reality accidentally when he built the museum. The museum is both the wound and the bandage.',
    },
    {
      name: 'Venn',
      role: 'quest giver / scholar',
      personality:
        'An academic who studies paradoxes and has the haunted look of someone who has stared into logical contradictions for too long. Precise, careful, genuinely afraid of what happens if the rift spreads.',
    },
    {
      name: 'Echo (museum guide)',
      role: 'ally / impossible being',
      personality:
        'A construct that exists inside the museum - a guide who remembers every visitor who has never visited. Helpful, cheerful, and existentially confused. "I remember you from last time. There was no last time. Both of those are true."',
    },
    {
      name: 'The Unforged Sword',
      role: 'sentient exhibit',
      personality:
        'A weapon that was never made but has opinions. Communicates through the absence of sound. Wants to be wielded despite not existing. The ultimate unreliable narrator.',
    },
  ],
  keyLocations: [
    {
      name: 'The Museum of Impossible Things',
      description: 'A building that exists where buildings cannot. Every room contains a paradox. The architecture contradicts itself. Hallways lead to rooms that do not connect to them.',
      significance: 'Both the heist location and the heist target.',
    },
    {
      name: 'The Prophecy Gallery',
      description: 'A room containing predictions of events that have already happened, phrased as if they have not. One frame shows the party stealing the museum.',
      significance: 'Where the party learns the Paradoxist expects them.',
    },
    {
      name: 'The Rift',
      description: 'A tear in reality outside Vanthos where cause and effect have separated. Effects precede causes. Rain falls upward. Words mean their opposites.',
      significance: 'Where the museum must be delivered and unfolded to heal the world.',
    },
  ],
  dataSystems: [
    'heistPlanner',
    'puzzleLock',
    'clockworkDungeon',
    'trapDisarm',
    'planarTravel',
    'socialEncounter',
    'moralDilemma',
    'encounterWaves',
  ],
};
