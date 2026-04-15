// i18n — lightweight internationalization. No dependencies, just a context + JSON.
// Usage: const { t } = useI18n(); then t('key') returns the translated string.
// Falls back to English when a key is missing in the active locale.
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type Locale = 'en' | 'en-gb' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'zh';

export const LOCALE_NAMES: Record<Locale, string> = {
  de: '🇩🇪 Deutsch',
  en: '🇺🇸 English',
  'en-gb': '🇬🇧 English (Bloke)',
  es: '🇪🇸 Español',
  fr: '🇫🇷 Français',
  ja: '🇯🇵 日本語',
  ko: '🇰🇷 한국어',
  pt: '🇵🇹 Português',
  zh: '🇨🇳 简体中文',
};

// English is the base — always loaded, used as fallback
import en from '../locales/en.json';

type TranslationMap = Record<string, string>;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
});

export function useI18n() { return useContext(I18nContext); }

// Lazy-load non-English locales
const localeLoaders: Record<string, () => Promise<{ default: TranslationMap }>> = {
  es: () => import('../locales/es.json'),
  fr: () => import('../locales/fr.json'),
  de: () => import('../locales/de.json'),
  ja: () => import('../locales/ja.json'),
  'en-gb': () => import('../locales/en-gb.json'),
  ko: () => import('../locales/ko.json'),
  pt: () => import('../locales/pt.json'),
  zh: () => import('../locales/zh.json'),
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() =>
    (localStorage.getItem('adventure:locale') as Locale) || 'en'
  );
  const [translations, setTranslations] = useState<TranslationMap>(en as TranslationMap);

  const setLocale = useCallback((loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem('adventure:locale', loc);
  }, []);

  // Load translations when locale changes
  useEffect(() => {
    if (locale === 'en') {
      setTranslations(en as TranslationMap);
      return;
    }
    const loader = localeLoaders[locale];
    if (loader) {
      loader().then((mod) => {
        // Merge with English as fallback
        setTranslations({ ...(en as TranslationMap), ...mod.default });
      }).catch(() => setTranslations(en as TranslationMap));
    }
  }, [locale]);

  const t = useCallback((key: string, vars?: Record<string, string | number>): string => {
    let str = translations[key] || (en as TranslationMap)[key] || key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  }, [translations]);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
