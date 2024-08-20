export const fallbackLng = 'en';
export const languages = [fallbackLng, 'ru'];
export type LanguageType = 'en' | 'ru';
export const cookieName = 'i18next';

export function getOptions(lng: LanguageType = fallbackLng) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
  };
}
