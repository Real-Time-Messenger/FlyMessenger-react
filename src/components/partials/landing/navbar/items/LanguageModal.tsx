import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { languages } from "@/components/settings/pages/language/LanguagePage";
import { changeLanguage } from "i18next";
import classNames from "classnames";
import { ModalProps } from "@/interfaces/components/ModalProps";

/**
 * Language modal for mobile devices.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LanguageModal: FC<ModalProps> = ({ onClose, isOpened }) => {
    const { i18n } = useTranslation();

    /**
     * Handler for language change.
     *
     * @param {string} language - Language to change to.
     */
    const toggleLanguage = async (language: string): Promise<void> => {
        await changeLanguage(language);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpened && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0"
                >
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose} />

                    <div className="fixed top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2">
                        <div className="w-[300px] rounded-lg bg-white p-4 shadow-lg dark:bg-[#151F38]">
                            <div className="flex flex-col gap-2">
                                {Object.keys(languages).map((language) => (
                                    <div
                                        key={language}
                                        onClick={() => toggleLanguage(language)}
                                        className={classNames(
                                            "flex py-2 px-4 transition-colors",
                                            language === i18n.resolvedLanguage
                                                ? "text-[#161616] dark:text-white"
                                                : "text-[#696969bb] hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white",
                                        )}
                                    >
                                        <span>{languages[language as keyof typeof languages].nativeName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
