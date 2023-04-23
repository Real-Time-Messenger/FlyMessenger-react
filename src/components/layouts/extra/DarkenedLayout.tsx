import classNames from "classnames";
import { motion } from "framer-motion";
import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { FC } from "react";

/**
 * Props for the {@link DarkenedLayout} component.
 *
 * @interface DarkenedLayoutProps
 *
 * @extends {@link ChildrenProps}
 *
 * @property {number} [zIndex=2] The z-index of the component.
 * @property {boolean} [isDarkened=false] Whether the background should be darkened.
 */
interface DarkenedLayoutProps extends ChildrenProps {
    zIndex?: number;
    isDarkened?: boolean;
}

/**
 * Framer-motion animation for the {@link DarkenedLayout} components.
 */
export const modals = {
    closed: {
        opacity: 0,
        transition: {
            duration: 0.25,
        },
        transitionEnd: {
            display: "none",
        },
    },
    opened: {
        opacity: 1,
        display: "flex",
        transition: {
            duration: 0.25,
        },
    },
};

/**
 * A darkened background component that can be used to darken the background of a page (preferably a modal).
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DarkenedLayout: FC<DarkenedLayoutProps> = ({ children, zIndex = 2, isDarkened = false }) => {
    return (
        <motion.div
            variants={modals}
            initial="closed"
            animate={isDarkened ? "opened" : "closed"}
            className={classNames(
                "absolute top-0 left-0 h-screen w-screen items-center justify-center bg-neutral-900/50 dark:bg-neutral-900/60",
                `z-[${zIndex}]`,
            )}
        >
            {children}
        </motion.div>
    );
};
