import { motion } from "framer-motion";
import { defaultColors, splitColors } from "@/components/partials/messenger/sidebar/items/SidebarItem";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { textSwipe } from "@/components/partials/messenger/sidebar/SidebarContent";
import classNames from "classnames";

/**
 * Default props for the {@link LabelComponent} label component.
 *
 * @interface LabelProps
 *
 * @property {string} label - The label of the sidebar item.
 * @property {boolean} isSidebarOpened - The opened state of the sidebar.
 * @property {typeof defaultColors} colors - The colors of the sidebar item.
 */
interface LabelProps {
    label: string;
    isSidebarOpened: boolean;
    colors: typeof defaultColors;
}

/**
 * The label component of the sidebar item.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const LabelComponent: FC<LabelProps> = ({ label, isSidebarOpened, colors }) => {
    const { t } = useTranslation();
    const textColors = splitColors(colors.textColor);

    return (
        <motion.span
            variants={textSwipe}
            initial={false}
            animate={isSidebarOpened ? "visible" : "hidden"}
            className={classNames("flex-1 whitespace-nowrap", `text-[${textColors[0]}] dark:text-[${textColors[1]}]`)}
        >
            {t(label)}
        </motion.span>
    );
};
