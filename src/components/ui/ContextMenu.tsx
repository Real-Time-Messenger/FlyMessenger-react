import { AnimatePresence, motion } from "framer-motion";
import {PositionProps} from "./DialogItem";
import {ComponentType, createContext, ReactNode, SVGProps, useRef, MouseEvent, FC, useContext} from "react";
import {cva, VariantProps} from "class-variance-authority";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {useHover} from "../../hooks/useHover";
import classNames from "classnames";
import { ChevronRightIcon } from "../icons";

/**
 * Interface for the `ContextMenu` component.
 */
interface ContextMenuProps {
    onClose: () => void;
    position: PositionProps;
    children: ReactNode;
    isOpened: boolean;
}

/**
 * Interface for the `ContextMenuItem` component.
 */
interface ContextMenuItemProps extends VariantProps<typeof itemCva> {
    onClick?: () => void;
    Icon: ComponentType<SVGProps<SVGElement>>;
    label: string;
    children?: ReactNode;
}

/**
 * Framer-Motion variants for the `ContextMenu` background.
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
 * Framer-Motion variants for the `ContextMenu` component.
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

/** Context for access variables from parent. */
const ContextMenuContext = createContext<Pick<ContextMenuProps, "onClose">>({
    onClose: () => {},
});

export const ContextMenu = ({ children, onClose, position, isOpened }: ContextMenuProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, onClose);

    const handleClose = (event: MouseEvent<HTMLDivElement>) => {
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

export const Item: FC<ContextMenuItemProps> = ({ label, Icon, children, onClick, variant }: ContextMenuItemProps) => {
    const { onClose } = useContext(ContextMenuContext);

    const ref = useRef<HTMLDivElement>(null);
    const isHovered = useHover(ref);

    const parentClassName = classNames("min-w-[200px] pl-4 pr-2 py-2 flex items-center gap-4 hover:bg-[#CFD0D4] dark:hover:bg-[#2F384E] cursor-pointer relative", itemCva({ variant }));

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
        <div
            className={parentClassName}
            ref={ref}
            onClick={handleOnClick}
        >
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

ContextMenu.Item = Item;
