import { ChildrenProps } from "@/interfaces/ChildrenProps";
import { motion } from "framer-motion";
import { FC } from "react";

/**
 * Interface for {@link SmoothSpawn} component.
 *
 * @interface SmoothSpawnProps
 *
 * @extends {@link ChildrenProps}
 *
 * @property {number} [width] - Width of the wrapper.
 */
interface SmoothSpawnProps extends ChildrenProps {
    width?: number;
}

/**
 * Wrapper with animation of smooth appearance of pages.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const SmoothSpawn: FC<SmoothSpawnProps> = ({ children, width }) => {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-[#EAEDFA] transition-colors dark:bg-[#10182B]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                style={{ width: width ? `${width}px` : "400px" }}
            >
                {children}
            </motion.div>
        </div>
    );
};
