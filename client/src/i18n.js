import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en_US from "./locales/en_US";
import es_ES from "./locales/es_ES";
import fr_FR from "./locales/fr_FR";
import ko_KO from "./locales/ko_KO";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: en_US(),
      es: es_ES(),
      fr: fr_FR(),
      ko: ko_KO()
    },
  });

export default i18n;
