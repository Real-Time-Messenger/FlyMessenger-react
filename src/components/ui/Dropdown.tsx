import classNames from "classnames";
import { motion } from "framer-motion";
import { ComponentType, FC, ReactNode, SVGProps, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { Switch } from "./Switch";

/**
 * Framer-Motion Variant for Dropdown Menu.
 */
export const dropdown = {
    closed: {
        opacity: 0,
        transform: "scale(0.95)",
        transition: {
            duration: 0.2,
        },
        transitionEnd: {
            display: "none",
        },
    },
    opened: {
        opacity: 1,
        transform: "scale(1)",
        display: "flex",
        transition: {
            duration: 0.2,
        },
    },
};


/**
 * Interface for the `Dropdown` component.
 */
interface DropdownProps extends ClassNameProps {
    children: ReactNode;
    isOpened: boolean;
    onClose?: () => void;
}

/**
 * Interface for `SwitchItem` in `Dropdown` component.
 */
interface SwitchDropdownItemProps {
    label: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    onClick: () => void;
    checked: boolean;
}

/**
 * Interface for the `DropdownItem` component.
 */
interface DropdownItemProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}

export const Dropdown = ({ isOpened, onClose, className, children }: DropdownProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const handler = onClose ?? (() => {});

    // Close the Dropdown when clicking outside of it.
    useOnClickOutside<HTMLDivElement>(ref, handler);

    return (
        <motion.div
            variants={dropdown}
            initial="closed"
            animate={isOpened ? "opened" : "closed"}
            ref={ref}
            className={classNames("absolute z-[2] min-w-[150px] flex-col overflow-hidden rounded-lg bg-[#EAEDFA] py-2 shadow-lg dark:bg-[#10182B]", className)}
        >
            {children}
        </motion.div>
    );
};

const SwitchItem: FC<SwitchDropdownItemProps> = ({ Icon, checked, label, onClick }: SwitchDropdownItemProps) => {
    return (
        <div
            className="flex cursor-pointer items-center justify-between py-2 px-3 hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]"
            onClick={onClick}
        >
            <div className="flex items-center gap-3 text-[#4C4C4C] dark:text-[#B8BAF2]">
                <Icon className="h-6 w-6 stroke-[2] text-[#5B9BD9] dark:text-[#B8BAF2]" />
                <span className="mr-4">{label}</span>
            </div>

            <Switch
                checked={checked!}
                onChange={onClick}
            />
        </div>
    );
};

const Item: FC<DropdownItemProps> = ({ children, onClick, className }: DropdownItemProps) => {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

Dropdown.Item = Item;
Dropdown.SwitchItem = SwitchItem;
