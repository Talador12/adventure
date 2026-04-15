import type { FullCampaign } from '../types';

export const whenTheMusicStopped: FullCampaign = {
  id: 'full-when-the-music-stopped',
  type: 'full',
  title: 'When the Music Stopped',
  tagline: 'She held the darkness back with a song. She stopped singing on purpose.',
  tone: 'serious',
  themes: ['dark_fantasy', 'mystery', 'social'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 11 },
  estimatedSessions: 15,
  settingSummary:
    'For sixty years, the bard Isavel sang from a tower on the edge of the Bleaklands - a wound in the world where something old and hungry presses against reality. Her song was a ward, a wall of sound that kept the darkness from spreading. She was a hero. Statues in three cities. Songs about her songs. Then, two months ago, the music stopped. The darkness is creeping outward. Villages on the border are going silent. The realm assumes she died. She did not. She stopped. The party is sent to find out what happened to the greatest bard who ever lived and convince her to sing again.',
  hook:         'The Guild of Resonance, keepers of Isavel\'s legacy, briefs the party in a room full of her portraits. "The ward is failing. The Bleaklands have advanced four miles in two months. At this rate, Thornfield falls in six weeks. Greyhollow in three months. The capital in a year." They hand you a map marked with her tower. "Find her. If she is alive, bring her back. If she is dead, bring back her instrument. The Song must continue." Resonant Kael, if he trusts the party, adds quietly: "She was my teacher. Please be kind to her."',
  twist:
    'Isavel stopped singing because she finally heard what was on the other side. The darkness is not mindless evil - it is grief. The Bleaklands were created when an entire civilization was annihilated in an ancient war. Their collective dying scream tore a hole in reality. For sixty years, Isavel sang over that scream. Then one night, she actually listened. She heard mothers calling for children. She heard people begging for help. She could not bring herself to drown them out anymore. She did not choose despair - she chose to stop silencing the dead.',
  climax:
    'The party reaches Isavel in the Bleaklands. She is alive, living in the ruins, tending to the echoes of the dead. The darkness is not a threat she can wall off - it is a wound that needs healing. The real solution is not to restart the song but to change it. A new composition that does not silence the dead but answers them - an acknowledgment that transforms the scream into something that can finally rest. Isavel cannot do it alone. The party must venture into the heart of the Bleaklands, face the full weight of ancient grief, and help her compose the song that heals instead of walls.',
  acts: [
    {
      title: 'Act 1: The Silence',
      summary:
        'The party travels to Isavel\'s tower through increasingly dangerous territory. Villages evacuating, darkness spreading, monsters emerging from the Bleaklands. They find the tower empty and follow her trail into the dark.',
      keyEvents: [
        'Briefing by the Guild of Resonance - the urgency is real, people are dying',
        'Border village of Thornfield: refugees fleeing, shadow creatures probing the edges',
        'Isavel\'s tower: abandoned but not ransacked. Her instrument is gone. A journal remains.',
        'The journal: entries spanning years, growing guilt, the night she heard the voices',
        'Entering the Bleaklands: reality warps, sound distorts, grief manifests as environment',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: The Voices',
      summary:
        'Inside the Bleaklands, the party experiences what Isavel experienced. The darkness is not empty - it is full of people who died and were never mourned. The party must navigate a landscape made of loss while tracking Isavel deeper in.',
      keyEvents: [
        'First echo encounter: a ghost reenacting a mundane moment - cooking dinner, singing a lullaby',
        'The ruins of the ancient civilization emerge from the dark. A city frozen in its last moment.',
        'A shadow creature attacks - but it is not malicious, it is in pain. Killing it releases a memory.',
        'Isavel\'s trail leads to the city center. She has been cataloging the dead, learning their names.',
        'The party must choose: fight through the echoes or listen to them. Listening is harder.',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 3: The New Song',
      summary:
        'The party finds Isavel. She is not broken - she is heartbroken. The conversation that follows is the most important encounter in the campaign. Then comes the composition: a song that acknowledges instead of silences, that answers grief with witness. The party must protect Isavel as she sings the new song in the heart of the wound.',
      keyEvents: [
        'Finding Isavel: she is caring for the echoes, giving them the attention 1,000 years denied',
        'The argument: the Guild wants the wall rebuilt, Isavel says the wall is the problem',
        'Composing the new song: each party member contributes something - a memory, a name, a harmony',
        'The heart of the Bleaklands: the original wound, raw and screaming',
        'Isavel sings. The party holds the line against the grief that fights back before it can heal.',
        'The scream becomes a sigh. The darkness does not vanish - it settles. The dead rest.',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Isavel',
      role: 'the bard / the mission',
      personality:
        'Sixty years of isolation left marks. She talks to herself, finishes sentences hours later, and has forgotten most social conventions. Hums constantly - fragments of the old song mixed with something new. But her mind is sharp and her compassion is staggering. She is not depressed. She is awake to a suffering she can no longer ignore. "I sang over their screams for sixty years. I called it heroism. It was a gag." Arc: begins in solitary conviction, opens to collaboration when the party offers to help compose the new song.',
      secret: 'She can hear the dead clearly now. She knows their names. She has promised them she will not silence them again.',
    },
    {
      name: 'Resonant Kael',
      role: 'guild handler / pragmatist',
      personality:
        'The Guild\'s field operative. Travels with the party to the border. Competent, no-nonsense, terrified of the Bleaklands but hides it well. Sees the situation in practical terms: the ward must be restored or people die.',
      secret: 'He was Isavel\'s student forty years ago. She sent him away because she did not want him to hear what she was starting to hear.',
    },
    {
      name: 'Elder Hanna',
      role: 'Thornfield village elder',
      personality:
        'Seventy years old and not leaving her village. Her family built the first house here. She will sit on her porch while the darkness takes everything. She is not brave - she is done.',
    },
    {
      name: 'The First Voice',
      role: 'echo of the ancient dead',
      personality:
        'The oldest echo in the Bleaklands. A woman who was a teacher when the civilization fell. She does not understand what she is now. She just knows the lesson was not finished and the children did not come back.',
    },
  ],
  keyLocations: [
    {
      name: 'Isavel\'s Tower',
      description:
        'A slender spire on the cliff edge of the Bleaklands. Sixty years of life compressed into five rooms. Sheet music pinned to every wall. A chair worn smooth facing the window that overlooks the dark.',
      significance: 'Where the party finds the journal and understands why Isavel stopped.',
    },
    {
      name: 'The Bleaklands',
      description:
        'Not darkness exactly. More like the world forgot to render here. Shapes suggest buildings, roads, lives. Sound arrives late. Grief is a physical sensation, like walking through cold water.',
      significance: 'The entire second and third act. A landscape of unprocessed loss.',
    },
    {
      name: 'The Wound',
      description:
        'The epicenter. A plaza in the ruined city where the killing blow landed a thousand years ago. The air vibrates. Standing here is like listening to a scream that never ended. This is where the new song must be sung.',
      significance: 'The climactic location. Where grief is answered.',
    },
  ],
  dataSystems: [
    'hauntedLocation',
    'socialEncounter',
    'npcRelationshipWeb',
    'cataclysmCountdown',
    'ritualCasting',
    'partyMoraleTracker',
    'ancientProphecy',
    'naturalDisaster',
  ],
};
