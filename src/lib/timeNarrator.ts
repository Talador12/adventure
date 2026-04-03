// Time passage narrator — describe the passage of hours/days narratively.

export function narrateTimePassage(hours: number, terrain: string = 'wilderness', weather: string = 'clear'): string {
  if (hours <= 0) return '';
  const weatherDesc: Record<string, string> = {
    clear: 'under clear skies', rain: 'through steady rain', fog: 'in thick fog', snow: 'through falling snow',
    sandstorm: 'battling blinding sand', storm: 'amid thunder and lightning', none: 'in mild weather',
  };
  const terrainDesc: Record<string, string> = {
    forest: 'through the forest', mountain: 'along mountain trails', desert: 'across the desert',
    swamp: 'through the mire', plains: 'across open plains', coast: 'along the shoreline',
    wilderness: 'through the wilderness', road: 'along the road', underdark: 'through the tunnels',
  };
  const wDesc = weatherDesc[weather] || weatherDesc['clear'];
  const tDesc = terrainDesc[terrain] || terrainDesc['wilderness'];

  if (hours < 1) return `*A few minutes pass ${tDesc} ${wDesc}.*`;
  if (hours === 1) return `*An hour passes as you travel ${tDesc} ${wDesc}.*`;
  if (hours <= 4) return `*${hours} hours pass ${tDesc} ${wDesc}. The journey is ${Math.random() > 0.5 ? 'uneventful' : 'quiet'}.*`;
  if (hours <= 8) return `*Half a day passes ${tDesc} ${wDesc}. Fatigue sets in as the ${hours >= 6 ? 'sun begins to set' : 'miles stretch on'}.*`;
  if (hours <= 24) return `*A full day of travel ${tDesc} ${wDesc}. Night falls and you make camp.*`;
  const days = Math.floor(hours / 24);
  return `*${days} day${days > 1 ? 's' : ''} pass ${tDesc} ${wDesc}. The journey is long but the party presses on.*`;
}

export function narrateShortRest(): string {
  const descs = [
    '*The party takes a short rest, binding wounds and catching their breath.*',
    '*You find a quiet spot to rest. An hour passes in relative peace.*',
    '*The party pauses to recover. Some eat rations, others tend to injuries.*',
    '*You hunker down for a short rest. The sound of your breathing fills the silence.*',
  ];
  return descs[Math.floor(Math.random() * descs.length)];
}

export function narrateLongRest(): string {
  const descs = [
    '*The party settles in for the night. Watch is set, bedrolls unfurled. Eight hours of rest begin.*',
    '*Exhaustion finally wins. The party makes camp and collapses into sleep.*',
    '*You find a defensible spot for the night. The fire crackles as the party rests.*',
    '*Stars fill the sky as the party rests. Tomorrow brings new challenges.*',
  ];
  return descs[Math.floor(Math.random() * descs.length)];
}

export function formatTimeNarration(hours: number, terrain: string, weather: string): string {
  return `⏳ ${narrateTimePassage(hours, terrain, weather)}`;
}
