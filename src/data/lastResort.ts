// Last resort abilities — desperate moves when all hope is lost.
export interface LastResort { name: string; trigger: string; effect: string; cost: string; narrativeBeat: string; }
const RESORTS: LastResort[] = [
  { name: 'Final Stand', trigger: 'All allies are down. You\'re the last one standing.', effect: '+5 to all attacks and saves for 3 rounds. Immune to fear. Speed doubled.', cost: 'After 3 rounds: drop to 0 HP. No death saves. Just unconscious. The body gave everything.', narrativeBeat: 'Time slows. You hear your heartbeat. Every swing is perfect. You were never this good before. You\'ll never be this good again.' },
  { name: 'Break the Seal', trigger: 'A caster uses magic they promised never to use again.', effect: 'Cast one spell at maximum power (all dice maxed, DC +5, range doubled).', cost: 'The seal was there for a reason. 4d6 psychic damage and the magic leaves a mark others can see. The promise is broken forever.', narrativeBeat: 'The air changes. Everyone feels it. The caster\'s eyes glow. "I swore I\'d never do this again." They do it anyway.' },
  { name: 'One More Step', trigger: 'The party needs to reach something 30ft away but everyone is at 0 speed (exhaustion, grapple, etc).', effect: 'One character moves 30ft. Through anything. Walls, enemies, fire. Nothing stops them.', cost: '3 levels of exhaustion immediately after. They collapse at the destination.', narrativeBeat: 'Pure will. Not magic. Not strength. Just the refusal to stop. The body obeys because the spirit doesn\'t know how to quit.' },
  { name: 'Speak the Name', trigger: 'A warlock invokes their patron\'s true name — something they were told never to do.', effect: 'The patron manifests for 1 round. Full power. It does ONE thing the warlock asks. Anything.', cost: 'The patron remembers. The relationship changes permanently. The warlock owes a debt that has no price tag.', narrativeBeat: 'Reality cracks. Something vast turns its attention HERE. For one terrifying second, a god-like entity is in the room. It looks at the warlock. "You called."' },
  { name: 'The Blood Price', trigger: 'A healer has no spell slots, no potions, nothing — and an ally is dying.', effect: 'Transfer your own HP to a dying ally. 1:1 ratio. No limit except your own life.', cost: 'Every HP transferred is gone. If you hit 0, you die. No saves. You chose this.', narrativeBeat: '"I don\'t have any magic left. But I have this." They press their hands to the wound. Their veins glow. The ally breathes.' },
];
export function getRandomLastResort(): LastResort { return RESORTS[Math.floor(Math.random() * RESORTS.length)]; }
export function getLastResortCount(): number { return RESORTS.length; }
export function formatLastResort(r: LastResort): string {
  return `🔥 **${r.name}**\n  Trigger: ${r.trigger}\n  ⚙️ ${r.effect}\n  💸 Cost: ${r.cost}\n  🎭 *${r.narrativeBeat}*`;
}
export { RESORTS as LAST_RESORTS };
