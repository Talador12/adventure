// Theme system — 4 themes using CSS custom properties on <html>.
// Dark (default), Light, Parchment (warm fantasy), High Contrast (accessibility).
// Applies data-theme attribute + .dark/.light class for Tailwind compat.

export type ThemeId = 'dark' | 'light' | 'parchment' | 'high-contrast';

export interface ThemeDef {
  id: ThemeId;
  name: string;
  description: string;
  isDark: boolean; // controls Tailwind dark: variant
}

export const THEMES: ThemeDef[] = [
  { id: 'dark', name: 'Dark', description: 'Default dark fantasy', isDark: true },
  { id: 'light', name: 'Light', description: 'Clean and bright', isDark: false },
  { id: 'parchment', name: 'Parchment', description: 'Warm aged paper', isDark: false },
  { id: 'high-contrast', name: 'High Contrast', description: 'Maximum readability', isDark: true },
];

export function getStoredTheme(): ThemeId {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('adventure:theme') as ThemeId | null;
  if (stored && THEMES.some((t) => t.id === stored)) return stored;
  // Fall back to dark/light based on system preference
  if (window.matchMedia?.('(prefers-color-scheme: light)').matches) return 'light';
  return 'dark';
}

export function applyTheme(themeId: ThemeId): void {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const html = document.documentElement;

  // Remove all theme classes/attrs
  html.classList.remove('dark', 'light');
  html.removeAttribute('data-theme');

  // Apply Tailwind dark/light class
  html.classList.add(theme.isDark ? 'dark' : 'light');

  // Apply data-theme for CSS custom property overrides
  html.setAttribute('data-theme', themeId);

  // Persist
  localStorage.setItem('adventure:theme', themeId);
  // Keep legacy localStorage.theme in sync for Home.tsx compat
  localStorage.theme = theme.isDark ? 'dark' : 'light';
}
