import { FC } from "react";
import { useTranslation } from "react-i18next";
import {ConversationIcon, DialogIcon, GlobeIcon } from "../../../../icons";
import { Dropdown } from "../../../../ui/Dropdown";
import {ModalProps} from "../../../../../interfaces/components/ModalProps";
import {useAppDispatch, useStateSelector} from "../../../../../stores/hooks";
import {updateUser} from "../../../../../stores/slices/user/user";

export const NotificationsSoundDropdown: FC<ModalProps> = ({ isOpened, onClose }: ModalProps) => {
	const { t } = useTranslation();
	const settings = useStateSelector((state) => state.user.current.settings)

	const { chatsSoundEnabled, conversationsSoundEnabled, groupsSoundEnabled } = settings;

	const dispatch = useAppDispatch();

	/**
	 * Handler for updating current User Settings.
	 */
	const handleChange = (field: object): void => {
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
				checked={chatsSoundEnabled}
				label={t("settings.notifications.chats")}
				onClick={() =>
					handleChange({
						chatsSoundEnabled: !chatsSoundEnabled,
					})
				}
			/>
			<Dropdown.SwitchItem
				Icon={ConversationIcon}
				checked={conversationsSoundEnabled}
				label={t("settings.notifications.conversations")}
				onClick={() =>
					handleChange({
						conversationsSoundEnabled: !conversationsSoundEnabled,
					})
				}
			/>
			<Dropdown.SwitchItem
				Icon={GlobeIcon}
				checked={groupsSoundEnabled}
				label={t("settings.notifications.groups")}
				onClick={() =>
					handleChange({
						groupsSoundEnabled: !groupsSoundEnabled,
					})
				}
			/>
		</Dropdown>
	);
};
