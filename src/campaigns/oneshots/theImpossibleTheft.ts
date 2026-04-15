import type { OneShotCampaign } from '../types';

export const theImpossibleTheft: OneShotCampaign = {
  id: 'oneshot-impossible-theft',
  type: 'oneshot',
  title: 'The Impossible Theft',
  tagline: 'The vault was bricked shut fifty years ago. The scrying confirmed it was there yesterday. Today the wall is open. The crown is gone. It was stolen twenty years ago.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Crown of Ashenvale has been locked in a sealed vault beneath the city for fifty years. The vault has no door (it was bricked shut), no windows, no ventilation, and is warded against teleportation. Yesterday, a scrying spell confirmed the crown was there. Today, the wall was opened. The crown is gone.',
  hook: 'The vault master stares at the empty pedestal. "Fifty years. Sealed. Warded. Guarded. The crown was there yesterday. I SAW it through scrying. There is no way in. No way out. And it is gone."',
  twist:
    'Nobody stole it from inside the room. The scrying was compromised. An illusionist has been projecting a false image of the crown into the scrying focus for years. The real crown was stolen twenty years ago through a tunnel that was since collapsed and hidden. The theft is decades old. The discovery is new.',
  climax:
    'The party traces the illusionist (the vault master\'s predecessor, who retired suspiciously wealthy). The original tunnel is found. The crown is traced to a black market collector. Retrieve it from a fortified private collection.',
  scenes: [
    {
      title: 'Scene 1: The Vault',
      summary: 'Examining the sealed room. No entry, no exit, no magic signature. The impossible theft.',
      challenge: 'exploration',
      keyEvents: [
        'The vault: solid stone walls, bricked shut fifty years ago. No tampering visible.',
        'Anti-teleportation wards intact. Anti-ethereal wards intact. No tunnels.',
        'The pedestal is empty. No dust disturbance. No residue. Just gone.',
        'The scrying crystal shows the crown was there yesterday. The party re-scrys. Empty.',
      ],
    },
    {
      title: 'Scene 2: The Scrying',
      summary: 'The party questions the scrying itself. If the vault was never breached, the surveillance was compromised.',
      challenge: 'puzzle',
      keyEvents: [
        'Close examination of the scrying crystal: a faint illusion overlay, years old.',
        'Someone enchanted the crystal to always show the crown, regardless of reality.',
        'The enchantment was placed by the previous vault master, Olan Grey. Retired twenty years ago.',
        'Olan Grey lives in a suspiciously large house for a retired civil servant.',
      ],
    },
    {
      title: 'Scene 3: The Trail',
      summary: 'Following the twenty-year-old trail. The original theft, the tunnel, and the buyer.',
      challenge: 'combat',
      keyEvents: [
        'Olan Grey confesses when confronted. He sold the crown. He needed the money. His wife was dying.',
        'The buyer: a collector named Lady Esmerelle. Her estate is a fortress.',
        'The party infiltrates or negotiates. The crown is in a private gallery, displayed openly.',
        'Recovery: stealth, combat, or legal pressure. The crown returns to the vault.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Olan Grey',
      role: 'former vault master / original thief',
      personality: 'Old, guilt-ridden, and relieved to finally be caught. He has not slept well in twenty years. He stole to save his wife. She died anyway.',
    },
    {
      name: 'Lady Esmerelle',
      role: 'collector / fence',
      personality: 'Wealthy, cultured, and utterly unconcerned about the provenance of her acquisitions. She bought the crown. She owns the crown. Good luck taking it.',
    },
  ],
  keyLocations: [
    {
      name: 'The Crown Vault',
      description: 'A sealed underground chamber, bricked shut, warded, and empty. The impossible crime scene.',
      significance: 'Where the mystery begins. The theft did not happen here. That is the point.',
    },
    {
      name: 'The Esmerelle Gallery',
      description: 'A private collection of rare and stolen artifacts, guarded by constructs and wards.',
      significance: 'Where the crown actually is and where the climax occurs.',
    },
  ],
  dataSystems: ['puzzleLock', 'npcGenerator', 'trapCorridor', 'combatNarration'],
};
