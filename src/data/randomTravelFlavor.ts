// Random travel flavor text — atmospheric one-liners for road scenes.
export const TRAVEL_FLAVOR: string[] = [
  'The road stretches ahead, empty and inviting.',
  'Clouds gather on the horizon. Rain by nightfall, if you\'re lucky.',
  'A hawk circles lazily overhead, riding thermals you can\'t feel.',
  'The silence is broken only by the crunch of boots on gravel.',
  'Wildflowers line the roadside — an unexpected beauty in a harsh world.',
  'The trees here are old. Older than the road. Older than the kingdom.',
  'A milestone reads: "Nowhere — 0 miles."',
  'The wind picks up, carrying the smell of smoke from somewhere ahead.',
  'An old stone wall follows the road. Whoever built it is long forgotten.',
  'The road forks. Neither path looks more traveled than the other.',
  'Something howls in the distance. It might be a wolf. Might not be.',
  'The sun hangs low and golden. These are the last comfortable hours of light.',
  'You pass a roadside shrine. Fresh flowers suggest someone still visits.',
  'The landscape changes gradually — green gives way to brown, then to grey.',
];
export function getRandomTravelFlavor(): string { return TRAVEL_FLAVOR[Math.floor(Math.random() * TRAVEL_FLAVOR.length)]; }
export function formatTravelFlavor(): string { return `🛤️ *${getRandomTravelFlavor()}*`; }
