import { FC, useRef } from "react";
import classNames from "classnames";
import { useActionCreators, useStateSelector } from "@/stores/hooks";
import { sidebarActions } from "@/stores/slices/ui/sidebar/sidebar";
import { useHover } from "@/hooks";
import { SidebarItemProps } from "@/interfaces/components/SidebarItemProps";
import { LabelComponent } from "./items/LabelComponent";
import { IconComponent } from "./items/IconComponent";

/**
 * The default colors for the sidebar item.
 */
export const defaultColors = {
    backgroundColor: "#C4D2F0, #151F38",
    hoverBackgroundColor: "#8DB8E4, #416D9C50",
    activeBackgroundColor: "#5B9BD9, #416D9C",
    iconColor: "#4C4C4C, #7B7B7B",
    hoverIconColor: "#303030, #E3E3FA",
    activeIconColor: "#161616, #E3E3FA",
    textColor: "#4C4C4C, #E3E3FA",
};

/**
 * Interface for the {@link SidebarItem} component, which contains the sidebar item as a reference.
 *
 * @interface ReferencedSidebarLinkProps
 *
 * @extends {SidebarItemProps}
 *
 * @property {SidebarItemProps} [reference] - The reference of the sidebar item.
 * @property {SidebarItemProps} [activeLink] - The active link of the sidebar item.
 */
interface ReferencedSidebarLinkProps extends SidebarItemProps {
    reference?: SidebarItemProps;
    activeLink?: SidebarItemProps;
}

/**
 * Splits the colors into an array.
 *
 * @param {string} colors - The colors to split.
 *
 * @returns {string[]} - The split colors.
 */
export const splitColors = (colors: string): string[] => {
    return colors.split(",").map((colors) => colors.trim());
};

/**
 * Builds the background colors for the sidebar item.
 *
 * @param {string} bgColors - The background colors.
 * @param {string} [textColors] - The text colors.
 *
 * @returns {string} - The background colors.
 */
export const buildBackgroundColors = (bgColors: string, textColors?: string): string => {
    const bg = splitColors(bgColors);

    if (!textColors) return `bg-[${bg[0]}] dark:bg-[${bg[1]}]`;

    const text = splitColors(textColors);
    return `bg-[${bg[0]}] dark:bg-[${bg[1]}] text-[${text[0]}] dark:text-[${text[1]}]`;
};

/**
 * Builds the text colors for the sidebar item.
 *
 * @param {string} textColors - The text colors.
 *
 * @returns {string} - The text colors.
 */
export const buildTextColors = (textColors: string): string => {
    const text = splitColors(textColors);

    return `text-[${text[0]}] dark:text-[${text[1]}]`;
};

/**
 * Renders the sidebar item with icon and animated label (shown only when the sidebar is opened).
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SidebarItem: FC<ReferencedSidebarLinkProps> = ({
    callback,
    className,
    Icon,
    label,
    activeLink,
    reference = undefined,
    ...restColors
}) => {
    const isSidebarOpened = useStateSelector((state) => state.sidebar.isSidebarOpened);
    const isActive = activeLink === reference;

    const actions = useActionCreators(sidebarActions);

    const hoverRef = useRef<HTMLDivElement>(null);

    const isHovered = useHover(hoverRef);

    const colors = { ...defaultColors, ...restColors };

    /**
     * Handles the click on the sidebar item.
     */
    const handleClick = (): void => {
        if (callback) {
            callback();
            return;
        }

        if (reference) {
            actions.toggleSidebarLink({ label });
            return;
        }
    };

    return (
        <div
            className={classNames(
                "relative flex w-full cursor-pointer select-none items-center justify-between gap-6 overflow-hidden px-[17px] py-1.5 hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]",
                className,
            )}
            ref={hoverRef}
            onClick={handleClick}
        >
            <IconComponent Icon={Icon} isActive={isActive} isHovered={isHovered} colors={colors} />

            <LabelComponent label={label} isSidebarOpened={isSidebarOpened} colors={colors} />
        </div>
    );
};
