import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";
import {Link, LinkProps} from "react-router-dom";

interface RedirectLinkProps extends LinkProps, VariantProps<typeof itemCva> {
	label: string;
}

/**
 * Custom link variants.
 */
const itemCva = cva("", {
	variants: {
		variant: {
			transparent: "text-[#4C4C4C] hover:text-[#161616] dark:text-[#AFAFAF] dark:hover:text-[#F2F2F2]",
			primary: "bg-[#CAD5F2] dark:bg-[#416D9C75] hover:bg-[#98BDE7] text-[#3F3F3F] dark:text-white dark:hover:bg-[#416D9C]",
			gray: "bg-[#F2F2F2] hover:bg-[#E6E6E6] text-[#3F3F3F]",
		},
	},
	defaultVariants: {
		variant: "transparent",
	},
});

export const RedirectLink = ({ to, variant, label, ...props }: RedirectLinkProps) => {
	return (
		<Link
			to={to}
			{...props}
		>
			<span className={classNames("duration-250 rounded p-2 text-sm transition-colors", itemCva({ variant }))}>{label}</span>
		</Link>
	);
};
