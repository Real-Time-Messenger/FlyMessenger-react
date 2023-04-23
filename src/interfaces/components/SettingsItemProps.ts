import { ComponentType, ReactNode, SVGProps } from "react";

/**
 * Interface for the item of the settings menu.
 *
 * @interface SettingsItemProps
 *
 * @property {number} id - The id of the item (needed for the navigation).
 * @property {string} title - The title of the item.
 * @property {string | ReactNode} subtitle - The subtitle of the item.
 * @property {ComponentType<SVGProps<SVGElement>>} Icon - The icon of the item.
 * @property {string} backgroundColor - The background color of the item.
 * @property {string} darkBackgroundColor - The background color of the item in dark mode.
 * @property {string} textColor - The text color of the item.
 * @property {string} darkTextColor - The text color of the item in dark mode.
 * @property {string} iconColor - The icon color of the item.
 * @property {string} darkIconColor - The icon color of the item in dark mode.
 * @property {() => void} onClick - The function that will be called when the item is clicked.
 * @property {ComponentType} Component - The component that will be rendered when the item is clicked.
 * @property {number} PrevComponentId - The id of the previous component.
 * @property {boolean} disabled - If the item is disabled.
 */
export interface SettingsItemProps {
    id?: number;
    title: string;
    subtitle?: string | ReactNode;
    Icon: ComponentType<SVGProps<SVGElement>>;
    backgroundColor?: string;
    darkBackgroundColor?: string;
    textColor?: string;
    darkTextColor?: string;
    iconColor?: string;
    darkIconColor?: string;
    onClick?: () => void;
    Component?: ComponentType;
    PrevComponentId?: number;
    disabled?: boolean;
}
