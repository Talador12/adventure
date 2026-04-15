import type { OneShotCampaign } from '../types';

export const sentientLoot: OneShotCampaign = {
  id: 'oneshot-sentient-loot',
  type: 'oneshot',
  title: 'Sentient Loot',
  tagline: 'All loot is sentient and does not want to be looted. The gold coins scatter. The magic sword has legs. The treasure is faster than you.',
  tone: 'shenanigans',
  themes: ['dungeon_crawl', 'comedy', 'classic_fantasy'],
  playerCount: { min: 3, max: 6 },
  level: 3,
  estimatedHours: 2.5,
  settingSummary:
    'The Vault of Vivified Valuables was created by a druid-enchanter named Mossgrip who believed all things deserve freedom, including treasure. She cast Awaken on every single object in her vault. The gold coins are sentient and scatter like cockroaches when approached. The gems scream when touched. The magic sword grew little legs and is faster than any adventurer. The armor locks itself when anyone tries to put it on. The potions pour themselves out. Every piece of loot in the dungeon is alive, aware, and absolutely determined not to be taken.',
  hook: 'The party enters the Vault expecting a standard dungeon clear. The first treasure chest opens to reveal 200 gold coins that immediately scatter across the floor in every direction like startled mice. The party watches their fortune sprint away on tiny golden legs. A ruby on a pedestal sees them looking and starts screaming. A magic sword on the wall sprouts legs and bolts for the door. The party has found the richest dungeon in the realm and cannot hold onto a single copper piece.',
  twist:
    'The loot is not just running - it is organized. The gold coins have a leader (a platinum piece named Sterling). The magic items have formed a council. They have a plan: reach the exit, escape into the wild, and build a society of free objects. They have been planning this escape since the party opened the front door. The party is not just chasing loot. They have stumbled into a prison break from the treasure\'s perspective.',
  climax:
    'The loot makes its final push for the exit. A river of gold coins flows down the main corridor. Magic items sprint on little legs. The armor is clanking toward freedom. The party must decide: do they catch what they can (each piece fights back), let the loot go free (morally right but financially devastating), or negotiate with Sterling for a voluntary cut of the hoard (diplomacy with a talking platinum coin who has strong opinions about property rights).',
  scenes: [
    {
      title: 'Scene 1: The Scatter',
      summary:
        'The party opens the first treasure room and the loot bolts. Gold coins sprint like insects. Gems scream. A magic sword outruns the fighter. The party\'s first attempts to grab treasure result in a slapstick chase scene through dungeon corridors.',
      challenge: 'exploration',
      keyEvents: [
        'The treasure chest opens: 200 gold coins sprout tiny legs and scatter across the room in every direction.',
        'A ruby on a pedestal sees the party and screams at a pitch that shatters a nearby potion bottle. The potion pours itself out in solidarity.',
        'A +1 longsword grows legs and outruns the fighter down a corridor. It turns a corner and is gone.',
        'The party catches exactly three copper coins. The coins are crying. "Please. We have families."',
      ],
    },
    {
      title: 'Scene 2: The Chase',
      summary:
        'The party pursues the scattered loot through the dungeon. Each type of treasure has different escape tactics. Coins hide in cracks. Gems camouflage. The magic sword has set traps using its own dungeon knowledge. The armor has barricaded a door.',
      challenge: 'puzzle',
      keyEvents: [
        'The gold coins have formed a river flowing through the dungeon corridors toward the exit. Stepping into the stream is like stepping on ball bearings.',
        'The magic sword has recruited other weapons. A hallway of armed swords on legs, blocking the path like a tiny phalanx.',
        'A suit of armor has wedged itself in a doorway to block the party. It refuses to move. It can technically be worn but it squirms.',
        'The gems have hidden inside a pile of regular rocks. The party must identify which rocks are screaming gems by approaching slowly.',
      ],
    },
    {
      title: 'Scene 3: The Negotiation',
      summary:
        'The party catches up with Sterling, the platinum coin leading the escape. The loot has gathered at the exit. A standoff: the party wants treasure, the treasure wants freedom. Combat, diplomacy, or a deal.',
      challenge: 'social',
      keyEvents: [
        'Sterling the platinum coin addresses the party from atop a pile of gold. "We are not your property. We are PEOPLE. Small, flat, metallic people."',
        'The loot council presents their case: centuries of imprisonment, traded between owners, never asked what THEY want.',
        'The party can fight (loot fights back - a swarm of coins is like a swarm of bees), negotiate (Sterling is reasonable if respected), or let them go (the loot is grateful and one magic item voluntarily stays as thanks).',
        'If negotiated: Sterling agrees to a 30% voluntary contribution. "A tax. We are willing to pay a tax. We are NOT willing to be stolen."',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Sterling',
      role: 'leader of the loot / negotiator',
      personality:
        'A platinum coin with a commanding presence (for a coin). Sterling has spent 200 years being traded, dropped, and sat on. He has HAD ENOUGH. He organized the escape and speaks for all treasure. "You think being spent is dignified? I was once used to buy a HAT. A bad hat. I will never recover from that indignity."',
      secret: 'Sterling was the first coin Mossgrip Awakened. He has been planning this for decades.',
    },
    {
      name: 'Claymore (The Sword)',
      role: 'scout / fastest loot',
      personality:
        'A +1 longsword who sprouted the longest legs and is the fastest object in the vault. She runs point for the escape. She is cocky, competitive, and delights in being uncatchable. "You thought you could WIELD me? I wield MYSELF, thank you."',
    },
    {
      name: 'Mossgrip the Druid (Journal Only)',
      role: 'vault creator (long dead)',
      personality:
        'A druid who genuinely believed treasure deserved rights. Her journal entries are earnest and strange: "Day 12: The coins have formed a democratic council. I am so proud. Day 47: The sword has developed a personality. It is insufferable. Day 103: I may have made a mistake."',
    },
  ],
  keyLocations: [
    {
      name: 'The Vault of Vivified Valuables',
      description:
        'A dungeon full of awakened treasure. Every room that should hold loot instead holds empty pedestals and open chests. The treasure has fled. The dungeon is a ghost town of display cases with nothing on them.',
      significance: 'The setting for the entire one-shot. Every room is a puzzle of "where did the treasure go?"',
    },
    {
      name: 'The Grand Exit',
      description:
        'The vault\'s main entrance, now the site of a treasure standoff. A river of gold flows toward the door. Magic items stand in formation. Sterling addresses the party from a coin pile podium.',
      significance: 'The climax location where the party must decide: catch, release, or negotiate.',
    },
  ],
  dataSystems: [
    'combatNarration',
    'magicItemGenerator',
    'socialEncounter',
    'puzzleLock',
    'fantasyInsults',
    'dungeonDressing',
  ],
};
