// Ancient prophecy generator — cryptic multi-part prophecies with fulfillment triggers.

export type ProphecyTone = 'hopeful' | 'ominous' | 'ambiguous' | 'triumphant' | 'tragic';

export interface ProphecyVerse {
  text: string;
  interpretation: string; // what it actually means (DM knowledge)
  fulfillmentTrigger: string;
  fulfilled: boolean;
}

export interface AncientProphecy {
  title: string;
  tone: ProphecyTone;
  source: string;
  verses: ProphecyVerse[];
  finalOutcome: string;
  subversion: string; // how the prophecy can be twisted or broken
}

const PROPHECIES: AncientProphecy[] = [
  { title: 'The Prophecy of Five Fires', tone: 'ominous', source: 'Carved into the foundation stone of the oldest temple in the world.', verses: [
    { text: 'When the first fire dies, the sleeper stirs.', interpretation: 'The sacred flame of Solara\'s temple is extinguished — something ancient awakens.', fulfillmentTrigger: 'A temple\'s sacred flame goes out (naturally or by sabotage).', fulfilled: false },
    { text: 'When the second fire rises, the sky shall weep.', interpretation: 'A great conflagration (wildfire, dragon attack, or war) causes devastating rainfall.', fulfillmentTrigger: 'A major fire event followed by unnatural rain.', fulfilled: false },
    { text: 'When the third fire speaks, the dead shall listen.', interpretation: 'A powerful fire spell cast in a graveyard animates the dead.', fulfillmentTrigger: 'Casting Fireball or similar in a cemetery.', fulfilled: false },
    { text: 'When the fourth fire consumes, the throne shall crack.', interpretation: 'A fire in the capital destroys the seat of power.', fulfillmentTrigger: 'The palace or ruling seat is damaged by fire.', fulfilled: false },
    { text: 'When the fifth fire is kindled in the heart of the willing, all shall be reborn.', interpretation: 'A willing sacrifice of self-immolation resets the cycle and saves the world.', fulfillmentTrigger: 'A hero voluntarily sacrifices themselves by fire.', fulfilled: false },
  ], finalOutcome: 'The world is either consumed by fire or reborn in it — depending on whether the fifth fire is lit willingly.', subversion: 'The prophecy assumes the fires happen in order. Trigger the fifth fire first to skip the destruction.' },
  { title: 'The Last Crown', tone: 'ambiguous', source: 'Whispered by a dying oracle who then turned to dust.', verses: [
    { text: 'The crown passes to the one who does not want it.', interpretation: 'The next rightful ruler is someone who has no ambition for power.', fulfillmentTrigger: 'A reluctant hero is offered the crown.', fulfilled: false },
    { text: 'The throne sits upon a lie, and the lie has a name.', interpretation: 'The current dynasty is founded on a secret — a name that, if spoken, would delegitimize them.', fulfillmentTrigger: 'The founding lie is discovered.', fulfilled: false },
    { text: 'When the nameless one speaks, the crown unmakes itself.', interpretation: 'The bastard heir (whose name was erased from records) speaks their true name.', fulfillmentTrigger: 'The hidden heir reveals themselves.', fulfilled: false },
  ], finalOutcome: 'The monarchy either transforms into something new or collapses entirely.', subversion: 'What if the "one who does not want it" is convinced they DO want it? Does the prophecy break, or does it adapt?' },
  { title: 'The Starfall Accord', tone: 'hopeful', source: 'Written in a language that didn\'t exist until the stars aligned last century.', verses: [
    { text: 'When the fallen star touches the earth, a door opens that was never meant to close.', interpretation: 'A meteor impact creates a portal to a sealed plane.', fulfillmentTrigger: 'A meteor or celestial object impacts the material plane.', fulfilled: false },
    { text: 'Through the door walks one of each: the brave, the wise, the kind, the cunning, and the broken.', interpretation: 'A party of five with those specific traits must enter the portal.', fulfillmentTrigger: 'Five qualifying individuals enter together.', fulfilled: false },
    { text: 'What they find beyond was always theirs. What they bring back changes everything.', interpretation: 'A lost artifact or power awaits — one that belongs to mortal-kind but was hidden by the gods.', fulfillmentTrigger: 'The artifact is claimed and returned.', fulfilled: false },
  ], finalOutcome: 'Mortals gain access to something the gods hid from them — potentially the power of creation itself.', subversion: 'The "broken" member of the group is the key. If they heal before entering, the prophecy fails.' },
  { title: 'The Hollow King\'s Return', tone: 'tragic', source: 'Painted on the inside of a king\'s sarcophagus, in the king\'s own handwriting.', verses: [
    { text: 'I shall return when my blood calls from a throne of bones.', interpretation: 'A descendant of the king sits on a throne in a necropolis.', fulfillmentTrigger: 'A living descendant enters the king\'s tomb.', fulfilled: false },
    { text: 'I shall reclaim what death could not take: my crown, my sword, my vengeance.', interpretation: 'The king returns as a powerful undead to punish those who overthrew him.', fulfillmentTrigger: 'The descendant disturbs the sarcophagus.', fulfilled: false },
    { text: 'Only the blood that called me can silence me.', interpretation: 'Only the descendant can destroy the returned king — by choice or sacrifice.', fulfillmentTrigger: 'The descendant confronts the king.', fulfilled: false },
  ], finalOutcome: 'The kingdom faces its past. The descendant must choose: destroy the ancestor, or join them.', subversion: 'If the bloodline is truly ended before the prophecy triggers, the king never returns. But ending a bloodline is itself a dark act.' },
];

export function getRandomProphecy(): AncientProphecy {
  return PROPHECIES[Math.floor(Math.random() * PROPHECIES.length)];
}

export function getPropheciesByTone(tone: ProphecyTone): AncientProphecy[] {
  return PROPHECIES.filter((p) => p.tone === tone);
}

export function getVerseCount(prophecy: AncientProphecy): number {
  return prophecy.verses.length;
}

export function getUnfulfilledVerses(prophecy: AncientProphecy): ProphecyVerse[] {
  return prophecy.verses.filter((v) => !v.fulfilled);
}

export function getAllTones(): ProphecyTone[] {
  return [...new Set(PROPHECIES.map((p) => p.tone))];
}

export function formatProphecy(prophecy: AncientProphecy, showInterpretation: boolean = false): string {
  const icon = { hopeful: '✨', ominous: '🌑', ambiguous: '❔', triumphant: '🏆', tragic: '💔' }[prophecy.tone];
  const lines = [`${icon} **${prophecy.title}** *(${prophecy.tone})*`];
  lines.push(`  Source: *${prophecy.source}*`);
  prophecy.verses.forEach((v, i) => {
    lines.push(`  ${v.fulfilled ? '☑' : '☐'} *"${v.text}"*`);
    if (showInterpretation) lines.push(`    → ${v.interpretation}`);
  });
  if (showInterpretation) lines.push(`  🔄 Subversion: ${prophecy.subversion}`);
  return lines.join('\n');
}

export { PROPHECIES as ANCIENT_PROPHECIES };
