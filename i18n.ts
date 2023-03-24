import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from "react-i18next";
import EnTranslation from "./src/locales/en/translation.json";
import EtTranslation from "./src/locales/et/translation.json";
import RuTranslation from "./src/locales/ru/translation.json";

/**
 * Load translation files from `public/locales` directory.
 */
const resources = {
    et: {
        translation: EtTranslation
    },
    en: {
        translation: EnTranslation,
    },
    ru: {
        translation: RuTranslation,
    },
};

/**
 * Initialize react-i18next.
 *
 * @see https://www.i18next.com/overview/configuration-options
 */
i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,

        fallbackLng: "et",

        detection: {
            order: ["cookie"],
            lookupQuerystring: "lng",
            lookupCookie: "i18next",
            caches: ["cookie"],
        },
    });

export default i18n;