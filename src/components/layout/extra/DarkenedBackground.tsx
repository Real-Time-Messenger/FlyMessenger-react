import classnames from "classnames";
import { motion } from "framer-motion";
import React, { FC } from "react";
import {createPortal} from "react-dom";

interface DarkenedBackgroundProps {
    isDarkened: boolean;
    zIndex?: number;
}

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

export const DarkenedBackground: FC<DarkenedBackgroundProps> = ({ isDarkened = false, zIndex = 1 }: DarkenedBackgroundProps) => {
    const classes = classnames("w-screen h-screen absolute top-0 left-0 bg-neutral-900/50", `z-[${zIndex}]`);
    const element = () => (
        <motion.div
            variants={opacity}
            initial="hidden"
            animate={isDarkened ? "visible" : "hidden"}
            className={classes}
        />
    )

    return createPortal(element(), document.body);
};
