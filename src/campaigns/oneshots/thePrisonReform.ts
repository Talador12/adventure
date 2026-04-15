import type { OneShotCampaign } from '../types';

export const thePrisonReform: OneShotCampaign = {
  id: 'oneshot-prison-reform',
  type: 'oneshot',
  title: 'The Prison Reform',
  tagline: 'The warden wants to fix the prison. The guards want to keep it broken. You are the inspection committee.',
  tone: 'political',
  themes: ['political', 'intrigue', 'urban'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'Warden Esha Varn of Thornwall Prison wants to reform the system - education programs, reduced sentences for good behavior, humane conditions. The Guards\' Guild opposes every change because harsher conditions justify larger budgets and more overtime. The party is the independent inspection committee with the authority to recommend policy changes to the Crown.',
  hook: 'Warden Varn meets the party at the prison gates: "I have been trying to fix this place for two years. The guards sabotage every program I start. The Crown sent you to inspect. What you write in your report determines whether this prison becomes a place of rehabilitation or stays a warehouse for human suffering. See everything. Talk to everyone."',
  twist: 'The Guards\' Guild leader, Captain Holt, is not just protecting budgets. He is running a forced labor ring inside the prison - inmates making goods that Holt sells on the black market. Reform means oversight. Oversight means discovery. His opposition to reform is criminal, not philosophical.',
  climax: 'The party presents findings to Warden Varn and Captain Holt simultaneously. The forced labor evidence comes out. Holt\'s guards surround the room. The party must navigate a standoff where the corrupt guards have weapons and the warden has authority but no muscle.',
  scenes: [
    {
      title: 'Scene 1: The Inspection',
      summary: 'Walking through the prison. Seeing conditions firsthand. The guards try to control what the party sees.',
      challenge: 'exploration',
      keyEvents: [
        'The guided tour: Captain Holt shows clean cells and fed prisoners - the show version',
        'Breaking away: finding overcrowded cells, untreated injuries, prisoners afraid to speak',
        'An inmate risks talking: whispers about a workshop in the basement nobody is supposed to see',
        'Guard intimidation: subtle threats to prisoners the party interviewed - "nice of them to speak with you"',
      ],
    },
    {
      title: 'Scene 2: The Basement',
      summary: 'Investigating the forced labor operation while avoiding guard detection.',
      challenge: 'exploration',
      keyEvents: [
        'The locked basement: guards say it is "storage" but the lock is new and the door is reinforced',
        'Inside: a workshop where inmates work twelve-hour shifts making furniture and textiles',
        'The ledger: sales records showing Holt has been selling prison labor output for years',
        'A guard sympathizer: one young guard who hates what he sees but is afraid of Holt',
      ],
    },
    {
      title: 'Scene 3: The Report',
      summary: 'Presenting findings. Holt\'s response. A confrontation inside a prison full of his loyalists.',
      challenge: 'social',
      keyEvents: [
        'The report: conditions, the forced labor ring, recommendations for reform',
        'Holt\'s play: he orders his guards to "detain" the party for "security concerns"',
        'Warden Varn invokes Crown authority - but does she have the muscle to back it up?',
        'The inmates: if the party earned their trust, they stand with the warden',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Warden Esha Varn', role: 'reformer', personality: 'A former battlefield medic who believes every person can be rehabilitated. Idealistic but not naive - she knows the system is rotten and has been documenting it.' },
    { name: 'Captain Holt', role: 'antagonist', personality: 'Guild leader who turned a prison into a personal business. Charismatic with his guards, brutal with inmates. Justifies everything as "maintaining order."', secret: 'He was once an inmate himself. His hatred of prisoners is self-hatred projected outward.' },
    { name: 'Inmate Kora', role: 'witness', personality: 'A young woman serving time for theft. Works in Holt\'s basement workshop. Too scared to speak unless the party can guarantee her safety.' },
  ],
  keyLocations: [
    { name: 'Thornwall Prison', description: 'A massive stone fortress repurposed as a prison. Cold, damp, and designed to crush hope. The warden\'s office has flowers in the window.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Basement Workshop', description: 'A hidden production floor where inmates work in chains making goods for Holt\'s black market.', significance: 'The evidence of Holt\'s crimes.' },
    { name: 'The Warden\'s Office', description: 'Warm, organized, with rehabilitation program proposals pinned to every wall. A sanctuary inside a cruel place.', significance: 'Where the final confrontation happens.' },
  ],
  dataSystems: ['socialEncounter', 'encounterWaves', 'combatNarration', 'npcBackstoryGen'],
};
