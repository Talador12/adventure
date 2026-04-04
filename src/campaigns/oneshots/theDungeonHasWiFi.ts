import type { OneShotCampaign } from '../types';

export const theDungeonHasWiFi: OneShotCampaign = {
  id: 'oneshot-dungeon-wifi',
  type: 'oneshot',
  title: 'The Dungeon Has WiFi',
  tagline: 'A dungeon built by a wizard who saw the future. The future had memes.',
  tone: 'comedic',
  themes: ['comedy', 'dungeon_crawl', 'meta'],
  playerCount: { min: 3, max: 6 },
  level: 5,
  estimatedHours: 3,
  settingSummary:
    'A wizard who could see the future built a dungeon incorporating technology from timelines that haven\'t happened yet. The traps use concepts like "passwords," the monsters are confused about their role, and there\'s a room that\'s literally a loading screen. The treasure at the end is a crystal ball that shows "the most wondrous invention of the far future" — it shows a smartphone. Nobody understands it.',
  hook: 'A door in the dungeon has a glowing rectangle that says "Enter Password." Beneath it, someone has scratched: "password123." It works. Inside, the dungeon is lit by flat glowing panels, the traps require "accepting terms and conditions," and a skeleton is sitting in a chair in front of a flat rectangle showing "Session Timed Out."',
  twist:
    'The wizard who built this dungeon didn\'t just see the future — he stole concepts from it. The dungeon is powered by a time rift that\'s been leaking future-knowledge into the past. Every "modern" thing in the dungeon is a corrupted version of a real future concept. The rift is unstable and will eventually swallow the dungeon — and everything around it — into a temporal anomaly.',
  climax:
    'The party reaches the final room: the time rift itself, showing fractured glimpses of futures. The "treasure" — the crystal ball — is actually the rift\'s anchor. Taking it closes the rift (and the dungeon), leaving it collapses reality around the dungeon. The party must grab it and escape before the dungeon ceases to have ever existed.',
  scenes: [
    {
      title: 'Scene 1: Enter Password',
      summary:
        'The first rooms of the dungeon. Everything is slightly wrong in a familiar way. Traps that ask you to agree to terms. Monsters that are having an existential crisis.',
      challenge: 'exploration',
      keyEvents: [
        'The password door — and the EULA trap (you must agree to terms that include "may contain fire")',
        'A room that\'s buffering — reality loads in slowly, from low-res to high-res',
        'A mimic disguised as something the party has never seen (a vending machine)',
        'A goblin who has read the wizard\'s notes and is very confused about "the internet"',
      ],
    },
    {
      title: 'Scene 2: Please Wait',
      summary:
        'Deeper into the dungeon. The time-rift corruption gets stronger. Rooms reference things that shouldn\'t exist. A boss monster that fights in "turns" and complains about "balance patches."',
      challenge: 'combat',
      keyEvents: [
        'A loading screen room — the party literally waits while "Loading Dungeon Assets..."',
        'A monster that has read its own stat block and disputes the CR rating',
        'A trap that requires a "CAPTCHA" — select all squares containing dragons',
        'The time rift becomes visible — flickering images of impossible futures',
      ],
    },
    {
      title: 'Scene 3: The Rift',
      summary:
        'The final room. The time rift, the crystal ball anchor, and the dungeon starting to collapse as temporal paradox catches up.',
      challenge: 'exploration',
      keyEvents: [
        'The rift room — glimpses of futures, pasts, and things that never were',
        'The crystal ball shows "the greatest invention" — a flat rectangle everyone stares at',
        'Taking the ball triggers the collapse — reality unravels from the back',
        'Escape sequence: run through the dungeon as it ceases to have ever existed',
      ],
    },
  ],
  keyNPCs: [
    {
      name: 'Wizard Algorithmius',
      role: 'dungeon builder (deceased notes only)',
      personality:
        'Known only through his increasingly unhinged journal entries. "Day 47: I have seen the future. They have a device that shows them ALL KNOWLEDGE and they use it to look at pictures of cats."',
    },
    {
      name: 'Greg the Goblin',
      role: 'guide / confused ally',
      personality:
        'A goblin who found the wizard\'s notes and has been trying to understand concepts like "software updates" and "cloud storage." He\'s built a shrine to something called "The Algorithm."',
    },
    {
      name: 'The Tutorial Ghost',
      role: 'dungeon mechanic / comic relief',
      personality:
        'A ghost that appears in each room to explain the puzzle — whether the party wants it to or not. "Press X to interact. ...What\'s X? I don\'t know. The wizard wrote it."',
    },
  ],
  keyLocations: [
    {
      name: 'The Loading Room',
      description:
        'A room where reality loads in progressively — textures pop in, objects gain detail, and for a moment everything is flat and gray.',
      significance: 'The dungeon\'s weirdest room and a clue about the time rift.',
    },
    {
      name: 'The Server Room',
      description:
        'A massive chamber full of crystal pillars that hum and glow — the wizard\'s crude approximation of "computers." They\'re warm. They process... something.',
      significance: 'Where the dungeon\'s temporal corruption is most concentrated.',
    },
    {
      name: 'The Rift Chamber',
      description:
        'The final room. A tear in time showing fractured futures. In the center, a crystal ball sits on a pedestal. It\'s the anchor holding the rift open.',
      significance: 'The treasure, the danger, and the escape trigger.',
    },
  ],
  dataSystems: [
    'puzzleLock',
    'trapDisarm',
    'magicalAnomaly',
    'timeLoopDungeon',
    'combatNarration',
    'fantasyInsults',
  ],
};
