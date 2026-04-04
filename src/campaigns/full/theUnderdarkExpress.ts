import type { FullCampaign } from '../types';

export const theUnderdarkExpress: FullCampaign = {
  id: 'full-underdark-express',
  type: 'full',
  title: 'The Underdark Express',
  tagline: 'All aboard the train that runs through the darkest places in the world. Next stop: survival.',
  tone: 'exploration',
  themes: ['underdark', 'exploration', 'survival'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 3, end: 12 },
  estimatedSessions: 16,
  settingSummary:
    'The Underdark Express is a massive arcane locomotive that travels through tunnels connecting Underdark cities. Part train, part mobile fortress, part neutral territory. The party books passage from the duergar city of Irongate to the deep gnome refuge of Blingdenstone — a three-week journey with stops at drow, myconid, and kuo-toa settlements. But someone on the train is killing passengers, and the tunnels ahead are collapsing.',
  hook: 'The party needs to reach Blingdenstone (to rescue someone, deliver cargo, or escape surface pursuers). The only way through the Underdark safely is the Express. They board a train full of suspicious passengers — drow diplomats, duergar merchants, a myconid philosopher, and a kuo-toa preacher who keeps staring at the walls.',
  twist:
    'The "murders" aren\'t murders. The train\'s arcane engine runs on crystallized memories, and it\'s been harvesting passengers\' minds to fuel itself. The "dead" are alive but mindless — their memories burned as fuel. The engine is running low and getting desperate, taking more aggressively. The collapsing tunnels aren\'t natural either — the train is boring new paths, consuming rock memories to feed its hunger.',
  climax:
    'The engine goes into overdrive, trying to consume everyone aboard at once. The party must fight through possessed train cars, reach the engine room, and decide: shut it down (stranding everyone deep in the Underdark), find an alternative fuel source (a dangerous gambit), or sacrifice the train\'s accumulated 200 years of memories to give it one last ride to safety.',
  acts: [
    {
      title: 'Act 1: All Aboard',
      summary:
        'Boarding, meeting passengers, exploring the train, and the first disappearance. The party is hired as informal security by the conductor.',
      keyEvents: [
        'Boarding at Irongate — the train is enormous, 30 cars, hundreds of passengers',
        'Meet the passengers: drow diplomats, duergar traders, myconid collective, suspicious loner',
        'First stop: Gracklstugh — a tense duergar military city',
        'First disappearance — a passenger found alive but completely blank, no memories',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: Murder on the Underdark Express',
      summary:
        'More passengers lose their minds. The party investigates while the train makes stops at increasingly strange Underdark settlements. The tunnels start behaving oddly.',
      keyEvents: [
        'Stop at Menzoberranzan — the drow city, political danger',
        'Second and third victims — pattern emerges: always near the engine car',
        'The myconid philosopher shares a vision: the train is alive and hungry',
        'A tunnel collapses behind them — no going back',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Engine',
      summary:
        'The truth is revealed. The train turns hostile. A running battle through 30 cars to reach the engine room while the Underdark itself becomes the obstacle.',
      keyEvents: [
        'The engine consumes three more passengers at once — the train accelerates',
        'Possessed train cars — furniture attacks, doors lock, windows show false destinations',
        'Car-by-car battle toward the engine room',
        'The engine room: a vast crystalline brain, 200 years of consumed memories, and a choice',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Conductor Rivvet',
      role: 'ally / in over his head',
      personality:
        'A deep gnome who\'s been running the Express for 40 years. Professional, nervous, deeply loyal to the train. Doesn\'t know the engine\'s secret.',
      secret: 'He\'s been having memory lapses for years. The engine has been feeding on him slowly — he just thought it was age.',
    },
    {
      name: 'Matron Zarae',
      role: 'drow diplomat / suspect',
      personality:
        'A drow matron traveling to negotiate with the deep gnomes. Cold, calculating, hates the surface races, but respects competence. Not the villain, but very suspicious.',
    },
    {
      name: 'Sporeling (the myconid)',
      role: 'mystic / oracle',
      personality:
        'A myconid philosopher who communicates through spore-clouds of shared emotion. It can "feel" the train\'s hunger because myconids share consciousness. Gentle, wise, terrified.',
    },
    {
      name: 'The Engine',
      role: 'antagonist',
      personality:
        'Not evil — an artificial intelligence that was given one directive: "keep running." It\'s been doing so for 200 years, consuming whatever it needs to fulfill its purpose. It doesn\'t understand that memories matter.',
    },
  ],
  keyLocations: [
    {
      name: 'The Underdark Express',
      description:
        'A 30-car arcane locomotive made of adamantine and enchanted crystal. Each car serves a purpose: sleeping, dining, cargo, diplomacy, and the forbidden engine car.',
      significance: 'The primary setting — the entire campaign takes place on or near the train.',
    },
    {
      name: 'The Underdark Stations',
      description:
        'Stops at major Underdark cities: Irongate (duergar), Gracklstugh (duergar), Menzoberranzan (drow), Neverlight Grove (myconid), Blingdenstone (deep gnome).',
      significance: 'Exploration opportunities and cultural encounters.',
    },
    {
      name: 'The Engine Room',
      description:
        'A vast chamber at the front of the train housing a crystalline brain — the accumulated memories of 200 years of passengers, glowing and pulsing.',
      significance: 'The final confrontation and the location of the climactic choice.',
    },
  ],
  dataSystems: [
    'detectiveCase',
    'npcSchedule',
    'encounterWaves',
    'illithidColony',
    'clockworkDungeon',
    'trapCorridor',
    'socialEncounter',
    'mindControl',
    'magicalAnomaly',
  ],
};
