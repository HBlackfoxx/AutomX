import fr from './fr.json';
import en from './en.json';

export type Language = 'fr' | 'en';

export const languages: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
};

export const defaultLang: Language = 'fr';

type TranslationKeys = typeof fr;

/**
 * Get translations for a specific language
 * @param lang - The language code ('fr' or 'en')
 * @returns Translation object for the specified language
 */
export function getTranslations(lang: Language = defaultLang): TranslationKeys {
  return lang === 'en' ? en : fr;
}

/**
 * Get a specific translation value using dot notation
 * @param lang - The language code ('fr' or 'en')
 * @param key - The translation key in dot notation (e.g., 'nav.home')
 * @returns The translated string or the key if not found
 */
export function t(lang: Language, key: string): string {
  const translations = getTranslations(lang);
  const keys = key.split('.');

  let value: any = translations;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

/**
 * Hook-like function to get translations for a specific language
 * Returns both the full translation object and the t() function
 * @param lang - The language code ('fr' or 'en')
 */
export function useTranslations(lang: Language = defaultLang) {
  const translations = getTranslations(lang);

  return {
    t: (key: string) => t(lang, key),
    translations,
  };
}

/**
 * Get the alternate language
 * @param currentLang - The current language
 * @returns The alternate language
 */
export function getAlternateLang(currentLang: Language): Language {
  return currentLang === 'fr' ? 'en' : 'fr';
}

/**
 * Get the locale path for a given language
 * @param lang - The language code
 * @returns The locale path (e.g., '' for French, '/en' for English)
 */
export function getLocalePath(lang: Language): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

/**
 * Convert a path from one language to another
 * @param path - The current path
 * @param fromLang - The source language
 * @param toLang - The target language
 * @returns The converted path
 */
export function convertPath(path: string, _fromLang: Language, toLang: Language): string {
  // Normalize path - remove leading/trailing slashes
  let cleanPath = path.trim();
  if (cleanPath.startsWith('/')) cleanPath = cleanPath.slice(1);
  if (cleanPath.endsWith('/')) cleanPath = cleanPath.slice(0, -1);

  // Remove language prefix if present (for English paths)
  let pathWithoutLang = cleanPath;
  if (cleanPath.startsWith('en/') || cleanPath === 'en') {
    pathWithoutLang = cleanPath === 'en' ? '' : cleanPath.slice(3);
  }

  // Homepage special case
  if (!pathWithoutLang || pathWithoutLang === '') {
    return toLang === 'en' ? '/en' : '/';
  }

  // Handle route translations (French <-> English)
  const routeMap: Record<string, Record<Language, string>> = {
    'projets': { fr: 'projets', en: 'projects' },
    'projects': { fr: 'projets', en: 'projects' },
    'a-propos': { fr: 'a-propos', en: 'about' },
    'about': { fr: 'a-propos', en: 'about' },
    'services': { fr: 'services', en: 'services' },
    'contact': { fr: 'contact', en: 'contact' },
  };

  // Get the first segment of the path
  const segments = pathWithoutLang.split('/');
  const firstSegment = segments[0];

  // Check if first segment needs translation
  if (firstSegment && routeMap[firstSegment]) {
    segments[0] = routeMap[firstSegment][toLang];
    pathWithoutLang = segments.join('/');
  }

  // Construct final path with language prefix
  const finalPath = toLang === 'en' ? `/en/${pathWithoutLang}` : `/${pathWithoutLang}`;

  // Clean up double slashes and ensure proper format
  return finalPath.replace(/\/+/g, '/');
}

/**
 * Detect the preferred language from the browser
 * @param acceptLanguage - The Accept-Language header value
 * @returns The detected language or default language
 */
export function detectLanguage(acceptLanguage?: string): Language {
  if (!acceptLanguage) return defaultLang;

  const languages = acceptLanguage.split(',').map(lang => {
    const [code] = lang.trim().split(';');
    if (!code) return '';
    return code.split('-')[0]?.toLowerCase() || '';
  });

  if (languages.includes('en')) return 'en';
  if (languages.includes('fr')) return 'fr';

  return defaultLang;
}

/**
 * Format a date according to the language
 * @param date - The date to format
 * @param lang - The language code
 * @returns The formatted date string
 */
export function formatDate(date: Date, lang: Language): string {
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
