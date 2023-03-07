import {SidebarItem, SidebarItemProps} from "./SidebarItem";
import {useActionsCreators, useAppDispatch, useStateSelector} from "../../../../stores/hooks";
import { DialogIcon, ConversationIcon, GlobeIcon,SupportIcon,SettingsIcon,ToggleLeftIcon,LogoutIcon } from "../../../icons";
import {sidebarActions} from "../../../../stores/slices/ui/sidebar/sidebar";
import { DialogsMenu } from "../../../list/pages/DialogsMenu";
import {settingsActions} from "../../../../stores/slices/ui/settings/settings";
import {logoutUser, updateUser, userActions} from "../../../../stores/slices/user/user";
import {useNavigate} from "react-router-dom";
import {dialogsActions} from "../../../../stores/slices/dialogs/dialogs";
import {searchActions} from "../../../../stores/slices/search/search";

export const links = (isDarkMode: boolean): SidebarItemProps[] => {

    const sidebarStore = useActionsCreators(sidebarActions);
    const settingsStore = useActionsCreators(settingsActions);
    const dialogsStore = useActionsCreators(dialogsActions);
    const searchStore = useActionsCreators(searchActions);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const resetStores = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                searchStore.reset();
                settingsStore.reset();
                sidebarStore.reset();
                dialogsStore.reset();

                navigate("/m/login");
            });
    }

    return [
        {
            label: "sidebar.links.dialogs",
            Icon: DialogIcon,
            Component: DialogsMenu,
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
                sidebarStore.toggleDarkMode({state: !isDarkMode});
                dispatch(updateUser({theme: isDarkMode ? "light" : "dark"}));
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
    ]
}

export const SidebarLinks = () => {
    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);
    const linksArr = links(isDarkMode);
    const activeLinkLabel = useStateSelector((state) => state.sidebar.activeLink);
    const activeLink = linksArr.find((link) => link.label === activeLinkLabel) || linksArr[0];

    return (
        <div className="flex w-full flex-col items-center justify-center">
            {linksArr.map((link) => (
                <SidebarItem key={link.label} reference={link} activeLink={activeLink} {...link} />
            ))}
        </div>
    );
}