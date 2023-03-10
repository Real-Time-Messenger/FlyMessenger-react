import {FC, ReactNode, useContext, useEffect} from "react";
import {SidebarNavigation} from "./items/messanger/SidebarNavigation";
import {MessagingWindow} from "../window/MessagingWindow";
import {useStateSelector} from "../../stores/hooks";
import {SettingsWindow} from "../settings/SettingsWindow";
import {AnimatePresence} from "framer-motion";
import {ProtectedRoute} from "../../hoc/ProtectedRoute";
import {useTranslation} from "react-i18next";
import {useOnlineStatus} from "../../hooks/useOnlineStatus";
import {useWebSocket, WebSocketContext} from "../../hoc/WebSocketProvider";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({children}: MainLayoutProps) => {
    const {t} = useTranslation();

    const isSettingsOpened = useStateSelector(state => state.settings.isOpened);

    useEffect(() => {
        document.title = t("global.title")
    }, []);

    return (
        <ProtectedRoute>
            <div className="flex h-screen w-screen text-[#161616] dark:text-[#E3E3FA]">
                <AnimatePresence>
                    {isSettingsOpened && <SettingsWindow/>}
                </AnimatePresence>

                <SidebarNavigation/>

                <MessagingWindow>{children}</MessagingWindow>
            </div>
        </ProtectedRoute>
    )
}