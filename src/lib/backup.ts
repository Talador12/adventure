// Character backup/restore — encrypted JSON download/upload.
// Uses AES-256-GCM via SubtleCrypto. Password-based key derivation via PBKDF2.
// Zero dependencies.

import type { Character } from '../types/game';

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt.buffer as ArrayBuffer, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

/** Export a character as an encrypted backup file. */
export async function exportBackup(character: Character, password: string): Promise<void> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const data = new TextEncoder().encode(JSON.stringify(character));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data);

  const bundle = {
    v: 1,
    salt: Array.from(salt),
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
    name: character.name,
    class: character.class,
    level: character.level,
  };

  const blob = new Blob([JSON.stringify(bundle)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${character.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-backup.adventure.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/** Import a character from an encrypted backup file. */
export async function importBackup(password: string): Promise<Character | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.adventure.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) { resolve(null); return; }
      try {
        const text = await file.text();
        const bundle = JSON.parse(text) as { v: number; salt: number[]; iv: number[]; data: number[]; name?: string };

        // Unencrypted backup (v0 or no salt)
        if (!bundle.salt || !bundle.iv) {
          resolve(JSON.parse(text) as Character);
          return;
        }

        const salt = new Uint8Array(bundle.salt);
        const iv = new Uint8Array(bundle.iv);
        const encrypted = new Uint8Array(bundle.data);
        const key = await deriveKey(password, salt);
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
        const character = JSON.parse(new TextDecoder().decode(decrypted)) as Character;
        character.id = crypto.randomUUID(); // new ID to avoid conflicts
        resolve(character);
      } catch {
        resolve(null); // wrong password or corrupt file
      }
    };
    input.click();
  });
}
