import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const ChevronLeftIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 10 12 L 6 8 L 10 4 "
					transform="matrix(2,0,0,2,0,0)"
				/>
			</g>
		</svg>
	);
};
