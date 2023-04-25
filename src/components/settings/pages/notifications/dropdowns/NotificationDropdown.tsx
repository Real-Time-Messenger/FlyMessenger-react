import { FC } from "react";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { updateUser } from "@/stores/slices/user/user";
import { Dropdown } from "@/components/ui/messenger/Dropdown";
import { ConversationIcon, DialogIcon, GlobeIcon } from "@/components/icons";

/**
 * Dropdown component for the {@link NotificationPage} page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const NotificationDropdown: FC<ModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();

    const settings = useStateSelector((state) => state.user.current.settings);

    const dispatch = useAppDispatch();

    /**
     * Handler for updating current user settings.
     */
    const handleSubmit = (field: object): void => {
        dispatch(updateUser(field));
    };

    return (
        <Dropdown isOpened={isOpened} onClose={onClose} className="top-0 right-0 sm:-right-1/3">
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
