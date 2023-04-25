import { RatioButton } from "@/components/ui/messenger/RatioButton";
import { FC } from "react";
import { ModalProps } from "@/interfaces/components/ModalProps";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { updateUser } from "@/stores/slices/user/user";
import { Dropdown } from "@/components/ui/messenger/Dropdown";

/**
 * Dropdown component for the {@link PrivacyPage} page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LastActivityModeDropdown: FC<ModalProps> = ({ isOpened, onClose }) => {
    const { t } = useTranslation();

    const settings = useStateSelector((state) => state.user.current.settings);
    const isEnabled = settings.lastActivityMode;

    const dispatch = useAppDispatch();

    /**
     * Handler for updating current user settings.
     *
     * @param {boolean} state - New state of the last activity mode.
     */
    const handleLastActivityModeChange = async (state: boolean): Promise<void> => {
        if (state === isEnabled) return;

        dispatch(updateUser({ lastActivityMode: state }));
    };

    return (
        <Dropdown isOpened={isOpened} onClose={onClose} className="top-0 right-0 sm:-right-16">
            <Dropdown.Item>
                <RatioButton
                    value={+isEnabled}
                    id="lastActivityMode"
                    label={t("global.everyone")}
                    isSelected={isEnabled}
                    changed={() => handleLastActivityModeChange(true)}
                />
            </Dropdown.Item>

            <Dropdown.Item>
                <RatioButton
                    value={+!isEnabled}
                    id="lastActivityMode"
                    label={t("global.no-one")}
                    isSelected={!isEnabled}
                    changed={() => handleLastActivityModeChange(false)}
                />
            </Dropdown.Item>
        </Dropdown>
    );
};
