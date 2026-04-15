import type { FullCampaign } from '../types';

export const theColorless: FullCampaign = {
  id: 'full-the-colorless',
  type: 'full',
  title: 'The Colorless',
  tagline: 'Red vanished first. Fire stopped being hot. Then blue left. Water stopped flowing. What goes when green is gone?',
  tone: 'serious',
  themes: ['dark_fantasy', 'mystery', 'horror'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 3, end: 14 },
  estimatedSessions: 16,
  settingSummary:
    'Color is disappearing from the world. Not fading - vanishing. First red went. Roses turned gray. Blood turned black. And fire stopped being hot - it still burns in shape but produces no heat, because the concept of red WAS heat. Then blue left. The sky turned white. Water stopped flowing - it sits motionless in rivers because blue WAS movement. Each color is not just a visual property but a fundamental force. When yellow goes, light itself will dim. When green goes, nothing will grow. The world is being drained of its operating principles, one wavelength at a time.',
  hook:
    'The party sits at a campfire. Someone notices the flames are gray. Then they notice the flames are cold. Then they notice the entire western horizon has lost its red - sunset is gray and white. A messenger arrives: the Temple of the Chromatic Order reports that the essence of red has been stolen from reality. Not paint. Not dye. The concept of redness. And whoever took it is reaching for blue next.',
  twist:
    'The colors are being stolen by a blind artist named Maren Voss. She was born without sight and spent her life hearing about colors she could never experience. She found a way to pull color from reality into a canvas that she CAN perceive through touch - a painting that is more real than reality. She is creating the most beautiful artwork ever made and does not fully understand that she is killing the world to make it. The painting is genuinely the most beautiful thing that has ever existed. Destroying it would return the colors but annihilate the greatest work of art in history.',
  climax:
    'The party finds Maren and her painting. The painting is overwhelming - it contains every color stolen from reality, arranged with genius-level artistry. Destroying it restores the world. But Maren can feel the painting. For the first time in her life, she can experience beauty through touch in a way that equals sight. The choice: destroy the painting (kill the art, save the world), find a way to replicate its properties without stolen color (difficult, uncertain), or leave it (the world continues to drain). There is no clean answer.',
  acts: [
    {
      title: 'Act 1: Red and Blue',
      summary:
        'Red vanishes. Fire loses heat. Blood turns black. Sunsets die. The party investigates as the world adapts to cold fire and still water. Then blue goes. The sky blanches. Oceans freeze in place. The party tracks the theft to the Chromatic Underspaces - the metaphysical source of each color.',
      keyEvents: [
        'The campfire goes cold. Red is gone. Not fading - absent. The concept of warmth in flame ceases.',
        'Investigation: the Temple of the Chromatic Order confirms someone is extracting color essences from reality itself',
        'Blue disappears: water stops flowing. Rivers stand like glass. Rain hangs frozen in the air mid-fall.',
        'Entering the Chromatic Underspace of Red: a cavern that SHOULD be red but is now empty, scraped clean, with drag marks',
        'The trail: magical residue at the extraction sites is consistent with synesthetic magic - converting one sense into another',
      ],
      estimatedSessions: 5,
    },
    {
      title: 'Act 2: Yellow and the Artist',
      summary:
        'Yellow vanishes. Light dims. The sun still shines but nothing is bright. The world becomes twilight. The party follows the trail to a remote cottage where Maren Voss paints in the dark, pulling colors from reality into a tactile masterpiece. She is not malicious. She is enraptured.',
      keyEvents: [
        'Yellow disappears: light dims everywhere. The sun is a pale disk. Shadows have no edges. The world enters permanent twilight.',
        'Following the synesthetic trail to a cottage on a cliffside. Inside: darkness. And the most intense sensory experience in history.',
        'The painting: even without seeing it, the party FEELS the colors radiating from the canvas. It is warm where red was applied. It flows where blue sits.',
        'Meeting Maren: blind from birth, brilliant, kind, and completely unaware of the scale of damage she is causing. She thinks she is borrowing, not stealing.',
        'The moral weight: Maren touches the painting and weeps. "This is what you see every day? This is what color feels like? How do you ever close your eyes?"',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: Green and the Choice',
      summary:
        'Green begins to fade. Plants stop growing. Food stops ripening. Famine is weeks away. The party must make their choice: destroy the painting, find an alternative, or let the world die for art. Maren will not give it up willingly. She will not fight them either. She will just ask them to touch it first.',
      keyEvents: [
        'Green fading: leaves gray, crops stalling, the first reports of famine. The timeline compresses.',
        'Maren defense: "Touch it. Please. Before you destroy it, just touch it. Feel what I feel. Then decide."',
        'Touching the painting: the party member experiences all stolen colors simultaneously through touch. It is transcendent.',
        'The alternatives: a ritual to duplicate the painting properties without draining reality (requires all remaining color mages, uncertain outcome)',
        'The choice: destroy (certain, devastating to Maren), duplicate (uncertain, risky, but preserves both), or abandon the world (unthinkable but the painting IS that beautiful)',
      ],
      estimatedSessions: 5,
    },
  ],
  keyNPCs: [
    {
      name: 'Maren Voss',
      role: 'antagonist / tragic artist',
      personality:
        'A blind painter of extraordinary genius. Born without sight, she spent her life understanding color through description. When she found a way to extract color into a tactile medium, she finally experienced what everyone else takes for granted. She is gentle, brilliant, and will not stop willingly. Not because she is selfish but because she has tasted sight for the first time.',
      secret: 'She knows she is hurting the world. She chose to keep going. The guilt is destroying her but the beauty is worth it. She hates herself for that calculation.',
    },
    {
      name: 'Chromatic Prior Essek',
      role: 'quest giver / color priest',
      personality:
        'Head of the Temple of the Chromatic Order, a faith that worships color as the fundamental forces of reality. Watching his gods die. Speaks in increasingly gray metaphors as colors vanish. Desperate, devout, and furious.',
    },
    {
      name: 'Dr. Luma Vesk',
      role: 'synesthesia scholar / ally',
      personality:
        'A researcher who studies the connection between senses. She identified the extraction method as synesthetic magic and can theoretically reverse-engineer a duplication method. Cautious, methodical, and unwilling to promise anything she cannot deliver.',
    },
    {
      name: 'Fenn the Gray',
      role: 'survivor / cautionary tale',
      personality:
        'A painter who lost the ability to see red when it vanished. Then blue. Then yellow. Now she paints in gray and calls it "honest." She is not bitter. She is broken. "Color was a lie we all agreed on. Now the lie is over."',
    },
  ],
  keyLocations: [
    {
      name: 'The Chromatic Underspace',
      description: 'The metaphysical source of color. Each color has a cavern-like space where its essence is generated. The red space is scraped empty. The blue space is drained. They are beautiful and dying.',
      significance: 'Where the theft is confirmed and the extraction method is identified.',
    },
    {
      name: 'Maren Cottage',
      description: 'A small cottage on a remote cliff. Completely dark inside. In the center, a canvas that radiates warmth, movement, light, and growth through touch. The most beautiful object in existence.',
      significance: 'Where the artist works, the painting lives, and the final choice is made.',
    },
    {
      name: 'The Twilight City',
      description: 'The capital after yellow vanishes. Permanent dim light. Lanterns barely function. People navigate by memory and touch. A city learning to live without brightness.',
      significance: 'The emotional setting for Act 2 and 3. Where the stakes are most visible.',
    },
  ],
  dataSystems: ['environmentalHazard', 'emotionalBeat', 'plotTwistEngine', 'magicalEcosystem', 'npcGenerator'],
};
