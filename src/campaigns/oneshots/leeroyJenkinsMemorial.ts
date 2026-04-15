import type { OneShotCampaign } from '../types';

export const leeroyJenkinsMemorial: OneShotCampaign = {
  id: 'oneshot-leeroy-jenkins-memorial',
  type: 'oneshot',
  title: 'The Leeroy Jenkins Memorial Dungeon',
  tagline: 'The legendary hero who charged a dragon alone and won. His academy teaches one technique: run in screaming. Final exam today.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'war'],
  playerCount: { min: 3, max: 6 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The Jenkins Academy for Applied Adventuring sits on a hill overlooking the Dragonwaste — a scorched valley where Leeroy Jenkins once charged alone into an ancient red dragon\'s lair, screaming his own name, and emerged victorious. He is now eighty years old, retired, and running an academy whose entire curriculum is based on one principle: hesitation kills more adventurers than dragons do. The training is unorthodox. The graduation rate is suspiciously high. The graduates are suspiciously effective. Today is the final exam.',
  hook: 'The party has spent six months at the Jenkins Academy learning the Jenkins Method. Today is graduation day. Master Leeroy (who insists on being called "just Leeroy, titles are for people who plan ahead") hands each party member a torch and says: "The dungeon is through that door. Everything in it wants to kill you. Do not stop. Do not think. Do not plan. The exam is pass/fail. The pass condition is: survive while moving forward at all times. The fail condition is: stopping to think about it. GO GO GO."',
  twist:
    'Leeroy Jenkins is a tactical genius. He always was. The "charge in screaming" technique is not recklessness — it is a calculated psychological warfare methodology. The dragon he killed was mid-cast when he charged. His scream disrupted its concentration. His speed prevented it from targeting. His unpredictability made its lair actions useless. Every element of the Jenkins Method has a sound tactical basis that Leeroy deliberately disguises as stupidity because the moment you start thinking about why it works, you hesitate, and hesitation is the thing the method eliminates. The academy does not teach recklessness. It teaches commitment.',
  climax:
    'The final room contains a dragon. A real one. Young, angry, and waiting. The party has been running, screaming, and not-thinking for two hours. Leeroy watches from a scrying mirror. The dragon expects adventurers who plan, who hesitate, who give it time to act. It does not expect five people sprinting at full speed while screaming their own names. The dragon panics. Its breath weapon misses because the party is moving too fast. Its tail sweep hits empty air because nobody stopped. The party reaches the dragon and overwhelms it with sheer aggressive momentum. Leeroy nods. "Told you it works."',
  scenes: [
    {
      title: 'Scene 1: The Orientation',
      summary: 'Leeroy gives the pre-exam speech. The dungeon rules are explained. The party receives their equipment: a torch and a terrible idea.',
      challenge: 'social',
      keyEvents: [
        'Leeroy\'s speech: "I have been doing this for sixty years. I have never once used a plan. I have also never once died. Coincidence? Absolutely not."',
        'Equipment distribution: a torch, a weapon, and a potion labeled "FOR EMERGENCIES (running faster counts as an emergency)"',
        'The rules: keep moving forward. Do not stop. Do not map. Do not discuss. Do not committee.',
        'A student asks "what if we encounter a locked door?" Leeroy: "Doors are just walls that believe in themselves. Run through them."',
      ],
    },
    {
      title: 'Scene 2: The Gauntlet',
      summary: 'The dungeon run begins. Each room has a challenge that gets WORSE if you stop to think about it. Traps deactivate if you run through them fast enough. Puzzles solve themselves if you ignore them. Monsters are confused by confidence.',
      challenge: 'combat',
      keyEvents: [
        'Room 1: a hallway of pressure plates. Running triggers all of them simultaneously and they cancel each other out',
        'Room 2: a sphinx asks a riddle. The correct answer is screaming your own name. The sphinx was not prepared for this.',
        'Room 3: a pit trap. If you stop at the edge to look, the floor collapses. If you sprint across, momentum carries you over the gap.',
        'Room 4: twenty goblins in formation. A careful approach lets them coordinate. Charging scatters them like bowling pins.',
        'Room 5: a locked door. It is not structurally sound. Neither is the party\'s approach. The door loses.',
      ],
    },
    {
      title: 'Scene 3: The Planning Room',
      summary: 'A trap room disguised as a planning opportunity. The room contains a map table, strategy guides, and comfortable chairs. It is a test. Sitting down activates the trap. The room fills with sleeping gas. The Jenkins Method means never sitting down.',
      challenge: 'puzzle',
      keyEvents: [
        'The room: maps, chairs, a warm fire, and a sign that says "PLAN YOUR APPROACH TO THE FINAL CHAMBER"',
        'The temptation: finally, a chance to rest and strategize. Every instinct says sit down.',
        'The trap: anyone who sits triggers sleeping gas. The chairs are mimics (of course). The map is wrong.',
        'The solution: run through without stopping. The door on the far side only opens when approached at speed.',
      ],
    },
    {
      title: 'Scene 4: The Dragon',
      summary: 'The final room. A young dragon. The ultimate test of the Jenkins Method: charge a dragon while screaming and trust that commitment beats calculation.',
      challenge: 'combat',
      keyEvents: [
        'The dragon: young red, territorial, and expecting cautious adventurers who give it time to breathe fire',
        'The charge: five adventurers sprint into the chamber screaming their own names. The dragon flinches.',
        'Breath weapon: aimed where the party was, not where they are. Speed beats fire.',
        'The swarm: the party reaches the dragon before it can reposition. Momentum wins.',
        'Leeroy appears via the exit door: "Welcome to the alumni. Drinks are on me. You earned it."',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Leeroy Jenkins', role: 'headmaster / legend', personality: 'Eighty years old, missing two fingers and one eyebrow. Speaks with the calm confidence of a man who has charged more dragons than most people have seen. Drinks tea from a mug that says "PLAN B IS PLAN A BUT FASTER." Every story he tells sounds insane and is 100% true.' },
    { name: 'Professor Dash', role: 'instructor / speedrun coach', personality: 'A halfling monk who holds the academy record for fastest dungeon clear (four minutes, seventeen seconds). Teaches Advanced Running. Grades on a curve measured in feet per round. "If you have time to think, you are not running fast enough."' },
    { name: 'The Dragon (Emberclaw)', role: 'final boss / outmatched', personality: 'A young red dragon who was told adventurers are slow, methodical creatures who give you time to monologue. Nobody warned him about the Jenkins Method. His confusion is his downfall.' },
  ],
  keyLocations: [
    { name: 'The Jenkins Academy', description: 'A surprisingly well-funded institution on a hill. The hallways have no chairs (sitting is discouraged). The doors are hinged to swing both ways (for speed). The motto on the gate: "FORTUNE FAVORS THE BOLD. ALSO THE LOUD."', significance: 'Where the party trained and where the exam begins.' },
    { name: 'The Gauntlet', description: 'A multi-room dungeon specifically designed to punish hesitation. Every trap has a speed bypass. Every puzzle has a brute-force solution. Every monster is unprepared for confidence.', significance: 'The exam dungeon. Each room tests a different aspect of the Jenkins Method.' },
    { name: 'The Dragon\'s Chamber', description: 'A classic boss room with a hoard, a dragon, and exactly zero cover. There is nowhere to hide and nothing to plan with. Just a dragon and the space between you and it.', significance: 'The final exam. Run at the dragon. That is the whole plan.' },
  ],
  dataSystems: ['encounterWaves', 'trapCorridor', 'chaseSequence', 'duel'],
};
