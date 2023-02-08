import { ClassNameProps } from "interfaces/components/ClassNameProps";
import { FC } from "react";

export const CloseIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<g
				xmlns="http://www.w3.org/2000/svg"
				id="surface1"
			>
				<path
					d="M 18 6 L 6 18 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
				<path
					d="M 6 6 L 18 18 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
			</g>
		</svg>
	);
};
