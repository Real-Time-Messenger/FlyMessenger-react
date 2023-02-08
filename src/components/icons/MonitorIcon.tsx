import { ClassNameProps } from "../../interfaces/components/ClassNameProps";
import { FC } from "react";

export const MonitorIcon: FC<ClassNameProps> = ({ className }: ClassNameProps) => {
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
				<path d="M 16 22.960938 L 16 29.332031 M 2.667969 17.332031 L 29.332031 17.332031 M 10 29.332031 L 22 29.332031 M 8.585938 2.667969 L 23.398438 2.667969 C 28.148438 2.667969 29.332031 3.851562 29.332031 8.585938 L 29.332031 17.027344 C 29.332031 21.773438 28.148438 22.945312 23.414062 22.945312 L 8.585938 22.945312 C 3.851562 22.960938 2.667969 21.773438 2.667969 17.039062 L 2.667969 8.585938 C 2.667969 3.851562 3.851562 2.667969 8.585938 2.667969 Z M 8.585938 2.667969 " />
			</g>
		</svg>
	);
};
