import {FC, ReactNode, useEffect} from "react";
import { SidebarNavigation } from "./items/SidebarNavigation";
import { MessagingWindow } from "../window/MessagingWindow";
import {useStateSelector} from "../../stores/hooks";
import {createPortal} from "react-dom";
import {SettingsWindow} from "../settings/SettingsWindow";
import {AnimatePresence} from "framer-motion";
import { ProtectedRoute } from "../../hoc/ProtectedRoute";
import {useTranslation} from "react-i18next";

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({children}: MainLayoutProps) => {
    const {t} = useTranslation();

    const isSettingsOpened = useStateSelector(state => state.settings.isOpened);

    useEffect(() => {
        document.title = t("global.title")
    });

    return (
       <ProtectedRoute>
           <div className="flex h-screen w-screen text-[#161616] dark:text-[#E3E3FA]">
               <AnimatePresence>
                   {isSettingsOpened && <SettingsWindow />}
               </AnimatePresence>

               <SidebarNavigation />

               <MessagingWindow>{children}</MessagingWindow>
           </div>
       </ProtectedRoute>
    )
}