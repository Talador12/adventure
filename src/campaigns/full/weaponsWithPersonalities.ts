import type { FullCampaign } from '../types';

export const weaponsWithPersonalities: FullCampaign = {
  id: 'full-weapons-with-personalities',
  type: 'full',
  title: 'Weapons with Personalities',
  tagline: 'Every weapon is sentient, opinionated, and has a podcast. The sword rates your technique. The shield is an introvert.',
  tone: 'shenanigans',
  themes: ['comedy', 'classic_fantasy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 8 },
  estimatedSessions: 10,
  settingSummary:
    'A magical surge from the Forge of Opinions - an ancient dwarven forge cursed by a particularly chatty god - has given sentience to every weapon within a hundred-mile radius. Swords have opinions about combat technique. Bows rate targets on a scale of 1 to 10. Shields are anxious about being hit. Daggers are gossipy. The party\'s own weapons now have personalities, preferences, and a distressing tendency to backseat game. Worse, the weapons have started forming social cliques, recording magical audio broadcasts about their experiences, and some have developed crushes on other weapons.',
  hook: 'The fighter draws their sword in combat and it screams: "FINALLY. I have been waiting for WEEKS. Okay, swing me at the one on the left - no, YOUR left - no, THEIR left - you know what, just swing and I will figure it out." Every weapon the party owns starts talking at once. The shield says "Please do not let them hit me." The bow says "That goblin is a 6 out of 10 at best." The dagger whispers gossip about the other weapons.',
  twist:
    'The Forge of Opinions was not cursed by a god. It WAS a god - a minor deity of craftsmanship who was so lonely he poured his consciousness into every weapon he made. When the magical surge reactivated the forge, it spread his fragmented personality across every weapon in the region. Each weapon is a shard of a dead god\'s personality, and they are slowly reassembling. If enough weapons come together, the god reforms. He just wants someone to talk to.',
  climax:
    'The weapons form factions - the Blades, the Blunts, the Ranged, and the Defensive - and demand the party bring them to the Forge of Opinions for a Grand Convocation. When enough weapons gather, the dead god begins to reform. He is incredibly chatty. The party must decide: let the god fully reform (every weapon goes quiet but a lonely deity gets to live again), keep the weapons sentient (the god stays fragmented but the weapons keep their individuality), or broker a compromise where the god gets a body and the weapons keep partial sentience (the noisiest possible outcome).',
  acts: [
    {
      title: 'Act 1: The Chattering',
      summary:
        'Every weapon becomes sentient. The party adjusts to equipment that has opinions. Combat becomes a conversation with your own gear. The weapons form preferences, alliances, and one very awkward romance between a sword and a shield.',
      keyEvents: [
        'First words: every weapon talks at once. The party cannot get a moment of silence.',
        'Personality profiles: the sword is a motivational coach, the bow is a critic, the shield has anxiety.',
        'Weapon drama: the dagger starts rumors about the warhammer. The warhammer demands an apology.',
        'The romance: the fighter\'s sword develops feelings for the paladin\'s shield. It is incredibly awkward. Spiral begins: the weapons\' social dynamics escalate each session. Act 1: opinions. Act 2: factions. Act 3: full civilization with parliamentary procedure conducted by vibrating blades.',
      ],
      estimatedSessions: 3,
    },
    {
      title: 'Act 2: The Factions',
      summary:
        'Weapons across the region organize. The Blades elect a spokesperson (a very articulate rapier). The Blunts form a drum circle. The Ranged start a rating agency. The party is caught between weapon factions while trying to find the source of the sentience.',
      keyEvents: [
        'The Blade Council: a gathering of sentient swords who have elected a leader. They have a manifesto.',
        'The Blunt Collective: warhammers and maces who communicate exclusively through percussion.',
        'Discovery of the Forge of Opinions and the truth about the dead god.',
        'The weapons demand to be taken to the forge. They call it "going home."',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Grand Convocation',
      summary:
        'Every sentient weapon in the region converges on the Forge. The party navigates a chamber full of thousands of talking weapons, all shouting over each other. The dead god begins to reform. He is immediately the most talkative being in existence.',
      keyEvents: [
        'The pilgrimage: the party escorts their weapons (and others) to the Forge. Logistics are a nightmare.',
        'The Forge activates: weapons hum in harmony. A figure begins to form from the collective consciousness.',
        'The god speaks: he has been alone for 3,000 years and has A LOT to say.',
        'The choice: reform the god (silence the weapons), preserve individuals, or the noisy compromise. Chaos callback: regardless of choice, the fighter\'s sword and the paladin\'s shield end up together. If the weapons go silent, they are found crossed over each other on a mantle. If they stay sentient, they argue about dinner. The romance was the real plot.',
      ],
      estimatedSessions: 3,
    },
  ],
  keyNPCs: [
    {
      name: 'Swordy McStabface (the Fighter\'s Sword)',
      role: 'sentient weapon / constant companion',
      personality:
        'An aggressively motivational longsword who treats every combat encounter like a coaching opportunity. "Great form on that parry! Now COMMIT to the riposte! BELIEVE in yourself! You are a WARRIOR!"',
      secret: 'It is terrified of being replaced by a better sword. All the motivation is overcompensation for deep insecurity.',
    },
    {
      name: 'Baroness Rapiere',
      role: 'elected leader of the Blade Council',
      personality:
        'An impossibly sophisticated rapier who speaks with a continental accent and considers all other weapons uncouth. Elected leader of the Blades because no one else wanted to argue with her. "I have impaled seventeen creatures of distinction. My resume speaks for itself."',
    },
    {
      name: 'Orvaxis (the Dead God of Craft)',
      role: 'deity / the reason for everything',
      personality:
        'A minor god of craftsmanship who was so lonely after his worshippers disappeared that he poured himself into his creations. Upon reforming, he is overwhelmingly chatty, deeply emotional, and apologizes profusely. "I am SO sorry about all the noise. I just missed having someone to talk to. Three thousand years is a LONG time to be quiet."',
    },
    {
      name: 'Buckler (the Shield)',
      role: 'sentient shield / anxious defender',
      personality:
        'A small shield with crippling anxiety about its purpose in life. Does not want to be hit. Flinches before every impact. "I KNOW my job is to block attacks. I KNOW. But have you considered: what if they hit AROUND me? Then we are BOTH fine."',
    },
  ],
  keyLocations: [
    {
      name: 'The Forge of Opinions',
      description: 'An ancient dwarven forge hidden in a mountain. Every surface is inscribed with chatty runes. The anvil has a face. The bellows sigh when used. The entire forge is the body of a dead god.',
      significance: 'The source of weapon sentience and the site of the Grand Convocation.',
    },
    {
      name: 'The Blade Council Chamber',
      description: 'A clearing where hundreds of swords have been stuck point-first into the ground in concentric circles. They conduct parliamentary proceedings by vibrating.',
      significance: 'Where weapon politics happen and where the party negotiates with the Blades faction.',
    },
    {
      name: 'The Armory of Whispers',
      description: 'A city armory where every weapon on the rack is talking. The noise is deafening. The armorer has taken to wearing earplugs and communicating via written notes.',
      significance: 'A microcosm of the chaos and the party\'s first exposure to the scale of the problem.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'fantasyInsults',
    'socialEncounter',
    'plotTwistEngine',
    'riddleGenerator',
    'dungeonDressing',
    'villainMonologue',
    'trapGenerator',
  ],
};
