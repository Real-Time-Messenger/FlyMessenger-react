import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const VolumeIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 9.16748 4.16748 L 5 7.5 L 1.66748 7.5 L 1.66748 12.5 L 5 12.5 L 9.16748 15.83252 Z M 9.16748 4.16748 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
				<path
					d="M 15.891113 4.108887 C 17.453613 5.671387 18.33252 7.790527 18.33252 10 C 18.33252 12.209473 17.453613 14.328613 15.891113 15.891113 M 12.949219 7.050781 C 13.730469 7.832031 14.169922 8.891602 14.169922 9.995117 C 14.169922 11.101074 13.730469 12.160645 12.949219 12.941895 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
			</g>
		</svg>
	);
};
