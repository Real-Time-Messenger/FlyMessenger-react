import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { settingsActions } from "@/stores/slices/ui/settings/settings";
import { useKeyPress } from "@/hooks";
import { DarkenedLayout } from "@/components/layouts/extra/DarkenedLayout";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon, CloseIcon } from "@/components/icons";
import classNames from "classnames";

/**
 * Interface for {@link SettingsWindowLayout} component.
 *
 * @interface SettingsWindowLayoutProps
 *
 * @property {string} [title] - Title of the settings window.
 * @property {() => void} [onClose] - Callback function that is called when the settings window is closed.
 */
interface SettingsWindowLayoutProps extends ChildrenProps {
    title?: string;
    onClose?: () => void;
}

/**
 * Framer-Motion variants for {@link SettingsWindowLayout} component.
 */
const pageToggle = {
    hidden: {
        x: 20,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.05,
        },
    },
    exit: {
        x: -20,
        opacity: 0,
        transition: {
            duration: 0.075,
        },
    },
};

/**
 * Layout for the component from the settings. Render the component that is currently active (in settings).
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SettingsWindowLayout: FC<SettingsWindowLayoutProps> = ({ title, children }) => {
    const { t } = useTranslation();

    const settingsWindowRef = useRef<HTMLDivElement>(null);
    const settingsContainerRef = useRef<HTMLDivElement>(null);

    const hasActivePage = !!useStateSelector((state) => state.settings.activePageId);

    const settingsStore = useActionCreators(settingsActions);

    useKeyPress("Escape", () => closeWindow());

    /**
     * Closes the settings window.
     */
    const closeWindow = (): void => {
        const isImageGalleryOpen = document.querySelector(".image-gallery") !== null;
        const isModalOpen = document.querySelector(".modal-item") !== null;

        if (isImageGalleryOpen || isModalOpen) return;

        settingsStore.toggleSettings();
        setTimeout(() => {
            settingsStore.setActivePage(undefined);
        }, 250);
    };

    /**
     * Goes back to the previous page.
     */
    const goBack = (): void => {
        settingsStore.goBack();
    };

    /**
     * Sets the overflow of the settings window (to prevent overflow when the animation is playing).
     */
    const setOverflow = (state: boolean): void => {
        if (!settingsWindowRef.current) return;

        if (state) settingsWindowRef.current.classList.add("overflow-hidden");
        else settingsWindowRef.current.classList.remove("overflow-hidden");
    };

    return (
        <motion.div
            key="settings-window"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-[3] h-screen w-screen"
        >
            <DarkenedLayout isDarkened={true}>
                <div
                    className="settings-window flex w-[375px] flex-col items-center rounded-md bg-[#EAEDFA] pt-2 pb-3 dark:bg-[#10182B]"
                    ref={settingsWindowRef}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            variants={pageToggle}
                            key={title}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex w-full flex-col items-center"
                            ref={settingsContainerRef}
                            onAnimationStart={() => setOverflow(true)}
                            onAnimationComplete={() => setOverflow(false)}
                        >
                            <div className="flex w-full select-none items-center justify-between p-1.5 pt-0">
                                <div className="flex items-center gap-3">
                                    {hasActivePage && (
                                        <button
                                            className="rounded-full p-2 transition-colors hover:bg-[#CFD0D4] dark:hover:bg-[#2F384E]"
                                            onClick={goBack}
                                        >
                                            <ArrowLeftIcon className="h-5 w-5 stroke-2" />
                                        </button>
                                    )}

                                    <span
                                        className={classNames(
                                            "text-lg text-[#303030] dark:text-[#E3E3FA]",
                                            !hasActivePage && "px-2",
                                        )}
                                    >
                                        {(title && t(title)) || t("settings.title")}
                                    </span>
                                </div>

                                <button
                                    className="rounded-full p-2 transition-colors hover:bg-[#CFD0D4] dark:hover:bg-[#2F384E]"
                                    onClick={() => closeWindow()}
                                >
                                    <CloseIcon className="h-5 w-5 stroke-2" />
                                </button>
                            </div>

                            <div className="w-full">{children}</div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </DarkenedLayout>
        </motion.div>
    );
};
