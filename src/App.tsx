import { useTranslation } from "react-i18next";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/lib/router";
import { useDocumentTitle } from "@/hooks";

/**
 * The main React component that renders the application. Also, in this component, we initialize the user's theme and set it.
 */
export default function App() {
    const { t } = useTranslation();

    const sidebarStore = useActionCreators(sidebarActions);
    const currentUser = useStateSelector((state) => state.user.current);

    useDocumentTitle(t("global.title"));

    useEffect(() => {
        const cookies = document.cookie.split("; ");
        const darkModeCookie = cookies.find((cookie) => cookie.includes("darkMode"));
        if (darkModeCookie) {
            const isDarkMode = darkModeCookie.split("=")[1];
            if (isDarkMode === "true") {
                sidebarStore.toggleDarkMode({ state: true });
            } else {
                sidebarStore.toggleDarkMode({ state: false });
            }
        }
    }, [currentUser, sidebarStore, t]);

    return <RouterProvider router={router} />;
}
