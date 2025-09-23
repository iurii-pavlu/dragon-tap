import en from '../content/en.json';
import vi from '../content/vi.json';

export type Locale = 'en' | 'vi';

export const locales: Locale[] = ['en', 'vi'];

export const translations = {
  en,
  vi
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

export function t(locale: Locale, key: string, params?: Record<string, any>): string {
  const translation = getTranslations(locale);
  const keys = key.split('.');
  
  let value: any = translation;
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // Return key if translation not found
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters if provided
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
}