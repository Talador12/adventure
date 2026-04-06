import type { OneShotCampaign } from '../types';

export const theStormChasers: OneShotCampaign = {
  id: 'oneshot-storm-chasers',
  type: 'oneshot',
  title: 'The Storm Chasers',
  tagline: 'The storm is alive. It\'s heading for the city. You have 6 hours to talk it down.',
  tone: 'exploration',
  themes: ['exploration', 'wilderness'],
  playerCount: { min: 3, max: 5 },
  level: 7,
  estimatedHours: 4,
  settingSummary: 'A sentient storm — a massive hurricane with a consciousness — is heading for the coastal city of Tidewall. It\'s not a natural disaster; it\'s angry. Something in the city offended it. The party must ride INTO the storm, find its eye (which is literally an eye), and negotiate with an elemental intelligence that communicates through lightning, rain, and wind.',
  hook: 'The sky darkens at noon. A storm unlike any seen before — a hurricane with a face in the clouds. Lightning strikes spell words on the ground: "RETURN. WHAT. WAS. TAKEN." The city has 6 hours before landfall. The party must find what was taken and either return it or convince the storm to stand down.',
  twist: 'The city\'s duke stole a storm elemental\'s child — a small cloud spirit — and trapped it in a jar to power the city\'s weather-control machine. The machine keeps Tidewall\'s weather perfect for trade. The parent storm has been searching for its child for years and finally found it.',
  climax: 'Inside the storm\'s eye: the parent elemental, vast and furious. The party must present the cloud-child (freed from the jar) or negotiate an alternative. Returning the child stops the storm. But the duke has locked down the weather machine and won\'t give up his perfect weather without a fight.',
  scenes: [
    { title: 'Scene 1: The Warning', summary: 'The storm appears. The city panics. The party investigates the lightning message and begins the search.', challenge: 'exploration', keyEvents: ['The storm speaks in lightning: "RETURN WHAT WAS TAKEN"', 'Investigation: what could the city have "taken" from a storm?', 'The duke\'s weather machine: a tower that keeps Tidewall sunny year-round', 'Discovery: a small jar in the machine\'s core, containing a crying cloud spirit'] },
    { title: 'Scene 2: Into the Storm', summary: 'The party rides into the hurricane to reach the eye. Navigation through supernatural wind, rain, and lightning.', challenge: 'exploration', keyEvents: ['Entering the storm: the wind has opinions, the rain has emotions, lightning is punctuation', 'Navigation: the storm tests them — obstacles made of weather', 'Communication: the storm senses the child\'s presence — it calms slightly near them', 'The eye: calm, vast, and containing a consciousness the size of a county'] },
    { title: 'Scene 3: The Negotiation', summary: 'Face to face with the storm. Return the child, calm the parent, and deal with the duke who wants his weather machine back.', challenge: 'social', keyEvents: ['The storm-parent: communicating through pressure, temperature, and light', 'The child: freed from the jar, it flies to its parent — the storm immediately calms', 'The duke\'s response: he arrives with soldiers, demanding the child back', 'Resolution: the storm protects its child, the duke faces consequences, the weather becomes natural'] },
  ],
  keyNPCs: [
    { name: 'The Storm (Tempest)', role: 'the parent / not a villain', personality: 'A vast air elemental experiencing grief and rage at the same time. When the child is returned, the rage vanishes instantly. The relief is palpable — the air warms, the wind becomes a breeze.' },
    { name: 'Duke Aldric', role: 'the real villain', personality: 'The duke who imprisoned a cloud spirit to power his weather machine. Not evil in his mind — "Perfect weather means perfect trade means prosperity." Refuses to see the moral dimension.' },
    { name: 'Breeze (the cloud child)', role: 'the stolen child', personality: 'A small cloud spirit trapped in a jar. Doesn\'t speak — communicates through tiny breezes and miniature rain showers. Scared, lonely, and its crying powers the weather machine.' },
  ],
  keyLocations: [
    { name: 'Tidewall', description: 'A coastal trade city with suspiciously perfect weather. Always sunny. Always mild. Suspiciously so.', significance: 'Where the investigation begins.' },
    { name: 'The Storm', description: 'A sentient hurricane the size of a county. Inside: layers of wind, rain, and lightning with personality.', significance: 'The journey environment.' },
    { name: 'The Eye', description: 'The calm center of the storm. A vast, still space where the parent elemental\'s consciousness resides.', significance: 'Where the negotiation takes place.' },
  ],
  dataSystems: ['naturalDisaster', 'weatherProgression', 'socialEncounter', 'travelEncounters', 'diplomaticNegotiation', 'encounterWaves'],
};
