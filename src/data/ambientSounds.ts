// Environmental sound cues — ambient sound descriptions tied to terrain and weather.
// Text-based atmospheric descriptions the DM can read aloud or display.

import type { TerrainType } from '../lib/mapUtils';

export interface AmbientSoundscape {
  id: string;
  environment: string;
  sounds: string[];
  mood: 'calm' | 'tense' | 'eerie' | 'chaotic' | 'peaceful';
}

export const SOUNDSCAPES: AmbientSoundscape[] = [
  { id: 'dungeon', environment: 'Dungeon', mood: 'tense', sounds: ['Dripping water echoes off stone', 'Distant scraping of claws on rock', 'The hiss of a dying torch', 'A chain rattles somewhere in the dark', 'Your footsteps echo unnervingly loudly'] },
  { id: 'forest-day', environment: 'Forest (Day)', mood: 'peaceful', sounds: ['Birdsong filters through the canopy', 'Wind rustles through the leaves', 'A stream babbles nearby', 'Insects hum in the undergrowth', 'A woodpecker drums a distant tree'] },
  { id: 'forest-night', environment: 'Forest (Night)', mood: 'eerie', sounds: ['An owl hoots in the darkness', 'Twigs snap under unseen feet', 'Wolves howl in the far distance', 'The creak of branches in the wind', 'Fireflies pulse with ghostly light'] },
  { id: 'cave', environment: 'Cave', mood: 'tense', sounds: ['Water drips from stalactites', 'Your breathing echoes in the dark', 'Something skitters across the ceiling', 'The ground crunches underfoot', 'A low rumble from deep below'] },
  { id: 'tavern', environment: 'Tavern', mood: 'calm', sounds: ['Laughter and clinking tankards', 'A bard strums a lute by the fire', 'The crackle of logs in the hearth', 'Dice clatter on a wooden table', 'The innkeeper hollers an order to the kitchen'] },
  { id: 'city-day', environment: 'City Streets', mood: 'chaotic', sounds: ['Merchants hawk their wares', 'Cart wheels clatter on cobblestones', 'Children run past laughing', 'A town crier announces the news', 'The smell of baking bread drifts from a shop'] },
  { id: 'battlefield', environment: 'Battlefield', mood: 'chaotic', sounds: ['Steel clashes against steel', 'War cries and screams fill the air', 'Arrows whistle overhead', 'Hooves thunder across the ground', 'The acrid smell of smoke stings your eyes'] },
  { id: 'ocean', environment: 'Open Ocean', mood: 'calm', sounds: ['Waves lap against the hull', 'Seagulls cry in the distance', 'Rigging creaks in the wind', 'The sail snaps taut', 'Salt spray mists your face'] },
  { id: 'desert', environment: 'Desert', mood: 'eerie', sounds: ['Wind whispers across the dunes', 'Sand hisses against your boots', 'The sun beats down relentlessly', 'A distant vulture circles lazily', 'Heat shimmers blur the horizon'] },
  { id: 'mountain', environment: 'Mountain Pass', mood: 'tense', sounds: ['Wind howls through the pass', 'Loose stones clatter down the slope', 'An eagle screams high above', 'Your breath steams in the cold air', 'Distant thunder rumbles across the peaks'] },
  { id: 'swamp', environment: 'Swamp', mood: 'eerie', sounds: ['Frogs croak in eerie unison', 'Bubbles rise from the murky water', 'Mosquitoes whine around your ears', 'Something large moves under the surface', 'The stench of rot fills your nostrils'] },
  { id: 'ruins', environment: 'Ancient Ruins', mood: 'eerie', sounds: ['Wind moans through empty doorways', 'A stone falls from a crumbling wall', 'Faded inscriptions seem to whisper', 'Moss-covered statues watch with blank eyes', 'The silence here feels heavy and old'] },
];

export function getSoundscape(environment: string): AmbientSoundscape | undefined {
  return SOUNDSCAPES.find((s) => s.id === environment || s.environment.toLowerCase().includes(environment.toLowerCase()));
}

export function getRandomSounds(soundscape: AmbientSoundscape, count: number = 3): string[] {
  const shuffled = [...soundscape.sounds].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function formatAmbientDescription(environment: string): string {
  const soundscape = getSoundscape(environment);
  if (!soundscape) return `🔇 No ambient sounds defined for "${environment}".`;
  const sounds = getRandomSounds(soundscape, 3);
  const moodEmoji = soundscape.mood === 'calm' ? '🕯️' : soundscape.mood === 'tense' ? '⚡' : soundscape.mood === 'eerie' ? '👻' : soundscape.mood === 'chaotic' ? '🔥' : '🌿';
  const lines = [`${moodEmoji} **${soundscape.environment}** (${soundscape.mood}):`];
  for (const s of sounds) lines.push(`  • *${s}*`);
  return lines.join('\n');
}
