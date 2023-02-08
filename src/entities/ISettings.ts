/**
 * Themes enum.
 */
export enum ThemesEnum {
	LIGHT = "light",
	DARK = "dark",
}

/**
 * Locatlization enum.
 */
export enum LanguagesEnum {
	EN = "en",
	RU = "ru",
	ET = "et",
}

/**
 * Interface for the Settings model.
 */
export interface ISettings {
	twoFactorEnabled: boolean;

	theme: ThemesEnum;

	language: LanguagesEnum;

	chatsNotificationsEnabled: boolean;
	conversationsNotificationsEnabled: boolean;
	groupsNotificationsEnabled: boolean;

	chatsSoundEnabled: boolean;
	conversationsSoundEnabled: boolean;
	groupsSoundEnabled: boolean;

	lastActivityMode: boolean;
}
