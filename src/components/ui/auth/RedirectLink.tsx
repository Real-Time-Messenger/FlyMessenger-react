import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";

/**
 * Props for the {@link RedirectLink} component.
 *
 * @interface RedirectLinkProps
 *
 * @extends LinkProps
 * @extends VariantProps<typeof itemCva>
 *
 * @property {string} label - The link label.
 */
interface RedirectLinkProps extends LinkProps, VariantProps<typeof itemCva> {
    label: string;
}

/**
 * Variants for the {@link RedirectLink} component.
 *
 * By default, the `transparent` variant is used (without any background, only text visible).
 */
const itemCva = cva("", {
    variants: {
        variant: {
            transparent: "text-[#4C4C4C] hover:text-[#161616] dark:text-[#AFAFAF] dark:hover:text-[#F2F2F2]",
            primary:
                "bg-[#CAD5F2] dark:bg-[#416D9C75] hover:bg-[#98BDE7] text-[#3F3F3F] dark:text-white dark:hover:bg-[#416D9C]",
            gray: "bg-[#F2F2F2] hover:bg-[#E6E6E6] text-[#3F3F3F]",
        },
    },
    defaultVariants: {
        variant: "transparent",
    },
});

/**
 * Custom link component.
 *
 * @author Winicred (Kirill Goritski)
 *
 * @since 0.9.0
 * @version 0.9.0
 */
export const RedirectLink: FC<RedirectLinkProps> = ({ to, variant, label, ...props }) => {
    return (
        <Link to={to} {...props}>
            <span className={classNames("rounded p-2 text-sm transition-colors", itemCva({ variant }))}>{label}</span>
        </Link>
    );
};
