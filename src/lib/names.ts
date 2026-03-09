// Random fantasy name generator — syllable tables by race flavor

const NAME_PREFIXES: Record<string, string[]> = {
  Human: ['Al', 'Bran', 'Cor', 'Dar', 'El', 'Fen', 'Gar', 'Hal', 'Ira', 'Jor', 'Kal', 'Lor', 'Mar', 'Nor', 'Os', 'Per', 'Ren', 'Sar', 'Tor', 'Val'],
  Elf: ['Ael', 'Cael', 'Eil', 'Fael', 'Gal', 'Ith', 'Lir', 'Nae', 'Quel', 'Syl', 'Thi', 'Vael', 'Aer', 'Cel', 'Nym', 'Rin', 'Zan', 'Mith', 'Ara', 'Eld'],
  Dwarf: ['Bal', 'Brom', 'Dor', 'Gim', 'Grun', 'Hjal', 'Krag', 'Mur', 'Nor', 'Rud', 'Skar', 'Thor', 'Thur', 'Ulf', 'Vor', 'Dur', 'Bor', 'Kol', 'Grim', 'Tor'],
  Halfling: ['Bil', 'Cor', 'Dil', 'Fin', 'Gar', 'Hal', 'Jas', 'Kel', 'Lav', 'Mer', 'Ned', 'Pip', 'Ros', 'Sam', 'Tob', 'Wil', 'Bam', 'Cal', 'Jol', 'Per'],
  Gnome: ['Bim', 'Cli', 'Dib', 'Fiz', 'Glib', 'Jim', 'Nim', 'Pip', 'Qui', 'Rik', 'Tik', 'Wiz', 'Zap', 'Boo', 'Cog', 'Nix', 'Tig', 'Dax', 'Flo', 'Jib'],
  'Half-Orc': ['Brak', 'Drog', 'Gash', 'Grul', 'Hak', 'Korg', 'Mog', 'Nar', 'Org', 'Rek', 'Shak', 'Thar', 'Ug', 'Vok', 'Zug', 'Gor', 'Kra', 'Rok', 'Bur', 'Grom'],
  Tiefling: ['Azar', 'Bel', 'Cri', 'Dam', 'Ekr', 'Kal', 'Lev', 'Mord', 'Ner', 'Ori', 'Raz', 'Sar', 'Val', 'Zar', 'Mal', 'Xar', 'Ven', 'Phe', 'Ira', 'Cael'],
  Dragonborn: ['Arj', 'Bala', 'Dra', 'Ghe', 'Kriv', 'Mehe', 'Nar', 'Pan', 'Rath', 'Sha', 'Tor', 'Vu', 'Bhar', 'Dorn', 'Kava', 'Rho', 'Sora', 'Taz', 'Yor', 'Zel'],
};

const NAME_SUFFIXES: Record<string, string[]> = {
  Human: ['ric', 'dan', 'wen', 'don', 'mund', 'bert', 'gar', 'win', 'ton', 'ley', 'mir', 'ius', 'an', 'ard', 'ell', 'yn', 'or', 'as', 'eth', 'in'],
  Elf: ['anor', 'iel', 'ion', 'ith', 'ael', 'wen', 'ris', 'las', 'nor', 'thil', 'dor', 'rin', 'wyn', 'alis', 'iel', 'ara', 'eni', 'oth', 'iel', 'ari'],
  Dwarf: ['in', 'im', 'ur', 'ok', 'ak', 'din', 'gar', 'rik', 'mund', 'grim', 'ren', 'bor', 'dak', 'rok', 'rim', 'dum', 'mak', 'rak', 'lin', 'dur'],
  Halfling: ['bo', 'by', 'ric', 'wen', 'kins', 'ly', 'per', 'ton', 'ber', 'ric', 'do', 'tas', 'win', 'ble', 'nie', 'ory', 'mund', 'ard', 'in', 'ell'],
  Gnome: ['ble', 'kin', 'wick', 'ber', 'nob', 'rig', 'ton', 'sprocket', 'giz', 'pop', 'wink', 'mop', 'tock', 'dle', 'nip', 'ble', 'doo', 'fiz', 'snip', 'wit'],
  'Half-Orc': ['uk', 'ash', 'gor', 'dak', 'rak', 'tuk', 'mash', 'nar', 'gul', 'rok', 'bash', 'dag', 'tar', 'ug', 'mok', 'ruk', 'og', 'nak', 'duk', 'mak'],
  Tiefling: ['ius', 'os', 'iel', 'ith', 'eon', 'ais', 'akos', 'ius', 'ra', 'nis', 'xis', 'ros', 'ael', 'ion', 'eth', 'orn', 'ius', 'ath', 'iel', 'yx'],
  Dragonborn: ['ash', 'aar', 'ax', 'esh', 'ox', 'han', 'dar', 'sar', 'jit', 'zan', 'nor', 'thas', 'gar', 'kai', 'dak', 'ros', 'mar', 'ven', 'kas', 'lor'],
};

export function randomFantasyName(race: string): string {
  const prefixes = NAME_PREFIXES[race] || NAME_PREFIXES.Human;
  const suffixes = NAME_SUFFIXES[race] || NAME_SUFFIXES.Human;
  const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suf = suffixes[Math.floor(Math.random() * suffixes.length)];
  return pre + suf;
}
