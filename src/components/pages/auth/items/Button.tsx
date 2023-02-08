import {cva, VariantProps} from "class-variance-authority";
import classNames from "classnames";
import {AnimatePresence, motion} from "framer-motion";
import {ButtonHTMLAttributes} from "react";
import {Loader} from "../../../ui/Loader";

type ExtendedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof itemCva>;

interface AuthButtonProps extends ExtendedButtonProps {
    label: string;
    isSubmitting?: boolean;
}

/**
 * Custom button variants.
 */
const itemCva = cva("", {
    variants: {
        variant: {
            primary: "",
            submit: "bg-[#CAD5F2] dark:bg-[#416D9C75] enabled:hover:bg-[#98BDE7] text-[#3F3F3F] dark:text-white enabled:dark:hover:bg-[#416D9C]",
            link: "bg-[#F2F2F2] enabled:hover:bg-[#E6E6E6] text-[#3F3F3F]",
        },
    },
    defaultVariants: {
        variant: "primary",
    },
});

export const Button = ({label, variant, onClick, isSubmitting = undefined, ...props}: AuthButtonProps) => {
    return (
        <button
            className={classNames("duration-250 min-w-[180px] select-none rounded py-2 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-50", itemCva({variant}))}
            disabled={isSubmitting}
            {...props}
        >
            <AnimatePresence>
                {isSubmitting ? (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                        className="flex items-center justify-center"
                    >
                        <Loader className="h-6 w-6"/>
                    </motion.div>
                ) : (
                    <motion.span
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.25}}
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
};
