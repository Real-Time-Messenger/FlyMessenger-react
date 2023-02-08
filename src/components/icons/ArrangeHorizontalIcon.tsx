import { ClassNameProps } from "../../interfaces/components/ClassNameProps";
import { FC } from "react";

export const ArrangeHorizontalIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
				<path d="M 23.039062 13.933594 L 28 8.972656 L 23.039062 4.011719 M 4 8.972656 L 28 8.972656 M 8.960938 18.066406 L 4 23.027344 L 8.960938 27.988281 M 28 23.027344 L 4 23.027344 " />
			</g>
		</svg>
	);
};
