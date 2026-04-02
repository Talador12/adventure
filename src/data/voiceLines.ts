// Character voice lines — class-themed catchphrases for combat events.
// Triggered on crits, kills, heals, death saves, and level-ups.

type EventType = 'crit' | 'kill' | 'heal' | 'death_save_success' | 'death_save_fail' | 'level_up' | 'miss';

const CLASS_VOICE_LINES: Record<string, Record<EventType, string[]>> = {
  Fighter: {
    crit: ['"For honor and steel!"', '"That one\'s going to leave a mark!"', '"Right between the plates!"'],
    kill: ['"Another one down."', '"Stay down."', '"That was satisfying."'],
    heal: ['"Patch me up, I\'m not done yet."', '"Just a scratch. Keep fighting."'],
    death_save_success: ['"Not... today..."', '"I\'ve survived worse."'],
    death_save_fail: ['"Tell them... I held the line..."'],
    level_up: ['"I feel stronger. Bring on the next challenge."'],
    miss: ['"Blast! I\'ll get the next one."', '"They\'re quicker than they look."'],
  },
  Wizard: {
    crit: ['"The arcane flows through me!"', '"Behold the power of knowledge!"'],
    kill: ['"As predicted by my calculations."', '"Magic always wins."'],
    heal: ['"A minor transmutation of my vitality."'],
    death_save_success: ['"The wards... still hold..."'],
    death_save_fail: ['"My research... incomplete..."'],
    level_up: ['"New spells to master. Excellent."'],
    miss: ['"The weave resists... temporarily."'],
  },
  Rogue: {
    crit: ['"Right in the kidneys!"', '"You never saw me coming."', '"Sneak attack!"'],
    kill: ['"Nothing personal."', '"Silent and deadly."'],
    heal: ['"Thanks. Now let me get back to the shadows."'],
    death_save_success: ['"You can\'t kill what you can\'t catch."'],
    death_save_fail: ['"The shadows... welcome me..."'],
    level_up: ['"More tricks up my sleeve."'],
    miss: ['"They flinched. Next time."'],
  },
  Cleric: {
    crit: ['"Divine judgment!"', '"My deity guides my hand!"'],
    kill: ['"Go in peace... or pieces."', '"The light prevails."'],
    heal: ['"By the grace of my god, be healed!"', '"Hold still, this will sting."'],
    death_save_success: ['"Not yet... my work isn\'t done..."'],
    death_save_fail: ['"Into the light... I go..."'],
    level_up: ['"My faith grows stronger."'],
    miss: ['"Even the faithful miss sometimes."'],
  },
  default: {
    crit: ['"Critical hit!"', '"Take that!"'],
    kill: ['"One less to worry about."'],
    heal: ['"Thanks for the healing."'],
    death_save_success: ['"Still breathing..."'],
    death_save_fail: ['"It\'s getting dark..."'],
    level_up: ['"I feel more powerful!"'],
    miss: ['"So close!"'],
  },
};

export function getVoiceLine(charClass: string, event: EventType): string {
  const lines = CLASS_VOICE_LINES[charClass]?.[event] || CLASS_VOICE_LINES.default[event] || ['...'];
  return lines[Math.floor(Math.random() * lines.length)];
}
