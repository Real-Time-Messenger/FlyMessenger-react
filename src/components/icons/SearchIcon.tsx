import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const SearchIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 13.751221 23.748779 C 19.273682 23.748779 23.748779 19.273682 23.748779 13.751221 C 23.748779 8.22876 19.273682 3.75 13.751221 3.75 C 8.22876 3.75 3.75 8.22876 3.75 13.751221 C 3.75 19.273682 8.22876 23.748779 13.751221 23.748779 Z M 13.751221 23.748779 "
					transform="matrix(1.066667,0,0,1.066667,0,0)"
				/>
				<path
					d="M 26.25 26.25 L 20.811768 20.811768 "
					transform="matrix(1.066667,0,0,1.066667,0,0)"
				/>
			</g>
		</svg>
	);
};
