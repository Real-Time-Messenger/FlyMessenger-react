import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";

/**
 * Interface for the {@link CopyBar} component.
 *
 * @interface CopyBarProps
 *
 * @property {boolean} isOpened - Whether the copy bar is opened or not.
 */
interface CopyBarProps {
    isOpened: boolean;
}

/**
 * Renders the bottom bar that appears when the user's username is copied to clipboard.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const CopyBar: FC<CopyBarProps> = ({ isOpened }) => {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isOpened && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-0 left-1/2 z-[3] -translate-x-1/2 p-4"
                >
                    <div className="rounded-md bg-[#EAEDFA] p-4 shadow-md dark:bg-[#10182B]">
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                            {t("settings.usernameCopied")}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
