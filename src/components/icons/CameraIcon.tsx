import { ClassNameProps } from "../../interfaces/components/ClassNameProps";
import { FC } from "react";

export const CameraIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 23.000977 18.999023 C 23.000977 19.529297 22.790039 20.039062 22.415039 20.414062 C 22.040039 20.789062 21.530273 21 21 21 L 3 21 C 2.469727 21 1.959961 20.789062 1.584961 20.414062 C 1.209961 20.039062 0.999023 19.529297 0.999023 18.999023 L 0.999023 8.000977 C 0.999023 7.470703 1.209961 6.960938 1.584961 6.585938 C 1.959961 6.210938 2.469727 6 3 6 L 6.999023 6 L 9 3 L 15 3 L 17.000977 6 L 21 6 C 21.530273 6 22.040039 6.210938 22.415039 6.585938 C 22.790039 6.960938 23.000977 7.470703 23.000977 8.000977 Z M 23.000977 18.999023 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
				<path
					d="M 12 17.000977 C 14.208984 17.000977 15.999023 15.208008 15.999023 12.999023 C 15.999023 10.790039 14.208984 9 12 9 C 9.791016 9 8.000977 10.790039 8.000977 12.999023 C 8.000977 15.208008 9.791016 17.000977 12 17.000977 Z M 12 17.000977 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
			</g>
		</svg>
	);
};
