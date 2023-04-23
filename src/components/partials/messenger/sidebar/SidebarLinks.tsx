import { SidebarItemProps } from "@/interfaces/components/SidebarItemProps";
import { useActionCreators, useAppDispatch, useStateSelector } from "@/stores/hooks";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { settingsActions } from "@/stores/slices/ui/settings/settings";
import { dialogActions } from "@/stores/slices/dialogs/dialogs";
import { searchActions } from "@/stores/slices/search/search";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "@/hoc/WebSocketProvider";
import { logoutUser, updateUser } from "@/stores/slices/user/user";
import {
    ConversationIcon,
    DialogIcon,
    GlobeIcon,
    LogoutIcon,
    SettingsIcon,
    SupportIcon,
    ToggleLeftIcon,
} from "@/components/icons";
import { DialogMenu } from "@/components/partials/messenger/sidebar/menus/DialogMenu";
import { SidebarItem } from "@/components/partials/messenger/sidebar/items/SidebarItem";

/**
 * The links for the {@link SidebarLinks}.
 */
const Links = (): SidebarItemProps[] => {
    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

    const sidebarStore = useActionCreators(sidebarActions);
    const settingsStore = useActionCreators(settingsActions);
    const dialogStore = useActionCreators(dialogActions);
    const searchStore = useActionCreators(searchActions);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { disconnect } = useWebSocket();

    const resetStores = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                disconnect();

                searchStore.reset();
                settingsStore.reset();
                sidebarStore.reset();
                dialogStore.reset();

                navigate("/m/login");
            });
    };

    return [
        {
            label: "sidebar.links.dialogs",
            Icon: DialogIcon,
            Component: DialogMenu,
        },
        {
            label: "sidebar.links.conversations",
            Icon: ConversationIcon,
            callback: () => alert("Not implemented yet"),
        },
        {
            label: "sidebar.links.groups",
            Icon: GlobeIcon,
            callback: () => alert("Not implemented yet"),
        },
        {
            label: "sidebar.links.support",
            Icon: SupportIcon,
            callback: () => alert("Not implemented yet"),
        },
        {
            label: "sidebar.links.settings",
            Icon: SettingsIcon,
            callback: () => settingsStore.toggleSettings(),
        },
        {
            label: isDarkMode ? "sidebar.links.lightMode" : "sidebar.links.darkMode",
            Icon: ToggleLeftIcon,
            callback: () => {
                sidebarStore.toggleDarkMode({ state: !isDarkMode });
                dispatch(updateUser({ theme: isDarkMode ? "light" : "dark" }));
            },
            className: "dark-mode-button",
        },
        {
            label: "sidebar.links.logout",
            Icon: LogoutIcon,
            callback: () => resetStores(),
            backgroundColor: "#EFCBCF, #252132",
            hoverBackgroundColor: "#E86C6C, #E86C6C",
            iconColor: "#E86C6C, #E86C6C",
            hoverIconColor: "#EFCBCF, #FFFFFF",
            textColor: "#E86C6C, #E86C6C",
        },
    ];
};

/**
 * Renders the sidebar links.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SidebarLinks = () => {
    const linksArr = Links();
    const activeLinkLabel = useStateSelector((state) => state.sidebar.activeLink);
    const activeLink = linksArr.find((link) => link.label === activeLinkLabel) || linksArr[0];

    return (
        <div className="flex w-full flex-col items-center justify-center">
            {linksArr.map((link) => (
                <SidebarItem key={link.label} reference={link} activeLink={activeLink} {...link} />
            ))}
        </div>
    );
};
