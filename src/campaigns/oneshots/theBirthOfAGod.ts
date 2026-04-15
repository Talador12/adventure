import type { OneShotCampaign } from '../types';

export const theBirthOfAGod: OneShotCampaign = {
  id: 'oneshot-birth-of-a-god',
  type: 'oneshot',
  title: 'The Birth of a God',
  tagline: 'A mortal is ascending to godhood RIGHT NOW. The process is violent. Help it succeed or stop it to save the city.',
  tone: 'epic',
  themes: ['epic', 'urban', 'planar'],
  playerCount: { min: 3, max: 6 },
  level: 8,
  estimatedHours: 3,
  settingSummary:
    'A mortal named Vara is ascending to godhood in the middle of the city of Highspire. Divine energy is tearing through her, warping reality in a three-mile radius. Buildings float. Time loops. People nearby are being transformed. The ascension will complete in three hours. If it succeeds, the world gains a new god. If it fails or is interrupted, the energy release destroys the city.',
  hook: 'The sky cracks open above Highspire. A woman floats in a column of golden light, screaming. The ground warps. A building lifts off its foundation. A messenger from the Mage Guild: "Vara is ascending. We cannot stop it safely. If we let it finish, a new god is born but the city takes massive damage. If we interrupt it, the energy release kills everyone. We need options."',
  twist: 'Vara did not choose to ascend. She was chosen by the divine energy of a dying god who needed a vessel. The god is Lathander, the morning lord, and he is dying of a cosmic plague. He reached for the nearest mortal soul strong enough to hold him. Vara was a baker. She did not ask for this. The ascension is a desperate act by a dying god, not a mortal\'s ambition.',
  climax: 'The party reaches Vara mid-ascension. She is conscious but barely - two beings sharing one body as divine power reshapes her. They must stabilize the ascension (helping Lathander transfer into her, which she may not want), halt it safely (saving Vara but letting Lathander die), or redirect the energy (finding another vessel - one of the party, perhaps).',
  scenes: [
    {
      title: 'Scene 1: The Zone',
      summary: 'The three-mile radius of warped reality around the ascension. Getting to Vara means crossing a landscape gone mad.',
      challenge: 'exploration',
      keyEvents: [
        'The outer ring: a child floats ten feet off the ground, laughing. A house drifts sideways like a boat. Gravity is a suggestion here.',
        'The middle ring: a soldier walks the same patrol loop every eight seconds, unaware. A stone wall turns to water, then back. The party steps through what used to be solid.',
        'The inner ring: the air glows gold. Breathing it tastes like copper and sunlight. A step forward ages a boot. A step back reverses it. Reality is negotiable.',
        'The center: Vara hangs in a column of light, screaming in two voices - one human, one something much older.',
      ],
    },
    {
      title: 'Scene 2: The Dying God',
      summary: 'Understanding what is actually happening. Lathander is dying. Vara is his lifeboat.',
      challenge: 'social',
      keyEvents: [
        'Communication: Vara can speak in brief moments between waves of divine energy',
        'Lathander speaks: through Vara, the dying god explains - a cosmic plague, no other choice',
        'Vara\'s will: she is a baker, not a god - she does not want this but she feels Lathander\'s desperation',
        'The options: complete the ascension (new god, damaged city), halt it (Vara lives, Lathander dies), redirect it',
      ],
    },
    {
      title: 'Scene 3: The Choice',
      summary: 'Three hours are up. The ascension reaches critical mass. The party acts.',
      challenge: 'combat',
      keyEvents: [
        'The energy peak: divine power surges, the city shakes, the zone expands',
        'If completing: the party channels mortal will into Vara, stabilizing the transfer - combat against energy manifestations',
        'If halting: the party must absorb and ground the divine energy safely - a ritual under fire',
        'If redirecting: a willing vessel must step into the light - and they may not come back as themselves',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Vara', role: 'involuntary vessel', personality: 'A baker who was in the wrong place at the wrong time. Terrified, in pain, but able to communicate in brief windows. She does not want to be a god. She wants to go home.' },
    { name: 'Lathander (dying)', role: 'the transferring god', personality: 'The morning lord, dying of a cosmic plague. Desperate, guilty, and grateful for any vessel. He knows what he is doing to Vara and it horrifies him. "I am sorry. I was not ready to cease."' },
    { name: 'Guildmaster Thane', role: 'mortal authority', personality: 'Head of the Mage Guild. Speaks in clipped, measured sentences even while the sky splits open. "Acceptable casualties. Define that for me. Because I have a number and you will not like it." The party is the only thing between him and a kill order.' },
  ],
  keyLocations: [
    { name: 'The Ascension Zone', description: 'A three-mile radius of warped reality centered on Vara. Gravity fails, time loops, matter transforms. Beautiful and lethal.', significance: 'The obstacle course to reach Vara.' },
    { name: 'The Center', description: 'Where Vara floats in a column of divine light. The ground beneath her has become crystal. The air hums with power.', significance: 'Where the choice is made.' },
    { name: 'Highspire', description: 'A major city partially within the ascension zone. Thousands of residents affected by reality warps. Buildings floating, time stuttering.', significance: 'The civilian cost of the ascension.' },
  ],
  dataSystems: ['encounterWaves', 'combatNarration', 'socialEncounter', 'npcBackstoryGen'],
};
