// Random session opener — first lines to start a session with energy.
export const SESSION_OPENERS: string[] = [
  '"When we last left our heroes..."',
  '"The night was dark. The road was long. And something was watching."',
  '"Three days have passed since the events at [location]. The world has not stood still."',
  '"You awaken to the sound of steel."',
  '"The letter arrives at dawn. Its contents change everything."',
  '"Roll initiative." (No explanation. No preamble. Just combat.)',
  '"The smell of smoke reaches you before the screams do."',
  '"A knock at the door. At this hour, it can\'t be good news."',
  '"The map was wrong. You are not where you think you are."',
  '"Someone in this room is not who they claim to be."',
  '"The ground has stopped shaking. For now."',
  '"Last session, you made a choice. Tonight, you face the consequences."',
];
export function getRandomOpener(): string { return SESSION_OPENERS[Math.floor(Math.random() * SESSION_OPENERS.length)]; }
export function formatSessionOpener(): string { return `🎬 **Session Opener:**\n\n*${getRandomOpener()}*`; }
