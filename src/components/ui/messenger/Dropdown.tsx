import classNames from "classnames";
import { ClassNameProps } from "@/interfaces/ClassNameProps";
import { ComponentType, createContext, FC, ReactNode, SVGProps, useContext, useRef } from "react";
import { useOnClickOutside } from "@/hooks";
import { Switch } from "@/components/ui/messenger/Switch";
import { motion } from "framer-motion";
import { ChildrenProps } from "@/interfaces/ChildrenProps";

/**
 * Framer-Motion variants for the {@link Dropdown} component.
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
 * Props for the {@link Dropdown} component.
 *
 * @extends ClassNameProps
 *
 * @property {ReactNode} children - The children of the dropdown.
 * @property {boolean} isOpened - The flag that indicates whether the dropdown is opened.
 * @property {() => void} onClose - The callback for when the dropdown is closed.
 */
interface DropdownProps extends ClassNameProps {
    children: ReactNode;
    isOpened: boolean;
    onClose?: () => void;
}

/**
 * Props for the {@link SwitchItem} component.
 *
 * @property {string} label - The label of the switch item.
 * @property {ComponentType<SVGProps<SVGSVGElement>>} Icon - The icon of the switch item.
 * @property {() => void} onClick - The callback for when the switch item is clicked.
 * @property {boolean} checked - The flag that indicates whether the switch item is checked.
 */
interface SwitchDropdownItemProps {
    label: string;
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    onClick: () => void;
    checked: boolean;
    disabled?: boolean;
}

/**
 * Props for the {@link DropdownItem} component.
 *
 * @extends ChildrenProps
 * @extends ClassNameProps
 *
 * @property {() => void} onClick - The callback for when the dropdown item is clicked.
 */
interface DropdownItemProps extends ChildrenProps, ClassNameProps {
    onClick?: () => void;
}

const DropdownContext = createContext<{ onClose: () => void }>({
    onClose: () => {},
});

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
            className={classNames(
                "absolute z-[2] min-w-[150px] flex-col overflow-hidden rounded-lg bg-[#EAEDFA] py-2 shadow-lg dark:bg-[#10182B]",
                className,
            )}
        >
            <DropdownContext.Provider value={{ onClose: handler }}>{children}</DropdownContext.Provider>
        </motion.div>
    );
};

/**
 * A switch item for the {@link Dropdown} component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const SwitchItem: FC<SwitchDropdownItemProps> = ({ Icon, checked, label, onClick, disabled = false }) => {
    return (
        <div
            className={classNames(
                "flex cursor-pointer items-center justify-between py-2 px-3",
                disabled ? "cursor-not-allowed opacity-50" : "hover:bg-[#C1C1C165] dark:hover:bg-[#2F384E65]",
            )}
            onClick={!disabled ? onClick : () => {}}
        >
            <div className="flex items-center gap-3 text-[#4C4C4C] dark:text-[#B8BAF2]">
                <Icon className="h-6 w-6 stroke-[2] text-[#5B9BD9] dark:text-[#B8BAF2]" />
                <span className="mr-4">{label}</span>
            </div>

            <Switch checked={checked} onChange={onClick} disabled={disabled} />
        </div>
    );
};

/**
 * A dropdown item for the {@link Dropdown} component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
const DropdownItem: FC<DropdownItemProps> = ({ children, onClick, className }: DropdownItemProps) => {
    const { onClose } = useContext(DropdownContext);

    const handleClick = () => {
        if (onClick) onClick();

        onClose();
    };

    return (
        <div className={className} onClick={handleClick}>
            {children}
        </div>
    );
};

Dropdown.Item = DropdownItem;
Dropdown.SwitchItem = SwitchItem;
