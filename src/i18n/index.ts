import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import hu from './locales/hu.json'
import ro from './locales/ro.json'

/** Languages supported by the site. Romanian is the default/source language. */
export const languages = ['ro', 'en', 'hu'] as const
export type Language = (typeof languages)[number]

export const defaultLanguage: Language = 'ro'

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng.split('-')[0] ?? defaultLanguage
}

i18n.on('languageChanged', syncHtmlLang)

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: ro },
      en: { translation: en },
      hu: { translation: hu },
    },
    fallbackLng: defaultLanguage,
    supportedLngs: [...languages],
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'etd-lang',
      caches: ['localStorage'],
    },
    returnNull: false,
  })

export default i18n
