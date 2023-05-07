import classNames from "classnames";
import { motion } from "framer-motion";
import { FC } from "react";
import { SwitchProps } from "@/interfaces/components/SwitchProps";

/**
 * Framer-Motion variants for the {@link Switch} component.
 */
export const switchToggle = {
    checked: {
        x: "130%",
    },
    unchecked: {
        x: "0%",
    },
};

/**
 * Renders a switch component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const Switch: FC<SwitchProps> = ({ checked, onChange, className, disabled = false }) => {
    const handleChange = (): void => {
        if (disabled) return;
        onChange(!checked);
    };

    return (
        <div
            className={classNames(
                "relative h-4 w-8 rounded-full transition-colors",
                checked ? "bg-[#45CA24] dark:bg-[#9DEA8A]" : "bg-[#E86C6C] dark:bg-[#E86C6C]",
                !disabled && "cursor-pointer",
                className,
            )}
            onClick={handleChange}
        >
            <motion.div
                variants={switchToggle}
                initial={checked ? "checked" : "unchecked"}
                animate={checked ? "checked" : "unchecked"}
                className="absolute top-0.5 left-0.5 rounded-full bg-[#EAEDFA] p-1.5 dark:bg-[#1F2B49]"
            />

            <input type="checkbox" className="hidden" checked={checked} onChange={() => onChange(!checked)} />
        </div>
    );
};
