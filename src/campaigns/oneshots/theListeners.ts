import type { OneShotCampaign } from '../types';

export const theListeners: OneShotCampaign = {
  id: 'oneshot-listeners',
  type: 'oneshot',
  title: 'The Listeners',
  tagline: 'Every secret the party has ever told is written on the walls of a cave. Someone has been listening for years.',
  tone: 'horror',
  themes: ['horror', 'underdark'],
  playerCount: { min: 3, max: 5 },
  level: 5,
  estimatedHours: 2.5,
  settingSummary:
    'The party discovers a cave system beneath a crossroads they frequently travel. Inside the caves, the walls are covered in writing. Thousands of lines of text. When they read it, their blood goes cold: it is a transcript of their conversations. Private ones. Ones they had in supposedly secure locations. Every secret, every whisper, every confession. Someone has been writing it all down.',
  hook: 'The text is in Common, written in neat handwriting directly on the stone. A party member sees their own name. Then a conversation they had three months ago, word for word. Then something they said in private to only one other person. All of it on the wall.',
  twist: 'The listeners are not spies. They are a colony of psychic fungi that absorb surface thoughts and conversations through the root network beneath the crossroads. The fungi do not understand what they are recording. They simply absorb and transcribe, like a mushroom grows toward light. But someone has found the cave and has been reading the transcripts. That person has been using the secrets for blackmail.',
  climax: 'The party must deal with two threats: the fungi (which cannot be reasoned with, only destroyed or contained) and the blackmailer who has been exploiting the transcripts. Destroying the fungi erases the records. Leaving them means the listening continues.',
  scenes: [
    {
      title: 'Scene 1: The Walls',
      summary: 'Discovering the transcript cave. Reading their own private conversations on the walls. The invasion of privacy is total.',
      challenge: 'exploration',
      keyEvents: [
        'The cave entrance: hidden beneath the crossroads where the party has camped a dozen times. They have been sleeping directly above this',
        'The walls: handwriting covers every surface. Neat. Organized. Floor to ceiling. A party member holds up a torch and sees their own name',
        'A conversation from three months ago. Word for word. Something a party member whispered to only one other person while everyone else slept. On a wall. In a cave. In handwriting that is not anyone\'s',
        'The scope hits them: thousands of conversations. Hundreds of travelers. Years of secrets. All on the walls. All readable. All true',
      ],
    },
    {
      title: 'Scene 2: The Source',
      summary: 'Following the writing deeper into the cave and discovering the psychic fungi that have been absorbing surface thoughts.',
      challenge: 'exploration',
      keyEvents: [
        'The fungi: bioluminescent, spread across the cave ceiling, pulsing with absorbed thought',
        'New text appears in real-time as the party speaks, their words transcribed instantly',
        'The root network: extends beneath the entire crossroads, absorbing everything said above',
        'Evidence of a regular visitor: footprints, a reading chair, notes taken from the walls',
      ],
    },
    {
      title: 'Scene 3: The Reader',
      summary: 'Confronting the person who has been using the cave to gather secrets. They know everything about everyone who passes through.',
      challenge: 'combat',
      keyEvents: [
        'The blackmailer: a seemingly harmless merchant who has grown rich on stolen secrets',
        'They know the party\'s weaknesses because they read them on the walls',
        'Combat is complicated: the blackmailer uses knowledge of the party against them',
        'Destroying the fungi: fire works, but the smoke carries the last whispered secrets upward',
      ],
    },
  ],
  keyNPCs: [
    { name: 'Merchant Dalis', role: 'antagonist', personality: 'Smiles like someone who knows the punchline before you start the joke. Refers to people by things they told no one. "Ah, you must be the one who dreams about the fire. Your friend mentioned it in their sleep. March fourteenth. I have the transcript if you would like to see it." Not dangerous in a fight. Devastating in a conversation.' },
    { name: 'The Fungi', role: 'the mechanism', personality: 'Pulse softly when the party speaks, like a heartbeat responding to sound. New text appears on the wall in real-time as the party talks. A party member says "this is wrong" and watches the words write themselves on the stone in front of them. The fungi do not understand what they record. They are as innocent as a plant turning toward light. That makes it worse.' },
  ],
  keyLocations: [
    { name: 'The Crossroads', description: 'A well-traveled intersection where the party has camped many times, unknowingly speaking above a listening network.', significance: 'The surface location. Every word said here was recorded.' },
    { name: 'The Transcript Cave', description: 'Walls covered in thousands of conversations, written in neat handwriting by psychic fungi.', significance: 'The discovery that drives the horror. Seeing your own secrets on a wall.' },
    { name: 'The Reading Nook', description: 'A chair and table deep in the cave where someone has been sitting and taking notes for years.', significance: 'Evidence of the human threat: the fungi are natural, the exploitation is not.' },
  ],
  dataSystems: ['hauntedLocation', 'detectiveCase', 'combatNarration', 'environmentalHazard', 'monsterLore'],
};
