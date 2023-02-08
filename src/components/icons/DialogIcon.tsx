import { FC } from "react";
import {ClassNameProps} from "../../interfaces/ClassNameProps";

export const DialogIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
			<g id="surface1">
				<path
					d="M 17.5 9.58252 C 17.502441 10.683594 17.246094 11.767578 16.750488 12.749023 C 16.162109 13.925781 15.258789 14.916992 14.140625 15.60791 C 13.02002 16.298828 11.730957 16.665039 10.41748 16.66748 C 9.316406 16.669922 8.232422 16.413574 7.250977 15.915527 L 2.5 17.5 L 4.084473 12.749023 C 3.586426 11.767578 3.330078 10.683594 3.33252 9.58252 C 3.334961 8.269043 3.701172 6.97998 4.39209 5.859375 C 5.083008 4.741211 6.074219 3.837891 7.250977 3.249512 C 8.232422 2.753906 9.316406 2.497559 10.41748 2.5 L 10.83252 2.5 C 12.570801 2.595215 14.211426 3.330078 15.441895 4.558105 C 16.669922 5.788574 17.404785 7.429199 17.5 9.16748 Z M 17.5 9.58252 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
			</g>
		</svg>
	);
};
