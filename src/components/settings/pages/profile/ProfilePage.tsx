import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStateSelector } from "@/stores/hooks";
import { ChangeDisplayNameModal, ChangeEmailModal } from "@/components/settings/pages/modals";
import { PhotoChanger } from "@/components/settings/pages/profile/items/PhotoChanger";
import { concatenate } from "@/helpers/helpers";
import { SettingsItem } from "@/components/settings/items";
import { AtSignIcon, MailIcon, ProfileIcon } from "@/components/icons";

/**
 * Profile page component for the {@link SettingsWindow}.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ProfilePage: FC = () => {
    const { t } = useTranslation();

    const [isDisplayNameModalOpen, setIsDisplayNameModalOpen] = useState<boolean>(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);

    const user = useStateSelector((state) => state.user.current);

    return (
        <>
            <ChangeDisplayNameModal
                isOpened={isDisplayNameModalOpen}
                onClose={() => setIsDisplayNameModalOpen(false)}
            />
            <ChangeEmailModal isOpened={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />

            <div className="flex flex-col">
                <div className="mb-2.5 flex flex-col items-center justify-center gap-2.5 border-b-[10px] border-b-[#CFD0D4] p-2.5 pb-2.5 dark:border-b-[#2F384E65]">
                    <PhotoChanger />

                    <div className="flex w-full flex-col items-center">
                        <span className="text-center text-lg">{concatenate(user.firstName, user.lastName)}</span>
                        <span className="select-none text-sm text-[#7CADE0] dark:text-[#4C70E0]">
                            {t("users.status.online")}
                        </span>
                    </div>
                </div>

                <div>
                    <SettingsItem
                        title={t("users.name")}
                        Icon={ProfileIcon}
                        backgroundColor="#70A7DD, #457BA9"
                        subtitle={concatenate(user.firstName, user.lastName)}
                        onClick={() => setIsDisplayNameModalOpen(true)}
                    />
                    <SettingsItem
                        title={t("users.email")}
                        Icon={MailIcon}
                        backgroundColor="#3EBF6E, #157E3A"
                        subtitle={user.email}
                        onClick={() => setIsEmailModalOpen(true)}
                    />
                    <SettingsItem
                        disabled
                        title={t("users.username")}
                        Icon={AtSignIcon}
                        backgroundColor="#DAB24D, #987724"
                        subtitle={`@${user.username}`}
                    />
                </div>
            </div>
        </>
    );
};
