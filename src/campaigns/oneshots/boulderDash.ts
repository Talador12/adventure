import type { OneShotCampaign } from '../types';

export const boulderDash: OneShotCampaign = {
  id: 'oneshot-boulder-dash',
  type: 'oneshot',
  title: 'Boulder Dash',
  tagline: 'The boulder is sentient. It is friendly. It wants a hug. It is also 20 feet wide and rolling at 60mph.',
  tone: 'shenanigans',
  themes: ['comedy', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2,
  settingSummary:
    'The Temple of Rolling Stone was a normal dungeon until the central boulder gained sentience from a stray Awaken spell. The boulder, who calls itself Rollie, has the emotional intelligence of a golden retriever puppy and the physical reality of a 20-foot granite sphere weighing 15 tons. It loves people. It wants to be near people. When it sees people, it rolls toward them at terrifying speed with the enthusiasm of a dog greeting its owner. It does not understand that hugging someone when you are a boulder kills them.',
  hook: 'The party enters the temple. A deep rumbling echoes from below. A cheerful, booming voice calls out: "FRIENDS? IS THAT FRIENDS? ROLLIE IS COMING! ROLLIE WANTS HUGS!" The ground shakes. A 20-foot boulder rounds the corner at 60mph, grinning (it has a face now, carved by the awakening spell). The party runs.',
  twist: 'Rollie cannot be killed - it is a boulder. It cannot be stopped - it has too much momentum. It cannot be reasoned with - it is too excited. And it is FASTER than the party in a straight line. The only way to survive is to outmaneuver it using the temple\'s corridors, stairs, and dead ends. But Rollie learns. It starts predicting where they go. By scene three, Rollie is cutting them off.',
  climax: 'The party reaches the temple exit but the corridor is straight and Rollie is behind them with a clear shot. They must find a way to stop, redirect, or satisfy Rollie. The solution: build something Rollie can hug without killing it. A stone pillar. A wall. Something boulder-sized. Rollie hugs the pillar, declares it his best friend, and stops chasing. The party escapes while a boulder lovingly embraces a column.',
  scenes: [
    {
      title: 'RUN.',
      summary: 'The party meets Rollie. Rollie meets the party. The party runs. Rollie follows. The chase through the temple begins.',
      challenge: 'exploration',
      keyEvents: [
        '"FRIENDS! ROLLIE FOUND FRIENDS!" A 20-foot boulder with a smiling face rounds the corner at terrifying speed.',
        'The party sprints. Rollie is faster in a straight line but cannot turn well. Corridors are the party\'s advantage.',
        'A dead end. The party doubles back. Rollie overshoots the turn, crashes through a wall, and comes back smiling.',
        'The party discovers Rollie cannot go up stairs. Momentary relief. Then Rollie finds the ramp.',
      ],
    },
    {
      title: 'Rollie Learns',
      summary: 'Rollie starts anticipating the party\'s movements. It takes shortcuts. It waits around corners. The friendly boulder is becoming a tactical problem.',
      challenge: 'puzzle',
      keyEvents: [
        'The party tries the same corridor twice. Rollie is already there. "I KNEW YOU WOULD COME BACK! HUG TIME!"',
        'Rollie breaks through walls to create shortcuts. The temple layout is changing in real time.',
        'The party tries talking to Rollie through a wall. Rollie gets so excited it breaks the wall to get closer.',
        'A narrow passage: too small for Rollie. The party squeezes through. Rollie waits on the other side. Patience.',
      ],
    },
    {
      title: 'The Hug Solution',
      summary: 'The party reaches the exit but needs to solve the Rollie problem permanently. The answer is not fighting. It is friendship.',
      challenge: 'puzzle',
      keyEvents: [
        'The exit corridor is straight and long. Rollie appears behind them. There is nowhere to dodge.',
        'Someone suggests: "What if we give it something to hug?"',
        'The party builds or finds a boulder-sized object: a stone pillar, a statue, a conveniently placed column',
        'Rollie hugs the pillar. It stops rolling. "I LOVE YOU, NEW FRIEND." The party walks out. Rollie is happy. Everyone survives.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Rollie', role: 'antagonist / innocent / boulder', personality: 'A 20-foot sentient boulder with the personality of an overexcited puppy. Loves everyone. Cannot understand why people run. "WHY DO FRIENDS RUN? ROLLIE JUST WANTS TO BE CLOSE!" Has no malice. Has 15 tons of momentum.' },
    { name: 'Archivist Della', role: 'exposition / trapped', personality: 'A researcher trapped on a high ledge above the temple floor. Has been there for two days since Rollie woke up. Has extensive notes on Rollie\'s behavior patterns. "It sleeps for exactly 47 minutes every six hours. I have been COUNTING."' },
  ],
  keyLocations: [
    { name: 'The Temple of Rolling Stone', description: 'An ancient temple with wide corridors, sharp turns, ramps, stairs, and increasingly boulder-shaped holes in the walls. The architecture was not built for this.', significance: 'The chase arena. Every room is a potential escape route or a dead end.' },
    { name: 'The Exit Corridor', description: 'A long, straight, wide corridor leading to the temple exit. No turns. No cover. Perfect for a boulder.', significance: 'The final challenge. Where Rollie must be dealt with once and for all.' },
  ],
  dataSystems: ['chaseSequence', 'trapGenerator', 'combatNarration'],
};
