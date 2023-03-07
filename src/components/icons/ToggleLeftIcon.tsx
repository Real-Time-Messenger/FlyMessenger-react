import { FC } from "react";
import {ClassNameProps} from "../../interfaces/ClassNameProps";

export const ToggleLeftIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 13.33252 4.16748 L 6.66748 4.16748 C 3.444824 4.16748 0.83252 6.777344 0.83252 10 C 0.83252 13.222656 3.444824 15.83252 6.66748 15.83252 L 13.33252 15.83252 C 16.555176 15.83252 19.16748 13.222656 19.16748 10 C 19.16748 6.777344 16.555176 4.16748 13.33252 4.16748 Z M 13.33252 4.16748 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
				<path
					d="M 6.66748 12.5 C 8.046875 12.5 9.16748 11.381836 9.16748 10 C 9.16748 8.618164 8.046875 7.5 6.66748 7.5 C 5.285645 7.5 4.16748 8.618164 4.16748 10 C 4.16748 11.381836 5.285645 12.5 6.66748 12.5 Z M 6.66748 12.5 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
			</g>
		</svg>
	);
};
