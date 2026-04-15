import type { FullCampaign } from '../types';

export const theThinPlaces: FullCampaign = {
  id: 'full-thin-places',
  type: 'full',
  title: 'The Thin Places',
  tagline: 'You counted the windows from outside. There are more from inside.',
  tone: 'horror',
  themes: ['horror', 'mystery', 'planar'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 16,
  settingSummary:
    'The town of Briarwell is wrong. Not obviously — not at first. But the angles of the buildings do not quite match. Reflections in windows lag half a second behind the person they reflect. Conversations repeat with slightly different words. The barrier between the material plane and the Far Realm is thin here, and reality is fraying at the seams. The horror is not monsters. The horror is wrongness — the creeping realization that the world around you is not behaving as it should.',
  hook: 'The party is hired to investigate disappearances in Briarwell. A simple job. When they arrive, the town looks normal. The people are friendly. But the party\'s shadows do not match their poses. A door that was on the left is now on the right. A shopkeeper greets them twice, word for word, thirty minutes apart. Nobody else notices.',
  twist:
    'Briarwell is not near a thin place. Briarwell IS the thin place. The town was not built by people. It was constructed by a Far Realm entity as a lure — a replica of a real town that no longer exists. Every resident is an echo, a psychic impression of someone who was already consumed by the entity. The real Briarwell was swallowed decades ago. This version exists to attract new minds for the entity to feed on.',
  climax:
    'The entity at Briarwell\'s core begins to digest the town openly. Walls fold into impossible geometries. The echo-residents flicker between their performed normalcy and their true nature — hollow shells puppeted by an alien intelligence. The party must escape or destroy the entity\'s anchor. Destroying it means the echo-residents cease to exist. Escaping means the lure remains active for the next travelers.',
  acts: [
    {
      title: 'Act 1: Something Off',
      summary:
        'The party arrives in Briarwell. Everything seems fine, almost aggressively fine. The wrongness is subtle: geometry that does not add up, repetitions in conversation, shadows with minds of their own.',
      keyEvents: [
        'Arrival: the town is picturesque, welcoming, and wrong in ways the party cannot articulate',
        'The reflection test: a party member notices their reflection blinks when they do not',
        'Repeated conversation: the blacksmith says the same greeting, word for word, to different party members at different times',
        'Counting corners: a room has five corners. Then four. Then five again.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Fraying',
      summary:
        'The wrongness escalates. The town\'s facade breaks down. Residents glitch — freezing mid-sentence, walking into walls, saying things in languages that do not exist. The party discovers the real Briarwell\'s remains beneath the replica.',
      keyEvents: [
        'A resident freezes mid-sentence for thirty seconds. Her mouth stays open. Her eyes do not move. Then she finishes the sentence with different words than she started with.',
        'The basement discovery: beneath a house, the remains of the original Briarwell — consumed, dissolved, wrong',
        'The geometry collapses in a building: hallways that loop, stairs that descend upward, doors that open onto other doors',
        'A resident breaks character: "Please leave. It is already too late for us. It does not have to be too late for you."',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The Maw',
      summary:
        'The entity reveals itself. Briarwell begins to digest. The party must find the anchor — the point where the Far Realm entity is rooted in the material plane — and destroy it or escape before the town folds in on itself.',
      keyEvents: [
        'The sky changes: it is no longer sky, but something that looks like sky if sky were described by something that had never seen it',
        'The residents drop their masks: hollow shells with painted smiles, reaching toward the party',
        'The anchor: a pulsing, geometry-defying structure beneath the town square, connecting the replica to the Far Realm',
        'Escape or destroy: breaking the anchor collapses the town, escaping means it rebuilds and waits for the next visitors',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Mayor Aldric Thorne',
      role: 'the mask',
      personality:
        'The most convincing of the echo-residents. Warm, attentive, helpful. His smile is perfect. His eyes track the party with too much precision - he never blinks at the wrong time, never glances away during conversation, never fidgets. He is too present. His handshake is the exact right pressure. His laugh comes at exactly the right moment. He is the entity\'s primary interface with visitors.',
      secret: 'He is not a person. He is a performance. When the mask slips, his face does not have the right number of features. Once, briefly, a party member sees him from behind and his head is smooth where a face should be.',
    },
    {
      name: 'Elsa',
      role: 'the glitch',
      personality:
        'A young woman who is the worst copy. She stutters, repeats phrases, walks into furniture, and occasionally says things that belong to other conversations. She grabs the party\'s hands too hard, as if afraid they will dissolve. The entity did not replicate her well. She is the closest thing to an ally because her broken programming makes her honest. She is the only echo-resident who seems afraid.',
    },
    {
      name: 'The Hollow',
      role: 'the entity',
      personality:
        'A Far Realm intelligence that experiences the material plane as a buffet. It does not hate or enjoy - it consumes. It communicates through wrongness: a door that opens to the wrong room, a sentence that ends with someone else\'s words, a smell of seawater in a landlocked town. Patient, alien, and utterly without malice, which makes it worse.',
    },
  ],
  keyLocations: [
    {
      name: 'Briarwell',
      description: 'A charming town that does not exist. Every building, every cobblestone, every flower box is a psychic projection laid over the remains of the real Briarwell.',
      significance: 'The entire campaign takes place inside the trap.',
    },
    {
      name: 'The Underlayer',
      description: 'Beneath the replica, the dissolved remains of the original town. Walls melted into organic curves, furniture fused with floor, everything wrong.',
      significance: 'Where the party discovers the truth about what Briarwell really is.',
    },
    {
      name: 'The Anchor',
      description: 'A structure beneath the town square that defies description. Angles that cannot exist. Surfaces that are not surfaces. The point where the Far Realm pushes through.',
      significance: 'The entity\'s root in the material plane and the key to ending the threat.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'magicalAnomaly',
    'mindControl',
    'detectiveCase',
    'cataclysmCountdown',
    'encounterWaves',
    'trapDesign',
    'monsterEcology',
  ],
};
