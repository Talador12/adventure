import type { FullCampaign } from '../types';

export const theSongsteelSaga: FullCampaign = {
  id: 'full-songsteel-saga',
  type: 'full',
  title: 'The Songsteel Saga',
  tagline: 'Metal that sings can also scream.',
  tone: 'epic',
  themes: ['war', 'classic_fantasy', 'dungeon_crawl'],
  playerCount: { min: 3, max: 5 },
  levelRange: { start: 6, end: 16 },
  estimatedSessions: 18,
  settingSummary:
    'Songsteel is a rare metal that resonates with magic, amplifying spells and storing musical enchantments. The only known vein is in the contested borderlands between three nations. When the vein begins singing a prophecy of apocalypse, every army in the world converges to claim or silence it.',
  hook: 'The party is hired to escort a Songsteel shipment to the neutral city of Accordance. En route, the metal begins singing in a language no one recognizes—and every spellcaster in a hundred miles hears it in their dreams.',
  twist:
    'The Songsteel is not a mineral—it is the fossilized remains of an ancient bard-god who sacrificed themselves to prevent a previous apocalypse. The "vein" is actually their corpse, and the song is a warning that the same threat is returning.',
  climax:
    'The party must descend into the deepest mine to face the awakening threat, wield weapons forged of Songsteel that sing with the god\'s power, and decide whether to complete the sacrifice (sealing the mine forever) or find another way.',
  acts: [
    {
      title: 'Act 1: The Singing Metal',
      summary:
        'The party escorts Songsteel through contested territory while dealing with its strange effects. They encounter rival claimants, assassins, and the first signs that the song is more than random noise.',
      keyEvents: [
        'The shipment begins singing—spells cast nearby are amplified unpredictably',
        'First assassination attempt by agents of the Iron Theocracy',
        'Meeting a Songsteel-forged sword that speaks and remembers its previous wielders',
        'Decoding the song reveals the word "RETURN" in an ancient tongue',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 2: Three Armies',
      summary:
        'War breaks out as nations send forces to claim the Songsteel mines. The party navigates the conflict, discovers the truth about the metal\'s origin, and must convince at least one faction to listen before it is too late.',
      keyEvents: [
        'The siege of Concordance—three armies meet at the mine\'s entrance',
        'Discovering ancient murals depicting a god sacrificing themselves',
        'The Songsteel sword reveals it was wielded by the god in their final battle',
        'The ground begins shaking—the thing the god sealed is waking up',
      ],
      estimatedSessions: 6,
    },
    {
      title: 'Act 3: The God\'s Grave',
      summary:
        'The party descends into the deepest mine where the god\'s body forms the walls. They face the awakening entity, use Songsteel weapons that channel the god\'s power, and make the final choice.',
      keyEvents: [
        'The Deeps—tunnels carved through fossilized divinity',
        'The Awakened—a being from before the gods, stirred by the mining',
        'The Songsteel weapons achieve full harmony, becoming legendary artifacts',
        'Final choice: seal the Awakened again (sacrificing the mine) or destroy it permanently (risking collapse)',
      ],
      estimatedSessions: 6,
    },
  ],
  keyNPCs: [
    {
      name: 'Maestro Ferrin',
      role: 'quest giver / ally',
      personality:
        'Blind Songsteel artisan who hears the metal\'s song more clearly than others. Eccentric, passionate, treats the metal as alive.',
      secret: 'He is the latest in a secret lineage tasked with guarding the truth about Songsteel\'s origin.',
    },
    {
      name: 'General Thorn Ironheart',
      role: 'antagonist',
      personality:
        'Commander of the Iron Theocracy\'s forces. Believes Songsteel is a weapon to be controlled, not a mystery to be understood.',
    },
    {
      name: 'Chord',
      role: 'speaking weapon',
      personality:
        'A Songsteel longsword that remembers being wielded by the god. Formal, melancholic, gradually remembers more as the campaign progresses.',
      secret: 'The god placed part of their consciousness in the sword as a failsafe—Chord can complete the sacrifice if the party cannot.',
    },
    {
      name: 'The Awakened',
      role: 'villain',
      personality:
        'A being from before creation, imprisoned by the bard-god. Not evil—just alien, hungry, and incomprehensible. Speaks in mathematical harmonies.',
    },
  ],
  keyLocations: [
    {
      name: 'The Songsteel Mines',
      description:
        'Tunnels where walls shimmer with resonant metal. Every sound echoes strangely. Magic is amplified but unpredictable.',
      significance: 'The campaign\'s central location and the source of the conflict.',
    },
    {
      name: 'Concordance',
      description:
        'A neutral city built around Songsteel trade. Now under siege by three armies.',
      significance: 'The party\'s base of operations during the middle act.',
    },
    {
      name: 'The God\'s Heart',
      description:
        'The deepest mine level, a cathedral-like cavern where the bard-god\'s heart still beats, powering the seal on the Awakened.',
      significance: 'Final dungeon and location of the climactic battle.',
    },
  ],
  dataSystems: ['legendaryWeapon', 'massCombat', 'ancientRuinLayout', 'magicalAnomaly'],
};
