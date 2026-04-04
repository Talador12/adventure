import type { OneShotCampaign } from '../types';

export const theCouncilOfVillains: OneShotCampaign = {
  id: 'oneshot-council-villains',
  type: 'oneshot',
  title: 'The Council of Villains',
  tagline: 'You\'re the bad guys. You have demands. The heroes won\'t negotiate.',
  tone: 'comedic',
  themes: ['comedy', 'intrigue'],
  playerCount: { min: 3, max: 6 },
  level: 10,
  estimatedHours: 4,
  settingSummary:
    'The players are villains. Not EVIL villains — just the losing side. A necromancer who raises the dead to do community service. A "dark lord" who conquered a kingdom to implement healthcare. A dragon who hoards books, not gold. They\'ve formed a council to petition the Hero\'s Guild to stop attacking them. The heroes refuse to listen. Diplomacy it is.',
  hook: 'The Council of Misunderstood Villainy convenes. Agenda item 1: "Getting heroes to stop kicking in our doors." Agenda item 2: "Filing a formal complaint about property damage." Agenda item 3: "That bard keeps writing songs about us. Legal options?"',
  twist: 'The Hero\'s Guild isn\'t attacking them because they\'re evil — they\'re attacking them because it\'s profitable. The Guild gets bounties per "villain" defeated. The party of villains discovers the Guild has been manufacturing threats to justify their budget. The real villain is bureaucracy.',
  climax: 'The villains crash the Hero\'s Guild annual gala with their evidence. The heroes are there. The press is there. The king is there. It\'s the most dramatic PowerPoint presentation in fantasy history. The villains must present their case, dodge assassination attempts, and convince the king that the Hero\'s Guild is the real threat — all while being obviously, undeniably "villainous" in appearance.',
  scenes: [
    {
      title: 'Scene 1: The Council Meeting',
      summary: 'Character introductions (as villains), the shared grievances, and the plan to address the Hero\'s Guild.',
      challenge: 'social',
      keyEvents: [
        'Each villain introduces their "crime" (all misunderstood or actually beneficial)',
        'Shared complaint: the heroes keep breaking their stuff',
        'The evidence: each villain has a piece showing the Guild manufactures threats',
        'The plan: crash the Guild gala and present the evidence to the king',
      ],
    },
    {
      title: 'Scene 2: Preparing the Case',
      summary: 'Gathering evidence, rehearsing arguments, and infiltrating the gala. The villains must look less villainous (impossible) and act diplomatic (harder).',
      challenge: 'exploration',
      keyEvents: [
        'Evidence gathering: Guild financial records, manufactured bounties, staged "threats"',
        'Makeover: the necromancer wears a tie, the dragon tries to smile (terrifying)',
        'Gala infiltration: getting past security when you\'re on every wanted poster',
        'A hero recognizes them: tense standoff resolved through the necromancer\'s impeccable manners',
      ],
    },
    {
      title: 'Scene 3: The Presentation',
      summary: 'The villains present their case to the king at the Hero\'s Guild gala. The heroes try to stop them. The evidence speaks for itself.',
      challenge: 'social',
      keyEvents: [
        'The entrance: the villains walk into the gala (gasps, screams, one person faints)',
        'The presentation: evidence laid out, witnesses called, the Guild\'s corruption exposed',
        'The Guild fights back: hero-assassins in the crowd, the party must defend while presenting',
        'The king\'s verdict — and the beginning of a very different relationship between heroes and villains',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Mortimer the Necromancer', role: 'villain / community organizer', personality: 'Raises the dead to fill potholes, deliver mail, and volunteer at soup kitchens. Horrified that people find this creepy. "The dead WANT to help! I ASKED them!"' },
    { name: 'Lord Blackthorn', role: 'villain / reformist', personality: 'Conquered a kingdom to implement universal healthcare. Calls himself "dark lord" because the title came with the castle. Actually very progressive.' },
    { name: 'Guild Master Valor', role: 'antagonist / corrupt hero', personality: 'The Hero\'s Guild leader who has been manufacturing villain threats to keep the bounties flowing. Charming, beloved by the public, and completely corrupt.' },
    { name: 'Scorch (book dragon)', role: 'villain / librarian', personality: 'A dragon who hoards books instead of gold. Burns down bookshops that mistreat their inventory. Has strong opinions about font choice.' },
  ],
  keyLocations: [
    { name: 'The Villain Council Chamber', description: 'A "dark lair" that\'s actually a well-organized conference room with catering and a whiteboard.', significance: 'Where the plan is formed.' },
    { name: 'The Hero\'s Guild Gala', description: 'A lavish annual celebration where heroes show off trophies (villain possessions) and the king grants new bounties.', significance: 'Where the climactic presentation takes place.' },
    { name: 'The Evidence Vault', description: 'The Guild\'s accounting office — full of manufactured threat reports, inflated bounties, and one very guilty bookkeeper.', significance: 'Where the corruption is proven.' },
  ],
  dataSystems: ['socialEncounter', 'nobleScandalGen', 'courtIntrigue', 'diplomaticNegotiation', 'heistPlanner', 'fantasyInsults'],
};
