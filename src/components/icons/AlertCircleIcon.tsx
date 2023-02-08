import { FC } from "react";
import {ClassNameProps} from "../../interfaces/ClassNameProps";

export const AlertCircleIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
				<path d="M 16 29.332031 C 23.363281 29.332031 29.332031 23.363281 29.332031 16 C 29.332031 8.636719 23.363281 2.667969 16 2.667969 C 8.636719 2.667969 2.667969 8.636719 2.667969 16 C 2.667969 23.363281 8.636719 29.332031 16 29.332031 Z M 16 29.332031 " />
				<path d="M 16 10.667969 L 16 16 " />
				<path d="M 16 21.332031 L 16.011719 21.332031 " />
			</g>
		</svg>
	);
};
