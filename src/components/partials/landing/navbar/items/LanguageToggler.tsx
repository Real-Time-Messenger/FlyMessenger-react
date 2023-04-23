import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { GlobeIcon } from "@/components/icons";
import { languages } from "@/components/settings/pages/language/LanguagePage";
import classNames from "classnames";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { changeLanguage } from "i18next";
import { LanguageModal } from "@/components/partials/landing/navbar/items/LanguageModal";

/**
 * Language toggler button for mobile devices.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LanguageTogglerMobile: FC = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const { i18n } = useTranslation();

    return (
        <>
            <div className="relative flex cursor-pointer select-none items-center rounded-full text-[#161616] dark:text-white">
                <motion.div
                    onClick={() => setIsOpened(!isOpened)}
                    className="flex w-full cursor-pointer items-center gap-3 truncate rounded py-1.5 px-4 transition-colors"
                >
                    <GlobeIcon className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] stroke-[1.5]" />

                    <span className="truncate">
                        {languages[(i18n.resolvedLanguage as keyof typeof languages) || "et"].nativeName || null}
                    </span>
                </motion.div>
            </div>

            <LanguageModal isOpened={isOpened} onClose={() => setIsOpened(false)} />
        </>
    );
};

/**
 * Language toggler button for desktop devices.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LanguageToggler: FC = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const { i18n } = useTranslation();

    return (
        <div
            className={classNames(
                "relative flex w-[175px] cursor-pointer select-none items-center rounded-full border transition-colors dark:text-white",
                isOpened
                    ? "border-[#161616] dark:border-white"
                    : "group border-[#16161650] hover:border-[#161616] dark:border-[#4E5772] dark:hover:border-white",
            )}
        >
            <motion.div
                onClick={() => setIsOpened(!isOpened)}
                className={classNames(
                    "flex w-full cursor-pointer items-center gap-3 truncate rounded py-1.5 px-4 transition-colors",
                    isOpened
                        ? "text-[#161616] dark:text-white"
                        : "text-[#696969] group-hover:text-[#161616] dark:text-[#4E5772] dark:group-hover:text-white",
                )}
            >
                <GlobeIcon className="h-[20px] min-h-[20px] w-[20px] min-w-[20px] stroke-[1.5]" />

                <span className="truncate">
                    {languages[(i18n.resolvedLanguage as keyof typeof languages) || "et"].nativeName || null}
                </span>

                <ChevronDownIcon
                    className={classNames(
                        "ml-auto h-[16px] min-h-[16px] w-[16px] min-w-[16px] stroke-[1.5] transition-transform duration-150 ease-in",
                        isOpened && "rotate-180",
                    )}
                />
            </motion.div>

            <AnimatePresence>
                {isOpened && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 top-[60px] z-[1] cursor-default bg-black"
                            onClick={() => setIsOpened(false)}
                        />

                        <motion.div
                            className="absolute top-16 right-0 z-[2] w-full overflow-hidden rounded-xl bg-[#F8F9FE] shadow-lg transition-colors dark:bg-[#151F38]"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {Object.keys(languages).map((language) => (
                                <div
                                    key={language}
                                    onClick={() => changeLanguage(language)}
                                    className={classNames(
                                        "flex p-2 px-4 transition-colors",
                                        language === i18n.resolvedLanguage
                                            ? "text-[#161616] dark:text-white"
                                            : "text-[#696969bb] hover:text-[#161616] dark:text-[#797D93] dark:hover:text-white",
                                    )}
                                >
                                    <span>{languages[language as keyof typeof languages].nativeName}</span>
                                </div>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
