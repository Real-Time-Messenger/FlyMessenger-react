import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {ChildrenProps} from "../../../interfaces/ChildrenProps";

type DarkenedLayoutProps = ChildrenProps & {
    zIndex?: number;
    isDarkened?: boolean;
};

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
 * A layout that darkens the background.
 */
export const DarkenedLayout = ({ children, zIndex = 2, isDarkened = false }: DarkenedLayoutProps) => {
    return (
        <motion.div
            variants={modals}
            initial="closed"
            animate={isDarkened ? "opened" : "closed"}
            className={classNames("absolute top-0 left-0 h-screen w-screen items-center justify-center bg-neutral-900/50 dark:bg-neutral-900/60", `z-[${zIndex}]`)}
        >
            {children}
        </motion.div>
    );
};
