import {NotificationsDropdown, NotificationsSoundDropdown} from "../dropdowns";
import {t} from "i18next";
import {FC, useEffect, useState} from "react";
import {SettingsItem} from "../../items";
import {BellOffIcon, VolumeOffIcon} from "../../../icons";

export const NotificationsPage: FC = () => {
	const [isNotificationsEnabled, setIsNotificationsEnabled] = useState<boolean>(Notification.permission === "granted");
	const [isNotificationsDropdownOpen, openNotificationsDropdown] = useState<boolean>(false);
	const [isSoundsDropdownOpen, openSoundsDropdown] = useState<boolean>(false);

	/**
	 * If User has disabled Notifications, then we should request permission.
	 */
	const askForNotificationsPermission = async (): Promise<void> => {
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
	 * Request permission for Notifications, if it's not granted.
	 */
	const notificationsOnClick = async (): Promise<void> => {
		if (!isNotificationsEnabled) {
			await askForNotificationsPermission();
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
					subtitle={!isNotificationsEnabled && <span className="text-sm text-[#E86C6C]">{t("button.forbidden")}</span>}
				/>

				<NotificationsDropdown
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

				<NotificationsSoundDropdown
					isOpened={isSoundsDropdownOpen}
					onClose={() => openSoundsDropdown(false)}
				/>
			</div>
		</div>
	);
};
