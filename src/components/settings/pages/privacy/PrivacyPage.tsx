import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useStateSelector } from "@/stores/hooks";
import { updateUser } from "@/stores/slices/user/user";
import { SettingsItem } from "@/components/settings/items";
import {
    ArrangeHorizontalIcon,
    GroupOfPeopleIcon,
    KeySquareIcon,
    MonitorIcon,
    ProfileTickIcon,
} from "@/components/icons";
import { LastActivityModeDropdown } from "@/components/settings/pages/dropdowns";
import { Switch } from "@/components/ui/messenger/Switch";

/**
 * Privacy page component for the {@link SettingsWindow}.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const PrivacyPage: FC = () => {
    const { t } = useTranslation();

    const [isLastActivityModeDropdownOpen, openLastActivityModeDropdown] = useState<boolean>(false);

    const settings = useStateSelector((state) => state.user.current.settings);

    const dispatch = useAppDispatch();

    /**
     * Handler for updating current user settings.
     */
    const handleTwoFactorChange = async (): Promise<void> => {
        dispatch(updateUser({ twoFactorEnabled: !settings.twoFactorEnabled }));
    };

    return (
        <div className="mt-2.5 flex w-full flex-col border-t-4 border-t-[#CFD0D4] pt-2.5 dark:border-t-[#2F384E20]">
            <div className="flex flex-col">
                <div className="relative">
                    <SettingsItem
                        Icon={ProfileTickIcon}
                        title={t("settings.privacy.lastActivity.title")}
                        backgroundColor="#70A7DD, #457BA9"
                        subtitle={settings.lastActivityMode ? t("global.everyone") : t("global.no-one")}
                        onClick={() => openLastActivityModeDropdown(true)}
                    />

                    <LastActivityModeDropdown
                        isOpened={isLastActivityModeDropdownOpen}
                        onClose={() => openLastActivityModeDropdown(false)}
                    />
                </div>
                <div className="relative">
                    <SettingsItem
                        Icon={ArrangeHorizontalIcon}
                        title={t("settings.privacy.messageForwarding.title")}
                        backgroundColor="#DAB24D, #987724"
                        disabled
                    />
                </div>
                <div className="relative">
                    <SettingsItem
                        Icon={GroupOfPeopleIcon}
                        title={t("settings.privacy.groupsAndConversations.title")}
                        backgroundColor="#9974E8, #6545A9"
                        disabled
                    />
                </div>
            </div>

            <div className="mt-4 flex flex-col border-t-[10px] border-t-[#CFD0D4] pt-4 dark:border-t-[#2F384E65]">
                <SettingsItem
                    id={6}
                    Icon={MonitorIcon}
                    title={t("settings.privacy.sessionManagement.title")}
                    backgroundColor="#3EBF6E, #157E3A"
                />
                <SettingsItem
                    Icon={KeySquareIcon}
                    title={t("settings.privacy.twoFactor.title")}
                    backgroundColor="#4C70E065, #4C70E066"
                    subtitle={<Switch checked={settings.twoFactorEnabled} onChange={handleTwoFactorChange} />}
                />
            </div>
        </div>
    );
};
