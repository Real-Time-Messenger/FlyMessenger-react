import {ComponentType, SVGProps, useRef} from "react";
import {useHover} from "../../../hooks/useHover";
import {sidebarActions} from "../../../stores/slices/ui/sidebar/sidebar";
import {useActionsCreators, useStateSelector} from "../../../stores/hooks";
import classNames from "classnames";
import {motion} from "framer-motion";
import {textSwipe} from "./SidebarContent";
import {useTranslation} from "react-i18next";

const defaultColors = {
    backgroundColor: "#C4D2F0, #151F38",
    hoverBackgroundColor: "#8DB8E4, #416D9C50",
    activeBackgroundColor: "#5B9BD9, #416D9C",
    iconColor: "#4C4C4C, #7B7B7B",
    hoverIconColor: "#303030, #E3E3FA",
    activeIconColor: "#161616, #E3E3FA",
    textColor: "#4C4C4C, #E3E3FA",
};

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

type ReferencedSidebarLinkProps = SidebarItemProps & {
    reference?: SidebarItemProps;
    activeLink?: SidebarItemProps;
}

interface IconProps {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    isActive: boolean;
    isHovered: boolean;
    colors: typeof defaultColors;
}

interface LabelProps {
    label: string;
    isSidebarOpened: boolean;
    colors: typeof defaultColors;
}

export const splitColors = (colors: string): string[] => {
    return colors.split(",").map((colors) => colors.trim());
};

export const buildBackgroundColors = (bgColors: string, textColors?: string): string => {
    const bg = splitColors(bgColors);

    if (!textColors) return `bg-[${bg[0]}] dark:bg-[${bg[1]}]`;

    const text = splitColors(textColors);
    return `bg-[${bg[0]}] dark:bg-[${bg[1]}] text-[${text[0]}] dark:text-[${text[1]}]`;
};

export const buildTextColors = (textColors: string): string => {
    const text = splitColors(textColors);

    return `text-[${text[0]}] dark:text-[${text[1]}]`;
};


const IconComponent = ({Icon, isActive, isHovered, colors}: IconProps) => {
    const backgroundColors = buildBackgroundColors(colors.backgroundColor, colors.iconColor);
    const hoverBackgroundColors = buildBackgroundColors(colors.hoverBackgroundColor, colors.hoverIconColor);
    const activeBackgroundColors = buildBackgroundColors(colors.activeBackgroundColor, colors.activeIconColor);

    const hoverColors = isHovered ? hoverBackgroundColors : backgroundColors;
    const activeColors = isActive ? activeBackgroundColors : hoverColors;

    const defaultClasses = classNames("p-2 rounded-xl transition-colors duration-250 stroke-[2]", activeColors);

    return <div className={defaultClasses}><Icon className="h-5 w-5"/></div>;
}

const LabelComponent = ({label, isSidebarOpened, colors}: LabelProps) => {
    const {t} = useTranslation();
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
}

export const SidebarItem = ({
                                callback,
                                className,
                                Component,
                                Icon,
                                label,
                                activeLink,
                                reference = undefined,
                                ...props
                            }: ReferencedSidebarLinkProps) => {
    const isSidebarOpened = useStateSelector((state) => state.sidebar.isSidebarOpened);
    const isActive = activeLink === reference;

    const actions = useActionsCreators(sidebarActions);

    const hoverRef = useRef<HTMLDivElement>(null);
    const isHovered = useHover(hoverRef);
    const colors = {...defaultColors, ...props};

    const handleClick = (): void => {
        if (callback) {
            callback();
            return;
        }

        if (reference) {
            actions.toggleSidebarLink({label});
            return;
        }
    };

    return (
        <div
            className={classNames("relative flex w-full cursor-pointer select-none items-center justify-between gap-6 overflow-hidden px-[17px] py-1.5 hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]", className)}
            ref={hoverRef}
            onClick={handleClick}
        >
            <IconComponent Icon={Icon} isActive={isActive} isHovered={isHovered} colors={colors}/>

            <LabelComponent label={label} isSidebarOpened={isSidebarOpened} colors={colors}/>
        </div>
    );
}