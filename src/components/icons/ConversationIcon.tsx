import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const ConversationIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 13.459106 16.625 L 13.459106 15.040894 C 13.459106 14.201294 13.125122 13.396484 12.531372 12.802734 C 11.937622 12.208984 11.130493 11.875 10.290894 11.875 L 3.959106 11.875 C 3.119507 11.875 2.312378 12.208984 1.718628 12.802734 C 1.124878 13.396484 0.790894 14.201294 0.790894 15.040894 L 0.790894 16.625 "
					transform="matrix(1.684211,0,0,1.684211,0,0)"
				/>
				<path
					d="M 7.125 8.709106 C 8.873779 8.709106 10.290894 7.289673 10.290894 5.540894 C 10.290894 3.792114 8.873779 2.375 7.125 2.375 C 5.376221 2.375 3.959106 3.792114 3.959106 5.540894 C 3.959106 7.289673 5.376221 8.709106 7.125 8.709106 Z M 7.125 8.709106 "
					transform="matrix(1.684211,0,0,1.684211,0,0)"
				/>
				<path
					d="M 18.209106 16.625 L 18.209106 15.040894 C 18.206787 14.340454 17.974854 13.658569 17.543457 13.104248 C 17.11438 12.549927 16.513672 12.15332 15.834106 11.977051 "
					transform="matrix(1.684211,0,0,1.684211,0,0)"
				/>
				<path
					d="M 12.665894 2.477051 C 13.347778 2.65332 13.950806 3.047607 14.382202 3.604248 C 14.813599 4.158569 15.047852 4.842773 15.047852 5.545532 C 15.047852 6.248291 14.813599 6.932495 14.382202 7.486816 C 13.950806 8.043457 13.347778 8.440063 12.665894 8.614014 "
					transform="matrix(1.684211,0,0,1.684211,0,0)"
				/>
			</g>
		</svg>
	);
};
