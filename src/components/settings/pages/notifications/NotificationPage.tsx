import { SettingsItem } from "@/components/settings/items";
import { FC, useState } from "react";
import { BellOffIcon, VolumeOffIcon } from "@/components/icons";
import { t } from "i18next";
import { NotificationDropdown, NotificationSoundDropdown } from "@/components/settings/pages/dropdowns";

/**
 * Notification page for the {@link SettingsWindow}.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const NotificationPage: FC = () => {
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(
        Notification.permission === "granted",
    );
    const [isNotificationsDropdownOpen, openNotificationsDropdown] = useState<boolean>(false);
    const [isSoundsDropdownOpen, openSoundsDropdown] = useState<boolean>(false);

    /**
     * Request permission for Notifications.
     */
    const askForNotificationPermission = async (): Promise<void> => {
        Notification.requestPermission().then((permission) => {
            switch (permission) {
                case "granted":
                    setIsNotificationsEnabled(true);
                    break;
                default:
                    setIsNotificationsEnabled(false);
                    break;
            }
        });
    };

    /**
     * Handler for opening the {@link NotificationDropdown} component.
     */
    const notificationsOnClick = async (): Promise<void> => {
        if (!isNotificationsEnabled) {
            await askForNotificationPermission();
            return;
        }

        openNotificationsDropdown(true);
    };

    return (
        <div className="mt-2.5 flex w-full flex-col border-t-4 border-t-[#CFD0D4] pt-2.5 dark:border-t-[#2F384E20]">
            <div className="relative">
                <SettingsItem
                    Icon={BellOffIcon}
                    title={t("settings.notifications.notify.title")}
                    backgroundColor="#E86C6C"
                    onClick={notificationsOnClick}
                    subtitle={
                        !isNotificationsEnabled && (
                            <span className="text-sm text-[#E86C6C]">{t("button.forbidden")}</span>
                        )
                    }
                />

                <NotificationDropdown
                    isOpened={isNotificationsDropdownOpen}
                    onClose={() => openNotificationsDropdown(false)}
                />
            </div>

            <div className="relative">
                <SettingsItem
                    Icon={VolumeOffIcon}
                    title={t("settings.notifications.sounds.title")}
                    backgroundColor="#70A7DD, #457BA9"
                    onClick={() => openSoundsDropdown(true)}
                />

                <NotificationSoundDropdown isOpened={isSoundsDropdownOpen} onClose={() => openSoundsDropdown(false)} />
            </div>
        </div>
    );
};
