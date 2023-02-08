import { FC } from "react";
import { useTranslation } from "react-i18next";
import {ModalProps} from "../../../../../interfaces/components/ModalProps";
import {useAppDispatch, useStateSelector} from "../../../../../stores/hooks";
import {ConversationIcon, DialogIcon, GlobeIcon } from "../../../../icons";
import { Dropdown } from "../../../../ui/Dropdown";
import {updateUser} from "../../../../../stores/slices/user/user";

export const NotificationsDropdown: FC<ModalProps> = ({ isOpened, onClose }: ModalProps) => {
	const { t } = useTranslation();

	const settings = useStateSelector(state => state.user.current.settings)

	const dispatch = useAppDispatch();

	/**
	 * Handler for updating current User Settings.
	 */
	const handleSubmit = (field: object): void => {
		dispatch(updateUser(field))
	};

	return (
		<Dropdown
			isOpened={isOpened}
			onClose={onClose}
			className="-right-1/3 top-0"
		>
			<Dropdown.SwitchItem
				Icon={DialogIcon}
				checked={settings.chatsNotificationsEnabled}
				label={t("settings.notifications.chats")}
				onClick={() =>
					handleSubmit({
						chatsNotificationsEnabled: !settings.chatsNotificationsEnabled,
					})
				}
			/>
			<Dropdown.SwitchItem
				Icon={ConversationIcon}
				checked={settings.conversationsNotificationsEnabled}
				label={t("settings.notifications.conversations")}
				onClick={() =>
					handleSubmit({
						conversationsNotificationsEnabled: !settings.conversationsNotificationsEnabled,
					})
				}
			/>
			<Dropdown.SwitchItem
				Icon={GlobeIcon}
				checked={settings.groupsNotificationsEnabled}
				label={t("settings.notifications.groups")}
				onClick={() =>
					handleSubmit({
						groupsNotificationsEnabled: !settings.groupsNotificationsEnabled,
					})
				}
			/>
		</Dropdown>
	);
};
