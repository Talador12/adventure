import type { FullCampaign } from '../types';

export const theWardensOfAether: FullCampaign = {
  id: 'full-wardens-of-aether',
  type: 'full',
  title: 'The Wardens of Aether',
  tagline: 'The sky is falling. Literally. Someone has to hold it up.',
  tone: 'heroic',
  themes: ['epic', 'exploration', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  levelRange: { start: 5, end: 15 },
  estimatedSessions: 20,
  settingSummary:
    'The Aether is the invisible force that keeps the sky above and the ground below. For millennia, the Wardens maintained the Aether Pillars - massive crystalline towers at the corners of the continent. Now the Wardens are dead, the Pillars are cracking, and gravity is becoming optional in expanding dead zones.',
  hook: 'The party witnesses a village float into the sky, buildings and all. The last surviving Warden, an elderly woman named Keeper Alara, finds them and begs for help repairing the Pillars before the entire continent tears itself apart.',
  twist:
    'The Wardens were not just maintaining the Pillars - they were feeding them. Each Warden gave a year of their life per decade to keep the Aether stable. The party must decide if they are willing to become the new Wardens, knowing the cost.',
  climax:
    'The Central Pillar is failing. The party must reach it through a landscape where gravity shifts every few seconds, fight the entity that has been consuming the Aether, and either sacrifice their freedom to become Wardens or find a way to make the Pillars self-sustaining.',
  acts: [
    {
      title: 'Act 1: The Sky Falls',
      summary:
        'The party witnesses Aether disruptions and learns about the Wardens from Keeper Alara. They travel to the nearest Pillar and discover it has been deliberately sabotaged.',
      keyEvents: [
        'A village lifts off the ground - rescue survivors from floating debris',
        'Keeper Alara explains the Warden legacy and the Pillar network',
        'Journey to the North Pillar through zones of reversed and absent gravity',
        'Discovery that the sabotage was done from inside - a former Warden went rogue',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: The Broken Network',
      summary:
        'The party must repair three outer Pillars while the rogue Warden, Thane Vasik, works to destroy the rest. Each Pillar requires a different type of sacrifice or solution.',
      keyEvents: [
        'The East Pillar requires a magical artifact to replace the cracked core',
        'The South Pillar is overrun by creatures from the Elemental Plane of Air',
        'The West Pillar sank underground - the party must excavate it from a cave system',
        'Vasik confronts the party and reveals his motivation: the Wardens gave their lives and nobody thanked them',
      ],
      estimatedSessions: 8,
    },
    {
      title: 'Act 3: The Heart of the Aether',
      summary:
        'With the outer Pillars stabilized, the party reaches the Central Pillar at the continent\'s core. Vasik has unleashed an Aether Elemental that is consuming the Pillar from within.',
      keyEvents: [
        'Navigating the Aether Storm surrounding the Central Pillar',
        'Convincing Vasik that his anger is justified but his method will kill millions',
        'Defeating or redirecting the Aether Elemental',
        'The final choice: become Wardens, find a technological alternative, or let the old system die and build something new',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Keeper Alara',
      role: 'quest giver / mentor',
      personality:
        'A 90-year-old woman who has given 30 years of her lifespan to the Pillars. Frail but fierce. She will not guilt the party into becoming Wardens but she will not sugarcoat the consequences of refusal.',
      secret: 'She has 6 months to live. The Pillar took more than she disclosed. She is racing to train replacements before she dies.',
    },
    {
      name: 'Thane Vasik',
      role: 'antagonist',
      personality:
        'A former Warden who watched his entire family age and die while he stayed young from the Pillar\'s magic. He decided nobody should bear that burden. His solution is to destroy the system entirely.',
      secret: 'He does not actually want to destroy the world. He wants to force the nations to build a non-sacrificial alternative. The destruction is leverage, not nihilism.',
    },
    {
      name: 'Skyborn Rem',
      role: 'ally',
      personality:
        'A child born during an Aether disruption who can float at will. Cheerful, brave, does not understand that her abilities are a symptom of the crisis. The party adopts her by Act 2.',
      secret: 'She is not floating by choice. The Aether is leaking through her. If the Pillars fail completely, she disperses into raw energy.',
    },
    {
      name: 'The Aether Elemental',
      role: 'force of nature',
      personality:
        'Not evil. Not intelligent in the traditional sense. It is the Aether itself, given form by the disruption. It wants to be free. Containment hurts it.',
    },
  ],
  keyLocations: [
    {
      name: 'The Gravity Wastes',
      description:
        'A region where the Aether has failed completely. Boulders float. Rain falls upward. Walking requires ropes and anchors. Beautiful and lethal.',
      significance: 'The party must cross this to reach the Central Pillar. Navigation is a puzzle.',
    },
    {
      name: 'The Warden\'s Rest',
      description:
        'An underground sanctuary where generations of Wardens lived and died. Their journals line the walls. The final entries are all the same: "It was worth it."',
      significance: 'Where the party learns the full cost of being a Warden.',
    },
    {
      name: 'The Central Pillar',
      description:
        'A crystal spire a mile tall that hums with the sound of the world holding together. At its base, the Aether is visible as shimmering curtains of force.',
      significance: 'The final dungeon and the location of the campaign\'s climactic choice.',
    },
  ],
  dataSystems: ['elementalStorm', 'planarWeather', 'magicalAnomaly', 'expeditionSupply'],
};
