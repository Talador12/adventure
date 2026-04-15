import type { OneShotCampaign } from '../types';

export const theDivineAudit: OneShotCampaign = {
  id: 'oneshot-divine-audit',
  type: 'oneshot',
  title: 'The Divine Audit',
  tagline: 'The gods are being audited by a higher power. You are the audit committee. Fire the underperformers.',
  tone: 'epic',
  themes: ['epic', 'comedy', 'planar'],
  playerCount: { min: 3, max: 6 },
  level: 10,
  estimatedHours: 3,
  settingSummary:
    'Every ten thousand years, a cosmic authority called the Arbiter reviews the performance of every deity. This cycle, the Arbiter has appointed mortals as the audit committee - because the gods keep grading themselves too favorably. The party must evaluate each god\'s stewardship of their domain, hear complaints from worshippers, and recommend which gods keep their portfolios and which get fired.',
  hook: 'Reality pauses. A being beyond comprehension speaks directly into the party\'s minds: "I am the Arbiter. Your gods have been underperforming. I have appointed you as the audit committee because you are mortal and therefore honest. Review each deity. Recommend retention, reassignment, or termination. Your recommendations will be implemented. Begin."',
  twist: 'One of the gods being audited - Tymora, goddess of luck - has been secretly compensating for the failures of other gods. When the god of harvest neglected the crops, she nudged luck to keep farmers alive. When the god of war abandoned a battlefield, she rigged dice rolls to help the losing side. Her own domain scores poorly because she has been spending her power propping up everyone else.',
  climax: 'The final review session. The party presents their recommendations. Each god reacts - some accept judgment, some rage, some plead. The Tymora revelation changes the calculus. Firing underperformers means the patchwork she has been maintaining collapses. The party must restructure the divine bureaucracy with this new information.',
  scenes: [
    {
      title: 'Scene 1: The Portfolios',
      summary: 'Reviewing each god\'s domain performance. Some are doing well. Some are coasting. Some have been absent for centuries.',
      challenge: 'social',
      keyEvents: [
        'The war god: has not responded to a prayer in 200 years, his clergy are improvising',
        'The harvest goddess: crops have been declining steadily, she blames mortals for pollution',
        'The death god: actually performing excellently, souls processed on time, no backlog',
        'The knowledge god: hoarding information instead of sharing it, his temples charge for prayers',
      ],
    },
    {
      title: 'Scene 2: Worshipper Testimony',
      summary: 'Hearing from the people who actually depend on these gods. The gap between divine intention and mortal reality.',
      challenge: 'social',
      keyEvents: [
        'A farmer: prayed to the harvest goddess for three years with no answer, nearly starved',
        'A soldier: called on the war god during a battle, got nothing, improvised and survived',
        'A cleric of death: "My god is the only one who does his job. Which is ironic."',
        'A follower of Tymora: "She is always tired. She gives us luck but it costs her more than it should."',
      ],
    },
    {
      title: 'Scene 3: The Recommendations',
      summary: 'Presenting the audit findings. Restructuring the divine hierarchy. Every god in the room.',
      challenge: 'social',
      keyEvents: [
        'The revelation: Tymora has been covering for other gods, burning her own power to keep things running',
        'The recalculation: her poor scores are because she was doing three gods\' jobs with one portfolio\'s power',
        'The recommendations: fire, retain, reassign, merge portfolios, or create new positions',
        'The Arbiter acts: whatever the party recommends happens - the divine order reshapes around their judgment',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Arbiter', role: 'cosmic authority', personality: 'A being beyond divine comprehension. Speaks in calm, bureaucratic tones. Views the gods the way a manager views department heads. "Your performance review is overdue by three millennia."' },
    { name: 'Tymora', role: 'undercover hero', personality: 'Goddess of luck. Exhausted, overextended, and too proud to ask for help. She has been quietly keeping the world running while her colleagues coast.', secret: 'She has been using her own divine essence to compensate. If she stops, she recovers. But the world suffers.' },
    { name: 'Kord', role: 'underperformer', personality: 'God of war. Has been on a "divine sabbatical" for two centuries. Not malicious - just bored. When confronted, he is embarrassed rather than defiant.' },
  ],
  keyLocations: [
    { name: 'The Audit Chamber', description: 'A plane between planes where the walls are made of starlight and the conference table seats the entire pantheon. Surprisingly corporate.', significance: 'Where the audit takes place.' },
    { name: 'The Mortal Gallery', description: 'A viewing area where worshippers can testify. Separated from the gods by a barrier of cosmic glass.', significance: 'Where the human cost of divine negligence is spoken.' },
    { name: 'Tymora\'s Domain', description: 'Once a lush plane of green fields and gold coins. Now grey and thin - she has spent too much of herself.', significance: 'Where the party sees the cost of Tymora\'s sacrifice.' },
  ],
  dataSystems: ['socialEncounter', 'diplomaticNegotiation', 'npcBackstoryGen'],
};
