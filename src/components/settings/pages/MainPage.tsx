import { FC, useState } from "react";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { settingsActions } from "@/stores/slices/ui/settings/settings";
import { ImageGalleryPortal } from "@/components/settings/items/ImageGalleryPortal";
import { CopyBar } from "@/components/settings/items/CopyBar";
import { DeleteAccountModal } from "@/components/settings/pages/account/DeleteAccountModal";
import { Avatar } from "@/components/ui/messenger/Avatar";
import { concatenate } from "@/helpers/helpers";
import { SettingsItem } from "@/components/settings/items";
import { SettingsItemProps } from "@/interfaces/components/SettingsItemProps";
import { AlertCircleIcon, BellIcon, GlobeIcon, LockCircleIcon, ProfileCircleIcon, TrashIcon } from "@/components/icons";

/**
 * Array of settings pages in the {@link SettingsWindow} main page.
 *
 * @param {typeof settingsActions} store - The settings store.
 *
 * @returns {SettingsItemProps[]} - Array of settings pages.
 */
const links = (store: typeof settingsActions): SettingsItemProps[] => [
    {
        id: 1,
        title: "settings.links.profile",
        Icon: ProfileCircleIcon,
        backgroundColor: "#5B9BD985, #457BA9",
    },
    {
        id: 2,
        title: "settings.links.notifications",
        Icon: BellIcon,
        backgroundColor: "#DAB24D, #987724",
    },
    {
        id: 3,
        title: "settings.links.privacy",
        Icon: LockCircleIcon,
        backgroundColor: "#3EBF6E, #157E3A",
    },
    {
        id: 4,
        title: "settings.links.blockedUsers",
        Icon: AlertCircleIcon,
        backgroundColor: "#8A60E585, #6545A9",
    },
    {
        id: 5,
        title: "settings.links.language",
        Icon: GlobeIcon,
        backgroundColor: "#537AEF85, #3752A3",
    },
    {
        id: 6,
        title: "settings.links.deleteAccount",
        Icon: TrashIcon,
        backgroundColor: "#EFCBCF, #E86C6C",
        textColor: "#E86C6C, #E86C6C",
        iconColor: "#E86C6C, #E3E3FA",
        onClick: () => store.toggleDeleteAccountModal(true),
    },
];

/**
 * Main page of the {@link SettingsWindow}.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MainPage: FC = () => {
    const user = useStateSelector((state) => state.user.current);
    const isAccountDeleteModalOpened = useStateSelector((state) => state.settings.isDeleteAccountModalOpened);

    const settingsStore = useActionCreators(settingsActions);

    const [isImageOpened, setImageOpened] = useState<boolean>(false);
    const [isCopied, setCopied] = useState<boolean>(false);

    /**
     * Copies the current user's username to clipboard.
     */
    const copyUsername = async (): Promise<void> => {
        if (isCopied) return;

        await navigator.clipboard.writeText(user.username);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <>
            <ImageGalleryPortal
                images={[user.photoURL]}
                current={user.photoURL}
                onClose={() => setImageOpened(false)}
                isOpened={isImageOpened}
            />

            <CopyBar isOpened={isCopied} />

            <DeleteAccountModal
                isOpened={isAccountDeleteModalOpened}
                onClose={() => settingsStore.toggleDeleteAccountModal(false)}
            />

            <div className="mb-2 flex select-none items-center justify-between gap-2.5 border-b-[10px] border-b-[#CFD0D4] px-6 py-2 dark:border-b-[#2F384E65]">
                <Avatar
                    src={user.photoURL}
                    alt={user.username}
                    className="h-[60px] w-[60px] flex-none cursor-pointer rounded-full"
                    onClick={() => setImageOpened(true)}
                />

                <div className="flex flex-1 flex-col overflow-hidden [&>span]:truncate">
                    <span title={concatenate(user.firstName, user.lastName)}>
                        {concatenate(user.firstName, user.lastName)}
                    </span>
                    <span className="text-sm text-[#4C4C4C] dark:text-[#E3E3FA80]" title={user.email}>
                        {user.email}
                    </span>
                    <span
                        className="cursor-pointer text-sm text-[#888888] hover:underline dark:text-[#E3E3FA50]"
                        title={user.username}
                        onClick={copyUsername}
                    >
                        {`@${user.username}`}
                    </span>
                </div>
            </div>

            {links(settingsStore).map((link) => (
                <SettingsItem {...link} key={link.title} />
            ))}
        </>
    );
};
