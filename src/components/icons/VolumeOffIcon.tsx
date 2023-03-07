import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const VolumeOffIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 19.16748 7.5 L 14.16748 12.5 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
				<path
					d="M 14.16748 7.5 L 19.16748 12.5 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
			</g>
		</svg>
	);
};
