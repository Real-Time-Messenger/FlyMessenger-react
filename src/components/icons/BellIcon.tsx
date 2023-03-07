import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const BellIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 12 5.333984 C 12 4.273438 11.578125 3.255859 10.828125 2.505859 C 10.078125 1.753906 9.060547 1.333984 8 1.333984 C 6.939453 1.333984 5.921875 1.753906 5.171875 2.505859 C 4.421875 3.255859 4 4.273438 4 5.333984 C 4 10 2 11.333984 2 11.333984 L 14 11.333984 C 14 11.333984 12 10 12 5.333984 Z M 12 5.333984 "
					transform="matrix(2,0,0,2,0,0)"
				/>
				<path
					d="M 9.154297 14 C 9.037109 14.201172 8.867188 14.369141 8.666016 14.486328 C 8.462891 14.603516 8.234375 14.664062 8 14.664062 C 7.765625 14.664062 7.537109 14.603516 7.333984 14.486328 C 7.132812 14.369141 6.964844 14.201172 6.847656 14 "
					transform="matrix(2,0,0,2,0,0)"
				/>
			</g>
		</svg>
	);
};
