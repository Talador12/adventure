import type { OneShotCampaign } from '../types';

export const theLastPrayer: OneShotCampaign = {
  id: 'oneshot-last-prayer',
  type: 'oneshot',
  title: 'The Last Prayer',
  tagline: 'The last cleric of a dying god. She has been praying for 200 years. She wants to stop.',
  tone: 'epic',
  themes: ['epic', 'social', 'classic_fantasy'],
  playerCount: { min: 3, max: 5 },
  level: 6,
  estimatedHours: 2.5,
  settingSummary:
    'Sister Ember is the last worshipper of Thandril, god of mercy. As long as she prays, Thandril lives. She has been praying continuously for two hundred years, sustained by divine magic. She is tired beyond mortal comprehension. She wants to stop. If she stops, Thandril dies and the concept of divine mercy weakens across the world. The party must find a new worshipper or let a god die.',
  hook: 'Sister Ember\'s voice is a whisper: "I have prayed for two hundred years. I am the only one left. If I stop, Thandril dies. If I continue, I exist in a state worse than death. I am asking you: find someone to take my place, or let me rest. Either way, decide today. I cannot do this for one more dawn."',
  twist: 'Thandril is already dead. He died fifty years ago when his power fell below the threshold of divinity. What Ember has been sustaining is not a god - it is a ghost of a god, an echo. Her prayers are not keeping him alive; they are preventing the echo from dispersing. The mercy she channels is real, but the god behind it is not. She has been praying to a memory.',
  climax: 'The party tells Ember the truth - or discovers it together. The echo of Thandril appears, ghostly and grateful. The question changes: does mercy need a god to exist? If the party can prove that mercy lives in mortal actions, Ember can stop praying and the concept survives without divine backing. If they cannot, mercy as a cosmic force weakens permanently.',
  scenes: [
    {
      title: 'Scene 1: The Temple',
      summary: 'Finding Sister Ember in the last temple of Thandril. Understanding the weight of two centuries of unbroken prayer.',
      challenge: 'social',
      keyEvents: [
        'The temple: crumbling, overgrown, forgotten by the world - but Ember kneels at the altar, still praying',
        'Ember: ancient, ethereal, barely physical - sustained by divine magic that is itself fading',
        'Her request: she does not ask the party to save the god - she asks them to free her from the burden',
        'The search: finding a new worshipper means finding someone willing to pray forever',
      ],
    },
    {
      title: 'Scene 2: The Search',
      summary: 'Seeking a new worshipper. Discovering that Thandril\'s death happened long ago.',
      challenge: 'exploration',
      keyEvents: [
        'The search: visiting other temples, clergy, holy people - nobody will worship a dying god',
        'The discovery: a divine scholar analyzes Thandril\'s power and finds... nothing. The god is gone.',
        'The echo: what Ember channels is real power but its source is her faith, not a living deity',
        'The question: can mortal faith generate divine power without a god to receive it?',
      ],
    },
    {
      title: 'Scene 3: The Last Prayer',
      summary: 'Telling Ember the truth. The echo of Thandril. The end of a prayer and the beginning of something else.',
      challenge: 'social',
      keyEvents: [
        'The truth: Thandril died fifty years ago - Ember has been praying to an echo',
        'Ember\'s reaction: grief, then relief, then a question - "Then what have I been sustaining?"',
        'The echo appears: Thandril\'s ghost, grateful, fading, and at peace',
        'The argument: mercy exists in mortal hearts, not just divine decree - Ember\'s faith proved it',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Sister Ember', role: 'the last cleric', personality: 'Two hundred years of prayer have made her more spirit than person. She speaks in whispers, glows faintly, and has not eaten in a century. She is not a martyr by choice - she is a prisoner of devotion.' },
    { name: 'The Echo of Thandril', role: 'the dead god', personality: 'Not truly Thandril - a memory sustained by Ember\'s faith. Gentle, grateful, and ready to disperse. His last words are for Ember: "You were always enough."' },
    { name: 'Scholar Dorn', role: 'divine theologian', personality: 'A priest of another god who studies divine mechanics the way an engineer studies bridges. When he realizes Thandril is dead, he sits down heavily and whispers: "If her faith sustained power without a god... what does that mean about mine?" He does not finish the thought.' },
  ],
  keyLocations: [
    { name: 'The Temple of Thandril', description: 'A ruined temple in a forgotten forest. The roof is gone. The walls are covered in moss. At the altar, a woman kneels and prays, glowing faintly.', significance: 'Where Ember has been praying for two hundred years.' },
    { name: 'The Altar', description: 'A stone altar worn smooth by two centuries of clasped hands. A faint golden light rises from it - not divine power, but the echo of it.', significance: 'The physical anchor of Ember\'s prayer.' },
    { name: 'The Echo Space', description: 'A shimmering realm that appears when Ember\'s prayer finally stops. Not a divine plane - a pocket of faith made manifest. Beautiful and temporary.', significance: 'Where the echo of Thandril appears and the story concludes.' },
  ],
  dataSystems: ['socialEncounter', 'npcBackstoryGen'],
};
