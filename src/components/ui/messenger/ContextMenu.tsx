import { AnimatePresence, motion } from "framer-motion";
import { PositionProps } from "./dialog/DialogItem";
import { ComponentType, createContext, SVGProps, useRef, MouseEvent, FC, useContext } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useHover, useOnClickOutside } from "@/hooks";
import classNames from "classnames";
import { ChevronRightIcon } from "../../icons";
import { ChildrenProps } from "@/interfaces/ChildrenProps";

/**
 * Props for the {@link ContextMenu} component.
 *
 * @extends ChildrenProps
 *
 * @property {() => void} onClose - The callback for when the context menu is closed.
 * @property {PositionProps} position - The position of the context menu.
 * @property {boolean} isOpened - The flag that indicates whether the context menu is opened.
 */
interface ContextMenuProps extends ChildrenProps {
    onClose: () => void;
    position: PositionProps;
    isOpened: boolean;
}

/**
 * Props for the {@link ContextMenuItem} component.
 *
 * @extends VariantProps<typeof itemCva>
 * @extends ChildrenProps
 *
 * @property {() => void} onClick - The callback for when the context menu item is clicked.
 * @property {ComponentType<SVGProps<SVGElement>>} Icon - The icon of the context menu item.
 * @property {string} label - The label of the context menu item.
 */
interface ContextMenuItemProps extends VariantProps<typeof itemCva>, Partial<ChildrenProps> {
    onClick?: () => void;
    Icon: ComponentType<SVGProps<SVGElement>>;
    label: string;
}

/**
 * Framer-Motion variants for the {@link ContextMenu} background.
 */
const contextParentWindow = {
    visible: {
        opacity: 1,
        display: "block",
        transition: {
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
        },
        transitionEnd: {
            display: "none",
        },
    },
};

/**
 * Framer-Motion variants for the {@link ContextMenu} component.
 */
const contextMenu = {
    hidden: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.2,
        },
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
        },
    },
    exit: {
        opacity: 0,
        scale: 0,
        transition: {
            duration: 0.2,
        },
    },
};

/**
 * Framer-Motion variants for the {@link ContextMenuItem} component.
 */
const itemCva = cva("", {
    variants: {
        variant: {
            primary: "text-[#4C4C4C] [&>svg]:text-[#5B9BD9] dark:text-[#B8BAF2] dark:[&>svg]:text-[#B8BAF2]",
            danger: "text-[#E86C6C] dark:text-[#F56565]",
            success: "text-[#69A55B] dark:text-[#48BB78]",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

/**
 * React context for the {@link ContextMenu} component.
 */
const ContextMenuContext = createContext<Pick<ContextMenuProps, "onClose">>({
    onClose: () => {},
});

/**
 * Renders a context menu with user-defined items.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ContextMenu = ({ onClose, position, isOpened, children }: ContextMenuProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, onClose);

    /**
     * Handles the closing event of the context menu.
     *
     * @param {MouseEvent<HTMLDivElement>} event - The event that triggered the closing.
     */
    const handleClose = (event: MouseEvent<HTMLDivElement>): void => {
        event.preventDefault();

        if (ref.current?.contains(event.target as Node)) return;

        onClose();
    };

    return (
        <motion.div
            className="absolute top-0 left-0 z-[3] h-screen w-screen"
            variants={contextParentWindow}
            initial={false}
            animate={isOpened ? "visible" : "exit"}
            onClick={(event) => handleClose(event)}
        >
            <motion.div
                variants={contextMenu}
                initial="hidden"
                animate={isOpened ? "visible" : "exit"}
                className="absolute z-[4] rounded-lg bg-[#EAEDFA] py-1.5 shadow-xl dark:bg-[#1F2B49]"
                ref={ref}
                style={{ top: position.y, left: position.x }}
            >
                <ContextMenuContext.Provider value={{ onClose }}>{children}</ContextMenuContext.Provider>
            </motion.div>
        </motion.div>
    );
};

/**
 * Item of the {@link ContextMenu} component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const ContextMenuItem: FC<ContextMenuItemProps> = ({
    label,
    Icon,
    children,
    onClick,
    variant,
}: ContextMenuItemProps) => {
    const { onClose } = useContext(ContextMenuContext);

    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useHover(ref);

    const parentClassName = classNames(
        "min-w-[200px] pl-4 pr-2 py-2 flex items-center gap-4 hover:bg-[#CFD0D4] dark:hover:bg-[#2F384E] cursor-pointer relative",
        itemCva({ variant }),
    );

    /**
     * Handles the click event of the context menu item.
     */
    const handleOnClick = (): void => {
        if (onClick && !children) {
            // Call `onClose` Function if Item has no Children.
            onClose();

            // Await 200ms to Close the Context Menu and then execute the `onClick` function.
            setTimeout(() => {
                onClick();
            }, 200);
        }
    };

    return (
        <div className={parentClassName} ref={ref} onClick={handleOnClick}>
            <Icon className="h-5 w-5 stroke-[2]" />

            <span className="flex-1">{label}</span>

            {children && <ChevronRightIcon className="h-5 w-5 stroke-2" />}

            <AnimatePresence>
                {children && isHovered && (
                    <motion.div
                        variants={contextMenu}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="absolute top-0 left-full z-[2] rounded-lg bg-[#EAEDFA] py-1.5 shadow-lg dark:bg-[#1F2B49]"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

ContextMenu.Item = ContextMenuItem;
