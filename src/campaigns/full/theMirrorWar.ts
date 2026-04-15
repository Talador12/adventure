import type { FullCampaign } from '../types';

export const theMirrorWar: FullCampaign = {
  id: 'full-the-mirror-war',
  type: 'full',
  title: 'The Mirror War',
  tagline: 'Your reflection has declared war. In their world, you are the evil twin.',
  tone: 'horror',
  themes: ['horror', 'planar', 'urban'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 16,
  settingSummary:
    'Every reflection is a portal. Look into a mirror, a still pond, a polished shield - and something looks back. The Mirror World is real, and it is reversed. Left is right. Good is evil. The party reflections are their doubles: same stats, same abilities, opposite morality. The doubles have declared war on the "real" world. But in the Mirror World, the doubles ARE the real ones and the party are the invading evil twins. Neither side is wrong. Both sides are fighting for their lives. The horror is symmetry.',
  hook:
    'The party member looks into a mirror and their reflection does not move when they do. It smiles. It mouths the words: "We are coming through." That night, every mirror in the city shatters outward. Things climb out. They look exactly like people - but reversed. Left-handed where they were right. Scars on the wrong side. And they fight without mercy, claiming they are defending themselves from "the others." The party doubles step through and announce: the Mirror World will replace this one.',
  twist:
    'There is no "real" world. Both worlds are reflections of a third world - the Prime - that shattered ten thousand years ago. The Prime broke into two mirrored fragments, each believing itself to be the original. Neither side is the real one. Both are echoes. The war is two reflections fighting over which one is the object. The truth is: the object is gone.',
  climax:
    'The party discovers the shattered Prime at the exact center between both mirror worlds. They can restore it - but doing so means both reflections cease to exist. Everything in both worlds is absorbed back into the restored Prime. New world, new people, new history. Or they can shatter the barrier between mirrors permanently, forcing both worlds to merge - creating a combined reality where every person has two selves. The doubles become part of you. Left and right reunited.',
  acts: [
    {
      title: 'Act 1: Through the Looking Glass',
      summary:
        'The Mirror War begins. Reflections emerge from every reflective surface. The party fights their doubles and discovers the Mirror World. Initial investigation reveals the doubles are not mindless copies - they have lives, families, histories. They think THEY are real.',
      keyEvents: [
        'The first reflection speaks: "We are coming through." Every mirror in the city explodes outward.',
        'Combat with mirror doubles: same stats, same abilities, but reversed tactics. Left-handed fighters, mirrored spell lists.',
        'Entering the Mirror World through a shattered mirror: everything is reversed. Text reads backward. The sun rises in the west.',
        'Discovery: mirror people have families, jobs, memories. A mirror child asks why the "bad people" hurt her father.',
        'Armistice attempt: both sides agree to a parley. It collapses when each side accuses the other of being the copy.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Symmetry of Evil',
      summary:
        'The war escalates. Both sides destroy reflective surfaces to cut off the enemy invasion route. The party goes deeper into the Mirror World and finds a terrifying symmetry: for every good deed they have done, their doubles did the exact opposite - and vice versa. The mirror party are heroes in their own world.',
      keyEvents: [
        'Mirror destruction campaign: both sides smash every reflective surface. Still water is poisoned. Metal is dulled.',
        'Deep mirror exploration: the party doubles have a completely different reputation. They are beloved. The party are feared.',
        'Finding the Reflection Scholar: an ancient being who exists in both worlds simultaneously, constantly arguing with herself',
        'The Scholar reveals: neither world has an "original." Both are fragments. Something broke before them.',
        'A mirror ally: one double defects, claiming they just want the war to end. Can they be trusted?',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Shattered Prime',
      summary:
        'The party and their doubles (reluctant allies now) discover the remains of the Prime World. The truth: both worlds are reflections of something that no longer exists. They must choose: restore the Prime (erasing both reflections), merge the worlds (everyone gets a double), or maintain the war forever.',
      keyEvents: [
        'Truce with the doubles: both sides agree to investigate the Prime together. The tension is razor-thin.',
        'Reaching the center: a shattered plane where fragments of the original world drift in void. Beautiful and terrible.',
        'The Prime reconstruction: they COULD rebuild it, but both reflected worlds would be absorbed. Everyone dies and is reborn as someone new.',
        'The merge option: tear down the mirror barrier. Both worlds overlap. Every person gains their opposite. Internal war replaces external.',
        'The choice: restore, merge, or separate. No option is clean. Every option means loss.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'The Doubles',
      role: 'antagonists / dark mirrors',
      personality:
        'Mirror versions of each party member. Same capabilities, opposite morality and personality. A kind party member has a cruel double. A cowardly one has a brave double. They are not evil - they are reversed. In their world, they are the heroes.',
      secret: 'They are just as frightened as the party. Their war declaration was a preemptive strike born of fear.',
    },
    {
      name: 'The Reflection Scholar (Lyris / Siryk)',
      role: 'neutral guide',
      personality:
        'An ancient being that exists in both worlds simultaneously as two people arguing in one body. Speaks in contradictions. Knows the truth about the Prime but is terrified of what the knowledge will cause.',
    },
    {
      name: 'Commander Vex (Mirror Side)',
      role: 'mirror military leader',
      personality:
        'The mirror world military commander who ordered the invasion. Ruthless and tactical. In the mirror world, she is a war hero protecting her people from "the monsters on the other side of the glass." She is not wrong.',
    },
    {
      name: 'Tam the Defector',
      role: 'uncertain ally',
      personality:
        'A mirror person who crossed over and surrendered. Claims to want peace. Provides intelligence on the mirror world. Charming, helpful, and impossible to fully trust because you cannot tell if a mirror person is lying by reading them normally - everything is reversed.',
      secret: 'Tam is genuine. They are tired of the war. But their mirror-self (in the party world) is a spy. The defection was real but exploited.',
    },
  ],
  keyLocations: [
    {
      name: 'The Mirror City',
      description: 'The reflected version of the capital. Identical layout but reversed. Where the party world has a park, the mirror has a prison. Where one has a temple, the other has a ruin. Same geography, opposite character.',
      significance: 'The primary Mirror World location. Where the doubles live and the war is staged.',
    },
    {
      name: 'The Glass Frontier',
      description: 'The boundary between worlds, accessible through any sufficiently large reflective surface. Looks like walking through mercury. Disorienting, nauseating, and cold.',
      significance: 'The transition point. Every crossing costs something - a memory, a sensation, a sense of direction.',
    },
    {
      name: 'The Shattered Prime',
      description: 'The remains of the original world floating in void. Fragments of land, frozen waterfalls, half-buildings drifting in silence. Beautiful, broken, and ancient.',
      significance: 'The final location. Where the truth lives and the choice is made.',
    },
  ],
  dataSystems: ['planarAnomaly', 'combatNarration', 'npcGenerator', 'plotTwistEngine', 'urbanEncounter'],
};
