import type { OneShotCampaign } from '../types';

export const theHandprint: OneShotCampaign = {
  id: 'oneshot-handprint',
  type: 'oneshot',
  title: 'The Handprint',
  tagline: 'A handprint on a wall. Wet. Not there yesterday. Too large to be human. Warm.',
  tone: 'horror',
  themes: ['horror', 'mystery'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'A wet handprint appears on the interior wall of a family\'s home. It was not there yesterday. The print is too large for any humanoid, with six fingers, and the moisture is warm to the touch. The family calls the party. That night, a second handprint appears, lower on the wall. Then a third, even lower. Something is pressing through from the other side. And it is crawling down.',
  hook: 'The father shows the party the wall. The handprint glistens. Six fingers. Eighteen inches across. He touches it. "It is warm. Like something alive is pressing against the other side." The family\'s child stares at the wall. "It was higher up yesterday."',
  twist: 'The handprints are from the family\'s former house. A fire demon was accidentally summoned and bound into the walls of their previous home, which they fled. The demon has been crawling through the walls between buildings, following the family across town, pressing through the plaster from inside the wall cavity. It is not targeting them out of malice. The binding ritual tethered it to the family\'s bloodline. It follows because it must.',
  climax: 'The handprint reaches the floor and something begins to push through the wall. The party must either complete a banishment before it fully emerges, sever the blood tether, or face a fire demon in a family\'s living room.',
  scenes: [
    {
      title: 'Scene 1: The Prints',
      summary: 'Examining the handprints. Each new one is lower, larger, and warmer. Something is coming through the wall.',
      challenge: 'exploration',
      keyEvents: [
        'First print: 6 feet up, six fingers, warm moisture, faintly smelling of sulfur',
        'Second print: 4 feet up, appeared overnight, smeared as if something dragged downward',
        'The wall behind the plaster: unnaturally warm, a faint pulse like a heartbeat',
        'The family: terrified. They moved here specifically because strange things happened at their old house',
      ],
    },
    {
      title: 'Scene 2: The Connection',
      summary: 'Investigating the family\'s old house and discovering the failed summoning that bound a demon to their bloodline.',
      challenge: 'exploration',
      keyEvents: [
        'The old house: abandoned, fire-damaged, with handprints burned into every wall',
        'A ritual circle in the basement, badly drawn, with a blood component',
        'The binding: someone in the family\'s past attempted a summoning and bound the demon to their blood',
        'The demon has been following the family through walls for generations, getting closer each time',
      ],
    },
    {
      title: 'Scene 3: The Emergence',
      summary: 'The handprint reaches the floor. Fingers push through the plaster. The party has minutes before a fire demon is in the living room.',
      challenge: 'combat',
      keyEvents: [
        'The wall cracks: six glowing fingers push through the plaster, heat blistering the paint',
        'Banishment option: a ritual from the old house\'s notes, requires components and concentration',
        'Blood tether severance: a cleric or mage can cut the connection, but the family member feels it',
        'Full emergence: if neither works, a fire demon pulls itself into the house and combat begins',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Harren Family', role: 'the protected', personality: 'The father keeps touching the wall and pulling his hand back from the heat. The mother has already packed two bags and set them by the door. The child, seven, draws pictures of handprints because that is what their walls have always done, in every house. "Mummy, is the wall person coming to visit again?" The parents look at each other.' },
    { name: 'The Bound One', role: 'antagonist', personality: 'Not a personality. A presence. The handprints descend the wall one per hour, each one larger and warmer than the last. At four feet, the plaster blisters. At two feet, the wallpaper peels in curls. At floor level, the handprint glows orange at the edges. Then the fingers push through. They are not fingers. They are too long. They bend the wrong way. And they are reaching for the child.' },
    { name: 'Archivist Senna', role: 'ally', personality: 'Taps her pen against her teeth when she reads. Pulls files without looking up. "The Harren family has moved four times in two generations. Every house develops the same handprints. I always assumed it was structural. Subsidence, thermal cracking, something rational." She puts down the file. "Then I found the summoning circle in the basement of the first house. It is not structural."' },
  ],
  keyLocations: [
    { name: 'The Harren Home', description: 'A normal family house with an abnormal handprint crawling down the interior wall.', significance: 'Where the horror plays out in the most domestic setting possible.' },
    { name: 'The Old House', description: 'The family\'s previous home, fire-damaged and covered in burned handprints.', significance: 'Where the origin of the curse is discovered.' },
    { name: 'The Wall', description: 'The specific wall where the handprint is descending, growing warmer and larger each hour.', significance: 'The countdown. Every handprint is one step closer to emergence.' },
  ],
  dataSystems: ['hauntedLocation', 'detectiveCase', 'combatNarration', 'puzzleLock', 'environmentalHazard'],
};
