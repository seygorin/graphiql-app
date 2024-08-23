import { initReactI18next } from 'react-i18next/initReactI18next';
import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { LanguageType, getOptions } from './settings';

const initI18next = async (lng: LanguageType) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: LanguageType) => import(`./locales/${language}.json`)))
    .init(getOptions(lng));
  return i18nInstance;
};

const useTranslation = async (lng: LanguageType) => {
  const i18nextInstance = await initI18next(lng);
  return {
    t: i18nextInstance.getFixedT(lng),
    i18n: i18nextInstance,
  };
};

export default useTranslation;
