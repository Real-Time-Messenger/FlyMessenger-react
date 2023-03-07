import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const EyeIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 12.983398 10 C 12.983398 11.650391 11.650391 12.983398 10 12.983398 C 8.349609 12.983398 7.016602 11.650391 7.016602 10 C 7.016602 8.349609 8.349609 7.016602 10 7.016602 C 11.650391 7.016602 12.983398 8.349609 12.983398 10 Z M 12.983398 10 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
				<path
					d="M 10 16.89209 C 12.941895 16.89209 15.683594 15.158691 17.590332 12.158203 C 18.342285 10.983887 18.342285 9.008789 17.590332 7.834473 C 15.683594 4.833984 12.941895 3.100586 10 3.100586 C 7.058105 3.100586 4.316406 4.833984 2.407227 7.834473 C 1.657715 9.008789 1.657715 10.983887 2.407227 12.158203 C 4.316406 15.158691 7.058105 16.89209 10 16.89209 Z M 10 16.89209 "
					transform="matrix(1.6,0,0,1.6,0,0)"
				/>
			</g>
		</svg>
	);
};
