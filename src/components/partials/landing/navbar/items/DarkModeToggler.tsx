import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { MoonIcon, SunIcon } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Dark mode toggler for mobile devices.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DarkModeTogglerMobile: FC = () => {
    const { t } = useTranslation();

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);
    const sidebarStore = useActionCreators(sidebarActions);

    return (
        <button
            className="flex items-center gap-3 py-2 px-4 text-[#161616] dark:text-white"
            onClick={() => sidebarStore.toggleDarkMode({ state: !isDarkMode })}
        >
            {isDarkMode ? (
                <SunIcon className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] stroke-[1.5]" />
            ) : (
                <MoonIcon className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] stroke-[1.5]" />
            )}

            <span>{t(`navbar.themes.${isDarkMode ? "light" : "dark"}`)}</span>
        </button>
    );
};

/**
 * Dark mode toggler for desktop devices.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DarkModeToggler = () => {
    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);
    const sidebarStore = useActionCreators(sidebarActions);

    return (
        <button
            className="flex cursor-pointer select-none items-center justify-center p-2 transition-colors hover:text-[#161616] dark:hover:text-white"
            onClick={() => sidebarStore.toggleDarkMode({ state: !isDarkMode })}
        >
            <AnimatePresence mode="wait">
                {isDarkMode ? (
                    <motion.div
                        key="dark"
                        initial={false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.1 }}
                    >
                        <SunIcon className="h-6 w-6 stroke-2" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="light"
                        initial={false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.1 }}
                    >
                        <MoonIcon className="h-6 w-6 stroke-2" />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
};
