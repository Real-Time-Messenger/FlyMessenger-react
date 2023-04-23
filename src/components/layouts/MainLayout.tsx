import { FC } from "react";
import { ProtectedRoute } from "@/hoc/ProtectedRoute";
import { SettingsWindow } from "@/components/settings/SettingsWindow";
import { MessagingLayout } from "@/components/layouts/MessagingLayout";
import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { SidebarNavigation } from "@/components/partials/messenger/sidebar/SidebarNavigation";

/**
 * Layout for messenger page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const MainLayout: FC<ChildrenProps> = ({ children }) => {
    return (
        <ProtectedRoute>
            <div className="flex h-screen w-screen text-[#161616] dark:text-[#E3E3FA]">
                <SettingsWindow />

                <SidebarNavigation />

                <MessagingLayout>{children}</MessagingLayout>
            </div>
        </ProtectedRoute>
    );
};
