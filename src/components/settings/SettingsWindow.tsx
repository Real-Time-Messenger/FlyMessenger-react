import {AnimatePresence, motion} from "framer-motion";
import React, {ComponentType, FC, ReactNode, SVGProps, useState} from "react";

import {useTranslation} from "react-i18next";
import {useActionsCreators, useStateSelector} from "../../stores/hooks";
import {ImageGallery} from "../ui/ImageGallery";
import {Avatar} from "../ui/Avatar";
import {concatenate} from "../../helpers/helpers";
import {AlertCircleIcon, BellIcon, GlobeIcon, LockCircleIcon, ProfileCircleIcon, TrashIcon} from "../icons";
import {
    BlockedUsersPage,
    LanguagePage,
    NotificationsPage,
    PrivacyPage,
    ProfilePage,
    SessionManagementPage
} from "./pages";
import {SettingsItem} from "./items";
import {SettingsWindowLayout} from "./layout/SettingsWindowLayout";
import {createPortal} from "react-dom";
import {settingsActions} from "../../stores/slices/ui/settings/settings";
import {DeleteAccountModal} from "./pages/modals";


export interface SettingsItemProps {
    id?: number;
    title: string;
    subtitle?: string | ReactNode;
    Icon: ComponentType<SVGProps<SVGElement>>;
    backgroundColor?: string;
    darkBackgroundColor?: string;
    textColor?: string;
    darkTextColor?: string;
    iconColor?: string;
    darkIconColor?: string;
    onClick?: () => void;
    Component?: ComponentType;
    PrevComponentId?: number;
    disabled?: boolean;
}

export interface SettingsWindowPageProps {
    id: number;
    title?: string;
    Component?: ComponentType;
    PrevComponentId?: number;
    onClick?: () => void;
}

export const pages: SettingsWindowPageProps[] = [
    {
        id: 1,
        title: "settings.profile.title",
        Component: ProfilePage,
    },
    {
        id: 2,
        title: "settings.notifications.title",
        Component: NotificationsPage,
    },
    {
        id: 3,
        title: "settings.privacy.title",
        Component: PrivacyPage,
    },
    {
        id: 4,
        title: "settings.blockedUsers.title",
        Component: BlockedUsersPage,
    },
    {
        id: 5,
        title: "settings.language.title",
        Component: LanguagePage,
    },
    {
        id: 6,
        title: "settings.sessions.title",
        Component: SessionManagementPage,
        PrevComponentId: 3,
    },
];

const links = (): SettingsItemProps[] => {
    const settingsStore = useActionsCreators(settingsActions);

    return [
        {
            id: 1,
            title: "settings.links.profile",
            Icon: ProfileCircleIcon,
            backgroundColor: "#5B9BD985, #457BA9",
            Component: ProfilePage,
        },
        {
            id: 2,
            title: "settings.links.notifications",
            Icon: BellIcon,
            backgroundColor: "#DAB24D, #987724",
            Component: ProfilePage,
        },
        {
            id: 3,
            title: "settings.links.privacy",
            Icon: LockCircleIcon,
            backgroundColor: "#3EBF6E, #157E3A",
            Component: ProfilePage,
        },
        {
            id: 4,
            title: "settings.links.blockedUsers",
            Icon: AlertCircleIcon,
            backgroundColor: "#8A60E585, #6545A9",
            Component: ProfilePage,
        },
        {
            id: 5,
            title: "settings.links.language",
            Icon: GlobeIcon,
            backgroundColor: "#537AEF85, #3752A3",
            Component: ProfilePage,
        },
        {
            id: 6,
            title: "settings.links.deleteAccount",
            Icon: TrashIcon,
            backgroundColor: "#EFCBCF, #E86C6C",
            textColor: "#E86C6C, #E86C6C",
            iconColor: "#E86C6C, #E3E3FA",
            onClick: () => settingsStore.toggleDeleteAccountModal(true)
        },
    ]
};

/**
 * Interface for the `SettingsWindow` component.
 */
interface SettingsWindowProps {
    isOpened?: boolean;
    onClose?: () => void;
}

export const SettingsMainPage: FC = () => {
    const {t} = useTranslation();

    const user = useStateSelector((state) => state.user.current);
    const isAccountDeleteModalOpened = useStateSelector((state) => state.settings.isDeleteAccountModalOpened);

    const settingsStore = useActionsCreators(settingsActions);

    const [isImageOpened, setImageOpened] = useState<boolean>(false);
    const [isCopied, setCopied] = useState<boolean>(false);

    /**
     * Copies the current User's Username to Clipboard.
     */
    const copyUsername = (): void => {
        if (isCopied) return;

        navigator.clipboard.writeText(user.username);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const ImageGalleryPortal = () => {
        return createPortal(
            <ImageGallery
                onClose={() => setImageOpened(false)}
                images={[user.photoURL]}
                current={user.photoURL}
            />,
            document.body
        );
    }

    return (
        <>
            <AnimatePresence>
                {isImageOpened && <ImageGalleryPortal/>}
            </AnimatePresence>

            <AnimatePresence>
                {isCopied && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        className="absolute bottom-0 left-1/2 z-[3] -translate-x-1/2 p-4"
                    >
                        <div className="rounded-md bg-[#EAEDFA] p-4 shadow-md dark:bg-[#10182B]">
                            <p className="text-sm font-medium text-gray-800 dark:text-white">{t("settings.usernameCopied")}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <DeleteAccountModal
                isOpened={isAccountDeleteModalOpened}
                onClose={() => settingsStore.toggleDeleteAccountModal(false)}
            />

            <div
                className="mb-2 flex select-none items-center justify-between gap-2.5 border-b-[10px] border-b-[#CFD0D4] px-6 py-2 dark:border-b-[#2F384E65]">
                <Avatar
                    src={user.photoURL}
                    alt={user.username}
                    className="flex-none cursor-pointer rounded-full w-[60px] h-[60px]"
                    onClick={() => setImageOpened(true)}
                />

                <div className="flex flex-1 flex-col overflow-hidden [&>span]:truncate">
                    <span
                        title={concatenate(user.firstName, user.lastName)}>{concatenate(user.firstName, user.lastName)}</span>
                    <span
                        className="text-sm text-[#4C4C4C] dark:text-[#E3E3FA80]"
                        title={user.email}
                    >
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

            {links().map((link) => (
                <SettingsItem
                    {...link}
                    key={link.title}
                />
            ))}
        </>
    );
};

export const SettingsWindow = ({onClose}: SettingsWindowProps) => {
    const {t} = useTranslation();

    const activePageId = useStateSelector((state) => state.settings.activePageId);
    const activePage = pages.find((link) => link.id === activePageId);

    const Component = activePage?.Component ?? SettingsMainPage;
    const title = activePage?.title ?? t("settings.title").toString();

    return (
        <SettingsWindowLayout
            title={title}
            onClose={onClose}
        >
            <Component/>
        </SettingsWindowLayout>
    );
};
