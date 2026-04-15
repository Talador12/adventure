import type { OneShotCampaign } from '../types';

export const theLastSunrise: OneShotCampaign = {
  id: 'oneshot-last-sunrise',
  type: 'oneshot',
  title: 'The Last Sunrise',
  tagline: 'The sun will not rise tomorrow. Not stolen - broken. The celestial machinery has stopped.',
  tone: 'epic',
  themes: ['epic', 'planar', 'dungeon_crawl'],
  playerCount: { min: 3, max: 6 },
  level: 9,
  estimatedHours: 3,
  settingSummary:
    'The sun exists. It is still there. It just will not move. The celestial mechanism that carries the sun across the sky has jammed. Somewhere in the clockwork that runs the cosmos, a gear has stopped. The party must ascend to the Celestial Orrery - the machine that moves the heavens - find the broken component, and fix it before the world freezes under a permanent midnight.',
  hook: 'The astronomer\'s hands shake: "The sun did not move today. It set normally last night and should have risen four hours ago. My instruments show the Celestial Orrery has stopped. Something in the mechanism that drives the heavens is broken. Someone must go up and fix it. By \'up\' I mean... past the sky."',
  twist: 'The mechanism was not broken by accident. It was sabotaged by a celestial engineer - an ancient being tasked with maintaining the Orrery - who stopped the sun on purpose because a solar flare was about to occur that would have scorched the mortal world. The "breakdown" is actually an emergency stop. The party must decide: restart the machine (risking the flare) or find another way to prevent the flare and THEN restart it.',
  climax: 'The Orrery. A mechanism the size of a planet. The party finds the sabotaged gear and the engineer who stopped it. She shows them the solar flare building behind the frozen sun. Restart now and the world burns. Wait too long and the world freezes. The party must find a solution to both problems simultaneously.',
  scenes: [
    {
      title: 'Scene 1: The Ascent',
      summary: 'Reaching the Celestial Orrery. The party travels beyond the sky into the mechanical heavens.',
      challenge: 'exploration',
      keyEvents: [
        'The path: an ancient observatory contains a portal to the Orrery, unused for millennia',
        'The transit: passing through the sky into the space beyond, where gears the size of mountains turn (or should be turning)',
        'The Orrery: a mechanism of impossible scale - planets on tracks, stars on spindles, the moon on a pendulum',
        'The silence: it should be deafening with movement but it is still - the mechanism is stopped',
      ],
    },
    {
      title: 'Scene 2: The Engineer',
      summary: 'Finding the sabotaged gear and the celestial engineer who stopped the machine.',
      challenge: 'social',
      keyEvents: [
        'The gear: a massive cog jammed with a crystal wedge - clearly deliberate',
        'The engineer: a being of starlight and metal, ancient, exhausted, and relieved to see the party',
        'Her explanation: "A solar flare. If the sun moves, the flare fires when it reaches noon position. Everything burns."',
        'The dilemma: the world is already freezing - but restarting means the flare',
      ],
    },
    {
      title: 'Scene 3: The Fix',
      summary: 'Solving both problems. The freeze and the flare. The clock and the fire.',
      challenge: 'puzzle',
      keyEvents: [
        'The flare: visible behind the frozen sun, building in intensity, a wave of fire waiting to release',
        'Option 1: redirect the flare using the Orrery\'s own mechanisms (complex, the party must operate celestial machinery)',
        'Option 2: create a shield from the moon\'s orbit track (move the moon to block the flare)',
        'The restart: once the flare is addressed, pulling the crystal wedge and watching the heavens move again',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Engineer Astra', role: 'celestial mechanic', personality: 'An ancient being created to maintain the Celestial Orrery. She has been alone here for a million years. Stopped the sun to save the world. Needs the party\'s help to fix both problems.' },
    { name: 'Astronomer Tetch', role: 'quest giver', personality: 'The mortal astronomer who figured out what happened. Cannot make the journey himself but provides the portal key and the knowledge to understand the Orrery.' },
  ],
  keyLocations: [
    { name: 'The Celestial Orrery', description: 'A mechanism the size of a solar system that drives the heavens. Gears of crystal and adamantine, tracks for celestial bodies, and a silence where there should be motion.', significance: 'The entire second half takes place here.' },
    { name: 'The Sun Gear', description: 'A massive gear responsible for the sun\'s daily transit. Jammed with a crystal wedge. Behind it, a solar flare builds.', significance: 'The sabotage point and the dual problem.' },
    { name: 'The Ancient Observatory', description: 'A forgotten building on a mountaintop containing the portal to the Orrery. Dusty, abandoned, and the party\'s only way up.', significance: 'The gateway to the celestial machinery.' },
  ],
  dataSystems: ['encounterWaves', 'trapDisarm', 'socialEncounter'],
};
