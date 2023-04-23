import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";
import { useStateSelector } from "@/stores/hooks";
import { useTranslation } from "react-i18next";

/**
 * Props of the {@link AdvantageItem} component.
 *
 * @interface AdvantageItemProps
 *
 * @property {string} translationKey - Translation key (to be used with the i18n library).
 * @property {string} lightImage - Light image source.
 * @property {string} darkImage - Dark image source.
 */
interface AdvantageItemProps {
    translationKey: string;
    lightImage: string;
    darkImage: string;
}

/**
 * The advantage item component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const AdvantageItem: FC<AdvantageItemProps> = ({ translationKey, darkImage, lightImage }) => {
    const { t } = useTranslation();

    const isDarkMode = useStateSelector((state) => state.sidebar.isDarkMode);

    return (
        <div className="flex max-w-[224px] flex-col items-center gap-3 text-center">
            <div className="h-[120px] w-[120px]">
                <AnimatePresence>
                    {isDarkMode ? (
                        <motion.img
                            src={darkImage}
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    ) : (
                        <motion.img
                            src={lightImage}
                            className="w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    )}
                </AnimatePresence>
            </div>

            <div className="flex flex-col gap-2">
                <span className="text-xl">{t(`pages.main.functions.${translationKey}.title`)}</span>
                <span className="text-[#7B7B7B] transition-colors dark:text-[#797D93]">
                    {t(`pages.main.functions.${translationKey}.description`)}
                </span>
            </div>
        </div>
    );
};
