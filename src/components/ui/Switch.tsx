import classNames from "classnames";
import { motion } from "framer-motion";
import {FC, useState} from "react";
import { SwitchProps } from "../../interfaces/components/SwitchProps";

/**
 * Framer-Motion Variant for Switch Toggler.
 */
export const switchToggle = {
    checked: {
        x: "130%",
    },
    unchecked: {
        x: "0%",
    },
};


export const Switch: FC<SwitchProps> = ({ checked, onChange, className }: SwitchProps) => {
    return (
        <div
            className={classNames("duration-250 relative h-4 w-8 cursor-pointer rounded-full transition-colors", checked ? "bg-[#45CA24] dark:bg-[#9DEA8A]" : "bg-[#E86C6C] dark:bg-[#E86C6C]", className)}
            onClick={() => onChange(!checked)}
        >
            <motion.div
                variants={switchToggle}
                initial={checked ? "checked" : "unchecked"}
                animate={checked ? "checked" : "unchecked"}
                className="absolute top-0.5 left-0.5 rounded-full bg-[#EAEDFA] p-1.5 dark:bg-[#1F2B49]"
            />

            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={() => onChange(!checked)}
            />
        </div>
    );
};
