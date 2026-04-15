import type { OneShotCampaign } from '../types';

export const theDogKnows: OneShotCampaign = {
  id: 'oneshot-dog-knows',
  type: 'oneshot',
  title: 'The Dog Knows',
  tagline: 'The tracking dog leads to the blacksmith. Three times. His alibi is iron. The dog is not tracking scent. It is tracking guilt.',
  tone: 'mystery',
  themes: ['mystery', 'intrigue'],
  playerCount: { min: 3, max: 5 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'A merchant is murdered. The town\'s tracking dog leads the guards to the blacksmith. He is innocent. The dog leads them back to the blacksmith every time. The party is called in when the guards realize something is wrong. The dog can smell guilt, not the killer\'s scent.',
  hook: 'The guard captain is exasperated: "The dog has led us to Brennan the smith three times. He has an iron alibi. But the dog will not stop. Either the dog is broken or we are missing something."',
  twist:
    'The dog smells guilt. Brennan IS guilty, but not of murder. He is guilty of the affair that caused the murder. His affair with the victim\'s wife drove the wife to hire an assassin. The dog smells the guilt that connects to the crime, not the physical act.',
  climax:
    'The party follows the chain of guilt: the dog leads to Brennan (the affair), Brennan leads to the wife (the motive), the wife leads to the assassin (the act). Each link is a guilty person, but only one swung the blade.',
  scenes: [
    {
      title: 'Scene 1: The Dog',
      summary: 'Watching the dog work. It is not tracking scent. It is tracking something else. The party must figure out what.',
      challenge: 'exploration',
      keyEvents: [
        'The dog, Copper, leads to the blacksmith again. Brennan is furious. Guards apologize.',
        'The party tests Copper. He does not follow scent trails. He follows... something else.',
        'Copper reacts to specific people with specific intensity. Stronger near guilt.',
        'Copper is a blink dog with enhanced empathic senses. He literally smells guilt.',
      ],
    },
    {
      title: 'Scene 2: The Chain',
      summary: 'Following guilt, not scent. Brennan is guilty of something. Finding out what opens the whole case.',
      challenge: 'social',
      keyEvents: [
        'Brennan cracks under questioning: he was having an affair with the victim\'s wife.',
        'The wife: Copper reacts even more strongly. She is guiltier than Brennan.',
        'The wife confesses: she hired someone. She will not say who.',
        'Copper leads to a third person. The actual assassin. The chain of guilt is complete.',
      ],
    },
    {
      title: 'Scene 3: The Assassin',
      summary: 'Finding and confronting the person who actually committed the murder. Copper confirms.',
      challenge: 'combat',
      keyEvents: [
        'The assassin is a traveling merchant. Still in town. Planning to leave at dawn.',
        'Copper goes wild near them. Maximum guilt. This is the one.',
        'The assassin runs. Chase through the town. Copper tracks unerringly.',
        'Captured. Three guilty people. Three different crimes. One murder.',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Copper',
      role: 'blink dog / guilt detector',
      personality: 'Sits perfectly still when near guilt. Does not bark, does not growl. Just stares with amber eyes that see something humans cannot. Thumps his tail when the party gets closer to the truth. The best detective in town, and he cannot file a report.',
    },
    {
      name: 'Brennan Forge',
      role: 'blacksmith / guilty of the affair',
      personality: 'Scared, angry, and convinced the dog is defective. His guilt about the affair makes him defensive, which makes him look even more suspicious.',
    },
    {
      name: 'Mira Vandross',
      role: 'the victim\'s wife / guilty of hiring the killer',
      personality: 'Composed, grieving publicly, and terrified privately. She wanted her husband dead. She got her wish. The guilt is eating her alive.',
    },
  ],
  keyLocations: [
    {
      name: 'The Town of Guildford',
      description: 'A market town where everyone knows everyone and a dog keeps accusing the wrong person of murder.',
      significance: 'The social landscape where guilt connects everyone.',
    },
  ],
  dataSystems: ['npcGenerator', 'puzzleLock'],
};
