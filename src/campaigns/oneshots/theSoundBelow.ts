import type { OneShotCampaign } from '../types';

export const theSoundBelow: OneShotCampaign = {
  id: 'oneshot-sound-below',
  type: 'oneshot',
  title: 'The Sound Below',
  tagline: 'Something is playing music deep beneath the earth. It is beautiful. That is what worries people.',
  tone: 'exploration',
  themes: ['exploration', 'underdark'],
  playerCount: { min: 3, max: 5 },
  level: 4,
  estimatedHours: 2.5,
  settingSummary:
    'For the past week, residents near the old mine have heard music rising from the earth. Not rumbling, not wind through tunnels. Music. A melody played on strings, clear and haunting, audible only at night. The mine has been sealed for 20 years. The party reopens it and follows the sound down.',
  hook: 'The party presses their ears to the sealed mine entrance at midnight. The melody is unmistakable: a stringed instrument, played with extraordinary skill, echoing up from hundreds of feet below. The music is sad. Profoundly, achingly sad. And it is getting louder each night.',
  twist: 'The musician is a myconid elder who discovered an abandoned lute in the mine decades ago. Myconids communicate through spores, not sound, but this one became fascinated with the instrument. It taught itself to play over 20 years. The sadness in the music is real: it was exiled from its colony for making sound. It plays because it is the only language it has that feels like enough.',
  climax: 'The party finds the myconid and must bridge the gap between a creature that communicates through spores and the surface world that heard its music. They can reunite it with its colony, bring it to the surface, or simply sit and listen.',
  scenes: [
    {
      title: 'Scene 1: The Sealed Mine',
      summary: 'Breaking the seal on the old mine and descending toward the music. The mine is abandoned but the tunnels are stable.',
      challenge: 'exploration',
      keyEvents: [
        'Breaking the seal: the timbers are old but the mine beyond is dry and stable',
        'The music grows clearer with each level descended',
        'Signs of habitation: fungal growth that is deliberately cultivated, not wild',
        'A junction where the party must choose a path based on where the music is loudest',
      ],
    },
    {
      title: 'Scene 2: The Fungal Garden',
      summary: 'The lower mine levels have been transformed into a living garden of bioluminescent fungi. Someone has been tending this for years.',
      challenge: 'exploration',
      keyEvents: [
        'The garden: tunnels filled with cultivated mushrooms that glow in shifting colors',
        'The colors respond to the music, pulsing in time with the melody',
        'Spore communication: the party begins receiving emotional impressions from the fungi',
        'A chamber filled with failed instruments: bones, sticks, stretched leather, all abandoned attempts',
      ],
    },
    {
      title: 'Scene 3: The Musician',
      summary: 'Finding the myconid in a cathedral-sized cavern, playing a battered lute with fungal tendrils, surrounded by its luminous garden.',
      challenge: 'social',
      keyEvents: [
        'The myconid: 8 feet tall, ancient, cradling a lute with adapted fungal fingers',
        'It stops playing when it sees the party. First visitors in 20 years',
        'Communication through spores: emotions and images, not words. Loneliness, joy, fear',
        'The party decides: help it rejoin its colony, invite it to the surface, or something else entirely',
      ],
    },
  ],
  keyNPCs: [
    { name: 'The Musician', role: 'the mystery / heart', personality: 'A myconid elder who taught itself music over two decades of isolation. It cannot speak but plays with a depth of emotion that transcends language. It is afraid of being alone and afraid of being found.' },
    { name: 'Mine Warden Goss', role: 'quest giver', personality: 'The official responsible for the sealed mine. Nervous about reopening it, but the music is disturbing the townspeople. "Mines do not play music. This is a problem."' },
    { name: 'Lirel', role: 'ally', personality: 'A half-elf bard in town who heard the music and wept. She insists on accompanying the party. "Whoever is playing that has more soul than anyone I have ever heard."' },
  ],
  keyLocations: [
    { name: 'The Old Mine', description: 'A sealed mine entrance, 20 years closed, with music rising from its depths every night.', significance: 'The entry point and the source of the mystery.' },
    { name: 'The Fungal Garden', description: 'Lower tunnels transformed into a bioluminescent garden that pulses in time with music.', significance: 'Reveals the nature of the inhabitant before the party meets them.' },
    { name: 'The Concert Hall', description: 'A natural cavern where the myconid plays, its acoustics perfect by accident or design.', significance: 'Where the party meets the musician and makes their choice.' },
  ],
  dataSystems: ['underdarkNavigation', 'npcDialogue', 'socialEncounter', 'explorationChallenge', 'monsterLore'],
};
