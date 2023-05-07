import { Dropdown } from "@/components/ui/messenger/Dropdown";
import { FC } from "react";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { updateUser } from "@/stores/slices/user/user";
import { ConversationIcon, DialogIcon, GlobeIcon } from "@/components/icons";

/**
 * Dropdown component for the {@link NotificationPage} page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const NotificationSoundDropdown: FC<ModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();
    const settings = useStateSelector((state) => state.user.current.settings);

    const { chatsSoundEnabled, conversationsSoundEnabled, groupsSoundEnabled } = settings;

    const dispatch = useAppDispatch();

    /**
     * Handler for updating current user settings.
     */
    const handleChange = (field: object): void => {
        dispatch(updateUser(field));
    };

    return (
        <Dropdown isOpened={isOpened} onClose={onClose} className="top-0 right-0 sm:-right-1/3">
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
                disabled
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
                disabled
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
