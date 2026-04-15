import type { OneShotCampaign } from '../types';

export const theBottomOfTheWell: OneShotCampaign = {
  id: 'oneshot-bottom-of-the-well',
  type: 'oneshot',
  title: 'The Bottom of the Well',
  tagline: 'The well is 30 feet deep. The coin hit water at 30 feet. Then hit something else at 300.',
  tone: 'exploration',
  themes: ['exploration', 'underdark'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 3,
  settingSummary:
    'The village well has provided clean water for generations. Last week, a child dropped a coin and heard it splash at the expected depth. Then, seconds later, a second impact echoed up from far, far below. The well goes deeper than anyone knew. The party descends past the water table into something ancient.',
  hook: 'The village elder demonstrates: she drops a stone. Splash at 30 feet. Then silence. Then, faintly, a distant ring of stone on metal at what must be 300 feet. She drops another stone. Same result. "That started last Tuesday. The water still tastes fine. But something changed down there."',
  twist: 'The well shaft intersects an ancient dwarven transit system, a network of vertical shafts connected by horizontal tunnels, abandoned millennia ago. The second sound is the coin bouncing off a transit platform. The system is not empty. Something is using it to travel between cities that no longer exist.',
  climax: 'The party discovers the transit hub and encounters its current occupant: a stone golem maintenance worker that has been performing its duties for 3,000 years, unaware the civilization it serves is gone. Convincing it to stop or repurpose it determines whether the tunnel network stays open.',
  scenes: [
    {
      title: 'Scene 1: The Descent',
      summary: 'Down the well shaft, past the water table, into a carved stone passage that should not exist below a farming village.',
      challenge: 'exploration',
      keyEvents: [
        'The well: mossy stone for 30 feet, cold water at the bottom. Below the water line, the shaft continues into stone that is too smooth, too geometric to be natural',
        'Past the water table: the walls become fitted dwarven masonry. Geometric patterns carved in precise repeating sequences. The air smells of mineral dust and deep earth, and it is warm',
        'At 300 feet, the vertical shaft opens onto a horizontal platform. Iron rails are set into the floor, polished by use. The silence down here is total, like being inside a held breath',
        'The coin: a copper piece sitting on the platform exactly where it landed, glinting in torchlight. Around it, the floor has been swept clean. Recently.',
      ],
    },
    {
      title: 'Scene 2: The Transit Hub',
      summary: 'The platform is part of a vast underground network. Multiple tunnels branch in every direction, and something is moving in them.',
      challenge: 'exploration',
      keyEvents: [
        'The hub: a cathedral-sized junction with six tunnel mouths, each heading to a different ruin',
        'Signs of recent activity: swept floors, oiled rails, maintained rune lights',
        'Sounds in the tunnels: grinding stone, rhythmic footsteps, the clank of metal tools',
        'A map carved into the wall showing a civilization that does not exist anymore',
      ],
    },
    {
      title: 'Scene 3: The Maintenance Worker',
      summary: 'Encountering the golem that has maintained this system for millennia. It does not know the world above has changed.',
      challenge: 'social',
      keyEvents: [
        'The golem: 10 feet tall, stone, carrying tools, polishing rails in an empty station',
        'Communication: it speaks ancient Dwarvish and follows a maintenance schedule carved in stone',
        'The revelation: it has been alone for 3,000 years, performing duties for passengers who stopped coming',
        'The choice: shut it down, redirect its purpose, or leave it to its eternal task',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Elder Moss', role: 'quest giver', personality: 'The village elder who has lived here 70 years and never heard a sound from the well before last Tuesday. Practical, suspicious of magic, but honest about what she heard.' },
    { name: 'The Caretaker', role: 'neutral presence', personality: 'Ten feet of polished granite carrying a toolbox older than every surface civilization. It notices the party the way a janitor notices someone in the hallway: brief acknowledgment, then back to work. Speaks ancient Dwarvish in a grinding bass. "The 14:00 service to Karak Dorn is delayed. Please wait on the platform." The 14:00 service has been delayed for 3,000 years.' },
    { name: 'Mira', role: 'ally', personality: 'The child who dropped the first coin. Brave, curious, and absolutely certain something wonderful is down there. She is not wrong.' },
  ],
  keyLocations: [
    { name: 'The Village Well', description: 'An ordinary stone well that goes 270 feet deeper than it should.', significance: 'The entry point and the first mystery.' },
    { name: 'The Transit Hub', description: 'A dwarven underground junction with six tunnel mouths, maintained to perfection by a golem that never stopped working.', significance: 'The heart of the exploration and the source of the sound.' },
    { name: 'The Map Wall', description: 'A carved relief showing an entire underground transit network connecting cities that no longer exist.', significance: 'The revelation of scale. This is not a tunnel. It is a civilization.' },
  ],
  dataSystems: ['underdarkNavigation', 'dwarvenRuins', 'puzzleLock', 'npcDialogue', 'explorationChallenge'],
};
