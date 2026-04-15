import type { OneShotCampaign } from '../types';

export const theDungeonIsAlive: OneShotCampaign = {
  id: 'oneshot-the-dungeon-is-alive',
  type: 'oneshot',
  title: 'The Dungeon Is Alive',
  tagline: 'The dungeon breathes. It SNEEZES. The party is inside a sleeping creature\'s sinuses. Escape before it blows its nose.',
  tone: 'shenanigans',
  themes: ['comedy', 'dungeon_crawl', 'survival'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'The party entered what they thought was a cave. It is a nostril. The walls are wet and warm. The floor is spongy. The ceiling pulses. They are inside the nasal cavity of a sleeping titan-sized creature called a Megalith. The creature is asleep and has a cold. It sniffles every few minutes, creating hurricane-force winds in the "corridors." When it sneezes, everything in its sinuses gets launched out at terminal velocity. The party must navigate from deep inside the creature\'s head to an exit (the mouth, the ear, or the OTHER nostril) before the big sneeze.',
  hook: 'The party walks deeper into the "cave." The walls get warmer. The floor gets softer. A rhythmic whooshing echoes through the corridors - in and out, in and out. The wizard touches the wall. It is flesh. "This is not a cave." A massive sniffle: hurricane winds pull the party deeper. "THIS IS A NOSE."',
  twist: 'The creature is waking up. Each scene, the breathing gets faster. The sniffles become more frequent. The sinuses start to swell, narrowing the passages. By scene three, the creature is in the pre-sneeze state: a deep inhale that pulls everything inward, followed by the explosive sneeze that will launch the party into the stratosphere if they are still inside.',
  climax: 'The creature inhales for the big sneeze. The party has 30 seconds to reach an exit or be sneezed into orbit. The closest exit is the ear canal, but it is full of wax. The other nostril is blocked by an old adventuring party that got stuck there years ago (they are fine, just stuck). The mouth is open but the tongue is an obstacle course. Pick an exit. Go.',
  scenes: [
    {
      title: 'The Realization',
      summary: 'The party discovers they are inside a living creature. The "dungeon" is biological. The traps are immune responses. The monsters are white blood cells.',
      challenge: 'exploration',
      keyEvents: [
        'The walls pulse. The floor squishes. Someone pokes the ceiling and it flinches. "We are inside something."',
        'A sniffle: 60mph winds blast through the corridor. The party braces. Loose items fly deeper into the creature.',
        'The "monsters": white blood cell blobs that see the party as foreign bodies. They try to absorb and expel intruders.',
        'Navigation: the "corridors" are sinus passages. They branch, loop, and occasionally contract when the creature breathes.',
      ],
    },
    {
      title: 'The Waking',
      summary: 'The creature stirs. Breathing accelerates. Passages narrow as sinuses swell. The party must move faster through a shrinking, pulsing biological maze.',
      challenge: 'puzzle',
      keyEvents: [
        'The breathing speeds up. The wind cycles are shorter and more violent. Timing movement between breaths becomes critical.',
        'Sinus swelling: a passage that was 10 feet wide is now 3 feet. The fighter gets stuck. The creature sniffles and unsticks him violently.',
        'An intersection: left goes to the ear, right goes to the throat, straight goes deeper. Wrong choices mean getting swallowed.',
        'The old adventuring party: skeletons in the other nostril. They made it this far and got stuck in mucus. A cautionary tale.',
      ],
    },
    {
      title: 'The Big Sneeze',
      summary: 'The creature inhales deeply. The party has 30 seconds to reach an exit before being explosively ejected at 200mph.',
      challenge: 'exploration',
      keyEvents: [
        'The inhale: everything pulls inward. The party fights against suction toward the lungs.',
        'The ear canal: full of wax. The rogue can squeeze through. Others need to melt or cut the wax. Time pressure.',
        'The mouth: the tongue is a moving obstacle course. Teeth are pillars to dodge. Saliva is the terrain.',
        'The sneeze: whoever is still inside gets launched. If they aimed for the right nostril, they fly 300 feet and land in a lake. If they aimed wrong, they land in a tree. Everyone survives. Dignity does not.',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Megalith', role: 'the dungeon / unwitting antagonist', personality: 'A titan-sized creature that is asleep with a cold. Does not know the party is inside it. Does not care. It just wants to sleep. And sneeze. Its immune system is the real antagonist.' },
    { name: 'Dr. Vex the Biologist', role: 'quest giver / external support', personality: 'A researcher who sent the party to collect a "rare mineral sample" from the "cave." Did not mention it was alive. Speaking to them via Sending: "How is the sample collection going? Why do I hear screaming?"' },
  ],
  keyLocations: [
    { name: 'The Nasal Cavity', description: 'The main "dungeon": fleshy walls, spongy floors, mucus-lined corridors, and periodic hurricane-force airflow. Smells exactly like you would expect.', significance: 'The setting. Every room is a biological system that reacts to the party\'s presence.' },
    { name: 'The Ear Canal', description: 'An alternative exit. Narrow, waxy, and leads to a 50-foot drop from the creature\'s ear to the ground.', significance: 'One of three possible exits. The "stealth" option.' },
    { name: 'The Mouth', description: 'The fastest exit if you can dodge teeth, navigate the tongue, and avoid being swallowed. Wet.', significance: 'The "combat" exit option. Dangerous but direct.' },
  ],
  dataSystems: ['chaseSequence', 'trapGenerator', 'combatNarration'],
};
