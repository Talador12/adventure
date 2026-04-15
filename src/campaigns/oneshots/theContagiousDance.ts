import type { OneShotCampaign } from '../types';

export const theContagiousDance: OneShotCampaign = {
  id: 'oneshot-the-contagious-dance',
  type: 'oneshot',
  title: 'The Contagious Dance',
  tagline: 'A curse makes anyone who hears music dance uncontrollably. The entire dungeon is now a conga line.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A bard named Cadence Twostep found an ancient violin in a dungeon and played one note. That note cursed everyone who heard it to dance whenever they hear ANY music - and the curse spreads through dance itself. Anyone who sees someone dancing starts dancing too. The curse has propagated through the entire dungeon. Goblins are doing the cha-cha. Skeletons are waltzing. A minotaur is breakdancing. The party must navigate a dungeon where every encounter is also a dance number, find the violin, and break the curse. Combat while dancing. Spellcasting while doing the macarena. Stealth while moonwalking.',
  hook: 'The party approaches a dungeon and hears music from inside. They enter to find a goblin conga line coming down the corridor. The goblins are armed. They are also dancing. They attack mid-cha-cha. A skeleton rattles past doing the electric slide. Deeper in, something large and heavy is doing a rhythmic THUD-THUD-THUD. The curse hits the party the moment they see the dancing: their feet start moving. They cannot stop. They are doing the macarena. Combat begins.',
  twist:
    'Cadence Twostep is not trapped in the dungeon - she is IN LOVE with the dancing. She has been playing the violin deeper and deeper, spreading the curse intentionally. She does not see it as a curse. She sees it as liberation. "Everyone is DANCING! When was the last time a dungeon was this happy? The goblins are SMILING. Have you ever seen a goblin smile?" She will not stop willingly. The violin must be taken by force or she must be convinced that the dungeon\'s inhabitants did not consent to the eternal dance party.',
  climax:
    'The party reaches the heart of the dungeon: a massive chamber where Cadence plays the violin on a stage. Every creature in the dungeon has gathered here in a massive dance floor. Goblins, skeletons, a minotaur, and even a young dragon - all dancing together. It is genuinely beautiful. And genuinely involuntary. The final "boss fight" is a dance-off: the party must out-dance Cadence (performance checks) while physically taking the violin from her. Every failed check sends them into an involuntary dance move that moves them AWAY from the stage. The dragon is doing the worm.',
  scenes: [
    {
      title: 'Scene 1: The Dance Floor Dungeon',
      summary:
        'The party enters the dungeon and is immediately cursed. Every encounter is combat-while-dancing. Movement is dance moves. Attacks must be incorporated into choreography. The absurdity is immediate and total.',
      challenge: 'combat',
      keyEvents: [
        'The goblin conga line attacks mid-dance. Their attacks are timed to the beat. If you dodge on-beat, you avoid damage.',
        'The party is cursed: feet move involuntarily. Walking is now dancing. Stealth is moonwalking. Running is the Charleston.',
        'A skeleton patrol waltzes past. They attack in pairs - one leads, one strikes. Defeating them requires breaking their dance pattern.',
        'The party discovers: attacks that match the rhythm deal bonus damage. Fighting on-beat is the meta.',
      ],
    },
    {
      title: 'Scene 2: Deeper into the Beat',
      summary:
        'The music gets louder deeper in the dungeon. Puzzles and traps are dance-themed: a floor of pressure plates that must be stepped on in rhythm, a door that opens to a specific dance, a corridor where the walls close in unless you keep dancing.',
      challenge: 'puzzle',
      keyEvents: [
        'A pressure plate puzzle: step on the right tiles in the right rhythm. Wrong step = trap. Right step = disco lights and the door opens.',
        'A corridor where the walls close in slowly. Dancing keeps them apart. Stop dancing, the walls close. It is a literal death dance.',
        'The minotaur: breakdancing in a room, blocking the path. He does not want to fight. He wants a dance battle. Winner proceeds.',
        'The music shifts genres deeper in. The goblins were doing pop. The skeletons waltz. The minotaur breakdances. The dragon... tangos.',
      ],
    },
    {
      title: 'Scene 3: The Grand Dance-Off',
      summary:
        'The main chamber. Every dungeon creature dances together. Cadence plays on stage. The party must cross the dance floor and take the violin. Failed performance checks send them spinning away.',
      challenge: 'social',
      keyEvents: [
        'The chamber is massive. Every creature from the dungeon dances in a swirling mass. It is beautiful, chaotic, and completely involuntary.',
        'Cadence sees the party. "JOIN US! Is this not WONDERFUL? When was the last time EVERYONE danced?"',
        'The dance-off begins: performance checks to advance toward the stage. Failed checks = involuntary dance moves that push you back.',
        'The violin is taken. The music stops. Everyone freezes. The goblins look confused. The skeleton collapses into a pile. The minotaur says: "...what happened?" The dragon slowly stops tangoing and has NO idea how it got here.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Cadence Twostep',
      role: 'villain / enthusiastic dancer / bard gone wrong',
      personality:
        'A bard who found the happiest curse in the world and decided it was a blessing. She is energetic, passionate, and genuinely believes forced dancing makes the world better. She is not malicious - she is delusional. "The minotaur has never been happier! Look at those moves!"',
      secret: 'She was a terrible bard before the violin. No one would dance to her music voluntarily. The cursed violin is the first time anyone has ever danced to her playing.',
    },
    {
      name: 'The Minotaur (Hooves)',
      role: 'mid-boss / breakdancer',
      personality:
        'A minotaur who has been breakdancing for three days straight. He is exhausted but his body will not stop. He is genuinely good at breakdancing, which makes him angrier. "I DO NOT WANT TO BE GOOD AT THIS. MAKE IT STOP."',
    },
  ],
  keyLocations: [
    {
      name: 'The Dance Floor Dungeon',
      description:
        'A standard dungeon where every creature is involuntarily dancing. Corridors echo with music. Rooms are lit with conjured disco-like lights. The deeper you go, the louder the music and the more complex the choreography.',
      significance: 'The entire adventure. Combat, puzzles, and social encounters all happen while dancing.',
    },
    {
      name: 'The Grand Dance Hall',
      description:
        'The deepest chamber, transformed into a massive dance floor with Cadence on a raised stage playing the cursed violin. Every creature in the dungeon dances here in a swirling, involuntary celebration.',
      significance: 'The climax location where the dance-off determines the dungeon\'s fate.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'socialEncounter',
    'puzzleLock',
    'trapDisarm',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
