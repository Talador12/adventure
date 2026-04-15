import type { OneShotCampaign } from '../types';

export const theRoommate: OneShotCampaign = {
  id: 'oneshot-the-roommate',
  type: 'oneshot',
  title: 'The Roommate',
  tagline: 'One room. Four adventurers. One ghost who just wants to sleep. Nobody sleeps.',
  tone: 'comedic',
  themes: ['comedy', 'social', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 2,
  estimatedHours: 2,
  settingSummary:
    'The Crossroads Inn is fully booked. A festival, a tournament, and a merchant convention all happened to land on the same week. There is one room left. It has one bed. The party must share it. The room is also haunted, but the ghost is not malicious - she is a former guest who died of old age in this room fifty years ago and has been sleeping peacefully ever since. She is about to have the worst night of her afterlife.',
  hook: 'The party enters the room. One bed. One chair. One window that does not open. The innkeeper shrugs: "Take it or sleep outside. It is raining fire beetles." The party sets up for the night. One snores like a wounded auroch. One sleepwalks and draws weapons. One sleep-casts (their dreams become minor cantrips). And something under the bed groans - not a monster, just a ghost who was having a lovely nap before four people barged in.',
  twist:
    'The ghost, Millicent, is not just a sleepy spirit. She is a ward. The room sits on a minor planar rift, and Millicent\'s peaceful dreaming keeps it sealed. Every disturbance to her sleep weakens the seal. The snoring makes it flicker. The sleepwalking makes it pulse. The sleep-casting makes it crack. By Scene 3, tiny extraplanar creatures are leaking through the rift because Millicent cannot stay asleep. The party must get the entire room to SHUT UP or the rift opens fully.',
  climax:
    'The rift cracks wide enough for a minor demon to stick its head through. The party must fight it while simultaneously keeping the noise down so Millicent can fall back asleep and reseal the rift. Combat in whispers. Spells at half volume. The snorer must be gently held. The sleepwalker must be guided back to bed. The sleep-caster must be rolled onto their side. It is the most stressful lullaby anyone has ever performed.',
  scenes: [
    {
      title: 'Scene 1: Settling In',
      summary:
        'The party negotiates sleeping arrangements, discovers the ghost, and begins the long process of trying to sleep in impossible conditions.',
      challenge: 'social',
      keyEvents: [
        'The bed argument: who gets it, who gets the floor, who gets the chair that is definitely not meant for sleeping',
        'The ghost introduces herself by groaning when someone sits on "her" bed. "Excuse me. I was here first. By fifty years."',
        'First sleep attempt: the snorer starts. The walls vibrate. Millicent puts a pillow over her head.',
        'The sleepwalker draws a sword and walks into the closet. The closet screams. It was not part of the haunting.',
      ],
    },
    {
      title: 'Scene 2: The Long Night',
      summary:
        'Things escalate. Sleep attempts fail. The sleep-caster\'s dreams become cantrips. Minor disturbances from the weakening rift appear. Millicent is losing her patience and her seal.',
      challenge: 'puzzle',
      keyEvents: [
        'The sleep-caster\'s dream about a campfire manifests as Prestidigitation: actual small flames on the blanket',
        'Small extraplanar creatures leak through the rift: an imp hides under the bed, a mephit nests in the rafters',
        'Millicent explains the rift between yawns: "I have been keeping this sealed for fifty years. Could you PLEASE stop snoring."',
        'The party realizes they must get the room quiet or something bigger comes through',
      ],
    },
    {
      title: 'Scene 3: The Quiet Fight',
      summary:
        'A minor demon breaches the rift. The party must fight it at a whisper. Volume control is the real boss mechanic.',
      challenge: 'combat',
      keyEvents: [
        'A demon sticks its head through the rift. It is surprised to find four people awake and one furious ghost.',
        'Combat at whisper volume: any loud action risks waking or disturbing Millicent further',
        'The sleepwalker charges the demon in their sleep. It somehow works.',
        'The party defeats the demon. Millicent falls asleep. The rift seals. Everyone collapses. The snoring resumes.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Millicent Greaves',
      role: 'ghost / unlikely ally',
      personality:
        'A grandmotherly ghost who has been sleeping in this room for fifty years and wants nothing more than to continue. She is polite but firm. She does not haunt - she naps. "I died here. Peacefully. And I would like to CONTINUE being peaceful. Is that too much to ask?"',
      secret: 'She knows she is a ward. She chose to stay and protect the rift rather than pass on.',
    },
    {
      name: 'Barkeep Olric',
      role: 'quest giver',
      personality:
        'The innkeeper who knows the room is haunted but does not care. "Haunted room, half price. The ghost is quiet. Usually. Do not make noise."',
    },
  ],
  keyLocations: [
    {
      name: 'The Room',
      description: 'A small room at the Crossroads Inn with one bed, one chair, a window that does not open, and a planar rift under the floorboards. It is cozy in a claustrophobic way.',
      significance: 'The entire one-shot takes place in this single room.',
    },
    {
      name: 'The Crossroads Inn',
      description: 'A fully booked inn at the intersection of three major roads. Every room is taken. The hallway is full of sleeping travelers. The bar never closes.',
      significance: 'The framing location. The party cannot get another room. This is it.',
    },
  ],
  dataSystems: [
    'socialEncounter',
    'combatNarration',
    'randomSoundEffect',
    'plotTwistEngine',
  ],
};
