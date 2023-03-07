import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const ChevronRightIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 9 18 L 15 12 L 9 6 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
			</g>
		</svg>
	);
};
