import type { FullCampaign } from '../types';

export const theNameless: FullCampaign = {
  id: 'full-nameless',
  type: 'full',
  title: 'The Nameless',
  tagline: 'You said your name out loud. Nobody heard it. Not even you.',
  tone: 'horror',
  themes: ['horror', 'dark_fantasy', 'mystery'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'People are losing their names. Not forgetting them - the names are being erased from reality. Friends cannot remember you. Documents go blank. Magic that targets "by name" fails. The nameless become invisible to society - unable to own property, make contracts, or even be healed by name-based spells. Something is collecting names, and the collection is growing. The worst part is the silence where your name used to be - you can feel the shape of it in your mouth, but when you speak it, the sound dies before it reaches the air.',
  hook: 'A woman sits in the town square, crying. She tells the party her name. The party immediately forgets it. She shows them her identification - it is blank. Her neighbors walk past without seeing her. She grabs a party member\'s arm and her grip is weak, as if she is becoming less physical. "I had a name yesterday. Help me. Please. I am disappearing."',
  twist:
    'Names are being collected by a true name demon - a creature from the lower planes that grows in power for every true name it possesses. It is not just collecting mortal names - it is building toward the true name of a god. Mortal names are practice. Divine names are the prize. If it speaks a god\'s true name, it controls that god. Every name it takes makes it more real and its victims less so.',
  climax:
    'The demon has almost completed a divine true name. The party must enter its domain - a library of stolen names where every book is a person reduced to letters on a spine - find and reclaim the names, and confront a creature that knows their true names and can use them as weapons. Speaking your own true name is the only weapon that works, but speaking it aloud gives the demon power over you. The final battle is fought in whispers.',
  acts: [
    {
      title: 'Act 1: The Nameless',
      summary:
        'People losing their names. Investigation. The wrongness is subtle at first - a misspelled sign, a letter that will not hold ink, a friend who hesitates half a second too long before saying your name. Then the disappearances begin.',
      keyEvents: [
        'Three nameless people found: a soldier whose medals are blank, a merchant whose shop sign is empty, a child whose mother cannot introduce her',
        'The pattern: all three visited the same traveling scholar who asked them to "sign their full name" in a ledger with pages that felt like skin',
        'Tracking the scholar: they have moved on, leaving more nameless behind. Their campsites smell of old ink and something metallic.',
        'First encounter with name-magic failure: a spell targets a party member by name and misses - the syllables scatter like dropped coins. The caster looks confused. "I said your name. Why did it not land?"',
        'Quiet dread: a party member signs a tavern ledger. By morning, the signature is gone. The innkeeper does not remember them checking in.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Collector',
      summary:
        'The true nature of the threat emerges. The party\'s own names begin to fade - spells work less, NPCs remember them less. The sensation is physical: a hollowing behind the sternum, as if something that was always there is being slowly pulled out through the ribs.',
      keyEvents: [
        'The "scholar" revealed as an agent of the true name demon. His own name is long gone. He flinches when asked for it and his lips move but no sound comes out.',
        'Party names begin fading: introduce yourself - the NPC forgets within seconds. Write your name - the ink fades. Shout it - the echo does not carry.',
        'Research into true name magic: a wizard explains while clutching her own name-amulet with white knuckles. She speaks too fast, as if racing against something. "Names are the first magic. Before spells, before gods, there were names."',
        'The demon\'s domain located: a pocket dimension accessible through the name of a forgotten place. To open the door, someone must speak a word that no longer exists.',
        'The moment of understanding: the party realizes the nameless woman from the square is almost translucent now. Without a name, reality stops acknowledging you. She is not dying. She is being unwritten.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The Library of Names',
      summary:
        'Inside the demon\'s domain: a vast library where every stolen name is a book and every book pulses faintly, like a heartbeat. The shelves go up forever. The silence is absolute except for the sound of pages turning themselves.',
      keyEvents: [
        'The Library: infinite shelves, each book a person\'s entire name-history. The spines are written in handwriting that matches the victim\'s own. Some books are thicker than others. Children\'s names are thin volumes.',
        'Finding their own names: the books are aware. They lean off shelves when the party passes. They want to be reclaimed. One falls open to a page that reads: "I am still here. Please remember me."',
        'The demon confronts them: it speaks in stolen voices, cycling through hundreds of names that are not its own. Its body is made of letters. Its eyes are punctuation marks.',
        'The final gambit: speaking your own true name reclaims it but briefly gives the demon power. Each party member must say who they are while the demon tries to twist the syllables into something else.',
        'The aftermath: names return. The nameless woman solidifies. The town remembers. But some names were held so long they come back slightly wrong - mispronounced, misspelled, carrying an echo of the library\'s silence.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The First Nameless',
      role: 'victim / guide',
      personality:
        'The first person to lose their name. Has been nameless so long she is nearly transparent. She speaks in a voice that sounds like it is coming from another room, even when she is standing right next to you. She has developed workarounds - pointing instead of introducing, wearing a sign that reads "I exist" that she has to rewrite daily because the ink keeps fading.',
      secret: 'She was the demon\'s first experiment. She has been working against it for years, invisible because nobody can remember her. Her immunity to name-magic makes her the party\'s most powerful ally and most heartbreaking witness.',
    },
    {
      name: 'The True Name Demon (Unspoken)',
      role: 'antagonist',
      personality:
        'A fiend that exists in the space between syllables. Speaking its name gives it power. Not speaking its name gives it anonymity. Every interaction is a trap. It does not shout. It whispers, and the whisper uses the voice of someone you loved.',
    },
    {
      name: 'Scholar Vex (agent)',
      role: 'collector / tragic pawn',
      personality:
        'A mortal scholar who was tricked into collecting names for the demon, thinking it was academic research. Now the demon has HIS name and he cannot stop. He scratches at his chest where his name used to sit. His hands are always ink-stained. He will not make eye contact because he is afraid the party will see that his eyes are starting to look like empty pages.',
    },
    {
      name: 'Archivist Pella',
      role: 'lore keeper / ally',
      personality:
        'A librarian who has dedicated her life to cataloguing true names. She speaks in a measured cadence, never using a name without pausing first, as if checking it is still there. She wears her own name embroidered on every piece of clothing. She sleeps with a journal open to the page where her name is written, so it is the first thing she sees every morning.',
    },
  ],
  keyLocations: [
    {
      name: 'The Blank Towns',
      description: 'Towns where multiple residents have lost their names. Signs are illegible. Census records are blank. People exist but cannot be acknowledged. The streets feel emptier than the population should allow, as if reality is skipping over the nameless.',
      significance: 'The investigation environment. Where the party first sees the scale of the erasure.',
    },
    {
      name: 'The Library of Names',
      description: 'A pocket dimension where every stolen name is a book on a shelf. The demon sits at the center, reading. The air smells like old paper and ozone. The only sound is turning pages and the faint, rhythmic breathing of ten thousand books that used to be people.',
      significance: 'The final dungeon. A library that is also a mass grave.',
    },
    {
      name: 'The Unnamed Place',
      description: 'A location whose name was the first the demon stole. It still exists - you just cannot say where it is. Maps show a blank space. Compasses spin. People who try to give it a new name find the word dissolving on their tongue.',
      significance: 'The gateway to the demon\'s domain. A place that proves what happens when even geography loses its name.',
    },
  ],
  dataSystems: ['magicalDisease', 'mindControl', 'darkBargain', 'detectiveCase', 'hauntedLocation', 'pocketDimension', 'magicalAnomaly', 'npcBackstoryGen', 'combatNarration'],
};
