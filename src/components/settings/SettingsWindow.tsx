import { useTranslation } from "react-i18next";
import { useStateSelector } from "@/stores/hooks";
import { AnimatePresence } from "framer-motion";
import { SettingsWindowLayout } from "@/components/layouts/SettingsWindowLayout";
import { pages } from "@/components/settings/lib/pages";
import { MainPage } from "@/components/settings/pages";
import { FC } from "react";

/**
 * Properties of the {@link SettingsWindow} component.
 *
 * @interface SettingsWindowProps
 *
 * @property {boolean} [isOpened] - Whether the settings window is opened or not.
 * @property {() => void} [onClose] - Callback function that is called when the settings window is closed.
 */
interface SettingsWindowProps {
    isOpened?: boolean;
    onClose?: () => void;
}

/**
 * Renders the settings window.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SettingsWindow: FC<SettingsWindowProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const isSettingsOpened = useStateSelector((state) => state.settings.isOpened);

    const activePageId = useStateSelector((state) => state.settings.activePageId);
    const activePage = pages.find((link) => link.id === activePageId);

    const Component = activePage?.Component ?? MainPage;
    const title = activePage?.title ?? t("settings.title").toString();

    return (
        <AnimatePresence>
            {isSettingsOpened && (
                <SettingsWindowLayout title={title} onClose={onClose}>
                    <Component />
                </SettingsWindowLayout>
            )}
        </AnimatePresence>
    );
};
