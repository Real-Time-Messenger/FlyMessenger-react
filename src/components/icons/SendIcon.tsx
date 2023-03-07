import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const SendIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 15 9.999023 L 20.000977 15 L 15 20.000977 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
				<path
					d="M 3.999023 3.999023 L 3.999023 11.000977 C 3.999023 12.061523 4.420898 13.078125 5.170898 13.828125 C 5.920898 14.578125 6.94043 15 8.000977 15 L 20.000977 15 "
					transform="matrix(1.333333,0,0,1.333333,0,0)"
				/>
			</g>
		</svg>
	);
};
