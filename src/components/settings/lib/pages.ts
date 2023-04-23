import { ComponentType } from "react";
import {
    BlockedUsersPage,
    LanguagePage,
    NotificationPage,
    PrivacyPage,
    ProfilePage,
    SessionManagementPage,
} from "@/components/settings/pages";

/**
 * Interface for the main menu pages of the {@link SettingsWindow} component.
 *
 * @interface SettingsWindowPageProps
 *
 * @property {number} id - Page ID.
 * @property {string} [title] - Page title.
 * @property {ComponentType} [Component] - Page component.
 * @property {number} [PrevComponentId] - ID of the previous page.
 * @property {() => void} [onClick] - Page click handler.
 */
interface SettingsWindowPageProps {
    id: number;
    title?: string;
    Component?: ComponentType;
    PrevComponentId?: number;
    onClick?: () => void;
}

/**
 * Array of the pages of the {@link SettingsWindow} component.
 */
export const pages: SettingsWindowPageProps[] = [
    {
        id: 1,
        title: "settings.profile.title",
        Component: ProfilePage,
    },
    {
        id: 2,
        title: "settings.notifications.title",
        Component: NotificationPage,
    },
    {
        id: 3,
        title: "settings.privacy.title",
        Component: PrivacyPage,
    },
    {
        id: 4,
        title: "settings.blockedUsers.title",
        Component: BlockedUsersPage,
    },
    {
        id: 5,
        title: "settings.language.title",
        Component: LanguagePage,
    },
    {
        id: 6,
        title: "settings.sessions.title",
        Component: SessionManagementPage,
        PrevComponentId: 3,
    },
];
