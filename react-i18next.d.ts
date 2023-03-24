import { EnglishTranslation } from "@/locales/en/dist";

declare module "react-i18next" {
	type DefaultResources = typeof EnglishTranslation;
}

declare module "react-i18next" {
	// and extend them!
	interface CustomTypeOptions {
		resources: {
			en: typeof EnglishTranslation;
		};
		fallbackLng: string;
		detection: {
			order: string[];
			lookupQuerystring: string;
			lookupCookie: string;
			caches: string[];
		};
	}
}
