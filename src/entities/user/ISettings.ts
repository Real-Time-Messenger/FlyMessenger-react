/**
 * Themes.
 */
export enum Themes {
    LIGHT = "light",
    DARK = "dark",
}

/**
 * Localizations.
 */
export enum Languages {
    EN = "en",
    RU = "ru",
    ET = "et",
}

/**
 * Interface for the user settings model.
 *
 * @interface ISettings
 *
 * @property {boolean} twoFactorEnabled - Determines if the two-factor authentication is enabled.
 * @property {Themes} theme - The theme.
 * @property {Languages} language - The localization.
 * @property {boolean} chatsNotificationsEnabled - Determines if the chats notifications are enabled.
 * @property {boolean} conversationsNotificationsEnabled - Determines if the conversations notifications are enabled.
 * @property {boolean} groupsNotificationsEnabled - Determines if the groups notifications are enabled.
 * @property {boolean} chatsSoundEnabled - Determines if the chats sound is enabled.
 * @property {boolean} conversationsSoundEnabled - Determines if the conversations sound is enabled.
 * @property {boolean} groupsSoundEnabled - Determines if the groups sound is enabled.
 * @property {boolean} lastActivityMode - Determines if the last activity mode is enabled.
 */
export interface ISettings {
    twoFactorEnabled: boolean;

    theme: Themes;

    language: Languages;

    chatsNotificationsEnabled: boolean;
    conversationsNotificationsEnabled: boolean;
    groupsNotificationsEnabled: boolean;

    chatsSoundEnabled: boolean;
    conversationsSoundEnabled: boolean;
    groupsSoundEnabled: boolean;

    lastActivityMode: boolean;
}
