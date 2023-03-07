import { FC } from "react";
import {ClassNameProps} from "../../interfaces/ClassNameProps";

export const AnchorIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 7 4.667236 C 7.967285 4.667236 8.75 3.882812 8.75 2.917236 C 8.75 1.949951 7.967285 1.167236 7 1.167236 C 6.032715 1.167236 5.25 1.949951 5.25 2.917236 C 5.25 3.882812 6.032715 4.667236 7 4.667236 Z M 7 4.667236 "
					transform="matrix(2.285714,0,0,2.285714,0,0)"
				/>
				<path
					d="M 7 12.832764 L 7 4.667236 "
					transform="matrix(2.285714,0,0,2.285714,0,0)"
				/>
				<path
					d="M 2.917236 7 L 1.167236 7 C 1.167236 8.546631 1.780762 10.030029 2.874512 11.125488 C 3.969971 12.219238 5.453369 12.832764 7 12.832764 C 8.546631 12.832764 10.030029 12.219238 11.125488 11.125488 C 12.219238 10.030029 12.832764 8.546631 12.832764 7 L 11.082764 7 "
					transform="matrix(2.285714,0,0,2.285714,0,0)"
				/>
			</g>
		</svg>
	);
};
