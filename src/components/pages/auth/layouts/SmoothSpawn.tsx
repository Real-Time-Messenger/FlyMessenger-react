import { motion } from "framer-motion";
import {ChildrenProps} from "../../../../interfaces/ChildrenProps";

interface SmoothSpawnProps extends ChildrenProps {
    width?: number;
}

/**
 * Smooth spawn animation for auth pages.
 */
export const SmoothSpawn = ({ children, width }: SmoothSpawnProps) => {
    return (
        <div className="duration-250 flex h-screen w-screen items-center justify-center bg-[#EAEDFA] transition-colors dark:bg-[#10182B]">
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
