import type { OneShotCampaign } from '../types';

export const theWizardsMistake: OneShotCampaign = {
  id: 'oneshot-wizards-mistake',
  type: 'oneshot',
  title: 'The Wizard\'s Mistake',
  tagline: 'He turned the town into animals. He forgot the counter-spell. His cat is now the mayor.',
  tone: 'comedic',
  themes: ['comedy', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 3,
  settingSummary: 'Wizard Bumblewick sneezed during a spell and turned an entire town into animals — but not their animals. The blacksmith is a chicken. The mayor is a cat. The town drunk is, ironically, a horse (he can hold his drink better now). The party must find the counter-spell components while navigating a town of confused animal-people who are trying to go about their day.',
  hook: 'The party approaches a normal-looking town. The gate guard is a badger in a helmet. "Halt! State your — MRRRPH — business! Sorry. New mouth. Bumblewick sneezed. We need HELP."',
  twist: 'The counter-spell requires the "willing consent of the most powerful person in town." The mayor (now a cat) refuses — she LIKES being a cat. It\'s the most relaxed she\'s been in 20 years. The party must convince a very comfortable cat to give up being a cat.',
  climax: 'All components gathered, willing consent needed. The mayor-cat is on a sunny windowsill and will NOT be moved. The party must make the most persuasive argument in history for why being human is better than being a cat. The entire town (as animals) watches. The horse-drunk is heckling.',
  scenes: [
    { title: 'Scene 1: What Happened?', summary: 'Arriving at the animal-town, meeting Bumblewick (he turned himself into a ferret), and getting the component list.', challenge: 'social', keyEvents: ['The town: chickens in aprons, a cat in a mayoral sash, a horse at the bar', 'Bumblewick the ferret: "I sneezed! ONE sneeze! This is completely unfair!"', 'The component list: moonflower pollen, a willing heart-scale, and the consent of power', 'The biggest problem: the mayor-cat is NOT consenting'] },
    { title: 'Scene 2: The Scavenger Hunt', summary: 'Gathering components around the animal-town. Each component involves a challenge made absurd by everyone being the wrong animal.', challenge: 'exploration', keyEvents: ['Moonflower pollen: in the garden, guarded by the gardener (now a goat, eating the garden)', 'Heart-scale: from the blacksmith-chicken, who can\'t work the forge with wings', 'Consent of power: the mayor-cat must agree — she is on a windowsill, purring, unimpressed', 'Side quest: the town drunk-horse accidentally entered a race and is winning'] },
    { title: 'Scene 3: The Argument', summary: 'All components ready. The mayor-cat needs convincing. The party makes their case for humanity.', challenge: 'social', keyEvents: ['The setup: the spell circle is drawn, components placed, one consent needed', 'The pitch: "Mayor, we need you to be human again." "No. I am warm and comfortable."', 'The arguments: duty, responsibility, cheese (cats can\'t eat cheese well)', 'Resolution: the mayor consents (grudgingly), the spell reverses, everyone is human (and disoriented)'] },
  ],
  keyNPCs: [
    { name: 'Wizard Bumblewick', role: 'the cause / ferret', personality: 'A well-meaning wizard who is always ALMOST competent. Currently a ferret. "I have allergies! This is a MEDICAL condition that happened to affect the ENTIRE TOWN!"' },
    { name: 'Mayor Prudence', role: 'the key / cat', personality: 'The mayor, now a cat, who has discovered that being a cat is objectively better than being mayor. "No meetings. No complaints. Just sun and naps. Why would I go BACK?"' },
    { name: 'Hank the Horse', role: 'town drunk / horse', personality: 'The town drunk who has been accidentally entered into a horse race by someone who thought he was an actual horse. He is winning. "THIS IS THE BEST DAY OF MY LIFE AND I\'M NOT EVEN TRYING."' },
  ],
  keyLocations: [
    { name: 'Bumbleshire', description: 'A normal village where every person is now the wrong animal. The infrastructure still works. Somehow.', significance: 'The entire one-shot takes place here.' },
    { name: 'The Mayor\'s Windowsill', description: 'A sunny windowsill in the town hall where Mayor Prudence (cat) has set up permanent residence. A saucer of milk is nearby.', significance: 'Where the climactic negotiation happens.' },
    { name: 'Bumblewick\'s Tower', description: 'A wizard\'s tower with sneeze-powder residue everywhere. The spell book is open to the wrong page.', significance: 'Where the counter-spell is found.' },
  ],
  dataSystems: ['wildMagicSurge', 'socialEncounter', 'puzzleLock', 'combatNarration', 'fantasyInsults'],
};
