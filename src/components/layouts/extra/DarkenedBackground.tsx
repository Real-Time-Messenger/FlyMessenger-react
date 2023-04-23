import classnames from "classnames";
import { motion } from "framer-motion";
import { FC } from "react";
import { createPortal } from "react-dom";

/**
 * Props for the {@link DarkenedBackground} component.
 *
 * @interface DarkenedBackgroundProps
 *
 * @property {boolean} isDarkened - Whether the background should be darkened.
 * @property {number} zIndex - The z-index of the background.
 * @property {() => void} onClick - Callback for when the background is clicked.
 */
interface DarkenedBackgroundProps {
    isDarkened: boolean;
    zIndex?: number;
    onClick?: () => void;
}

/**
 * Framer-motion animation for the {@link DarkenedBackground} component.
 */
export const opacity = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.15,
        },
        transitionEnd: {
            display: "none",
        },
    },
    visible: {
        opacity: 1,
        display: "block",
        transition: {
            duration: 0.15,
        },
    },
};

/**
 * A darkened background component that can be used to darken the background of a page.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const DarkenedBackground: FC<DarkenedBackgroundProps> = ({ onClick, isDarkened = false, zIndex = 1 }) => {
    const classes = classnames("w-screen h-screen absolute top-0 left-0 bg-neutral-900/50", `z-[${zIndex}]`);

    const Element = () => (
        <motion.div
            variants={opacity}
            initial="hidden"
            animate={isDarkened ? "visible" : "hidden"}
            className={classes}
            onClick={onClick}
        />
    );

    return createPortal(Element(), document.body);
};
