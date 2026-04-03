// Random flavor item — items with no mechanical value, pure story hooks.
export const FLAVOR_ITEMS: string[] = [
  'A wooden toy soldier, hand-carved and painted. One arm is missing.',
  'A sealed letter addressed to someone in a city you haven\'t visited yet.',
  'A coin from a kingdom that no longer exists.',
  'A faded painting of a family — none of them are smiling.',
  'A glass eye that\'s the wrong color for the owner.',
  'A piece of petrified wood shaped exactly like a key.',
  'A children\'s storybook in a language no one speaks anymore.',
  'A compass that always points to the same mountain.',
  'A locket containing a tiny portrait that changes expression.',
  'A bell that rings once when danger is near — but only sometimes.',
  'A map of a building that doesn\'t exist. Yet.',
  'A stone that\'s always warm, no matter the temperature.',
  'A playing card (the Joker) that keeps appearing in your pocket even after you throw it away.',
  'A feather from a bird that went extinct a century ago.',
  'An hourglass where the sand flows upward.',
];
export function getRandomFlavorItem(): string { return FLAVOR_ITEMS[Math.floor(Math.random() * FLAVOR_ITEMS.length)]; }
export function formatFlavorItem(): string { return `🎁 **Found Item:** *${getRandomFlavorItem()}*\n*No mechanical value — but there\'s a story here.*`; }
