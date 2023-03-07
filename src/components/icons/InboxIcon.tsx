import {ClassNameProps} from "../../interfaces/ClassNameProps";
import { FC } from "react";

export const InboxIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 14.666016 8 L 10.666016 8 L 9.333984 10 L 6.666016 10 L 5.333984 8 L 1.333984 8 "
					transform="matrix(2,0,0,2,0,0)"
				/>
				<path
					d="M 3.632812 3.40625 L 1.333984 8 L 1.333984 12 C 1.333984 12.353516 1.474609 12.693359 1.724609 12.943359 C 1.974609 13.193359 2.3125 13.333984 2.666016 13.333984 L 13.333984 13.333984 C 13.6875 13.333984 14.025391 13.193359 14.275391 12.943359 C 14.525391 12.693359 14.666016 12.353516 14.666016 12 L 14.666016 8 L 12.367188 3.40625 C 12.255859 3.183594 12.085938 2.998047 11.875 2.867188 C 11.664062 2.736328 11.421875 2.666016 11.173828 2.666016 L 4.826172 2.666016 C 4.578125 2.666016 4.335938 2.736328 4.125 2.867188 C 3.914062 2.998047 3.744141 3.183594 3.632812 3.40625 Z M 3.632812 3.40625 "
					transform="matrix(2,0,0,2,0,0)"
				/>
			</g>
		</svg>
	);
};
