import type { OneShotCampaign } from '../types';

export const thePrisonBreak: OneShotCampaign = {
  id: 'oneshot-prison-break',
  type: 'oneshot',
  title: 'The Prison Break',
  tagline: 'Get someone out of the most secure prison in the kingdom. From the inside. You got arrested on purpose.',
  tone: 'heist',
  themes: ['heist', 'dungeon_crawl', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'The Ironkeep is inescapable. No one has ever broken out. The party needs to extract a political prisoner from the deepest cell. The plan: get arrested, navigate the prison from inside, reach the target, and escape through a route no one has tried because everyone who enters Ironkeep enters through the front gate. Nobody thinks about the sewer.',
  hook: 'The handler\'s instructions are clear: "Pick a fight near the east gate at noon. Get arrested. You will be processed into the Ironkeep by 3. Target is in Deep Cell 9. You have until midnight - that is when the sewer tide drops low enough to escape through the drainage tunnel. Miss the window and you are stuck for real."',
  twist: 'The political prisoner, Warden Thess, does not want to leave. She was imprisoned for exposing corruption in the military and has been writing a book from her cell - a complete record of every crime the generals committed. She will only leave if the party can smuggle her manuscript out with them. The manuscript is three hundred pages hidden in her cell walls.',
  climax: 'Midnight approaches. The party has Thess and her manuscript. The sewer tunnel is flooded but draining. The prison alarm sounds - they have been discovered. The party must navigate the sewers in the dark, carrying a woman who has not walked in three years and a manuscript worth more than gold, while guards follow from above.',
  scenes: [
    {
      title: 'Scene 1: Getting In',
      summary: 'Getting arrested and processed into Ironkeep. Establishing prison identities and mapping the route to Deep Cell 9.',
      challenge: 'social',
      keyEvents: [
        'The arrest: staged convincingly enough to fool the guards but not so violent it lands them in solitary',
        'Processing: stripped of weapons, searched, assigned cells in the general population',
        'The prison: three levels, each deeper and more restricted, with guards at every transition',
        'Intel gathering: other prisoners know the layout, the schedules, and the risks',
      ],
    },
    {
      title: 'Scene 2: Going Deep',
      summary: 'Moving through the prison levels to reach Deep Cell 9. Avoiding guards, recruiting allies, and staying under the radar.',
      challenge: 'exploration',
      keyEvents: [
        'Level 1: general population, relatively easy to move but heavily watched',
        'Level 2: restricted, requires a work detail assignment or a guard\'s key',
        'Level 3: the Deep Cells, solitary confinement, one guard station, and Thess',
        'Meeting Thess: she refuses to leave without her manuscript - pages hidden in the cell walls',
      ],
    },
    {
      title: 'Scene 3: The Sewer',
      summary: 'Midnight. The tide drops. The alarms sound. The party runs through darkness and water.',
      challenge: 'combat',
      keyEvents: [
        'The sewer entrance: a drain in the Deep Cell maintenance corridor, barely wide enough',
        'The flood: waist-deep water, dropping fast, carrying debris and worse',
        'The pursuit: guards in the tunnels behind them, torchlight bouncing off wet stone',
        'The exit: a grate at the river mouth, rusted but holdable - freedom on the other side',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Warden Thess', role: 'extraction target', personality: 'A former military warden who exposed corruption and was imprisoned for it. Three years in solitary made her sharper, not broken. She values her manuscript more than her freedom.' },
    { name: 'Guard Captain Mora', role: 'obstacle', personality: 'The Ironkeep\'s head of security. Professional, thorough, and suspicious of every new inmate. She runs a clean prison and takes escapes personally.' },
    { name: 'Inmate Skiv', role: 'prison contact', personality: 'A long-term inmate who knows every corner of Ironkeep. Helps the party for a price - he wants a letter delivered to his daughter on the outside.' },
  ],
  keyLocations: [
    { name: 'The Ironkeep', description: 'A fortress prison built into a cliff face. Three levels descending into the rock. No windows below Level 1. The only authorized exit is the front gate.', significance: 'The entire heist takes place here.' },
    { name: 'Deep Cell 9', description: 'A solitary confinement cell at the deepest point of the prison. Stone walls with pages of a manuscript hidden in the cracks.', significance: 'Where Thess is held and her life\'s work is hidden.' },
    { name: 'The Sewer Tunnels', description: 'Drainage tunnels beneath the prison that flood with the tide and drain at midnight. Dark, dangerous, and the only way out.', significance: 'The escape route.' },
  ],
  dataSystems: ['heistPlanner', 'trapDisarm', 'encounterWaves', 'chaseSequence'],
};
