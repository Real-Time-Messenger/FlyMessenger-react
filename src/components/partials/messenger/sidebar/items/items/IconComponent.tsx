import { ComponentType, FC, SVGProps } from "react";
import classNames from "classnames";
import { buildBackgroundColors, defaultColors } from "@/components/partials/messenger/sidebar/items/SidebarItem";

/**
 * Default props for the {@link SidebarItem} icon component.
 *
 * @interface IconProps
 *
 * @property {ComponentType<SVGProps<SVGSVGElement>>} Icon - The icon of the sidebar item.
 * @property {boolean} isActive - The active state of the sidebar item.
 * @property {boolean} isHovered - The hovered state of the sidebar item.
 * @property {typeof defaultColors} colors - The colors of the sidebar item.
 */
interface IconProps {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    isActive: boolean;
    isHovered: boolean;
    colors: typeof defaultColors;
}

/**
 * The icon component of the sidebar item.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const IconComponent: FC<IconProps> = ({ Icon, isActive, isHovered, colors }) => {
    const backgroundColors = buildBackgroundColors(colors.backgroundColor, colors.iconColor);
    const hoverBackgroundColors = buildBackgroundColors(colors.hoverBackgroundColor, colors.hoverIconColor);
    const activeBackgroundColors = buildBackgroundColors(colors.activeBackgroundColor, colors.activeIconColor);

    const hoverColors = isHovered ? hoverBackgroundColors : backgroundColors;
    const activeColors = isActive ? activeBackgroundColors : hoverColors;

    const defaultClasses = classNames("p-2 rounded-xl transition-colors stroke-[2]", activeColors);

    return (
        <div className={defaultClasses}>
            <Icon className="h-5 w-5" />
        </div>
    );
};
