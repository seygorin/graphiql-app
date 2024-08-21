export const FALLBACK_LNG = 'en';
export const LANGUAGES = [FALLBACK_LNG, 'ru'];
export const COOKIE_NAME = 'i18next';
export type LanguageType = 'en' | 'ru';

export function getOptions(lng: LanguageType = FALLBACK_LNG) {
  return {
    supportedLngs: LANGUAGES,
    fallbackLng: FALLBACK_LNG,
    lng,
  };
}
