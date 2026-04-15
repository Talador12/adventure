import type { OneShotCampaign } from '../types';

export const tpkSpeedrun: OneShotCampaign = {
  id: 'oneshot-tpk-speedrun',
  type: 'oneshot',
  title: 'TPK Speedrun',
  tagline: 'The goal is to die as creatively as possible. Points for style. The winner gets nothing because they are dead.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 6 },
  level: 1,
  estimatedHours: 2,
  settingSummary:
    'The Arena of Unfortunate Endings is a magical dungeon where death is temporary and spectacular is permanent. Adventurers enter, die creatively, respawn at the entrance, and do it again. A magical scoreboard tracks deaths by style, drama, and originality. The audience is a packed stadium of ghosts who died here before and never left because the show is too good. First place gets their name on the Wall of Legendary Deaths. Second place gets a participation trophy. Everyone else gets a nice walk back to the entrance.',
  hook: 'A skeleton at the entrance hands the party a pamphlet: "Welcome to the Arena of Unfortunate Endings! Today\'s Challenge: Die With Style. Rules: 1) Deaths are temporary. 2) Respawn takes 30 seconds. 3) Points for creativity, drama, and making the audience gasp. 4) The dungeon is absurdly lethal. This is intentional. Have fun dying!"',
  twist: 'The dungeon\'s traps and monsters are designed to enable creative deaths, not prevent them. Lava pits have diving boards. Spike traps have scorecards. The dragon at the end takes requests. The challenge is not survival - it is showmanship. The most boring death (getting stabbed by a goblin) scores zero. The most creative death (riding a fireball into a gelatinous cube while playing a trumpet) scores a perfect 10.',
  climax: 'The final round: each player gets one last death. The dragon offers to collaborate. "I can breathe fire, ice, or lightning. Tell me where to aim and I will make it look amazing." The party choreographs their final deaths like an action movie. Explosions. Slow motion. Dramatic last words. The ghost audience gives a standing ovation.',
  scenes: [
    {
      title: 'Round One: The Warm-Up Deaths',
      summary: 'The party explores the arena and dies in beginner-level ways. Pit traps, swinging blades, and a very enthusiastic minotaur. Each death earns a score. Low scores motivate creativity.',
      challenge: 'combat',
      keyEvents: [
        'First death: the fighter walks into a pit. Score: 2/10. "Falling? FALLING? You can do better than FALLING."',
        'The rogue attempts a dramatic last stand against ten skeletons. Goes down swinging. Score: 5/10. "Better. More pathos."',
        'The wizard attempts to catch their own Fireball. It works. They die. Score: 7/10. "Self-Fireball! Classic!"',
        'Respawn. Everyone is back. Lessons learned. Round two demands excellence.',
      ],
    },
    {
      title: 'Round Two: The Escalation',
      summary: 'The party commits to style. Deaths become elaborate, coordinated, and increasingly theatrical. The ghost audience gets invested.',
      challenge: 'exploration',
      keyEvents: [
        'Coordinated death: the fighter launches the rogue off his shield into a ceiling spike trap. Both die. Score: 8/10.',
        'The cleric deliberately heals a monster to full before letting it kill them. "Compassion in death!" Score: 7/10.',
        'The bard plays their own funeral dirge WHILE dying. The ghosts weep. Score: 9/10. The first 9 of the day.',
        'Competition intensifies. The party starts sabotaging each other\'s death scenes for better positioning. "That was MY lava pit!"',
      ],
    },
    {
      title: 'The Final Death',
      summary: 'One last round. The dragon offers to help. The party choreographs the most spectacular TPK in arena history.',
      challenge: 'combat',
      keyEvents: [
        'The dragon: "I have breath weapons. I have claws. I have FLAIR. Tell me what you need and I will deliver."',
        'The party coordinates: a chain reaction of deaths that triggers in sequence like dominoes',
        'The finale: the last player standing delivers a monologue while the dungeon collapses around them. The dragon provides a spotlight.',
        'Scores tallied. The winner\'s name goes on the Wall. The ghosts chant it. The participation trophies are handed out. Everyone respawns. Everyone wants to go again.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Bones the MC', role: 'host / scorekeeper', personality: 'A charismatic skeleton in a top hat who MC\'s the arena. Scores deaths in real time with withering commentary. "A three. You died to a floor tile. My grandmother died better and she was already dead."' },
    { name: 'Pyraxis the Collaborative Dragon', role: 'final round partner', personality: 'An ancient dragon who treats spectacular kills as performance art. Will breathe fire in slow motion if you ask nicely. "Where do you want the explosion? Stage left or stage right?"' },
  ],
  keyLocations: [
    { name: 'The Arena of Unfortunate Endings', description: 'A magical dungeon designed for spectacular deaths. Every trap has a theatrical flair. Every monster is a performer. The audience is dead and loving it.', significance: 'The entire setting. Every room is a death opportunity scored on creativity.' },
    { name: 'The Wall of Legendary Deaths', description: 'A massive wall inscribed with the greatest deaths in arena history. Entry 1: "Wrestled a tarrasque. On purpose." Entry 2: "Cast Wish to die in every plane simultaneously."', significance: 'The prize. Getting your name here means you died better than anyone.' },
  ],
  dataSystems: ['combatNarration', 'trapGenerator', 'encounterWaves'],
};
