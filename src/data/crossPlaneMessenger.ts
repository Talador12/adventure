// Cross-plane messenger service — FedEx but for the multiverse.

export type DeliverySpeed = 'standard' | 'express' | 'priority' | 'instant';
export type PackageType = 'letter' | 'small_parcel' | 'large_parcel' | 'living_creature' | 'magical_item';

export interface MessengerService {
  name: string;
  operatingPlanes: string[];
  deliverySpeed: DeliverySpeed;
  cost: string;
  reliability: number; // 1-10
  packageTypes: PackageType[];
  specialRestrictions: string[];
  trackingAvailable: boolean;
  insuranceAvailable: boolean;
  flavor: string;
}

const SERVICES: MessengerService[] = [
  { name: 'The Ethereal Post', operatingPlanes: ['Material', 'Ethereal', 'Feywild', 'Shadowfell'], deliverySpeed: 'standard', cost: '10gp per letter, 50gp per parcel', reliability: 7, packageTypes: ['letter', 'small_parcel'], specialRestrictions: ['No iron (disrupts ethereal travel)', 'No holy water'], trackingAvailable: true, insuranceAvailable: false, flavor: 'Ghost carriers phase through walls. Deliveries arrive at midnight. Letters feel cold to the touch.' },
  { name: 'Modron Express', operatingPlanes: ['Material', 'Mechanus', 'Celestial', 'Astral'], deliverySpeed: 'express', cost: '50gp flat rate, any package', reliability: 10, packageTypes: ['letter', 'small_parcel', 'large_parcel', 'magical_item'], specialRestrictions: ['Package must be perfectly cubic or rectangular', 'Delivery time calculated to the second — do NOT be late to receive'], trackingAvailable: true, insuranceAvailable: true, flavor: 'A modron marches through a portal precisely on schedule. It will wait exactly 30 seconds. Not 31.' },
  { name: 'Imp Couriers Inc.', operatingPlanes: ['Material', 'Nine Hells', 'Abyss', 'Shadowfell'], deliverySpeed: 'priority', cost: '100gp or a minor favor', reliability: 5, packageTypes: ['letter', 'small_parcel', 'living_creature'], specialRestrictions: ['Imps read all letters', 'Living creatures may arrive... changed', 'No holy items (imps refuse)'], trackingAvailable: false, insuranceAvailable: false, flavor: 'A giggling imp appears, grabs your package, and vanishes. It\'ll probably get there. Probably.' },
  { name: 'The Dream Network', operatingPlanes: ['Material', 'Astral', 'Feywild', 'Ethereal'], deliverySpeed: 'instant', cost: '25gp + a memory as collateral', reliability: 6, packageTypes: ['letter'], specialRestrictions: ['Letters only (no physical items)', 'Recipient must be sleeping', 'Message appears in a dream — may be garbled by the subconscious'], trackingAvailable: false, insuranceAvailable: false, flavor: 'Write your message. Burn the letter. The recipient dreams the words. Usually accurately.' },
  { name: 'Dryad Root Mail', operatingPlanes: ['Material', 'Feywild'], deliverySpeed: 'standard', cost: '5gp (must plant a seed as payment)', reliability: 8, packageTypes: ['letter', 'small_parcel'], specialRestrictions: ['Delivery only between forests', 'No metal in packages (roots reject it)', 'Delivery time depends on season (faster in spring)'], trackingAvailable: true, insuranceAvailable: false, flavor: 'Bury the package at the roots of an old tree. It emerges from roots at the destination. Smells of earth.' },
  { name: 'Planar Teleport Ltd.', operatingPlanes: ['All known planes'], deliverySpeed: 'instant', cost: '500gp per delivery', reliability: 9, packageTypes: ['letter', 'small_parcel', 'large_parcel', 'living_creature', 'magical_item'], specialRestrictions: ['Requires both sender and receiver to have a sending stone or arcane mark', 'Packages over 100lbs cost double', 'Living creatures must consent'], trackingAvailable: true, insuranceAvailable: true, flavor: 'A portal opens. Your package floats through. The portal closes. Professional. Expensive. Reliable.' },
];

export function getRandomService(): MessengerService {
  return SERVICES[Math.floor(Math.random() * SERVICES.length)];
}

export function getServicesBySpeed(speed: DeliverySpeed): MessengerService[] {
  return SERVICES.filter((s) => s.deliverySpeed === speed);
}

export function getServicesForPlane(plane: string): MessengerService[] {
  return SERVICES.filter((s) => s.operatingPlanes.some((p) => p.toLowerCase().includes(plane.toLowerCase())));
}

export function getServicesForPackage(type: PackageType): MessengerService[] {
  return SERVICES.filter((s) => s.packageTypes.includes(type));
}

export function getMostReliable(): MessengerService {
  return SERVICES.reduce((best, s) => (s.reliability > best.reliability ? s : best));
}

export function getAllSpeeds(): DeliverySpeed[] {
  return ['standard', 'express', 'priority', 'instant'];
}

export function formatService(service: MessengerService): string {
  const speed = { standard: '📦', express: '🚀', priority: '⚡', instant: '✨' }[service.deliverySpeed];
  const rel = service.reliability >= 8 ? '🟢' : service.reliability >= 5 ? '🟡' : '🔴';
  const lines = [`${speed} ${rel} **${service.name}** *(${service.deliverySpeed}, reliability ${service.reliability}/10)*`];
  lines.push(`  *${service.flavor}*`);
  lines.push(`  Planes: ${service.operatingPlanes.join(', ')}`);
  lines.push(`  Cost: ${service.cost} | Packages: ${service.packageTypes.join(', ')}`);
  lines.push(`  Tracking: ${service.trackingAvailable ? 'Yes' : 'No'} | Insurance: ${service.insuranceAvailable ? 'Yes' : 'No'}`);
  if (service.specialRestrictions.length > 0) lines.push(`  ⚠️ ${service.specialRestrictions.join('. ')}`);
  return lines.join('\n');
}

export { SERVICES as MESSENGER_SERVICES };
