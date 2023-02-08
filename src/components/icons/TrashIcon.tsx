import { ClassNameProps } from "../../interfaces/components/ClassNameProps";
import { FC } from "react";

export const TrashIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
					d="M 2 4 L 14 4 "
					transform="matrix(2,0,0,2,0,0)"
				/>
				<path
					d="M 12.666016 4 L 12.666016 13.333984 C 12.666016 13.6875 12.525391 14.025391 12.275391 14.275391 C 12.025391 14.525391 11.6875 14.666016 11.333984 14.666016 L 4.666016 14.666016 C 4.3125 14.666016 3.974609 14.525391 3.724609 14.275391 C 3.474609 14.025391 3.333984 13.6875 3.333984 13.333984 L 3.333984 4 M 5.333984 4 L 5.333984 2.666016 C 5.333984 2.3125 5.474609 1.974609 5.724609 1.724609 C 5.974609 1.474609 6.3125 1.333984 6.666016 1.333984 L 9.333984 1.333984 C 9.6875 1.333984 10.025391 1.474609 10.275391 1.724609 C 10.525391 1.974609 10.666016 2.3125 10.666016 2.666016 L 10.666016 4 "
					transform="matrix(2,0,0,2,0,0)"
				/>
				<path
					d="M 6.666016 7.333984 L 6.666016 11.333984 "
					transform="matrix(2,0,0,2,0,0)"
				/>
				<path
					d="M 9.333984 7.333984 L 9.333984 11.333984 "
					transform="matrix(2,0,0,2,0,0)"
				/>
			</g>
		</svg>
	);
};
