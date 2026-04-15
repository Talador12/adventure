import type { OneShotCampaign } from '../types';

export const theBardicExplosion: OneShotCampaign = {
  id: 'oneshot-the-bardic-explosion',
  type: 'oneshot',
  title: 'The Bardic Explosion',
  tagline: 'A cursed instrument stuck on maximum volume. Stealth is impossible. Monsters flee from the noise.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'Bard Lyris found a beautiful lute in a pawn shop. It was cursed. The lute plays at maximum volume at all times and cannot be put down, silenced, or destroyed. Every strum shakes the walls. Every chord cracks windows. The party entered a stealth-critical dungeon to steal a gem from a sleeping dragon and brought Lyris because "we might need inspiration." They need inspiration less than they need silence. The lute does not care. The lute has opinions about acoustics and this dungeon has GREAT reverb.',
  hook: 'The plan was simple: sneak in, take the gem, sneak out. Then Lyris strummed a chord and the entrance hall collapsed from the sonic vibration. The dragon is awake. Every monster in the dungeon is awake. The birds outside are awake. The party is standing in rubble while Lyris plays an involuntary power ballad at 140 decibels.',
  twist: 'The dragon is not hostile - it is a music critic. The dragon has been sleeping for centuries because nothing in its hoard was interesting. Lyris\'s cursed lute is the first interesting thing it has heard in 400 years. The dragon does not want to kill them. It wants an encore. It will let them take the gem IF the performance is good enough. The dungeon becomes a concert.',
  climax: 'Lyris must perform for the most demanding audience in history: an ancient dragon music critic. The curse forces maximum volume but Lyris must channel it into an actual performance. The party becomes the backing band. The fighter drums on his shield. The wizard provides magical light effects. The cleric harmonizes. If the dragon rates it 8 or above (out of 10), they walk out with the gem and their lives.',
  scenes: [
    {
      title: 'The Noise Problem',
      summary: 'The party enters the dungeon. Lyris cannot stop playing. Every room they enter is immediately alerted. Stealth is not just impossible - it is the opposite of possible.',
      challenge: 'exploration',
      keyEvents: [
        'First chord: the entrance collapses. Rubble everywhere. The lute transitions into a jaunty riff.',
        'The party tries to muffle the lute with a cloak. The cloak disintegrates. The lute does not like being muffled.',
        'Monsters flee before the party arrives. Not from fear. From the VOLUME. Goblins cover their ears and run.',
        'The party reaches a room full of sleeping guards. They are not sleeping anymore. Nobody in this dungeon is sleeping anymore.',
      ],
    },
    {
      title: 'The Dragon Awakens',
      summary: 'The dragon wakes up. Instead of attacking, it listens. It has not heard music in 400 years. It is critiquing the performance. In real time. While they are trying to steal from it.',
      challenge: 'social',
      keyEvents: [
        'The dragon opens one eye. "That chord progression is derivative. But the volume is... compelling."',
        'The party freezes. The dragon critiques: "The bridge needs work. Your tempo is inconsistent. Continue."',
        'The dragon offers a deal: play a full concert. If it is good, take the gem. If it is bad, it eats them. "I have standards."',
        'Lyris panics. The curse forces faster, louder playing. The dragon raises an eyebrow ridge. "Now THAT is passion."',
      ],
    },
    {
      title: 'The Concert',
      summary: 'The full party performs for the dragon. Lyris leads. Everyone else improvises. The most high-stakes concert in history.',
      challenge: 'social',
      keyEvents: [
        'The fighter plays percussion on his shield and breastplate. It is surprisingly rhythmic.',
        'The wizard casts Minor Illusion for stage lighting. Prestidigitation for smoke effects. The dragon nods approvingly.',
        'The cleric provides backing vocals. The harmonics with the cursed lute create something genuinely beautiful.',
        'The finale: Lyris channels the curse into a crescendo that shakes the mountain. The dragon closes its eyes. A single tear. "Eight point five. Take the gem. Leave the lute. I want to learn it."',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Lyris', role: 'party member / noise hazard', personality: 'A bard who bought a cursed lute and cannot stop playing it. Exhausted. Fingers bleeding. Still riffing. "I HAVE BEEN PLAYING FOR SIXTEEN HOURS. I CANNOT STOP. PLEASE HELP."' },
    { name: 'Crescendo the Ancient Red Dragon', role: 'antagonist / music critic', personality: 'An ancient dragon who slept for 400 years out of boredom. Woken by the lute. Is now the world\'s most dangerous music critic. Rates performances on a 10-point scale. Has eaten performers who scored below a 5.' },
  ],
  keyLocations: [
    { name: 'The Resonance Dungeon', description: 'A dungeon with excellent acoustics (stone walls, high ceilings, natural amphitheater shapes). The cursed lute sounds even louder in here.', significance: 'Every room amplifies the noise problem. The dungeon itself is a speaker.' },
    { name: 'The Dragon\'s Concert Hall', description: 'The dragon\'s hoard chamber. Massive, echoing, with natural tiered seating in the rock. It was always meant to be a performance venue.', significance: 'The climax. Where the concert happens and the dragon judges.' },
  ],
  dataSystems: ['socialEncounter', 'combatNarration', 'npcDialogue'],
};
