import { ComponentType, SVGProps } from "react";

/**
 * Props for the {@link SidebarItem} component.
 *
 * @interface SidebarItemProps
 *
 * @property {string} label - The label of the sidebar item.
 * @property {ComponentType<SVGProps<SVGSVGElement>>} Icon - The icon of the sidebar item.
 * @property {() => void} [callback] - The callback function of the sidebar item.
 * @property {string} [className] - The class name of the sidebar item.
 * @property {ComponentType} [Component] - The component of the sidebar item.
 * @property {string} [backgroundColor] - The background color of the sidebar item.
 * @property {string} [hoverBackgroundColor] - The hover background color of the sidebar item.
 * @property {string} [activeBackgroundColor] - The active background color of the sidebar item.
 * @property {string} [iconColor] - The icon color of the sidebar item.
 * @property {string} [hoverIconColor] - The hover icon color of the sidebar item.
 * @property {string} [activeIconColor] - The active icon color of the sidebar item.
 * @property {string} [textColor] - The text color of the sidebar item.
 */
export interface SidebarItemProps {
    label: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    callback?: () => void;
    className?: string;
    Component?: ComponentType;
    backgroundColor?: string;
    hoverBackgroundColor?: string;
    activeBackgroundColor?: string;
    iconColor?: string;
    hoverIconColor?: string;
    activeIconColor?: string;
    textColor?: string;
}
