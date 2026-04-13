import type { FullCampaign } from '../types';

export const theSanctumOfSorrows: FullCampaign = {
  id: 'full-sanctum-of-sorrows',
  type: 'full',
  title: 'The Sanctum of Sorrows',
  tagline: 'A monastery where grief is currency and pain is power.',
  tone: 'horror',
  themes: ['dungeon_crawl', 'dark_fantasy', 'mystery'],
  playerCount: { min: 2, max: 4 },
  levelRange: { start: 3, end: 10 },
  estimatedSessions: 12,
  settingSummary:
    'The Sanctum was founded by monks who discovered that intense emotion could be harvested as magical energy. They built elaborate methods to induce, collect, and weaponize human suffering. Officially, they help people process grief. In reality, they are farming it. The party is hired to find a missing person who was last seen entering the Sanctum seeking help for their depression.',
  hook: 'A wealthy patron hires the party to find their sibling who entered the Sanctum three months ago and never left. The Sanctum\'s abbot claims the person completed their "treatment" and departed, but no one has seen them since.',
  twist:
    'The Sanctum has developed a method to extract and store emotional trauma, creating "grief engines" that power magical devices. The missing people are not dead—they are kept in perpetual induced despair, powering the Sanctum\'s economy.',
  climax:
    'The party discovers the deepest chambers where hundreds of people are kept in emotional stasis, including the missing sibling. They must destroy the grief engines without killing the victims, while facing the Abbot who has transcended normal morality.',
  acts: [
    {
      title: 'Act 1: The Peaceful Facade',
      summary:
        'The party investigates the Sanctum\'s public face—beautiful gardens, serene monks, genuine-seeming therapy. But small inconsistencies lead them to investigate deeper levels.',
      keyEvents: [
        'Arrival at the Sanctum—impressed by the peaceful atmosphere',
        'Interviewing the Abbot, who seems genuinely compassionate',
        'Discovery of hidden passages behind meditation chambers',
        'First glimpse of the lower levels—people in induced emotional states',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 2: The Harvest',
      summary:
        'The party explores the Sanctum\'s underbelly, discovering the true nature of the "treatment." They find allies among monks who have doubts and victims who have partially recovered.',
      keyEvents: [
        'Navigating the Processing Levels where emotions are extracted',
        'Meeting Brother Calm, a monk who suspects something is wrong',
        'Finding the missing person—alive but emotionally devastated',
        'Learning the Sanctum sells emotional energy to mages and artificers',
      ],
      estimatedSessions: 4,
    },
    {
      title: 'Act 3: The Breaking',
      summary:
        'The party must free the victims and destroy the grief engines while the Abbot tries to stop them, genuinely believing the ends justify the means.',
      keyEvents: [
        'Planning the rescue—how to free hundreds without killing them',
        'Confrontation with the Abbot in the Central Engine chamber',
        'The Abbot\'s justification: "We heal the wealthy and use their payments to help the poor. The suffering of few powers the healing of many."',
        'Destroying the engines and escaping with the victims',
      ],
      estimatedSessions: 4,
    },
  ],
  keyNPCs: [
    {
      name: 'Abbot Serenity',
      role: 'villain',
      personality:
        'Genuinely believes he has found a moral way to help the world—by efficiently harvesting suffering to fund healing. Cannot comprehend why the party sees this as wrong.',
    },
    {
      name: 'Brother Calm',
      role: 'ally',
      personality:
        'Young monk who joined to help people but is disturbed by what he sees. Provides inside information and access.',
    },
    {
      name: 'Elena',
      role: 'victim / survivor',
      personality:
        'The missing person the party was hired to find. Partially recovered, angry, determined to help free the others.',
    },
    {
      name: 'The Grief Merchant',
      role: 'criminal contact',
      personality:
        'Black market buyer of emotional energy who knows the Sanctum\'s secrets. Willing to help shut it down to eliminate competition.',
      secret: 'She is a former monk who helped design the harvesting process. Her guilt drove her to leave, but she kept the techniques and now profits from them independently.',
    },
  ],
  keyLocations: [
    {
      name: 'The Upper Sanctum',
      description:
        'Beautiful gardens, meditation halls, and therapy chambers where the public face of healing occurs.',
      significance: 'Entry point and false sense of security.',
    },
    {
      name: 'The Processing Levels',
      description:
        'Industrial-scale emotion extraction facilities where victims are kept in perpetual induced states.',
      significance: 'The horrifying truth of the operation.',
    },
    {
      name: 'The Central Engine',
      description:
        'The heart of the Sanctum—massive machinery powered by concentrated human suffering.',
      significance: 'Final location and what must be destroyed.',
    },
  ],
  dataSystems: ['hauntedLocation', 'magicalAnomaly', 'dungeonRoomDressing', 'evolvingTrap'],
};
